import React from 'react';

interface BenefitItem {
  title: string;
  description: string;
}

interface LandingBenefitsProps {
  title: string;
  benefits: BenefitItem[];
  mascotReference?: string;
}

export const LandingBenefits: React.FC<LandingBenefitsProps> = ({
  title,
  benefits,
  mascotReference
}) => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-navy text-center mb-10">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((item, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-base font-display font-bold text-primary-navy mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 font-sans leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {mascotReference && (
          <div className="mt-10 text-center bg-primary-orange/5 border border-primary-orange/20 py-4 px-6 rounded-xl inline-block mx-auto max-w-xl">
            <p className="text-sm text-primary-orange font-semibold font-sans">
              {mascotReference}
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
