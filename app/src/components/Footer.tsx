import { useTranslation } from 'react-i18next';

const YEAR = new Date().getFullYear();

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer
      className="main-footer page-section bg-dark-alfa-50 light-content footer pb-100 pb-sm-50 parallax-1"
      data-background="/static/assets/img/decorator.webp"
    >
      <div className="container">
        {/* Social Links */}
        <div className="footer-social-links mb-90 mb-xs-40">
          <a href="https://github.com/MemoOR" title="Github" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github" /> <span className="sr-only">{t('footer.githubProfile', 'Github profile')}</span>
          </a>
          <a href="https://www.linkedin.com/in/guillermo-or" title="LinkedIn" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin" /> <span className="sr-only">{t('footer.linkedinProfile', 'LinkedIn profile')}</span>
          </a>
        </div>

        {/* Footer Text */}
        <div className="footer-text">
          <div className="footer-copy">
            <a href="#!">GDcode Labs &amp; Studios &copy; {YEAR} {t('footer.allRights', 'All rights reserved')}</a>.
          </div>
          <div className="footer-made">Guillermo Ortega Romo</div>
        </div>
      </div>

      {/* Top Link */}
      <div className="local-scroll">
        <a href="#top" className="link-to-top">
          <i className="link-to-top-icon" />
          <span className="sr-only">{t('footer.scrollTop', 'Scroll to top')}</span>
        </a>
      </div>
    </footer>
  );
}
