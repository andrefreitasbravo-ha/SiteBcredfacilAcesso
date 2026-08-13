import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { companyConfig } from '@/config/company';
import { LeadForm } from '@/components/LeadForm';
import { FinancialConditions } from '@/components/FinancialConditions';
import { Breadcrumb } from '@/components/products/Breadcrumb';
import { ProductHero } from '@/components/products/ProductHero';
import { ProductHowItWorks } from '@/components/products/ProductHowItWorks';
import { ProductSecurity } from '@/components/products/ProductSecurity';
import { ProductFaq } from '@/components/products/ProductFaq';
import { ProductFinalCta } from '@/components/products/ProductFinalCta';
import { supabaseBrowser } from '@/services/supabase-browser';

export const metadata: Metadata = {
  title: `Portabilidade de Consignado em Nova Iguaçu | ${companyConfig.name}`,
  description: `Compare taxa, parcela, prazo e CET do seu empréstimo consignado antes de solicitar portabilidade para outra instituição. Atendimento rápido e seguro.`,
  alternates: { canonical: '/portabilidade-consignado' },
  openGraph: {
    title: `Portabilidade de Consignado em Nova Iguaçu | ${companyConfig.name}`,
    description: `A BCred Fácil ajuda você a analisar taxa, parcela e CET do seu consignado atual antes de solicitar portabilidade. Simulação segura pelo WhatsApp.`,
    url: 'https://www.bcredfacil.com.br/portabilidade-consignado',
    siteName: companyConfig.name,
    locale: 'pt_BR',
    type: 'website',
  },
};

