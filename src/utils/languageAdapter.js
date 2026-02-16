// ============================================
// TAAL ADAPTER - Generators voor spelling, woordenschat & begrijpend lezen
// ============================================
// Analoog aan difficultyAdapter.js maar voor taaloefeningen.
//
// mathSettings.tpielling       → spelling enabled
// mathSettings.vocabulary     → vocabulary enabled
// mathSettings.reading        → reading comprehension enabled
// mathSettings.spellingCategories → array van categorie-ids die actief zijn, bv [1,2,3]
// mathSettings.includeThemeVocabulary → boolean, thema-woordenschat ook meenemen
// mathSettings.readingLevel   → 'short' | 'long'
// mathSettings.themeId        → id van het gekozen thema (voor thema-woordenschat)

import {
  SPELLING_CATEGORIES,
  SPELLING_WORDS,
  GENERAL_VOCABULARY,
  READING_TEXTS,
  ENGLISH_VOCABULARY,
} from './languageData';
import { getTheme } from './themes';

const randBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Shuffle een array (Fisher-Yates)
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ============================================
// SPELLING
// ============================================

/**
 * Geeft de categorie-id terug voor een woord.
 * Subcategorieën (5a, 5b, 5c, 5d) worden ook als hoofdcategorie 5 herkend.
 */
export const getCategoryForWord = (word) => {
  for (const [catId, words] of Object.entries(SPELLING_WORDS)) {
    if (words.includes(word)) {
      return catId;
    }
  }
  return null;
};

/**
 * Geeft het hoofdcategorie-id terug (subcategorieën 5a-5d → 5)
 */
export const getMainCategoryId = (catId) => {
  const str = String(catId);
  if (str.startsWith('5') && str.length > 1) return 5;
  return Number(str);
};

/**
 * Geeft het categorie-object terug voor een id.
 */
export const getCategoryById = (catId) => {
  const mainId = getMainCategoryId(catId);
  const cat = SPELLING_CATEGORIES.find((c) => c.id === mainId);
  if (!cat) return null;

  // Check subcategorie
  const str = String(catId);
  if (str.startsWith('5') && str.length > 1 && cat.subcategories) {
    const sub = cat.subcategories.find((s) => s.id === str);
    if (sub) return { ...sub, mainId: 5 };
  }
  return cat;
};

/**
 * Genereer een spelling-opgave.
 * Kiest een random woord uit de actieve categorieën.
 * Returns: { type: 'spelling', word, categoryId, categoryName, rule, allCategories }
 */
export const generateSpellingProblem = (settings) => {
  const activeCategories = settings?.spellingCategories || [
    1, 2, 3, 4, 5, 6, 7, 8,
  ];

  // Bouw pool van alle woorden uit actieve categorieën
  const wordPool = [];
  for (const catId of activeCategories) {
    const mainId = Number(catId);
    if (mainId === 5) {
      // Alle subcategorieën van 5
      for (const subId of ['5a', '5b', '5c', '5d']) {
        const words = SPELLING_WORDS[subId] || [];
        words.forEach((w) => wordPool.push({ word: w, categoryId: subId }));
      }
    } else {
      const words = SPELLING_WORDS[mainId] || [];
      words.forEach((w) => wordPool.push({ word: w, categoryId: mainId }));
    }
  }

  if (wordPool.length === 0) {
    // Fallback naar categorie 1
    const words = SPELLING_WORDS[1] || ['kat'];
    const word = words[randBetween(0, words.length - 1)];
    const cat = SPELLING_CATEGORIES[0];
    return {
      type: 'spelling',
      word,
      categoryId: 1,
      categoryName: cat.name,
      rule: cat.rule,
      allCategories: SPELLING_CATEGORIES,
    };
  }

  const chosen = wordPool[randBetween(0, wordPool.length - 1)];
  const cat = getCategoryById(chosen.categoryId);

  return {
    type: 'spelling',
    word: chosen.word,
    categoryId: chosen.categoryId,
    mainCategoryId: getMainCategoryId(chosen.categoryId),
    categoryName: cat?.name || 'Onbekend',
    rule: cat?.rule || '',
    allCategories: SPELLING_CATEGORIES,
  };
};

