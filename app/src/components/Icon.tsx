import type { CSSProperties } from 'react';

// Named icon SVGs, reused verbatim from the Flask `templates/icons` folder.
import nameWhite from '../icons/name_white.html?raw';
import nameBlack from '../icons/name_black.html?raw';
import usFlag from '../icons/us_flag.html?raw';
import mxFlag from '../icons/mx_flag.html?raw';
import udemyLogo from '../icons/Udemy_logo.html?raw';
import ieltsLogo from '../icons/IELTS_logo.html?raw';
import iberoLogo from '../icons/Logo_Universidad_Iberoamericana.html?raw';
import trLogo from '../icons/tr_logo.html?raw';
import espressiveLogo from '../icons/espressive_logo.html?raw';
import iniatLogo from '../icons/INIAT_logo.html?raw';

export const icons = {
  nameWhite,
  nameBlack,
  usFlag,
  mxFlag,
  udemyLogo,
  ieltsLogo,
  iberoLogo,
  trLogo,
  espressiveLogo,
  iniatLogo,
} as const;

export type IconName = keyof typeof icons;

// Carousel tech logos, loaded (and ordered by filename) verbatim.
const carouselModules = import.meta.glob('../icons/carousel/*.html', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const carouselIcons: string[] = Object.keys(carouselModules)
  .sort((a, b) => {
    const na = Number(a.match(/carousel\/([\d.]+)-/)?.[1] ?? 0);
    const nb = Number(b.match(/carousel\/([\d.]+)-/)?.[1] ?? 0);
    return na - nb;
  })
  .map((key) => carouselModules[key]);

// `display: contents` keeps the wrapper out of the layout box tree so the inner
// SVG behaves as a direct child for descendant CSS selectors.
const contents: CSSProperties = { display: 'contents' };

/** Renders an inline SVG snippet without adding a visible wrapper box. */
export function RawSvg({ html, className }: { html: string; className?: string }) {
  return <span className={className} style={contents} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** Renders one of the named icons by key. */
export function Icon({ name, className }: { name: IconName; className?: string }) {
  return <RawSvg html={icons[name]} className={className} />;
}
