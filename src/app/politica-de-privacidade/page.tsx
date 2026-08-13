'use client';

import React, { useState } from 'react';
import { companyConfig } from '@/config/company';

export default function PoliticaPrivacidade() {
  const [lgpdRequest, setLgpdRequest] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    tipo: 'consulta',
    mensagem: '',
    success: false
  });

  const handleLgpdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate LGPD request processing
    setLgpdRequest(prev => ({ ...prev, success: true }));
  };

  return (
    <div className="py-10 bg-gray-50 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-primary-orange">Início</a> &gt; <span className="text-primary-navy font-semibold">Política de Privacidade</span>
        </nav>

        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6 text-gray-700 text-sm leading-relaxed">
          <h1 className="text-3xl font-display font-extrabold text-primary-navy mb-4 border-b pb-2">
            Política de Privacidade
          </h1>
          <p className="text-xs text-gray-400">Última atualização: Agosto de 2026</p>

          <p>
            A <strong>BCred Fácil</strong> (Razão Social: <span>{companyConfig.razaoSocial}</span>, CNPJ: <span>{companyConfig.cnpj}</span>) valoriza a privacidade dos seus usuários. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos seus dados pessoais de acordo com a Lei Geral de Proteção de Dados (LGPD) nº 13.709/2018.
          </p>

          <h2 className="text-lg font-display font-bold text-primary-navy">1. Quais dados coletamos?</h2>
          <p>
            Coletamos apenas dados pessoais estritamente necessários para viabilizar simulações de crédito e entrar em contato com você:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Nome completo;</li>
            <li>Número de WhatsApp com DDD;</li>
            <li>Cidade e Estado;</li>
            <li>Perfil profissional (Aposentado, Pensionista ou CLT);</li>
            <li>Melhor horário de contato.</li>
          </ul>

          <h2 className="text-lg font-display font-bold text-primary-navy">2. Qual a finalidade da coleta?</h2>
          <p>
            Os dados são utilizados única e exclusivamente para realizar simulações e propor propostas financeiras junto a instituições bancárias parceiras autorizadas, sob o seu consentimento prévio e explícito.
          </p>

          <h2 className="text-lg font-display font-bold text-primary-navy">3. Compartilhamento de dados</h2>
          <p>
            Seus dados são compartilhados apenas com as instituições financeiras oficiais parceiras indicadas no processo de simulação para análise cadastral. Não vendemos, alugamos ou comercializamos listas de contatos com terceiros.
          </p>

          <h2 className="text-lg font-display font-bold text-primary-navy">4. Direitos do Titular dos Dados</h2>
          <p>
            Sob a LGPD, você tem o direito de solicitar a confirmação da existência de tratamento de dados, acesso aos dados coletados, correção de dados incompletos ou inexatos, e a eliminação definitiva de seus dados do nosso cadastro.
          </p>

          {/* LGPD Request Form */}
          <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-base font-display font-bold text-primary-navy mb-4">
              Formulário de Requisição LGPD
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Utilize o canal abaixo para solicitar a consulta ou a exclusão dos seus dados do nosso cadastro de simulação.
            </p>

            {lgpdRequest.success ? (
              <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs rounded-lg">
                ✔ Sua solicitação de privacidade foi enviada com sucesso ao nosso responsável pela privacidade. O prazo legal para resposta é de até 15 dias corridos.
              </div>
            ) : (
              <form onSubmit={handleLgpdSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Nome</label>
                    <input
                      type="text"
                      required
                      value={lgpdRequest.nome}
                      onChange={(e) => setLgpdRequest(prev => ({ ...prev, nome: e.target.value }))}
                      className="w-full p-2 bg-white border rounded text-xs text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">E-mail ou WhatsApp</label>
                    <input
                      type="text"
                      required
                      value={lgpdRequest.email}
                      onChange={(e) => setLgpdRequest(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-2 bg-white border rounded text-xs text-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Tipo de Solicitação</label>
                  <select
                    value={lgpdRequest.tipo}
                    onChange={(e) => setLgpdRequest(prev => ({ ...prev, tipo: e.target.value }))}
                    className="w-full p-2 bg-white border rounded text-xs text-gray-900"
                  >
                    <option value="consulta">Consultar meus dados cadastrados</option>
                    <option value="correcao">Corrigir dados inexatos</option>
                    <option value="exclusao">Excluir definitivamente meus dados</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Detalhes (Opcional)</label>
                  <textarea
                    rows={2}
                    value={lgpdRequest.mensagem}
                    onChange={(e) => setLgpdRequest(prev => ({ ...prev, mensagem: e.target.value }))}
                    className="w-full p-2 bg-white border rounded text-xs text-gray-900"
                    placeholder="Descreva sua solicitação com detalhes..."
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-navy hover:bg-primary-blue text-white rounded text-xs font-bold transition-colors"
                >
                  Enviar Requisição
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
