'use client';

import React, { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/services/supabase-browser';

type FAQ = {
  id: string;
  category: string;
  question: string;
  answer: string;
  order_index: number;
};

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Modo de edição/adição
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const { data, error } = await supabaseBrowser
        .from('faqs')
        .select('*')
        .order('category', { ascending: true })
        .order('order_index', { ascending: true });

      if (error) throw error;
      if (data) setFaqs(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      setMessage({ type: 'error', text: 'Erro ao carregar dúvidas frequentes.' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (faq?: FAQ) => {
    if (faq) {
      setEditingFaq(faq);
    } else {
      setEditingFaq({
        id: '',
        category: 'Perguntas Gerais',
        question: '',
        answer: '',
        order_index: 0
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFaq(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;
    
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      if (editingFaq.id) {
        // Update
        const { error } = await supabaseBrowser
          .from('faqs')
          .update({
            category: editingFaq.category,
            question: editingFaq.question,
            answer: editingFaq.answer,
            order_index: editingFaq.order_index,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingFaq.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabaseBrowser
          .from('faqs')
          .insert([{
            category: editingFaq.category,
            question: editingFaq.question,
            answer: editingFaq.answer,
            order_index: editingFaq.order_index
          }]);
        if (error) throw error;
      }

      await fetchFaqs();
      setMessage({ type: 'success', text: 'Pergunta salva com sucesso!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      handleCloseModal();
    } catch (error) {
      console.error('Error saving FAQ:', error);
      setMessage({ type: 'error', text: 'Erro ao salvar pergunta.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta pergunta?')) return;
    
    try {
      const { error } = await supabaseBrowser.from('faqs').delete().eq('id', id);
      if (error) throw error;
      setFaqs(faqs.filter(f => f.id !== id));
      setMessage({ type: 'success', text: 'Pergunta excluída!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      setMessage({ type: 'error', text: 'Erro ao excluir pergunta.' });
    }
  };

  if (loading) return <div>Carregando FAQs...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-150 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Dúvidas Frequentes (FAQ)</h2>
          <p className="text-gray-600 text-sm">Gerencie as perguntas e respostas que aparecem no site.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-primary-navy text-white rounded-md hover:bg-opacity-90 font-medium text-sm shadow-sm"
        >
          + Adicionar Pergunta
        </button>
      </div>
      
      {message.text && (
        <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <div className="space-y-4">
        {faqs.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Nenhuma pergunta cadastrada.</p>
        ) : (
          faqs.map(faq => (
            <div key={faq.id} className="border border-gray-200 rounded-lg p-5 flex justify-between items-start hover:border-primary-orange transition-colors">
              <div className="flex-1 pr-4">
                <span className="inline-block px-2 py-1 bg-gray-100 text-xs font-semibold text-gray-600 rounded mb-2">
                  {faq.category}
                </span>
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{faq.answer}</p>
              </div>
              <div className="flex space-x-2 flex-shrink-0">
                <button onClick={() => handleOpenModal(faq)} className="text-sm text-primary-orange font-medium hover:underline">
                  Editar
                </button>
                <button onClick={() => handleDelete(faq.id)} className="text-sm text-red-500 font-medium hover:underline">
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de Edição */}
      {isModalOpen && editingFaq && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingFaq.id ? 'Editar Pergunta' : 'Nova Pergunta'}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria (Ex: INSS, Geral)</label>
                <input
                  type="text"
                  required
                  value={editingFaq.category}
                  onChange={e => setEditingFaq({...editingFaq, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pergunta</label>
                <input
                  type="text"
                  required
                  value={editingFaq.question}
                  onChange={e => setEditingFaq({...editingFaq, question: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resposta</label>
                <textarea
                  required
                  rows={4}
                  value={editingFaq.answer}
                  onChange={e => setEditingFaq({...editingFaq, answer: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary-orange"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 text-white bg-primary-orange hover:bg-orange-600 rounded-md font-medium disabled:opacity-50"
                >
                  {saving ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
