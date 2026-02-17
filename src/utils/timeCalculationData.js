// Data en generators voor "Rekenen met tijd"
// Levels: wholeHours, halfHours, quarters, minutes, daysWeeks

import { DAGEN } from './timeAwarenessData';

// ==========================================
// Helper functions
// ==========================================

/**
 * Format time as HH:MM with zero-padded hours (e.g., "03:00", "10:45")
 * @param {boolean} use24h - If true, use 24h notation (e.g., 15:00 instead of 03:00)
 */
export function formatTime(hours, minutes = 0, use24h = false) {
  let h = ((hours % 24) + 24) % 24;
  if (!use24h && h > 12) h -= 12;
  if (!use24h && h === 0) h = 12;
  return `${String(h).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

/**
 * Add minutes to a time, returning [newHours, newMinutes]
 */
export function addMinutes(hours, minutes, addMin) {
  let totalMin = hours * 60 + minutes + addMin;
  totalMin = ((totalMin % (24 * 60)) + 24 * 60) % (24 * 60);
  return [Math.floor(totalMin / 60), totalMin % 60];
}

/**
 * Format a duration in minutes as readable text
 */
export function formatDuration(totalMinutes) {
  if (totalMinutes >= 60 && totalMinutes % 60 === 0) {
    return `${totalMinutes / 60} uur`;
  }
  if (totalMinutes >= 60) {
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return `${hours} uur en ${mins} min`;
  }
  return `${totalMinutes} min`;
}

// ==========================================
// Wrong answer generators
// ==========================================

function generateWrongTimes(correctH, correctM, count, level, use24h = false) {
  const correct = formatTime(correctH, correctM, use24h);
  const wrongs = new Set();

  let offsets;
  if (level === 'wholeHours') {
    offsets = [60, -60, 120, -120, 180, -180];
  } else if (level === 'halfHours') {
    offsets = [30, -30, 60, -60, 90, -90, 120];
  } else if (level === 'quarters') {
    offsets = [15, -15, 30, -30, 45, -45, 60, -60];
  } else {
    // minutes: smaller offsets
    offsets = [5, -5, 10, -10, 15, -15, 20, -20, 30, -30];
  }

  offsets.sort(() => Math.random() - 0.5);

  for (const off of offsets) {
    if (wrongs.size >= count) break;
    const [h, m] = addMinutes(correctH, correctM, off);
    const formatted = formatTime(h, m, use24h);
    if (formatted !== correct && !wrongs.has(formatted)) {
      wrongs.add(formatted);
    }
  }

  return [...wrongs].slice(0, count);
}

function generateWrongDurations(correctMinutes, count, level) {
  const correct = formatDuration(correctMinutes);
  const wrongs = new Set();

  let offsets;
  if (level === 'wholeHours') {
    offsets = [60, -60, 120, -120, 180];
  } else if (level === 'halfHours') {
    offsets = [30, -30, 60, -60, 90, -90];
  } else if (level === 'quarters') {
    offsets = [15, -15, 30, -30, 45, -45, 60, -60];
  } else {
    // minutes: smaller offsets
    offsets = [5, -5, 10, -10, 15, -15, 20, -20, 30, -30];
  }

  offsets.sort(() => Math.random() - 0.5);

  for (const off of offsets) {
    if (wrongs.size >= count) break;
    const newMin = correctMinutes + off;
    if (newMin > 0) {
      const formatted = formatDuration(newMin);
      if (formatted !== correct && !wrongs.has(formatted)) {
        wrongs.add(formatted);
      }
    }
  }

  return [...wrongs].slice(0, count);
}

// ==========================================
// KlokVooruit - MC: Hoe laat is het over X?
// ==========================================

function generateTimeForwardQuestion(level, use24h = false) {
  const isForward = Math.random() > 0.3;

  let startH, startM, durationMin, durationText;

  if (level === 'wholeHours') {
    startH = 7 + Math.floor(Math.random() * 11); // 7-17
    startM = 0;
    const durationHours = 1 + Math.floor(Math.random() * 5);
    durationMin = durationHours * 60;
    durationText = `${durationHours} uur`;
  } else if (level === 'halfHours') {
    startH = 7 + Math.floor(Math.random() * 11);
    startM = Math.random() > 0.5 ? 0 : 30;
    const options = [30, 60, 90, 120];
    durationMin = options[Math.floor(Math.random() * options.length)];
    if (durationMin === 30) durationText = '30 minuten';
    else if (durationMin === 60) durationText = '1 uur';
    else if (durationMin === 90) durationText = 'anderhalf uur';
    else durationText = '2 uur';
  } else if (level === 'quarters') {
    startH = 7 + Math.floor(Math.random() * 11);
    const startOptions = [0, 15, 30, 45];
    startM = startOptions[Math.floor(Math.random() * startOptions.length)];
    const durOptions = [15, 30, 45];
    durationMin = durOptions[Math.floor(Math.random() * durOptions.length)];
    durationText = `${durationMin} minuten`;
  } else {
    // minutes
    startH = 7 + Math.floor(Math.random() * 11);
    startM = Math.floor(Math.random() * 60);
    const durOptions = [5, 10, 15, 20, 25, 35, 40, 50];
    durationMin = durOptions[Math.floor(Math.random() * durOptions.length)];
    durationText = `${durationMin} minuten`;
  }

  const actualDuration = isForward ? durationMin : -durationMin;
  const [ansH, ansM] = addMinutes(startH, startM, actualDuration);
  const answer = formatTime(ansH, ansM, use24h);

  const question = isForward
    ? `Het is ${formatTime(startH, startM, use24h)}. Hoe laat is het over ${durationText}?`
    : `Het is ${formatTime(startH, startM, use24h)}. Hoe laat was het ${durationText} geleden?`;

  const wrongAnswers = generateWrongTimes(ansH, ansM, 3, level, use24h);

  return { question, answer, wrongAnswers };
}

function generateDayForwardQuestion() {
  const startIdx = Math.floor(Math.random() * 7);
  const isForward = Math.random() > 0.3;
  const duration = 1 + Math.floor(Math.random() * 6);

  const ansIdx = isForward
    ? (startIdx + duration) % 7
    : (((startIdx - duration) % 7) + 7) % 7;

  const answer = DAGEN[ansIdx];
  const question = isForward
    ? `Het is ${DAGEN[startIdx]}. Welke dag is het over ${duration} ${duration === 1 ? 'dag' : 'dagen'}?`
    : `Het is ${DAGEN[startIdx]}. Welke dag was het ${duration} ${duration === 1 ? 'dag' : 'dagen'} geleden?`;

  const wrongAnswers = DAGEN.filter((d) => d !== answer)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return { question, answer, wrongAnswers };
}

/**
 * Genereer een KlokVooruit-vraag (MC).
 * @param {string} level - 'wholeHours' | 'halfHours' | 'quarters' | 'minutes' | 'daysWeeks'
 * @param {boolean} use24h - Use 24-hour notation
 * @returns {{ question: string, answer: string, wrongAnswers: string[] }}
 */
export function generateKlokVooruitQuestion(
  level = 'wholeHours',
  use24h = false,
) {
  if (level === 'daysWeeks') {
    return generateDayForwardQuestion();
  }
  return generateTimeForwardQuestion(level, use24h);
}

// ==========================================
// KlokRekenen - MC met analoge klok
// ==========================================

/**
 * Genereer een KlokRekenen-vraag: analoge klok + tijd optellen/aftrekken.
 * Geeft startH/startM apart terug zodat de component de klok kan tonen.
 * Alleen voor klokniveaus (niet daysWeeks).
 * @param {string} level - 'wholeHours' | 'halfHours' | 'quarters' | 'minutes'
 * @param {boolean} use24h - Use 24-hour notation for answers
 * @returns {{ startH: number, startM: number, durationText: string, isForward: boolean, answer: string, wrongAnswers: string[] }}
 */
export function generateKlokRekenenQuestion(
  level = 'wholeHours',
  use24h = false,
) {
  const isForward = Math.random() > 0.3;

  let startH, startM, durationMin, durationText;

  if (level === 'wholeHours') {
    startH = 1 + Math.floor(Math.random() * 12); // 1-12 (analoge klok)
    startM = 0;
    const durationHours = 1 + Math.floor(Math.random() * 5);
    durationMin = durationHours * 60;
    durationText = `${durationHours} uur`;
  } else if (level === 'halfHours') {
    startH = 1 + Math.floor(Math.random() * 12);
    startM = Math.random() > 0.5 ? 0 : 30;
    const options = [30, 60, 90, 120];
    durationMin = options[Math.floor(Math.random() * options.length)];
    if (durationMin === 30) durationText = '30 minuten';
    else if (durationMin === 60) durationText = '1 uur';
    else if (durationMin === 90) durationText = 'anderhalf uur';
    else durationText = '2 uur';
  } else if (level === 'quarters') {
    startH = 1 + Math.floor(Math.random() * 12);
    const startOptions = [0, 15, 30, 45];
    startM = startOptions[Math.floor(Math.random() * startOptions.length)];
    const durOptions = [15, 30, 45];
    durationMin = durOptions[Math.floor(Math.random() * durOptions.length)];
    durationText = `${durationMin} minuten`;
  } else {
    // minutes
    startH = 1 + Math.floor(Math.random() * 12);
    startM = Math.floor(Math.random() * 60);
    const durOptions = [5, 10, 15, 20, 25, 35, 40, 50];
    durationMin = durOptions[Math.floor(Math.random() * durOptions.length)];
    durationText = `${durationMin} minuten`;
  }

  const actualDuration = isForward ? durationMin : -durationMin;
  const [ansH, ansM] = addMinutes(startH, startM, actualDuration);
  const answer = formatTime(ansH, ansM, use24h);
  const wrongAnswers = generateWrongTimes(ansH, ansM, 3, level, use24h);

  return { startH, startM, durationText, isForward, answer, wrongAnswers };
}

// ==========================================
// TijdsduurQuiz - MC: Hoe lang duurt het?
// ==========================================

function generateTimeDurationQuestion(level, use24h = false) {
  let startH, startM, durationMin;

  if (level === 'wholeHours') {
    startH = 7 + Math.floor(Math.random() * 11);
    startM = 0;
    durationMin = (1 + Math.floor(Math.random() * 5)) * 60;
  } else if (level === 'halfHours') {
    startH = 7 + Math.floor(Math.random() * 11);
    startM = Math.random() > 0.5 ? 0 : 30;
    const options = [30, 60, 90, 120, 150];
    durationMin = options[Math.floor(Math.random() * options.length)];
  } else if (level === 'quarters') {
    startH = 7 + Math.floor(Math.random() * 11);
    const startOpts = [0, 15, 30, 45];
    startM = startOpts[Math.floor(Math.random() * startOpts.length)];
    const durOpts = [15, 30, 45, 60, 75, 90];
    durationMin = durOpts[Math.floor(Math.random() * durOpts.length)];
  } else {
    // minutes
    startH = 7 + Math.floor(Math.random() * 11);
    startM = Math.floor(Math.random() * 60);
    const durOpts = [5, 10, 15, 20, 25, 35, 40, 50];
    durationMin = durOpts[Math.floor(Math.random() * durOpts.length)];
  }

  const [endH, endM] = addMinutes(startH, startM, durationMin);
  const answer = formatDuration(durationMin);
  const question = `Hoe lang duurt het van ${formatTime(startH, startM, use24h)} tot ${formatTime(endH, endM, use24h)}?`;
  const wrongAnswers = generateWrongDurations(durationMin, 3, level);

  return { question, answer, wrongAnswers };
}

function generateDayDurationQuestion() {
  if (Math.random() > 0.5) {
    // Dagen tellen
    const startIdx = Math.floor(Math.random() * 7);
    const duration = 1 + Math.floor(Math.random() * 6);
    const endIdx = (startIdx + duration) % 7;

    const answer = `${duration} ${duration === 1 ? 'dag' : 'dagen'}`;
    const question = `Hoeveel dagen is het van ${DAGEN[startIdx]} tot ${DAGEN[endIdx]}?`;

    const wrongs = [1, 2, 3, 4, 5, 6]
      .filter((d) => d !== duration)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((d) => `${d} ${d === 1 ? 'dag' : 'dagen'}`);

    return { question, answer, wrongAnswers: wrongs };
  } else {
    // Weken omrekenen
    const weeks = 1 + Math.floor(Math.random() * 4);
    const days = weeks * 7;

    const question = `Hoeveel dagen zitten er in ${weeks} ${weeks === 1 ? 'week' : 'weken'}?`;
    const answer = `${days} dagen`;

    const wrongs = [1, 2, 3, 4]
      .filter((w) => w !== weeks)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((w) => `${w * 7} dagen`);

    return { question, answer, wrongAnswers: wrongs };
  }
}

/**
 * Genereer een TijdsduurQuiz-vraag (MC).
 * @param {string} level - 'wholeHours' | 'halfHours' | 'quarters' | 'minutes' | 'daysWeeks'
 * @param {boolean} use24h - Use 24-hour notation
 * @returns {{ question: string, answer: string, wrongAnswers: string[] }}
 */
export function generateTijdsduurQuestion(
  level = 'wholeHours',
  use24h = false,
) {
  if (level === 'daysWeeks') {
    return generateDayDurationQuestion();
  }
  return generateTimeDurationQuestion(level, use24h);
}

// ==========================================
// OmrekenMemory - Memory: koppel tijdseenheden
// ==========================================

const CONVERSION_PAIRS = {
  wholeHours: [
    { content: '1 uur', matchContent: '60 min' },
    { content: '2 uur', matchContent: '120 min' },
    { content: '3 uur', matchContent: '180 min' },
    { content: 'half uur', matchContent: '30 min' },
    { content: '4 uur', matchContent: '240 min' },
    { content: '5 uur', matchContent: '300 min' },
  ],
  halfHours: [
    { content: '1,5 uur', matchContent: '90 min' },
    { content: '2,5 uur', matchContent: '150 min' },
    { content: 'half uur', matchContent: '30 min' },
    { content: '1 uur', matchContent: '60 min' },
    { content: '2 uur', matchContent: '120 min' },
    { content: '3 uur', matchContent: '180 min' },
  ],
  quarters: [
    { content: 'kwartier', matchContent: '15 min' },
    { content: '3 kwartier', matchContent: '45 min' },
    { content: 'half uur', matchContent: '30 min' },
    { content: '1 uur', matchContent: '60 min' },
    { content: '1,5 uur', matchContent: '90 min' },
    { content: '2 uur', matchContent: '120 min' },
  ],
  minutes: [
    { content: '20 min', matchContent: '⅓ uur' },
    { content: '40 min', matchContent: '⅔ uur' },
    { content: 'kwartier', matchContent: '15 min' },
    { content: 'half uur', matchContent: '30 min' },
    { content: '1 uur', matchContent: '60 min' },
    { content: '10 min', matchContent: '600 sec' },
  ],
  daysWeeks: [
    { content: '1 week', matchContent: '7 dagen' },
    { content: '2 weken', matchContent: '14 dagen' },
    { content: '3 weken', matchContent: '21 dagen' },
    { content: '1 dag', matchContent: '24 uur' },
    { content: '4 weken', matchContent: '28 dagen' },
    { content: 'halve dag', matchContent: '12 uur' },
  ],
};

/**
 * Genereer memory-paren voor omrekenen.
 * @param {string} level
 * @param {number} count - aantal paren (default 4)
 * @returns {Array<{ content: string, matchContent: string }>}
 */
export function generateOmrekenMemoryPairs(level = 'wholeHours', count = 4) {
  const pool = CONVERSION_PAIRS[level] || CONVERSION_PAIRS.wholeHours;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);

  // Selecteer paren met unieke matchContent
  const selected = [];
  const usedMatch = new Set();
  for (const pair of shuffled) {
    if (selected.length >= count) break;
    if (!usedMatch.has(pair.matchContent)) {
      selected.push(pair);
      usedMatch.add(pair.matchContent);
    }
  }
  return selected;
}

// ==========================================
// TijdRekenen - invuloefening (numeriek antwoord)
// ==========================================

function generateTimeCalculation(level, use24h = false) {
  const type = Math.random() > 0.5 ? 'duration' : 'missing';

  let startH, startM, durationMin, unit;

  if (level === 'wholeHours') {
    startH = 7 + Math.floor(Math.random() * 11);
    startM = 0;
    durationMin = (1 + Math.floor(Math.random() * 5)) * 60;
    unit = 'uur';
  } else if (level === 'halfHours') {
    startH = 7 + Math.floor(Math.random() * 11);
    startM = Math.random() > 0.5 ? 0 : 30;
    const opts = [30, 60, 90, 120];
    durationMin = opts[Math.floor(Math.random() * opts.length)];
    unit = 'minuten';
  } else if (level === 'quarters') {
    startH = 7 + Math.floor(Math.random() * 11);
    const startOpts = [0, 15, 30, 45];
    startM = startOpts[Math.floor(Math.random() * startOpts.length)];
    const durOpts = [15, 30, 45];
    durationMin = durOpts[Math.floor(Math.random() * durOpts.length)];
    unit = 'minuten';
  } else {
    // minutes
    startH = 7 + Math.floor(Math.random() * 11);
    startM = Math.floor(Math.random() * 60);
    const durOpts = [5, 10, 15, 20, 25, 35, 40, 50];
    durationMin = durOpts[Math.floor(Math.random() * durOpts.length)];
    unit = 'minuten';
  }

  const [endH, endM] = addMinutes(startH, startM, durationMin);
  const answer = unit === 'uur' ? durationMin / 60 : durationMin;

  if (type === 'duration') {
    return {
      question: `Van ${formatTime(startH, startM, use24h)} tot ${formatTime(endH, endM, use24h)} = ___ ${unit}`,
      answer,
    };
  } else {
    return {
      question: `${formatTime(startH, startM, use24h)} + ___ ${unit} = ${formatTime(endH, endM, use24h)}`,
      answer,
    };
  }
}

function generateDayCalculation() {
  if (Math.random() > 0.5) {
    // ___ weken = X dagen
    const weeks = 1 + Math.floor(Math.random() * 4);
    return {
      question: `___ weken = ${weeks * 7} dagen`,
      answer: weeks,
    };
  } else {
    // X weken = ___ dagen
    const weeks = 1 + Math.floor(Math.random() * 4);
    return {
      question: `${weeks} ${weeks === 1 ? 'week' : 'weken'} = ___ dagen`,
      answer: weeks * 7,
    };
  }
}

/**
 * Genereer een enkel TijdRekenen-probleem (invul, numeriek antwoord).
 * @param {string} level
 * @param {boolean} use24h
 * @returns {{ question: string, answer: number }}
 */
export function generateTijdRekenenProblem(
  level = 'wholeHours',
  use24h = false,
) {
  if (level === 'daysWeeks') {
    return generateDayCalculation();
  }
  return generateTimeCalculation(level, use24h);
}

/**
 * Genereer meerdere unieke TijdRekenen-problemen.
 * @param {string} level
 * @param {number} count
 * @param {boolean} use24h
 * @returns {Array<{ question: string, answer: number }>}
 */
export function generateTijdRekenenProblems(
  level = 'wholeHours',
  count = 4,
  use24h = false,
) {
  const problems = [];
  const usedAnswers = new Set();
  let attempts = 0;

  while (problems.length < count && attempts < 50) {
    const problem = generateTijdRekenenProblem(level, use24h);
    if (!usedAnswers.has(problem.answer)) {
      problems.push(problem);
      usedAnswers.add(problem.answer);
    }
    attempts++;
  }

  // Fallback als er niet genoeg unieke antwoorden zijn
  while (problems.length < count) {
    problems.push(generateTijdRekenenProblem(level, use24h));
  }

  return problems;
}
