import React from 'react';
import type { Metadata } from 'next';
import { companyConfig } from '@/config/company';
import { MascotBe } from '@/components/MascotBe';
import { supabaseBrowser } from '@/services/supabase-browser';

export const metadata: Metadata = {
  title: 'Sobre a BCred Fácil | Atendimento em Nova Iguaçu',
  description: 'Conheça a BCred Fácil, sua forma de atendimento e o significado do mascote que representa rapidez, atenção e cuidado.',
  alternates: { canonical: '/sobre' },
  openGraph: {
    title: `Sobre a BCred Fácil | Atendimento em ${companyConfig.city}`,
    description: 'Conheça a BCred Fácil, sua forma de atendimento e o significado do mascote que representa rapidez, atenção e cuidado.',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default async function Sobre() {
  let texts: Record<string, string> = {};
  try {
    const { data } = await supabaseBrowser
      .from('page_content')
      .select('field_key, content')
      .eq('page_id', 'sobre');
    if (data) {
      data.forEach(item => {
        texts[item.field_key] = item.content;
      });
    }
  } catch (err) {
    console.error('Error fetching texts for Sobre page:', err);
  }

  const getText = (key: string, fallback: string) => {
    return texts[key] !== undefined && texts[key] !== null && texts[key] !== '' ? texts[key] : fallback;
  };

  return (
    <div className="py-10 bg-gray-50 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-primary-orange">Início</a> &gt; <span className="text-primary-navy font-semibold">Sobre Nós</span>
        </nav>

        {/* Section Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-primary-navy">
            {getText('sobre_title', 'Sobre a BCred Fácil')}
          </h1>
          <p className="text-gray-600 mt-2 text-base">
            {getText('sobre_subtitle', 'Compromisso local com o seu planejamento financeiro.')}
          </p>
        </div>

        {/* Mascot + Text Layout */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <MascotBe pose="reception" className="w-40 h-40 flex-shrink-0" />
            <div className="space-y-4">
              <h2 className="text-xl font-display font-extrabold text-primary-navy">
                {getText('sobre_hist_title', 'Atendimento próximo para decisões mais conscientes.')}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {getText('sobre_hist_p1', `A BCred Fácil atua no mercado de correspondência bancária com a missão de aproximar os clientes das melhores soluções de crédito disponíveis em Nova Iguaçu/RJ.`)} 
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {getText('sobre_hist_p2', 'Não somos um banco e não realizamos operações de crédito diretamente. Nosso papel é assessorar você, aposentado, pensionista do INSS ou trabalhador registrado CLT, para encontrar taxas e condições adequadas junto às instituições financeiras parceiras oficiais.')}
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl border border-gray-150 shadow-sm space-y-2">
            <h3 className="font-display font-bold text-base text-primary-navy">
              {getText('sobre_val1_title', 'Transparência')}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {getText('sobre_val1_desc', 'Explicamos detalhadamente todos os custos, taxas e prazos de cada proposta de empréstimo.')}
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-150 shadow-sm space-y-2">
            <h3 className="font-display font-bold text-base text-primary-navy">
              {getText('sobre_val2_title', 'Assessoria Próxima')}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {getText('sobre_val2_desc', 'Tratamos cada cliente de forma individualizada, entendendo seu perfil de renda e despesas.')}
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-150 shadow-sm space-y-2">
            <h3 className="font-display font-bold text-base text-primary-navy">
              {getText('sobre_val3_title', 'Segurança Regulada')}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {getText('sobre_val3_desc', 'Atuamos como Correspondente no País, em parceria com instituições financeiras contratantes, observando a regulamentação aplicável ao serviço.')}
            </p>
          </div>
        </div>

        {/* Physical Presence and Location Details */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-xl font-display font-extrabold text-primary-navy">
            {getText('sobre_loc_title', 'Onde Estamos Localizados')}
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {getText('sobre_loc_desc', `Nossa sede fica em Nova Iguaçu/RJ, no endereço:`)}
          </p>
          <div className="p-4 bg-gray-50 rounded-lg border text-sm text-gray-700">
            <p><strong>Endereço:</strong> {companyConfig.address}</p>
            <p><strong>Telefone:</strong> {companyConfig.phone}</p>
            <p><strong>WhatsApp:</strong> {companyConfig.whatsappFormatted}</p>
            <p><strong>E-mail Oficial:</strong> {companyConfig.email}</p>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed italic">
            {getText('sobre_loc_note', '* Se preferir, agende um horário para tomar um café conosco e realizar sua simulação de crédito presencialmente.')}
          </p>
        </div>

      </div>
    </div>
  );
}
