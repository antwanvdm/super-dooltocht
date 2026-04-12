// Topografie (Geography) data & problem generation for educational minigames.
// Sub-categories: Nederland (cities, rivers, landmarks) and De wereld (continents, oceans, capitals).

// ---------------------------------------------------------------------------
// NEDERLAND
// ---------------------------------------------------------------------------
const NEDERLAND_EASY = [
  {
    question: 'Wat is de hoofdstad van Nederland?',
    answer: 'Amsterdam',
    wrongAnswers: ['Rotterdam', 'Utrecht', 'Den Haag'],
  },
  {
    question: 'In welke stad staat de Domtoren?',
    answer: 'Utrecht',
    wrongAnswers: ['Amsterdam', 'Groningen', 'Leiden'],
  },
  {
    question: 'In welke stad staat de Erasmusbrug?',
    answer: 'Rotterdam',
    wrongAnswers: ['Amsterdam', 'Arnhem', 'Den Haag'],
  },
  {
    question: 'Waar woont de koning van Nederland?',
    answer: 'Den Haag',
    wrongAnswers: ['Amsterdam', 'Utrecht', 'Maastricht'],
  },
  {
    question: 'In welke plaats is de Efteling?',
    answer: 'Kaatsheuvel',
    wrongAnswers: ['Tilburg', 'Breda', 'Eindhoven'],
  },
  {
    question: 'Welke grote rivier stroomt door Nederland?',
    answer: 'De Rijn',
    wrongAnswers: ['De Amazone', 'De Nijl', 'De Donau'],
  },
  {
    question: 'Aan welke zee ligt Nederland?',
    answer: 'De Noordzee',
    wrongAnswers: ['De Middellandse Zee', 'De Oostzee', 'De Rode Zee'],
  },
  {
    question: 'Wat is de grootste stad van Nederland?',
    answer: 'Amsterdam',
    wrongAnswers: ['Rotterdam', 'Den Haag', 'Utrecht'],
  },
  {
    question: 'Welke rivier stroomt door Arnhem?',
    answer: 'De Rijn',
    wrongAnswers: ['De Maas', 'De IJssel', 'De Waal'],
  },
  {
    question: 'Hoe heet het grote meer in het midden van Nederland?',
    answer: 'Het IJsselmeer',
    wrongAnswers: ['De Noordzee', 'Het Markermeer', 'De Waddenzee'],
  },
  {
    question: 'Hoe noemen we land dat van de zee is gewonnen?',
    answer: 'Een polder',
    wrongAnswers: ['Een eiland', 'Een berg', 'Een bos'],
  },
  {
    question: 'Welke Waddeneilanden horen bij Nederland? (TV-TAS)',
    answer: 'Texel, Vlieland, Terschelling, Ameland, Schiermonnikoog',
    wrongAnswers: [
      'Texel, Ameland, Schiermonnikoog',
      'Texel, Vlieland, Ameland, Borkum',
      'Terschelling, Ameland, Schiermonnikoog, Rottumerplaat',
    ],
  },
];

