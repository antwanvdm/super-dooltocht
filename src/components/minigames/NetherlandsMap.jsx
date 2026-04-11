import { useRef, useEffect, useCallback } from 'react';
import nederlandSvg from '../topo-maps/nederland.svg?raw';

// Map SVG element id → internal province key
const ID_TO_KEY = {
  'Groningen': 'groningen',
  'Friesland': 'friesland',
  'Drenthe': 'drenthe',
  'Overijssel': 'overijssel',
  'Flevoland': 'flevoland',
  'Gelderland': 'gelderland',
  'Utrecht': 'utrecht',
  'Noord-Holland': 'noordHolland',
  'Zuid-Holland': 'zuidHolland',
  'Zeeland': 'zeeland',
  'Noord-Brabant': 'noordBrabant',
  'Limburg': 'limburg',
};
const KEY_TO_ID = Object.fromEntries(Object.entries(ID_TO_KEY).map(([id, key]) => [key, id]));

const PROVINCE_NAMES = {
  groningen: 'Groningen',
  friesland: 'Friesland',
  drenthe: 'Drenthe',
  overijssel: 'Overijssel',
  flevoland: 'Flevoland',
  gelderland: 'Gelderland',
  utrecht: 'Utrecht',
  noordHolland: 'Noord-Holland',
  zuidHolland: 'Zuid-Holland',
  zeeland: 'Zeeland',
  noordBrabant: 'Noord-Brabant',
  limburg: 'Limburg',
};

// Approximate label centers in the SVG coordinate space (200×236)
const PROVINCE_CENTERS = {
  groningen: { x: 175, y: 25 },
  friesland: { x: 132, y: 24 },
  drenthe: { x: 173, y: 56 },
  overijssel: { x: 165, y: 100 },
  flevoland: { x: 125, y: 98 },
  gelderland: { x: 140, y: 134 },
  utrecht: { x: 102, y: 120 },
  noordHolland: { x: 78, y: 82 },
  zuidHolland: { x: 78, y: 136 },
  zeeland: { x: 78, y: 162 },
  noordBrabant: { x: 130, y: 162 },
  limburg: { x: 140, y: 200 },
};

/** Get all <path> descendants of an SVG element (or the element itself). */
function getPaths(el) {
  if (!el) return [];
  return el.tagName === 'path' ? [el] : [...el.querySelectorAll('path')];
}

/**
 * Interactive SVG map of the Netherlands using a detailed province SVG.
 * The correct target province is NOT highlighted before clicking.
 */
export default function NetherlandsMap({ target, selected, isCorrect, correct = [], onClick, showLabels = false }) {
  const containerRef = useRef(null);
  const onClickRef = useRef(onClick);
  onClickRef.current = onClick;

  // Inject SVG once
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = nederlandSvg;

    const svg = container.querySelector('svg');
    if (!svg) return;

    // Make responsive
    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.removeAttribute('style');
    svg.setAttribute('viewBox', '0 0 200 236');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Kaart van Nederland');

    // Add click handlers to provinces
    Object.entries(ID_TO_KEY).forEach(([id, key]) => {
      const el = svg.getElementById(id);
      if (!el) return;
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => onClickRef.current?.(key));
    });

    // Remove Inkscape metadata elements that are not needed
    svg.querySelectorAll('metadata, sodipodi\\:namedview, defs').forEach(el => el.remove());
  }, []);

  // Update province styles on every prop change
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const svg = container.querySelector('svg');
    if (!svg) return;

    Object.entries(ID_TO_KEY).forEach(([id, key]) => {
      const el = svg.getElementById(id);
      if (!el) return;
      const paths = getPaths(el);

      const isDone = correct.includes(key);
      const isSelected = key === selected;

      // Default: neutral green, no highlighting of the target
      let fill = '#86efac';
      let stroke = '#15803d';
      let strokeWidth = '1';
      let opacity = '1';
      let cursor = 'pointer';

      if (isDone) {
        fill = '#d1d5db';
        stroke = '#9ca3af';
        opacity = '0.6';
        cursor = 'default';
      } else if (isSelected) {
        fill = isCorrect ? '#22c55e' : '#ef4444';
        strokeWidth = '2';
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

    // Add/remove labels
    const existingLabels = svg.querySelectorAll('.province-label');
    existingLabels.forEach(el => el.remove());

    if (showLabels) {
      Object.entries(PROVINCE_CENTERS).forEach(([key, pos]) => {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', pos.x);
        text.setAttribute('y', pos.y);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '5');
        text.setAttribute('font-weight', '600');
        text.setAttribute('fill', '#1e293b');
        text.setAttribute('class', 'province-label');
        text.style.pointerEvents = 'none';
        text.style.userSelect = 'none';
        text.textContent = PROVINCE_NAMES[key];
        svg.appendChild(text);
      });
    }
  }, [target, selected, isCorrect, correct, showLabels]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[280px] sm:max-w-[320px] max-h-[45vh] mx-auto [&>svg]:max-h-[45vh] [&>svg]:w-auto [&>svg]:mx-auto"
    />
  );
}

export { PROVINCE_NAMES };
