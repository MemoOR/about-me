import { I18nextProvider } from 'react-i18next';
import { getI18n } from '../i18n';
import type { Lang } from '../lib/site';
import { useVendorScripts } from '../lib/vendor';
import SeoHead from '../components/SeoHead';
import Loader from '../components/Loader';
import SkipToContent from '../components/SkipToContent';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Divider from '../components/Divider';
import Home from '../sections/Home';
import About from '../sections/About';
import Resume from '../sections/Resume';
import Portfolio from '../sections/Portfolio';
import Contact from '../sections/Contact';

export default function HomePage({ lang }: { lang: Lang }) {
  const i18n = getI18n(lang);
  useVendorScripts();

  return (
    <I18nextProvider i18n={i18n}>
      <SeoHead lang={lang} enPath="/en/" esPath="/es/" />
      <Loader />
      <SkipToContent />

      <div className="page bg-dark light-content" id="top">
        <Navbar lang={lang} />

        <main id="main">
          <Home lang={lang} />
          <About />
          <Divider />
          <Resume lang={lang} />
          <Divider />
          <Portfolio />
          <Divider />
          <Contact lang={lang} />
          <Divider />
        </main>
      </div>

      <Footer />
    </I18nextProvider>
  );
}