const NEDERLAND_MEDIUM = [
  {
    question: 'Wat is de hoofdstad van Noord-Holland?',
    answer: 'Haarlem',
    wrongAnswers: ['Amsterdam', 'Alkmaar', 'Den Helder'],
  },
  {
    question: 'Wat is de hoofdstad van Zuid-Holland?',
    answer: 'Den Haag',
    wrongAnswers: ['Rotterdam', 'Leiden', 'Dordrecht'],
  },
  {
    question: 'Wat is de hoofdstad van Gelderland?',
    answer: 'Arnhem',
    wrongAnswers: ['Nijmegen', 'Apeldoorn', 'Ede'],
  },
  {
    question: 'Wat is de hoofdstad van Noord-Brabant?',
    answer: "'s-Hertogenbosch",
    wrongAnswers: ['Eindhoven', 'Tilburg', 'Breda'],
  },
  {
    question: 'Wat is de hoofdstad van Limburg?',
    answer: 'Maastricht',
    wrongAnswers: ['Venlo', 'Heerlen', 'Roermond'],
  },
  {
    question: 'Wat is de hoofdstad van Groningen?',
    answer: 'Groningen',
    wrongAnswers: ['Assen', 'Leeuwarden', 'Emmen'],
  },
  {
    question: 'Wat is de hoofdstad van Friesland?',
    answer: 'Leeuwarden',
    wrongAnswers: ['Groningen', 'Sneek', 'Heerenveen'],
  },
  {
    question: 'Wat is de hoofdstad van Overijssel?',
    answer: 'Zwolle',
    wrongAnswers: ['Enschede', 'Deventer', 'Hengelo'],
  },
  {
    question: 'Wat is de hoofdstad van Flevoland?',
    answer: 'Lelystad',
    wrongAnswers: ['Almere', 'Dronten', 'Emmeloord'],
  },
  {
    question: 'Wat is de hoofdstad van Drenthe?',
    answer: 'Assen',
    wrongAnswers: ['Emmen', 'Hoogeveen', 'Meppel'],
  },
  {
    question: 'Wat is de hoofdstad van Zeeland?',
    answer: 'Middelburg',
    wrongAnswers: ['Goes', 'Vlissingen', 'Terneuzen'],
  },
  {
    question: 'Hoeveel provincies heeft Nederland?',
    answer: '12',
    wrongAnswers: ['10', '11', '14'],
  },
];

const NEDERLAND_MEMORY_EASY = [
  { left: '🏰 Hoofdstad NL', right: 'Amsterdam' },
  { left: '⛪ Domtoren', right: 'Utrecht' },
  { left: '🌉 Erasmusbrug', right: 'Rotterdam' },
  { left: '👑 Koning woont in', right: 'Den Haag' },
  { left: '🎢 Efteling', right: 'Kaatsheuvel' },
  { left: '🌊 Zee van NL', right: 'Noordzee' },
];

const NEDERLAND_MEMORY_MEDIUM = [
  { left: 'Noord-Holland', right: 'Haarlem' },
  { left: 'Zuid-Holland', right: 'Den Haag' },
  { left: 'Gelderland', right: 'Arnhem' },
  { left: 'Noord-Brabant', right: "'s-Hertogenbosch" },
  { left: 'Limburg', right: 'Maastricht' },
  { left: 'Friesland', right: 'Leeuwarden' },
  { left: 'Overijssel', right: 'Zwolle' },
  { left: 'Flevoland', right: 'Lelystad' },
  { left: 'Drenthe', right: 'Assen' },
  { left: 'Zeeland', right: 'Middelburg' },
];

// ---------------------------------------------------------------------------
// EUROPA
// ---------------------------------------------------------------------------
const EUROPA_EASY = [
  {
    question: 'Wat is de hoofdstad van Frankrijk?',
    answer: 'Parijs',
    wrongAnswers: ['Londen', 'Berlijn', 'Madrid'],
  },
  {
    question: 'Wat is de hoofdstad van Duitsland?',
    answer: 'Berlijn',
    wrongAnswers: ['München', 'Hamburg', 'Frankfurt'],
  },
  {
    question: 'Wat is de hoofdstad van België?',
    answer: 'Brussel',
    wrongAnswers: ['Antwerpen', 'Gent', 'Luik'],
  },
  {
    question: 'Wat is de hoofdstad van Spanje?',
    answer: 'Madrid',
    wrongAnswers: ['Barcelona', 'Lissabon', 'Rome'],
  },
  {
    question: 'Wat is de hoofdstad van Italië?',
    answer: 'Rome',
    wrongAnswers: ['Milaan', 'Venetië', 'Napels'],
  },
  {
    question: 'Wat is de hoofdstad van het Verenigd Koninkrijk?',
    answer: 'Londen',
    wrongAnswers: ['Manchester', 'Edinburgh', 'Dublin'],
  },
  {
    question: 'Welk land lijkt op een laars?',
    answer: 'Italië',
    wrongAnswers: ['Spanje', 'Griekenland', 'Frankrijk'],
  },
  {
    question: 'Welke twee landen grenzen aan Nederland over land?',
    answer: 'Duitsland en België',
    wrongAnswers: [
      'Frankrijk en Duitsland',
      'België en Frankrijk',
      'Duitsland en Denemarken',
    ],
  },
  {
    question: 'Welk Europees land is het kleinst?',
    answer: 'Vaticaanstad',
    wrongAnswers: ['Monaco', 'Malta', 'Luxemburg'],
  },
  {
    question: 'In welk land staat de Eiffeltoren?',
    answer: 'Frankrijk',
    wrongAnswers: ['Italië', 'Spanje', 'België'],
  },
  {
    question: 'Welke landen horen bij het Verenigd Koninkrijk?',
    answer: 'Engeland, Schotland, Wales en Noord-Ierland',
    wrongAnswers: [
      'Engeland, Schotland en Ierland',
      'Engeland en Schotland',
      'Engeland, Wales en Ierland',
    ],
  },
];

