'use client';

import React, { useState } from 'react';

const faqINSS = [
  {
    q: "Quem pode solicitar o credito consignado INSS?",
    a: "Aposentados e pensionistas permanentes do INSS que possuam margem consignavel disponivel no beneficio. Beneficios temporarios ou assistenciais (como LOAS/BPC) podem ter restricoes ou regras especificas dependendo da legislacao vigente e das politicas das instituicoes financeiras."
  },
  {
    q: "O que e a margem consignavel?",
    a: "E a porcentagem maxima do seu beneficio mensal que pode ser comprometida com o pagamento das parcelas de emprestimo. Essa margem e regulamentada e varia conforme o tipo de beneficio e a legislacao vigente."
  },
  {
    q: "Como posso consultar a minha margem disponivel?",
    a: "A consulta pode ser feita diretamente pelo aplicativo ou site oficial do Meu INSS, emitindo o Extrato de Emprestimos Consignados. Esse documento auxilia nossa equipe a orientar voce sobre as opcoes disponiveis."
  },
  {
    q: "A contratacao exige reconhecimento facial?",
    a: "Sim. A maioria das instituicoes financeiras exige validacao por biometria facial por meio do celular do proprio cliente. Essa e uma medida de seguranca essencial para comprovar a identidade e prevenir fraudes."
  },
  {
    q: "Posso solicitar portabilidade do meu consignado?",
    a: "Sim. Se voce ja possui emprestimos em outras instituicoes, a portabilidade permite a transferencia do contrato com condicoes possivelmente mais favoraveis. A operacao esta sujeita a analise cadastral e aprovacao da instituicao financeira."
  }
];

export function FaqINSS() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-display font-extrabold text-primary-navy text-center mb-8">
        Duvidas Frequentes — Consignado INSS
      </h2>
      <div className="space-y-4">
        {faqINSS.map((faq, index) => (
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
                {openFaq === index ? '-' : '+'}
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