export default async function PortabilidadeConsignado() {
  let texts: Record<string, string> = {};
  try {
    const { data } = await supabaseBrowser
      .from('page_content')
      .select('field_key, content')
      .eq('page_id', 'portabilidade');
    if (data) {
      data.forEach(item => {
        texts[item.field_key] = item.content;
      });
    }
  } catch (err) {
    console.error('Error fetching texts for Portabilidade page:', err);
  }

  const getText = (key: string, fallback: string) => {
    return texts[key] !== undefined && texts[key] !== null && texts[key] !== '' ? texts[key] : fallback;
  };

  return (
    <div className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Breadcrumb
          items={[
            { label: 'Início', href: '/' },
            { label: 'Portabilidade de Consignado' },
          ]}
        />

        <ProductHero
          badge={getText('port_hero_badge', "Para quem já possui um contrato consignado")}
          title={getText('port_hero_title', "Compare seu consignado antes de solicitar a portabilidade.")}
          description={getText('port_hero_desc', "A BCred Fácil presta serviço de orientação e atendimento, ajudando você a analisar taxa, parcela, prazo e Custo Efetivo Total, sujeitos às condições das instituições financeiras parceiras.")}
          primaryCtaText={getText('port_hero_btn1', "Analisar meu contrato")}
          secondaryCtaText={getText('port_hero_btn2', "Falar com consultor")}
          secondaryCtaHref="#o-que-e"
          microcopy={getText('port_hero_micro', "A análise não garante redução de taxa, parcela ou aprovação da portabilidade.")}
          mascotPose="pointer" // Usando o mascote apontando/analisando
          whatsappMessage="Olá!%20Gostaria%20de%20analisar%20meu%20contrato%20para%20uma%20possível%20portabilidade."
          trustSignals={[
            'Análise transparente',
            'Sem promessas irreais',
            'Foco no Custo Efetivo Total',
          ]}
        />

        {/* 1. O QUE É PORTABILIDADE */}
        <section id="o-que-e" className="py-10 md:py-14 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-navy tracking-tight mb-4">
              {getText('port_elig_title', "Quem pode solicitar a Portabilidade?")}
            </h2>
            <div className="prose prose-lg text-gray-600 font-sans max-w-3xl">
              <p>
                {getText('port_elig_intro', "A portabilidade é voltada para beneficiários do INSS e outros públicos elegíveis que já possuam empréstimos consignados ativos e queiram transferi-los.")}
              </p>
              <div className="bg-primary-blue/10 p-5 rounded-xl border border-primary-blue/20 mt-6">
                <p className="text-primary-navy m-0">
                  {getText('port_elig_warning', "A transferência não é automática e depende da aceitação da instituição financeira de destino, dos limites regulamentados e do saldo devedor.")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. QUANDO VALE A PENA */}
        <section className="py-10 md:py-14 bg-gray-50 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-navy tracking-tight mb-6">
              Quando vale a pena analisar uma portabilidade?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                getText('port_elig_item1', 'Possuir empréstimos consignados ativos em outras instituições'),
                getText('port_elig_item2', 'Estar dentro das regras regulatórias de taxas e prazos para portabilidade')
              ].map((item, i) => (
                <div key={i} className="flex items-start bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <svg className="w-5 h-5 text-primary-orange flex-shrink-0 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-sm font-medium text-primary-navy font-sans">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl text-sm text-amber-800 font-sans leading-relaxed max-w-3xl">
              <strong>Lembre-se:</strong> Uma parcela menor não significa necessariamente um custo total menor. Compare sempre o prazo, a taxa e o CET.
            </div>
          </div>
        </section>

        {/* 3. COMO FUNCIONA */}
        <ProductHowItWorks
          title={getText('port_hw_title', "Como funciona a transferência do contrato?")}
          subtitle={getText('port_hw_subtitle', "Etapas para trazer seu contrato para melhores condições com acompanhamento próximo.")}
          dark
          steps={[
            {
              title: 'Envie informações básicas',
              description: 'Compartilhe com a equipe os dados básicos do seu contrato atual.',
            },
            {
              title: 'Verificação inicial',
              description: 'A equipe da BCred verifica as possibilidades disponíveis no mercado.',
            },
            {
              title: 'Comparação de propostas',
              description: 'Compare seu contrato atual com a nova proposta apresentada.',
            },
            {
              title: 'Confira as condições',
              description: 'Analise taxa, parcela, novo prazo e CET com toda a atenção.',
            },
            {
              title: 'Decida se quer prosseguir',
              description: 'Caso concorde, a solicitação é encaminhada.',
            },
            {
              title: 'Condução pela instituição',
              description: 'A instituição financeira responsável conduzirá as etapas de portabilidade.',
            },
          ]}
          disclaimer={getText('port_hw_disc', "A BCred não realiza a portabilidade diretamente. Orientamos você e enviamos sua intenção para as instituições financeiras parceiras credenciadas.")}
        />

        {/* 4. SOBRE O "TROCO" */}
        <section className="py-10 md:py-14 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-navy tracking-tight mb-4">
              Portabilidade e possibilidade de valor adicional
            </h2>
            <p className="text-base text-gray-600 leading-relaxed font-sans max-w-2xl mx-auto">
              Em algumas operações de portabilidade, pode existir a possibilidade de uma nova análise de crédito que resulte em um valor adicional disponibilizado (frequentemente chamado no mercado de "troco"). 
            </p>
            <p className="text-base text-primary-navy font-semibold mt-4 bg-gray-50 inline-block px-4 py-2 rounded-lg">
              Essa possibilidade depende das regras da modalidade, do saldo devedor, da margem disponível e da análise da instituição financeira, e <strong>não é garantida</strong>.
            </p>
          </div>
        </section>

        {/* 5. SEGURANÇA */}
        <ProductSecurity
          title={getText('port_sec_title', "Segurança durante a portabilidade de crédito")}
          items={[
            {
              type: 'danger',
              label: 'Não realize depósitos para portabilidade',
              detail: 'A portabilidade é uma transferência de dívida entre bancos. Você não deve pagar boletos ou fazer transferências para efetivá-la.',
            },
            {
              type: 'safe',
              label: 'Confira a instituição de destino',
              detail: 'Antes de assinar, verifique quem é o banco que está recebendo seu contrato.',
            },
            {
              type: 'safe',
              label: 'Compare o Custo Efetivo Total (CET)',
              detail: 'O foco deve ser a redução do custo total da dívida, não apenas o valor mensal da parcela.',
            },
          ]}
          note={getText('port_sec_note', "Atenção com links suspeitos. Nosso atendimento oficial acontece somente pelo número de WhatsApp verificado.")}
        />

        {/* 6. FORMULÁRIO */}
        <section id="analisar" className="py-10 md:py-14 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-navy">
                {getText('port_sim_title', "Consulte a portabilidade do seu empréstimo")}
              </h2>
              <p className="text-gray-600 text-sm mt-2 font-sans">
                {getText('port_sim_desc', "Preencha os dados e ajudamos você a analisar se a portabilidade trará taxas mais vantajosas para o seu contrato.")}
              </p>
            </div>
            <LeadForm
              defaultProfile="portabilidade"
              sourcePage="portabilidade-consignado"
              ctaText="Analisar meu contrato"
            />
          </div>
        </section>

        {/* 7. FAQ */}
        <ProductFaq
          title={getText('port_faq_title', "Dúvidas frequentes sobre Portabilidade")}
          subtitle={getText('port_faq_subtitle', "Respostas para dúvidas comuns sobre custos, prazos e andamento de portabilidade.")}
          questions={[
            {
              question: 'O que é portabilidade de consignado?',
              answer: 'É a possibilidade de transferir um empréstimo ou financiamento de uma instituição financeira para outra, mediante a quitação do saldo devedor pela nova instituição.',
            },
            {
              question: 'A portabilidade reduz a parcela?',
              answer: 'Não necessariamente. O objetivo principal costuma ser a redução da taxa de juros ou do Custo Efetivo Total (CET), mas o valor final da parcela depende da negociação das novas condições.',
            },
            {
              question: 'Posso mudar o contrato para qualquer banco?',
              answer: 'Você pode solicitar a portabilidade para qualquer instituição que ofereça a mesma modalidade de crédito e aceite a operação, desde que as condições estejam de acordo com a regulamentação.',
            },
            {
              question: 'O prazo do empréstimo pode aumentar?',
              answer: 'A regulamentação original prevê que o prazo não pode ser superior ao restante no contrato original. No entanto, algumas instituições oferecem a portabilidade associada a um refinanciamento, o que altera o prazo. Avalie com cuidado.',
            },
            {
              question: 'Existe algum custo para solicitar a portabilidade?',
              answer: 'Não. A resolução do Banco Central proíbe a cobrança de tarifas pela instituição credora original para efetivar a portabilidade.',
            },
            {
              question: 'Preciso ter margem disponível para fazer a portabilidade?',
              answer: 'Se a operação for apenas a transferência da dívida com as mesmas condições de valor da parcela ou menor, normalmente não exige margem livre. Se envolver aumento de prazo ou valor, a margem precisará ser analisada.',
            },
            {
              question: 'Portabilidade e refinanciamento são a mesma coisa?',
              answer: 'Não. Refinanciamento é a renegociação do contrato na mesma instituição financeira, geralmente alterando prazos ou valores. A portabilidade é a transferência da dívida para outra instituição.',
            },
            {
              question: 'Posso receber algum valor adicional (troco)?',
              answer: 'Em alguns casos, se a nova instituição oferecer condições diferentes ou houver refinanciamento conjunto, pode haver liberação de um valor adicional. Mas isso não é garantido e depende de análise.',
            },
            {
              question: 'Quanto tempo demora a portabilidade?',
              answer: 'Os prazos são regulamentados e envolvem a troca de informações entre os bancos através de um sistema eletrônico. O prazo total varia e a instituição responsável informará a previsão.',
            },
            {
              question: 'Quais dados são necessários para uma análise inicial?',
              answer: 'Para uma avaliação preliminar, costuma-se precisar do valor da parcela atual, do prazo restante e, se possível, do número do contrato. A BCred orientará sobre como obter essas informações sem compartilhar senhas.',
            },
          ]}
          pageUrl="https://www.bcredfacil.com.br/portabilidade-consignado"
        />

        {/* 8. CONDIÇÕES FINANCEIRAS (Geral) */}
        <div className="py-6">
          <FinancialConditions />
        </div>

        {/* 9. LINKS INTERNOS */}
        <section className="py-8 bg-gray-50 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-sm font-display font-bold text-primary-navy mb-4 uppercase tracking-wider">
              Saiba mais
            </h3>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/credito-consignado-inss"
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-primary-blue hover:border-primary-blue hover:bg-primary-blue/5 transition-colors"
              >
                Crédito Consignado INSS →
              </Link>
              <Link
                href="/seguranca"
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-primary-navy hover:border-primary-navy/30 hover:bg-gray-50 transition-colors"
              >
                Segurança e Prevenção a Golpes →
              </Link>
              <Link
                href="/duvidas"
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-primary-navy hover:border-primary-navy/30 hover:bg-gray-50 transition-colors"
              >
                Dúvidas Frequentes →
              </Link>
              <Link
                href="/contato"
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-primary-navy hover:border-primary-navy/30 hover:bg-gray-50 transition-colors"
              >
                Contato →
              </Link>
            </div>
          </div>
        </section>

        {/* 10. CTA FINAL */}
        <ProductFinalCta
          title={getText('ctafinal_title', "Quer comparar seu contrato antes de decidir?")}
          subtitle={getText('ctafinal_desc', "Fale com a equipe da BCred Fácil e entenda como solicitar uma análise sem compromisso.")}
          ctaText={getText('port_hero_btn1', "Analisar meu contrato")}
          whatsappMessage="Olá!%20Gostaria%20de%20analisar%20meu%20contrato%20para%20uma%20possível%20portabilidade."
        />

      </div>
    </div>
  );
}
