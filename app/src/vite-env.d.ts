/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RECAPTCHA_SITE_KEY: string;
  readonly VITE_API_BASE: string;
  readonly VITE_IELTS_CERTIFICATE_URL: string;
  readonly VITE_SPANISH_CV_URL_PREVIEW: string;
  readonly VITE_SPANISH_CV_URL_DOWNLOAD: string;
  readonly VITE_ENGLISH_CV_URL_PREVIEW: string;
  readonly VITE_ENGLISH_CV_URL_DOWNLOAD: string;
  readonly VITE_UDEMY_DEVOPS: string;
  readonly VITE_UDEMY_THREEJS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Raw HTML/SVG snippet imports (icons reused verbatim from the Flask app).
declare module '*.html?raw' {
  const content: string;
  export default content;
}

// Globals provided by the vendor scripts loaded in index.html.
interface Window {
  grecaptcha?: {
    ready: (cb: () => void) => void;
    execute: (siteKey: string, opts: { action: string }) => Promise<string>;
  };
  DarkLightToggle?: () => void;
  setDarkMode?: () => void;
  setLightMode?: () => void;
}
