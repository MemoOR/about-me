import { useTranslation } from 'react-i18next';

export default function SkipToContent() {
  const { t } = useTranslation();
  return (
    <a href="#main" className="btn skip-to-content">
      {t('skip.content', 'Skip to Content')}
    </a>
  );
}
