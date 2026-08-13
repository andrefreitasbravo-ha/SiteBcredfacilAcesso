import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { companyConfig } from '@/config/company';
import { LeadForm } from '@/components/LeadForm';
import { FinancialConditions } from '@/components/FinancialConditions';
import { Breadcrumb } from '@/components/products/Breadcrumb';
import { ProductHero } from '@/components/products/ProductHero';
import { ProductEligibility } from '@/components/products/ProductEligibility';
import { ProductBenefits } from '@/components/products/ProductBenefits';
import { ProductHowItWorks } from '@/components/products/ProductHowItWorks';
import { ProductSecurity } from '@/components/products/ProductSecurity';
import { ProductFaq } from '@/components/products/ProductFaq';
import { ProductFinalCta } from '@/components/products/ProductFinalCta';
import { supabaseBrowser } from '@/services/supabase-browser';

// NOTE: This page targets the keyword: "crédito consignado INSS em Nova Iguaçu"

export const metadata: Metadata = {
  title: `Crédito Consignado INSS em Nova Iguaçu | ${companyConfig.name}`,
  description: `Consulte possibilidades de crédito consignado para aposentados e pensionistas do INSS em Nova Iguaçu com atendimento rápido e orientação pelo WhatsApp.`,
  alternates: { canonical: '/credito-consignado-inss' },
  openGraph: {
    title: `Crédito Consignado INSS em Nova Iguaçu | ${companyConfig.name}`,
    description: `Consulte possibilidades de crédito consignado para aposentados e pensionistas do INSS em Nova Iguaçu. Atendimento rápido pelo WhatsApp, orientação clara e segurança em cada etapa.`,
    url: 'https://www.bcredfacil.com.br/credito-consignado-inss',
    siteName: companyConfig.name,
    locale: 'pt_BR',
    type: 'website',
  },
};

