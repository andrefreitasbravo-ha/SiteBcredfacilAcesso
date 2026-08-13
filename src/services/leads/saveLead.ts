'use server';

import { z } from 'zod';
import { getSupabaseServerClient } from './supabase';
import { normalizeBrazilianPhone } from '@/lib/utils/phone';
import { headers } from 'next/headers';

// Zod v4 compatible literal
const leadSchema = z.object({
  nome: z.string().min(2, "Nome muito curto").max(100).trim(),
  whatsapp: z.string().min(10, "WhatsApp inválido"),
  cidade: z.string().min(2, "Cidade muito curta").max(100).trim(),
  product: z.enum([
    'credito-consignado-inss',
    'credito-do-trabalhador',
    'portabilidade',
    'antecipacao-fgts',
    'atendimento-geral'
  ]),
  profile_answer: z.string().nullable().optional(),
  source_page: z.string().max(255).optional(),
  landing_page: z.string().max(255).optional(),
  referrer: z.string().max(500).optional().nullable().transform(v => v ?? undefined),
  utm_source: z.string().max(100).optional().nullable().transform(v => v ?? undefined),
  utm_medium: z.string().max(100).optional().nullable().transform(v => v ?? undefined),
  utm_campaign: z.string().max(100).optional().nullable().transform(v => v ?? undefined),
  utm_content: z.string().max(100).optional().nullable().transform(v => v ?? undefined),
  utm_term: z.string().max(100).optional().nullable().transform(v => v ?? undefined),
  gclid: z.string().max(200).optional().nullable().transform(v => v ?? undefined),
  fbclid: z.string().max(200).optional().nullable().transform(v => v ?? undefined),
  consent: z.boolean().refine(val => val === true, { message: "O consentimento é obrigatório" }),
  consent_version: z.string(),
  honeypot: z.string().max(0, "Spam detectado").optional(),
});

export type LeadInput = z.input<typeof leadSchema>;

export async function saveLeadAction(data: LeadInput) {
  try {
    // 1. Validate with Zod
    const parsedData = leadSchema.parse(data);
    
    // 2. Anti-spam (Honeypot)
    if (parsedData.honeypot && parsedData.honeypot.length > 0) {
      return { success: false, error: 'Spam detectado' };
    }

    // 3. Normalize phone
    const normalizedPhone = normalizeBrazilianPhone(parsedData.whatsapp);
    if (!normalizedPhone) {
      return { success: false, error: 'WhatsApp inválido após normalização' };
    }

    const supabase = getSupabaseServerClient();
    
    // Graceful degradation if Supabase not configured
    if (!supabase) {
      console.warn('⚠️ Supabase não configurado. Lead não salvo no banco. Simulando sucesso.');
      return { 
        success: true, 
        leadId: `dev-${Date.now()}`
      };
    }

    // 4. Deduplication check
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    
    const { data: existingLeads, error: checkError } = await supabase
      .from('leads')
      .select('id')
      .eq('phone', normalizedPhone)
      .eq('product', parsedData.product)
      .gte('created_at', fiveMinutesAgo)
      .limit(1);

    if (checkError) {
      console.error('Erro ao verificar duplicidade', checkError);
      return { success: false, error: 'Erro interno ao processar a solicitação.' };
    }

    if (existingLeads && existingLeads.length > 0) {
      return { 
        success: true, 
        leadId: existingLeads[0].id,
        isDuplicate: true 
      };
    }

    // 5. Get User Agent safely (Next.js 15 async headers)
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || null;

    // 6. Insert into database
    const { data: newLead, error: insertError } = await supabase
      .from('leads')
      .insert({
        name: parsedData.nome,
        phone: normalizedPhone,
        city: parsedData.cidade,
        product: parsedData.product,
        profile_answer: parsedData.profile_answer || null,
        source_page: parsedData.source_page || null,
        landing_page: parsedData.landing_page || null,
        referrer: parsedData.referrer || null,
        utm_source: parsedData.utm_source || null,
        utm_medium: parsedData.utm_medium || null,
        utm_campaign: parsedData.utm_campaign || null,
        utm_content: parsedData.utm_content || null,
        utm_term: parsedData.utm_term || null,
        gclid: parsedData.gclid || null,
        fbclid: parsedData.fbclid || null,
        consent: parsedData.consent,
        consent_version: parsedData.consent_version,
        consent_at: new Date().toISOString(),
        status: 'new',
        user_agent: userAgent
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('Erro ao salvar lead no Supabase', insertError);
      return { success: false, error: 'Erro ao salvar os dados. Tente novamente.' };
    }

    return { 
      success: true, 
      leadId: newLead.id 
    };

  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return { success: false, error: firstError?.message ?? 'Erro de validação' };
    }
    console.error('Erro desconhecido em saveLeadAction', error);
    return { success: false, error: 'Erro interno do servidor.' };
  }
}
