'use client';

import React, { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/services/supabase-browser';

type PageContent = {
  id: string;
  page_id: string;
  page_name: string;
  section_id: string;
  section_name: string;
  field_key: string;
  field_name: string;
  field_type: string;
  content: string;
};

export default function TextosPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [contents, setContents] = useState<PageContent[]>([]);

  // States for Tabs and Accordions
  const [activeTab, setActiveTab] = useState<string>('');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const { data, error } = await supabaseBrowser
        .from('page_content')
        .select('*');

      if (error) throw error;
      if (data && data.length > 0) {
        
        // Ordem de prioridade visual (O que aparece primeiro no site)
        const fieldPriority = [
          'hero_tagline', 'hero_title', 'hero_desc', 'hero_btn1', 'hero_btn2', 'hero_aviso',
          'hero_card_tag', 'hero_card_title', 'hero_card_desc',
          'tagline', 'title', 'subtitle', 'desc', 'content', 'texto',
          'margem_tagline', 'margem_title', 'margem_desc', 'margem_box_title', 'margem_box_desc', 'margem_btn', 'margem_side_tagline', 'margem_side_desc',
          'seguranca_tagline', 'seguranca_title', 'seguranca_desc', 'seguranca_rule1', 'seguranca_rule2', 'seguranca_rule3', 'seguranca_rule4', 'seguranca_rule5', 'seguranca_rule6', 'seguranca_btn',
          'simulador_title', 'simulador_desc',
          'somos_left_badge', 'somos_left_note', 'somos_left_title', 'somos_left_desc', 'somos_left_footer', 'somos_right_title', 'somos_right_desc', 'somos_right_item1', 'somos_right_item2', 'somos_right_item3', 'somos_right_btn',
          'local_title', 'local_desc', 'local_btn',
          'ctafinal_title', 'ctafinal_desc', 'ctafinal_btn', 'ctafinal_note',
          'faq_title', 'faq_desc', 'faq_btn',
          'disclaimer',
          'comp_card1_title', 'comp_card1_tag', 'comp_card1_taxas', 'comp_card1_pagamento', 'comp_card1_margem', 'comp_card1_analise', 'comp_card1_btn',
          'comp_card2_title', 'comp_card2_taxas', 'comp_card2_pagamento', 'comp_card2_margem', 'comp_card2_analise',
          'card1_title', 'card1_desc', 'card2_title', 'card2_desc',
          'card3_title', 'card3_desc', 'card4_title', 'card4_desc',
          'item1', 'item2', 'item3', 'item4',
          'passo1_title', 'passo1_desc', 'passo2_title', 'passo2_desc',
          'passo3_title', 'passo3_desc', 'passo4_title', 'passo4_desc',
          'passo5_title', 'passo5_desc', 'passo6_title', 'passo6_desc',
          'aviso', 'button', 'button_text'
        ];

        data.sort((a, b) => {
          // 1. Ordena pela seção alfabeticamente (já que tem os números "1. Banner", "2. Vantagens")
          if (a.section_name !== b.section_name) {
            return a.section_name.localeCompare(b.section_name);
          }
          // 2. Ordena os campos dentro da seção baseada na prioridade visual
          const posA = fieldPriority.indexOf(a.field_key) !== -1 ? fieldPriority.indexOf(a.field_key) : 999;
          const posB = fieldPriority.indexOf(b.field_key) !== -1 ? fieldPriority.indexOf(b.field_key) : 999;
          
          if (posA !== posB) return posA - posB;
          
          // Fallback alfabético
          return a.field_name.localeCompare(b.field_name);
        });

        setContents(data);
        // Definir a primeira aba como ativa
        const pages = Array.from(new Set(data.map(d => d.page_name)));
        if (pages.length > 0) setActiveTab(pages[0]);
      }
    } catch (error: any) {
      console.error('Error fetching contents:', error);
      setMessage({ type: 'error', text: 'Erro ao carregar textos.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (id: string, value: string) => {
    setContents(contents.map(c => c.id === id ? { ...c, content: value } : c));
  };

  const handleSaveSection = async (sectionId: string, pageId: string) => {
    setSaving(`${pageId}-${sectionId}`);
    setMessage({ type: '', text: '' });

    // Pegar todos os campos que pertencem a esta seção
    const fieldsToSave = contents.filter(c => c.section_id === sectionId && c.page_id === pageId);

    try {
      // Supabase não tem bulk update amigável nativo no JS client para PKs variadas, 
      // então faremos loop. Para poucos itens é bem rápido.
      for (const field of fieldsToSave) {
        const { error } = await supabaseBrowser
          .from('page_content')
          .update({ content: field.content, updated_at: new Date().toISOString() })
          .eq('id', field.id);
        if (error) throw error;
      }

      setMessage({ type: 'success', text: `Seção salva com sucesso!` });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error: any) {
      console.error('Error saving content:', error);
      setMessage({ type: 'error', text: 'Erro ao salvar textos da seção.' });
    } finally {
      setSaving(null);
    }
  };

  const toggleSection = (sectionKey: string) => {
    setOpenSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  if (loading) {
    return <div>Carregando interface de textos...</div>;
  }

  const pages = Array.from(new Set(contents.map(c => c.page_name)));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-150 overflow-hidden font-sans">
      <div className="p-6 border-b border-gray-150">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Textos do Site</h2>
        <p className="text-gray-600 text-sm">Selecione uma página abaixo e abra a seção que deseja editar.</p>
      </div>

      {message.text && (
        <div className={`m-6 p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-200 px-6 pt-4 bg-gray-50 overflow-x-auto">
        {pages.map(page => (
          <button
            key={page}
            onClick={() => setActiveTab(page)}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === page
                ? 'border-primary-orange text-primary-orange bg-white rounded-t-lg'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="p-6">
        {contents.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Nenhum texto encontrado. Rode o script SQL.</p>
        ) : (
          <div className="space-y-4">
            {/* Agrupar por Seção dentro da Aba Ativa */}
            {Array.from(new Set(contents.filter(c => c.page_name === activeTab).map(c => c.section_name))).map(sectionName => {
              const sectionFields = contents.filter(c => c.page_name === activeTab && c.section_name === sectionName);
              const sectionId = sectionFields[0].section_id;
              const pageId = sectionFields[0].page_id;
              const sectionKey = `${pageId}-${sectionId}`;
              const isOpen = openSections[sectionKey];

              return (
                <div key={sectionKey} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection(sectionKey)}
                    className="w-full flex justify-between items-center px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-semibold text-gray-800">{sectionName}</span>
                    <span className="text-gray-400 text-xl font-bold">{isOpen ? '−' : '+'}</span>
                  </button>
                  
                  {isOpen && (
                    <div className="p-6 bg-white border-t border-gray-200 space-y-6">
                      {sectionFields.map(field => (
                        <div key={field.id}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.field_name}
                          </label>
                          {field.field_type === 'textarea' ? (
                            <textarea
                              value={field.content || ''}
                              onChange={(e) => handleChange(field.id, e.target.value)}
                              rows={4}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-orange focus:border-primary-orange font-sans"
                            />
                          ) : (
                            <input
                              type="text"
                              value={field.content || ''}
                              onChange={(e) => handleChange(field.id, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-orange focus:border-primary-orange font-sans"
                            />
                          )}
                        </div>
                      ))}

                      <div className="pt-4 flex justify-end">
                        <button
                          onClick={() => handleSaveSection(sectionId, pageId)}
                          disabled={saving === sectionKey}
                          className="px-6 py-2 bg-primary-orange text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-orange disabled:opacity-50"
                        >
                          {saving === sectionKey ? 'Salvando...' : 'Salvar Alterações da Seção'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
