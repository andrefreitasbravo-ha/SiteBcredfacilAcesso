'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FaqItem {
  question: string;
  answer: string;
}

interface LandingFaqProps {
  questions: FaqItem[];
  fullPageUrl?: string;
  fullPageTitle?: string;
}

export const LandingFaq: React.FC<LandingFaqProps> = ({
  questions,
  fullPageUrl,
  fullPageTitle = "Ver detalhes completos desta modalidade"
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-16 bg-gray-50 border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-navy text-center mb-8">
          Dúvidas Frequentes
        </h2>

        <div className="space-y-4 mb-8">
          {questions.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-shadow hover:shadow-md">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-5 py-4 text-left font-display font-bold text-sm sm:text-base text-primary-navy flex justify-between items-center focus:outline-none"
                aria-expanded={openIndex === index}
              >
                <span className="pr-4">{faq.question}</span>
                <span className={`text-primary-orange flex-shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </span>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 text-sm text-gray-600 font-sans border-t border-gray-100 pt-3 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {fullPageUrl && (
          <div className="text-center">
            <Link 
              href={fullPageUrl}
              className="text-sm font-semibold text-primary-blue hover:text-primary-navy hover:underline transition-colors"
            >
              {fullPageTitle} →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