/**
 * Genereer meerdere unieke spellingproblemen.
 */
export const generateUniqueSpellingProblems = (settings, count = 4) => {
  const problems = [];
  const usedWords = new Set();
  let attempts = 0;

  while (problems.length < count && attempts < count * 20) {
    attempts++;
    const problem = generateSpellingProblem(settings);
    if (!usedWords.has(problem.word)) {
      usedWords.add(problem.word);
      problems.push(problem);
    }
  }

  return problems;
};

/**
 * Genereer spellingproblemen uit elk een ANDERE hoofdcategorie.
 * Gebruikt voor SpellingConnect zodat elk woord een unieke categorie heeft.
 * @param {object} settings - mathSettings met spellingCategories
 * @param {number} count - hoeveel woorden (max = aantal actieve categorieën)
 * @returns {Array} problemen uit verschillende categorieën
 */
export const generateProblemsFromDifferentCategories = (
  settings,
  count = 4,
) => {
  const activeCategories = settings?.spellingCategories || [
    1, 2, 3, 4, 5, 6, 7, 8,
  ];

  // Neem maximaal `count` random categorieën
  const shuffledCats = shuffle([...activeCategories]);
  const selectedCats = shuffledCats.slice(0, count);

  const problems = [];
  for (const catId of selectedCats) {
    // Maak settings die alleen deze categorie bevatten
    const singleCatSettings = { ...settings, spellingCategories: [catId] };
    const problem = generateSpellingProblem(singleCatSettings);
    problems.push(problem);
  }

  return problems;
};

/**
 * Genereer foute categorieën voor een multiple choice spelling-opgave.
 * Geeft categorieën terug die NIET de juiste categorie zijn.
 */
export const generateWrongCategories = (correctCategoryId, count = 3) => {
  const mainId = getMainCategoryId(correctCategoryId);
  const allMainIds = SPELLING_CATEGORIES.map((c) => c.id);
  const wrongIds = allMainIds.filter((id) => id !== mainId);
  const shuffled = shuffle(wrongIds);
  return shuffled.slice(0, count).map((id) => {
    const cat = SPELLING_CATEGORIES.find((c) => c.id === id);
    return { id, name: cat.name, rule: cat.rule, icon: cat.icon };
  });
};

// ============================================
// WOORDENSCHAT (VOCABULARY)
// ============================================

/**
 * Haal de woordenpool op: algemeen + optioneel thema-woorden.
 */
export const getVocabularyPool = (settings) => {
  const pool = [...GENERAL_VOCABULARY];

  if (settings?.includeThemeVocabulary && settings?.themeId) {
    const theme = getTheme(settings.themeId);
    if (theme?.vocabularyWords) {
      pool.push(...theme.vocabularyWords);
    }
  }

  return pool;
};

/**
 * Genereer een woordenschat-opgave.
 * Returns: { type: 'vocabulary', word, definition, wrongDefinitions }
 */
export const generateVocabularyProblem = (settings) => {
  const pool = getVocabularyPool(settings);

  if (pool.length < 4) {
    // Niet genoeg woorden – fallback
    const entry = pool[0] || GENERAL_VOCABULARY[0];
    return {
      type: 'vocabulary',
      word: entry.word,
      definition: entry.definition,
      wrongDefinitions: ['Een dier', 'Een gebouw', 'Een kleur'],
    };
  }

  const shuffled = shuffle(pool);
  const correct = shuffled[0];

  // Kies 3 foute definities uit de rest van de pool
  const wrongDefs = shuffled
    .slice(1)
    .filter((e) => e.definition !== correct.definition)
    .slice(0, 3)
    .map((e) => e.definition);

  // Vul aan als we niet genoeg foute definities hebben
  while (wrongDefs.length < 3) {
    wrongDefs.push('Iets anders.');
  }

  return {
    type: 'vocabulary',
    word: correct.word,
    definition: correct.definition,
    wrongDefinitions: wrongDefs,
  };
};

