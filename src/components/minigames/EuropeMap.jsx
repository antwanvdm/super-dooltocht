import { useRef, useEffect } from 'react';
import europaSvg from '../topo-maps/europa.svg?raw';

// Map SVG id (ISO country code) → internal key
const ID_TO_KEY = {
  nl: 'nl', be: 'be', de: 'de', fr: 'fr', gb: 'gb', es: 'es', pt: 'pt', it: 'it',
  ch: 'ch', at: 'at', dk: 'dk', se: 'se', no: 'no', fi: 'fi', pl: 'pl', cz: 'cz',
  ie: 'ie', lu: 'lu', gr: 'gr', hu: 'hu', ro: 'ro', bg: 'bg', hr: 'hr', sk: 'sk',
  si: 'si', ee: 'ee', lv: 'lv', lt: 'lt', cy: 'cy', mt: 'mt', is: 'is',
  al: 'al', ba: 'ba', me: 'me', rs: 'rs', mk: 'mk', md: 'md', ua: 'ua', by: 'by', ru: 'ru', tr: 'tr',
  ge: 'ge', am: 'am', az: 'az',
};

const COUNTRY_NAMES = {
  nl: 'Nederland', be: 'België', de: 'Duitsland', fr: 'Frankrijk', gb: 'Groot-Brittannië',
  es: 'Spanje', pt: 'Portugal', it: 'Italië', ch: 'Zwitserland', at: 'Oostenrijk',
  dk: 'Denemarken', se: 'Zweden', no: 'Noorwegen', fi: 'Finland', pl: 'Polen',
  cz: 'Tsjechië', ie: 'Ierland', lu: 'Luxemburg', gr: 'Griekenland', hu: 'Hongarije',
  ro: 'Roemenië', bg: 'Bulgarije', hr: 'Kroatië', sk: 'Slowakije', si: 'Slovenië',
  ee: 'Estland', lv: 'Letland', lt: 'Litouwen', cy: 'Cyprus', mt: 'Malta', is: 'IJsland',
  al: 'Albanië', ba: 'Bosnië en Herzegovina', me: 'Montenegro', rs: 'Servië',
  mk: 'Noord-Macedonië', md: 'Moldavië',
  ua: 'Oekraïne', by: 'Wit-Rusland', ru: 'Rusland', tr: 'Turkije',
  ge: 'Georgië', am: 'Armenië', az: 'Azerbeidzjan',
};

// Easy = well-known western/southern European countries
const EASY_COUNTRIES = [
  'nl', 'be', 'de', 'fr', 'gb', 'es', 'pt', 'it', 'ch', 'at',
  'dk', 'se', 'no', 'fi', 'pl', 'ie', 'gr',
];

// Medium = all countries
const ALL_COUNTRIES = Object.keys(COUNTRY_NAMES);

function getPaths(el) {
  if (!el) return [];
  return el.tagName === 'path' ? [el] : [...el.querySelectorAll('path')];
}

export default function EuropeMap({ selected, isCorrect, onClick, clickableKeys }) {
  const containerRef = useRef(null);
  const onClickRef = useRef(onClick);
  onClickRef.current = onClick;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = europaSvg;

    const svg = container.querySelector('svg');
    if (!svg) return;

    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.removeAttribute('style');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Kaart van Europa');

    // Normalize all country paths: clear inline fills/strokes so JS styling takes full effect
    const mappedIds = new Set(Object.keys(ID_TO_KEY));
    svg.querySelectorAll('path').forEach(p => {
      const parentId = p.closest('[id]')?.id;
      if (mappedIds.has(parentId) || mappedIds.has(p.id)) return; // handled dynamically
      // Unmapped countries get a neutral background with visible borders
      p.style.fill = '#e5e7eb';
      p.style.stroke = '#9ca3af';
      p.style.strokeWidth = '8';
      p.style.opacity = '0.4';
    });

    Object.entries(ID_TO_KEY).forEach(([id, key]) => {
      const el = svg.getElementById(id);
      if (!el) return;
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => onClickRef.current?.(key));
    });

    svg.querySelectorAll('metadata, sodipodi\\:namedview, defs, title, desc').forEach(el => el.remove());
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const svg = container.querySelector('svg');
    if (!svg) return;

    Object.entries(ID_TO_KEY).forEach(([id, key]) => {
      const el = svg.getElementById(id);
      if (!el) return;
      const paths = getPaths(el);

      const isClickable = clickableKeys.includes(key);
      const isSelected = key === selected;

      let fill = isClickable ? '#86efac' : '#e5e7eb';
      let stroke = isClickable ? '#15803d' : '#9ca3af';
      let strokeWidth = '8';
      let opacity = isClickable ? '1' : '0.5';
      let cursor = isClickable ? 'pointer' : 'default';

      if (isSelected) {
        fill = isCorrect ? '#22c55e' : '#ef4444';
        strokeWidth = '14';
      }

      paths.forEach(p => {
        p.style.fill = fill;
        p.style.stroke = stroke;
        p.style.strokeWidth = strokeWidth;
        p.style.opacity = opacity;
        p.style.cursor = cursor;
        p.style.transition = 'fill 0.3s, stroke 0.3s, opacity 0.3s';
      });
    });
  }, [selected, isCorrect, clickableKeys]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[360px] sm:max-w-[420px] max-h-[45vh] mx-auto [&>svg]:max-h-[45vh] [&>svg]:w-auto [&>svg]:mx-auto"
    />
  );
}

export { COUNTRY_NAMES, EASY_COUNTRIES, ALL_COUNTRIES };
