import { useTranslation } from 'react-i18next';
import { threeWorldPath, type Lang } from '../lib/site';

export default function Home({ lang }: { lang: Lang }) {
  const { t } = useTranslation();
  const gamePath = threeWorldPath(lang);

  return (
    <section
      className="home-section bg-dark-alfa-70 parallax-5"
      data-background="/static/assets/img/decorator.webp"
      id="home"
    >
      <div className="container min-height-100vh d-flex align-items-center pt-100 pb-100">
        {/* Hero Content */}
        <div className="home-content text-start">
          <h1
            className="hs-line-10 uppercase mb-30 mb-xs-20 wow animate__animated animate__fadeInDownShort"
            data-wow-delay=".1s"
          >
            {t('home.role', 'Full Stack Engineer')}
          </h1>
          <h2
            className="hs-line-5 mb-60 mb-xs-40 wow animate__animated animate__fadeInDownShort"
            data-wow-delay=".2s"
          >
            Guillermo Ortega Romo
          </h2>
          <div className="local-scroll wow animate__animated animate__fadeInUpShort" data-wow-delay=".3s">
            <a
              href={gamePath}
              className="btn btn-mod btn-w btn-medium btn-round mx-md-1 lightbox-gallery-1 mfp-iframe desktop-play"
              hidden
            >
              {t('home.playGame', 'Play a game')}
            </a>
            <a
              href={gamePath}
              className="btn btn-mod btn-w btn-medium btn-round mx-md-1 mobile-play"
              target="_blank"
              rel="noopener noreferrer"
              hidden
            >
              {t('home.playGame', 'Play a game')}
            </a>
          </div>
        </div>

        {/* Scroll Down */}
        <div
          className="scroll-down-wrap wow animate__animated animate__fadeInUpShort"
          data-wow-delay=".8s"
          data-wow-offset="0"
        >
          <div className="arrow-text-2 arrows">{t('home.explore', 'Explore the page')}</div>
          <div className="handdrawn-arrow-2 arrows" />
        </div>
        <div className="local-scroll scroll-down-wrap wow animate__animated animate__fadeInUpShort" data-wow-offset="0">
          <a href="#about" className="scroll-down">
            <i className="scroll-down-icon" />
            <span className="sr-only">{t('home.scrollNext', 'Scroll to the next section')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
