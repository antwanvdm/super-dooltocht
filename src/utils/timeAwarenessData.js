// Data voor Tijdsbesef-oefeningen
// Categorieën: dagen van de week, maanden van het jaar, seizoenen

export const DAGEN = [
  'maandag',
  'dinsdag',
  'woensdag',
  'donderdag',
  'vrijdag',
  'zaterdag',
  'zondag',
];

export const MAANDEN = [
  'januari',
  'februari',
  'maart',
  'april',
  'mei',
  'juni',
  'juli',
  'augustus',
  'september',
  'oktober',
  'november',
  'december',
];

export const SEIZOENEN = [
  {
    naam: 'lente',
    startMaand: 'maart',
    maanden: ['maart', 'april', 'mei'],
    emoji: '🌷',
  },
  {
    naam: 'zomer',
    startMaand: 'juni',
    maanden: ['juni', 'juli', 'augustus'],
    emoji: '☀️',
  },
  {
    naam: 'herfst',
    startMaand: 'september',
    maanden: ['september', 'oktober', 'november'],
    emoji: '🍂',
  },
  {
    naam: 'winter',
    startMaand: 'december',
    maanden: ['december', 'januari', 'februari'],
    emoji: '❄️',
  },
];

export const DAGEN_PER_MAAND = {
  januari: 31,
  februari: 28, // schrikkeljaar als quizvraag
  maart: 31,
  april: 30,
  mei: 31,
  juni: 30,
  juli: 31,
  augustus: 31,
  september: 30,
  oktober: 31,
  november: 30,
  december: 31,
};

// Kenmerken per seizoen (voor SeizoenenMatch)
// Geen maand↔seizoen koppeling want overgangsmaanden vallen in 2 seizoenen
export const SEIZOEN_KENMERKEN = [
  { kenmerk: 'Bloemen bloeien', emoji: '🌷', seizoen: 'lente' },
  { kenmerk: 'Lammetjes geboren', emoji: '🐣', seizoen: 'lente' },
  { kenmerk: 'Naar het strand', emoji: '☀️', seizoen: 'zomer' },
  { kenmerk: 'IJsjes eten', emoji: '🍦', seizoen: 'zomer' },
  { kenmerk: 'Bladeren vallen', emoji: '🍂', seizoen: 'herfst' },
  { kenmerk: 'Het regent veel', emoji: '🌧️', seizoen: 'herfst' },
  { kenmerk: 'Sneeuw en ijs', emoji: '❄️', seizoen: 'winter' },
  { kenmerk: 'Sinterklaas en Kerst', emoji: '🎅', seizoen: 'winter' },
];

// ==========================================
// Kalender Quiz vragen (multiple choice)
// ==========================================

/**
 * Genereert een quiz-vraag op basis van de ingeschakelde categorieën.
 * @param {Object} options - { dagen: boolean, maanden: boolean, seizoenen: boolean }
 * @returns {{ question: string, answer: string, wrongAnswers: string[], category: string }}
 */
export const generateKalenderQuizQuestion = (options = {}) => {
  const { dagen = true, maanden = true, seizoenen = true } = options;

  const generators = [];
  if (dagen) generators.push(...DAGEN_GENERATORS);
  if (maanden) generators.push(...MAANDEN_GENERATORS);
  if (seizoenen) generators.push(...SEIZOENEN_GENERATORS);

  // Fallback als niets geselecteerd
  if (generators.length === 0) generators.push(...DAGEN_GENERATORS);

  const gen = generators[Math.floor(Math.random() * generators.length)];
  return gen();
};

// ==========================================
// Dagen-vragen
// ==========================================

