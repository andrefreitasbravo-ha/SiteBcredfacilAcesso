import React from 'react';
import type { Metadata } from 'next';
import { companyConfig } from '@/config/company';
import { MascotBe } from '@/components/MascotBe';

export const metadata: Metadata = {
  title: 'Segurança no Crédito Consignado',
  description: 'Veja como proteger seus dados, confirmar canais oficiais e evitar golpes durante uma solicitação de crédito.',
  alternates: { canonical: '/seguranca' },
  openGraph: {
    title: `Segurança no Crédito Consignado | ${companyConfig.name}`,
    description: 'Veja como proteger seus dados, confirmar canais oficiais e evitar golpes durante uma solicitação de crédito.',
    locale: 'pt_BR',
    type: 'website',
  },
};


export default function Seguranca() {
  return (
    <div className="py-10 bg-gray-50 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-primary-orange">Início</a> &gt; <span className="text-primary-navy font-semibold">Segurança contra Golpes</span>
        </nav>

        {/* Section Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-primary-navy">
            Segurança e Prevenção a Golpes
          </h1>
          <p className="text-gray-600 mt-2 text-base">
            Proteja seus dados e evite fraudes no mercado financeiro.
          </p>
        </div>

        {/* Mascot Warning Banner */}
        <div className="bg-primary-navy rounded-2xl p-6 sm:p-8 text-white border border-gray-800 shadow-xl mb-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <MascotBe pose="shield" className="w-40 h-40" />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-display font-extrabold text-primary-orange">
              Sua segurança vem antes de qualquer contratação.
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Infelizmente, criminosos se passam por falsos correspondentes ou funcionários de bancos para aplicar golpes. A <strong>BCred Fácil</strong> preza pelo respeito absoluto e estabeleceu protocolos rígidos para a proteção dos seus dados pessoais.
            </p>
          </div>
        </div>

        {/* Rules & Warnings */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 mb-8">
          <h3 className="text-lg font-display font-extrabold text-primary-navy border-b pb-2">
            ⚠️ 6 Regras de Ouro da Segurança Financeira
          </h3>
          
          <div className="space-y-4 text-sm text-gray-700">
            
            <div className="flex items-start space-x-3">
              <span className="text-red-500 font-bold text-lg leading-none">✕</span>
              <div>
                <strong>Não informe senhas bancárias:</strong>
                <p className="text-gray-500 text-xs mt-0.5">Nenhum consultor ou correspondente oficial precisa da sua senha do banco para simular ou liberar empréstimos.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-red-500 font-bold text-lg leading-none">✕</span>
              <div>
                <strong>Não informe senha do Gov.br ou Meu INSS:</strong>
                <p className="text-gray-500 text-xs mt-0.5">Sua senha do portal Gov.br dá acesso a todos os seus dados do governo. Não a compartilhe com terceiros.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-red-500 font-bold text-lg leading-none">✕</span>
              <div>
                <strong>Não compartilhe códigos de SMS:</strong>
                <p className="text-gray-500 text-xs mt-0.5">Os códigos recebidos por SMS servem como assinaturas digitais ou chaves de segurança. Nunca os repasse por mensagem.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-red-500 font-bold text-lg leading-none">✕</span>
              <div>
                <strong>Não realize depósitos antecipados:</strong>
                <p className="text-gray-500 text-xs mt-0.5">Desconfie de solicitações de pagamento antecipado para liberação de crédito e confirme sempre a informação pelos canais oficiais da BCred Fácil.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-green-600 font-bold text-lg leading-none">✓</span>
              <div>
                <strong>Confirme sempre o canal oficial:</strong>
                {companyConfig.whatsappIsReady ? (
                  <p className="text-gray-500 text-xs mt-0.5">Certifique-se de que está conversando com o número de WhatsApp oficial: {companyConfig.whatsappFormatted}.</p>
                ) : (
                  <p className="text-gray-500 text-xs mt-0.5">Confirme o canal oficial pelo site oficial da BCred Fácil antes de qualquer interação.</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-green-600 font-bold text-lg leading-none">✓</span>
              <div>
                <strong>Leia com calma as propostas financeiras:</strong>
                <p className="text-gray-500 text-xs mt-0.5">Confira o Custo Efetivo Total (CET), o valor das parcelas e o prazo de contratação antes de assinar digitalmente.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Report / Channel Verification */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-lg font-display font-extrabold text-primary-navy">
            Canais de Atendimento Autorizados da BCred Fácil
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Se você receber contatos suspeitos em nome da nossa marca, encerre a conversa e entre em contato imediatamente por nossos canais de auditoria rápida:
          </p>
          <div className="p-4 bg-gray-50 rounded-lg border text-sm text-gray-700 space-y-2">
            {companyConfig.whatsappIsReady && (
              <p><strong>WhatsApp Seguro:</strong> {companyConfig.whatsappFormatted}</p>
            )}
            {companyConfig.phoneIsReady && (
              <p><strong>Telefone Geral:</strong> {companyConfig.phone}</p>
            )}
            <p><strong>E-mail de Suporte:</strong> {companyConfig.email}</p>
            {!companyConfig.whatsappIsReady && !companyConfig.phoneIsReady && (
              <p className="text-xs text-gray-500">Os canais de atendimento oficiais estarão disponíveis em breve nesta página.</p>
            )}
          </div>
          <div className="flex justify-center pt-2">
            <a 
              href={`https://wa.me/${companyConfig.whatsapp}?text=Olá!%20Recebi%20um%20contato%20em%20nome%20da%20BCred%20e%20gostaria%20de%20verificar%20se%20é%20seguro.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-primary-orange hover:bg-secondary-orange text-white font-semibold text-sm rounded-lg transition-colors shadow-sm"
            >
              Falar com um consultor oficial
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
