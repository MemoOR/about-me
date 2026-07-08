import { useTranslation } from 'react-i18next';
import type { Lang } from '../lib/site';
import { Icon } from './Icon';

export default function Navbar({ lang }: { lang: Lang }) {
  const { t } = useTranslation();
  const home = `/${lang}`;

  return (
    <nav className="main-nav dark transparent stick-fixed wow-menubar">
      <div className="full-wrapper relative clearfix">
        {/* Logo */}
        <div className="nav-logo-wrap local-scroll">
          <a href={home} className="logo" aria-label="Home">
            <Icon name="nameWhite" />
            <Icon name="nameBlack" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-nav" role="button" tabIndex={0}>
          <i className="fa fa-bars" />
          <span className="sr-only">{t('nav.menu', 'Menu')}</span>
        </div>

        {/* Main Menu */}
        <div className="inner-nav desktop-nav">
          <ul className="clearlist scroll-nav local-scroll">
            <li className="active">
              <a href="#home">{t('nav.home', 'Home')}</a>
            </li>
            <li>
              <a href="#about">{t('nav.about', 'About')}</a>
            </li>
            <li>
              <a href="#resume">{t('nav.resume', 'Resume')}</a>
            </li>
            <li>
              <a href="#portfolio">{t('nav.portfolio', 'Portfolio')}</a>
            </li>
            <li>
              <a href="#contact">{t('nav.contact', 'Contact')}</a>
            </li>
            <li>
              <a
                id="DarkLightToggle"
                href="#!"
                className="theme-toggle"
                role="button"
                aria-label={t('nav.toggleTheme', 'Toggle theme')}
                title={t('nav.toggleTheme', 'Toggle theme')}
                onClick={(e) => {
                  e.preventDefault();
                  window.DarkLightToggle?.();
                }}
              >
                <i className="fa-solid fa-moon" aria-hidden="true" />
                <span className="sr-only">{t('nav.toggleTheme', 'Toggle theme')}</span>
              </a>
            </li>
            {/* Languages */}
            <li>
              <a href="#" className="mn-has-sub">
                <div className="mn-flag-icon">
                  <Icon name={lang === 'en' ? 'usFlag' : 'mxFlag'} />
                </div>
                <i className="mn-has-sub-icon" />
              </a>
              <ul className="mn-sub">
                <li>
                  <a href="/en">{t('nav.english', 'English')}</a>
                </li>
                <li>
                  <a href="/es">{t('nav.spanish', 'Español')}</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
