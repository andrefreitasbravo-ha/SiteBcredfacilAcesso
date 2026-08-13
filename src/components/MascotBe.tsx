import React from 'react';
import Image from 'next/image';

interface MascotProps {
  pose: 'reception' | 'guide' | 'shield' | 'pointer' | 'default';
  className?: string;
  priority?: boolean;
}

export const MascotBe: React.FC<MascotProps> = ({ pose, className = "w-48 h-48", priority = false }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} aria-label="Mascote Bê - Guia do Crédito da BCred Fácil">
      <Image
        src="/mascotebcredfacil.png"
        alt="Mascote Bê"
        width={256}
        height={256}
        className="w-full h-full object-contain drop-shadow-lg"
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        decoding="async"
        unoptimized={false}
      />
    </div>
  );
};