const EUROPA_MEDIUM = [
  {
    question: 'Wat is de hoofdstad van Noorwegen?',
    answer: 'Oslo',
    wrongAnswers: ['Stockholm', 'Helsinki', 'Kopenhagen'],
  },
  {
    question: 'Wat is de hoofdstad van Zweden?',
    answer: 'Stockholm',
    wrongAnswers: ['Oslo', 'Helsinki', 'Kopenhagen'],
  },
  {
    question: 'Wat is de hoofdstad van Finland?',
    answer: 'Helsinki',
    wrongAnswers: ['Stockholm', 'Oslo', 'Tallinn'],
  },
  {
    question: 'Wat is de hoofdstad van Polen?',
    answer: 'Warschau',
    wrongAnswers: ['Krakau', 'Praag', 'Berlijn'],
  },
  {
    question: 'Wat is de hoofdstad van Griekenland?',
    answer: 'Athene',
    wrongAnswers: ['Rome', 'Istanbul', 'Sofia'],
  },
  {
    question: 'Wat is de hoofdstad van Oostenrijk?',
    answer: 'Wenen',
    wrongAnswers: ['Bern', 'Praag', 'Berlijn'],
  },
  {
    question: 'Wat is de hoofdstad van Zwitserland?',
    answer: 'Bern',
    wrongAnswers: ['Zürich', 'Genève', 'Wenen'],
  },
  {
    question: 'Wat is de hoofdstad van Tsjechië?',
    answer: 'Praag',
    wrongAnswers: ['Bratislava', 'Warschau', 'Boedapest'],
  },
  {
    question: 'Wat is de hoofdstad van Hongarije?',
    answer: 'Boedapest',
    wrongAnswers: ['Praag', 'Wenen', 'Bratislava'],
  },
  {
    question: 'Wat is de hoofdstad van Portugal?',
    answer: 'Lissabon',
    wrongAnswers: ['Madrid', 'Porto', 'Barcelona'],
  },
  {
    question: 'Wat is de hoofdstad van Ierland?',
    answer: 'Dublin',
    wrongAnswers: ['Londen', 'Edinburgh', 'Belfast'],
  },
  {
    question: 'Wat is de hoofdstad van Denemarken?',
    answer: 'Kopenhagen',
    wrongAnswers: ['Oslo', 'Stockholm', 'Helsinki'],
  },
];

const EUROPA_MEMORY_EASY = [
  { left: '🇫🇷 Frankrijk', right: 'Parijs' },
  { left: '🇩🇪 Duitsland', right: 'Berlijn' },
  { left: '🇧🇪 België', right: 'Brussel' },
  { left: '🇪🇸 Spanje', right: 'Madrid' },
  { left: '🇮🇹 Italië', right: 'Rome' },
  { left: '🇬🇧 Verenigd Koninkrijk', right: 'Londen' },
  { left: '🗼 Eiffeltoren', right: 'Frankrijk' },
  { left: '👢 Land als een laars', right: 'Italië' },
  { left: '🧀 Kaasland', right: 'Nederland' },
];

