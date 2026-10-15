import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";
import { companyConfig } from "@/config/company";
import { trackingConfig } from "@/config/tracking";
import { OrganizationJsonLd } from "@/components/OrganizationJsonLd";
import { GlobalHeaderWrapper, GlobalFooterWrapper } from "@/components/GlobalHeaderWrapper";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
});

const siteUrl = trackingConfig.siteUrl
  ? new URL(trackingConfig.siteUrl)
  : new URL('https://bcredfacil.com.br');

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `Crédito Consignado em ${companyConfig.city} | ${companyConfig.name}`,
    template: `%s | ${companyConfig.name}`
  },
  description: `Consulte crédito consignado INSS, Crédito do Trabalhador e portabilidade com atendimento rápido, humano e seguro em ${companyConfig.city}.`,
  applicationName: companyConfig.name,
  authors: [{ name: companyConfig.name }],
  creator: companyConfig.name,
  publisher: companyConfig.name,
  category: 'finance',
  formatDetection: {
    telephone: true,
    email: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: companyConfig.name,
    title: `Crédito Consignado em ${companyConfig.city} | ${companyConfig.name}`,
    description: `Consulte crédito consignado INSS, Crédito do Trabalhador e portabilidade com atendimento rápido, humano e seguro em ${companyConfig.city}.`,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'WTWsA8nJP92P9fbwGSOhXDT7UOjTLijgShEP-26jI6w',
  },
  icons: {
    icon: [
      { url: '/fiveicon.png', type: 'image/png' },
    ],
    shortcut: '/fiveicon.png',
    apple: '/fiveicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} h-full scroll-smooth antialiased`}>
      <head>
        <meta name="google-site-verification" content="WTWsA8nJP92P9fbwGSOhXDT7UOjTLijgShEP-26jI6w" />
        <OrganizationJsonLd />
        {trackingConfig.gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${trackingConfig.gtmId}');`
            }}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 font-sans">
        {trackingConfig.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${trackingConfig.gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <GlobalHeaderWrapper />
        <main className="flex-grow">
          {children}
        </main>
        <GlobalFooterWrapper />
        <CookieBanner />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
