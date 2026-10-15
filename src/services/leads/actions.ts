'use server';

import { getSupabaseServerClient } from './supabase';
import { revalidatePath } from 'next/cache';

export interface LeadRecord {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  city: string;
  product: string;
  profile_answer?: string | null;
  source_page?: string | null;
  landing_page?: string | null;
  referrer?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
  consent: boolean;
  consent_version?: string | null;
  consent_at?: string | null;
  status: 'new' | 'contacted' | 'in_progress' | 'converted' | 'lost' | string;
  user_agent?: string | null;
}

export async function getLeadsAction(): Promise<{ success: boolean; data?: LeadRecord[]; error?: string }> {
  try {
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return { success: false, error: 'Supabase não configurado no servidor.' };
    }

    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar leads:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data as LeadRecord[] };
  } catch (err: any) {
    console.error('Erro desconhecido em getLeadsAction:', err);
    return { success: false, error: err.message || 'Erro interno ao buscar leads.' };
  }
}

export async function updateLeadStatusAction(id: string, status: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return { success: false, error: 'Supabase não configurado no servidor.' };
    }

    const { error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Erro ao atualizar status do lead:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/admin/leads');
    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro ao atualizar status.' };
  }
}

export async function deleteLeadAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return { success: false, error: 'Supabase não configurado no servidor.' };
    }

    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao excluir lead:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/admin/leads');
    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro ao excluir lead.' };
  }
}
