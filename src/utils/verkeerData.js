// Verkeer (Traffic) data & problem generation for educational minigames.
// Sub-categories: Verkeersborden (sign recognition) and Verkeersregels (rules & situations).

// ---------------------------------------------------------------------------
// VERKEERSBORDEN
// ---------------------------------------------------------------------------
const BORDEN_EASY = [
  {
    question: 'Wat moet je doen bij dit bord?',
    answer: 'Stoppen en kijken',
    wrongAnswers: [
      'Langzaam doorrijden',
      'Alleen stoppen als je iemand ziet',
      'Toeteren',
    ],
    svg: 'stop',
  },
  {
    question: 'Wat betekent dit bord?',
    answer: 'Verboden in te rijden',
    wrongAnswers: ['Je mag hier parkeren', 'Voorrang verlenen', 'Stoppen'],
    svg: 'verbodeninrijden',
  },
  {
    question: 'Wat betekent dit bord?',
    answer: 'Verplicht fietspad',
    wrongAnswers: ['Verboden te fietsen', 'Fiets parkeren', 'Voetpad'],
    svg: 'fietspad',
  },
  {
    question: 'Wat betekent dit bord?',
    answer: 'Hier mag je parkeren',
    wrongAnswers: ['Verboden te parkeren', 'Politiebureau', 'Pas op'],
    svg: 'parkeren',
  },
  {
    question: 'Wat betekent dit bord?',
    answer: 'Pas op, overstekende kinderen',
    wrongAnswers: ['Hier is een speeltuin', 'Kinderen verboden', 'Voetpad'],
    svg: 'pasopKinderen',
  },
  {
    question: 'Wat betekent dit bord?',
    answer: 'Pas op, voetgangers',
    wrongAnswers: [
      'Verboden voor voetgangers',
      'Voetpad hier',
      'Oversteken verplicht',
    ],
    svg: 'pasopVoetgangers',
  },
  {
    question: 'Wat betekent dit bord?',
    answer: 'Hier is een zebrapad',
    wrongAnswers: [
      'Verboden over te steken',
      'Fietspad',
      'Voetgangers verboden',
    ],
    svg: 'pasopZebrapad',
  },
  {
    question: 'Wat betekent dit bord?',
    answer: 'Verplicht voetpad',
    wrongAnswers: ['Verboden voor voetgangers', 'Fietspad', 'Ruiterpad'],
    svg: 'voetpad',
  },
  {
    question: 'Wat betekent dit bord?',
    answer: 'Verboden te fietsen',
    wrongAnswers: ['Verplicht fietspad', 'Fiets parkeren', 'Fietswinkel'],
    svg: 'verbodenfietsen',
  },
  {
    question: 'Wat betekent dit bord?',
    answer: '30 km zone',
    wrongAnswers: ['De weg is 30 meter', '30 minuten wachten', 'Huisnummer 30'],
    svg: 'zone30',
  },
  {
    question: 'Wat betekent dit bord?',
    answer: 'Eenrichtingsweg',
    wrongAnswers: ['Verplicht rechtdoor', 'Doodlopende weg', 'Voorrang'],
    svg: 'eenrichtingsweg',
  },
];

