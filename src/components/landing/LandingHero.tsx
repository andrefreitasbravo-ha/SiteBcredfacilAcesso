import React from 'react';
import Image from 'next/image';
import { LandingLeadForm } from './LandingLeadForm';

interface LandingHeroProps {
  product: 'credito-consignado-inss' | 'credito-do-trabalhador' | 'portabilidade' | 'antecipacao-fgts';
  badge: string;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  trustSignals: string[];
  microcopy: string;
  imageAlt: string;
  imageSrc: string; // URL da imagem ou import
  formTitle?: string;
  formText?: string;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  product,
  badge,
  title,
  subtitle,
  trustSignals,
  microcopy,
  imageAlt,
  imageSrc,
  formTitle,
  formText
}) => {
  return (
    <section className="bg-primary-navy relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b-[6px] border-primary-orange">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-primary-blue/20 blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-primary-orange/10 blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Copy Column */}
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold font-display uppercase tracking-wider bg-white/10 text-white border border-white/20 shadow-sm backdrop-blur-sm">
              {badge}
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight">
              {title}
            </h1>
            
            <p className="text-base sm:text-lg text-gray-300 font-sans leading-relaxed max-w-lg mx-auto lg:mx-0">
              {subtitle}
            </p>

            <ul className="space-y-3 pt-2 max-w-sm mx-auto lg:mx-0 text-left">
              {trustSignals.map((signal, idx) => (
                <li key={idx} className="flex items-start">
                  <svg className="w-5 h-5 text-primary-orange mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-medium text-gray-200 font-sans">{signal}</span>
                </li>
              ))}
            </ul>

            <p className="text-[11px] text-gray-400 font-sans pt-4 max-w-sm mx-auto lg:mx-0">
              {microcopy}
            </p>
          </div>

          {/* Form Column */}
          <div className="w-full">
            <LandingLeadForm 
              product={product} 
              customTitle={formTitle} 
              customText={formText} 
            />
          </div>

        </div>
      </div>
    </section>
  );
};
