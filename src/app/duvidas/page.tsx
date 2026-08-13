import type { Metadata } from 'next';
import { DuvidasContent } from '@/components/DuvidasContent';
import { supabaseBrowser } from '@/services/supabase-browser';

export const metadata: Metadata = {
  title: 'Dúvidas sobre Crédito Consignado',
  description: 'Encontre respostas sobre crédito consignado INSS, Crédito do Trabalhador, portabilidade, segurança e atendimento.',
  alternates: { canonical: '/duvidas' },
  openGraph: {
    title: 'Dúvidas sobre Crédito Consignado | BCred Fácil',
    description: 'Encontre respostas sobre crédito consignado INSS, Crédito do Trabalhador, portabilidade, segurança e atendimento.',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default async function DuvidasPage() {
  let texts: Record<string, string> = {};
  try {
    const { data } = await supabaseBrowser
      .from('page_content')
      .select('field_key, content')
      .eq('page_id', 'duvidas');
    if (data) {
      data.forEach(item => {
        texts[item.field_key] = item.content;
      });
    }
  } catch (err) {
    console.error('Error fetching texts for Duvidas page:', err);
  }

  return <DuvidasContent initialTexts={texts} />;
}