const BORDEN_MEDIUM = [
  {
    question: 'Wat betekent dit bord?',
    answer: 'Voorrang verlenen',
    wrongAnswers: [
      'Jij hebt voorrang',
      'Verboden in te rijden',
      'Einde van de weg',
    ],
    svg: 'voorrangGeven',
  },
  {
    question: 'Wat betekent dit bord?',
    answer: 'Je rijdt op een voorrangsweg',
    wrongAnswers: [
      'Pas op, gevaar!',
      'Verboden te parkeren',
      'Eenrichtingsweg',
    ],
    svg: 'voorrangsweg',
  },
  {
    question: 'Wat betekent dit bord?',
    answer: 'Einde voorrangsweg',
    wrongAnswers: ['Begin voorrangsweg', 'Voorrang verlenen', 'Einde snelweg'],
    svg: 'eindeVoorrangsweg',
  },
  {
    question: 'Wat betekent dit bord?',
    answer: 'Rotonde',
    wrongAnswers: ['Parkeerplaats', 'Verboden te keren', 'Eenrichtingsweg'],
    svg: 'rotonde',
  },
  {
    question: 'Wat betekent dit bord?',
    answer: 'Verboden te parkeren',
    wrongAnswers: [
      'Hier mag je parkeren',
      'Verboden te stoppen',
      'Parkeergarage',
    ],
    svg: 'parkeerverbod',
  },
  {
    question: 'Wat betekent dit bord?',
    answer: 'Einde 30 km zone',
    wrongAnswers: ['Begin 30 km zone', 'Maximaal 30 km/u', 'Einde snelweg'],
    svg: 'einde30zone',
  },
  {
    question: 'Wat betekent dit bord?',
    answer: 'Verboden voor voetgangers',
    wrongAnswers: ['Verplicht voetpad', 'Pas op voetgangers', 'Zebrapad'],
    svg: 'verbodenVoetgangers',
  },
  {
    question: 'Wat betekent dit bord?',
    answer: 'Gesloten voor alle voertuigen',
    wrongAnswers: [
      'Verboden in te rijden',
      'Doodlopende weg',
      'Eenrichtingsweg',
    ],
    svg: 'geslotenVoorAlleVoertuigen',
  },
  {
    question: 'Wat betekent dit bord?',
    answer: 'Fiets- en bromfietspad',
    wrongAnswers: ['Alleen fietspad', 'Verboden te fietsen', 'Voetpad'],
    svg: 'fietsBromfietspad',
  },
  {
    question: 'Wat betekent dit bord?',
    answer: 'Verboden voor fietsen en bromfietsen',
    wrongAnswers: [
      'Fietspad',
      'Alleen verboden voor bromfietsen',
      'Fiets parkeren',
    ],
    svg: 'verbodenFietsBromfiets',
  },
  {
    question: 'Wat betekent dit bord?',
    answer: 'Ruiterpad',
    wrongAnswers: ['Dierentuin', 'Verboden voor paarden', 'Boerderij'],
    svg: 'ruiterpad',
  },
  {
    question: 'Wat betekent dit bord?',
    answer: 'Pas op, spoorwegovergang',
    wrongAnswers: ['Treinstation', 'Verboden voor treinen', 'Brug'],
    svg: 'spoorwegovergang',
  },
];

const BORDEN_MEMORY_EASY = [
  { right: 'Stoppen en kijken', svg: 'stop' },
  { right: 'Verplicht fietspad', svg: 'fietspad' },
  { right: 'Verboden in te rijden', svg: 'verbodeninrijden' },
  { right: 'Hier mag je parkeren', svg: 'parkeren' },
  { right: 'Overstekende kinderen', svg: 'pasopKinderen' },
  { right: 'Hier is een zebrapad', svg: 'pasopZebrapad' },
  { right: 'Verplicht voetpad', svg: 'voetpad' },
  { right: 'Verboden te fietsen', svg: 'verbodenfietsen' },
  { right: '30 km zone', svg: 'zone30' },
  { right: 'Eenrichtingsweg', svg: 'eenrichtingsweg' },
];

const BORDEN_MEMORY_MEDIUM = [
  { right: 'Voorrang verlenen', svg: 'voorrangGeven' },
  { right: 'Voorrangsweg', svg: 'voorrangsweg' },
  { right: 'Einde voorrangsweg', svg: 'eindeVoorrangsweg' },
  { right: 'Rotonde', svg: 'rotonde' },
  { right: 'Verboden te parkeren', svg: 'parkeerverbod' },
  { right: 'Einde 30 km zone', svg: 'einde30zone' },
  { right: 'Verboden voor voetgangers', svg: 'verbodenVoetgangers' },
  { right: 'Fiets- en bromfietspad', svg: 'fietsBromfietspad' },
  { right: 'Ruiterpad', svg: 'ruiterpad' },
  { right: 'Spoorwegovergang', svg: 'spoorwegovergang' },
];

