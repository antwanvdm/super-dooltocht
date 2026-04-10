// Inline SVG shapes for geometry minigames.
// Returns a clean vector shape instead of emoji for accurate representation.

const SHAPE_PATHS = {
  // ── 2D shapes ──────────────────────────────────────────
  driehoek: (
    <polygon points="50,5 95,90 5,90" fill="#38bdf8" stroke="#0284c7" strokeWidth="3" />
  ),
  vierkant: (
    <rect x="15" y="15" width="70" height="70" fill="#a78bfa" stroke="#7c3aed" strokeWidth="3" />
  ),
  rechthoek: (
    <rect x="5" y="25" width="90" height="50" fill="#34d399" stroke="#059669" strokeWidth="3" rx="2" />
  ),
  cirkel: (
    <circle cx="50" cy="50" r="42" fill="#fb923c" stroke="#ea580c" strokeWidth="3" />
  ),
  ovaal: (
    <ellipse cx="50" cy="50" rx="45" ry="30" fill="#f472b6" stroke="#db2777" strokeWidth="3" />
  ),
  ruit: (
    <polygon points="50,5 95,50 50,95 5,50" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
  ),
  parallellogram: (
    <polygon points="25,15 95,15 75,85 5,85" fill="#2dd4bf" stroke="#0d9488" strokeWidth="3" />
  ),
  trapezium: (
    <polygon points="30,15 70,15 95,85 5,85" fill="#c084fc" stroke="#9333ea" strokeWidth="3" />
  ),
  vijfhoek: (
    <polygon points="50,5 97,35 80,90 20,90 3,35" fill="#60a5fa" stroke="#2563eb" strokeWidth="3" />
  ),
  zeshoek: (
    <polygon points="50,5 93,27 93,73 50,95 7,73 7,27" fill="#4ade80" stroke="#16a34a" strokeWidth="3" />
  ),
  achthoek: (
    <polygon points="35,5 65,5 92,28 92,62 65,92 35,92 8,62 8,28" fill="#f87171" stroke="#dc2626" strokeWidth="3" />
  ),
  ster: (
    <polygon points="50,5 61,35 95,35 68,55 79,90 50,68 21,90 32,55 5,35 39,35" fill="#fbbf24" stroke="#d97706" strokeWidth="3" />
  ),

  // ── 3D shapes ──────────────────────────────────────────
  kubus: (
    <g>
      {/* Front face */}
      <rect x="15" y="30" width="50" height="50" fill="#a78bfa" stroke="#7c3aed" strokeWidth="2.5" />
      {/* Top face */}
      <polygon points="15,30 40,10 90,10 65,30" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2.5" />
      {/* Right face */}
      <polygon points="65,30 90,10 90,60 65,80" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2.5" />
    </g>
  ),
  balk: (
    <g>
      {/* Front face */}
      <rect x="10" y="35" width="60" height="45" fill="#34d399" stroke="#059669" strokeWidth="2.5" />
      {/* Top face */}
      <polygon points="10,35 35,15 95,15 70,35" fill="#6ee7b7" stroke="#059669" strokeWidth="2.5" />
      {/* Right face */}
      <polygon points="70,35 95,15 95,60 70,80" fill="#10b981" stroke="#059669" strokeWidth="2.5" />
    </g>
  ),
  bol: (
    <g>
      <circle cx="50" cy="50" r="40" fill="#fb923c" stroke="#ea580c" strokeWidth="2.5" />
      <ellipse cx="50" cy="50" rx="40" ry="12" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="4 3" />
      <ellipse cx="50" cy="50" rx="12" ry="40" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="4 3" />
    </g>
  ),
  cilinder: (
    <g>
      {/* Body */}
      <rect x="15" y="25" width="70" height="50" fill="#60a5fa" stroke="#2563eb" strokeWidth="2.5" />
      {/* Bottom ellipse */}
      <ellipse cx="50" cy="75" rx="35" ry="12" fill="#3b82f6" stroke="#2563eb" strokeWidth="2.5" />
      {/* Top ellipse */}
      <ellipse cx="50" cy="25" rx="35" ry="12" fill="#93c5fd" stroke="#2563eb" strokeWidth="2.5" />
    </g>
  ),
  kegel: (
    <g>
      {/* Cone body */}
      <polygon points="50,10 85,80 15,80" fill="#f472b6" stroke="#db2777" strokeWidth="2.5" />
      {/* Base ellipse */}
      <ellipse cx="50" cy="80" rx="35" ry="12" fill="#ec4899" stroke="#db2777" strokeWidth="2.5" />
    </g>
  ),
};

/**
 * Renders an SVG shape by key.
 * @param {{ shape: string, size?: number, className?: string }} props
 */
export default function ShapeSVG({ shape, size = 80, className = '' }) {
  const content = SHAPE_PATHS[shape];
  if (!content) return null;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-label={shape}
      role="img"
    >
      {content}
    </svg>
  );
}
