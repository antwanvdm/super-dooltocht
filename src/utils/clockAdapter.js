// ============================================
// KLOKKIJKEN OEFENINGEN
// ============================================

const randBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Genereer een random kloktijd op basis van niveau
export const generateClockTime = (level) => {
  const hours = randBetween(1, 12);

  let minutes;
  switch (level) {
    case 'hours':
      minutes = 0;
      break;
    case 'halfHours':
      minutes = [0, 30][Math.floor(Math.random() * 2)];
      break;
    case 'quarters':
      minutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
      break;
    case 'fiveMinutes':
      minutes = Math.floor(Math.random() * 12) * 5;
      break;
    case 'minutes':
    default:
      minutes = randBetween(0, 59);
      break;
  }

  return { hours, minutes };
};

// Converteer tijd naar Nederlands woordformaat
// Nederlandse conventie:
//   :00 → "X uur"
//   :01-:14 → "X over Y" (minuten over huidig uur)
//   :15 → "kwart over Y"
//   :16-:29 → "X voor half Z" (minuten tot half, Z = volgend uur)
//   :30 → "half Z"
//   :31-:44 → "X over half Z"
//   :45 → "kwart voor Z"
//   :46-:59 → "X voor Z" (minuten tot volgend uur)
export const timeToWords = (hours, minutes) => {
  const nextHour = hours === 12 ? 1 : hours + 1;

  if (minutes === 0) return `${numberToWord(hours)} uur`;
  if (minutes === 15) return `kwart over ${numberToWord(hours)}`;
  if (minutes === 30) return `half ${numberToWord(nextHour)}`;
  if (minutes === 45) return `kwart voor ${numberToWord(nextHour)}`;

  if (minutes < 15) {
    return `${numberToWord(minutes)} over ${numberToWord(hours)}`;
  }
  if (minutes < 30) {
    return `${numberToWord(30 - minutes)} voor half ${numberToWord(nextHour)}`;
  }
  if (minutes < 45) {
    return `${numberToWord(minutes - 30)} over half ${numberToWord(nextHour)}`;
  }
  // minutes > 45
  return `${numberToWord(60 - minutes)} voor ${numberToWord(nextHour)}`;
};

// Helper: getal naar Nederlands woord (1-14)
const numberToWord = (n) => {
  const words = [
    '',
    'één',
    'twee',
    'drie',
    'vier',
    'vijf',
    'zes',
    'zeven',
    'acht',
    'negen',
    'tien',
    'elf',
    'twaalf',
    'dertien',
    'veertien',
  ];
  return words[n] || String(n);
};

