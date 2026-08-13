'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { companyConfig } from '@/config/company';
import { Container } from './Container';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // Hide global footer on landing pages
  if (pathname.startsWith('/simule')) {
    return null;
  }

  return (
    <footer className="bg-primary-navy text-white pt-12 pb-6 border-t-4 border-primary-orange">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand and Description */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <img
                src="/logobcredfacil.png?v=3"
                alt="BCred Fácil"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-gray-300">
              Orientação clara, segurança e transparência na contratação de crédito consignado INSS e crédito do trabalhador.
            </p>
            <div className="text-sm text-gray-300">
              <strong>Horário de Atendimento:</strong>
              <p>{companyConfig.workingHours}</p>
            </div>
          </div>

          {/* Site links */}
          <div>
            <h3 className="font-display font-bold text-base text-primary-orange mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-white transition-colors">Página Inicial</Link></li>
              <li><Link href="/credito-consignado-inss" className="hover:text-white transition-colors">Consignado INSS</Link></li>
              <li><Link href="/credito-do-trabalhador-clt" className="hover:text-white transition-colors">Crédito CLT</Link></li>
              <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre a Empresa</Link></li>
              <li><Link href="/seguranca" className="hover:text-white transition-colors">Segurança contra Golpes</Link></li>
              <li><Link href="/duvidas" className="hover:text-white transition-colors">Dúvidas Frequentes</Link></li>
            </ul>
          </div>

          {/* Legal / Institutional links */}
          <div>
            <h3 className="font-display font-bold text-base text-primary-orange mb-4">Políticas e Termos</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/politica-de-privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link></li>
              <li><Link href="/politica-de-cookies" className="hover:text-white transition-colors">Política de Cookies</Link></li>
              <li><Link href="/termos-de-uso" className="hover:text-white transition-colors">Termos de Uso</Link></li>
              <li><Link href="/contato" className="hover:text-white transition-colors">Fale Conosco</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-display font-bold text-base text-primary-orange mb-4">Contato Oficial</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-orange mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{companyConfig.address}</span>
              </li>
              {companyConfig.phoneIsReady && (
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-primary-orange mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{companyConfig.phone}</span>
                </li>
              )}
              <li className="flex items-center">
                <svg className="h-5 w-5 text-primary-orange mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{companyConfig.email}</span>
              </li>
              {companyConfig.instagram && (
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-primary-orange mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  <a href={companyConfig.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    Instagram Oficial
                  </a>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer Box */}
        <div className="border-t border-white/10 pt-8 pb-6 text-[12px] text-gray-400 space-y-4 leading-relaxed">
          <p className="font-semibold text-gray-300">
            INFORMAÇÕES REGULATÓRIAS E LEGAIS IMPORTANTES:
          </p>
          <p>
            A {companyConfig.name} (Razão Social: <span className="font-mono">{companyConfig.razaoSocial}</span>{companyConfig.cnpjIsReady && <>, CNPJ: <span className="font-mono">{companyConfig.cnpj}</span></>}, com sede em {companyConfig.address}) atua no atendimento, orientação e encaminhamento de propostas junto às instituições financeiras disponíveis em sua operação. A análise, aprovação e contratação são realizadas pela instituição financeira responsável.
          </p>
          <p>
            A {companyConfig.name} não é uma instituição financeira e não realiza operações de crédito diretamente. As solicitações estão sujeitas a análise de crédito, disponibilidade de margem consignável e demais condições da instituição financeira parceira responsável pela operação de crédito. As taxas de juros, prazos de pagamento, tarifas e o Custo Efetivo Total (CET) variam conforme a instituição parceira escolhida, a modalidade contratada e o perfil do cliente. Consulte sempre o CET antes de confirmar a contratação.
          </p>
          <p>
            <strong>Aviso de segurança:</strong> Nós NÃO solicitamos pagamentos antecipados, taxas de aval ou depósitos em conta de terceiros para fins de liberação de qualquer modalidade de crédito. Caso receba mensagens solicitando pagamentos para liberação de empréstimo, entre em contato imediatamente pelos nossos canais oficiais listados no site.
          </p>
          {companyConfig.registroRegulatorio && (
            <p>
              Identificação regulatória: {companyConfig.registroRegulatorio}
            </p>
          )}
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-6 text-center text-xs text-gray-400">
          <p>© {currentYear} {companyConfig.name}. Todos os direitos reservados.{companyConfig.cnpjIsReady && <> CNPJ: {companyConfig.cnpj}.</>}</p>
        </div>
      </Container>
    </footer>
  );
};
