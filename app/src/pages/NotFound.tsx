import { I18nextProvider, useTranslation } from 'react-i18next';
import { Head } from 'vite-react-ssg';
import { getI18n } from '../i18n';
import { useVendorScripts } from '../lib/vendor';
import Loader from '../components/Loader';
import Footer from '../components/Footer';

function NotFoundView() {
  const { t } = useTranslation();
  useVendorScripts();
  return (
    <>
      <Head>
        <html lang="en" />
        <meta name="robots" content="noindex" />
        <title>Guillermo Ortega Romo</title>
      </Head>
      <Loader />
      <div className="page bg-dark light-content" id="top">
        <main id="main">
          <section
            className="home-section bg-dark-alfa-70 parallax-5"
            data-background="/static/assets/img/gdcode_logo.webp"
            id="home"
          >
            <div className="container min-height-100vh d-flex align-items-center pt-100 pb-100">
              <div className="home-content">
                <div className="hs-wrap">
                  <div className="wow animate__animated animate__fadeInUpShort" data-wow-delay=".1s">
                    <h1 className="hs-line-1 opacity-085 mb-40 mb-xs-20">404</h1>
                  </div>
                  <div className="wow animate__animated animate__fadeInUpShort" data-wow-delay=".2s">
                    <p className="hs-line-6 opacity-07">{t('error.notFoundMsg', 'The page you were looking for could not be found.')}</p>
                  </div>
                  <div className="local-scroll wow animate__animated animate__fadeInUpShort" data-wow-delay=".3s">
                    <a href="/en" className="btn btn-mod btn-w btn-round btn-small">
                      <i className="fa fa-angle-left" /> {t('error.backHome', 'Back To Home Page')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default function NotFound() {
  return (
    <I18nextProvider i18n={getI18n('en')}>
      <NotFoundView />
    </I18nextProvider>
  );
}
