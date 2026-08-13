import type { Metadata } from 'next';
import { ContatoContent } from '@/components/ContatoContent';

export const metadata: Metadata = {
  title: 'Contato e Canais Oficiais',
  description: 'Fale com a BCred Fácil pelos canais oficiais e receba orientação sobre as modalidades disponíveis.',
  alternates: { canonical: '/contato' },
  openGraph: {
    title: 'Contato e Canais Oficiais | BCred Fácil',
    description: 'Fale com a BCred Fácil pelos canais oficiais e receba orientação sobre as modalidades disponíveis.',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function ContatoPage() {
  return <ContatoContent />;
}
