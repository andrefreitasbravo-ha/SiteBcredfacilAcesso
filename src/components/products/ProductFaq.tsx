'use client';

import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface ProductFaqProps {
  title: string;
  subtitle?: string;
  questions: FaqItem[];
  pageUrl?: string;
}

export const ProductFaq: React.FC<ProductFaqProps> = ({
  title,
  subtitle,
  questions,
  pageUrl = 'https://www.bcredfacil.com.br',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <section className="py-10 md:py-14 bg-white border-b border-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-navy tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 mt-2 text-base max-w-xl mx-auto font-sans">
              {subtitle}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {questions.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-gray-300"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-5 text-left text-sm font-semibold text-primary-navy bg-gray-50/50 hover:bg-gray-50 font-display transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange"
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <svg
                  className={`h-5 w-5 text-primary-orange flex-shrink-0 ml-3 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="p-5 border-t border-gray-200 bg-white text-sm text-gray-600 leading-relaxed font-sans">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
