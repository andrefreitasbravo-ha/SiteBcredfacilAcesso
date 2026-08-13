'use client';

import React, { useState } from 'react';
import { supabaseBrowser } from '@/services/supabase-browser';

export default function AparenciaPage() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setMessage({ type: '', text: '' });

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('Você deve selecionar uma imagem.');
      }

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload da imagem pro bucket 'assets'
      const { error: uploadError } = await supabaseBrowser.storage
        .from('assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Pegar a URL pública da imagem
      const { data } = supabaseBrowser.storage
        .from('assets')
        .getPublicUrl(filePath);

      const publicUrl = data.publicUrl;
      setPreviewUrl(publicUrl);

      // Atualizar a URL na tabela site_settings
      const { data: settings } = await supabaseBrowser.from('site_settings').select('id').single();
      
      if (settings) {
        const { error: updateError } = await supabaseBrowser
          .from('site_settings')
          .update({ logo_url: publicUrl })
          .eq('id', settings.id);

        if (updateError) throw updateError;
      }

      setMessage({ type: 'success', text: 'Logo atualizada com sucesso!' });
    } catch (error: any) {
      console.error('Error uploading image:', error);
      setMessage({ type: 'error', text: error.message || 'Erro ao fazer upload da imagem.' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-150 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Aparência e Logo</h2>
      
      {message.text && (
        <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <div className="space-y-6 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload de Nova Logo</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-primary-orange transition-colors">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600 justify-center">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-orange hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-orange">
                  <span>Selecione um arquivo</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF até 5MB</p>
            </div>
          </div>
        </div>

        {uploading && (
          <p className="text-sm text-gray-500">Fazendo upload...</p>
        )}

        {previewUrl && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Pré-visualização da nova Logo:</p>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md inline-block">
              <img src={previewUrl} alt="Nova Logo" className="h-16 object-contain" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
