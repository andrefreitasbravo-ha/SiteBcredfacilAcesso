/**
 * Normaliza um número de WhatsApp brasileiro.
 * Remove espaços, parênteses, hífens e caracteres não numéricos.
 * Adiciona o +55 se não houver código do país, garantindo o padrão E.164.
 */
export const normalizeBrazilianPhone = (phone: string): string => {
  if (!phone) return '';
  
  // Remove tudo que não for dígito
  let clean = phone.replace(/\D/g, '');
  
  // Se for muito curto, rejeitar
  if (clean.length < 10) return '';

  // Se já tiver 55 na frente, verifica se tem o tamanho certo
  if (clean.startsWith('55') && clean.length >= 12) {
    clean = clean.substring(2);
  }

  // Neste ponto deve ter entre 10 e 11 dígitos (com DDD)
  if (clean.length === 10 || clean.length === 11) {
    return `+55${clean}`;
  }
  
  // Retorna vazio para números muito longos ou anômalos
  return '';
};
