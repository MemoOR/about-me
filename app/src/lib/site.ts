export type Lang = 'en' | 'es';

export const SITE_URL = 'https://guillermoortega.me';

export const LANGUAGES: Lang[] = ['en', 'es'];

/** Language-prefixed path to the 3D world route (mirrors the Flask routes). */
export function threeWorldPath(lang: Lang): string {
  return lang === 'en' ? '/en/3dworld' : '/es/mundo3d';
}

export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? '';

/** Public reCAPTCHA verify happens server-side; this is only the site key. */
export interface PdfUrls {
  ieltsCertificateUrl: string;
  cvUrlPreview: string;
  cvUrlDownload: string;
}

export function pdfUrls(lang: Lang): PdfUrls {
  const ielts = import.meta.env.VITE_IELTS_CERTIFICATE_URL ?? '';
  if (lang === 'es') {
    return {
      ieltsCertificateUrl: ielts,
      cvUrlPreview: import.meta.env.VITE_SPANISH_CV_URL_PREVIEW ?? '',
      cvUrlDownload: import.meta.env.VITE_SPANISH_CV_URL_DOWNLOAD ?? '',
    };
  }
  return {
    ieltsCertificateUrl: ielts,
    cvUrlPreview: import.meta.env.VITE_ENGLISH_CV_URL_PREVIEW ?? '',
    cvUrlDownload: import.meta.env.VITE_ENGLISH_CV_URL_DOWNLOAD ?? '',
  };
}

export const certificateUrls = {
  udemyDevops: import.meta.env.VITE_UDEMY_DEVOPS ?? '',
  udemyThreejs: import.meta.env.VITE_UDEMY_THREEJS ?? '',
};
