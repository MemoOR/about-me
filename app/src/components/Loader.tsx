import { useTranslation } from 'react-i18next';

export default function Loader() {
  const { t } = useTranslation();
  return (
    <div id="main-loader" className="page-loader">
      <div className="loader">{t('loader.loading', 'Loading...')}</div>
    </div>
  );
}
