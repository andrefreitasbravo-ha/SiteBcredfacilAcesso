'use client';

import React, { useState } from 'react';
import { companyConfig } from '@/config/company';

export function DuvidasContent({ initialTexts }: { initialTexts?: Record<string, string> }) {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const getText = (key: string, fallback: string) => {
    return initialTexts && initialTexts[key] !== undefined && initialTexts[key] !== null && initialTexts[key] !== '' 
      ? initialTexts[key] 
      : fallback;
  };

  const toggle = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  const sections = [
    {
      title: "Perguntas Gerais",
      items: [
        {
          id: "g1",
          q: "A BCred Fácil é um banco?",
          a: `Não, a ${companyConfig.name} não é uma instituição financeira. Atuamos como ${companyConfig.model} de crédito consignado e outras soluções de financiamento, intermediando o contato entre você e os bancos parceiros oficiais de forma transparente.`
        },
        {
          id: "g2",
          q: "A simulação garante a aprovação?",
          a: "Não. A simulação apresenta condições estimadas com base nas informações iniciais. A contratação efetiva e a liberação do crédito estão sujeitas à análise da instituição financeira parceira, margem disponível e verificação de documentos."
        },
        {
          id: "g3",
          q: "Existe algum pagamento antecipado?",
          a: "Absolutamente NÃO! Nós nunca solicitamos depósitos, transferências, taxas de aval ou pagamentos antecipados para liberação de empréstimos. Qualquer cobrança desse tipo é golpe. Nosso serviço de assessoria e simulação é 100% gratuito."
        },
        {
          id: "g4",
          q: "Como confirmo que estou falando com o canal oficial?",
          a: `Nosso WhatsApp oficial de atendimento é o ${companyConfig.whatsappFormatted} e o nosso site oficial é o único endereço autorizado para simulações online. Desconfie de contatos por números diferentes.`
        },
        {
          id: "g5",
          q: "Meus dados ficam protegidos?",
          a: "Sim. Seus dados são coletados exclusivamente para a análise de crédito junto aos parceiros autorizados e tratados com total confidencialidade, seguindo rigorosamente a Lei Geral de Proteção de Dados (LGPD)."
        },
        {
          id: "g6",
          q: "Quais documentos podem ser necessários?",
          a: "Geralmente, são exigidos: documento de identidade oficial com foto (RG ou CNH), comprovante de residência atualizado e comprovante de rendimentos (extrato do benefício INSS ou holerite)."
        },
        {
          id: "g7",
          q: "Como são definidas as taxas e parcelas?",
          a: "Elas são definidas de acordo com as regras estabelecidas pelos bancos parceiros, baseando-se no valor solicitado, margem livre, prazo contratual escolhido e teto regulatório das modalidades."
        },
        {
          id: "g8",
          q: "Posso desistir depois de receber a proposta?",
          a: "Sim. A simulação e a análise de crédito não criam nenhuma obrigação contratual. Você tem total autonomia para aceitar ou recusar as condições antes da formalização e assinatura digital do contrato."
        }
      ]
    },
    {
      title: "Perguntas sobre Crédito Consignado INSS",
      items: [
        {
          id: "i1",
          q: "Quem pode solicitar crédito consignado INSS?",
          a: "Aposentados e pensionistas permanentes do INSS que possuam margem consignável disponível no benefício. Benefícios temporários ou assistenciais (como LOAS/BPC) podem ter restrições dependendo da legislação vigente e da política de aceitação dos bancos parceiros."
        },
        {
          id: "i2",
          q: "O que é margem consignável?",
          a: "É a porcentagem máxima do seu benefício mensal que pode ser comprometida com o pagamento das parcelas de empréstimo. Por padrão regulatório, essa margem costuma ser dividida entre empréstimos convencionais e cartões consignados de benefício."
        },
        {
          id: "i3",
          q: "Como consultar contratos no Meu INSS?",
          a: "Você pode acessar o portal Meu INSS (meu.inss.gov.br) e emitir o Extrato de Empréstimos Consignados para conferir os contratos ativos, parcelas e a margem disponível."
        },
        {
          id: "i4",
          q: "A solicitação precisa de reconhecimento facial?",
          a: "Sim. A maioria dos bancos parceiros exige a validação por biometria facial através do celular do próprio cliente. Essa é uma medida de proteção essencial para comprovar a identidade e evitar fraudes."
        },
        {
          id: "i5",
          q: "Posso solicitar portabilidade do consignado?",
          a: "Sim. Se você já tem empréstimos em outros bancos, a portabilidade permite transferir o contrato para outro parceiro com condições possivelmente mais favoráveis. Consulte nossa página de portabilidade para entender as diferenças."
        }
      ]
    },
    {
      title: "Perguntas sobre Crédito do Trabalhador (CLT)",
      items: [
        {
          id: "c1",
          q: "O que é o Crédito do Trabalhador?",
          a: "É uma modalidade de crédito regulamentada destinada a trabalhadores com carteira assinada (CLT). Permite o desconto das parcelas diretamente na folha de pagamento do trabalhador, conforme a legislação e convênio da empresa com a instituição financeira."
        },
        {
          id: "c2",
          q: "O Crédito do Trabalhador é igual à antecipação do FGTS?",
          a: "Não. São produtos distintos. O Crédito do Trabalhador é um empréstimo com desconto em folha salarial. A antecipação do Saque-Aniversário FGTS é um produto separado que usa o saldo do Fundo de Garantia como garantia. Se tiver dúvidas sobre qual produto é adequado para você, consulte nossa equipe."
        },
        {
          id: "c3",
          q: "A empresa onde trabalho precisa autorizar?",
          a: "Depende da modalidade. Para crédito com desconto em folha, pode ser necessário que a empresa tenha convênio com a instituição financeira. Consulte nossa equipe para verificar as opções disponíveis para o seu caso."
        },
        {
          id: "c4",
          q: "O que acontece com o crédito se houver demissão?",
          a: "Em caso de demissão, o desconto em folha cessa. As condições para continuidade do pagamento das parcelas restantes variam conforme o contrato e a instituição financeira. É importante verificar essas condições antes da contratação."
        },
        {
          id: "c5",
          q: "Quem está negativado pode solicitar?",
          a: "Depende da modalidade e da política da instituição financeira parceira. Em algumas modalidades, a análise considera outros fatores além do histórico de crédito. Consulte nossa equipe para verificar as opções disponíveis."
        }
      ]
    }
  ];

  return (
    <div className="py-10 bg-gray-50 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Navegação estrutural">
          <a href="/" className="hover:text-primary-orange">Início</a> &gt; <span className="text-primary-navy font-semibold">Dúvidas Frequentes</span>
        </nav>

        {/* Section Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-primary-navy">
            {getText('faq_page_title', 'Dúvidas sobre Crédito Consignado')}
          </h1>
          <p className="text-gray-600 mt-2 text-base">
            {getText('faq_page_subtitle', 'Respostas claras sobre INSS, Crédito do Trabalhador, portabilidade e atendimento.')}
          </p>
        </div>

        {/* Grouped Accordions */}
        <div className="space-y-12">
          {sections.map((section, sIndex) => (
            <div key={sIndex} className="space-y-4">
              <h2 className="text-xl font-display font-extrabold text-primary-navy border-b pb-2">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-xl border border-gray-150 overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => toggle(item.id)}
                      className="w-full px-6 py-4 text-left font-display font-bold text-base text-primary-navy flex justify-between items-center hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange"
                      aria-expanded={openIndex === item.id}
                      id={`faq-btn-${item.id}`}
                      aria-controls={`faq-panel-${item.id}`}
                    >
                      <span>{item.q}</span>
                      <span className="text-primary-orange text-xl font-bold ml-2" aria-hidden="true">
                        {openIndex === item.id ? '−' : '+'}
                      </span>
                    </button>
                    
                    <div
                      id={`faq-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${item.id}`}
                      hidden={openIndex !== item.id}
                      className="px-6 pb-4 text-sm text-gray-600 border-t border-gray-100 pt-3 leading-relaxed font-sans"
                    >
                      {item.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Last Updated */}
        <p className="text-xs text-gray-400 text-center mt-12">
          Última atualização: agosto de 2025. As regras das modalidades podem mudar. Consulte nossa equipe para informações atualizadas.
        </p>

      </div>
    </div>
  );
}
