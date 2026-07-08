import { useEffect } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { getI18n } from '../i18n';
import type { Lang } from '../lib/site';
import { useVendorScripts } from '../lib/vendor';
import SeoHead from '../components/SeoHead';

function GameView() {
  const { t } = useTranslation();

  useEffect(() => {
    // Boot the vanilla Three.js game, reused verbatim from the Flask app.
    const script = document.createElement('script');
    script.type = 'module';
    script.textContent =
      'import { App3D } from "/static/js/app/Game.js";\n' +
      'const app = new App3D();\n' +
      'window.app = app;';
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <>
      <p id="instructions">
        {t('game.collectStars', 'Collect stars.')} <br />
        {t('game.avoidBombs', 'Avoid bombs.')} <br />
        {t('game.climb', 'Spacebar, mousedown or touch to climb')}
      </p>
      <div id="info">
        <div id="life">
          <img className="lazy" data-src="/static/assets/models/plane/plane-icon.png" alt="" />
          <div id="lives">3</div>
        </div>
        <div id="score-panel">
          <div id="score">0</div>
          <img className="lazy" data-src="/static/assets/models/plane/star-icon.png" alt="" />
        </div>
      </div>
      <p id="gameover">{t('game.gameOver', 'Game over')}</p>
      <button id="playBtn">{t('game.play', 'PLAY')}</button>
      <canvas className="webgl" />
    </>
  );
}

export default function ThreeWorldPage({ lang }: { lang: Lang }) {
  const i18n = getI18n(lang);
  useVendorScripts();

  return (
    <I18nextProvider i18n={i18n}>
      <SeoHead lang={lang} enPath="/en/3dworld" esPath="/es/mundo3d" />
      <GameView />
    </I18nextProvider>
  );
}
