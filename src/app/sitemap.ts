import { MetadataRoute } from 'next';
import { trackingConfig } from '@/config/tracking';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = trackingConfig.siteUrl;

  const routes = [
    '',
    '/credito-consignado-inss',
    '/credito-do-trabalhador-clt',
    '/portabilidade-consignado',
    '/seguranca',
    '/sobre',
    '/duvidas',
    '/contato',
    '/politica-de-privacidade',
    '/politica-de-cookies',
    '/termos-de-uso',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0], // Hoje (simplificação para este escopo)
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
