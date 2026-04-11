// Game type selection logic - extracted from ChallengeModal.jsx
// Determines which minigame types are available based on mathSettings.

// Standaard minigames voor reguliere sommen (add/sub/mul)
export const STANDARD_GAMES = ['multiple-choice', 'memory', 'puzzle', 'darts'];

// Money minigames
export const MONEY_GAMES = ['makeAmount', 'countMoney', 'smartPay', 'change'];

// Clock minigames
export const CLOCK_GAMES = [
  'clockMultipleChoice',
  'clockMemory',
  'clockInput',
  'clockMatchAnalog',
];

// Spelling minigames
export const SPELLING_GAMES = [
  'spellingCategoryMatch',
  'spellingConnect',
  'spellingTypeWord',
];

// Vocabulary minigames
export const VOCABULARY_GAMES = [
  'vocabularyMatch',
  'vocabularyMemory',
  'vocabularyFillIn',
];

// Reading comprehension minigames
export const READING_GAMES = ['readingComprehension', 'readingTrueFalse'];

// English vocabulary minigames
export const ENGLISH_GAMES = [
  'englishMultipleChoice',
  'englishMemory',
  'englishConnect',
];

// Time awareness minigames
export const TIME_AWARENESS_GAMES = [
  'kalenderQuiz',
  'volgordeSorteer',
  'kalenderMemory',
];

// Time calculation minigames
export const TIME_CALCULATION_GAMES = [
  'klokVooruit',
  'tijdsduurQuiz',
  'omrekenMemory',
  'tijdRekenen',
  'klokRekenen',
];

// Rijmen minigames
export const RIJMEN_GAMES = ['rijmMatch', 'rijmMemory'];

// Woordsoorten minigames
export const WOORDSOORTEN_GAMES = [
  'woordsoortKies',
  'woordsoortSorteer',
  'woordsoortMemory',
];

// Fraction minigames
export const FRACTION_GAMES = [
  'fractionIdentify',
  'fractionCompare',
  'fractionMemory',
];

// Puzzle minigames
export const PUZZLE_GAMES = ['sudoku', 'tectonic', 'binary', 'chess'];

// Meetkunde (Geometry) minigames
export const VORMEN_GAMES = ['vormenQuiz', 'vormenMemory'];
export const EENHEDEN_GAMES = ['eenhedenQuiz', 'eenhedenMemory'];
export const MEETKUNDE_GAMES = [
  ...VORMEN_GAMES,
  ...EENHEDEN_GAMES,
  'omtrekOppervlakteQuiz',
];

// Digitale geletterdheid minigames
export const DIGITAAL_GAMES = [
  'digitaalQuiz',
  'digitaalMemory',
  'digitaalConnect',
  'veiligheidQuiz',
];

// Topografie minigames
export const NEDERLAND_GAMES = [
  'topoNederlandQuiz',
  'topoNederlandMemory',
  'topoNederlandKaart',
];
export const EUROPA_GAMES = [
  'topoEuropaQuiz',
  'topoEuropaMemory',
  'topoEuropaKaart',
];
export const WERELD_GAMES = [
  'topoWereldQuiz',
  'topoWereldMemory',
  'topoWereldKaart',
];
export const TOPOGRAFIE_GAMES = [
  ...NEDERLAND_GAMES,
  ...EUROPA_GAMES,
  ...WERELD_GAMES,
];

// Verkeer minigames
export const BORDEN_GAMES = ['verkeerBordenQuiz', 'verkeerBordenMemory'];
export const REGELS_GAMES = ['verkeerRegelsQuiz', 'verkeerRegelsMemory'];
export const VERKEER_GAMES = [...BORDEN_GAMES, ...REGELS_GAMES];

