import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { companyConfig } from '@/config/company';
import { LeadForm } from '@/components/LeadForm';
import { FinancialConditions } from '@/components/FinancialConditions';
import { Breadcrumb } from '@/components/products/Breadcrumb';
import { ProductHero } from '@/components/products/ProductHero';
import { ProductEligibility } from '@/components/products/ProductEligibility';
import { ProductHowItWorks } from '@/components/products/ProductHowItWorks';
import { ProductSecurity } from '@/components/products/ProductSecurity';
import { ProductFaq } from '@/components/products/ProductFaq';
import { ProductFinalCta } from '@/components/products/ProductFinalCta';
import { supabaseBrowser } from '@/services/supabase-browser';

// NOTE: This page targets: "Crédito do Trabalhador em Nova Iguaçu"
// IMPORTANT: Do NOT mix this page with Saque-Aniversário FGTS.
// FGTS advance is a separate product covered at /antecipacao-saque-aniversario-fgts

export const metadata: Metadata = {
  title: `Crédito do Trabalhador CLT em Nova Iguaçu | ${companyConfig.name}`,
  description: `Entenda o Crédito do Trabalhador para carteira assinada e consulte possibilidades com atendimento rápido e orientação clara em Nova Iguaçu.`,
  alternates: { canonical: '/credito-do-trabalhador-clt' },
  openGraph: {
    title: `Crédito do Trabalhador CLT em Nova Iguaçu | ${companyConfig.name}`,
    description: `Consulte o Crédito do Trabalhador com desconto em folha para trabalhadores elegíveis com carteira assinada em Nova Iguaçu. Orientação rápida pelo WhatsApp.`,
    url: 'https://www.bcredfacil.com.br/credito-do-trabalhador-clt',
    siteName: companyConfig.name,
    locale: 'pt_BR',
    type: 'website',
  },
};