/**
 * Genereer meerdere unieke woordenschat-opgaven.
 */
export const generateUniqueVocabularyProblems = (settings, count = 4) => {
  const problems = [];
  const usedWords = new Set();
  let attempts = 0;

  while (problems.length < count && attempts < count * 20) {
    attempts++;
    const problem = generateVocabularyProblem(settings);
    if (!usedWords.has(problem.word)) {
      usedWords.add(problem.word);
      problems.push(problem);
    }
  }

  return problems;
};

/**
 * Genereer een invuloefening: zin met een gat, kies het juiste woord.
 * Returns: { type: 'vocabularyFillIn', sentence, correctWord, wrongWords, definition }
 */
export const generateVocabularyFillInProblem = (settings) => {
  const pool = getVocabularyPool(settings).filter((e) => e.exampleSentence);

  if (pool.length < 4) {
    // Fallback naar gewone vocab als er niet genoeg zinnen zijn
    return generateVocabularyProblem(settings);
  }

  const shuffled = shuffle(pool);
  const correct = shuffled[0];

  // Kies 3 foute woorden
  const wrongWords = shuffled
    .slice(1)
    .filter((e) => e.word !== correct.word)
    .slice(0, 3)
    .map((e) => e.word);

  while (wrongWords.length < 3) {
    wrongWords.push('iets');
  }

  return {
    type: 'vocabularyFillIn',
    sentence: correct.exampleSentence,
    correctWord: correct.word,
    wrongWords,
    definition: correct.definition,
  };
};

// ============================================
// BEGRIJPEND LEZEN (READING COMPREHENSION)
// ============================================

/**
 * Haal de leestekstenpool op: algemeen + optioneel thema-teksten.
 */
export const getReadingPool = (settings) => {
  const pool = [...READING_TEXTS];

  if (settings?.includeThemeReading && settings?.themeId) {
    const theme = getTheme(settings.themeId);
    if (theme?.readingTexts) {
      pool.push(...theme.readingTexts);
    }
  }

  return pool;
};

/**
 * Genereer een begrijpend lezen-opgave.
 * Returns: { type: 'reading', text, question, answer, wrongAnswers, level }
 */
export const generateReadingProblem = (settings) => {
  const level = settings?.readingLevel || 'short';
  const allTexts = getReadingPool(settings);

  // Filter op niveau
  let pool = allTexts.filter((t) => t.level === level);

  // Als het niveau 'long' is maar er zijn niet genoeg, neem ook short mee
  if (pool.length === 0) {
    pool = [...allTexts];
  }

  const chosen = pool[randBetween(0, pool.length - 1)];

  return {
    type: 'reading',
    text: chosen.text,
    question: chosen.question,
    answer: chosen.answer,
    wrongAnswers: [...chosen.wrongAnswers],
    level: chosen.level,
  };
};

/**
 * Genereer een waar/niet waar-opgave bij een tekst.
 * Returns: { type: 'readingTrueFalse', text, statements, level }
 */
export const generateReadingTrueFalseProblem = (settings) => {
  const level = settings?.readingLevel || 'short';
  const allTexts = getReadingPool(settings);

  let pool = allTexts.filter(
    (t) => t.level === level && t.statements && t.statements.length >= 4,
  );

  if (pool.length === 0) {
    pool = allTexts.filter((t) => t.statements && t.statements.length >= 4);
  }

  if (pool.length === 0) {
    // Fallback naar gewone reading als er geen statements zijn
    return generateReadingProblem(settings);
  }

  const chosen = pool[randBetween(0, pool.length - 1)];

  // Kies 2 random stellingen uit de 4
  const statements = shuffle([...chosen.statements]).slice(0, 2);

  return {
    type: 'readingTrueFalse',
    text: chosen.text,
    statements,
    level: chosen.level,
  };
};

