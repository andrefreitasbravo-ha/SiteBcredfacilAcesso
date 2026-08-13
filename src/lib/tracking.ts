declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

export type TrackingEventType = 
  | 'landing_view'
  | 'select_profile'
  | 'click_whatsapp'
  | 'click_phone'
  | 'form_view'
  | 'form_start'
  | 'form_error'
  | 'form_submit'
  | 'generate_lead'
  | 'thank_you_view'
  | 'view_security'
  | 'view_institutions'
  | 'faq_open';

export interface DataLayerEvent {
  event: TrackingEventType;
  product?: string;
  location?: string;
  page_path?: string;
  page_type?: string;
  campaign_type?: string;
  lead_id?: string;
  event_id?: string;
  error_type?: string;
  faq_question_id?: string;
  [key: string]: unknown;
}

export const pushDataLayerEvent = (data: DataLayerEvent) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    // Remove any personal data before pushing
    const safeData: Record<string, unknown> = { ...data };
    delete safeData.nome;
    delete safeData.telefone;
    delete safeData.whatsapp;
    delete safeData.cpf;
    delete safeData.cidade;

    window.dataLayer.push(safeData);
  }
};
