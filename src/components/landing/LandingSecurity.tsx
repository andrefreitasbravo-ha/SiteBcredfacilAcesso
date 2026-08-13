import React from 'react';
import { companyConfig } from '@/config/company';

interface LandingSecurityProps {
  title?: string;
  items: string[];
}

export const LandingSecurity: React.FC<LandingSecurityProps> = ({
  title = "Rapidez no atendimento, cuidado em cada etapa.",
  items
}) => {
  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-navy rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden border border-primary-navy/80">

          {/* Background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-primary-blue/30 blur-3xl opacity-50 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center gap-6">

            {/* 1. Headline */}
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight max-w-2xl">
              {title}
            </h2>

            {/* 2. Mascote 5 */}
            <div className="w-44 h-44 sm:w-56 sm:h-56 flex-shrink-0">
              <img
                src="/mascotebcredfacil5.png"
                alt="Mascote BCred Fácil segurando escudo de proteção"
                className="w-full h-full object-contain drop-shadow-2xl"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* 3. Topics grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl text-left">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-start bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <div className="w-5 h-5 rounded-full bg-primary-orange/20 text-primary-orange flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-200 font-medium font-sans">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* 4. CTA Button */}
            <a
              href={`https://wa.me/${companyConfig.whatsapp}?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20consultor%20da%20BCred%20F%C3%A1cil.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-xl text-white bg-primary-orange hover:bg-secondary-orange transition-all duration-200 shadow-lg mt-2"
            >
              Falar com consultor
            </a>

          </div>
        </div>
      </div>
    </section>
  );
};
