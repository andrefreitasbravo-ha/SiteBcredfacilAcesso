import React from 'react';
import { companyConfig } from '@/config/company';

export const LandingSocialProof: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-navy mb-8">
          Você sabe com quem está falando
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <svg className="w-8 h-8 text-primary-blue mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            <h3 className="font-display font-bold text-sm text-primary-navy">Correspondente Físico</h3>
            <p className="text-xs text-gray-500 mt-1 font-sans">{companyConfig.city} - {companyConfig.state}</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <svg className="w-8 h-8 text-primary-orange mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <h3 className="font-display font-bold text-sm text-primary-navy">Empresa Registrada</h3>
            <p className="text-xs text-gray-500 mt-1 font-sans">CNPJ: {companyConfig.cnpj}</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <svg className="w-8 h-8 text-primary-blue mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            <h3 className="font-display font-bold text-sm text-primary-navy">Canais Oficiais</h3>
            <p className="text-xs text-gray-500 mt-1 font-sans">Atendimento humano via WhatsApp</p>
          </div>
        </div>
      </div>
    </section>
  );
};
