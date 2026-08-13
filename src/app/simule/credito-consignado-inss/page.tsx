import React from 'react';
import type { Metadata } from 'next';
import { companyConfig } from '@/config/company';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingTrustBar } from '@/components/landing/LandingTrustBar';
import { LandingAudience } from '@/components/landing/LandingAudience';
import { LandingBenefits } from '@/components/landing/LandingBenefits';
import { LandingHowItWorks } from '@/components/landing/LandingHowItWorks';
import { LandingInstitutions } from '@/components/landing/LandingInstitutions';
import { LandingSecurity } from '@/components/landing/LandingSecurity';
import { LandingFaq } from '@/components/landing/LandingFaq';
import { LandingStickyCta } from '@/components/landing/LandingStickyCta';

export const metadata: Metadata = {
  title: `Consulte Crédito Consignado INSS | ${companyConfig.name}`,
  description: `Fale com a ${companyConfig.name} e consulte possibilidades de crédito consignado INSS com atendimento rápido e orientação pelo WhatsApp.`,
  robots: {
    index: false,
    follow: true,
  },
};

export default function LandingInss() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <LandingHeader whatsappMessage="Olá! Gostaria de consultar possibilidades de Crédito Consignado INSS." />
      
      <main className="flex-grow pb-16 md:pb-0">
        <LandingHero
          product="credito-consignado-inss"
          badge="Para aposentados e pensionistas do INSS"
          title="Consulte o Crédito Consignado INSS com atendimento rápido e seguro."
          subtitle="Fale com a BCred Fácil, entenda as possibilidades disponíveis para seu benefício e receba orientação clara pelo WhatsApp."
          primaryCtaText="Consultar minhas possibilidades"
          trustSignals={[
            'Atendimento humano',
            'Não compartilhe senhas',
            'Condições explicadas antes da contratação',
          ]}
          microcopy="Simulação sem compromisso • Sujeita à margem e à análise da instituição financeira"
          imageAlt="Casal de idosos sorrindo enquanto usam o celular"
          imageSrc="/images/idosos-celular.jpg" // Note: This assumes image exists or will be added
          formTitle="Consulte suas possibilidades"
          formText="Receba orientação de um especialista pelo WhatsApp sem compromisso."
        />

        <LandingTrustBar
          items={[
            'Atendimento pelo WhatsApp',
            'Orientação em cada etapa',
            'Consulta em diferentes instituições',
            'Cuidados contra golpes',
          ]}
        />

        <LandingAudience
          title="Esta modalidade pode ser para você se:"
          items={[
            'Recebe aposentadoria pelo INSS',
            'Recebe pensão pelo INSS',
            'Possui benefício elegível',
            'Deseja entender as condições disponíveis',
            'Procura atendimento humano para tirar dúvidas',
          ]}
          warning="A disponibilidade depende da situação do benefício, da margem consignável, das regras vigentes e da análise da instituição responsável."
        />

        <LandingBenefits
          title="Por que falar com a BCred Fácil?"
          benefits={[
            {
              title: 'Atendimento rápido',
              description: 'Você recebe uma orientação inicial sem ficar esperando sem saber o que está acontecendo.',
            },
            {
              title: 'Explicação simples',
              description: 'Taxa, parcela, prazo e próximos passos são explicados de forma clara.',
            },
            {
              title: 'Segurança no processo',
              description: 'Orientamos você sobre canais oficiais e cuidados com seus dados.',
            },
          ]}
          mascotReference="O Bê representa nosso jeito de atender: rápido, atento e cuidadoso."
        />

        <LandingHowItWorks
          title="Como funciona o atendimento?"
          steps={[
            {
              title: 'Fale com a equipe',
              description: 'Conte o que você precisa e informe seu perfil de forma inicial.',
            },
            {
              title: 'Consulte as possibilidades',
              description: 'A equipe verifica instituições e modalidades que podem estar disponíveis.',
            },
            {
              title: 'Confira as condições',
              description: 'Analise taxa, prazo, parcela, CET e instituição responsável.',
            },
            {
              title: 'Decida com tranquilidade',
              description: 'Prossiga somente se as condições fizerem sentido para você.',
            },
          ]}
          warning="A BCred Fácil não garante aprovação, taxa, valor ou prazo de liberação."
          ctaText="Começar pelo WhatsApp"
          whatsappMessage="Olá! Gostaria de entender minhas opções de crédito INSS."
        />

        <LandingInstitutions />

        <LandingSecurity
          items={[
            'Não compartilhe senhas',
            'Não informe códigos SMS',
            'Confirme os canais oficiais',
            'Confira taxa, prazo, parcela e CET',
            'Desconfie de cobrança antecipada para liberação',
          ]}
        />

        <LandingFaq
          questions={[
            {
              question: 'Quem pode consultar o Crédito Consignado INSS?',
              answer: 'Aposentados e pensionistas com margem disponível. A elegibilidade depende das regras vigentes e da aprovação do banco.',
            },
            {
              question: 'A simulação garante aprovação?',
              answer: 'Não. A simulação apresenta condições estimadas. A aprovação depende da análise exclusiva da instituição financeira.',
            },
            {
              question: 'O que é margem consignável?',
              answer: 'É a parcela do benefício que pode ser comprometida com descontos de operações consignadas.',
            },
            {
              question: 'A BCred pede senha do Meu INSS?',
              answer: 'Não. A BCred Fácil jamais solicita sua senha do Meu INSS. Não repasse senhas a ninguém.',
            },
            {
              question: 'Existe pagamento antecipado?',
              answer: 'Não. Nunca solicitamos pagamentos antecipados para liberar crédito. Isso é prática de golpistas.',
            },
            {
              question: 'Como são definidas as taxas?',
              answer: 'As taxas são definidas pela instituição financeira responsável, respeitando os limites regulamentados pelo INSS.',
            },
            {
              question: 'Quanto tempo demora a análise?',
              answer: 'Varia conforme o banco parceiro e a situação do benefício, podendo levar de algumas horas a dias úteis.',
            },
          ]}
          fullPageUrl="/credito-consignado-inss"
          fullPageTitle="Ver detalhes completos sobre INSS"
        />

      </main>

      <LandingFooter />
      <LandingStickyCta text="Consultar minhas possibilidades" href={`https://wa.me/${companyConfig.whatsapp}?text=Olá!%20Gostaria%20de%20consultar%20possibilidades%20de%20Crédito%20Consignado%20INSS.`} />
    </div>
  );
}
