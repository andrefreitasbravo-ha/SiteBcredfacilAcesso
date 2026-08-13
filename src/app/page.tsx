'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { companyConfig } from '@/config/company';
import { MascotBe } from '@/components/MascotBe';
import { LeadForm } from '@/components/LeadForm';
import { FinancialConditions } from '@/components/FinancialConditions';
import { Container } from '@/components/Container';
import { supabaseBrowser } from '@/services/supabase-browser';

const row1 = [
  { name: "Itaú", src: "/logo_itau.webp", alt: "Logo do Itaú" },
  { name: "Bradesco", src: "/logo_bradesco.png", alt: "Logo do Bradesco" },
  { name: "Banco BMG", src: "/logo-bmg.png", alt: "Logo do Banco BMG" },
  { name: "Banco PAN", src: "/logo_bancopan.png", alt: "Logo do Banco PAN" },
  { name: "PicPay", src: "/logo_PicPay.png", alt: "Logo do PicPay" }
];

const row2 = [
  { name: "Banco Daycoval", src: "/logo_BancoDaycoval.png", alt: "Logo do Banco Daycoval" },
  { name: "Banco Safra", src: "/logo_safra.webp", alt: "Logo do Banco Safra" },
  { name: "Banco Mercantil", src: "/logo_Banco Mercantil.png", alt: "Logo do Banco Mercantil" },
  { name: "C6 Bank", src: "/logo_C6 Bank.png", alt: "Logo do C6 Bank" },
  { name: "Banrisul", src: "/logo_Banrisul.webp", alt: "Logo do Banrisul" }
];