export const GAME_NAMES = {
  'multiple-choice': 'Kies het antwoord',
  memory: 'Memory',
  puzzle: 'Sommenblad',
  darts: 'Darts',
  placeValue: 'Getallen begrijpen',
  lovingHearts: 'Verliefde harten',
  makeAmount: 'Maak het bedrag',
  countMoney: 'Tel het geld',
  smartPay: 'Slim betalen',
  change: 'Wisselgeld',
  clockMultipleChoice: 'Hoe laat is het?',
  clockMemory: 'Klok Memory',
  clockInput: 'Typ de tijd',
  clockMatchAnalog: 'Welke klok?',
  clock24h: '24-uursklok',
  clockWords: 'Schrijf de tijd',
  spellingCategoryMatch: 'Spellingcategorie',
  spellingConnect: 'Verbind de categorie',
  spellingTypeWord: 'Typ het woord',
  spellingTransform: 'Meervoud & verkleinwoord',
  vocabularyMatch: 'Woordenschat',
  vocabularyMemory: 'Woorden Memory',
  vocabularyFillIn: 'Vul het woord in',
  readingComprehension: 'Begrijpend lezen',
  readingTrueFalse: 'Waar of niet waar',
  englishMultipleChoice: 'Engels vertalen',
  englishMemory: 'Engels Memory',
  englishTypeWord: 'Typ het Engelse woord',
  englishFillIn: 'Engels invullen',
  englishConnect: 'Engels verbinden',
  fractionIdentify: 'Welke breuk?',
  fractionCompare: 'Welke is groter?',
  fractionMemory: 'Breuken Memory',
  rijmMatch: 'Welk woord rijmt?',
  rijmMemory: 'Rijm Memory',
  woordsoortKies: 'Wat voor woord?',
  woordsoortSorteer: 'Woordsoorten sorteren',
  woordsoortMemory: 'Woordsoorten Memory',

  kalenderQuiz: 'Kalenderquiz',
  volgordeSorteer: 'Volgorde',
  seizoenenMatch: 'Seizoenen verbinden',
  kalenderMemory: 'Kalender Memory',
  klokVooruit: 'Klok vooruit',
  tijdsduurQuiz: 'Hoe lang duurt het?',
  omrekenMemory: 'Omreken Memory',
  tijdRekenen: 'Rekenen met tijd',
  klokRekenen: 'Klok rekenen',
  sudoku: 'Sudoku',
  tectonic: 'Tectonic',
  binary: 'Binair',
  chess: 'Schaken',

  vormenQuiz: 'Vormen herkennen',
  vormenMemory: 'Vormen Memory',
  symmetrieQuiz: 'Symmetrie',
  eenhedenQuiz: 'Eenheden omrekenen',
  eenhedenMemory: 'Eenheden Memory',
  omtrekOppervlakteQuiz: 'Omtrek & oppervlakte',

  digitaalQuiz: 'Digitale kennis',
  digitaalMemory: 'Digitaal Memory',
  digitaalConnect: 'Begrippen verbinden',
  veiligheidQuiz: 'Online veiligheid',

  topoNederlandQuiz: 'Nederland quiz',
  topoNederlandMemory: 'Nederland Memory',
  topoNederlandKaart: 'Nederland kaart',
  topoEuropaQuiz: 'Europa quiz',
  topoEuropaMemory: 'Europa Memory',
  topoEuropaKaart: 'Europa kaart',
  topoWereldQuiz: 'De wereld quiz',
  topoWereldMemory: 'De wereld Memory',
  topoWereldKaart: 'De wereld kaart',

  verkeerBordenQuiz: 'Verkeersborden quiz',
  verkeerBordenMemory: 'Verkeersborden Memory',
  verkeerRegelsQuiz: 'Verkeersregels quiz',
  verkeerRegelsMemory: 'Verkeersregels Memory',
};

/**
 * Bepaal welke game types beschikbaar zijn op basis van mathSettings.
 * @param {object|null|undefined} mathSettings - De instellingen van het spel
 * @returns {string[]} Array van beschikbare game type strings
 */
