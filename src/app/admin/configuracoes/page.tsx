'use client';

import React, { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/services/supabase-browser';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [settings, setSettings] = useState<any>({
    name: '',
    razao_social: '',
    cnpj: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    phone: '',
    whatsapp: '',
    email: '',
    working_hours: '',
    instagram: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabaseBrowser
        .from('site_settings')
        .select('*')
        .single();

      if (error) throw error;
      if (data) setSettings(data);
    } catch (error: any) {
      console.error('Error fetching settings:', error);
      setMessage({ type: 'error', text: 'Erro ao carregar configurações.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const { error } = await supabaseBrowser
        .from('site_settings')
        .update({
          name: settings.name,
          razao_social: settings.razao_social,
          cnpj: settings.cnpj,
          address: settings.address,
          city: settings.city,
          state: settings.state,
          zip_code: settings.zip_code,
          phone: settings.phone,
          whatsapp: settings.whatsapp,
          email: settings.email,
          working_hours: settings.working_hours,
          instagram: settings.instagram,
          updated_at: new Date().toISOString(),
        })
        .eq('id', settings.id);

      if (error) throw error;
      setMessage({ type: 'success', text: 'Configurações salvas com sucesso!' });
    } catch (error: any) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: 'Erro ao salvar configurações.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-150 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Configurações Gerais</h2>
      
      {message.text && (
        <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Fantasia da Empresa</label>
            <input type="text" name="name" value={settings.name || ''} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-orange focus:border-primary-orange" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Razão Social</label>
            <input type="text" name="razao_social" value={settings.razao_social || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-orange focus:border-primary-orange" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
            <input type="text" name="cnpj" value={settings.cnpj || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-orange focus:border-primary-orange" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail de Contato</label>
            <input type="email" name="email" value={settings.email || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-orange focus:border-primary-orange" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone Fixo (Para o Rodapé)</label>
            <input type="text" name="phone" value={settings.phone || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-orange focus:border-primary-orange" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número do WhatsApp (Apenas Números)</label>
            <input type="text" name="whatsapp" value={settings.whatsapp || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-orange focus:border-primary-orange" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Endereço Completo</label>
            <input type="text" name="address" value={settings.address || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-orange focus:border-primary-orange" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Horário de Atendimento</label>
            <input type="text" name="working_hours" value={settings.working_hours || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-orange focus:border-primary-orange" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link do Instagram</label>
            <input type="text" name="instagram" value={settings.instagram || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-orange focus:border-primary-orange" />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-150 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-primary-orange text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-orange disabled:opacity-50"
          >
            {saving ? 'Salvando...' : 'Salvar Configurações'}
          </button>
        </div>
      </form>
    </div>
  );
}
