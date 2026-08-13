import React from 'react';
import { companyConfig } from '@/config/company';

interface Step {
  title: string;
  description: string;
}

interface LandingHowItWorksProps {
  title: string;
  steps: Step[];
  warning?: string;
  ctaText?: string;
  whatsappMessage?: string;
}

export const LandingHowItWorks: React.FC<LandingHowItWorksProps> = ({
  title,
  steps,
  warning,
  ctaText = "Começar pelo WhatsApp",
  whatsappMessage = "Olá! Gostaria de mais informações."
}) => {
  return (
    <section className="py-12 md:py-16 bg-gray-50 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-navy text-center mb-10">
          {title}
        </h2>

        <div className="space-y-6 max-w-3xl mx-auto relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-50 bg-primary-navy text-white font-bold font-display text-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow z-10">
                {idx + 1}
              </div>
              
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="font-display font-bold text-primary-navy text-base mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 font-sans leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {warning && (
          <div className="mt-10 text-center max-w-xl mx-auto">
            <p className="text-xs text-gray-500 font-sans bg-white border border-gray-200 px-4 py-3 rounded-lg shadow-sm">
              {warning}
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href={`https://wa.me/${companyConfig.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-blue hover:bg-primary-navy text-white text-sm font-bold font-display rounded-lg transition-colors shadow-sm"
          >
            {ctaText}
          </a>
        </div>

      </div>
    </section>
  );
};