/**
 * Genereer meerdere unieke begrijpend lezen-opgaven.
 */
export const generateUniqueReadingProblems = (settings, count = 4) => {
  const problems = [];
  const usedTexts = new Set();
  let attempts = 0;

  while (problems.length < count && attempts < count * 20) {
    attempts++;
    const problem = generateReadingProblem(settings);
    if (!usedTexts.has(problem.text)) {
      usedTexts.add(problem.text);
      problems.push(problem);
    }
  }

  return problems;
};

// ============================================
// ENGELSE WOORDENSCHAT (ENGLISH VOCABULARY)
// ============================================

/**
 * Haal de Engelse woordenpool op, gefilterd op niveau.
 * @param {object} settings - mathSettings met englishLevel
 * @returns {Array} gefilterde woordenlijst
 */
export const getEnglishPool = (settings) => {
  const level = settings?.englishLevel || 'easy';
  // Include all words up to and including the selected level
  const levelOrder = ['easy', 'medium', 'hard'];
  const maxIndex = levelOrder.indexOf(level);
  const allowedLevels = levelOrder.slice(0, maxIndex + 1);
  return ENGLISH_VOCABULARY.filter((w) => allowedLevels.includes(w.level));
};

/**
 * Bepaal wat de vraag- en antwoordtaal is op basis van richting.
 * @param {object} entry - { english, dutch }
 * @param {string} direction - 'nl-en' | 'en-nl' | 'both'
 * @returns {{ question: string, answer: string, questionLang: string, answerLang: string }}
 */
const getDirectionPair = (entry, direction) => {
  const dir = direction || 'nl-en';
  let useNlToEn;
  if (dir === 'both') {
    useNlToEn = Math.random() < 0.5;
  } else {
    useNlToEn = dir === 'nl-en';
  }

  if (useNlToEn) {
    return {
      question: entry.dutch,
      answer: entry.english,
      questionLang: 'nl',
      answerLang: 'en',
    };
  }
  return {
    question: entry.english,
    answer: entry.dutch,
    questionLang: 'en',
    answerLang: 'nl',
  };
};

/**
 * Genereer een Engels multiple-choice opgave.
 * Returns: { type: 'englishMultipleChoice', question, answer, wrongAnswers, questionLang, answerLang }
 */
export const generateEnglishMultipleChoice = (settings) => {
  const pool = getEnglishPool(settings);
  const direction = settings?.englishDirection || 'nl-en';

  if (pool.length < 4) {
    const entry = pool[0] || ENGLISH_VOCABULARY[0];
    const pair = getDirectionPair(entry, direction);
    return {
      type: 'englishMultipleChoice',
      ...pair,
      wrongAnswers: ['word1', 'word2', 'word3'],
    };
  }

  const shuffled = shuffle(pool);
  const correct = shuffled[0];
  const pair = getDirectionPair(correct, direction);

  // Genereer foute antwoorden in dezelfde taal als het antwoord
  const wrongAnswers = shuffled
    .slice(1)
    .filter((e) => {
      const wrongVal = pair.answerLang === 'en' ? e.english : e.dutch;
      return wrongVal !== pair.answer;
    })
    .slice(0, 3)
    .map((e) => (pair.answerLang === 'en' ? e.english : e.dutch));

  while (wrongAnswers.length < 3) {
    wrongAnswers.push(pair.answerLang === 'en' ? 'something' : 'iets');
  }

  return {
    type: 'englishMultipleChoice',
    ...pair,
    wrongAnswers,
  };
};

/**
 * Genereer meerdere unieke Engelse opgaven voor memory.
 * Returns: Array van { question, answer, questionLang, answerLang }
 */