export default async function CreditoDoTrabalhadorClt() {
  let texts: Record<string, string> = {};
  try {
    const { data } = await supabaseBrowser
      .from('page_content')
      .select('field_key, content')
      .eq('page_id', 'clt');
    if (data) {
      data.forEach(item => {
        texts[item.field_key] = item.content;
      });
    }
  } catch (err) {
    console.error('Error fetching texts for CLT page:', err);
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
            { label: 'Crédito do Trabalhador CLT' },
          ]}
        />

        <ProductHero
          badge={getText('clt_hero_badge', "Para quem trabalha com carteira assinada")}
          title={getText('clt_hero_title', "Crédito do Trabalhador em Nova Iguaçu com orientação rápida e sem enrolação.")}
          description={getText('clt_hero_desc', "Entenda as possibilidades de crédito com desconto em folha para trabalhadores elegíveis. A BCred Fácil explica cada etapa e acompanha você pelo WhatsApp.")}
          primaryCtaText={getText('clt_hero_btn1', "Consultar possibilidades para CLT")}
          secondaryCtaText={getText('clt_hero_btn2', "Entender como funciona")}
          secondaryCtaHref="#como-funciona"
          microcopy={getText('clt_hero_micro', "A disponibilidade e as condições dependem do vínculo, do perfil e da instituição responsável.")}
          mascotPose="guide"
          whatsappMessage="Olá!%20Gostaria%20de%20consultar%20possibilidades%20de%20Crédito%20do%20Trabalhador%20CLT."
          trustSignals={[
            'Retorno rápido',
            'Orientação sem enrolação',
            'Sem prometer aprovação',
          ]}
        />

        {/* 1. ELEGIBILIDADE */}
        <ProductEligibility
          title={getText('clt_elig_title', "Quem pode consultar o Crédito do Trabalhador?")}
          intro={getText('clt_elig_intro', "A modalidade é destinada a trabalhadores elegíveis com vínculo formal, conforme as regras vigentes e as condições das instituições financeiras habilitadas.")}
          items={[
            { label: getText('clt_elig_item1', 'Empregados com carteira assinada (CLT)') },
            { label: getText('clt_elig_item2', 'Trabalhadores domésticos elegíveis') },
            { label: getText('clt_elig_item3', 'Trabalhadores rurais elegíveis') },
            { label: getText('clt_elig_item4', 'Empregados de microempreendedores individuais, quando aplicável') },
            { label: getText('clt_elig_item5', 'Outros públicos previstos pelas regras da modalidade') },
          ]}
          warning={getText('clt_elig_warning', "O vínculo de emprego não garante aprovação. A solicitação depende das regras vigentes, da margem disponível, do perfil e da análise da instituição financeira responsável.")}
        />

        {/* 2. COMO FUNCIONA */}
        <section id="como-funciona">
          <ProductHowItWorks
            title={getText('clt_hw_title', "Como funciona o Crédito do Trabalhador?")}
            subtitle={getText('clt_hw_subtitle', "Parcelas descontadas em folha para trabalhadores elegíveis. Veja as etapas.")}
            dark
            steps={[
              {
                title: 'Informe seu vínculo e necessidade',
                description: 'Fale com a BCred pelo WhatsApp e informe que possui carteira assinada.',
              },
              {
                title: 'Consulte as possibilidades disponíveis',
                description: 'A equipe verifica quais instituições podem analisar sua solicitação.',
              },
              {
                title: 'Compare taxa, prazo, parcela e CET',
                description: 'Analise todas as condições com atenção antes de decidir.',
              },
              {
                title: 'Confirme pelos canais da instituição',
                description: 'Caso concorde, siga o procedimento indicado pela instituição financeira responsável.',
              },
            ]}
            disclaimer={getText('clt_hw_disc', "A BCred Fácil não garante aprovação, taxa, valor ou prazo. A empresa empregadora não aprova o crédito diretamente — a decisão é da instituição financeira.")}
          />
        </section>

        {/* 3. SEÇÃO EDUCATIVA: CLT x FGTS */}
        <section className="py-10 md:py-14 bg-gray-50 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-navy tracking-tight mb-4">
              {getText('clt_diff_title', "Crédito do Trabalhador é a mesma coisa que antecipação do FGTS?")}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed font-sans mb-6 max-w-2xl">
              {getText('clt_diff_desc', "Não. São modalidades distintas com regras, dinâmicas e condições diferentes.")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
              <div className="bg-white rounded-2xl p-5 border border-primary-blue/20 shadow-sm">
                <h3 className="font-display font-bold text-base text-primary-blue mb-3">
                  Crédito do Trabalhador
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-blue font-bold">•</span>
                    Desconto direto em folha de pagamento
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-blue font-bold">•</span>
                    Destinado a trabalhadores elegíveis com vínculo formal
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-blue font-bold">•</span>
                    Depende do vínculo, margem e das regras da modalidade
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                <h3 className="font-display font-bold text-base text-gray-700 mb-3">
                  Antecipação do Saque-Aniversário FGTS
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 font-bold">•</span>
                    Vinculada ao Saque-Aniversário do FGTS
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 font-bold">•</span>
                    Depende do saldo disponível no FGTS
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 font-bold">•</span>
                    Possui dinâmica própria de contratação
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-500 font-sans mt-4 max-w-xl">
              Cada produto possui regras próprias. Antes de consultar, identifique qual modalidade se aplica ao seu perfil.{' '}
              <Link href="/antecipacao-saque-aniversario-fgts" className="text-primary-blue hover:underline">
                Saiba mais sobre a antecipação do FGTS →
              </Link>
            </p>
          </div>
        </section>

        {/* 4. SEGURANÇA */}
        <ProductSecurity
          title={getText('clt_sec_title', "Segurança na sua contratação com carteira assinada")}
          items={[
            {
              type: 'danger',
              label: 'Não compartilhe senhas bancárias',
              detail: 'Nenhum consultor ou correspondente oficial precisa da sua senha bancária para simular crédito.',
            },
            {
              type: 'danger',
              label: 'Não informe códigos de SMS',
              detail: 'Códigos enviados por SMS funcionam como assinaturas digitais. Não os repasse a ninguém.',
            },
            {
              type: 'danger',
              label: 'Não realize pagamentos antecipados',
              detail: 'Não existe taxa para liberação de crédito. Qualquer cobrança desse tipo é golpe.',
            },
            {
              type: 'safe',
              label: 'Confirme o canal oficial de atendimento',
              detail: 'Verifique se o número de contato corresponde ao WhatsApp oficial da BCred Fácil.',
            },
            {
              type: 'safe',
              label: 'Leia o contrato com atenção',
              detail: 'Confira taxa, parcela, prazo e CET antes de assinar qualquer documento digital.',
            },
          ]}
          note={getText('clt_sec_note', "Mantenha seus dados seguros. Nunca pague nenhuma taxa antecipada e confirme sempre o canal oficial da BCred.")}
        />

        {/* 5. FORMULÁRIO */}
        <section id="simulador" className="py-10 md:py-14 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-navy">
                {getText('clt_sim_title', "Consulte suas possibilidades para CLT")}
              </h2>
              <p className="text-gray-600 text-sm mt-2 font-sans">
                {getText('clt_sim_desc', "Preencha e nossa equipe entra em contato para orientar você sobre as opções disponíveis para o seu perfil.")}
              </p>
            </div>
            <LeadForm
              defaultProfile="credito-do-trabalhador"
              sourcePage="credito-do-trabalhador-clt"
              ctaText="Consultar possibilidades para CLT"
            />
          </div>
        </section>

        {/* 6. CONDIÇÕES */}
        <div className="py-6">
          <FinancialConditions />
        </div>

        {/* 7. FAQ */}
        <ProductFaq
          title={getText('clt_faq_title', "Dúvidas frequentes sobre Crédito do Trabalhador")}
          subtitle={getText('clt_faq_subtitle', "Respostas claras sobre a modalidade CLT.")}
          questions={[
            {
              question: 'Quem pode solicitar o Crédito do Trabalhador?',
              answer: 'Trabalhadores elegíveis com vínculo formal (CLT). A elegibilidade depende das regras vigentes, do perfil e das políticas da instituição financeira. Ter carteira assinada não garante aprovação automática.',
            },
            {
              question: 'Como funciona o desconto em folha?',
              answer: 'As parcelas são descontadas diretamente na folha de pagamento, conforme acordado na contratação. O valor, prazo e taxa variam conforme a instituição e o perfil do trabalhador.',
            },
            {
              question: 'A empresa onde trabalho precisa autorizar?',
              answer: 'Em geral, o empregador precisa ser conveniado ou habilitado com a instituição financeira. A aprovação final, porém, é da instituição, não da empresa empregadora.',
            },
            {
              question: 'O vínculo empregatício garante aprovação?',
              answer: 'Não. O vínculo formal é um requisito, mas a aprovação depende de outros fatores como margem disponível, histórico e políticas da instituição financeira responsável.',
            },
            {
              question: 'O que acontece se eu for demitido?',
              answer: 'Em caso de demissão, as regras sobre o saldo devedor e a continuidade das parcelas variam conforme a instituição e o contrato assinado. Esse é um ponto importante a verificar antes de contratar.',
            },
            {
              question: 'O FGTS é utilizado na operação?',
              answer: 'O Crédito do Trabalhador com desconto em folha não utiliza o FGTS diretamente. A antecipação do Saque-Aniversário é uma modalidade separada com regras próprias.',
            },
            {
              question: 'Quem está negativado pode solicitar?',
              answer: 'Depende da instituição financeira. Algumas modalidades de crédito consignado permitem análise independente do histórico de crédito, mas isso varia conforme as políticas vigentes.',
            },
            {
              question: 'Como comparar duas propostas diferentes?',
              answer: 'Sempre compare o Custo Efetivo Total (CET), que inclui todas as tarifas e encargos, além da taxa de juros, valor da parcela e prazo total do contrato.',
            },
            {
              question: 'Quanto tempo demora a análise?',
              answer: 'O prazo varia conforme a instituição financeira. A BCred orienta durante o processo, mas os prazos de análise e resposta são definidos pela instituição responsável.',
            },
            {
              question: 'Crédito do Trabalhador e antecipação FGTS são iguais?',
              answer: 'Não. São modalidades diferentes. O Crédito do Trabalhador tem parcelas descontadas em folha. A antecipação do Saque-Aniversário usa valores disponíveis no FGTS. Cada uma tem regras e condições próprias.',
            },
          ]}
          pageUrl="https://www.bcredfacil.com.br/credito-do-trabalhador-clt"
        />

        {/* 8. LINKS INTERNOS */}
        <section className="py-8 bg-gray-50 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-sm font-display font-bold text-primary-navy mb-4 uppercase tracking-wider">
              Saiba mais
            </h3>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/antecipacao-saque-aniversario-fgts"
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-primary-blue hover:border-primary-blue hover:bg-primary-blue/5 transition-colors"
              >
                Antecipação do FGTS →
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

        {/* 9. CTA FINAL */}
        <ProductFinalCta
          title={getText('ctafinal_title', "Trabalha com carteira assinada e quer entender essa modalidade?")}
          subtitle={getText('ctafinal_desc', "Retorno rápido para você entender as possibilidades do seu perfil. Fale com a equipe da BCred Fácil.")}
          ctaText={getText('clt_hero_btn1', "Consultar possibilidades para CLT")}
          whatsappMessage="Olá!%20Gostaria%20de%20consultar%20possibilidades%20de%20Crédito%20do%20Trabalhador%20CLT."
        />

      </div>
    </div>
  );
}
