'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false
  });

  // Check if consent has already been given
  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    } else {
      try {
        const parsed = JSON.parse(consent);
        applyTrackingConsent(parsed);
      } catch (e) {
        setIsVisible(true);
      }
    }
  }, []);

  const applyTrackingConsent = (prefs: CookiePreferences) => {
    // Write code to update Google Tag Consent or Facebook Pixel here
    if (typeof window !== 'undefined') {
      const dataLayer = (window as any).dataLayer || [];
      dataLayer.push({
        event: 'cookie_consent_updated',
        consent_necessary: prefs.necessary,
        consent_analytics: prefs.analytics,
        consent_marketing: prefs.marketing
      });
      (window as any).dataLayer = dataLayer;
    }
  };

  const handleAcceptAll = () => {
    const allPrefs = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem('cookie_consent', JSON.stringify(allPrefs));
    applyTrackingConsent(allPrefs);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const minPrefs = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem('cookie_consent', JSON.stringify(minPrefs));
    applyTrackingConsent(minPrefs);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie_consent', JSON.stringify(preferences));
    applyTrackingConsent(preferences);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-primary-navy border-t-2 border-primary-orange text-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!showSettings ? (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 text-sm text-gray-300">
              <p>
                Utilizamos cookies para melhorar sua experiência no site, analisar o tráfego e veicular anúncios relevantes. Ao clicar em &quot;Aceitar Todos&quot;, você consente com o uso de todas as categorias de cookies descritas em nossa{' '}
                <Link href="/politica-de-cookies" className="underline hover:text-primary-orange font-semibold">
                  Política de Cookies
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 text-xs font-semibold rounded bg-white/10 hover:bg-white/20 transition-all duration-150"
              >
                Gerenciar
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-xs font-semibold rounded bg-white/10 hover:bg-white/20 transition-all duration-150"
              >
                Apenas Necessários
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-xs font-semibold rounded text-white bg-primary-orange hover:bg-secondary-orange transition-all duration-150 shadow-md"
              >
                Aceitar Todos
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h4 className="text-base font-display font-extrabold text-primary-orange">Preferências de Cookies</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Necessary */}
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">Necessários</span>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="h-4 w-4 rounded border-gray-300 text-primary-orange focus:ring-primary-orange opacity-60"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Essenciais para o funcionamento básico e segurança do site.</p>
              </div>

              {/* Analytics */}
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">Análise</span>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                    className="h-4 w-4 rounded border-gray-300 text-primary-orange focus:ring-primary-orange"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Ajudam-nos a entender como os visitantes interagem com o site.</p>
              </div>

              {/* Marketing */}
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">Publicidade</span>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                    className="h-4 w-4 rounded border-gray-300 text-primary-orange focus:ring-primary-orange"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Usados para exibir anúncios personalizados com base em seus interesses.</p>
              </div>

            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-xs font-semibold rounded bg-white/10 hover:bg-white/20 transition-all duration-150"
              >
                Voltar
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 text-xs font-semibold rounded text-white bg-primary-orange hover:bg-secondary-orange transition-all duration-150"
              >
                Salvar Preferências
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
