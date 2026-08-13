export interface UtmParameters {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
  fbclid: string | null;
}

export const extractUtms = (searchParams: URLSearchParams | null): UtmParameters => {
  if (!searchParams) {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
      utm_term: null,
      gclid: null,
      fbclid: null,
    };
  }

  // Helper para não estourar o tamanho do banco
  const sanitize = (val: string | null) => (val ? val.substring(0, 200) : null);

  return {
    utm_source: sanitize(searchParams.get('utm_source')),
    utm_medium: sanitize(searchParams.get('utm_medium')),
    utm_campaign: sanitize(searchParams.get('utm_campaign')),
    utm_content: sanitize(searchParams.get('utm_content')),
    utm_term: sanitize(searchParams.get('utm_term')),
    gclid: sanitize(searchParams.get('gclid')),
    fbclid: sanitize(searchParams.get('fbclid')),
  };
};
