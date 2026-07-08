import { useEffect } from 'react';
import { Head } from 'vite-react-ssg';

/**
 * Root path: forwards visitors to their best-matching language (mirrors the
 * Flask `/` handler that redirected to the negotiated locale).
 */
export default function RootRedirect() {
  useEffect(() => {
    const preferred = (navigator.language || 'en').toLowerCase();
    const lang = preferred.startsWith('es') ? 'es' : 'en';
    window.location.replace(`/${lang}`);
  }, []);

  return (
    <>
      <Head>
        <html lang="en" />
        <meta name="robots" content="noindex" />
        <meta httpEquiv="refresh" content="0; url=/en" />
        <link rel="canonical" href="https://guillermoortega.me/en/" />
        <title>Guillermo Ortega Romo</title>
      </Head>
      <noscript>
        <a href="/en">Continue to guillermoortega.me</a>
      </noscript>
    </>
  );
}
