import React from 'react';

interface EligibilityItem {
  label: string;
}

interface ProductEligibilityProps {
  title: string;
  intro: string;
  items: EligibilityItem[];
  warning: string;
}

export const ProductEligibility: React.FC<ProductEligibilityProps> = ({
  title,
  intro,
  items,
  warning,
}) => {
  return (
    <section className="py-10 md:py-14 bg-gray-50 border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-navy tracking-tight mb-4">
          {title}
        </h2>
        <p className="text-base text-gray-600 leading-relaxed font-sans mb-6 max-w-2xl">
          {intro}
        </p>

        <ul className="space-y-3 mb-6">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-3 font-sans text-sm text-primary-navy font-medium">
              <svg
                className="w-5 h-5 text-primary-orange flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {item.label}
            </li>
          ))}
        </ul>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl text-sm text-amber-800 font-sans leading-relaxed max-w-2xl">
          <strong>Atenção:</strong> {warning}
        </div>
      </div>
    </section>
  );
};
