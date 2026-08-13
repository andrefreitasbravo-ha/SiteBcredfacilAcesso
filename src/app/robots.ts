import { MetadataRoute } from 'next';
import { trackingConfig } from '@/config/tracking';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/obrigado',
        '/simule/*',
        '/api/*',
      ],
    },
    sitemap: `${trackingConfig.siteUrl}/sitemap.xml`,
  };
}
