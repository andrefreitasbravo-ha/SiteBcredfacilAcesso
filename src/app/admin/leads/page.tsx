'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { getLeadsAction, updateLeadStatusAction, deleteLeadAction, LeadRecord } from '@/services/leads/actions';

const PRODUCT_LABELS: Record<string, { label: string; color: string }> = {
  'credito-consignado-inss': { label: 'Consignado INSS', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  'credito-do-trabalhador': { label: 'Crédito CLT', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  'portabilidade': { label: 'Portabilidade', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  'antecipacao-fgts': { label: 'Saque FGTS', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  'atendimento-geral': { label: 'Atendimento Geral', color: 'bg-gray-100 text-gray-800 border-gray-200' },
};

const STATUS_OPTIONS = [
  { value: 'new', label: 'Novo', color: 'bg-amber-500 text-white' },
  { value: 'contacted', label: 'Em Contato', color: 'bg-blue-500 text-white' },
  { value: 'in_progress', label: 'Em Análise', color: 'bg-indigo-500 text-white' },
  { value: 'converted', label: 'Convertido', color: 'bg-green-600 text-white' },
  { value: 'lost', label: 'Descartado', color: 'bg-gray-400 text-white' },
];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    const res = await getLeadsAction();
    if (res.success && res.data) {
      setLeads(res.data);
    } else {
      setError(res.error || 'Não foi possível carregar os leads.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    const res = await updateLeadStatusAction(id, newStatus);
    if (res.success) {
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } else {
      alert(`Erro ao atualizar status: ${res.error}`);
    }
    setUpdatingId(null);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Deseja realmente excluir a simulação de "${name}"?`)) return;
    const res = await deleteLeadAction(id);
    if (res.success) {
      setLeads(prev => prev.filter(l => l.id !== id));
      if (selectedLead?.id === id) setSelectedLead(null);
    } else {
      alert(`Erro ao excluir: ${res.error}`);
    }
  };

  // Filtragem dos leads
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm) ||
        (lead.city && lead.city.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      const matchesProduct = productFilter === 'all' || lead.product === productFilter;

      return matchesSearch && matchesStatus && matchesProduct;
    });
  }, [leads, searchTerm, statusFilter, productFilter]);

  // Contadores
  const stats = useMemo(() => {
    const total = leads.length;
    const novos = leads.filter(l => l.status === 'new').length;
    const emContato = leads.filter(l => l.status === 'contacted' || l.status === 'in_progress').length;
    const convertidos = leads.filter(l => l.status === 'converted').length;
    return { total, novos, emContato, convertidos };
  }, [leads]);

  // Exportar para CSV
  const exportToCSV = () => {
    if (leads.length === 0) return;
    const headers = ['Data', 'Nome', 'WhatsApp', 'Cidade', 'Produto', 'Horário', 'Status', 'Origem', 'UTM Source', 'UTM Campaign'];
    const rows = leads.map(l => [
      new Date(l.created_at).toLocaleString('pt-BR'),
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${(l.city || '').replace(/"/g, '""')}"`,
      `"${PRODUCT_LABELS[l.product]?.label || l.product}"`,
      `"${l.profile_answer || ''}"`,
      `"${l.status}"`,
      `"${l.source_page || ''}"`,
      `"${l.utm_source || ''}"`,
      `"${l.utm_campaign || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads-bcredfacil-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const cleanPhoneForWhatsApp = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return digits.startsWith('55') ? digits : `55${digits}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-150">
        <div>
          <h1 className="text-2xl font-bold font-display text-gray-900">
            Simulações e Leads
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Contatos capturados em tempo real através dos formulários do site.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Atualizar
          </button>
          <button
            onClick={exportToCSV}
            disabled={leads.length === 0}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-navy hover:bg-opacity-90 rounded-lg transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-150 shadow-sm">
          <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">Total de Leads</p>
          <p className="text-3xl font-extrabold text-gray-900 mt-2">{stats.total}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-amber-200 bg-amber-50/30 shadow-sm">
          <p className="text-xs uppercase tracking-wider font-semibold text-amber-700">Novos (Aguardando)</p>
          <p className="text-3xl font-extrabold text-amber-600 mt-2">{stats.novos}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-blue-200 bg-blue-50/30 shadow-sm">
          <p className="text-xs uppercase tracking-wider font-semibold text-blue-700">Em Atendimento</p>
          <p className="text-3xl font-extrabold text-blue-600 mt-2">{stats.emContato}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-emerald-200 bg-emerald-50/30 shadow-sm">
          <p className="text-xs uppercase tracking-wider font-semibold text-emerald-700">Convertidos</p>
          <p className="text-3xl font-extrabold text-emerald-600 mt-2">{stats.convertidos}</p>
        </div>
      </div>

      {/* Alerta de Erro se a tabela não existir */}
      {error && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-amber-800">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="space-y-2 flex-1">
              <h3 className="font-semibold text-base">Atenção ao carregar leads:</h3>
              <p className="text-sm">{error}</p>
              {error.includes('leads') && (
                <div className="mt-2 text-xs bg-white p-3 rounded border border-amber-300 font-mono text-gray-800">
                  Dica: Verifique se você executou o SQL da tabela <strong>leads</strong> no SQL Editor do Supabase (arquivo `supabase/migrations/20240801_create_leads.sql`).
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Barra de Filtros */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-150 flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar por nome, WhatsApp ou cidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-orange"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-orange"
          >
            <option value="all">Todos os Status</option>
            {STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-orange"
          >
            <option value="all">Todos os Produtos</option>
            {Object.entries(PRODUCT_LABELS).map(([key, item]) => (
              <option key={key} value={key}>{item.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabela de Leads */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-150 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-orange border-r-transparent mb-3"></div>
            <p>Carregando simulações...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="font-medium text-gray-700">Nenhum lead encontrado.</p>
            <p className="text-xs text-gray-500 mt-1">
              {leads.length === 0 ? 'Assim que alguém preencher o formulário do site, o contato aparecerá aqui.' : 'Nenhum resultado corresponde aos filtros aplicados.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-600">
                  <th className="py-3 px-4">Data/Hora</th>
                  <th className="py-3 px-4">Cliente</th>
                  <th className="py-3 px-4">WhatsApp / Ação</th>
                  <th className="py-3 px-4">Produto</th>
                  <th className="py-3 px-4">Horário Pref.</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150">
                {filteredLeads.map((lead) => {
                  const productInfo = PRODUCT_LABELS[lead.product] || { label: lead.product, color: 'bg-gray-100 text-gray-800' };
                  const waNumber = cleanPhoneForWhatsApp(lead.phone);
                  const waMessage = encodeURIComponent(`Olá ${lead.name}! Recebemos seu pedido de simulação para ${productInfo.label} na BCred Fácil. Como podemos ajudar você hoje?`);
                  const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

                  return (
                    <tr key={lead.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4 text-xs text-gray-500 whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-gray-900">{lead.name}</div>
                        <div className="text-xs text-gray-500">{lead.city || 'Cidade não inf.'}</div>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-800">{lead.phone}</span>
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs px-2.5 py-1 rounded-md font-medium transition-colors shadow-sm"
                            title="Conversar no WhatsApp"
                          >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.085-1.808-.403-1.464-.607-2.434-2.091-2.507-2.189-.071-.097-.597-.796-.597-1.517 0-.722.378-1.077.513-1.223.135-.145.295-.181.393-.181.098 0 .197.001.283.006.09.004.21-.034.328.25.122.293.415 1.012.452 1.085.036.073.06.159.012.256-.048.098-.073.159-.145.244-.073.085-.153.19-.219.256-.073.073-.149.153-.064.298.085.146.377.621.809 1.005.556.495 1.025.648 1.17.722.146.073.232.061.319-.037.086-.098.368-.428.466-.575.098-.146.196-.122.33-.073.134.049.854.403 1.001.476.147.073.245.11.282.171.037.061.037.354-.107.759z" />
                            </svg>
                            WhatsApp
                          </a>
                        </div>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${productInfo.color}`}>
                          {productInfo.label}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-xs text-gray-600 whitespace-nowrap">
                        {lead.profile_answer || 'Qualquer horário'}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <select
                          value={lead.status || 'new'}
                          disabled={updatingId === lead.id}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`text-xs px-2.5 py-1 rounded-md font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-orange ${
                            lead.status === 'new' ? 'bg-amber-100 text-amber-800' :
                            lead.status === 'converted' ? 'bg-emerald-100 text-emerald-800' :
                            lead.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                            lead.status === 'in_progress' ? 'bg-indigo-100 text-indigo-800' :
                            'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {STATUS_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 text-gray-500 hover:text-primary-navy hover:bg-gray-100 rounded-md transition-colors"
                            title="Ver Detalhes"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(lead.id, lead.name)}
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                            title="Excluir Lead"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de Detalhes do Lead */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-gray-900">Detalhes da Simulação</h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg">
                <div>
                  <span className="text-xs text-gray-500 block">Nome do Cliente</span>
                  <span className="font-semibold text-gray-900">{selectedLead.name}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">WhatsApp</span>
                  <span className="font-semibold text-gray-900">{selectedLead.phone}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Cidade</span>
                  <span className="font-medium text-gray-800">{selectedLead.city || 'Não informada'}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Produto Escolhido</span>
                  <span className="font-medium text-gray-800">{PRODUCT_LABELS[selectedLead.product]?.label || selectedLead.product}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Horário para Contato</span>
                  <span className="font-medium text-gray-800">{selectedLead.profile_answer || 'Qualquer'}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Status Atual</span>
                  <span className="font-semibold text-primary-orange uppercase text-xs">{selectedLead.status}</span>
                </div>
              </div>

              {/* Informações Técnicas e Rastreio */}
              <div className="border-t pt-3">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Dados de Origem & LGPD</h4>
                <div className="space-y-1.5 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <p><strong>Página de Origem:</strong> {selectedLead.source_page || '/'}</p>
                  <p><strong>UTM Source:</strong> {selectedLead.utm_source || 'Acesso Direto / Orgânico'}</p>
                  <p><strong>UTM Campaign:</strong> {selectedLead.utm_campaign || '-'}</p>
                  <p><strong>UTM Medium:</strong> {selectedLead.utm_medium || '-'}</p>
                  {selectedLead.gclid && <p><strong>Google Ads (GCLID):</strong> {selectedLead.gclid}</p>}
                  {selectedLead.fbclid && <p><strong>Meta Ads (FBCLID):</strong> {selectedLead.fbclid}</p>}
                  <p><strong>Consentimento LGPD:</strong> {selectedLead.consent ? '✅ Autorizado' : '❌ Não'}</p>
                  <p><strong>Data/Hora do Envio:</strong> {new Date(selectedLead.created_at).toLocaleString('pt-BR')}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t flex justify-end gap-2">
              <a
                href={`https://wa.me/${cleanPhoneForWhatsApp(selectedLead.phone)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-medium text-white bg-[#25D366] hover:bg-[#20ba59] rounded-lg transition-colors flex items-center gap-1.5"
              >
                Iniciar WhatsApp
              </a>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
