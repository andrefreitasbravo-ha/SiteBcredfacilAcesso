import React from 'react';
import Link from 'next/link';
import { MascotBe } from '@/components/MascotBe';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-16">
      <div className="max-w-md w-full text-center space-y-8">
        
        <div className="flex justify-center mb-4">
          <MascotBe pose="default" className="w-40 h-40" />
        </div>
        
        <h1 className="text-4xl font-display font-extrabold text-primary-navy">
          Essa página não foi encontrada.
        </h1>
        
        <p className="text-gray-600 font-sans">
          Talvez o caminho tenha mudado ou digitado incorretamente. Não se preocupe, o Bê ajuda você a voltar para o lugar certo.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-primary-blue hover:bg-primary-navy text-white font-bold font-display rounded-xl transition-colors shadow-sm"
          >
            Voltar para o início
          </Link>
          <Link 
            href="/contato"
            className="w-full sm:w-auto px-8 py-3.5 bg-gray-200 hover:bg-gray-300 text-primary-navy font-bold font-display rounded-xl transition-colors shadow-sm"
          >
            Falar com a BCred
          </Link>
        </div>
      </div>
    </div>
  );
}
