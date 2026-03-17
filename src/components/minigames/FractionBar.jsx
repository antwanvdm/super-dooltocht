/**
 * FractionBar – Visuele weergave van een breuk als een balk verdeeld in delen.
 * Geeft `numerator` van `denominator` delen een kleur.
 */
function FractionBar({ numerator, denominator, color = '#6366f1', size = 'md' }) {
  const h = size === 'sm' ? 'h-6' : size === 'lg' ? 'h-12' : 'h-8';

  return (
    <div className={`flex ${h} rounded-lg overflow-hidden border-2 border-gray-400 w-full`}>
      {Array.from({ length: denominator }, (_, i) => (
        <div
          key={i}
          className={`flex-1 ${i > 0 ? 'border-l border-gray-400' : ''}`}
          style={{ backgroundColor: i < numerator ? color : '#e5e7eb' }}
        />
      ))}
    </div>
  );
}

/**
 * FractionText – Toont een breuk als teller/noemer
 */
function FractionText({ numerator, denominator, className = '' }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className="border-b border-current px-1 text-center">{numerator}</span>
      <span className="px-1 text-center">{denominator}</span>
    </span>
  );
}

export { FractionBar, FractionText };
export default FractionBar;
