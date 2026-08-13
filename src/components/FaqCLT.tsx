'use client';

import React, { useState } from 'react';

const faqCLT = [
  {
    q: "O que é o Crédito do Trabalhador?",
    a: "É uma modalidade de crédito destinada a trabalhadores com carteira assinada (regime CLT), com parcelas descontadas diretamente na folha de pagamento. A disponibilidade, as condições e a aprovação dependem das regras vigentes e da instituição financeira responsável."
  },
  {
    q: "Quem pode solicitar o Crédito do Trabalhador?",
    a: "Trabalhadores com vínculo CLT ativo que atendam aos critérios de elegibilidade da instituição financeira responsável, incluindo margem disponível, tempo de empresa e demais condições vigentes."
  },
  {
    q: "Como as parcelas são descontadas?",
    a: "As parcelas são descontadas diretamente em folha de pagamento, o que significa que o valor é debitado do seu salário antes do crédito em conta. Isso pode facilitar o gerenciamento do pagamento, mas depende de convênio e das regras da empresa empregadora."
  },
  {
    q: "A aprovação é garantida?",
    a: "Não. A aprovação está sujeita à análise de crédito, perfil do trabalhador, margem disponível e demais condições da instituição financeira responsável pela operação. A BCred Fácil orienta e encaminha a proposta, mas não é responsável pela decisão de crédito."
  },
  {
    q: "O que acontece se eu for demitido?",
    a: "Em caso de desligamento, as regras sobre o saldo devedor variam conforme o contrato e as políticas da instituição financeira. É fundamental entender as condições antes de contratar. Nossa equipe pode orientar você sobre os detalhes."
  }
];

export function FaqCLT() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-display font-extrabold text-primary-navy text-center mb-8">
        Dúvidas Frequentes — Crédito do Trabalhador CLT
      </h2>
      <div className="space-y-4">
        {faqCLT.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-all"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full px-6 py-4 text-left font-display font-bold text-base text-primary-navy flex justify-between items-center hover:bg-gray-50 focus:outline-none"
              aria-expanded={openFaq === index}
            >
              <span>{faq.q}</span>
              <span className="text-primary-orange text-xl font-bold ml-2">
                {openFaq === index ? '−' : '+'}
              </span>
            </button>

            {openFaq === index && (
              <div className="px-6 pb-4 text-sm text-gray-600 border-t border-gray-100 pt-3 leading-relaxed font-sans">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
