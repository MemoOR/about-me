import { useEffect } from 'react';
import { RECAPTCHA_SITE_KEY } from './site';

// Same library stack (and order) the original Flask `scripts.html` used. These
// are loaded AFTER React mounts so `all.js` initialises the real, populated DOM
// — React 18 commits the client render in a later scheduler task, so scripts in
// index.html would otherwise run against an empty #root and bind to nothing.
const CORE_SCRIPTS: string[] = [
  'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
  '/static/js/SmoothScroll.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery-scrollTo/2.1.3/jquery.scrollTo.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery-localScroll/2.0.0/jquery.localScroll.min.js',
  '/static/js/viewport.mini.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery-parallax/1.1.3/jquery-parallax-min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/fitvids/1.2.0/jquery.fitvids.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js',
  'https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js',
  'https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/masonry/4.2.2/masonry.pkgd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery.lazy/1.7.11/jquery.lazy.min.js',
  '/static/js/wow.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/Morphext/2.4.4/morphext.min.js',
  '/static/js/typed.min.js',
  '/static/js/dark_mode.js',
  'https://unpkg.com/splitting/dist/splitting.min.js',
  '/static/js/all.js',
];

// Non-critical extras that all.js does not depend on.
const EXTRA_SCRIPTS: string[] = [
  'https://cdnjs.cloudflare.com/ajax/libs/jquery-ajaxchimp/1.3.0/jquery.ajaxchimp.min.js',
  '/static/js/objectFitPolyfill.min.js',
  '/static/js/jquery_listener.js',
];

let started = false;

/**
 * Locks every WOW element as visible once its entrance animation has finished.
 *
 * The template's `.wow` elements are `opacity: 0.01` and only become visible
 * while they carry `animate__animated` (added by WOW.js on reveal). With
 * WOW's `live: true` observer, unrelated DOM churn (Owl autoplay, reCAPTCHA,
 * lazy-loaded images) can re-process a box and leave it stuck at the animation's
 * 0% frame, so hero text/buttons vanish after a while with no scroll to
 * re-reveal them. Marking each box `wow-settled` on `animationend` makes it
 * permanently visible regardless of any later re-trigger.
 */
function installWowSafetyNet(): void {
  const style = document.createElement('style');
  style.textContent = '.wow-settled{opacity:1 !important;visibility:visible !important;}';
  document.head.appendChild(style);

  document.addEventListener(
    'animationend',
    (event) => {
      const el = event.target as Element | null;
      if (el && el.nodeType === 1 && (el.classList.contains('wow') || el.classList.contains('wow-p'))) {
        el.classList.add('wow-settled');
      }
    },
    true,
  );
}

function loadScript(src: string, ordered: boolean): Promise<void> {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    // async=false => the browser downloads all of these in parallel but runs
    // them in insertion order (same guarantee the original `defer` scripts had).
    script.async = !ordered ? true : false;
    script.onload = () => resolve();
    script.onerror = () => resolve(); // never block the chain on one failure
    document.body.appendChild(script);
  });
}

async function loadVendorScripts(): Promise<void> {
  if (started) return;
  started = true;

  // Ready before any animation can start, so no entrance animation is missed.
  installWowSafetyNet();

  // reCAPTCHA v3 (independent; needed by the contact form).
  if (RECAPTCHA_SITE_KEY) {
    void loadScript(`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`, false);
  }

  // Append jQuery + plugins + all.js at once: parallel download, ordered exec.
  const core = CORE_SCRIPTS.map((src) => loadScript(src, true));

  // all.js is last in the ordered set, so its load resolves once the whole
  // chain has executed.
  await core[core.length - 1];

  // Let jQuery's $(document).ready() callbacks flush first...
  await new Promise((resolve) => setTimeout(resolve, 0));

  // ...then fire the load event all.js's $(window).on('load') is waiting for
  // (the real one already fired before all.js existed).
  window.dispatchEvent(new Event('load'));

  for (const src of EXTRA_SCRIPTS) {
    void loadScript(src, true);
  }
}

/** Loads the jQuery vendor stack once, after the component has mounted. */
export function useVendorScripts(): void {
  useEffect(() => {
    void loadVendorScripts();
  }, []);
}