const EUROPA_MEMORY_MEDIUM = [
  { left: '🇳🇴 Noorwegen', right: 'Oslo' },
  { left: '🇸🇪 Zweden', right: 'Stockholm' },
  { left: '🇫🇮 Finland', right: 'Helsinki' },
  { left: '🇵🇱 Polen', right: 'Warschau' },
  { left: '🇬🇷 Griekenland', right: 'Athene' },
  { left: '🇦🇹 Oostenrijk', right: 'Wenen' },
  { left: '🇨🇭 Zwitserland', right: 'Bern' },
  { left: '🇵🇹 Portugal', right: 'Lissabon' },
  { left: '🇩🇰 Denemarken', right: 'Kopenhagen' },
  { left: '🇮🇪 Ierland', right: 'Dublin' },
];

// ---------------------------------------------------------------------------
// DE WERELD
// ---------------------------------------------------------------------------
const WERELD_EASY = [
  {
    question: 'Op welk continent ligt Nederland?',
    answer: 'Europa',
    wrongAnswers: ['Azië', 'Afrika', 'Noord-Amerika'],
  },
  {
    question: 'Welk continent is het grootst?',
    answer: 'Azië',
    wrongAnswers: ['Afrika', 'Europa', 'Zuid-Amerika'],
  },
  {
    question: 'Op welk continent leven pinguïns in het wild?',
    answer: 'Antarctica',
    wrongAnswers: ['Europa', 'Azië', 'Noord-Amerika'],
  },
  {
    question: 'Op welk continent ligt Egypte?',
    answer: 'Afrika',
    wrongAnswers: ['Azië', 'Europa', 'Zuid-Amerika'],
  },
  {
    question: 'Hoeveel continenten zijn er?',
    answer: '7',
    wrongAnswers: ['5', '6', '8'],
  },
  {
    question: 'Welke oceaan ligt tussen Europa en Amerika?',
    answer: 'Atlantische Oceaan',
    wrongAnswers: ['Stille Oceaan', 'Indische Oceaan', 'Noordelijke IJszee'],
  },
  {
    question: 'Hoe heet de grootste oceaan?',
    answer: 'Stille Oceaan',
    wrongAnswers: [
      'Atlantische Oceaan',
      'Indische Oceaan',
      'Noordelijke IJszee',
    ],
  },
  {
    question: 'Waar staat het Vrijheidsbeeld?',
    answer: 'Noord-Amerika',
    wrongAnswers: ['Europa', 'Australië', 'Afrika'],
  },
  {
    question: 'Welk land is het grootst ter wereld?',
    answer: 'Rusland',
    wrongAnswers: ['China', 'Canada', 'Australië'],
  },
  {
    question: 'Op welk continent ligt Brazilië?',
    answer: 'Zuid-Amerika',
    wrongAnswers: ['Noord-Amerika', 'Afrika', 'Europa'],
  },
  {
    question: 'Op welk continent ligt Japan?',
    answer: 'Azië',
    wrongAnswers: ['Europa', 'Oceanië', 'Noord-Amerika'],
  },
  {
    question: 'Op welk continent ligt Australië?',
    answer: 'Oceanië',
    wrongAnswers: ['Azië', 'Afrika', 'Antarctica'],
  },
];

