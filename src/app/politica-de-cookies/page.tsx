import React from 'react';
import { companyConfig } from '@/config/company';

export default function PoliticaCookies() {
  return (
    <div className="py-10 bg-gray-50 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-primary-orange">Início</a> &gt; <span className="text-primary-navy font-semibold">Política de Cookies</span>
        </nav>

        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6 text-gray-700 text-sm leading-relaxed">
          <h1 className="text-3xl font-display font-extrabold text-primary-navy mb-4 border-b pb-2">
            Política de Cookies
          </h1>
          <p className="text-xs text-gray-400">Última atualização: Agosto de 2026</p>

          <p>
            Esta Política de Cookies explica como a <strong>BCred Fácil</strong> utiliza cookies e tecnologias similares em seu site para aprimorar sua experiência de navegação.
          </p>

          <h2 className="text-lg font-display font-bold text-primary-navy">1. O que são cookies?</h2>
          <p>
            Cookies são pequenos arquivos de texto que são armazenados no seu navegador ou dispositivo quando você visita um site. Eles ajudam o site a reconhecer seu dispositivo nas visitas seguintes, melhorando a funcionalidade e o desempenho.
          </p>

          <h2 className="text-lg font-display font-bold text-primary-navy">2. Quais tipos de cookies utilizamos?</h2>
          
          <div className="space-y-4">
            <div>
              <strong className="block text-primary-navy">Cookies Estritamente Necessários:</strong>
              <p className="text-xs text-gray-500">Garantem o funcionamento básico das páginas, navegação fluida e conformidade com as regras de segurança (por exemplo, guardar a preferência de privacidade).</p>
            </div>
            <div>
              <strong className="block text-primary-navy">Cookies Analíticos (Google Analytics):</strong>
              <p className="text-xs text-gray-500">Coletam informações anônimas de tráfego (como páginas visitadas e tempo de navegação) para nos ajudar a melhorar o desempenho técnico do site.</p>
            </div>
            <div>
              <strong className="block text-primary-navy">Cookies de Marketing (Meta Pixel / Google Ads):</strong>
              <p className="text-xs text-gray-500">Utilizados para medir o rendimento das campanhas de tráfego pago nas redes e direcionar publicidade relevante de acordo com o interesse do usuário.</p>
            </div>
          </div>

          <h2 className="text-lg font-display font-bold text-primary-navy">3. Como gerenciar seus cookies?</h2>
          <p>
            Você pode alterar suas configurações de consentimento a qualquer momento através do banner de cookies que é exibido no canto inferior das páginas, ou simplesmente limpando o cache e cookies salvos do seu navegador.
          </p>
        </div>

      </div>
    </div>
  );
}
