import React from 'react';

export const LandingInstitutions: React.FC = () => {
  return (
    <section className="py-10 bg-gray-50 border-t border-gray-100 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-sm font-display font-bold text-gray-500 uppercase tracking-widest mb-6">
          Instituições com as quais trabalhamos
        </h3>
        
        {/* Simple flex row that wraps on mobile */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
          <div className="font-display font-black text-gray-800 text-xl tracking-tighter">Bco BMG</div>
          <div className="font-display font-black text-gray-800 text-xl tracking-tighter">Itaú</div>
          <div className="font-display font-black text-gray-800 text-xl tracking-tighter">Daycoval</div>
          <div className="font-display font-black text-gray-800 text-xl tracking-tighter">Facta</div>
          <div className="font-display font-black text-gray-800 text-xl tracking-tighter">Pan</div>
          <div className="font-display font-black text-gray-800 text-xl tracking-tighter">Olé</div>
        </div>

        <p className="text-[10px] text-gray-400 font-sans mt-6 max-w-lg mx-auto">
          A disponibilidade varia conforme perfil, modalidade, convênio e análise da instituição responsável.
        </p>
      </div>
    </section>
  );
};