const WERELD_MEDIUM = [
  {
    question: 'Wat is de hoofdstad van Japan?',
    answer: 'Tokio',
    wrongAnswers: ['Peking', 'Seoul', 'Bangkok'],
  },
  {
    question: 'Wat is de hoofdstad van China?',
    answer: 'Peking',
    wrongAnswers: ['Shanghai', 'Tokio', 'Hongkong'],
  },
  {
    question: 'Wat is de hoofdstad van Australië?',
    answer: 'Canberra',
    wrongAnswers: ['Sydney', 'Melbourne', 'Brisbane'],
  },
  {
    question: 'Wat is de hoofdstad van Brazilië?',
    answer: 'Brasília',
    wrongAnswers: ['Rio de Janeiro', 'São Paulo', 'Buenos Aires'],
  },
  {
    question: 'Wat is de hoofdstad van de Verenigde Staten?',
    answer: 'Washington D.C.',
    wrongAnswers: ['New York', 'Los Angeles', 'Chicago'],
  },
  {
    question: 'Wat is de hoofdstad van Canada?',
    answer: 'Ottawa',
    wrongAnswers: ['Toronto', 'Montreal', 'Vancouver'],
  },
  {
    question: 'Wat is de grootste woestijn ter wereld?',
    answer: 'De Sahara',
    wrongAnswers: ['De Gobi', 'De Kalahari', 'De Atacama'],
  },
  {
    question: 'Hoe heet de langste rivier ter wereld?',
    answer: 'De Nijl',
    wrongAnswers: ['De Amazone', 'De Mississippi', 'De Yangtze'],
  },
  {
    question: 'Hoe heet het hoogste gebergte ter wereld?',
    answer: 'De Himalaya',
    wrongAnswers: ['De Andes', 'De Alpen', 'De Rocky Mountains'],
  },
  {
    question: 'Hoe heet de hoogste berg ter wereld?',
    answer: 'De Mount Everest',
    wrongAnswers: ['De K2', 'De Mont Blanc', 'De Kilimanjaro'],
  },
  {
    question: 'In welk gebergte ligt de Mont Blanc?',
    answer: 'De Alpen',
    wrongAnswers: ['De Pyreneeën', 'De Andes', 'De Rocky Mountains'],
  },
];

const WERELD_MEMORY_EASY = [
  { left: '🌍 Grootste continent', right: 'Azië' },
  { left: '🐧 Pinguïns', right: 'Antarctica' },
  { left: '🏜️ Piramides', right: 'Afrika' },
  { left: '🗽 Vrijheidsbeeld', right: 'Noord-Amerika' },
  { left: '🌊 Grootste oceaan', right: 'Stille Oceaan' },
  { left: '🦘 Kangoeroes', right: 'Oceanië' },
  { left: '🏔️ Hoogste berg', right: 'Mount Everest' },
  { left: '🏜️ Grootste woestijn', right: 'Sahara' },
  { left: '🌊 Langste rivier', right: 'Nijl' },
];

const WERELD_MEMORY_MEDIUM = [
  { left: '🇯🇵 Japan', right: 'Tokio' },
  { left: '🇨🇳 China', right: 'Peking' },
  { left: '🇦🇺 Australië', right: 'Canberra' },
  { left: '🇧🇷 Brazilië', right: 'Brasília' },
  { left: '🇺🇸 Verenigde Staten', right: 'Washington D.C.' },
  { left: '🇨🇦 Canada', right: 'Ottawa' },
];

// ---------------------------------------------------------------------------
// WINDRICHTINGEN
// ---------------------------------------------------------------------------
const HOOFDRICHTINGEN = ['Noord', 'Oost', 'Zuid', 'West'];
const TUSSENRICHTINGEN = ['Noordoost', 'Noordwest', 'Zuidoost', 'Zuidwest'];
const ALLE_RICHTINGEN = [...HOOFDRICHTINGEN, ...TUSSENRICHTINGEN];

// Angle mapping: 0° = north, clockwise
const RICHTING_GRADEN = {
  Noord: 0, Noordoost: 45, Oost: 90, Zuidoost: 135,
  Zuid: 180, Zuidwest: 225, West: 270, Noordwest: 315,
};

