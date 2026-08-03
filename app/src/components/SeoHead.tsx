import { Head } from 'vite-react-ssg';
import { useTranslation } from 'react-i18next';
import { SITE_URL, type Lang } from '../lib/site';

interface SeoHeadProps {
  lang: Lang;
  /** Path segment after the language prefix, e.g. '' for home or '3dworld'. */
  path?: string;
  enPath: string;
  esPath: string;
}

/**
 * Per-page SEO head tags (title, description, canonical, hreflang, Open Graph).
 * Static tags (favicons, fonts, structured data) live in `index.html`.
 */
export default function SeoHead({ lang, enPath, esPath }: SeoHeadProps) {
  const { t } = useTranslation();
  const canonical = lang === 'en' ? `${SITE_URL}${enPath}` : `${SITE_URL}${esPath}`;
  const altEn = `${SITE_URL}${enPath}`;
  const altEs = `${SITE_URL}${esPath}`;
  const description = t('meta.description', 'Guillermo Ortega Romo — Senior Software Engineer II (Full Stack). AWS, Azure, GCP, OCI. Python, Terraform, Bicep. Portfolio, resume & contact.');
  const ogDescription = t('meta.ogDescription', 'Senior Software Engineer II (Full Stack). AWS, Azure, GCP, OCI. Python, Terraform, Bicep. Portfolio & Resume.');

  return (
    <Head>
      <html lang={lang} />
      <title>Guillermo Ortega Romo</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="en" href={altEn} />
      <link rel="alternate" hrefLang="es" href={altEs} />
      <link rel="alternate" hrefLang="x-default" href={altEn} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={lang === 'en' ? 'en_US' : 'es_MX'} />
      <meta property="og:locale:alternate" content={lang === 'en' ? 'es_MX' : 'en_US'} />
      <meta name="twitter:description" content={ogDescription} />
    </Head>
  );
}
