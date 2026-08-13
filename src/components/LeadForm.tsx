'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { saveLeadAction } from '@/services/leads/saveLead';
import { extractUtms, UtmParameters } from '@/lib/utils/url';
import { pushDataLayerEvent } from '@/lib/tracking';

type ProductType = 'credito-consignado-inss' | 'credito-do-trabalhador' | 'portabilidade' | 'antecipacao-fgts' | 'atendimento-geral';

interface LeadFormProps {
  defaultProfile?: ProductType;
  ctaText?: string;
  sourcePage?: string;
}

// Subcomponent wrapped in Suspense to prevent build/prerender bailout errors
const UtmTracker: React.FC<{
  sourcePage: string;
  onTrack: (data: UtmParameters & { referrer: string | null }) => void;
}> = ({ onTrack }) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const utms = extractUtms(searchParams);
    let referrer = null;
    if (typeof document !== 'undefined') {
      referrer = document.referrer;
    }
    
    // Armazena no sessionStorage para persistir entre páginas na mesma sessão
    Object.entries(utms).forEach(([key, val]) => {
      if (val) sessionStorage.setItem(key, val);
    });

    const storedUtms = {
      ...utms,
      utm_source: utms.utm_source || sessionStorage.getItem('utm_source'),
      utm_medium: utms.utm_medium || sessionStorage.getItem('utm_medium'),
      utm_campaign: utms.utm_campaign || sessionStorage.getItem('utm_campaign'),
    };

    onTrack({ ...storedUtms, referrer });
  }, [searchParams, onTrack]);

  return null;
};

