/**
 * AnalogClock - SVG analoge klok component
 * Toont een klok met uur- en minutenwijzers op basis van hours/minutes props.
 * Strak en herkenbaar ontwerp voor kinderen.
 */
function AnalogClock({ hours, minutes, size = 200, className = '' }) {
  const center = 50;
  const radius = 45;

  // Bereken hoeken (in graden, 0° = 12 uur, kloksgewijze)
  const minuteAngle = (minutes / 60) * 360;
  const hourAngle = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

  // Converteer hoek naar SVG lijn-coördinaten
  const polarToXY = (angle, length) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: center + length * Math.cos(rad),
      y: center + length * Math.sin(rad),
    };
  };

  const hourEnd = polarToXY(hourAngle, 25);
  const minuteEnd = polarToXY(minuteAngle, 35);

  // Minuutstreepjes
  const ticks = [];
  for (let i = 0; i < 60; i++) {
    const angle = (i / 60) * 360;
    const isHour = i % 5 === 0;
    const outerR = radius - 1;
    const innerR = isHour ? radius - 6 : radius - 3;
    const outer = polarToXY(angle, outerR);
    const inner = polarToXY(angle, innerR);
    ticks.push(
      <line
        key={`tick-${i}`}
        x1={inner.x}
        y1={inner.y}
        x2={outer.x}
        y2={outer.y}
        stroke={isHour ? '#374151' : '#9CA3AF'}
        strokeWidth={isHour ? 1.5 : 0.5}
        strokeLinecap="round"
      />
    );
  }

  // Cijfers 1-12
  const numbers = [];
  for (let i = 1; i <= 12; i++) {
    const angle = (i / 12) * 360;
    const pos = polarToXY(angle, radius - 12);
    numbers.push(
      <text
        key={`num-${i}`}
        x={pos.x}
        y={pos.y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="7"
        fontWeight="bold"
        fill="#374151"
        fontFamily="system-ui, sans-serif"
      >
        {i}
      </text>
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`Klok die ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} aanwijst`}
    >
      {/* Klok achtergrond */}
      <circle cx={center} cy={center} r={radius} fill="white" stroke="#374151" strokeWidth="2" />

      {/* Streepjes */}
      {ticks}

      {/* Cijfers */}
      {numbers}

      {/* Uurwijzer (kort en dik) */}
      <line
        x1={center}
        y1={center}
        x2={hourEnd.x}
        y2={hourEnd.y}
        stroke="#1F2937"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Minutenwijzer (lang en dunner) */}
      <line
        x1={center}
        y1={center}
        x2={minuteEnd.x}
        y2={minuteEnd.y}
        stroke="#3B82F6"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Middenpunt */}
      <circle cx={center} cy={center} r="2.5" fill="#1F2937" />
      <circle cx={center} cy={center} r="1" fill="#3B82F6" />
    </svg>
  );
}

export default AnalogClock;
