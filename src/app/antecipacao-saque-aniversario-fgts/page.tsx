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

// DRAFT: Esta página deve ser ativada apenas se o serviço for confirmado pelo cliente.
// O metadata e os links no sitemap também devem ser ajustados após confirmação.

export const metadata: Metadata = {
  title: `Antecipação do Saque-Aniversário FGTS | ${companyConfig.name}`,
  description: `Consulte possibilidades de antecipação do Saque-Aniversário FGTS com atendimento rápido, orientação clara e segurança pelo WhatsApp.`,
  alternates: { canonical: '/antecipacao-saque-aniversario-fgts' },
  robots: {
    index: false, // Mantido como false até que o serviço seja confirmado
    follow: false,
  },
  openGraph: {
    title: `Antecipação do Saque-Aniversário FGTS | ${companyConfig.name}`,
    description: `Consulte possibilidades de antecipação do Saque-Aniversário FGTS. Atendimento rápido e seguro pelo WhatsApp.`,
    url: 'https://www.bcredfacil.com.br/antecipacao-saque-aniversario-fgts',
    siteName: companyConfig.name,
    locale: 'pt_BR',
    type: 'website',
  },
};

export default async function AntecipacaoFgts() {
  let texts: Record<string, string> = {};
  try {
    const { data } = await supabaseBrowser
      .from('page_content')
      .select('field_key, content')
      .eq('page_id', 'fgts');
    if (data) {
      data.forEach(item => {
        texts[item.field_key] = item.content;
      });
    }
  } catch (err) {
    console.error('Error fetching texts for FGTS page:', err);
  }

  const getText = (key: string, fallback: string) => {
    return texts[key] !== undefined && texts[key] !== null && texts[key] !== '' ? texts[key] : fallback;
  };

  return (
    <div className="py-10 bg-gray-50">
      
      {/* Draft Warning */}
      <div className="bg-amber-100 text-amber-800 p-2 text-center text-sm font-bold shadow-inner">
        Ambiente de teste: Esta página está configurada como Rascunho (Não indexada) até a validação do serviço.
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        <Breadcrumb
          items={[
            { label: 'Início', href: '/' },
            { label: 'Antecipação FGTS' },
          ]}
        />

        <ProductHero
          badge={getText('fgts_hero_badge', "Para quem aderiu ao Saque-Aniversário")}
          title={getText('fgts_hero_title', "Antecipação do Saque-Aniversário FGTS com atendimento rápido pelo WhatsApp.")}
          description={getText('fgts_hero_desc', "Entenda como funciona a antecipação de valores futuros do Saque-Aniversário e consulte as condições disponíveis para o seu perfil.")}
          primaryCtaText={getText('fgts_hero_btn1', "Consultar possibilidades com FGTS")}
          secondaryCtaText={getText('fgts_hero_btn2', "Entender a modalidade")}
          secondaryCtaHref="#o-que-e"
          microcopy={getText('fgts_hero_micro', "A contratação depende de saldo disponível, regras vigentes e análise da instituição responsável.")}
          mascotPose="reception" 
          whatsappMessage="Olá!%20Gostaria%20de%20consultar%20possibilidades%20de%20antecipação%20do%20FGTS."
          trustSignals={[
            'Explicação direta',
            'Foco na segurança',
            'Zero promessas irresponsáveis',
          ]}
        />

        {/* 1. O QUE É / ELEGIBILIDADE */}
        <section id="o-que-e">
          <ProductEligibility
            title={getText('fgts_elig_title', "Como funciona a antecipação do Saque-Aniversário?")}
            intro={getText('fgts_elig_intro', "A modalidade permite antecipar valores futuros referentes às parcelas anuais do Saque-Aniversário do FGTS.")}
            items={[
              { label: getText('fgts_elig_item1', 'É necessário ter saldo disponível no FGTS') },
              { label: getText('fgts_elig_item2', 'É preciso ter optado pela modalidade Saque-Aniversário') },
              { label: getText('fgts_elig_item3', 'A operação depende de aprovação e disponibilidade nas instituições financeiras parceiras') },
            ]}
            warning={getText('fgts_elig_warning', "Não há garantia de aprovação automática. A consulta e liberação dependem estritamente das regras do produto, do saldo vinculado e da instituição financeira.")}
          />
        </section>

        {/* 2. COMO FUNCIONA AS ETAPAS */}
        <ProductHowItWorks
          title={getText('fgts_hw_title', "Quais são as etapas do atendimento?")}
          subtitle={getText('fgts_hw_subtitle', "Acompanhamento rápido para orientar sobre as possibilidades e regras vigentes.")}
          dark
          steps={[
            {
              title: 'Confirme a adesão',
              description: 'Verifique se você já aderiu à sistemática de Saque-Aniversário pelo aplicativo do FGTS.',
            },
            {
              title: 'Autorize a consulta',
              description: 'Autorize a instituição parceira a consultar as informações pelos canais oficiais.',
            },
            {
              title: 'Verifique o valor',
              description: 'Entenda os valores que podem estar disponíveis, caso atenda às condições exigidas.',
            },
            {
              title: 'Confira as taxas',
              description: 'Avalie as condições apresentadas: taxa de juros, prazos e o Custo Efetivo Total.',
            },
            {
              title: 'Acompanhe a operação',
              description: 'Se estiver de acordo, acompanhe o processo diretamente com a instituição credenciada.',
            },
          ]}
          disclaimer={getText('fgts_hw_disc', "A BCred Fácil não tem acesso ao aplicativo do FGTS e não solicita a sua senha pessoal. O processo de autorização ocorre nos sistemas da instituição oficial.")}
        />

        {/* 3. COMPARAÇÃO CLT X FGTS */}
        <section className="py-10 md:py-14 bg-gray-50 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-navy tracking-tight mb-4">
              {getText('fgts_diff_title', "FGTS e Crédito do Trabalhador são a mesma coisa?")}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed font-sans mb-6 max-w-2xl">
              {getText('fgts_diff_desc', "Apesar de ambos os serviços envolverem trabalhadores formais, tratam-se de produtos completamente distintos.")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
              <div className="bg-white rounded-2xl p-5 border border-primary-blue/20 shadow-sm">
                <h3 className="font-display font-bold text-base text-primary-navy mb-3">
                  Antecipação FGTS
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-navy font-bold">•</span>
                    Vinculada à modalidade Saque-Aniversário
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-navy font-bold">•</span>
                    Utiliza saldos do FGTS para liquidação
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-navy font-bold">•</span>
                    Requer adesão prévia
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                <h3 className="font-display font-bold text-base text-gray-600 mb-3">
                  Crédito do Trabalhador (CLT)
                </h3>
                <ul className="space-y-2 text-sm text-gray-500 font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 font-bold">•</span>
                    Desconto em folha de pagamento
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 font-bold">•</span>
                    Depende do vínculo e margem (sem usar saldo FGTS)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 font-bold">•</span>
                    Destinado a trabalhadores de empresas conveniadas
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SEGURANÇA */}
        <ProductSecurity
          title={getText('fgts_sec_title', "Segurança e proteção de dados no Saque-Aniversário")}
          items={[
            {
              type: 'danger',
              label: 'Não forneça sua senha do FGTS',
              detail: 'A senha do aplicativo é pessoal. Para realizar uma consulta, o titular realiza a autorização pelo aplicativo próprio.',
            },
            {
              type: 'danger',
              label: 'Cuidado com intermediários suspeitos',
              detail: 'Não deposite valores para liberar a antecipação. A operação não possui taxa de liberação inicial.',
            },
            {
              type: 'safe',
              label: 'Verifique canais oficiais',
              detail: 'Fale apenas com correspondentes autorizados e credenciados pelas instituições financeiras.',
            },
          ]}
          note={getText('fgts_sec_note', "Proteja suas informações pessoais. Em caso de dúvidas sobre propostas, entre em contato imediatamente com nossos canais oficiais.")}
        />

        {/* 5. FORMULÁRIO */}
        <section id="simulador" className="py-10 md:py-14 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-navy">
                {getText('fgts_sim_title', "Consulte suas possibilidades de antecipação do FGTS")}
              </h2>
              <p className="text-gray-600 text-sm mt-2 font-sans">
                {getText('fgts_sim_desc', "Informe os dados básicos para receber uma assessoria completa e entender se possui saldo disponível para antecipar.")}
              </p>
            </div>
            <LeadForm
              defaultProfile="antecipacao-fgts"
              sourcePage="antecipacao-fgts"
              ctaText="Consultar possibilidades com FGTS"
            />
          </div>
        </section>

        {/* 6. FAQ */}
        <ProductFaq
          title={getText('fgts_faq_title', "Dúvidas sobre a antecipação do Saque-Aniversário FGTS")}
          subtitle={getText('fgts_faq_subtitle', "Informações regulatórias e respostas para as principais dúvidas de trabalhadores.")}
          questions={[
            {
              question: 'Quem pode antecipar o Saque-Aniversário?',
              answer: 'Trabalhadores com saldo no FGTS e que optaram pelo Saque-Aniversário podem buscar instituições que ofereçam essa operação.',
            },
            {
              question: 'Preciso aderir ao Saque-Aniversário?',
              answer: 'Sim. A operação de crédito exige a adesão ao Saque-Aniversário, conforme regras da Caixa Econômica Federal e das instituições ofertantes.',
            },
            {
              question: 'A BCred precisa da minha senha do FGTS?',
              answer: 'Não. Você não deve informar sua senha para a BCred ou qualquer correspondente. A autorização é um procedimento feito por você no aplicativo do FGTS, habilitando o banco correspondente a consultar seu saldo.',
            },
            {
              question: 'Quanto posso antecipar?',
              answer: 'O limite do valor a ser antecipado depende do saldo de cada conta (ativa ou inativa) do trabalhador, bem como das condições oferecidas pela instituição financeira escolhida.',
            },
            {
              question: 'Como são definidas as taxas?',
              answer: 'As taxas são estabelecidas pelas instituições financeiras que ofertam o crédito, respeitando diretrizes regulatórias e de mercado.',
            },
            {
              question: 'Quem está negativado pode contratar?',
              answer: 'Pode ser possível dependendo das regras da instituição financeira que for escolhida para avaliação, pois a garantia do pagamento são os valores do próprio FGTS.',
            },
            {
              question: 'A antecipação afeta outros saques do FGTS?',
              answer: 'Optando pelo Saque-Aniversário, há implicações nas regras de saque, principalmente no caso de demissão sem justa causa. Recomendamos informar-se com precisão sobre essas condições no portal oficial do FGTS ou da Caixa antes de tomar uma decisão.',
            },
            {
              question: 'Qual a diferença para o Crédito do Trabalhador?',
              answer: 'O crédito trabalhador comum faz os descontos na folha de pagamento pelo salário recebido. A antecipação de FGTS recai sobre um valor já retido, que é descontado anualmente do saldo.',
            },
            {
              question: 'Quanto tempo demora?',
              answer: 'O tempo de processamento varia conforme o sistema e as exigências do banco, podendo demorar de poucas horas até dias, após a assinatura correta de toda a documentação eletrônica e bloqueio das parcelas.',
            },
            {
              question: 'Como confirmar o canal oficial para falar sobre isso?',
              answer: 'O contato deve ser realizado preferencialmente pelos canais verificados no site oficial da BCred, para que as suas informações estejam protegidas.',
            },
          ]}
          pageUrl="https://www.bcredfacil.com.br/antecipacao-saque-aniversario-fgts"
        />

        {/* 7. CONDIÇÕES FINANCEIRAS (Geral) */}
        <div className="py-6">
          <FinancialConditions />
        </div>

        {/* 8. LINKS INTERNOS */}
        <section className="py-8 bg-gray-50 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-sm font-display font-bold text-primary-navy mb-4 uppercase tracking-wider">
              Saiba mais
            </h3>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/credito-do-trabalhador-clt"
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-primary-blue hover:border-primary-blue hover:bg-primary-blue/5 transition-colors"
              >
                Crédito do Trabalhador CLT →
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
          title={getText('fgts_hero_badge', "Quer entender quanto pode estar disponível para antecipação?")}
          subtitle={getText('fgts_hero_desc', "Converse com nossa equipe para entender se a antecipação se aplica a você e como o procedimento funciona de maneira segura.")}
          ctaText={getText('fgts_hero_btn1', "Consultar possibilidades com FGTS")}
        />

      </div>
    </div>
  );
}
