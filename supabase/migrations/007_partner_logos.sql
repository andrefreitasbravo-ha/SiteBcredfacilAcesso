-- ==========================================
-- SCRIPT 007: TABELA DE LOGOS DE PARCEIROS
-- ==========================================
-- Rode este script no "SQL Editor" do Supabase.

CREATE TABLE IF NOT EXISTS public.partner_logos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS
ALTER TABLE public.partner_logos ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Leitura pública permitida para logos" ON public.partner_logos FOR SELECT USING (true);
CREATE POLICY "Apenas admin pode alterar logos" ON public.partner_logos FOR ALL USING (auth.role() = 'authenticated');

-- Inserir dados iniciais (Logos que já estão no site atualmente)
INSERT INTO public.partner_logos (name, image_url, order_index) VALUES
('Itaú', '/logo_itau.webp', 1),
('Bradesco', '/logo_bradesco.png', 2),
('Banco BMG', '/logo-bmg.png', 3),
('Banco PAN', '/logo_bancopan.png', 4),
('PicPay', '/logo_PicPay.png', 5),
('Banco Daycoval', '/logo_BancoDaycoval.png', 6),
('Banco Safra', '/logo_safra.webp', 7),
('Banco Mercantil', '/logo_Banco Mercantil.png', 8),
('C6 Bank', '/logo_C6 Bank.png', 9),
('Banrisul', '/logo_Banrisul.webp', 10);
