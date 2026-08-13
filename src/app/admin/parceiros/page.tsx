'use client';

import React, { useEffect, useState, useRef } from 'react';
import { supabaseBrowser } from '@/services/supabase-browser';

type PartnerLogo = {
  id: string;
  name: string;
  image_url: string;
  is_active: boolean;
  order_index: number;
};

export default function ParceirosPage() {
  const [logos, setLogos] = useState<PartnerLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  
  const [newName, setNewName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabaseBrowser
        .from('partner_logos')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      if (data) setLogos(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      setError('Digite o nome da instituição.');
      return;
    }
    
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError('Selecione uma imagem para fazer upload.');
      return;
    }

    try {
      setUploading(true);
      setError('');

      // 1. Upload the image to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `logos/${fileName}`;

      const { error: uploadError, data: uploadData } = await supabaseBrowser.storage
        .from('assets')
        .upload(filePath, file);

      if (uploadError) {
        throw new Error('Erro ao fazer upload da imagem. Você criou o bucket "assets" no Storage? ' + uploadError.message);
      }

      // 2. Get Public URL
      const { data: { publicUrl } } = supabaseBrowser.storage
        .from('assets')
        .getPublicUrl(filePath);

      // 3. Save to database
      const newOrderIndex = logos.length > 0 ? Math.max(...logos.map(l => l.order_index)) + 1 : 1;
      
      const { error: dbError } = await supabaseBrowser
        .from('partner_logos')
        .insert([{
          name: newName,
          image_url: publicUrl,
          order_index: newOrderIndex
        }]);

      if (dbError) throw dbError;

      // Reset form and refresh
      setNewName('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      await fetchLogos();
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm('Tem certeza que deseja excluir esta logo?')) return;

    try {
      setLoading(true);
      
      // 1. Delete from database
      const { error: dbError } = await supabaseBrowser
        .from('partner_logos')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      // 2. Try to delete from storage if it's an uploaded image
      if (imageUrl.includes('supabase.co')) {
        const pathParts = imageUrl.split('/assets/');
        if (pathParts.length > 1) {
          const filePath = pathParts[1];
          await supabaseBrowser.storage.from('assets').remove([filePath]);
        }
      }

      await fetchLogos();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading && logos.length === 0) {
    return <div className="text-gray-500">Carregando parceiros...</div>;
  }

  return (
    <div className="max-w-4xl space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-display font-bold text-gray-800">Logos Parceiros</h2>
        <p className="text-gray-500 mt-1">
          Gerencie as instituições financeiras que aparecem rolando na tela inicial.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
          {error}
        </div>
      )}

      {/* Adicionar Nova Logo */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-150 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Adicionar Nova Logo</h3>
        <form onSubmit={handleUpload} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome da Instituição
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Ex: Banco do Brasil"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent outline-none"
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagem da Logo (Fundo transparente .png recomendado)
            </label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-orange/10 file:text-primary-orange hover:file:bg-primary-orange/20 cursor-pointer"
            />
          </div>
          <div className="w-full md:w-auto pb-[2px]">
            <button
              type="submit"
              disabled={uploading}
              className="w-full px-6 py-2 bg-primary-orange text-white rounded-lg hover:bg-secondary-orange transition-colors disabled:opacity-50 font-medium"
            >
              {uploading ? 'Enviando...' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>

      {/* Lista Atual */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-150 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Logos Atuais ({logos.length})</h3>
        
        {logos.length === 0 ? (
          <p className="text-gray-500 text-sm">Nenhuma logo cadastrada.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {logos.map((logo) => (
              <div key={logo.id} className="border border-gray-100 rounded-xl p-4 flex flex-col items-center justify-between group hover:border-gray-200 hover:shadow-sm transition-all">
                <div className="h-20 w-full flex items-center justify-center mb-3">
                  <img 
                    src={logo.image_url} 
                    alt={logo.name} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="w-full text-center border-t border-gray-50 pt-3">
                  <p className="text-sm font-medium text-gray-700 truncate mb-2">{logo.name}</p>
                  <button
                    onClick={() => handleDelete(logo.id, logo.image_url)}
                    className="text-xs text-red-500 hover:text-red-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
