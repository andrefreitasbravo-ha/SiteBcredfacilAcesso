import React from 'react';
import { companyConfig } from '@/config/company';

export default function TermosUso() {
  return (
    <div className="py-10 bg-gray-50 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-primary-orange">Início</a> &gt; <span className="text-primary-navy font-semibold">Termos de Uso</span>
        </nav>

        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6 text-gray-700 text-sm leading-relaxed">
          <h1 className="text-3xl font-display font-extrabold text-primary-navy mb-4 border-b pb-2">
            Termos de Uso do Site
          </h1>
          <p className="text-xs text-gray-400">Última atualização: Agosto de 2026</p>

          <p>
            Bem-vindo ao site da <strong>BCred Fácil</strong>. Ao navegar e utilizar este site, você concorda em cumprir e vincular-se aos seguintes termos e condições de uso.
          </p>

          <h2 className="text-lg font-display font-bold text-primary-navy">1. Natureza do Serviço</h2>
          <p>
            O site tem como objetivo apresentar as soluções de crédito intermediadas pela BCred Fácil, como correspondente de vendas autorizado das instituições parceiras. A BCred Fácil <strong>não concede crédito diretamente</strong> nem cobra taxas pela assessoria realizada.
          </p>

          <h2 className="text-lg font-display font-bold text-primary-navy">2. Precisão das Informações</h2>
          <p>
            As simulações fornecidas constituem apenas estimativas baseadas nos perfis informados. As taxas finais, parcelas e custos efetivos dependem da aprovação cadastral e regras internas dos bancos parceiros no momento da contratação física ou digital.
          </p>

          <h2 className="text-lg font-display font-bold text-primary-navy">3. Limitação de Responsabilidade</h2>
          <p>
            A BCred Fácil empenha seus melhores esforços para garantir a segurança da navegação e exatidão das matérias informativas, contudo, não se responsabiliza por eventuais instabilidades técnicas do servidor ou discrepâncias decorrentes de atualizações legais das taxas bancárias que ainda não tenham sido implementadas.
          </p>

          <h2 className="text-lg font-display font-bold text-primary-navy">4. Contato</h2>
          <p>
            Em caso de dúvidas sobre nossos termos ou funcionamento dos serviços, fale conosco pelo canal oficial: {companyConfig.email}.
          </p>
        </div>

      </div>
    </div>
  );
}
