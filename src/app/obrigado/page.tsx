'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { companyConfig } from '@/config/company';
import { MascotBe } from '@/components/MascotBe';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { LandingFooter } from '@/components/landing/LandingFooter';

function ObrigadoContent() {
  const searchParams = useSearchParams();
  const [whatsappLink, setWhatsappLink] = useState(`https://wa.me/${companyConfig.whatsapp}`);

  useEffect(() => {
    const product = searchParams.get('product') || 'geral';
    const nome = searchParams.get('nome') || '';
    const cidade = searchParams.get('cidade') || '';

    let baseText = 'Olá! Vim pelo site da BCred Fácil e gostaria de mais informações.';
    if (product === 'credito-consignado-inss') {
      baseText = 'Olá, vim pelo site da BCred Fácil e gostaria de entender as possibilidades de Crédito Consignado INSS.';
    } else if (product === 'credito-do-trabalhador') {
      baseText = 'Olá, vim pelo site da BCred Fácil e gostaria de entender o Crédito do Trabalhador para carteira assinada.';
    } else if (product === 'portabilidade') {
      baseText = 'Olá, vim pelo site da BCred Fácil e gostaria de analisar meu contrato para portabilidade.';
    } else if (product === 'antecipacao-fgts') {
      baseText = 'Olá, vim pelo site da BCred Fácil e gostaria de entender a antecipação do Saque-Aniversário FGTS.';
    }

    if (nome) baseText += ` Meu nome é ${nome}`;
    if (cidade) baseText += ` de ${cidade}`;
    baseText += '.';

    setWhatsappLink(`https://wa.me/${companyConfig.whatsapp}?text=${encodeURIComponent(baseText)}`);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <LandingHeader />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-12 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-navy mb-4 tracking-tight">
            Recebemos sua solicitação.
          </h1>
          
          <p className="text-base text-gray-600 mb-8 leading-relaxed font-sans">
            A equipe da BCred Fácil entrará em contato pelo WhatsApp. Para agilizar seu atendimento, você também pode iniciar a conversa agora mesmo clicando no botão abaixo.
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center px-6 py-4 bg-[#25D366] hover:bg-[#22bf5b] text-white text-base font-bold font-display rounded-xl transition-all shadow-lg hover:shadow-xl mb-8 group"
          >
            <svg className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Continuar pelo WhatsApp
          </a>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-left space-y-2">
            <h3 className="text-sm font-bold text-amber-800 flex items-center">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Orientações de Segurança
            </h3>
            <ul className="text-xs text-amber-700 space-y-1.5 pl-5 list-disc">
              <li>A BCred Fácil <strong>não solicita</strong> senhas bancárias ou códigos SMS.</li>
              <li>Nosso número oficial é apenas o <strong>{companyConfig.whatsappFormatted}</strong>.</li>
              <li>Aguarde o contato apenas da nossa equipe autorizada.</li>
            </ul>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}

export default function ObrigadoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Carregando...</div>}>
      <ObrigadoContent />
    </Suspense>
  );
}
