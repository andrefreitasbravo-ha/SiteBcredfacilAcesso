import React from 'react';
import { companyConfig } from '@/config/company';

interface ProductFinalCtaProps {
  title: string;
  subtitle?: string;
  ctaText: string;
  whatsappMessage?: string;
  microcopy?: string;
}

export const ProductFinalCta: React.FC<ProductFinalCtaProps> = ({
  title,
  subtitle,
  ctaText,
  whatsappMessage = 'Olá!%20Gostaria%20de%20uma%20orientação%20sobre%20crédito.',
  microcopy = 'A contratação depende da análise e das condições da instituição financeira responsável.',
}) => {
  return (
    <section className="py-14 md:py-20 bg-primary-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-navy to-primary-blue opacity-90" aria-hidden="true" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-base text-gray-300 max-w-xl mx-auto font-sans leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className="pt-2">
          <a
            href={`https://wa.me/${companyConfig.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary-orange hover:bg-secondary-orange text-white font-display font-bold text-base rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {ctaText}
          </a>
        </div>
        <p className="text-[11px] text-gray-400 font-sans max-w-md mx-auto leading-relaxed">
          {microcopy}
        </p>
      </div>
    </section>
  );
};
