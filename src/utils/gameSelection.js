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
  kalenderQuiz: 'Kalenderquiz',
  volgordeSorteer: 'Volgorde',
  seizoenenMatch: 'Seizoenen verbinden',
  kalenderMemory: 'Kalender Memory',
  klokVooruit: 'Klok vooruit',
  tijdsduurQuiz: 'Hoe lang duurt het?',
  omrekenMemory: 'Omreken Memory',
  tijdRekenen: 'Rekenen met tijd',
  klokRekenen: 'Klok rekenen',
};

/**
 * Bepaal welke game types beschikbaar zijn op basis van mathSettings.
 * @param {object|null|undefined} mathSettings - De instellingen van het spel
 * @returns {string[]} Array van beschikbare game type strings
 */
export const getAvailableGameTypes = (mathSettings) => {
  const enabled = mathSettings?.enabledOperations || {};
  const hasStandardOps = enabled.add || enabled.sub || enabled.mul;
  const hasPlaceValue = enabled.placeValue;
  const hasLovingHearts = enabled.lovingHearts;
  const hasMoney = enabled.money;
  const hasClock = enabled.clock;
  const hasSpelling = enabled.spelling;
  const hasVocabulary = enabled.vocabulary;
  const hasReading = enabled.reading;
  const hasEnglish = enabled.english;

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
  }
  if (hasVocabulary) {
    availableTypes.push(...VOCABULARY_GAMES);
  }
  if (hasReading) {
    availableTypes.push(...READING_GAMES);
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

  // Fallback naar multiple-choice als niets beschikbaar
  if (availableTypes.length === 0) {
    availableTypes.push('multiple-choice');
  }

  return availableTypes;
};

/**
 * Kies een willekeurig game type uit de beschikbare types.
 * @param {object} mathSettings - De instellingen van het spel
 * @returns {string} Een random game type string
 */
export const pickRandomGameType = (mathSettings) => {
  const availableTypes = getAvailableGameTypes(mathSettings);
  return availableTypes[Math.floor(Math.random() * availableTypes.length)];
};