// Formatteer digitale tijd (12-uurs notatie, altijd met zero-padding)
export const formatDigital = (hours, minutes) => {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

// Formatteer digitale tijd in 24-uurs notatie
export const formatDigital24 = (hours24, minutes) => {
  return `${hours24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

// Converteer 12-uurs naar random 24-uurs variant (ochtend of middag)
export const to24h = (hours12) => {
  // Geeft een random keuze: ochtend (=zelfde) of middag (+12)
  // Speciale gevallen: 12 → 00:xx of 12:xx
  if (hours12 === 12) {
    return Math.random() < 0.5 ? 0 : 12;
  }
  return Math.random() < 0.5 ? hours12 : hours12 + 12;
};

// Dagdeel tekst op basis van 24-uurs uur
export const dagdeel = (hours24) => {
  if (hours24 >= 0 && hours24 < 6) return "'s nachts";
  if (hours24 >= 6 && hours24 < 12) return "'s ochtends";
  if (hours24 >= 12 && hours24 < 18) return "'s middags";
  return "'s avonds";
};

// Genereer foute kloktijden die plausibel zijn
export const generateWrongClockTimes = (
  correctHours,
  correctMinutes,
  level,
  count = 3,
) => {
  const wrongTimes = new Set();
  const correctKey = `${correctHours}:${correctMinutes}`;
  let attempts = 0;

  while (wrongTimes.size < count && attempts < 100) {
    attempts++;
    let h = correctHours;
    let m = correctMinutes;
    const variation = Math.floor(Math.random() * 5);

    switch (variation) {
      case 0: // Verkeerd uur
        h = randBetween(1, 12);
        break;
      case 1: // Verwisselde wijzers (klassieke fout)
        if (correctMinutes <= 12 && correctMinutes > 0) {
          h = correctMinutes;
          m = correctHours * 5;
          if (m >= 60) m = m % 60;
        } else {
          h = randBetween(1, 12);
        }
        break;
      case 2: // ±1 uur
        h = correctHours + (Math.random() < 0.5 ? 1 : -1);
        if (h > 12) h = 1;
        if (h < 1) h = 12;
        break;
      case 3: // ±kwartier/half uur
        m = correctMinutes + (Math.random() < 0.5 ? 15 : -15);
        if (m < 0) m += 60;
        if (m >= 60) {
          m -= 60;
          h = h === 12 ? 1 : h + 1;
        }
        break;
      case 4: // ±5 minuten
        m = correctMinutes + (Math.random() < 0.5 ? 5 : -5);
        if (m < 0) m += 60;
        if (m >= 60) {
          m -= 60;
          h = h === 12 ? 1 : h + 1;
        }
        break;
    }

    // Snap naar het juiste niveau
    m = snapMinutesToLevel(m, level);

    const key = `${h}:${m}`;
    if (key !== correctKey && h >= 1 && h <= 12 && m >= 0 && m < 60) {
      wrongTimes.add(key);
    }
  }

  // Fallback als we niet genoeg hebben
  let fallbackH = 1;
  while (wrongTimes.size < count) {
    const key = `${fallbackH}:${correctMinutes}`;
    if (key !== correctKey) wrongTimes.add(key);
    fallbackH++;
  }

  return Array.from(wrongTimes)
    .slice(0, count)
    .map((key) => {
      const [h, m] = key.split(':').map(Number);
      return { hours: h, minutes: m };
    });
};

// Snap minuten naar het dichtstbijzijnde geldige punt voor het niveau
const snapMinutesToLevel = (minutes, level) => {
  switch (level) {
    case 'hours':
      return 0;
    case 'halfHours':
      return minutes >= 45 || minutes < 15 ? 0 : 30;
    case 'quarters':
      return (Math.round(minutes / 15) * 15) % 60;
    case 'fiveMinutes':
      return (Math.round(minutes / 5) * 5) % 60;
    default:
      return minutes;
  }
};

// Genereer een klokprobleem
const _generateClockProblem = (settings) => {
  const clockLevel = settings?.clockLevel || 'hours';
  const clock24h = settings?.clock24h || false;
  const { hours, minutes } = generateClockTime(clockLevel);
  const hours24 = to24h(hours);

  return {
    hours, // 1-12
    hours24, // 0-23 (random ochtend/middag variant)
    minutes,
    digital: formatDigital(hours, minutes),
    digital24: formatDigital24(hours24, minutes),
    words: timeToWords(hours, minutes),
    dagdeel: dagdeel(hours24),
    use24h: clock24h,
    level: clockLevel,
    type: 'clock',
  };
};

export const generateClockProblem = _generateClockProblem;

// Genereer meerdere unieke kloktijden
export const generateUniqueClockProblems = (settings, count = 4) => {
  const problems = [];
  const seen = new Set();
  let attempts = 0;

  while (problems.length < count && attempts < count * 20) {
    attempts++;
    const problem = _generateClockProblem(settings);
    const key = `${problem.hours}:${problem.minutes}`;
    if (!seen.has(key)) {
      seen.add(key);
      problems.push(problem);
    }
  }

  // Fallback
  while (problems.length < count) {
    problems.push(generateClockProblem(settings));
  }

  return problems;
};