export const LeadForm: React.FC<LeadFormProps> = ({ 
  defaultProfile, 
  ctaText = "Receber orientação pelo WhatsApp",
  sourcePage = "home"
}) => {
  const router = useRouter();
  
  const [formData, setFormData] = useState<{
    nome: string;
    whatsapp: string;
    cidade: string;
    perfil: ProductType;
    horario: string;
    lgpdConsent: boolean;
    honeypot: string;
  }>({
    nome: '',
    whatsapp: '',
    cidade: '',
    perfil: (defaultProfile ?? 'atendimento-geral') as ProductType,
    horario: 'qualquer',
    lgpdConsent: false,
    honeypot: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingData, setTrackingData] = useState<UtmParameters & { referrer: string | null }>({
    utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null, utm_term: null, gclid: null, fbclid: null, referrer: null
  });

  // Track event for starting the form
  const [hasStarted, setHasStarted] = useState(false);

  const handleTrack = React.useCallback((data: UtmParameters & { referrer: string | null }) => {
    setTrackingData(data);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasStarted) {
      setHasStarted(true);
      pushDataLayerEvent({ event: 'form_start', product: formData.perfil, location: 'main_form', page_path: sourcePage });
    }
    
    let value = e.target.value.replace(/\D/g, ''); 
    if (value.length > 11) value = value.slice(0, 11);
    
    let formatted = value;
    if (value.length > 2) formatted = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    if (value.length > 7) formatted = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    
    setFormData(prev => ({ ...prev, whatsapp: formatted }));
    if (errors.whatsapp) setErrors(prev => ({ ...prev, whatsapp: '' }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasStarted) {
      setHasStarted(true);
      pushDataLayerEvent({ event: 'form_start', product: formData.perfil, location: 'main_form', page_path: sourcePage });
    }
    setFormData(prev => ({ ...prev, nome: e.target.value }));
    if (errors.nome) setErrors(prev => ({ ...prev, nome: '' }));
  }

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nome.trim()) newErrors.nome = "Por favor, insira seu nome completo.";
    
    const rawPhone = formData.whatsapp.replace(/\D/g, '');
    if (rawPhone.length < 10 || rawPhone.length > 11) {
      newErrors.whatsapp = "Por favor, insira um WhatsApp válido com DDD.";
    }
    
    if (!formData.cidade.trim()) newErrors.cidade = "Por favor, insira sua cidade.";
    if (!formData.perfil) newErrors.perfil = "Selecione o seu perfil de crédito.";
    if (!formData.lgpdConsent) newErrors.lgpdConsent = "Você precisa aceitar a Política de Privacidade para continuar.";

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      pushDataLayerEvent({ event: 'form_error', error_type: 'validation', product: formData.perfil, page_path: sourcePage });
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);

    try {
      pushDataLayerEvent({ event: 'form_submit', product: formData.perfil, location: 'main_form', page_path: sourcePage });

      // Chama a Server Action
      const response = await saveLeadAction({
        nome: formData.nome,
        whatsapp: formData.whatsapp,
        cidade: formData.cidade,
        product: formData.perfil,
        profile_answer: formData.horario,
        source_page: sourcePage,
        consent: formData.lgpdConsent as true,
        consent_version: 'v1.0',
        honeypot: formData.honeypot,
        utm_source: trackingData.utm_source ?? undefined,
        utm_medium: trackingData.utm_medium ?? undefined,
        utm_campaign: trackingData.utm_campaign ?? undefined,
        utm_content: trackingData.utm_content ?? undefined,
        utm_term: trackingData.utm_term ?? undefined,
        gclid: trackingData.gclid ?? undefined,
        fbclid: trackingData.fbclid ?? undefined,
        referrer: trackingData.referrer ?? undefined,
      });

      if (!response.success) {
        setErrors({ form: response.error || "Ocorreu um erro ao processar. Tente novamente." });
        pushDataLayerEvent({ event: 'form_error', error_type: 'server_rejection', product: formData.perfil, page_path: sourcePage });
        setIsSubmitting(false);
        return;
      }

      // Sucesso! Lead Salvo. Dispara evento de conversão
      if (!response.isDuplicate) {
        pushDataLayerEvent({ 
          event: 'generate_lead', 
          product: formData.perfil, 
          location: 'main_form', 
          page_path: sourcePage,
          event_id: response.leadId 
        });
      }

      const query = new URLSearchParams({
        nome: formData.nome,
        cidade: formData.cidade,
        product: formData.perfil,
        lead_id: response.leadId || ''
      });

      router.push(`/obrigado?${query.toString()}`);
    } catch (err) {
      console.error(err);
      setErrors({ form: "Ocorreu um erro ao processar sua solicitação. Tente novamente." });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <Suspense fallback={null}>
        <UtmTracker sourcePage={sourcePage} onTrack={handleTrack} />
      </Suspense>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 max-w-xl mx-auto space-y-6">
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-primary-navy">
            Faça uma Simulação Segura
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Preencha e entraremos em contato sem compromisso.
          </p>
        </div>

        <div aria-live="polite">
          {errors.form && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-4">
              {errors.form}
            </div>
          )}
        </div>

        {/* Honeypot anti-spam */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <label htmlFor="honeypot">Não preencha este campo se for humano</label>
          <input 
            type="text" 
            id="honeypot" 
            name="honeypot" 
            value={formData.honeypot} 
            onChange={(e) => setFormData(prev => ({ ...prev, honeypot: e.target.value }))} 
            tabIndex={-1} 
          />
        </div>

        {/* Nome */}
        <div>
          <label htmlFor="nome" className="block text-sm font-semibold text-primary-navy mb-1">
            Como podemos chamar você?
          </label>
          <input
            type="text"
            id="nome"
            value={formData.nome}
            onChange={handleNameChange}
            placeholder="Ex: Maria da Silva"
            className={`w-full px-4 py-3 rounded-lg border ${errors.nome ? 'border-red-500' : 'border-gray-300'} focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-gray-900 bg-white placeholder-gray-400 text-base`}
          />
          {errors.nome && <p className="text-red-500 text-xs mt-1" role="alert">{errors.nome}</p>}
        </div>

        {/* WhatsApp & Cidade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="whatsapp" className="block text-sm font-semibold text-primary-navy mb-1">
              Qual é o seu WhatsApp?
            </label>
            <input
              type="text"
              id="whatsapp"
              value={formData.whatsapp}
              onChange={handlePhoneChange}
              placeholder="Ex: (11) 99999-9999"
              className={`w-full px-4 py-3 rounded-lg border ${errors.whatsapp ? 'border-red-500' : 'border-gray-300'} focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-gray-900 bg-white placeholder-gray-400 text-base`}
            />
            {errors.whatsapp && <p className="text-red-500 text-xs mt-1" role="alert">{errors.whatsapp}</p>}
          </div>

          <div>
            <label htmlFor="cidade" className="block text-sm font-semibold text-primary-navy mb-1">
              Em qual cidade você mora?
            </label>
            <input
              type="text"
              id="cidade"
              value={formData.cidade}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, cidade: e.target.value }));
                if (errors.cidade) setErrors(prev => ({ ...prev, cidade: '' }));
              }}
              placeholder="Ex: Nova Iguaçu"
              className={`w-full px-4 py-3 rounded-lg border ${errors.cidade ? 'border-red-500' : 'border-gray-300'} focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-gray-900 bg-white placeholder-gray-400 text-base`}
            />
            {errors.cidade && <p className="text-red-500 text-xs mt-1" role="alert">{errors.cidade}</p>}
          </div>
        </div>

        {/* Perfil & Horário */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="perfil" className="block text-sm font-semibold text-primary-navy mb-1">
              Seu Perfil
            </label>
            <select
              id="perfil"
              value={formData.perfil}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, perfil: e.target.value as ProductType }));
                if (errors.perfil) setErrors(prev => ({ ...prev, perfil: '' }));
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-gray-900 bg-white text-base"
            >
              <option value="atendimento-geral">Selecione...</option>
              <option value="credito-consignado-inss">Aposentado/Pensionista INSS</option>
              <option value="credito-do-trabalhador">Trabalhador CLT (Desconto em Folha)</option>
              <option value="portabilidade">Portabilidade de Consignado</option>
              <option value="antecipacao-fgts">Antecipação FGTS</option>
            </select>
            {errors.perfil && <p className="text-red-500 text-xs mt-1" role="alert">{errors.perfil}</p>}
          </div>

          <div>
            <label htmlFor="horario" className="block text-sm font-semibold text-primary-navy mb-1">
              Melhor Horário Para Contato
            </label>
            <select
              id="horario"
              value={formData.horario}
              onChange={(e) => setFormData(prev => ({ ...prev, horario: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-gray-900 bg-white text-base"
            >
              <option value="qualquer">Qualquer horário</option>
              <option value="manha">Manhã (08h às 12h)</option>
              <option value="tarde">Tarde (12h às 18h)</option>
            </select>
          </div>
        </div>

        {/* LGPD Consent Checkbox */}
        <div className="flex items-start">
          <input
            type="checkbox"
            id="lgpdConsent"
            checked={formData.lgpdConsent}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, lgpdConsent: e.target.checked }));
              if (errors.lgpdConsent) setErrors(prev => ({ ...prev, lgpdConsent: '' }));
            }}
            className="h-4 w-4 rounded border-gray-300 text-primary-blue focus:ring-primary-blue mt-1 mr-3 flex-shrink-0 cursor-pointer"
          />
          <label htmlFor="lgpdConsent" className="text-xs text-gray-600 leading-tight">
            Concordo com a <a href="/politica-de-privacidade" target="_blank" className="underline text-primary-blue hover:text-primary-navy font-semibold">Política de Privacidade</a> e autorizo o uso dos meus dados exclusivamente para simulação de crédito e contato da BCred Fácil.
          </label>
        </div>
        {errors.lgpdConsent && <p className="text-red-500 text-xs mt-0" role="alert">{errors.lgpdConsent}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 text-white font-display font-bold text-base sm:text-lg rounded-xl bg-primary-orange hover:bg-secondary-orange transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-offset-2 focus:ring-primary-orange disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Enviando seus dados...</span>
            </>
          ) : (
            <span>{ctaText}</span>
          )}
        </button>

        <p className="text-center text-[10px] text-gray-500">
          Não compartilhe senhas ou códigos de segurança. A BCred Fácil nunca cobra taxas antecipadas.
        </p>
      </form>
    </div>
  );
};