// ---------------------------------------------------------------------------
// VERKEERSREGELS
// ---------------------------------------------------------------------------
const REGELS_EASY = [
  {
    question: 'Wat moet je doen bij een rood stoplicht?',
    answer: 'Stoppen en wachten',
    wrongAnswers: ['Snel doorrijden', 'Langzaam doorrijden', 'Omkeren'],
  },
  {
    question: 'Wat moet je doen bij een groen stoplicht?',
    answer: 'Je mag doorlopen of doorrijden',
    wrongAnswers: ['Stoppen', 'Wachten', 'Omkeren'],
  },
  {
    question: 'Wat betekent een oranje stoplicht?',
    answer: 'Stoppen, het wordt rood',
    wrongAnswers: ['Snel doorrijden', 'Gas geven', 'Achteruit rijden'],
  },
  {
    question: 'Wat is een zebrapad?',
    answer: 'Witte strepen om over te steken',
    wrongAnswers: ['Een fietspad', 'Een parkeerplaats', 'Een pad voor zebras'],
  },
  {
    question: 'Je wilt oversteken bij een zebrapad. Wat doe je?',
    answer: 'Goed kijken en oversteken',
    wrongAnswers: [
      'Rennen zonder kijken',
      'Naast het zebrapad lopen',
      'Wachten tot er geen auto is',
    ],
  },
  {
    question: 'Wat moet je aan hebben op je fiets als het donker is?',
    answer: 'Wit licht voor, rood achter',
    wrongAnswers: [
      'Alleen rood licht voor',
      'Geen licht nodig',
      'Een blauw zwaailicht',
    ],
  },
  {
    question: 'Waar moet je lopen als er geen stoep is?',
    answer: 'Links, tegen het verkeer in',
    wrongAnswers: [
      'Rechts, met het verkeer mee',
      'Midden op de weg',
      'Het maakt niet uit',
    ],
  },
  {
    question: 'Wat doe je als je op de fiets wilt afslaan?',
    answer: 'Hand uitsteken',
    wrongAnswers: ['Hard remmen', 'Gewoon afslaan', 'Roepen'],
  },
  {
    question: 'Aan welke kant van de weg fiets je?',
    answer: 'Rechts',
    wrongAnswers: ['Links', 'In het midden', 'Maakt niet uit'],
  },
  {
    question: "Mag je met z'n tweeën naast elkaar fietsen?",
    answer: 'Ja, maar verkeer doorlaten',
    wrongAnswers: ['Nee, dat mag nooit', 'Ja, altijd', 'Alleen op zondag'],
  },
  {
    question: 'Wat is een dode hoek?',
    answer: 'Plek waar de bestuurder je niet ziet',
    wrongAnswers: [
      'Een hoek in de weg',
      'Een scherpe bocht',
      'Een parkeerplaats',
    ],
  },
  {
    question: 'Is een fietshelm verplicht in Nederland?',
    answer: 'Nee, maar wel verstandig',
    wrongAnswers: [
      'Ja, altijd verplicht',
      'Alleen als het regent',
      'Nee, helmen zijn verboden',
    ],
  },
];

