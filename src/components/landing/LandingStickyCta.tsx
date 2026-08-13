'use client';

import React, { useEffect, useState } from 'react';

interface LandingStickyCtaProps {
  text?: string;
  onClick?: () => void;
  href?: string;
}

export const LandingStickyCta: React.FC<LandingStickyCtaProps> = ({
  text = "Falar no WhatsApp",
  onClick,
  href = "#simulador"
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the first 400px (roughly past hero fold)
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-gray-200 p-3 sm:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transform transition-transform duration-300 pb-[env(safe-area-inset-bottom,12px)]">
      {onClick ? (
        <button
          onClick={onClick}
          className="w-full bg-primary-orange hover:bg-secondary-orange text-white font-display font-bold py-3.5 px-4 rounded-xl shadow-sm text-sm"
          aria-label={text}
        >
          {text}
        </button>
      ) : (
        <a
          href={href}
          className="block w-full text-center bg-primary-orange hover:bg-secondary-orange text-white font-display font-bold py-3.5 px-4 rounded-xl shadow-sm text-sm"
          aria-label={text}
        >
          {text}
        </a>
      )}
    </div>
  );
};
