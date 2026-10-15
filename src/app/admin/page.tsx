'use client';

import React from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-150 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Bem-vindo ao Painel Administrativo
        </h2>
        <p className="text-gray-600">
          Aqui você pode gerenciar as configurações, textos e imagens do seu site. Escolha uma das opções abaixo ou no menu lateral para começar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/admin/leads" className="bg-white p-6 rounded-xl shadow-sm border-2 border-primary-orange/40 hover:border-primary-orange transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-primary-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-bl">
            NOVO
          </div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-orange mb-2 flex items-center gap-1.5">
            <span>Leads & Simulações</span>
            <span>🚀</span>
          </h3>
          <p className="text-sm text-gray-600">
            Acesse todos os contatos que preencheram o formulário no site e inicie atendimento no WhatsApp.
          </p>
        </Link>

        <Link href="/admin/configuracoes" className="bg-white p-6 rounded-xl shadow-sm border border-gray-150 hover:border-primary-orange transition-colors group">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-orange mb-2">Configurações Gerais</h3>
          <p className="text-sm text-gray-600">
            Edite Razão Social, CNPJ, telefones, endereço e horários de atendimento.
          </p>
        </Link>
        
        <Link href="/admin/textos" className="bg-white p-6 rounded-xl shadow-sm border border-gray-150 hover:border-primary-orange transition-colors group">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-orange mb-2">Textos do Site</h3>
          <p className="text-sm text-gray-600">
            Altere os títulos, descrições e textos explicativos da página inicial.
          </p>
        </Link>

        <Link href="/admin/aparencia" className="bg-white p-6 rounded-xl shadow-sm border border-gray-150 hover:border-primary-orange transition-colors group">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-orange mb-2">Aparência e Logo</h3>
          <p className="text-sm text-gray-600">
            Faça upload de uma nova Logo e ajuste cores principais.
          </p>
        </Link>
      </div>
    </div>
  );
}
