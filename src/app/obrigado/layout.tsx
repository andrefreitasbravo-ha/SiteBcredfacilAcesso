import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recebemos sua solicitação | BCred Fácil',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ObrigadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
