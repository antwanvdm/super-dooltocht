// Gestileerde Euro briefjes en munten componenten

// Briefje kleuren volgens echte euro's
const BILL_COLORS = {
  5: { bg: '#9CA3AF', text: '#1F2937' },     // Grijs
  10: { bg: '#F87171', text: '#FFFFFF' },    // Rood/roze
  20: { bg: '#60A5FA', text: '#FFFFFF' },    // Blauw
  50: { bg: '#FB923C', text: '#1F2937' },    // Oranje
  100: { bg: '#4ADE80', text: '#1F2937' },   // Groen
  200: { bg: '#FACC15', text: '#1F2937' },   // Geel
  500: { bg: '#A855F7', text: '#FFFFFF' },   // Paars
};

// Munt kleuren
const COIN_COLORS = {
  5: { outer: '#CD7F32', inner: '#CD7F32' },     // Koper (5 cent)
  10: { outer: '#CD7F32', inner: '#CD7F32' },    // Koper (10 cent)
  20: { outer: '#CD7F32', inner: '#CD7F32' },    // Koper (20 cent)
  50: { outer: '#CD7F32', inner: '#CD7F32' },    // Koper (50 cent)
  100: { outer: '#FFD700', inner: '#C0C0C0' },   // €1: gouden rand, zilveren midden
  200: { outer: '#C0C0C0', inner: '#FFD700' },   // €2: zilveren rand, gouden midden
};

// Euro briefje component
export function Bill({ value, size = 'md', onClick, selected, disabled }) {
  const colors = BILL_COLORS[value] || BILL_COLORS[5];
  
  const sizes = {
    sm: { width: 60, height: 32, textSize: 'text-xs', euroSize: 'text-[10px]' },
    md: { width: 90, height: 48, textSize: 'text-base', euroSize: 'text-xs' },
    lg: { width: 120, height: 64, textSize: 'text-xl', euroSize: 'text-sm' },
  };
  
  const s = sizes[size];
  const Tag = onClick ? 'button' : 'div';
  
  return (
    <Tag
      onClick={onClick}
      disabled={onClick ? disabled : undefined}
      className={`relative rounded-lg shadow-md transition-all ${
        onClick ? 'cursor-pointer hover:scale-105 hover:shadow-lg' : ''
      } ${selected ? 'ring-4 ring-yellow-400 scale-110' : ''} ${
        disabled && onClick ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      style={{
        width: s.width,
        height: s.height,
        backgroundColor: colors.bg,
      }}
    >
      {/* Decoratieve rand */}
      <div 
        className="absolute inset-1 rounded border-2 border-dashed"
        style={{ borderColor: colors.text + '40' }}
      />
      
      {/* Bedrag */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span 
          className={`font-bold ${s.textSize}`}
          style={{ color: colors.text }}
        >
          €{value}
        </span>
      </div>
    </Tag>
  );
}

// Euro munt component
export function Coin({ value, size = 'md', onClick, selected, disabled }) {
  const isCent = value < 100;
  const displayValue = isCent ? value : value / 100;
  const colors = COIN_COLORS[value] || COIN_COLORS[100];
  
  const sizes = {
    sm: { diameter: 32, textSize: 'text-xs', border: 3 },
    md: { diameter: 48, textSize: 'text-sm', border: 4 },
    lg: { diameter: 64, textSize: 'text-lg', border: 5 },
  };
  
  const s = sizes[size];
  const Tag = onClick ? 'button' : 'div';
  
  return (
    <Tag
      onClick={onClick}
      disabled={onClick ? disabled : undefined}
      className={`relative rounded-full shadow-md transition-all ${
        onClick ? 'cursor-pointer hover:scale-105 hover:shadow-lg' : ''
      } ${selected ? 'ring-4 ring-yellow-400 scale-110' : ''} ${
        disabled && onClick ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      style={{
        width: s.diameter,
        height: s.diameter,
        backgroundColor: colors.outer,
      }}
    >
      {/* Binnenste cirkel voor €1 en €2 */}
      <div 
        className="absolute rounded-full"
        style={{
          top: s.border,
          left: s.border,
          right: s.border,
          bottom: s.border,
          backgroundColor: colors.inner,
        }}
      />
      
      {/* Bedrag */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`font-bold ${s.textSize} text-gray-800 drop-shadow`}>
          {isCent ? `${displayValue}c` : `€${displayValue}`}
        </span>
      </div>
    </Tag>
  );
}

// Generieke geld component die automatisch briefje of munt kiest
export function Money({ value, size = 'md', onClick, selected, disabled }) {
  // Waarden in centen: briefjes zijn >= 500 cent (€5)
  if (value >= 500) {
    return <Bill value={value / 100} size={size} onClick={onClick} selected={selected} disabled={disabled} />;
  }
  return <Coin value={value} size={size} onClick={onClick} selected={selected} disabled={disabled} />;
}

export default Money;
