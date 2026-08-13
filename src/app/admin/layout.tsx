'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { supabaseBrowser } from '@/services/supabase-browser';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabaseBrowser.auth.getSession();
      if (!session) {
        setIsAuthenticated(false);
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabaseBrowser.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(!!session);
        if (!session && pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router, pathname]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Carregando painel...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  const handleLogout = async () => {
    await supabaseBrowser.auth.signOut();
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Configurações', href: '/admin/configuracoes' },
    { name: 'Textos do Site', href: '/admin/textos' },
    { name: 'Logos Parceiros', href: '/admin/parceiros' },
    { name: 'Dúvidas (FAQ)', href: '/admin/faq' },
    { name: 'Aparência', href: '/admin/aparencia' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-primary-navy text-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <span className="text-xl font-display font-bold">Admin Panel</span>
        </div>
        <div className="flex-1 py-6 flex flex-col gap-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-3 py-2 rounded-md transition-colors ${
                pathname === item.href ? 'bg-primary-orange text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-red-400 hover:text-red-300 hover:bg-white/5 rounded-md transition-colors"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white shadow-sm flex items-center px-8">
          <h1 className="text-xl font-semibold text-gray-800">
            {navItems.find((i) => i.href === pathname)?.name || 'Painel'}
          </h1>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
