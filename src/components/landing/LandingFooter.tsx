import React from 'react';
import Link from 'next/link';
import { companyConfig } from '@/config/company';

export const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-primary-navy py-10 border-t border-white/10 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Company Info */}
        <div className="space-y-1">
          <p className="font-display font-extrabold text-lg">
            BCred<span className="text-primary-orange">Fácil</span>
          </p>
          <p className="text-xs text-gray-400 font-sans">
            {companyConfig.razaoSocial} | CNPJ: {companyConfig.cnpj}
          </p>
          <p className="text-xs text-gray-400 font-sans">
            Atendimento em {companyConfig.city} - {companyConfig.state}
          </p>
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-left">
          <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
            <strong>Aviso Legal e Regulatório:</strong> A {companyConfig.name} atua no atendimento, orientação e encaminhamento de propostas como {companyConfig.model}. A análise, aprovação, definição de taxas e contratação são realizadas exclusivamente pela instituição financeira parceira responsável, nos termos da Resolução CMN nº 4.935.
          </p>
          <p className="text-[11px] text-gray-400 leading-relaxed font-sans mt-2">
            Nenhuma operação garante aprovação prévia, redução exata de parcelas ou recebimento imediato de valores. A disponibilidade das modalidades simuladas varia de acordo com as regras vigentes e a análise de cada perfil.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-2">
          <Link href="/politica-de-privacidade" target="_blank" className="text-xs font-semibold text-gray-300 hover:text-white hover:underline transition-colors">
            Política de Privacidade
          </Link>
          <Link href="/politica-de-cookies" target="_blank" className="text-xs font-semibold text-gray-300 hover:text-white hover:underline transition-colors">
            Política de Cookies
          </Link>
          <Link href="/termos-de-uso" target="_blank" className="text-xs font-semibold text-gray-300 hover:text-white hover:underline transition-colors">
            Termos de Uso
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-[11px] text-gray-500 font-sans pt-4 border-t border-white/10">
          © {new Date().getFullYear()} {companyConfig.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};