const WIND_EASY = [
  { type: 'wijs', question: 'Wijs naar het noorden', answer: 'Noord' },
  { type: 'wijs', question: 'Wijs naar het oosten', answer: 'Oost' },
  { type: 'wijs', question: 'Wijs naar het zuiden', answer: 'Zuid' },
  { type: 'wijs', question: 'Wijs naar het westen', answer: 'West' },
  { type: 'wijs', question: 'Waar gaat de zon op?', answer: 'Oost' },
  { type: 'wijs', question: 'Waar gaat de zon onder?', answer: 'West' },
  { type: 'wijs', question: 'Welke richting is boven op de kaart?', answer: 'Noord' },
  { type: 'wijs', question: 'Welke richting is rechts op de kaart?', answer: 'Oost' },
  { type: 'wijs', question: 'Welke richting is onder op de kaart?', answer: 'Zuid' },
  { type: 'wijs', question: 'Welke richting is links op de kaart?', answer: 'West' },
];

const WIND_MEDIUM = [
  { type: 'wijs', question: 'Wijs naar het noordoosten', answer: 'Noordoost' },
  { type: 'wijs', question: 'Wijs naar het noordwesten', answer: 'Noordwest' },
  { type: 'wijs', question: 'Wijs naar het zuidoosten', answer: 'Zuidoost' },
  { type: 'wijs', question: 'Wijs naar het zuidwesten', answer: 'Zuidwest' },
  { type: 'wijs', question: 'De zon staat laag in het oosten. Het is dus...', answer: 'Oost' },
  { type: 'wijs', question: 'De zon staat laag in het westen. Het is dus...', answer: 'West' },
  { type: 'wijs', question: 'Tussen noord en oost ligt...', answer: 'Noordoost' },
  { type: 'wijs', question: 'Tussen zuid en west ligt...', answer: 'Zuidwest' },
  { type: 'wijs', question: 'Tussen noord en west ligt...', answer: 'Noordwest' },
  { type: 'wijs', question: 'Tussen zuid en oost ligt...', answer: 'Zuidoost' },
  { type: 'wijs', question: 'Het tegenovergestelde van noordoost is...', answer: 'Zuidwest' },
  { type: 'wijs', question: 'Het tegenovergestelde van noordwest is...', answer: 'Zuidoost' },
];

const WIND_HARD = [
  { type: 'draai', question: 'Je kijkt naar het noorden en draait een kwartslag naar rechts. Welke richting kijk je?', answer: 'Oost', startDirection: 'Noord' },
  { type: 'draai', question: 'Je kijkt naar het noorden en draait een kwartslag naar links. Welke richting kijk je?', answer: 'West', startDirection: 'Noord' },
  { type: 'draai', question: 'Je kijkt naar het oosten en draait een kwartslag naar rechts. Welke richting kijk je?', answer: 'Zuid', startDirection: 'Oost' },
  { type: 'draai', question: 'Je kijkt naar het westen en draait een kwartslag naar links. Welke richting kijk je?', answer: 'Zuid', startDirection: 'West' },
  { type: 'draai', question: 'Je kijkt naar het zuiden en draait een halve slag. Welke richting kijk je?', answer: 'Noord', startDirection: 'Zuid' },
  { type: 'draai', question: 'Je kijkt naar het oosten en draait een halve slag. Welke richting kijk je?', answer: 'West', startDirection: 'Oost' },
  { type: 'draai', question: 'Je loopt naar het noorden en slaat linksaf. Welke richting loop je?', answer: 'West', startDirection: 'Noord' },
  { type: 'draai', question: 'Je loopt naar het zuiden en slaat rechtsaf. Welke richting loop je?', answer: 'West', startDirection: 'Zuid' },
  { type: 'draai', question: 'Je loopt naar het westen en slaat rechtsaf. Welke richting loop je?', answer: 'Noord', startDirection: 'West' },
  { type: 'draai', question: 'Je loopt naar het oosten en slaat linksaf. Welke richting loop je?', answer: 'Noord', startDirection: 'Oost' },
  { type: 'draai', question: 'De wind komt uit het noordwesten. Je draait je rug naar de wind. Welke richting kijk je?', answer: 'Zuidoost', startDirection: 'Noordwest' },
  { type: 'draai', question: 'De wind komt uit het zuidwesten. Je draait je rug naar de wind. Welke richting kijk je?', answer: 'Noordoost', startDirection: 'Zuidwest' },
  { type: 'draai', question: 'Je fietst naar het noorden. Je slaat rechtsaf en dan weer rechtsaf. Welke richting fiets je?', answer: 'Zuid', startDirection: 'Noord' },
];

