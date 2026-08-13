'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';

// Routes that use their own dedicated header/footer (landing pages, thank you page)
const STANDALONE_ROUTES = ['/simule', '/obrigado', '/admin'];

function isStandaloneRoute(pathname: string) {
  return STANDALONE_ROUTES.some(route => pathname.startsWith(route));
}

export const GlobalHeaderWrapper = () => {
  const pathname = usePathname();

  if (isStandaloneRoute(pathname)) {
    return null;
  }

  return (
    <>
      <Header />
      {/* Spacer to account for fixed header */}
      <div className="h-[64px] lg:h-[76px]" aria-hidden="true" />
    </>
  );
};

export const GlobalFooterWrapper = () => {
  const pathname = usePathname();

  if (isStandaloneRoute(pathname)) {
    return null;
  }

  return <Footer />;
};
