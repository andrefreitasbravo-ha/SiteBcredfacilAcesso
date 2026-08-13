import React from 'react';
import Link from 'next/link';
import { MascotBe } from '@/components/MascotBe';
import { companyConfig } from '@/config/company';

interface ProductHeroProps {
  badge: string;
  title: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  microcopy?: string;
  mascotPose?: 'reception' | 'guide' | 'shield' | 'pointer';
  whatsappMessage?: string;
  trustSignals?: string[];
}

export const ProductHero: React.FC<ProductHeroProps> = ({
  badge,
  title,
  description,
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText,
  secondaryCtaHref,
  microcopy,
  mascotPose = 'reception',
  whatsappMessage = 'Olá!%20Gostaria%20de%20uma%20orientação%20sobre%20crédito.',
  trustSignals = [],
}) => {
  const primaryHref = primaryCtaHref || `https://wa.me/${companyConfig.whatsapp}?text=${whatsappMessage}`;
  const isPrimaryExternal = primaryHref.startsWith('http');

  return (
    <div className="bg-primary-navy rounded-3xl text-white p-8 sm:p-12 mb-10 shadow-xl relative overflow-hidden">
      {/* Background decorative gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-blue/20 rounded-full filter blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-orange/10 rounded-full filter blur-3xl pointer-events-none transform -translate-x-1/2 translate-y-1/2" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-5">
          <span className="inline-block px-3 py-1 rounded bg-white/10 text-primary-orange text-xs font-medium uppercase tracking-wider whitespace-nowrap">
            {badge}
          </span>

          <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight leading-tight">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-xl font-sans leading-relaxed">
            {description}
          </p>

          {/* Trust signals */}
          {trustSignals.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-1">
              {trustSignals.map((signal, i) => (
                <span key={i} className="flex items-center gap-1.5 text-xs text-gray-300 font-sans">
                  <svg className="w-3.5 h-3.5 text-primary-orange flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {signal}
                </span>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            {isPrimaryExternal ? (
              <a
                href={primaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-bold rounded-xl text-white bg-primary-orange hover:bg-secondary-orange transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {primaryCtaText}
              </a>
            ) : (
              <Link
                href={primaryHref}
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-bold rounded-xl text-white bg-primary-orange hover:bg-secondary-orange transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {primaryCtaText}
              </Link>
            )}

            {secondaryCtaText && secondaryCtaHref && (
              <a
                href={secondaryCtaHref}
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold rounded-xl text-white border border-white/30 hover:bg-white/10 transition-all duration-200"
              >
                {secondaryCtaText}
              </a>
            )}
          </div>

          {microcopy && (
            <p className="text-[11px] text-gray-400 font-sans max-w-md leading-relaxed">
              {microcopy}
            </p>
          )}
        </div>

        {/* Right Column — Mascot */}
        <div className="lg:col-span-5 flex justify-center">
          <MascotBe pose={mascotPose} className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 filter drop-shadow-2xl" />
        </div>
      </div>
    </div>
  );
};
