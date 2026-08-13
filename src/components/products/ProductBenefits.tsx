import React from 'react';

interface BenefitItem {
  icon?: React.ReactNode;
  title: string;
  description: string;
  color?: 'blue' | 'orange' | 'navy' | 'green';
}

interface ProductBenefitsProps {
  title: string;
  subtitle?: string;
  benefits: BenefitItem[];
}

const colorMap = {
  blue: { bg: 'bg-primary-blue/10', text: 'text-primary-blue' },
  orange: { bg: 'bg-primary-orange/10', text: 'text-primary-orange' },
  navy: { bg: 'bg-primary-navy/10', text: 'text-primary-navy' },
  green: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
};

const defaultIcons = [
  <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  <svg key="4" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
];

const colorOrder: Array<'blue' | 'orange' | 'navy' | 'green'> = ['blue', 'orange', 'navy', 'green'];

export const ProductBenefits: React.FC<ProductBenefitsProps> = ({
  title,
  subtitle,
  benefits,
}) => {
  return (
    <section className="py-10 md:py-14 bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => {
            const color = benefit.color || colorOrder[index % colorOrder.length];
            const colors = colorMap[color];
            const icon = benefit.icon || defaultIcons[index % defaultIcons.length];

            return (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                <div className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center mb-4`}>
                  {icon}
                </div>
                <h3 className="font-display font-bold text-base text-primary-navy mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-sans">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