export const generateEnglishMemoryPairs = (settings, count = 4) => {
  const pool = getEnglishPool(settings);
  const direction = settings?.englishDirection || 'nl-en';
  const shuffled = shuffle(pool);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  return selected.map((entry) => {
    const pair = getDirectionPair(entry, direction);
    return pair;
  });
};

/**
 * Genereer een Engelse invuloefening (fill-in-the-blank).
 * Alleen beschikbaar voor medium/hard woorden met exampleSentence.
 * Returns: { type: 'englishFillIn', sentence, correctWord, wrongWords, dutch }
 */
export const generateEnglishFillIn = (settings) => {
  const pool = getEnglishPool(settings).filter((e) => e.exampleSentence);

  if (pool.length < 4) {
    // Fallback naar multiple choice
    return generateEnglishMultipleChoice(settings);
  }

  const shuffled = shuffle(pool);
  const correct = shuffled[0];

  const wrongWords = shuffled
    .slice(1)
    .filter((e) => e.english !== correct.english)
    .slice(0, 3)
    .map((e) => e.english);

  while (wrongWords.length < 3) {
    wrongWords.push('something');
  }

  return {
    type: 'englishFillIn',
    sentence: correct.exampleSentence,
    correctWord: correct.english,
    wrongWords,
    dutch: correct.dutch,
  };
};

/**
 * Genereer een Engelse typ-opgave.
 * Respecteert de richtingsinstelling (NL→EN, EN→NL, beide).
 * Returns: { type: 'englishTypeWord', dutch, english, prompt, answer, promptLang, answerLang }
 */
export const generateEnglishTypeWord = (settings) => {
  const pool = getEnglishPool(settings);
  const chosen = pool[randBetween(0, pool.length - 1)];
  const direction = settings?.englishDirection || 'nl-en';

  let promptLang;
  if (direction === 'both') {
    promptLang = Math.random() < 0.5 ? 'nl' : 'en';
  } else if (direction === 'en-nl') {
    promptLang = 'en';
  } else {
    promptLang = 'nl';
  }
  const answerLang = promptLang === 'nl' ? 'en' : 'nl';

  return {
    type: 'englishTypeWord',
    dutch: chosen.dutch,
    english: chosen.english,
    prompt: promptLang === 'nl' ? chosen.dutch : chosen.english,
    answer: promptLang === 'nl' ? chosen.english : chosen.dutch,
    promptLang,
    answerLang,
  };
};

/**
 * Genereer opgaven uit verschillende woorden voor connect.
 * Returns: Array van { dutch, english }
 */
export const generateEnglishConnectPairs = (settings, count = 4) => {
  const pool = getEnglishPool(settings);
  const shuffled = shuffle(pool);
  return shuffled.slice(0, Math.min(count, shuffled.length)).map((e) => ({
    dutch: e.dutch,
    english: e.english,
  }));
};

// ============================================
// HOOFD GENERATOR
// ============================================

/**
 * Genereer een taalopgave op basis van instellingen.
 * Kiest random uit de actieve taalonderdelen.
 */
export const generateLanguageProblem = (settings) => {
  const enabled = settings?.enabledOperations || {};
  const pool = [];

  if (enabled.spelling) pool.push('spelling');
  if (enabled.vocabulary) pool.push('vocabulary');
  if (enabled.reading) pool.push('reading');
  if (enabled.english) pool.push('english');

  if (pool.length === 0) {
    // Fallback
    return generateSpellingProblem(settings);
  }

  const type = pool[randBetween(0, pool.length - 1)];

  switch (type) {
    case 'spelling':
      return generateSpellingProblem(settings);
    case 'vocabulary':
      return generateVocabularyProblem(settings);
    case 'reading':
      return generateReadingProblem(settings);
    case 'english':
      return generateEnglishMultipleChoice(settings);
    default:
      return generateSpellingProblem(settings);
  }
};
