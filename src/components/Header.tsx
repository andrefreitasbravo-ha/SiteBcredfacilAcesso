'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { companyConfig } from '@/config/company';
import { Container } from './Container';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'INSS Consignado', href: '/credito-consignado-inss' },
    { name: 'Crédito CLT', href: '/credito-do-trabalhador-clt' },
    { name: 'Portabilidade', href: '/portabilidade-consignado' },
    { name: 'Como Funciona', href: '/#como-funciona' },
    { name: 'Segurança', href: '/seguranca' },
    { name: 'Sobre Nós', href: '/sobre' },
    { name: 'Dúvidas', href: '/duvidas' },
  ];

  // Helper to check active page
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const handleWhatsappClick = () => {
    // Dispatch custom tracking event before opening link
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'click_whatsapp',
        click_location: 'header'
      });
    }
  };

  // Do not render Header on landing pages to avoid leakage points
  if (pathname.startsWith('/simule')) {
    return null;
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm"
    >
      <div className="py-3 border-b border-gray-100">
        <Container>
        <div className="flex items-center justify-between relative">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center focus:outline-none py-1 absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-auto lg:transform-none">
            <img
              src="/logobcredfacil.png?v=3"
              alt="BCred Fácil"
              className="h-9 lg:h-10 w-auto object-contain transition-transform duration-200 hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 lg:ml-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${isActive(link.href)
                    ? 'text-primary-orange font-bold'
                    : 'text-primary-navy/85 hover:text-primary-orange hover:bg-gray-50'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>



          {/* Mobile hamburger menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-primary-navy hover:text-primary-orange hover:bg-gray-50 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Abrir menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </Container>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-150" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.href)
                    ? 'text-primary-orange bg-gray-50 font-bold'
                    : 'text-primary-navy/85 hover:text-primary-orange hover:bg-gray-50'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-gray-150 px-3">
              <a
                href={`https://wa.me/${companyConfig.whatsapp}?text=Olá!%20Vim%20pelo%20site%20da%20BCred%20Fácil%20e%20gostaria%20de%20fazer%20uma%20simulação.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsappClick}
                className="w-full inline-flex items-center justify-center px-4 py-3 text-base font-semibold rounded-lg text-white bg-primary-orange hover:bg-secondary-orange transition-all duration-200 shadow-md"
              >
                Simular no WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
      <div className="bg-primary-orange text-white text-center py-1.5 text-[10px] sm:text-[11px] tracking-[0.18em] font-light uppercase">
        ATENDIMENTO EM ATÉ 10 MINUTOS
      </div>
    </header>
  );
};
