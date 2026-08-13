'use client';

import React from 'react';
import { companyConfig } from '@/config/company';
import { LeadForm } from '@/components/LeadForm';

export function ContatoContent() {
  return (
    <div className="py-10 bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Navegação estrutural">
          <a href="/" className="hover:text-primary-orange">Início</a> &gt; <span className="text-primary-navy font-semibold">Contato</span>
        </nav>

        {/* Section Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-primary-navy">
            Fale com a BCred Fácil pelos canais oficiais
          </h1>
          <p className="text-gray-600 mt-2 text-base">
            Utilize os contatos abaixo para receber orientação e confirmar qualquer comunicação em nome da BCred Fácil.
          </p>
        </div>

        {/* Anti-Scam Alert */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800">
          <strong>Atenção:</strong> A BCred Fácil nunca cobra taxas antecipadas, não solicita senhas ou códigos de verificação e não realiza contatos por aplicativos desconhecidos. Em caso de dúvida, confirme nossa identidade através dos canais listados abaixo.
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-lg font-display font-extrabold text-primary-navy">Canais Oficiais de Atendimento</h2>
              <div className="space-y-3 text-sm text-gray-700">
                {companyConfig.razaoSocial && (
                  <div>
                    <span className="font-semibold text-primary-navy">Razão Social:</span>{' '}
                    <span>{companyConfig.razaoSocial}</span>
                  </div>
                )}
                {companyConfig.cnpjIsReady && companyConfig.cnpj && (
                  <div>
                    <span className="font-semibold text-primary-navy">CNPJ:</span>{' '}
                    <span>{companyConfig.cnpj}</span>
                  </div>
                )}
                {companyConfig.address && (
                  <div>
                    <span className="font-semibold text-primary-navy">Endereço:</span>{' '}
                    <span>{companyConfig.address}</span>
                  </div>
                )}
                {companyConfig.phoneIsReady && companyConfig.phone && (
                  <div>
                    <span className="font-semibold text-primary-navy">Telefone:</span>{' '}
                    <a href={`tel:${companyConfig.phone}`} className="text-primary-blue hover:underline">{companyConfig.phone}</a>
                  </div>
                )}
                {companyConfig.whatsappIsReady && companyConfig.whatsapp && (
                  <div>
                    <span className="font-semibold text-primary-navy">WhatsApp oficial:</span>{' '}
                    <a
                      href={`https://wa.me/${companyConfig.whatsapp}?text=Olá, gostaria de informações sobre crédito consignado.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-blue hover:underline"
                    >
                      {companyConfig.whatsappFormatted}
                    </a>
                  </div>
                )}
                {companyConfig.email && (
                  <div>
                    <span className="font-semibold text-primary-navy">E-mail:</span>{' '}
                    <a href={`mailto:${companyConfig.email}`} className="text-primary-blue hover:underline">{companyConfig.email}</a>
                  </div>
                )}
                {companyConfig.workingHours && (
                  <div>
                    <span className="font-semibold text-primary-navy">Horário:</span>{' '}
                    <span>{companyConfig.workingHours}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden h-48 border border-gray-200 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-6 text-center">
                <svg className="w-10 h-10 text-primary-blue mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <h3 className="font-display font-bold text-primary-navy text-sm">Como Chegar</h3>
                <p className="text-[11px] text-gray-500 max-w-xs mt-1">
                  Encontre a rota mais rápida até nosso atendimento em {companyConfig.city}/{companyConfig.state}.
                </p>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(companyConfig.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 px-4 py-2 bg-primary-navy hover:bg-primary-blue text-white rounded text-xs font-bold transition-colors"
                >
                  Ver no Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <LeadForm sourcePage="contato" ctaText="Receber orientação pelo WhatsApp" />
          </div>

        </div>

      </div>
    </div>
  );
}
