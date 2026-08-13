'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { saveLeadAction } from '@/services/leads/saveLead';
import { extractUtms, UtmParameters } from '@/lib/utils/url';
import { pushDataLayerEvent } from '@/lib/tracking';

interface LandingLeadFormProps {
  product: 'credito-consignado-inss' | 'credito-do-trabalhador' | 'portabilidade' | 'antecipacao-fgts';
  customTitle?: string;
  customText?: string;
}

const LandingUtmTracker: React.FC<{
  onTrack: (data: UtmParameters & { referrer: string | null }) => void;
}> = ({ onTrack }) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const utms = extractUtms(searchParams);
    let referrer = null;
    if (typeof document !== 'undefined') {
      referrer = document.referrer;
    }
    
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

export const LandingLeadForm: React.FC<LandingLeadFormProps> = ({ 
  product,
  customTitle = "Receba uma orientação inicial",
  customText = "Preencha seus dados para que a equipe da BCred entre em contato pelo WhatsApp."
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    cidade: '',
    lgpdConsent: false,
    honeypot: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [trackingData, setTrackingData] = useState<UtmParameters & { referrer: string | null }>({
    utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null, utm_term: null, gclid: null, fbclid: null, referrer: null
  });

  const [hasStarted, setHasStarted] = useState(false);

  const handleTrack = React.useCallback((data: UtmParameters & { referrer: string | null }) => {
    setTrackingData(data);
  }, []);

  const triggerStart = () => {
    if (!hasStarted) {
      setHasStarted(true);
      pushDataLayerEvent({ event: 'form_start', product, location: 'landing_form', page_path: `/simule/${product}` });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    triggerStart();
    let value = e.target.value.replace(/\D/g, ''); 
    if (value.length > 11) value = value.slice(0, 11);
    
    let formatted = value;
    if (value.length > 2) formatted = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    if (value.length > 7) formatted = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    
    setFormData(prev => ({ ...prev, whatsapp: formatted }));
    if (errors.whatsapp) setErrors(prev => ({ ...prev, whatsapp: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nome.trim()) newErrors.nome = "Preencha seu nome completo.";
    const rawPhone = formData.whatsapp.replace(/\D/g, '');
    if (rawPhone.length < 10 || rawPhone.length > 11) {
      newErrors.whatsapp = "WhatsApp inválido com DDD.";
    }
    if (!formData.cidade.trim()) newErrors.cidade = "Preencha sua cidade.";
    if (!formData.lgpdConsent) newErrors.lgpdConsent = "Você precisa aceitar a Política de Privacidade.";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      pushDataLayerEvent({ event: 'form_error', error_type: 'validation', product, page_path: `/simule/${product}` });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      pushDataLayerEvent({ event: 'form_submit', product, location: 'landing_form', page_path: `/simule/${product}` });

      const response = await saveLeadAction({
        nome: formData.nome,
        whatsapp: formData.whatsapp,
        cidade: formData.cidade,
        product: product,
        source_page: `/simule/${product}`,
        landing_page: `/simule/${product}`,
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
        setErrors({ form: response.error || "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp." });
        pushDataLayerEvent({ event: 'form_error', error_type: 'server_rejection', product, page_path: `/simule/${product}` });
        setIsSubmitting(false);
        return;
      }

      if (!response.isDuplicate) {
        pushDataLayerEvent({ 
          event: 'generate_lead', 
          product, 
          location: 'landing_form', 
          page_path: `/simule/${product}`,
          event_id: response.leadId 
        });
      }

      const query = new URLSearchParams({
        nome: formData.nome,
        cidade: formData.cidade,
        product: product,
        lead_id: response.leadId || ''
      });
      
      router.push(`/obrigado?${query.toString()}`);
    } catch (err) {
      console.error(err);
      setErrors({ form: "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp." });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md mx-auto relative z-10">
      <Suspense fallback={null}>
        <LandingUtmTracker onTrack={handleTrack} />
      </Suspense>

      <div className="text-center mb-6">
        <h3 className="text-xl font-display font-extrabold text-primary-navy leading-tight">
          {customTitle}
        </h3>
        <p className="text-sm text-gray-500 mt-2 font-sans">
          {customText}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div aria-live="polite">
          {errors.form && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-sans mb-4">
              {errors.form}
            </div>
          )}
        </div>

        {/* Honeypot anti-spam */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <input 
            type="text" 
            name="honeypot" 
            value={formData.honeypot} 
            onChange={(e) => setFormData(prev => ({ ...prev, honeypot: e.target.value }))} 
            tabIndex={-1} 
          />
        </div>

        <div>
          <label htmlFor="nome" className="block text-sm font-semibold text-primary-navy mb-1">Nome Completo</label>
          <input
            type="text"
            id="nome"
            value={formData.nome}
            onChange={(e) => {
              triggerStart();
              setFormData(prev => ({ ...prev, nome: e.target.value }));
              if (errors.nome) setErrors(prev => ({ ...prev, nome: '' }));
            }}
            placeholder="Ex: Maria Silva"
            className={`w-full px-4 py-3 rounded-lg border ${errors.nome ? 'border-red-500' : 'border-gray-300'} focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-gray-900 bg-white placeholder-gray-400 text-base`}
          />
          {errors.nome && <p className="text-red-500 text-xs mt-1" role="alert">{errors.nome}</p>}
        </div>

        <div>
          <label htmlFor="whatsapp" className="block text-sm font-semibold text-primary-navy mb-1">WhatsApp (com DDD)</label>
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
          <label htmlFor="cidade" className="block text-sm font-semibold text-primary-navy mb-1">Cidade</label>
          <input
            type="text"
            id="cidade"
            value={formData.cidade}
            onChange={(e) => {
              triggerStart();
              setFormData(prev => ({ ...prev, cidade: e.target.value }));
              if (errors.cidade) setErrors(prev => ({ ...prev, cidade: '' }));
            }}
            placeholder="Ex: Nova Iguaçu"
            className={`w-full px-4 py-3 rounded-lg border ${errors.cidade ? 'border-red-500' : 'border-gray-300'} focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-gray-900 bg-white placeholder-gray-400 text-base`}
          />
          {errors.cidade && <p className="text-red-500 text-xs mt-1" role="alert">{errors.cidade}</p>}
        </div>

        <div className="pt-2">
          <label className="flex items-start cursor-pointer group">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                checked={formData.lgpdConsent}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, lgpdConsent: e.target.checked }));
                  if (errors.lgpdConsent) setErrors(prev => ({ ...prev, lgpdConsent: '' }));
                }}
                className="w-4 h-4 text-primary-blue border-gray-300 rounded focus:ring-primary-blue cursor-pointer"
              />
            </div>
            <div className="ml-3 text-xs text-gray-500 leading-tight">
              Concordo com a{' '}
              <Link href="/politica-de-privacidade" target="_blank" className="text-primary-blue hover:underline font-semibold">
                Política de Privacidade
              </Link>{' '}
              e autorizo o uso dos meus dados exclusivamente para simulação de crédito e contato da BCred Fácil.
            </div>
          </label>
          {errors.lgpdConsent && <p className="text-red-500 text-xs mt-1" role="alert">{errors.lgpdConsent}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 flex items-center justify-center px-6 py-4 bg-primary-orange hover:bg-secondary-orange text-white font-bold font-display text-base rounded-lg transition-colors shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
          aria-live="polite"
        >
          {isSubmitting ? 'Enviando seus dados...' : 'Receber orientação pelo WhatsApp'}
        </button>
        
        <p className="text-center text-[10px] text-gray-400 mt-3 font-sans">
          Não compartilhe senhas ou códigos de segurança. A BCred Fácil nunca cobra taxas antecipadas.
        </p>
      </form>
    </div>
  );
};