const DAGEN_GENERATORS = [
  // Welke dag komt na X?
  () => {
    const idx = Math.floor(Math.random() * 7);
    const dag = DAGEN[idx];
    const nextDag = DAGEN[(idx + 1) % 7];
    const wrongs = DAGEN.filter((d) => d !== nextDag)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return {
      question: `Welke dag komt na ${dag}?`,
      answer: nextDag,
      wrongAnswers: wrongs,
      category: 'dagen',
    };
  },
  // Welke dag komt voor X?
  () => {
    const idx = Math.floor(Math.random() * 7);
    const dag = DAGEN[idx];
    const prevDag = DAGEN[(idx + 6) % 7]; // -1 mod 7
    const wrongs = DAGEN.filter((d) => d !== prevDag)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return {
      question: `Welke dag komt vóór ${dag}?`,
      answer: prevDag,
      wrongAnswers: wrongs,
      category: 'dagen',
    };
  },
  // De hoeveelste dag van de week is X?
  () => {
    const idx = Math.floor(Math.random() * 7);
    const dag = DAGEN[idx];
    const answer = `${idx + 1}`;
    const wrongs = Array.from({ length: 7 }, (_, i) => `${i + 1}`)
      .filter((n) => n !== answer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return {
      question: `De hoeveelste dag van de week is ${dag}?`,
      answer,
      wrongAnswers: wrongs,
      category: 'dagen',
    };
  },
  // Welke dag is de Xste dag van de week?
  () => {
    const idx = Math.floor(Math.random() * 7);
    const ordinals = ['1ste', '2de', '3de', '4de', '5de', '6de', '7de'];
    const answer = DAGEN[idx];
    const wrongs = DAGEN.filter((d) => d !== answer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return {
      question: `Welke dag is de ${ordinals[idx]} dag van de week?`,
      answer,
      wrongAnswers: wrongs,
      category: 'dagen',
    };
  },
  // Hoeveel dagen heeft een week?
  () => ({
    question: 'Hoeveel dagen heeft een week?',
    answer: '7',
    wrongAnswers: ['5', '6', '8'],
    category: 'dagen',
  }),
  // Welke dagen zijn het weekend?
  () => ({
    question: 'Welke twee dagen zijn het weekend?',
    answer: 'Zaterdag en zondag',
    wrongAnswers: [
      'Vrijdag en zaterdag',
      'Zondag en maandag',
      'Donderdag en vrijdag',
    ],
    category: 'dagen',
  }),
  // Over 2 dagen na X is het...?
  () => {
    const idx = Math.floor(Math.random() * 7);
    const dag = DAGEN[idx];
    const answer = DAGEN[(idx + 2) % 7];
    const wrongs = DAGEN.filter((d) => d !== answer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return {
      question: `Het is ${dag}. Welke dag is het overmorgen?`,
      answer,
      wrongAnswers: wrongs,
      category: 'dagen',
    };
  },
  // 2 dagen geleden was het X, welke dag is het nu?
  () => {
    const idx = Math.floor(Math.random() * 7);
    const dag = DAGEN[idx];
    const answer = DAGEN[(idx + 2) % 7];
    const wrongs = DAGEN.filter((d) => d !== answer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return {
      question: `Eergisteren was het ${dag}. Welke dag is het vandaag?`,
      answer,
      wrongAnswers: wrongs,
      category: 'dagen',
    };
  },
  // Hoe noem je de dag na morgen?
  () => ({
    question: 'Hoe noem je de dag na morgen?',
    answer: 'Overmorgen',
    wrongAnswers: ['Eergisteren', 'Gisteren', 'Morgen'],
    category: 'dagen',
  }),
  // Hoe noem je de dag voor gisteren?
  () => ({
    question: 'Hoe noem je de dag vóór gisteren?',
    answer: 'Eergisteren',
    wrongAnswers: ['Overmorgen', 'Morgen', 'Gisteren'],
    category: 'dagen',
  }),
];

// ==========================================
// Maanden-vragen
// ==========================================

const MAANDEN_GENERATORS = [
  // Welke maand komt na X?
  () => {
    const idx = Math.floor(Math.random() * 12);
    const maand = MAANDEN[idx];
    const nextMaand = MAANDEN[(idx + 1) % 12];
    const wrongs = MAANDEN.filter((m) => m !== nextMaand)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return {
      question: `Welke maand komt na ${maand}?`,
      answer: nextMaand,
      wrongAnswers: wrongs,
      category: 'maanden',
    };
  },
  // Welke maand komt voor X?
  () => {
    const idx = Math.floor(Math.random() * 12);
    const maand = MAANDEN[idx];
    const prevMaand = MAANDEN[(idx + 11) % 12];
    const wrongs = MAANDEN.filter((m) => m !== prevMaand)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return {
      question: `Welke maand komt vóór ${maand}?`,
      answer: prevMaand,
      wrongAnswers: wrongs,
      category: 'maanden',
    };
  },
  // De hoeveelste maand is X?
  () => {
    const idx = Math.floor(Math.random() * 12);
    const maand = MAANDEN[idx];
    const answer = `${idx + 1}`;
    const wrongs = Array.from({ length: 12 }, (_, i) => `${i + 1}`)
      .filter((n) => n !== answer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return {
      question: `De hoeveelste maand van het jaar is ${maand}?`,
      answer,
      wrongAnswers: wrongs,
      category: 'maanden',
    };
  },
  // Hoeveel dagen heeft maand X?
  () => {
    // Kies een maand (niet februari, tenzij schrikkeljaar-variatie)
    const idx = Math.floor(Math.random() * 12);
    const maand = MAANDEN[idx];
    const answer = `${DAGEN_PER_MAAND[maand]}`;
    // Genereer plausibele foute antwoorden
    const wrongSet = new Set();
    [28, 29, 30, 31].forEach((d) => {
      if (`${d}` !== answer) wrongSet.add(`${d}`);
    });
    const wrongs = [...wrongSet].sort(() => Math.random() - 0.5).slice(0, 3);
    return {
      question: `Hoeveel dagen heeft ${maand}?`,
      answer,
      wrongAnswers: wrongs,
      category: 'maanden',
    };
  },
  // Hoeveel maanden heeft een jaar?
  () => ({
    question: 'Hoeveel maanden heeft een jaar?',
    answer: '12',
    wrongAnswers: ['10', '11', '13'],
    category: 'maanden',
  }),
  // Schrikkeljaar quizvraag
  () => ({
    question: 'Hoeveel dagen heeft februari in een schrikkeljaar?',
    answer: '29',
    wrongAnswers: ['28', '30', '27'],
    category: 'maanden',
  }),
  // Welke maand is de Xste?
  () => {
    const idx = Math.floor(Math.random() * 12);
    const answer = MAANDEN[idx];
    const wrongs = MAANDEN.filter((m) => m !== answer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return {
      question: `Welke maand is maand ${idx + 1}?`,
      answer,
      wrongAnswers: wrongs,
      category: 'maanden',
    };
  },
];

// ==========================================
// Seizoenen-vragen
// ==========================================

const SEIZOENEN_GENERATORS = [
  // Wanneer begint seizoen X?
  () => {
    const seizoen = SEIZOENEN[Math.floor(Math.random() * 4)];
    const answer = seizoen.startMaand;
    const wrongs = SEIZOENEN.filter((s) => s.naam !== seizoen.naam).map(
      (s) => s.startMaand,
    );
    return {
      question: `In welke maand begint de ${seizoen.naam}?`,
      answer,
      wrongAnswers: wrongs,
      category: 'seizoenen',
    };
  },
  // Welk seizoen komt na X?
  () => {
    const idx = Math.floor(Math.random() * 4);
    const seizoen = SEIZOENEN[idx];
    const nextSeizoen = SEIZOENEN[(idx + 1) % 4];
    const wrongs = SEIZOENEN.filter((s) => s.naam !== nextSeizoen.naam).map(
      (s) => s.naam,
    );
    return {
      question: `Welk seizoen komt na de ${seizoen.naam}?`,
      answer: nextSeizoen.naam,
      wrongAnswers: wrongs,
      category: 'seizoenen',
    };
  },
  // Welk seizoen komt voor X?
  () => {
    const idx = Math.floor(Math.random() * 4);
    const seizoen = SEIZOENEN[idx];
    const prevSeizoen = SEIZOENEN[(idx + 3) % 4];
    const wrongs = SEIZOENEN.filter((s) => s.naam !== prevSeizoen.naam).map(
      (s) => s.naam,
    );
    return {
      question: `Welk seizoen komt vóór de ${seizoen.naam}?`,
      answer: prevSeizoen.naam,
      wrongAnswers: wrongs,
      category: 'seizoenen',
    };
  },
  // Hoeveel seizoenen zijn er?
  () => ({
    question: 'Hoeveel seizoenen heeft een jaar?',
    answer: '4',
    wrongAnswers: ['3', '5', '6'],
    category: 'seizoenen',
  }),
];

// ==========================================
// Volgorde data (voor VolgordeSorteer)
// ==========================================

/**
 * Genereert een volgorde-opdracht: een rij items die op de juiste volgorde moeten worden gezet.
 * @param {Object} options - { dagen: boolean, maanden: boolean, seizoenen: boolean }
 * @returns {{ items: string[], correctOrder: string[], label: string, category: string }}
 */
export const generateVolgordeChallenge = (options = {}) => {
  const { dagen = true, maanden = true, seizoenen = true } = options;

  const types = [];
  if (dagen) types.push('dagen');
  if (maanden) types.push('maanden');
  if (seizoenen) types.push('seizoenen');
  if (types.length === 0) types.push('dagen');

  const type = types[Math.floor(Math.random() * types.length)];

  switch (type) {
    case 'dagen': {
      // Kies een random startpunt en neem 4 opeenvolgende dagen
      const startIdx = Math.floor(Math.random() * 7);
      const correctOrder = Array.from(
        { length: 4 },
        (_, i) => DAGEN[(startIdx + i) % 7],
      );
      const items = [...correctOrder].sort(() => Math.random() - 0.5);
      return {
        items,
        correctOrder,
        label: 'Zet de dagen in de juiste volgorde',
        category: 'dagen',
        cyclical: true,
      };
    }
    case 'maanden': {
      // Kies 4 opeenvolgende maanden
      const startIdx = Math.floor(Math.random() * 12);
      const correctOrder = Array.from(
        { length: 4 },
        (_, i) => MAANDEN[(startIdx + i) % 12],
      );
      const items = [...correctOrder].sort(() => Math.random() - 0.5);
      return {
        items,
        correctOrder,
        label: 'Zet de maanden in de juiste volgorde',
        category: 'maanden',
        cyclical: true,
      };
    }
    case 'seizoenen': {
      // Alle 4 seizoenen op volgorde — cyclisch, elk startpunt is geldig
      const startIdx = Math.floor(Math.random() * 4);
      const correctOrder = Array.from(
        { length: 4 },
        (_, i) => SEIZOENEN[(startIdx + i) % 4].naam,
      );
      const items = [...correctOrder].sort(() => Math.random() - 0.5);
      return {
        items,
        correctOrder,
        label: 'Zet de seizoenen in de juiste volgorde',
        category: 'seizoenen',
        cyclical: true,
      };
    }
  }
};

// ==========================================
// Seizoenen Match data (connect kenmerken → seizoenen)
// ==========================================

/**
 * Genereert paren voor SeizoenenMatch (verbind kenmerk met seizoen).
 * Gebruikt kenmerken i.p.v. maanden, want overgangsmaanden vallen in 2 seizoenen.
 * @param {number} count - Aantal paren (default 4)
 * @returns {{ kenmerk: string, emoji: string, seizoen: string }[]}
 */
export const generateSeizoenenMatchPairs = (count = 4) => {
  // Shuffle alle kenmerken
  const shuffled = [...SEIZOEN_KENMERKEN].sort(() => Math.random() - 0.5);
  const selected = [];
  const usedSeasons = new Set();

  // Eerst proberen elk seizoen minstens 1x te pakken
  for (const pair of shuffled) {
    if (selected.length >= count) break;
    if (!usedSeasons.has(pair.seizoen)) {
      selected.push(pair);
      usedSeasons.add(pair.seizoen);
    }
  }

  // Aanvullen als er nog plaatsen over zijn
  for (const pair of shuffled) {
    if (selected.length >= count) break;
    if (!selected.includes(pair)) {
      selected.push(pair);
    }
  }

  return selected;
};

// ==========================================
// Kalender Memory data (dag↔nummer, maand↔nummer)
// ==========================================

/**
 * Genereert memory-paren voor KalenderMemory.
 * @param {Object} options - { dagen: boolean, maanden: boolean, seizoenen: boolean }
 * @param {number} count - Aantal paren (default 4)
 * @returns {{ id: number, content: string, matchContent: string, category: string }[]}
 */
export const generateKalenderMemoryPairs = (options = {}, count = 4) => {
  const { dagen = true, maanden = true, seizoenen = true } = options;

  const allPairs = [];

  if (dagen) {
    DAGEN.forEach((dag, i) => {
      allPairs.push({
        content: dag,
        matchContent: `dag ${i + 1}`,
        category: 'dagen',
      });
    });
  }

  if (maanden) {
    MAANDEN.forEach((maand, i) => {
      allPairs.push({
        content: maand,
        matchContent: `maand ${i + 1}`,
        category: 'maanden',
      });
    });
  }

  if (seizoenen) {
    SEIZOENEN.forEach((seizoen) => {
      allPairs.push({
        content: `${seizoen.emoji} ${seizoen.naam}`,
        matchContent: seizoen.startMaand,
        category: 'seizoenen',
      });
    });
  }

  // Fallback
  if (allPairs.length === 0) {
    DAGEN.forEach((dag, i) => {
      allPairs.push({
        content: dag,
        matchContent: `dag ${i + 1}`,
        category: 'dagen',
      });
    });
  }

  // Shuffle en neem er count
  const shuffled = allPairs.sort(() => Math.random() - 0.5).slice(0, count);

  return shuffled.map((pair, idx) => ({
    id: idx,
    content: pair.content,
    matchContent: pair.matchContent,
    category: pair.category,
  }));
};
