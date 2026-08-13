import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Apenas usado no lado do servidor (Server Actions / API Routes)
export const getSupabaseServerClient = () => {
  if (!supabaseUrl || !supabaseServiceKey) {
    return null; // Graceful degradation se não houver credenciais
  }
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
    }
  });
};
