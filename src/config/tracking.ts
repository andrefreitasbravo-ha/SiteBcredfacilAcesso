export const trackingConfig = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "",
  googleAdsLeadLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL ?? "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lp-bcredf-cil.vercel.app", // Fallback seguro
};