/**
 * Generate a compass question.
 * Returns { question, answer, directions, angleDeg }.
 * `directions` = the list of clickable directions on the compass.
 * `angleDeg` = the correct angle (0=N, clockwise) for highlighting.
 */
export function generateWindrichtingenQuestion(level = 'easy') {
  const pool = level === 'easy'
    ? WIND_EASY
    : level === 'hard'
      ? [...WIND_EASY, ...WIND_MEDIUM, ...WIND_HARD]
      : [...WIND_EASY, ...WIND_MEDIUM];
  const item = pool[Math.floor(Math.random() * pool.length)];
  const directions = level === 'easy' ? HOOFDRICHTINGEN : ALLE_RICHTINGEN;
  return {
    question: item.question,
    answer: item.answer,
    directions,
    angleDeg: RICHTING_GRADEN[item.answer],
    ...(item.startDirection && { startDirection: item.startDirection, startAngleDeg: RICHTING_GRADEN[item.startDirection] }),
  };
}

// ---------------------------------------------------------------------------
// Generators
// ---------------------------------------------------------------------------
function pickQuestion(pool) {
  const item = pool[Math.floor(Math.random() * pool.length)];
  return {
    question: item.question,
    correctAnswer: item.answer,
    wrongAnswers: [...item.wrongAnswers],
  };
}

function pickMemoryPairs(pool, count) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const pairs = [];
  const usedValues = new Set();
  for (const pair of shuffled) {
    if (pairs.length >= count) break;
    if (usedValues.has(pair.left) || usedValues.has(pair.right)) continue;
    usedValues.add(pair.left);
    usedValues.add(pair.right);
    pairs.push(pair);
  }
  return pairs;
}

export function generateNederlandQuestion(level = 'easy') {
  const pool =
    level === 'easy'
      ? NEDERLAND_EASY
      : [...NEDERLAND_EASY, ...NEDERLAND_MEDIUM];
  return pickQuestion(pool);
}

export function generateWereldQuestion(level = 'easy') {
  const pool =
    level === 'easy' ? WERELD_EASY : [...WERELD_EASY, ...WERELD_MEDIUM];
  return pickQuestion(pool);
}

export function generateNederlandMemoryPairs(count = 4, level = 'easy') {
  const pool =
    level === 'easy'
      ? NEDERLAND_MEMORY_EASY
      : [...NEDERLAND_MEMORY_EASY, ...NEDERLAND_MEMORY_MEDIUM];
  return pickMemoryPairs(pool, count);
}
export function generateEuropaQuestion(level = 'easy') {
  const pool =
    level === 'easy' ? EUROPA_EASY : [...EUROPA_EASY, ...EUROPA_MEDIUM];
  return pickQuestion(pool);
}

export function generateEuropaMemoryPairs(count = 4, level = 'easy') {
  const pool =
    level === 'easy'
      ? EUROPA_MEMORY_EASY
      : [...EUROPA_MEMORY_EASY, ...EUROPA_MEMORY_MEDIUM];
  return pickMemoryPairs(pool, count);
}
export function generateWereldMemoryPairs(count = 4, level = 'easy') {
  const pool =
    level === 'easy'
      ? WERELD_MEMORY_EASY
      : [...WERELD_MEMORY_EASY, ...WERELD_MEMORY_MEDIUM];
  return pickMemoryPairs(pool, count);
}
