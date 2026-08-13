import React from 'react';

interface LandingTrustBarProps {
  items: string[];
}

export const LandingTrustBar: React.FC<LandingTrustBarProps> = ({ items }) => {
  return (
    <div className="bg-primary-navy/5 border-y border-primary-navy/10 py-4 overflow-x-auto no-scrollbar">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-nowrap md:flex-wrap items-center justify-start md:justify-center gap-6 sm:gap-8 whitespace-nowrap">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center text-sm font-medium text-primary-navy font-sans">
              <svg className="w-4 h-4 text-primary-orange mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