const duplicatedRow1 = [...row1, ...row1, ...row1, ...row1, ...row1];
const duplicatedRow2 = [...row2, ...row2, ...row2, ...row2, ...row2];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [stepProgress, setStepProgress] = useState(0);
  const [texts, setTexts] = useState<Record<string, string>>({});

  const stepRafRef = useRef<number | null>(null);

  useEffect(() => {
    async function loadTexts() {
      try {
        const { data } = await supabaseBrowser
          .from('page_content')
          .select('field_key, content')
          .or('page_id.eq.home,page_id.eq.global');
        if (data) {
          const textMap: Record<string, string> = {};
          data.forEach(item => {
            textMap[item.field_key] = item.content;
          });
          setTexts(textMap);
        }
      } catch (err) {
        console.error('Error loading page content:', err);
      }
    }
    loadTexts();
  }, []);

  const getText = (key: string, fallback: string) => {
    return texts[key] !== undefined && texts[key] !== null && texts[key] !== '' ? texts[key] : fallback;
  };

  useEffect(() => {
    const handleScroll = () => {
      // Throttle via requestAnimationFrame for better mobile performance
      if (stepRafRef.current) return;
      stepRafRef.current = requestAnimationFrame(() => {
        const element = document.getElementById('mobile-steps-container');
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementHeight = rect.height;
          const viewHeight = window.innerHeight;
          const triggerPoint = viewHeight * 0.55;
          const currentDistance = triggerPoint - rect.top;
          let progress = (currentDistance / elementHeight) * 100;
          progress = Math.min(Math.max(progress, 0), 100);
          setStepProgress(progress);
        }
        stepRafRef.current = null;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (stepRafRef.current) cancelAnimationFrame(stepRafRef.current);
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };


  const faqData = [
    {
      q: "A BCred Fácil é um banco?",
      a: `Não, a ${companyConfig.name} não é uma instituição financeira. Atuamos como ${companyConfig.model} de vendas de crédito consignado e outras soluções de financiamento, intermediando o contato entre você e os bancos parceiros oficiais de forma transparente.`
    },
    {
      q: "A simulação de crédito garante a aprovação?",
      a: "Não. A simulação apresenta condições estimadas com base nas informações iniciais. A contratação efetiva e a liberação do crédito estão sujeitas à análise da instituição financeira parceira, margem disponível e verificação de documentos."
    },
    {
      q: "Como saber se tenho margem disponível?",
      a: "Você pode consultar sua margem consignável atualizada por meio do portal ou aplicativo Meu INSS. Caso tenha dúvidas, nossa equipe pode orientar você sobre como realizar essa consulta de forma segura."
    },
    {
      q: "Quem define as taxas e condições do crédito?",
      a: "As taxas de juros e condições finais são definidas diretamente pela instituição financeira parceira responsável pela operação de crédito, respeitando sempre os tetos regulamentados pelos órgãos federais."
    },
    {
      q: "Existe algum tipo de pagamento antecipado?",
      a: "Absolutamente NÃO! Nós nunca solicitamos depósitos, transferências, taxas de aval ou pagamentos antecipados para liberação de empréstimos. Qualquer cobrança desse tipo é golpe. Nosso serviço de assessoria e simulação é 100% gratuito."
    },
    {
      q: "Como confirmo se estou falando com o canal oficial da BCred Fácil?",
      a: `Nosso WhatsApp oficial de atendimento é o ${companyConfig.whatsappFormatted} e o nosso site oficial é o único endereço autorizado para simulações online. Desconfie de contatos por números diferentes.`
    },
    {
      q: "Meus dados pessoais ficam protegidos?",
      a: "Sim. Seus dados são coletados exclusivamente para a análise de crédito junto aos parceiros autorizados e tratados com total confidencialidade, seguindo rigorosamente a Lei Geral de Proteção de Dados (LGPD)."
    },
    {
      q: "Como comparar duas propostas de crédito?",
      a: "Compare sempre o Custo Efetivo Total (CET), que inclui todas as tarifas e encargos, e não apenas a taxa de juros nominal. Analise também o valor da parcela mensal e o prazo total do contrato."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="bg-primary-navy text-white pt-[86px] pb-[24px] md:py-20 lg:py-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-blue/20 rounded-full filter blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-orange/5 rounded-full filter blur-3xl pointer-events-none transform -translate-x-1/3 translate-y-1/3" />
        
        <Container className="relative">
          {/* Desktop Version */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.92fr)] xl:grid-cols-[minmax(0,1.08fr)_minmax(460px,0.92fr)] gap-10 lg:gap-12 xl:gap-16 items-center">
            
            {/* Hero Left Content */}
            <div className="space-y-6 text-center lg:text-left min-w-0">
              
              <div className="inline-block px-3 py-1 rounded bg-white/10 text-primary-orange text-xs font-medium tracking-widest">
                ATENDIMENTO RÁPIDO, HUMANO E SEGURO
              </div>

              <h1 className="text-[clamp(2.2rem,4vw,3.25rem)] font-display font-extrabold tracking-tight text-white leading-tight max-w-[720px]">
                Crédito consignado em Nova Iguaçu com atendimento rápido e sem enrolação.
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 font-sans max-w-[680px] mx-auto lg:mx-0 tp1--display">
                Consulte possibilidades para aposentados, pensionistas do INSS e trabalhadores com carteira assinada. A BCred Fácil explica cada etapa e acompanha você pelo WhatsApp.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a 
                  href="#simulador" 
                  className="w-full sm:w-auto px-8 py-4 bg-primary-orange hover:bg-secondary-orange text-white font-display font-bold text-base rounded-xl transition-all duration-200 shadow-lg text-center"
                >
                  Ver minhas possibilidades
                </a>
                <a 
                  href="#perfil-selector" 
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-display font-bold text-base rounded-xl transition-all duration-200 text-center"
                >
                  Falar com um consultor
                </a>
              </div>
              
              <p className="text-xs text-gray-400 font-sans">
                Simulação sem compromisso • Sujeita à análise da instituição financeira responsável
              </p>

            </div>

            {/* Hero Right Content (Lady holding cell phone & Integrated Orange Panel) */}
            <div className="w-full mt-10 lg:mt-0 self-center min-w-0">
              <div className="relative h-[480px] sm:h-[500px] md:h-[450px] w-full overflow-hidden rounded-tl-[48px] rounded-br-[48px] md:rounded-tl-[110px] md:rounded-br-[90px] bg-[#f4ede7] flex flex-col md:block shadow-2xl">
                
                {/* Photo of the Lady */}
                <img
                  src="/senhorasegurandoocelular.png?v=2"
                  alt="Senhora utilizando o celular"
                  className="h-[65%] w-full md:h-[102%] md:w-[74%] md:absolute md:-bottom-1 md:-left-4 object-contain object-bottom z-10"
                />

                {/* Overlapping circular icons (Visual bridge between Photo and Orange Panel) */}
                <div className="absolute bottom-6 left-[54%] md:left-[56%] lg:left-[56%] xl:left-[58%] z-20 flex items-center space-x-1.5 md:space-x-2 pointer-events-none hidden sm:flex">
                  <div className="w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-primary-navy">
                    <svg className="w-4 h-4 text-[#ff7100]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="w-3 h-[1.5px] bg-white/40"></div>
                  <div className="w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-primary-navy">
                    <svg className="w-4 h-4 text-[#ff7100]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="w-3 h-[1.5px] bg-white/40"></div>
                  <div className="w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-primary-navy">
                    <svg className="w-4 h-4 text-[#ff7100]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.382-3.016z" />
                    </svg>
                  </div>
                </div>

                {/* Integrated Orange Panel */}
                <div className="h-[35%] w-full md:h-full md:w-[38%] bg-[#ff7100] md:absolute md:right-0 md:top-0 flex flex-col justify-center px-6 md:px-7 py-6 text-primary-navy z-10 border-t md:border-t-0 md:border-l border-[#ff7100]/10">
                  <div className="space-y-2.5 text-left">
                    <span style={{ fontFamily: 'var(--font-poppins)' }} className="inline-block px-2 py-0.5 rounded bg-[#061A3A] text-white font-bold text-[9px] tracking-wider uppercase">
                      ATENDIMENTO HUMANO
                    </span>
                    <h4 style={{ fontFamily: 'var(--font-poppins)' }} className="text-[18px] lg:text-[20px] font-sans font-bold text-primary-navy leading-tight w-full">
                      Orientação rápida <br className="hidden lg:block"/>pelo WhatsApp.
                    </h4>
                    <p style={{ fontFamily: 'var(--font-poppins)' }} className="text-[12px] leading-relaxed text-primary-navy/85 font-medium font-sans">
                      Fale com nossa equipe e entenda cada etapa com clareza.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Mobile Version */}
          <div className="block lg:hidden text-left space-y-0">
            {/* Título */}
            <h1 className="text-[29px] xs:text-[32px] font-display font-black tracking-tight text-white leading-[1.08] w-full">
              Crédito consignado em Nova Iguaçu, sem enrolação.
            </h1>
            
            {/* Espaço entre título e descrição: 14px */}
            <div className="h-[14px]" />
            
            {/* Descrição */}
            <p className="text-[15px] text-gray-300 font-sans leading-relaxed w-full">
              Para aposentados, pensionistas do INSS e trabalhadores CLT. Entenda suas possibilidades com orientação clara em cada etapa.
            </p>
            
            {/* Espaço entre subheadline e botões: 16px */}
            <div className="h-[16px]" />
            
            {/* Botões */}
            <div className="flex flex-col gap-[10px] w-full items-center">
              <a 
                href="#simulador" 
                className="w-full h-[48px] flex items-center justify-center bg-primary-orange hover:bg-secondary-orange text-white font-display font-bold text-[15px] rounded-xl transition-all duration-200 shadow-md text-center"
              >
                Ver minhas possibilidades
              </a>
              <a 
                href="#perfil-selector" 
                className="w-full h-[48px] flex items-center justify-center bg-transparent hover:bg-white/5 text-white border border-white/20 font-display font-semibold text-[15px] rounded-xl transition-all duration-200 text-center"
              >
                Falar com um consultor
              </a>
            </div>
            
            {/* Espaço entre botão secundário e imagem: 20px */}
            <div className="h-[20px]" />
            
            {/* Imagem da senhora com o painel laranja */}
            <div className="relative h-[290px] w-full max-w-[480px] mx-auto overflow-hidden rounded-tl-[48px] rounded-br-[48px] bg-[#f4ede7] flex flex-row shadow-xl">
              {/* Photo of the Lady */}
              <div className="relative w-[56%] h-full">
                <img
                  src="/senhorasegurandoocelular.png?v=2"
                  alt="Senhora utilizando o celular"
                  className="absolute bottom-0 left-0 h-[105%] w-full object-contain object-bottom z-10"
                />
              </div>

              {/* Integrated Orange Panel */}
              <div className="w-[44%] bg-[#ff7100] flex flex-col justify-center px-3.5 py-4 text-primary-navy z-10 border-l border-[#ff7100]/10">
                <div className="space-y-1.5 text-left">
                  <span style={{ fontFamily: 'var(--font-poppins)' }} className="inline-block px-1.5 py-0.5 rounded bg-[#061A3A] text-white font-bold text-[8px] tracking-wider uppercase">
                    ATENDIMENTO HUMANO
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-poppins)' }} className="text-[13px] sm:text-[14px] font-sans font-extrabold text-primary-navy leading-tight">
                    Orientação rápida pelo WhatsApp.
                  </h4>
                  <p style={{ fontFamily: 'var(--font-poppins)' }} className="text-[10px] leading-snug text-primary-navy/85 font-medium font-sans">
                    Fale com nossa equipe e entenda cada etapa com clareza.
                  </p>
                </div>
              </div>
            </div>

            {/* Espaço entre imagem e aviso inferior: 14px */}
            <div className="h-[14px]" />
            
            {/* Aviso inferior */}
            <p className="text-[11px] text-gray-400 font-sans text-left">
              Simulação sem compromisso • Sujeita à análise
            </p>
          </div>
        </Container>
      </section>

      {/* ==================================================
          INTRODUÇÃO: O QUE É EMPRÉSTIMO CONSIGNADO
         ================================================== */}
      <section id="o-que-e-consignado" className="relative z-20 pt-10 pb-24 md:pt-14 md:pb-32 lg:pt-16 lg:pb-48 bg-gray-50 border-b border-gray-100 text-center">
        <Container className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-primary-navy tracking-tight max-w-[720px] mx-auto">
            O que é <span className="text-primary-orange">Empréstimo Consignado</span>?
          </h2>
          <p className="text-gray-600 mt-4 text-base sm:text-lg leading-relaxed max-w-[680px] mx-auto font-sans">
            O Empréstimo Consignado é um crédito voltado para aposentados, pensionistas e trabalhadores com carteira assinada, com desconto direto na folha de pagamento. O crédito consignado pode apresentar taxas geralmente menores do que algumas modalidades de crédito pessoal, dependendo da instituição e das condições da operação.
          </p>
        </Container>

        {/* Mascote Espiando (Branding) */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-0 translate-y-[10%] opacity-95"
          aria-hidden="true"
        >
          <img 
            src="/mascotecredfacil2.png?v=3" 
            alt="" 
            className="w-[90px] sm:w-[130px] md:w-[170px] lg:w-[210px] object-contain"
          />
        </div>
      </section>

      {/* ==================================================
          1. VANTAGENS DO CRÉDITO CONSIGNADO INSS
         ================================================== */}
      <section id="vantagens" className="relative z-10 py-14 md:py-20 lg:py-24 bg-white border-b border-gray-100">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary-orange font-bold text-xs uppercase tracking-wider">Benefícios Exclusivos</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-primary-navy tracking-tight mt-1 max-w-[720px] mx-auto">
              Vantagens do Crédito Consignado INSS
            </h2>
            <p className="text-gray-600 mt-2 text-base max-w-[680px] mx-auto">
              Entenda por que essa modalidade é uma das opções mais buscadas por beneficiários da Previdência Social.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="bg-[#F5F7FA] border-none rounded-2xl p-6 transition-all duration-300 hover:shadow-md hover:bg-gray-100/50 relative overflow-hidden group">
              <svg className="w-12 h-12 mb-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask_card1" mask-type="alpha" maskUnits="userSpaceOnUse" x="-5" y="-2" width="54" height="53">
                  <rect width="38.8512" height="36.5047" transform="matrix(0.790105 0.612972 0.612972 -0.790105 -5 26.8423)" fill="#C4C4C4"/>
                </mask>
                <g mask="url(#mask_card1)">
                  <path d="M30.0134 40.3094H17.1865C13.3205 40.3094 10.1865 37.1753 10.1865 33.3094V13.8301C10.1865 9.96409 13.3205 6.83008 17.1865 6.83008H27.2929C28.9639 6.83008 30.5798 7.42782 31.8485 8.51528L34.569 10.8471C36.1205 12.177 37.0134 14.1184 37.0134 16.1619V33.3094C37.0134 37.1753 33.8794 40.3094 30.0134 40.3094Z" stroke="#462A71" strokeWidth="2"/>
                </g>
                <path d="M28.5 13.7H37.63L27.5 5.85547V12.7C27.5 13.2523 27.9477 13.7 28.5 13.7Z" fill="#462A71"/>
                <path d="M42 36.5C42 41.1944 38.1944 45 33.5 45C28.8056 45 25 41.1944 25 36.5C25 31.8056 28.8056 28 33.5 28C38.1944 28 42 31.8056 42 36.5Z" fill="#FA6300" stroke="#462A71" strokeWidth="2"/>
                <path d="M35.9989 38.5082C36.0356 37.4945 35.1638 36.5882 34.0354 36.4075L33.0455 36.1723C32.0338 35.9873 31.2829 35.2001 31.3237 34.3097C31.3128 33.273 32.3612 32.4443 33.5548 32.4744C34.8177 32.4773 35.7587 33.3563 35.7695 34.393C35.7695 34.393 35.7953 34.4661 35.817 34.4159C35.817 34.4159 35.8863 34.3887 35.8388 34.3658C35.8497 33.2789 34.8394 32.4271 33.5982 32.374L33.601 31.0405C33.601 31.0405 33.5752 30.9674 33.5535 31.0176C33.5535 31.0176 33.4842 31.0448 33.5317 31.0678L33.529 32.4013C32.2661 32.3984 31.2653 33.2501 31.2544 34.3369C31.2612 35.2503 31.9904 36.0877 33.0713 36.2455L34.0612 36.4807C35.1679 36.7115 36.0138 37.5447 35.9989 38.5082ZM35.9989 38.5082C35.9663 39.6453 34.8745 40.5744 33.5165 40.5256C32.1369 40.527 31.0533 39.5792 31.0859 38.4421C31.0859 38.4421 31.0601 38.369 31.0384 38.4192C31.0384 38.4192 30.9691 38.4464 31.0167 38.4693C31.0316 39.6293 32.1152 40.5772 33.4731 40.626L33.4703 41.9595C33.4703 41.9595 33.4961 42.0326 33.5179 41.9824C33.5179 41.9824 33.5871 41.9552 33.5396 41.9322L33.5423 40.5987C34.8527 40.6246 36.0138 39.6682 35.9989 38.5082Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.7727 26.7186L17.1932 22.9574L16 24.2111L20.7727 29.2261L31 18.4798L29.8068 17.2261L20.7727 26.7186Z" fill="#462A71"/>
              </svg>
              <h3 style={{ fontFamily: 'var(--font-poppins)' }} className="font-sans font-extrabold text-lg sm:text-xl text-primary-navy mb-2">
                Desconto direto na folha
              </h3>
              <p style={{ fontFamily: 'var(--font-poppins)' }} className="text-xs text-gray-500 leading-relaxed font-sans">
                O valor das parcelas é descontado diretamente do seu benefício do INSS, sem preocupações com boletos.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F5F7FA] border-none rounded-2xl p-6 transition-all duration-300 hover:shadow-md hover:bg-gray-100/50 relative overflow-hidden group">
              <svg className="w-12 h-12 mb-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.5244 6.49414C28.5672 6.09291 29.253 5.91576 29.7725 6.03613L29.874 6.06445C30.4408 6.24724 30.9269 6.81603 31.5654 7.80273C31.8509 8.24383 32.1814 8.78632 32.5205 9.25781C32.8227 9.678 33.1787 10.1113 33.6133 10.4658L33.8047 10.6133C34.3296 10.9921 34.9349 11.2331 35.5029 11.4131C36.0617 11.5902 36.6816 11.7356 37.1943 11.8701C38.2698 12.1523 38.943 12.4174 39.3057 12.835L39.374 12.9199C39.7082 13.3758 39.7651 14.1005 39.7002 15.2783C39.6712 15.8041 39.6197 16.4353 39.6182 17.0215C39.6168 17.5431 39.6524 18.1065 39.7969 18.6533L39.8662 18.8867C40.0648 19.4938 40.4125 20.0364 40.7637 20.5059C41.1082 20.9664 41.5272 21.4461 41.8594 21.8496C42.6037 22.7537 43 23.3955 43 24C42.9998 24.6046 42.6031 25.2461 41.8584 26.1504C41.5259 26.5541 41.1073 27.0334 40.7627 27.4941C40.4117 27.9635 40.0642 28.506 39.8662 29.1133C39.6638 29.7317 39.6166 30.3823 39.6182 30.9785C39.6197 31.5647 39.6712 32.1959 39.7002 32.7217C39.761 33.8262 39.7151 34.5317 39.4336 34.9912L39.374 35.0801C39.0319 35.547 38.343 35.8279 37.1953 36.1289C36.6824 36.2634 36.062 36.4087 35.5029 36.5859C35.0058 36.7436 34.4802 36.9483 34.0049 37.251L33.8047 37.3877H33.8037C33.2809 37.7655 32.8649 38.2636 32.5195 38.7441C32.1805 39.2159 31.8507 39.7592 31.5654 40.2002C30.967 41.1252 30.5028 41.681 29.9814 41.8965L29.876 41.9355H29.874C29.3427 42.1066 28.6358 41.9338 27.5234 41.5059C27.0259 41.3144 26.4382 41.0716 25.8721 40.8887C25.2973 40.703 24.658 40.5479 24 40.5479C23.3418 40.5479 22.7019 40.7029 22.127 40.8887C21.5608 41.0716 20.9732 41.3144 20.4756 41.5059C19.4326 41.9071 18.7456 42.0844 18.2256 41.9639L18.124 41.9355C17.5574 41.7528 17.0718 41.1845 16.4336 40.1982C16.1482 39.7571 15.8176 39.2138 15.4785 38.7422C15.1764 38.322 14.8203 37.8887 14.3857 37.5342L14.1943 37.3867C13.6694 37.0079 13.0642 36.766 12.4961 36.5859C11.9374 36.4088 11.3175 36.2644 10.8047 36.1299C9.65705 35.8287 8.9671 35.5468 8.62402 35.0791H8.62305C8.28933 34.6232 8.23302 33.8989 8.29785 32.7217C8.32681 32.1959 8.37837 31.5647 8.37988 30.9785C8.38141 30.3823 8.33519 29.7317 8.13281 29.1133H8.13184C7.93427 28.506 7.58698 27.9634 7.23633 27.4941C6.89195 27.0333 6.47399 26.5541 6.1416 26.1504C5.39702 25.2461 5.00019 24.6047 5 24C5 23.3953 5.39677 22.7537 6.1416 21.8496C6.47406 21.4461 6.89273 20.9665 7.2373 20.5059C7.58865 20.0361 7.93686 19.4928 8.13477 18.8848L8.13379 18.8838C8.33552 18.2661 8.38336 17.6169 8.38184 17.0215C8.38032 16.4353 8.32877 15.8041 8.2998 15.2783C8.23898 14.1738 8.28493 13.4683 8.56641 13.0088L8.62598 12.9199C8.96796 12.4527 9.65672 12.1711 10.8047 11.8701C11.3176 11.7357 11.9381 11.5912 12.4971 11.4141C12.9944 11.2565 13.5206 11.0518 13.9961 10.749L14.1963 10.6123H14.1973C14.7199 10.2344 15.1352 9.73643 15.4805 9.25586C15.8194 8.7841 16.1493 8.24084 16.4346 7.7998C17.0329 6.87484 17.4972 6.31898 18.0186 6.10352L18.124 6.06445H18.126C18.6567 5.8935 19.3624 6.06613 20.4746 6.49414C20.9722 6.68562 21.5606 6.92836 22.127 7.11133C22.7019 7.29703 23.3418 7.45215 24 7.45215C24.6582 7.45208 25.2981 7.29705 25.873 7.11133C26.4393 6.92837 27.0269 6.68558 27.5244 6.49414Z" fill="white" stroke="#462A71" strokeWidth="2"/>
                <rect x="29.0352" y="16.2783" width="4" height="18" rx="2" transform="rotate(45 29.0352 16.2783)" fill="#462A71"/>
                <circle cx="19" cy="19" r="2" fill="#462A71"/>
                <circle cx="29" cy="29" r="2" fill="#462A71"/>
              </svg>
              <h3 style={{ fontFamily: 'var(--font-poppins)' }} className="font-sans font-extrabold text-lg sm:text-xl text-primary-navy mb-2">
                Taxas mais vantajosas
              </h3>
              <p style={{ fontFamily: 'var(--font-poppins)' }} className="text-xs text-gray-500 leading-relaxed font-sans">
                Taxas de juros variam conforme a instituição financeira, o perfil do cliente e as condições da operação. Consulte as condições disponíveis para você.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F5F7FA] border-none rounded-2xl p-6 transition-all duration-300 hover:shadow-md hover:bg-gray-100/50 relative overflow-hidden group">
              <svg className="w-12 h-12 mb-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M35.7587 8.68386H35.8953C39.2091 8.68386 41.8953 11.3702 41.8953 14.6839V36.1257C41.8953 39.4394 39.2091 42.1257 35.8953 42.1257H12C8.68629 42.1257 6 39.4394 6 36.1257L6 14.6839C6 11.3702 8.68629 8.68386 12 8.68386H12.1348C12.2179 6.63653 13.9039 5.00227 15.9717 5.00227C18.0394 5.00227 19.7254 6.63653 19.8086 8.68386H28.0847C28.1667 6.63547 29.8532 5 31.9217 5C33.9902 5 35.6767 6.63547 35.7587 8.68386ZM33.7618 10.6839H30.0816V11.2936C30.0816 12.3099 30.9055 13.1337 31.9217 13.1337C32.938 13.1337 33.7618 12.3099 33.7618 11.2936V10.6839ZM28.0816 10.6839H19.8118V11.2959C19.8118 13.4167 18.0925 15.136 15.9717 15.136C13.8508 15.136 12.1315 13.4167 12.1315 11.2959V10.6839H12C9.79086 10.6839 8 12.4747 8 14.6839L8 36.1257C8 38.3349 9.79086 40.1257 12 40.1257H35.8953C38.1045 40.1257 39.8953 38.3349 39.8953 36.1257V14.6839C39.8953 12.4747 38.1045 10.6839 35.8953 10.6839H35.7618V11.2936C35.7618 13.4144 34.0426 15.1337 31.9217 15.1337C29.8009 15.1337 28.0816 13.4144 28.0816 11.2936V10.6839ZM33.7553 8.68386C33.676 7.74073 32.8854 7 31.9217 7C30.9581 7 30.1675 7.74073 30.0882 8.68386H33.7553ZM14.1315 11.2959V10.6839H17.8118V11.2959C17.8118 12.3121 16.9879 13.136 15.9717 13.136C14.9554 13.136 14.1315 12.3121 14.1315 11.2959ZM15.9717 7.00227C16.9345 7.00227 17.7247 7.74181 17.805 8.68386H14.1383C14.2187 7.74181 15.0088 7.00227 15.9717 7.00227Z" fill="#462A71"/>
                <path d="M12 11.6838L35.8955 11.6838C37.5523 11.6839 38.8955 13.027 38.8955 14.6838V36.1252C38.8955 37.782 37.5523 39.1252 35.8955 39.1252H12C10.3431 39.1252 9 37.7821 9 36.1252L9 14.6838C9 13.027 10.3431 11.6838 12 11.6838Z" fill="#462A71" stroke="white" strokeWidth="2"/>
                <rect x="14.1313" y="7.00226" width="3.68023" height="6.13372" rx="1.84012" fill="white"/>
                <rect x="30.0815" y="6.99994" width="3.68023" height="6.13372" rx="1.84012" fill="white"/>
                <path d="M8 14.6838C8 12.4747 9.79086 10.6838 12 10.6838L35.8953 10.6838C38.1045 10.6838 39.8953 12.4747 39.8953 14.6838V18.0443L8 18.0443V14.6838Z" fill="white"/>
                <rect x="27.627" y="27.8599" width="6.13372" height="6.13372" rx="2" fill="#FA6300"/>
              </svg>
              <h3 style={{ fontFamily: 'var(--font-poppins)' }} className="font-sans font-extrabold text-lg sm:text-xl text-primary-navy mb-2">
                Prazos flexíveis
              </h3>
              <p style={{ fontFamily: 'var(--font-poppins)' }} className="text-xs text-gray-500 leading-relaxed font-sans">
                Algumas instituições podem oferecer carência para o início do pagamento, conforme as condições da operação. Consulte as condições disponíveis para o seu perfil.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#F5F7FA] border-none rounded-2xl p-6 transition-all duration-300 hover:shadow-md hover:bg-gray-100/50 relative overflow-hidden group">
              <svg className="w-12 h-12 mb-5" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16.5" cy="9.5" r="4.5" fill="#FA6300"/>
                <circle cx="16.5" cy="9.5" r="7" stroke="#FFCF00" strokeDasharray="3 1"/>
                <path d="M25.8473 19.702L20.0967 16.8393C19.8813 16.7506 19.6834 16.7316 19.4127 16.7C19.0393 16.6562 18.45 16.7 18.45 16.7V10.1C18.45 9.04862 17.6013 8.19995 16.55 8.19995C15.4987 8.19995 14.65 9.04862 14.65 10.1V22.7039C10.09 21.7413 10.166 21.754 10.0013 21.754C9.60867 21.754 9.254 21.9186 9.00067 22.172C8.447 22.7326 8.44984 23.6351 9.00702 24.1923L14.2573 29.4426C14.5993 29.7846 15.0807 30 15.6 30H24.2007C25.1507 30 25.8853 29.3033 26.0247 28.3786L26.9747 21.7033C26.9873 21.6146 27 21.526 27 21.45C27 20.6646 26.5187 19.9806 25.8473 19.702Z" fill="#462A71"/>
              </svg>
              <h3 style={{ fontFamily: 'var(--font-poppins)' }} className="font-sans font-extrabold text-lg sm:text-xl text-primary-navy mb-2">
                Contratação sem burocracia
              </h3>
              <p style={{ fontFamily: 'var(--font-poppins)' }} className="text-xs text-gray-500 leading-relaxed font-sans">
                Contrate sem sair de casa, com segurança e praticidade pelo site ou WhatsApp da BCred Fácil.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href={`https://wa.me/${companyConfig.whatsapp}?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20as%20vantagens%20do%20Crédito%20Consignado%20INSS.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-white bg-primary-orange hover:bg-secondary-orange transition-all duration-200 shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary-orange"
            >
              Simular pelo WhatsApp
            </a>
          </div>
        </Container>
      </section>

      {/* ==================================================
          2. QUEM PODE SOLICITAR
         ================================================== */}
      <section id="quem-pode-solicitar" className="py-14 md:py-20 lg:py-24 bg-gray-50 border-b border-gray-200">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6 min-w-0">
              <span className="text-primary-orange font-bold text-xs uppercase tracking-wider">Elegibilidade</span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-primary-navy tracking-tight max-w-[720px]">
                Quem pode solicitar o Crédito Consignado?
              </h2>
              <p className="text-base text-gray-600 leading-relaxed font-sans max-w-[680px]">
                A modalidade pode estar disponível para aposentados, pensionistas e trabalhadores com carteira assinada, conforme as regras vigentes, a margem disponível e a análise da instituição financeira responsável.
              </p>

              {/* Public list */}
              <ul className="space-y-3 font-sans font-medium text-sm text-primary-navy">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary-orange mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Aposentados do INSS
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary-orange mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Pensionistas do INSS
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary-orange mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Trabalhadores com carteira assinada (CLT)
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary-orange mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Beneficiários elegíveis conforme as regras da modalidade
                </li>
              </ul>

              {/* Warning box */}
              <div className="bg-primary-blue/5 border-l-4 border-primary-blue p-4 rounded-r-xl text-xs text-primary-navy font-sans leading-relaxed max-w-[600px]">
                <strong>Aviso:</strong> A disponibilidade depende da situação do benefício, da margem consignável e da aprovação da instituição responsável.
              </div>

              <div className="pt-2 text-center lg:text-left">
                <a
                  href={`https://wa.me/${companyConfig.whatsapp}?text=Olá!%20Gostaria%20de%20consultar%20minha%20possibilidade%20de%20crédito%20consignado%20INSS.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-base font-bold rounded-xl text-white bg-primary-blue hover:bg-primary-navy transition-all duration-200 shadow-md"
                >
                  Consultar minha possibilidade
                </a>
              </div>
            </div>

            {/* Right Column (Visual representation) */}
            <div className="lg:col-span-5 min-w-0">
              <img
                src="/aposentada-analisando-documentos-credito-consignado.png"
                alt="Aposentada analisando documentos sobre crédito consignado em casa"
                className="w-full h-auto aspect-[4/3] object-cover rounded-[32px] shadow-md transition-all duration-300 hover:shadow-lg"
              />
            </div>

          </div>
        </Container>
      </section>

      {/* ==================================================
          3. COMO FUNCIONA A Solicitação
         ================================================== */}
      <section id="como-funciona" className="bg-primary-navy text-white py-14 md:py-20 lg:py-24 overflow-hidden relative">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-blue/20 rounded-full filter blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-orange/5 rounded-full filter blur-3xl pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

        <Container className="relative">
          
          {/* Header section */}
          <div className="max-w-2xl text-center md:text-left min-w-0 mb-12">
            <span className="text-primary-orange font-bold text-xs uppercase tracking-wider">Passo a Passo</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight mt-1 max-w-[720px]">
              Como funciona a solicitação?
            </h2>
            <p className="text-gray-300 mt-2 text-sm sm:text-base font-sans max-w-[680px]">
              Etapas claras para orientar você do primeiro contato até o encerramento do seu pedido.
            </p>
          </div>

          {/* Steps Horizontal container for Desktop, Vertical for Mobile */}
          {/* Desktop scroll layout */}
          <div className="hidden lg:flex space-x-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-primary-orange scrollbar-track-white/10 snap-x">
            
            {/* Step 1 */}
            {/* Step 1 container */}
            <div className="relative flex-shrink-0 w-80 snap-start mt-[105px] overflow-visible">
              {/* Mascot 3 Peeking from behind Card 1 */}
              <div className="absolute -top-[126px] left-1/2 -translate-x-1/2 pointer-events-none z-20">
                <img
                  src="/images/mascotes/mascote-bcred-pensativa-uniforme.png"
                  alt=""
                  aria-hidden="true"
                  className="w-[135px] h-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              
              {/* Actual Card */}
              <div className="relative z-10 bg-[#0B2545]/90 border border-white/5 rounded-2xl p-6 h-full flex flex-col justify-between hover:border-primary-orange/30 transition-all duration-300 backdrop-blur-sm">
                <div>
                  <span className="w-9 h-9 rounded-full bg-primary-orange text-white flex items-center justify-center font-display font-black text-lg mb-4">1</span>
                  <h4 className="font-display font-bold text-lg text-white mb-2">Escolha seu perfil</h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    Informe se você é aposentado, pensionista ou trabalhador com carteira assinada.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex-shrink-0 w-80 bg-[#0B2545]/80 border border-white/5 rounded-2xl p-6 snap-start flex flex-col justify-between hover:border-primary-orange/30 transition-all duration-300">
              <div>
                <span className="w-9 h-9 rounded-full bg-primary-orange text-white flex items-center justify-center font-display font-black text-lg mb-4">2</span>
                <h4 className="font-display font-bold text-lg text-white mb-2">Inicie a simulação</h4>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  Fale com a equipe da BCred Fácil pelo WhatsApp.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex-shrink-0 w-80 bg-[#0B2545]/80 border border-white/5 rounded-2xl p-6 snap-start flex flex-col justify-between hover:border-primary-orange/30 transition-all duration-300">
              <div>
                <span className="w-9 h-9 rounded-full bg-primary-orange text-white flex items-center justify-center font-display font-black text-lg mb-4">3</span>
                <h4 className="font-display font-bold text-lg text-white mb-2">Envie as informações</h4>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  Compartilhe apenas os dados necessários para a análise inicial.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex-shrink-0 w-80 bg-[#0B2545]/80 border border-white/5 rounded-2xl p-6 snap-start flex flex-col justify-between hover:border-primary-orange/30 transition-all duration-300">
              <div>
                <span className="w-9 h-9 rounded-full bg-primary-orange text-white flex items-center justify-center font-display font-black text-lg mb-4">4</span>
                <h4 className="font-display font-bold text-lg text-white mb-2">Confira as possibilidades</h4>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  Um consultor explica as opções que podem estar disponíveis para o seu perfil.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex-shrink-0 w-80 bg-[#0B2545]/80 border border-white/5 rounded-2xl p-6 snap-start flex flex-col justify-between hover:border-primary-orange/30 transition-all duration-300">
              <div>
                <span className="w-9 h-9 rounded-full bg-primary-orange text-white flex items-center justify-center font-display font-black text-lg mb-4">5</span>
                <h4 className="font-display font-bold text-lg text-white mb-2">Analise as condições</h4>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  Confira instituição responsável, parcelas, taxas, prazos e Custo Efetivo Total.
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="flex-shrink-0 w-80 bg-[#0B2545]/80 border border-white/5 rounded-2xl p-6 snap-start flex flex-col justify-between hover:border-primary-orange/30 transition-all duration-300">
              <div>
                <span className="w-9 h-9 rounded-full bg-primary-orange text-white flex items-center justify-center font-display font-black text-lg mb-4">6</span>
                <h4 className="font-display font-bold text-lg text-white mb-2">Confirme a contratação</h4>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  Caso concorde com as condições, siga o procedimento indicado pela instituição financeira.
                </p>
              </div>
            </div>

          </div>

          {/* Mobile Vertical stack */}
          <div id="mobile-steps-container" className="lg:hidden relative pl-8 space-y-6">
            {/* Connection line track */}
            <div className="absolute left-[13px] top-3 bottom-3 w-0.5 bg-white/10 rounded-full" />
            
            {/* Active connection line filled on scroll */}
            <div 
              className="absolute left-[13px] top-3 w-0.5 bg-primary-orange rounded-full origin-top"
              style={{ height: `${stepProgress}%` }}
            />
            
            {/* Step 1 container */}
            <div className="relative overflow-visible mt-[115px] w-full">
              {/* Mascot 3 Peeking from behind Card 1 */}
              <div className="absolute -top-[94px] left-1/2 -translate-x-1/2 pointer-events-none z-20">
                <img
                  src="/images/mascotes/mascote-bcred-pensativa-uniforme.png"
                  alt=""
                  aria-hidden="true"
                  className="w-[100px] h-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              
              {/* Actual Card */}
              <div className="relative z-10 bg-[#0B2545]/90 border border-white/5 rounded-xl p-5 flex items-start backdrop-blur-sm">
                <span className={`absolute -left-[36px] top-4 w-8 h-8 rounded-full flex items-center justify-center font-display font-black text-sm sm:text-base z-10 transition-all duration-300 ${
                  stepProgress >= 2
                    ? 'bg-primary-orange text-white' 
                    : 'bg-[#0B2545] text-gray-400 border border-white/10'
                }`}>
                  {stepProgress >= 2 ? (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : 1}
                </span>
                <div>
                  <h4 className="font-display font-bold text-sm text-white mb-1">Escolha seu perfil</h4>
                  <p className="text-xs text-gray-300 font-sans leading-relaxed">
                    Informe se você é aposentado, pensionista ou trabalhador com carteira assinada.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative bg-[#0B2545]/80 border border-white/5 rounded-xl p-5 flex items-start">
              <span className={`absolute -left-[36px] top-4 w-8 h-8 rounded-full flex items-center justify-center font-display font-black text-sm sm:text-base z-10 transition-all duration-300 ${
                stepProgress >= 18
                  ? 'bg-primary-orange text-white' 
                  : 'bg-[#0B2545] text-gray-400 border border-white/10'
              }`}>
                {stepProgress >= 18 ? (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : 2}
              </span>
              <div>
                <h4 className="font-display font-bold text-sm text-white mb-1">Inicie a simulação</h4>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  Fale com a equipe da BCred Fácil pelo WhatsApp.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative bg-[#0B2545]/80 border border-white/5 rounded-xl p-5 flex items-start">
              <span className={`absolute -left-[36px] top-4 w-8 h-8 rounded-full flex items-center justify-center font-display font-black text-sm sm:text-base z-10 transition-all duration-300 ${
                stepProgress >= 36
                  ? 'bg-primary-orange text-white' 
                  : 'bg-[#0B2545] text-gray-400 border border-white/10'
              }`}>
                {stepProgress >= 36 ? (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : 3}
              </span>
              <div>
                <h4 className="font-display font-bold text-sm text-white mb-1">Envie as informações iniciais</h4>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  Compartilhe apenas os dados necessários para a análise inicial.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative bg-[#0B2545]/80 border border-white/5 rounded-xl p-5 flex items-start">
              <span className={`absolute -left-[36px] top-4 w-8 h-8 rounded-full flex items-center justify-center font-display font-black text-sm sm:text-base z-10 transition-all duration-300 ${
                stepProgress >= 54
                  ? 'bg-primary-orange text-white' 
                  : 'bg-[#0B2545] text-gray-400 border border-white/10'
              }`}>
                {stepProgress >= 54 ? (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : 4}
              </span>
              <div>
                <h4 className="font-display font-bold text-sm text-white mb-1">Confira as possibilidades</h4>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  Um consultor explica as opções que podem estar disponíveis para o seu perfil.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative bg-[#0B2545]/80 border border-white/5 rounded-xl p-5 flex items-start">
              <span className={`absolute -left-[36px] top-4 w-8 h-8 rounded-full flex items-center justify-center font-display font-black text-sm sm:text-base z-10 transition-all duration-300 ${
                stepProgress >= 72
                  ? 'bg-primary-orange text-white' 
                  : 'bg-[#0B2545] text-gray-400 border border-white/10'
              }`}>
                {stepProgress >= 72 ? (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : 5}
              </span>
              <div>
                <h4 className="font-display font-bold text-sm text-white mb-1">Analise as condições</h4>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  Confira instituição responsável, parcelas, taxas, prazos e Custo Efetivo Total.
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="relative bg-[#0B2545]/80 border border-white/5 rounded-xl p-5 flex items-start">
              <span className={`absolute -left-[36px] top-4 w-8 h-8 rounded-full flex items-center justify-center font-display font-black text-sm sm:text-base z-10 transition-all duration-300 ${
                stepProgress >= 90
                  ? 'bg-primary-orange text-white' 
                  : 'bg-[#0B2545] text-gray-400 border border-white/10'
              }`}>
                {stepProgress >= 90 ? (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : 6}
              </span>
              <div>
                <h4 className="font-display font-bold text-sm text-white mb-1">Confirme a contratação</h4>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  Caso concorde com as condições, siga o procedimento indicado pela instituição financeira.
                </p>
              </div>
            </div>

          </div>

          {/* Action Button */}
          <div className="text-center mt-12">
            <a
              href={`https://wa.me/${companyConfig.whatsapp}?text=Olá!%20Começar%20minha%20simulação%20com%20a%20BCred%20Fácil.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-white bg-primary-orange hover:bg-secondary-orange transition-all duration-200 shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary-orange"
            >
              Simular agora
            </a>
          </div>

        </Container>
      </section>

      {/* ==================================================
          4. COMPARAÇÃO DE MODALIDADES
         ================================================== */}
      <section id="comparativo" className="py-14 md:py-20 lg:py-24 bg-white border-b border-gray-100">
        <Container>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-6">
            <span className="text-primary-orange font-bold text-xs uppercase tracking-wider">ORIENTAÇÃO CONSCIENTE</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-primary-navy tracking-tight mt-2.5 max-w-[720px] mx-auto leading-tight">
              Entenda as diferenças antes de contratar
            </h2>
            <p className="text-gray-600 mt-2.5 text-base max-w-[680px] mx-auto font-sans">
              Compare como funcionam as modalidades e escolha com mais clareza.
            </p>
          </div>


          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-6 max-w-4xl mx-auto px-[18px] sm:px-[22px] md:px-0">
            
            {/* Card 1: Crédito Consignado */}
            <div className="bg-[#061A3A] border-2 border-primary-orange/30 rounded-[18px] p-6 flex flex-col justify-between text-white relative shadow-md">
              <div>
                <div className="flex flex-col items-start gap-1.5 mb-4">
                  <h3 className="font-display font-black text-xl text-white">
                    Crédito Consignado
                  </h3>
                  <span className="bg-primary-orange text-white text-[9px] font-medium tracking-wider uppercase px-2 py-0.5 rounded whitespace-nowrap">
                    DESCONTO EM FOLHA
                  </span>
                </div>

                <div className="space-y-4 font-sans text-left mt-6">
                  <div>
                    <span className="block text-[11px] text-gray-400 font-bold uppercase tracking-wider">Taxas</span>
                    <p className="text-[14px] text-gray-100 font-semibold mt-0.5">
                      Geralmente mais <span className="text-[#25D366] font-bold">baixas</span>
                    </p>
                  </div>
                  <div className="border-t border-white/10 pt-3">
                    <span className="block text-[11px] text-gray-400 font-bold uppercase tracking-wider">Pagamento</span>
                    <p className="text-[14px] text-gray-100 font-semibold mt-0.5">Desconto direto no benefício ou salário</p>
                  </div>
                  <div className="border-t border-white/10 pt-3">
                    <span className="block text-[11px] text-gray-400 font-bold uppercase tracking-wider">Margem</span>
                    <p className="text-[14px] text-gray-100 font-semibold mt-0.5">Precisa estar disponível</p>
                  </div>
                  <div className="border-t border-white/10 pt-3">
                    <span className="block text-[11px] text-gray-400 font-bold uppercase tracking-wider">Análise</span>
                    <p className="text-[14px] text-gray-100 font-semibold mt-0.5">Considera perfil, margem e regras da instituição</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="#simulador"
                  className="w-full h-[48px] flex items-center justify-center bg-primary-orange hover:bg-secondary-orange text-white font-display font-bold text-[14px] rounded-xl transition-all duration-200 shadow-md text-center"
                >
                  Ver minhas possibilidades
                </a>
              </div>
            </div>

            {/* Card 2: Empréstimo Pessoal */}
            <div className="bg-white border border-gray-200 rounded-[18px] p-6 flex flex-col justify-between text-gray-800 relative shadow-sm hover:border-gray-300 transition-colors">
              <div>
                <div className="flex flex-col items-start gap-1.5 mb-4">
                  <h3 className="font-display font-black text-xl text-primary-navy">
                    Empréstimo Pessoal
                  </h3>
                </div>

                <div className="space-y-4 font-sans text-left mt-6">
                  <div>
                    <span className="block text-[11px] text-gray-500 font-bold uppercase tracking-wider">Taxas</span>
                    <p className="text-[14px] text-gray-900 font-semibold mt-0.5">
                      Podem ser mais <span className="text-red-500 font-bold">elevadas</span>
                    </p>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <span className="block text-[11px] text-gray-500 font-bold uppercase tracking-wider">Pagamento</span>
                    <p className="text-[14px] text-gray-900 font-semibold mt-0.5">Boleto, débito ou conta bancária</p>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <span className="block text-[11px] text-gray-500 font-bold uppercase tracking-wider">Margem</span>
                    <p className="text-[14px] text-gray-900 font-semibold mt-0.5">Não utiliza margem consignável</p>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <span className="block text-[11px] text-gray-500 font-bold uppercase tracking-wider">Análise</span>
                    <p className="text-[14px] text-gray-900 font-semibold mt-0.5">Pode considerar renda e histórico de crédito</p>
                  </div>
                </div>
              </div>

              {/* Invisible spacer so the height matches the left card perfectly on desktop */}
              <div className="mt-8 hidden md:block h-[48px]" />
            </div>

          </div>

          {/* Aviso Inferior */}
          <div className="mt-[14px] max-w-4xl mx-auto text-center px-[18px]">
            <p className="text-[13px] text-gray-400 font-sans leading-relaxed">
              Taxas, prazos e condições variam conforme perfil, modalidade e instituição financeira responsável.
            </p>
          </div>
        </Container>
      </section>

      {/* ==================================================
          INSTITUIÇÕES FINANCEIRAS CAROUSEL
         ================================================== */}
      <section className="py-10 md:py-14 bg-gray-50 border-b border-gray-100 overflow-hidden">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-navy tracking-tight max-w-[720px] mx-auto">
              Instituições com as quais trabalhamos
            </h2>
            <p className="text-gray-600 mt-2 text-sm max-w-[680px] mx-auto font-sans">
              A BCred Fácil consulta possibilidades em diferentes instituições financeiras conforme seu perfil, modalidade e condições disponíveis.
            </p>
            <p className="text-xs text-gray-500 mt-2 max-w-[600px] mx-auto font-sans">
              A disponibilidade de produtos e instituições pode variar conforme perfil, convênio, margem e análise da instituição responsável.
            </p>
          </div>

          {/* Marquee Wrapper for Row 1 (Right to Left) */}
          <div className="relative w-full overflow-hidden py-2 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-gray-50 before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-gray-50 after:to-transparent">
            <div className="animate-marquee gap-14 md:gap-24 items-center">
              {duplicatedRow1.map((item, idx) => (
                <div key={idx} aria-hidden={idx >= row1.length ? "true" : undefined} className="flex-shrink-0 flex items-center justify-center h-14 md:h-20 px-4">
                  <Image
                    src={item.src}
                    alt={idx >= row1.length ? "" : item.alt}
                    title={item.name}
                    width={140}
                    height={56}
                    className="h-10 md:h-14 w-auto object-contain max-w-none transition-all duration-200"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Wrapper for Row 2 (Left to Right) */}
          <div className="relative w-full overflow-hidden py-2 mt-2 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-gray-50 before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-gray-50 after:to-transparent">
            <div className="animate-marquee-reverse gap-14 md:gap-24 items-center">
              {duplicatedRow2.map((item, idx) => (
                <div key={idx} aria-hidden={idx >= row2.length ? "true" : undefined} className="flex-shrink-0 flex items-center justify-center h-14 md:h-20 px-4">
                  <Image
                    src={item.src}
                    alt={idx >= row2.length ? "" : item.alt}
                    title={item.name}
                    width={140}
                    height={56}
                    className="h-10 md:h-14 w-auto object-contain max-w-none transition-all duration-200"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-[10px] text-gray-400 font-sans max-w-[600px] mx-auto leading-relaxed">
              A disponibilidade de produtos e instituições pode variar conforme perfil, convênio, margem e análise da instituição financeira responsável.
            </p>
          </div>
        </Container>
      </section>

      {/* ==================================================
          5. O QUE É MARGEM CONSIGNÁVEL
         ================================================== */}
      <section id="margem" className="py-14 md:py-20 lg:py-24 bg-gray-50 border-b border-gray-200">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6 min-w-0">
              <span className="text-primary-orange font-bold text-xs uppercase tracking-wider">
                {getText('margem_tagline', 'Educação Financeira')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-primary-navy tracking-tight max-w-[720px]">
                {getText('margem_title', 'O que é margem consignável?')}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed font-sans max-w-[680px]">
                {getText('margem_desc', 'A margem consignável representa a parte do benefício que pode ser comprometida com parcelas de operações consignadas. A disponibilidade precisa ser consultada de acordo com as regras vigentes e a situação de cada benefício.')}
              </p>

              {/* Orientation box */}
              <div className="bg-primary-orange/5 border-l-4 border-primary-orange p-5 rounded-r-2xl space-y-2 max-w-[600px]">
                <h4 className="font-display font-bold text-sm text-primary-navy">
                  {getText('margem_box_title', 'Não sabe se possui margem disponível?')}
                </h4>
                <p className="text-xs text-gray-600 font-sans leading-relaxed">
                  {getText('margem_box_desc', 'Fale com a nossa equipe para receber uma orientação inicial rápida sobre como consultar sua margem de forma simples e segura.')}
                </p>
              </div>

              <div className="pt-2 flex justify-center lg:justify-start">
                {companyConfig.whatsappIsReady && (
                  <a
                    href={`https://wa.me/${companyConfig.whatsapp}?text=Ol%C3%A1!%20N%C3%A3o%20sei%20se%20tenho%20margem%20dispon%C3%ADvel.%20Poderiam%20me%20ajudar%20a%20consultar?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3.5 text-base font-bold rounded-xl text-white bg-primary-orange hover:bg-secondary-orange transition-all duration-200 shadow-md"
                  >
                    {getText('margem_btn', 'Falar com Consultor')}
                  </a>
                )}
              </div>
            </div>

            {/* Right Column (Mascot with shield representing margin safety) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center min-w-0">
              <MascotBe pose="shield" className="w-56 h-56 filter drop-shadow-xl" />
              <span className="text-[10px] sm:text-[11px] font-light text-gray-500 uppercase tracking-[0.18em] mt-4">
                {getText('margem_side_tagline', 'PROTEÇÃO GARANTIDA')}
              </span>
              <p className="text-xs text-gray-500 font-sans mt-3 px-2 text-center leading-relaxed max-w-[280px]">
                {getText('margem_side_desc', 'Trabalhamos estritamente dentro da margem estipulada por lei para garantir sua saúde financeira e estabilidade.')}
              </p>
            </div>

          </div>
        </Container>
      </section>

      {/* 5. SECURITY CONTRA GOLPES */}
      <section className="py-14 md:py-20 lg:py-24 bg-primary-navy text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-navy to-primary-blue opacity-50 pointer-events-none" />
        <Container className="relative">

          <div className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">

            {/* Badge */}
            <span className="bg-white/10 text-primary-orange px-4 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em]">
              {getText('seguranca_tagline', 'PROTEÇÃO GARANTIDA')}
            </span>

            {/* 1. Headline */}
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight -mt-4">
              {getText('seguranca_title', 'Sua segurança vem antes de qualquer contratação.')}
            </h2>

            {/* 2. Subheadline */}
            <p className="text-base text-gray-300 -mt-4 max-w-[600px]">
              {getText('seguranca_desc', 'O mercado de crédito exige atenção. Para proteger você de golpes e fraudes, siga sempre estas regras básicas de segurança:')}
            </p>

            {/* 3. Mascote 5 */}
            <div className="w-48 h-48 sm:w-60 sm:h-60 flex-shrink-0">
              <img
                src="/mascotebcredfacil5.png"
                alt="Mascote BCred Fácil segurando escudo de proteção"
                className="w-full h-full object-contain drop-shadow-2xl"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* 4. Topics grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left">
              <div className="flex items-start space-x-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <span className="text-red-400 font-bold text-lg leading-none mt-0.5">✕</span>
                <span className="text-sm text-gray-200 font-sans">
                  {getText('seguranca_rule1', 'Não informe senhas bancárias sob nenhuma hipótese;')}
                </span>
              </div>
              <div className="flex items-start space-x-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <span className="text-red-400 font-bold text-lg leading-none mt-0.5">✕</span>
                <span className="text-sm text-gray-200 font-sans">
                  {getText('seguranca_rule2', 'Não informe senha do Gov.br ou do sistema Meu INSS;')}
                </span>
              </div>
              <div className="flex items-start space-x-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <span className="text-red-400 font-bold text-lg leading-none mt-0.5">✕</span>
                <span className="text-sm text-gray-200 font-sans">
                  {getText('seguranca_rule3', 'Nunca compartilhe códigos que receber por SMS;')}
                </span>
              </div>
              <div className="flex items-start space-x-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <span className="text-red-400 font-bold text-lg leading-none mt-0.5">✕</span>
                <span className="text-sm text-gray-200 font-sans">
                  {getText('seguranca_rule4', 'Nunca faça depósitos antecipados para liberar crédito;')}
                </span>
              </div>
              <div className="flex items-start space-x-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <span className="text-green-400 font-bold text-lg leading-none mt-0.5">✓</span>
                <span className="text-sm text-gray-200 font-sans">
                  {getText('seguranca_rule5', 'Confira sempre o número oficial de atendimento;')}
                </span>
              </div>
              <div className="flex items-start space-x-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <span className="text-green-400 font-bold text-lg leading-none mt-0.5">✓</span>
                <span className="text-sm text-gray-200 font-sans">
                  {getText('seguranca_rule6', 'Leia com atenção todos os termos antes de assinar.')}
                </span>
              </div>
            </div>

            {/* 5. CTA Button */}
            <Link
              href="/seguranca"
              className="px-8 py-4 bg-primary-orange hover:bg-secondary-orange text-white font-display font-bold text-base rounded-xl transition-colors shadow-lg"
            >
              {getText('seguranca_btn', 'Conheça nossos canais oficiais')}
            </Link>

          </div>
        </Container>
      </section>

      {/* 6. LEAD SIMULATOR FORM SECTOR */}
      <section id="simulador" className="py-14 md:py-20 lg:py-24 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-display font-extrabold text-primary-navy max-w-[720px] mx-auto">
              {getText('simulador_title', 'Simule Agora Sem Compromisso')}
            </h2>
            <p className="text-gray-600 mt-2 text-sm max-w-[680px] mx-auto">
              {getText('simulador_desc', 'Ao preencher o formulário, nosso time de consultoria local entrará em contato em horário comercial para analisar as opções mais adequadas ao seu perfil.')}
            </p>
          </div>

          <LeadForm sourcePage="home" />

          <div className="mt-12">
            <FinancialConditions />
          </div>
        </Container>
      </section>

      {/* 7. INSTITUTIONAL / ABOUT SUMMARY */}
      <section className="py-14 md:py-20 lg:py-24 bg-gray-50 border-t border-gray-200">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual element */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-150 space-y-4 min-w-0">
              <span className="text-xs uppercase tracking-widest text-primary-orange font-medium">
                {getText('somos_left_badge', 'Correspondente no País')}
              </span>
              <p className="text-xs text-gray-500">
                {getText('somos_left_note', 'Atuamos como correspondente no País, nos termos da regulamentação aplicável, prestando atendimento e encaminhamento de propostas conforme as instituições financeiras contratantes.')}
              </p>
              <h3 className="text-2xl font-display font-extrabold text-primary-navy">
                {getText('somos_left_title', 'Atendimento próximo para decisões mais conscientes.')}
              </h3>
              <p className="text-sm text-gray-600 font-sans leading-relaxed">
                {getText('somos_left_desc', 'A BCred Fácil nasceu com o compromisso de simplificar o acesso a opções de crédito de forma legal, prestando uma assessoria consultiva clara e transparente em cada fase do seu atendimento.')}
              </p>
              <div className="border-t pt-4 text-xs text-gray-500 font-sans">
                {getText('somos_left_footer', 'Confiança gerada com atendimento presencial de qualidade e suporte telefônico contínuo.')}
              </div>
            </div>

            {/* Content text */}
            <div className="space-y-6 min-w-0">
              <h2 className="text-3xl font-display font-extrabold text-primary-navy tracking-tight max-w-[720px] text-center">
                {getText('somos_right_title', 'Quem Somos')}
              </h2>
              <p className="text-sm text-gray-600 font-sans leading-relaxed max-w-[680px]">
                {getText('somos_right_desc', 'Diferente de sistemas robotizados, acreditamos que decisões financeiras importantes requerem contato humano, escuta atenta e paciência para esclarecer taxas, regras e prazos contratuais.')}
              </p>
              <ul className="space-y-2 text-sm text-gray-700 font-sans">
                <li className="flex items-center">
                  <span className="text-primary-orange mr-2">✔</span> {getText('somos_right_item1', 'Atuamos como Correspondente no País, em parceria com instituições financeiras contratantes, observando a regulamentação aplicável ao serviço.')}
                </li>
                <li className="flex items-center">
                  <span className="text-primary-orange mr-2">✔</span> {getText('somos_right_item2', 'Transparência total sobre o Custo Efetivo Total (CET) e demais condições da operation financeira.')}
                </li>
                <li className="flex items-center">
                  <span className="text-primary-orange mr-2">✔</span> {getText('somos_right_item3', 'Análise dedicada das margens de empréstimo.')}
                </li>
              </ul>
              <div>
                <Link 
                  href="/sobre" 
                  className="inline-flex items-center text-primary-blue hover:text-primary-orange font-display font-bold text-sm"
                >
                  {getText('somos_right_btn', 'Conhecer a BCred Fácil →')}
                </Link>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* 8. LOCAL PRESENCE / SEO */}
      <section className="py-14 md:py-20 lg:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Contact text */}
            <div className="lg:col-span-5 space-y-6 min-w-0">
              <h2 className="text-3xl font-display font-extrabold text-primary-navy tracking-tight max-w-[720px]">
                {getText('local_title', `Atendimento em ${companyConfig.city} e região`)}
              </h2>
              <p className="text-sm text-gray-600 font-sans leading-relaxed max-w-[680px]">
                {getText('local_desc', 'Quer fazer uma visita ou prefere falar por telefone? Estamos prontos para receber você em nossa unidade central ou prestar atendimento completo sem que você precise sair de casa.')}
              </p>
              
              <div className="space-y-4 text-sm text-gray-700 font-sans max-w-[600px]">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-150">
                  <strong className="block text-primary-navy">Endereço:</strong>
                  <p>{companyConfig.address}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-150">
                  <strong className="block text-primary-navy">Contatos Rapidos:</strong>
                  {companyConfig.phoneIsReady && <p>Telefone: {companyConfig.phone}</p>}
                  {companyConfig.whatsappIsReady && <p>WhatsApp: {companyConfig.whatsappFormatted}</p>}
                  {!companyConfig.phoneIsReady && !companyConfig.whatsappIsReady && (
                    <p className="text-xs text-gray-500">Canais de atendimento disponiveis em breve.</p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {companyConfig.whatsappIsReady && (
                  <a
                    href={`https://wa.me/${companyConfig.whatsapp}?text=Ol%C3%A1!%20Gostaria%20de%20saber%20onde%20fica%20a%20BCred%20F%C3%A1cil.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 bg-primary-orange hover:bg-secondary-orange text-white font-semibold text-sm rounded-lg transition-colors shadow-sm"
                  >
                    {getText('local_btn', 'Falar pelo WhatsApp')}
                  </a>
                )}
              </div>
            </div>

            {/* Map/Visual */}
            <div className="lg:col-span-7 bg-gray-100 rounded-2xl overflow-hidden h-80 border border-gray-200 relative flex items-center justify-center min-w-0 shadow-inner">
              <iframe
                title="Mapa de Localização"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${encodeURIComponent(companyConfig.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              />
            </div>

          </div>
        </Container>
      </section>

      {/* 9. FINAL CTA SECTION */}
      <section className="py-14 md:py-20 lg:py-24 bg-primary-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-navy to-primary-blue opacity-90" />
        <Container className="relative text-center space-y-6 flex flex-col items-center">
          <MascotBe pose="pointer" className="w-44 h-44" />
          
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight max-w-[720px]">
            {getText('ctafinal_title', 'Quer entender quais possibilidades estão disponíveis para você?')}
          </h2>
          <p className="text-base text-gray-300 max-w-[680px] font-sans">
            {getText('ctafinal_desc', 'Fale com a equipe da BCred Fácil e receba uma análise inicial rápida, clara e sem compromisso.')}
          </p>

          <div className="pt-2">
            <a 
              href={`https://wa.me/${companyConfig.whatsapp}?text=Olá!%20Tenho%20interesse%20em%20uma%20análise%20de%20crédito%20e%20gostaria%20de%20saber%20quais%20opções%20de%20empréstimo%20estão%20disponíveis%20para%20o%20meu%20perfil.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-primary-orange hover:bg-secondary-orange text-white font-display font-bold text-base rounded-xl transition-all duration-200 shadow-lg"
            >
              {getText('ctafinal_btn', 'Falar com um consultor')}
            </a>
          </div>

          <p className="text-[10px] text-gray-400 font-sans max-w-[500px]">
            {getText('ctafinal_note', 'A contratação depende da análise e das condições da instituição financeira responsável.')}
          </p>
        </Container>
      </section>

      {/* 10. FAQ ACCORDION SECTION — Última seção */}
      <section className="py-14 md:py-20 lg:py-24 bg-gray-50 border-t border-gray-200">
        <Container>
          
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-extrabold text-primary-navy tracking-tight max-w-[720px] mx-auto">
              {getText('faq_title', 'Dúvidas Frequentes')}
            </h2>
            <p className="text-gray-600 mt-2 text-sm max-w-[680px] mx-auto">
              {getText('faq_desc', 'Esclarecemos as principais dúvidas regulatórias e procedimentais.')}
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl border border-gray-150 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left font-display font-bold text-base text-primary-navy flex justify-between items-center hover:bg-gray-50 transition-colors focus:outline-none"
                  aria-expanded={openFaq === index}
                >
                  <span>{faq.q}</span>
                  <span className="text-primary-orange text-xl font-bold ml-2">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                
                {openFaq === index && (
                  <div className="px-6 pb-5 text-sm text-gray-600 border-t border-gray-100 pt-3 leading-relaxed font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8 font-sans">
            <Link 
              href="/duvidas" 
              className="text-sm font-display font-bold text-primary-blue hover:text-primary-orange"
            >
              {getText('faq_btn', 'Ver todas as dúvidas frequentes →')}
            </Link>
          </div>

        </Container>
      </section>

    </div>
  );
}
