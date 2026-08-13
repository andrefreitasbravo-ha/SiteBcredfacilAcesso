import React from 'react';
import { companyConfig } from '@/config/company';
import { trackingConfig } from '@/config/tracking';

export const OrganizationJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": companyConfig.name,
    "legalName": companyConfig.razaoSocial,
    ...(companyConfig.cnpjIsReady && { "taxID": companyConfig.cnpj }),
    "url": trackingConfig.siteUrl,
    "logo": `${trackingConfig.siteUrl}/fiveicon.png`,
    ...(companyConfig.phoneIsReady && { "telephone": companyConfig.phone }),
    "email": companyConfig.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": companyConfig.address,
      "addressLocality": companyConfig.city,
      "addressRegion": companyConfig.state,
      "postalCode": companyConfig.zipCode,
      "addressCountry": "BR"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