export default async function CreditoConsignadoInss() {
  let texts: Record<string, string> = {};
  try {
    const { data } = await supabaseBrowser
      .from('page_content')
      .select('field_key, content')
      .eq('page_id', 'inss');
    if (data) {
      data.forEach(item => {
        texts[item.field_key] = item.content;
      });
    }
  } catch (err) {
    console.error('Error fetching texts for INSS page:', err);
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
            { label: 'Crédito Consignado INSS' },
          ]}
        />

        <ProductHero
          badge={getText('inss_hero_badge', 'Para aposentados e pensionistas do INSS')}
          title={getText('inss_hero_title', `Crédito Consignado INSS em Nova Iguaçu com atendimento rápido e seguro.`)}
          description={getText('inss_hero_desc', "Consulte possibilidades de crédito consignado com parcelas descontadas do benefício. A BCred Fácil explica as condições e acompanha você pelo WhatsApp.")}
          primaryCtaText={getText('inss_hero_btn1', "Consultar possibilidades para INSS")}
          secondaryCtaText={getText('inss_hero_btn2', "Falar com um consultor")}
          secondaryCtaHref={`https://wa.me/${companyConfig.whatsapp}?text=Olá!%20Gostaria%20de%20falar%20com%20um%20consultor%20sobre%20crédito%20consignado%20INSS.`}
          microcopy={getText('inss_hero_micro', "Simulação sem compromisso • Sujeita à margem e à análise da instituição financeira")}
          mascotPose="shield"
          whatsappMessage="Olá!%20Gostaria%20de%20consultar%20possibilidades%20de%20crédito%20consignado%20INSS."
          trustSignals={[
            'Atendimento humano',
            'Explicação clara',
            'Cuidado com seus dados',
          ]}
        />

        {/* 1. ELEGIBILIDADE */}
        <ProductEligibility
          title={getText('inss_elig_title', "Quem pode consultar o Crédito Consignado INSS?")}
          intro={getText('inss_elig_intro', "A modalidade pode estar disponível para aposentados, pensionistas e outros beneficiários elegíveis, conforme as regras vigentes, a situação do benefício, a margem disponível e a análise da instituição financeira.")}
          items={[
            { label: getText('inss_elig_item1', 'Aposentados do INSS') },
            { label: getText('inss_elig_item2', 'Pensionistas do INSS') },
            { label: getText('inss_elig_item3', 'Beneficiários elegíveis conforme as regras da modalidade') },
          ]}
          warning={getText('inss_elig_warning', "A disponibilidade não é automática. Cada solicitação depende da situação do benefício, da margem consignável e da instituição financeira responsável.")}
        />

        {/* 2. BENEFÍCIOS */}
        <ProductBenefits
          title={getText('inss_ben_title', "Por que consultar o Crédito Consignado INSS?")}
          subtitle={getText('inss_ben_subtitle', "Entenda as características da modalidade antes de decidir.")}
          benefits={[
            {
              title: 'Parcelas descontadas do benefício',
              description: 'O pagamento pode ser realizado por desconto direto no benefício mensal, conforme a contratação e as regras vigentes.',
              color: 'blue',
            },
            {
              title: 'Condições próprias da modalidade',
              description: 'O consignado pode possuir condições diferentes de outras formas de crédito. Compare sempre antes de contratar.',
              color: 'orange',
            },
            {
              title: 'Possibilidade de prazos variados',
              description: 'Os prazos disponíveis dependem da instituição, do perfil e das regras vigentes. A equipe orienta sobre as opções.',
              color: 'navy',
            },
            {
              title: 'Orientação durante o processo',
              description: 'A equipe da BCred ajuda você a entender os próximos passos e as condições apresentadas pela instituição financeira.',
              color: 'green',
            },
          ]}
        />

        {/* 3. COMO FUNCIONA */}
        <ProductHowItWorks
          title={getText('inss_hw_title', "Como funciona o atendimento?")}
          subtitle={getText('inss_hw_subtitle', "Etapas claras para orientar você do primeiro contato até a conclusão.")}
          dark
          steps={[
            {
              title: 'Conte o que você precisa',
              description: 'Fale com a BCred pelo WhatsApp e informe seu perfil de forma inicial.',
            },
            {
              title: 'Consulte as possibilidades',
              description: 'A equipe verifica quais instituições e modalidades podem estar disponíveis para o seu atendimento.',
            },
            {
              title: 'Confira as condições',
              description: 'Analise taxa, prazo, valor da parcela, CET e a instituição financeira responsável pela operação.',
            },
            {
              title: 'Siga o procedimento indicado',
              description: 'Caso concorde com as condições apresentadas, acompanhe as etapas solicitadas pela instituição financeira.',
            },
          ]}
          disclaimer={getText('inss_hw_disc', "A BCred Fácil não garante aprovação, taxa, valor ou prazo de liberação. Agimos como promotora, orientando você durante o processo.")}
        />

        {/* 4. MARGEM CONSIGNÁVEL */}
        <section className="py-10 md:py-14 bg-gray-50 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-navy tracking-tight mb-4">
              {getText('inss_margem_title', "O que é margem consignável?")}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed font-sans mb-6 max-w-2xl">
              {getText('inss_margem_desc', "A margem consignável é a parte do benefício que pode ser comprometida com parcelas de operações consignadas. A disponibilidade varia conforme os contratos existentes, as regras vigentes e a situação de cada benefício.")}
            </p>
            <div className="bg-primary-blue/5 border border-primary-blue/20 rounded-xl p-5 max-w-2xl">
              <p className="text-sm text-primary-navy font-sans leading-relaxed">
                {getText('inss_margem_box_desc', "Não sabe se possui margem disponível? Fale com a equipe e receba uma orientação inicial sobre como consultar sua situação.")}
              </p>
              <div className="mt-4">
                <a
                  href={`https://wa.me/${companyConfig.whatsapp}?text=Olá!%20Gostaria%20de%20entender%20minha%20margem%20consignável%20no%20INSS.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-semibold text-primary-blue hover:text-primary-navy transition-colors"
                >
                  {getText('inss_margem_btn', "Consultar minha margem →")}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SEGURANÇA */}
        <ProductSecurity
          title={getText('inss_sec_title', "Cuidado com seus dados durante a contratação")}
          items={[
            {
              type: 'danger',
              label: 'Não compartilhe sua senha do Gov.br',
              detail: 'Nenhum consultor ou correspondente oficial precisa dessa senha para iniciar uma simulação.',
            },
            {
              type: 'danger',
              label: 'Não compartilhe sua senha do Meu INSS',
              detail: 'Sua senha dá acesso a todos os seus dados previdenciários. Nunca a repasse para terceiros.',
            },
            {
              type: 'danger',
              label: 'Não informe códigos enviados por SMS',
              detail: 'Códigos recebidos por SMS funcionam como assinaturas digitais e não devem ser compartilhados.',
            },
            {
              type: 'danger',
              label: 'Não realize pagamentos antecipados',
              detail: 'Desconfie de cobranças para liberação de crédito. Isso é golpe.',
            },
            {
              type: 'safe',
              label: 'Confirme sempre o canal oficial de atendimento',
              detail: `O WhatsApp oficial da BCred Fácil é o único canal autorizado. Verifique antes de iniciar qualquer conversa.`,
            },
            {
              type: 'safe',
              label: 'Leia as condições antes de confirmar qualquer contrato',
              detail: 'Confira taxa, parcela, prazo e CET com atenção. A rapidez do atendimento nunca deve substituir os cuidados de segurança.',
            },
          ]}
          note={getText('inss_sec_note', "A rapidez do atendimento nunca deve substituir os cuidados de segurança. Em caso de dúvida sobre um contato, acesse nossa página de segurança.")}
        />

        {/* 6. FORMULÁRIO */}
        <section id="simulador" className="py-10 md:py-14 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-navy">
                {getText('inss_sim_title', "Consulte suas possibilidades para INSS")}
              </h2>
              <p className="text-gray-600 text-sm mt-2 font-sans">
                {getText('inss_sim_desc', "Preencha e nossa equipe entra em contato para orientar você sobre as opções disponíveis para o seu perfil e margem.")}
              </p>
            </div>
            <LeadForm
              defaultProfile="credito-consignado-inss"
              sourcePage="credito-consignado-inss"
              ctaText="Consultar possibilidades para INSS"
            />
          </div>
        </section>

        {/* 7. CONDIÇÕES FINANCEIRAS */}
        <div className="py-6">
          <FinancialConditions />
        </div>

        {/* 8. FAQ */}
        <ProductFaq
          title={getText('inss_faq_title', "Dúvidas frequentes sobre Crédito Consignado INSS")}
          subtitle={getText('inss_faq_subtitle', "Respostas diretas para as principais dúvidas sobre a modalidade.")}
          questions={[
            {
              question: 'Quem pode solicitar Crédito Consignado INSS?',
              answer: 'Aposentados e pensionistas do INSS com margem consignável disponível. A elegibilidade depende do tipo de benefício, da margem disponível e das políticas de aceitação da instituição financeira responsável.',
            },
            {
              question: 'O que é margem consignável?',
              answer: 'É a parcela do benefício que pode ser comprometida com parcelas de operações consignadas, conforme os limites estabelecidos pela legislação vigente. A consulta é realizada diretamente no portal Meu INSS.',
            },
            {
              question: 'A simulação garante aprovação?',
              answer: 'Não. A simulação apresenta condições estimadas. A contratação efetiva e a liberação do crédito estão sujeitas à análise da instituição financeira, à margem disponível e à verificação dos documentos necessários.',
            },
            {
              question: 'Como consultar meus contratos no Meu INSS?',
              answer: 'Acesse o portal Meu INSS (meu.inss.gov.br) ou o aplicativo com sua conta Gov.br. Na seção de serviços, você pode verificar seus contratos consignados ativos e sua margem disponível.',
            },
            {
              question: 'Preciso desbloquear meu benefício para contratar?',
              answer: 'Em alguns casos, o benefício pode estar bloqueado para operações consignadas e precisar ser desbloqueado diretamente pelo titular no Meu INSS. Nossa equipe orienta você sobre como verificar essa situação.',
            },
            {
              question: 'A BCred Fácil solicita minha senha do Meu INSS?',
              answer: 'Não. A BCred Fácil jamais solicita senhas de acesso ao Meu INSS, Gov.br ou de qualquer aplicativo bancário. Se receber esse tipo de pedido, descontinue imediatamente o contato e confirme os canais oficiais.',
            },
            {
              question: 'Quanto tempo leva para receber uma análise?',
              answer: 'O tempo de análise varia conforme a instituição financeira parceira e a situação do benefício. A BCred orienta você durante o processo, mas os prazos são definidos pela instituição responsável.',
            },
            {
              question: 'Como são definidas as taxas de juros?',
              answer: 'As taxas são definidas pela instituição financeira responsável, respeitando os limites regulamentados. A BCred apresenta as condições disponíveis para que você possa comparar antes de decidir.',
            },
            {
              question: 'Posso solicitar portabilidade do meu consignado?',
              answer: 'Sim, caso já possua um contrato consignado, é possível analisar a possibilidade de portabilidade para outra instituição. Consulte nossa página de Portabilidade para entender como funciona.',
            },
            {
              question: 'Como identificar um golpe relacionado ao consignado?',
              answer: 'Desconfie de contatos não solicitados, pedidos de senha, pagamentos antecipados para liberação de crédito ou promessas de aprovação garantida. Confirme sempre o canal oficial antes de compartilhar qualquer dato.',
            },
          ]}
          pageUrl="https://www.bcredfacil.com.br/credito-consignado-inss"
        />

        {/* 9. LINKS INTERNOS */}
        <section className="py-8 bg-gray-50 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-sm font-display font-bold text-primary-navy mb-4 uppercase tracking-wider">
              Saiba mais
            </h3>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/portabilidade-consignado"
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-primary-blue hover:border-primary-blue hover:bg-primary-blue/5 transition-colors"
              >
                Portabilidade de Consignado →
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
          title={getText('ctafinal_title', "Quer entender as possibilidades disponíveis para seu benefício?")}
          subtitle={getText('ctafinal_desc', "Agilidade para orientar, cuidado para proteger seus dados. Fale com a equipe da BCred Fácil pelo WhatsApp.")}
          ctaText={getText('inss_hero_btn1', "Consultar possibilidades para INSS")}
        />

      </div>
    </div>
  );
}