const REGELS_MEDIUM = [
  {
    question:
      'Kruispunt zonder borden. Van rechts komt een auto. Wie gaat eerst?',
    answer: 'De auto van rechts',
    wrongAnswers: ['Jij op de fiets', 'Wie het eerst komt', 'De langzaamste'],
  },
  {
    question: 'Een ambulance met sirene rijdt achter je. Wat doe je?',
    answer: 'Aan de kant gaan',
    wrongAnswers: ['Harder rijden', 'Midden op de weg stoppen', 'Niks doen'],
  },
  {
    question: 'Hoe rij je een rotonde op?',
    answer: 'Naar rechts erop, rondrijden',
    wrongAnswers: [
      'Naar links erop',
      'Recht over de rotonde',
      'Je mag er niet fietsen',
    ],
  },
  {
    question: 'Voetgangerslicht is rood maar er komt geen auto. Wat doe je?',
    answer: 'Wachten tot het groen is',
    wrongAnswers: [
      'Snel oversteken',
      'Langzaam oversteken',
      'Op de knop drukken',
    ],
  },
  {
    question: 'Waarom is het gevaarlijk naast een vrachtwagen te fietsen?',
    answer: 'Dode hoek: je wordt niet gezien',
    wrongAnswers: [
      'Te veel lawaai',
      'De vrachtwagen is te snel',
      'De weg is te smal',
    ],
  },
  {
    question: 'Wat is een woonerf?',
    answer: "Gebied waar auto's stapvoets rijden",
    wrongAnswers: [
      'Een grote parkeerplaats',
      'Een weg zonder stoep',
      'Een fietspad',
    ],
  },
  {
    question: 'Je wilt linksaf op de fiets. Wat is het veiligst?',
    answer: 'Kijken en hand uitsteken',
    wrongAnswers: ['Snel afslaan', 'Op de stoep fietsen', 'Altijd afstappen'],
  },
];

const REGELS_MEMORY_EASY = [
  { left: '🔴 Rood stoplicht', right: 'Stoppen' },
  { left: '🟢 Groen stoplicht', right: 'Doorrijden' },
  { left: '🟡 Oranje stoplicht', right: 'Stoppen, wordt rood' },
  { left: '⬜ Witte strepen', right: 'Zebrapad' },
  { left: '👋 Hand uitsteken', right: 'Afslaan op de fiets' },
  { left: '💡 Licht aan', right: 'In het donker fietsen' },
  { left: '🚶 Geen stoep?', right: 'Links lopen' },
];

const REGELS_MEMORY_MEDIUM = [
  { left: '🚑 Sirene achter je', right: 'Aan de kant gaan' },
  { left: '🔄 Rotonde', right: 'Rechts erop rijden' },
  { left: '👀 Naast vrachtwagen', right: 'Dode hoek gevaar' },
  { left: '➡️ Van rechts komt iemand', right: 'Die gaat eerst' },
  { left: '👈 Linksaf op de fiets', right: 'Kijken + hand uitsteken' },
  { left: '🔴 Rood voetgangerslicht', right: 'Wachten, ook als het leeg is' },
];

// ---------------------------------------------------------------------------
// Generators
// ---------------------------------------------------------------------------
function pickQuestion(pool) {
  const item = pool[Math.floor(Math.random() * pool.length)];
  return {
    question: item.question,
    correctAnswer: item.answer,
    wrongAnswers: [...item.wrongAnswers],
    svg: item.svg,
  };
}

function pickMemoryPairs(pool, count) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const pairs = [];
  const usedValues = new Set();
  for (const pair of shuffled) {
    if (pairs.length >= count) break;
    const leftKey = pair.left || pair.svg || '';
    if (usedValues.has(leftKey) || usedValues.has(pair.right)) continue;
    usedValues.add(leftKey);
    usedValues.add(pair.right);
    pairs.push(pair);
  }
  return pairs;
}

export function generateBordenQuestion(level = 'easy') {
  const pool =
    level === 'easy' ? BORDEN_EASY : [...BORDEN_EASY, ...BORDEN_MEDIUM];
  return pickQuestion(pool);
}

export function generateRegelsQuestion(level = 'easy') {
  const pool =
    level === 'easy' ? REGELS_EASY : [...REGELS_EASY, ...REGELS_MEDIUM];
  return pickQuestion(pool);
}

export function generateBordenMemoryPairs(count = 4, level = 'easy') {
  const pool =
    level === 'easy'
      ? BORDEN_MEMORY_EASY
      : [...BORDEN_MEMORY_EASY, ...BORDEN_MEMORY_MEDIUM];
  return pickMemoryPairs(pool, count);
}

export function generateRegelsMemoryPairs(count = 4, level = 'easy') {
  const pool =
    level === 'easy'
      ? REGELS_MEMORY_EASY
      : [...REGELS_MEMORY_EASY, ...REGELS_MEMORY_MEDIUM];
  return pickMemoryPairs(pool, count);
}
