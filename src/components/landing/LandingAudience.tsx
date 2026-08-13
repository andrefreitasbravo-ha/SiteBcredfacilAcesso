import React from 'react';

interface LandingAudienceProps {
  title: string;
  items: string[];
  warning: string;
}

export const LandingAudience: React.FC<LandingAudienceProps> = ({
  title,
  items,
  warning
}) => {
  return (
    <section className="py-10 md:py-14 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-display font-extrabold text-primary-navy tracking-tight mb-6">
          {title}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
              <svg className="w-5 h-5 text-primary-blue flex-shrink-0 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-gray-700 font-sans">{item}</span>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl text-xs text-amber-800 font-sans leading-relaxed shadow-sm">
          <strong>Aviso:</strong> {warning}
        </div>
      </div>
    </section>
  );
};
