import { useRef, useEffect } from 'react';
import continentsSvg from '../topo-maps/continents.svg?raw';

const ID_TO_KEY = {
  'europe': 'europa',
  'asia': 'azie',
  'africa': 'afrika',
  'northAmerica': 'noordAmerika',
  'southAmerica': 'zuidAmerika',
  'oceania': 'oceanie',
  'antarctica': 'antarctica',
};

const CONTINENT_NAMES = {
  europa: 'Europa',
  azie: 'Azië',
  afrika: 'Afrika',
  noordAmerika: 'Noord-Amerika',
  zuidAmerika: 'Zuid-Amerika',
  oceanie: 'Oceanië',
  antarctica: 'Antarctica',
};

const ALL_CONTINENTS = Object.keys(CONTINENT_NAMES);

function getPaths(el) {
  if (!el) return [];
  return el.tagName === 'path' ? [el] : [...el.querySelectorAll('path')];
}

export default function WorldMap({ selected, isCorrect, onClick }) {
  const containerRef = useRef(null);
  const onClickRef = useRef(onClick);
  onClickRef.current = onClick;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = continentsSvg;

    const svg = container.querySelector('svg');
    if (!svg) return;

    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.removeAttribute('style');
    svg.setAttribute('viewBox', '-2 17.75 964 780');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Wereldkaart');

    Object.entries(ID_TO_KEY).forEach(([id, key]) => {
      const el = svg.getElementById(id);
      if (!el) return;
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => onClickRef.current?.(key));
    });

    svg.querySelectorAll('metadata').forEach(el => el.remove());
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

      const isSelected = key === selected;

      let fill = '#86efac';
      let stroke = '#15803d';
      let strokeWidth = '1';

      if (isSelected) {
        fill = isCorrect ? '#22c55e' : '#ef4444';
        strokeWidth = '2';
      }

      paths.forEach(p => {
        p.style.fill = fill;
        p.style.stroke = stroke;
        p.style.strokeWidth = strokeWidth;
        p.style.transition = 'fill 0.3s, stroke 0.3s';
      });
    });
  }, [selected, isCorrect]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[400px] sm:max-w-[480px] max-h-[40vh] mx-auto [&>svg]:max-h-[40vh] [&>svg]:w-auto [&>svg]:mx-auto"
    />
  );
}

export { CONTINENT_NAMES, ALL_CONTINENTS };