export const getAvailableGameTypes = (mathSettings) => {
  const enabled = mathSettings?.enabledOperations || {};
  const hasStandardOps =
    enabled.add || enabled.sub || enabled.mul || enabled.div;
  const hasPlaceValue = enabled.placeValue;
  const hasLovingHearts = enabled.lovingHearts;
  const hasMoney = enabled.money;
  const hasFractions = enabled.fractions;
  const hasClock = enabled.clock;
  const hasSpelling = enabled.spelling;
  const hasVocabulary = enabled.vocabulary;
  const hasReading = enabled.reading;
  const hasEnglish = enabled.english;
  const hasRijmen = enabled.rijmen;
  const hasWoordsoorten = enabled.woordsoorten;

  // Bouw pool van beschikbare game types
  const availableTypes = [];

  if (hasStandardOps) {
    availableTypes.push(...STANDARD_GAMES);
  }
  if (hasPlaceValue) {
    availableTypes.push('placeValue');
  }
  if (hasLovingHearts) {
    availableTypes.push('lovingHearts');
  }
  if (hasMoney) {
    availableTypes.push(...MONEY_GAMES);
  }
  if (hasFractions) {
    availableTypes.push(...FRACTION_GAMES);
  }
  if (hasClock) {
    availableTypes.push(...CLOCK_GAMES);
    if (mathSettings?.clock24h) {
      availableTypes.push('clock24h');
    }
    if (mathSettings?.clockWords) {
      availableTypes.push('clockWords');
    }
  }
  if (hasSpelling) {
    availableTypes.push('spellingCategoryMatch', 'spellingTypeWord');
    // SpellingConnect alleen als er 2+ categorieën geselecteerd zijn
    const spellingCatCount = (mathSettings?.spellingCategories || []).length;
    if (spellingCatCount >= 2) {
      availableTypes.push('spellingConnect');
    }
    // SpellingTransform alleen als cat 9 of 10 actief is
    const spellingCats = (mathSettings?.spellingCategories || []).map(Number);
    if (spellingCats.includes(9) || spellingCats.includes(10)) {
      availableTypes.push('spellingTransform');
    }
  }
  if (hasVocabulary) {
    availableTypes.push(...VOCABULARY_GAMES);
  }
  if (hasReading) {
    availableTypes.push(...READING_GAMES);
  }
  if (hasRijmen) {
    availableTypes.push(...RIJMEN_GAMES);
  }
  if (hasWoordsoorten) {
    availableTypes.push(...WOORDSOORTEN_GAMES);
  }
  if (hasEnglish) {
    availableTypes.push(...ENGLISH_GAMES);
    // EnglishTypeWord en EnglishFillIn alleen vanaf medium niveau
    const level = mathSettings?.englishLevel || 'easy';
    if (level === 'medium' || level === 'hard') {
      availableTypes.push('englishTypeWord', 'englishFillIn');
    }
  }

  // Time awareness
  const hasTimeAwareness = enabled.timeAwareness;
  if (hasTimeAwareness) {
    const hasDagen = mathSettings?.timeAwarenessDagen ?? true;
    const hasMaanden = mathSettings?.timeAwarenessMaanden ?? true;
    const hasSeizoen = mathSettings?.timeAwarenessSeizoen ?? true;
    if (hasDagen || hasMaanden || hasSeizoen) {
      availableTypes.push(...TIME_AWARENESS_GAMES);
      // SeizoenenMatch alleen als seizoenen aan staat
      if (hasSeizoen) {
        availableTypes.push('seizoenenMatch');
      }
    }
  }

  // Time calculation
  const hasTimeCalculation = enabled.timeCalculation;
  if (hasTimeCalculation) {
    const timeCalcLevel = mathSettings?.timeCalcLevel || 'wholeHours';
    if (timeCalcLevel === 'daysWeeks') {
      // KlokRekenen maakt geen zin bij dagen & weken (geen analoge klok)
      availableTypes.push(
        ...TIME_CALCULATION_GAMES.filter((g) => g !== 'klokRekenen'),
      );
    } else {
      availableTypes.push(...TIME_CALCULATION_GAMES);
    }
  }

  // Puzzles
  const hasSudoku = enabled.sudoku;
  const hasTectonic = enabled.tectonic;
  const hasBinary = enabled.binary;
  const hasChess = enabled.chess;
  if (hasSudoku) availableTypes.push('sudoku');
  if (hasTectonic) availableTypes.push('tectonic');
  if (hasBinary) availableTypes.push('binary');
  if (hasChess) availableTypes.push('chess');

  // Meetkunde (Geometry)
  const hasVormen = enabled.vormen;
  const hasSymmetrie = enabled.symmetrie;
  const hasOmtrekOppervlakte = enabled.omtrekOppervlakte;
  const hasEenheden = enabled.eenheden;
  if (hasVormen) availableTypes.push(...VORMEN_GAMES);
  if (hasSymmetrie) availableTypes.push('symmetrieQuiz');
  if (hasOmtrekOppervlakte) availableTypes.push('omtrekOppervlakteQuiz');
  if (hasEenheden) availableTypes.push(...EENHEDEN_GAMES);

  // Digitale geletterdheid
  const hasComputerkennis = enabled.computerkennis;
  const hasVeiligheid = enabled.veiligheid;
  const hasMediawijsheid = enabled.mediawijsheid;
  if (hasComputerkennis) {
    availableTypes.push('digitaalQuiz', 'digitaalMemory', 'digitaalConnect');
  }
  if (hasVeiligheid || hasMediawijsheid) {
    availableTypes.push('veiligheidQuiz');
    // Also add general digitaalQuiz if not already added
    if (!hasComputerkennis) availableTypes.push('digitaalQuiz');
  }

  // Topografie
  if (enabled.nederland) availableTypes.push(...NEDERLAND_GAMES);
  if (enabled.europa) availableTypes.push(...EUROPA_GAMES);
  if (enabled.wereld) availableTypes.push(...WERELD_GAMES);

  // Verkeer
  if (enabled.borden) availableTypes.push(...BORDEN_GAMES);
  if (enabled.regels) availableTypes.push(...REGELS_GAMES);

  // Fallback naar multiple-choice als niets beschikbaar
  if (availableTypes.length === 0) {
    availableTypes.push('multiple-choice');
  }

  return availableTypes;
};

/**
 * Kies een game type met round-robin verdeling.
 * Houdt bij welke types al gespeeld zijn en kiest uit de nog-niet-gespeelde.
 * Als alle types gespeeld zijn, reset de lijst en begin opnieuw.
 *
 * LET OP: deze functie muteert playedTypes NIET. De aanroeper is verantwoordelijk
 * om het gekozen type pas toe te voegen aan playedTypes nadat de challenge
 * succesvol is afgerond (zodat een kind niet kan weglopen om moeilijke games te skippen).
 *
 * @param {object} mathSettings - De instellingen van het spel
 * @param {string[]} playedTypes - Array van al voltooide game types
 * @returns {string} Een game type string
 */
export const pickRandomGameType = (mathSettings, playedTypes = []) => {
  const availableTypes = getAvailableGameTypes(mathSettings);

  // Filter out already-played types
  let remaining = availableTypes.filter((t) => !playedTypes.includes(t));

  // If all types have been played, reset the list
  if (remaining.length === 0) {
    playedTypes.length = 0;
    remaining = availableTypes;
  }

  const chosen = remaining[Math.floor(Math.random() * remaining.length)];

  return chosen;
};
