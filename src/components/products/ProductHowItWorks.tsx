import React from 'react';

interface Step {
  title: string;
  description: string;
}

interface ProductHowItWorksProps {
  title: string;
  subtitle?: string;
  steps: Step[];
  disclaimer?: string;
  dark?: boolean;
}

export const ProductHowItWorks: React.FC<ProductHowItWorksProps> = ({
  title,
  subtitle,
  steps,
  disclaimer,
  dark = false,
}) => {
  const bg = dark ? 'bg-primary-navy text-white' : 'bg-gray-50 border-b border-gray-100';
  const headingColor = dark ? 'text-white' : 'text-primary-navy';
  const subtitleColor = dark ? 'text-gray-300' : 'text-gray-600';
  const cardBg = dark ? 'bg-white/5 border-white/10 hover:border-primary-orange/30' : 'bg-white border-gray-200 hover:border-gray-300';
  const stepTitleColor = dark ? 'text-white' : 'text-primary-navy';
  const stepDescColor = dark ? 'text-gray-300' : 'text-gray-600';
  const disclaimerColor = dark ? 'text-gray-400' : 'text-gray-500';

  return (
    <section className={`py-10 md:py-14 ${bg}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className={`text-2xl sm:text-3xl font-display font-extrabold tracking-tight ${headingColor}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`mt-2 text-base max-w-xl mx-auto font-sans ${subtitleColor}`}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Desktop: horizontal scroll | Mobile: vertical stack */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`rounded-2xl p-5 border transition-all duration-200 ${cardBg}`}
            >
              <span className="w-8 h-8 rounded-full bg-primary-orange text-white flex items-center justify-center font-bold text-sm mb-4">
                {index + 1}
              </span>
              <h3 className={`font-display font-bold text-sm mb-2 ${stepTitleColor}`}>
                {step.title}
              </h3>
              <p className={`text-xs leading-relaxed font-sans ${stepDescColor}`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`rounded-xl p-5 border flex items-start space-x-4 ${cardBg}`}
            >
              <span className="w-7 h-7 flex-shrink-0 rounded-full bg-primary-orange text-white flex items-center justify-center font-bold text-xs">
                {index + 1}
              </span>
              <div>
                <h3 className={`font-display font-bold text-sm mb-1 ${stepTitleColor}`}>
                  {step.title}
                </h3>
                <p className={`text-xs leading-relaxed font-sans ${stepDescColor}`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {disclaimer && (
          <p className={`text-[11px] font-sans mt-6 text-center max-w-xl mx-auto leading-relaxed ${disclaimerColor}`}>
            {disclaimer}
          </p>
        )}
      </div>
    </section>
  );
};
