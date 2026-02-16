import { describe, it, expect } from 'vitest';
import {
  generateSpellingProblem,
  generateUniqueSpellingProblems,
  generateProblemsFromDifferentCategories,
  generateWrongCategories,
  getCategoryForWord,
  getMainCategoryId,
  getCategoryById,
  generateVocabularyProblem,
  generateUniqueVocabularyProblems,
  getVocabularyPool,
  getReadingPool,
  generateVocabularyFillInProblem,
  generateReadingProblem,
  generateUniqueReadingProblems,
  generateReadingTrueFalseProblem,
  generateLanguageProblem,
  getEnglishPool,
  generateEnglishMultipleChoice,
  generateEnglishMemoryPairs,
  generateEnglishFillIn,
  generateEnglishTypeWord,
  generateEnglishConnectPairs,
} from '../languageAdapter';
import {
  SPELLING_CATEGORIES,
  SPELLING_WORDS,
  GENERAL_VOCABULARY,
  READING_TEXTS,
  ENGLISH_VOCABULARY,
} from '../languageData';
import { THEMES } from '../themes';

// ============================================
// HELPER: categorie ID lookup
// ============================================

describe('getCategoryForWord', () => {
  it('should find the category for known words', () => {
    // Object.entries returns string keys, so category ids are strings
    expect(getCategoryForWord('kat')).toBe('1');
    expect(getCategoryForWord('zing')).toBe('2');
    expect(getCategoryForWord('lucht')).toBe('3');
    expect(getCategoryForWord('plank')).toBe('4');
    expect(getCategoryForWord('beer')).toBe('5a');
    expect(getCategoryForWord('hoor')).toBe('5b');
    expect(getCategoryForWord('geur')).toBe('5c');
    expect(getCategoryForWord('geel')).toBe('5d');
    expect(getCategoryForWord('mooi')).toBe('6');
    expect(getCategoryForWord('nieuw')).toBe('7');
    expect(getCategoryForWord('hart')).toBe('8');
  });

  it('should return null for unknown words', () => {
    expect(getCategoryForWord('onbekendwoord123')).toBeNull();
  });
});

describe('getMainCategoryId', () => {
  it('should map subcategory ids to main category 5', () => {
    expect(getMainCategoryId('5a')).toBe(5);
    expect(getMainCategoryId('5b')).toBe(5);
    expect(getMainCategoryId('5c')).toBe(5);
    expect(getMainCategoryId('5d')).toBe(5);
  });

  it('should return the id itself for non-subcategories', () => {
    expect(getMainCategoryId(1)).toBe(1);
    expect(getMainCategoryId(2)).toBe(2);
    expect(getMainCategoryId(8)).toBe(8);
  });
});

describe('getCategoryById', () => {
  it('should return the category object for main categories', () => {
    const cat = getCategoryById(1);
    expect(cat.name).toBe('Hakwoord');
  });

  it('should return subcategory info for 5a-5d', () => {
    const cat = getCategoryById('5a');
    expect(cat.name).toBe('Eer-woord');
    expect(cat.mainId).toBe(5);
  });

  it('should return main category 5 when given just 5', () => {
    const cat = getCategoryById(5);
    expect(cat.name).toBe('Eer-oor-eur-eel-woord');
  });
});

// ============================================
// SPELLING PROBLEMS
// ============================================

describe('generateSpellingProblem', () => {
  it('should generate a valid spelling problem with all categories', () => {
    const settings = {
      spellingCategories: [1, 2, 3, 4, 5, 6, 7, 8],
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateSpellingProblem(settings);
      expect(problem.type).toBe('spelling');
      expect(problem.word).toBeTruthy();
      expect(problem.categoryId).toBeTruthy();
      expect(problem.categoryName).toBeTruthy();
      expect(problem.rule).toBeTruthy();
      expect(problem.allCategories).toHaveLength(8);
    }
  });

  it('should only use words from active categories', () => {
    const settings = {
      spellingCategories: [1], // Only Hakwoorden
    };

    for (let i = 0; i < 30; i++) {
      const problem = generateSpellingProblem(settings);
      expect(problem.mainCategoryId).toBe(1);
      expect(SPELLING_WORDS[1]).toContain(problem.word);
    }
  });

  it('should handle category 5 with subcategories', () => {
    const settings = {
      spellingCategories: [5],
    };

    const foundSubcats = new Set();
    for (let i = 0; i < 100; i++) {
      const problem = generateSpellingProblem(settings);
      expect(problem.mainCategoryId).toBe(5);
      foundSubcats.add(String(problem.categoryId));
    }

    // Should have found at least some subcategories
    expect(foundSubcats.size).toBeGreaterThanOrEqual(2);
  });

  it('should fallback to category 1 when no categories active', () => {
    const settings = {
      spellingCategories: [],
    };

    const problem = generateSpellingProblem(settings);
    expect(problem.type).toBe('spelling');
    expect(problem.word).toBeTruthy();
  });

  it('should work without settings', () => {
    const problem = generateSpellingProblem();
    expect(problem.type).toBe('spelling');
    expect(problem.word).toBeTruthy();
  });

  it('should handle multiple specific categories', () => {
    const settings = {
      spellingCategories: [2, 3], // Only Zingwoorden and Luchtwoorden
    };

    for (let i = 0; i < 30; i++) {
      const problem = generateSpellingProblem(settings);
      const mainId = problem.mainCategoryId;
      expect([2, 3]).toContain(mainId);
    }
  });
});

describe('generateUniqueSpellingProblems', () => {
  it('should generate unique problems', () => {
    const settings = {
      spellingCategories: [1, 2, 3, 4, 5, 6, 7, 8],
    };

    const problems = generateUniqueSpellingProblems(settings, 6);
    expect(problems.length).toBe(6);

    const words = problems.map((p) => p.word);
    const uniqueWords = new Set(words);
    expect(uniqueWords.size).toBe(6);
  });

  it('should not exceed available words', () => {
    const settings = {
      spellingCategories: [7], // Eeuw-ieuw - only ~8 words
    };

    const problems = generateUniqueSpellingProblems(settings, 20);
    // Should get at most the number of available words
    expect(problems.length).toBeLessThanOrEqual(SPELLING_WORDS[7].length);
    expect(problems.length).toBeGreaterThan(0);
  });
});

describe('generateProblemsFromDifferentCategories', () => {
  it('should return words from different categories', () => {
    const settings = { spellingCategories: [1, 2, 3, 4, 5, 6, 7, 8] };
    const problems = generateProblemsFromDifferentCategories(settings, 4);
    expect(problems).toHaveLength(4);

    const mainIds = problems.map((p) => getMainCategoryId(p.categoryId));
    const uniqueIds = new Set(mainIds);
    expect(uniqueIds.size).toBe(4);
  });

  it('should respect the selected category count', () => {
    const settings = { spellingCategories: [1, 3] };
    const problems = generateProblemsFromDifferentCategories(settings, 4);
    // Can't get more than 2 different categories
    expect(problems).toHaveLength(2);
  });

  it('should work with 3 categories', () => {
    const settings = { spellingCategories: [2, 5, 8] };
    const problems = generateProblemsFromDifferentCategories(settings, 3);
    expect(problems).toHaveLength(3);

    const mainIds = problems.map((p) => getMainCategoryId(p.categoryId));
    const uniqueIds = new Set(mainIds);
    expect(uniqueIds.size).toBe(3);
  });
});

describe('generateWrongCategories', () => {
  it('should return categories that are not the correct one', () => {
    const wrongs = generateWrongCategories(1, 3);
    expect(wrongs).toHaveLength(3);
    wrongs.forEach((w) => {
      expect(w.id).not.toBe(1);
      expect(w.name).toBeTruthy();
    });
  });

  it('should handle subcategory ids', () => {
    const wrongs = generateWrongCategories('5a', 3);
    expect(wrongs).toHaveLength(3);
    wrongs.forEach((w) => {
      expect(w.id).not.toBe(5); // Main category of 5a
    });
  });

  it('should return requested count', () => {
    const wrongs = generateWrongCategories(3, 5);
    expect(wrongs).toHaveLength(5);
  });
});

// ============================================
// VOCABULARY PROBLEMS
// ============================================

describe('generateVocabularyProblem', () => {
  it('should generate a valid vocabulary problem', () => {
    for (let i = 0; i < 30; i++) {
      const problem = generateVocabularyProblem({});
      expect(problem.type).toBe('vocabulary');
      expect(problem.word).toBeTruthy();
      expect(problem.definition).toBeTruthy();
      expect(problem.wrongDefinitions).toHaveLength(3);

      // Wrong definitions should not include the correct one
      problem.wrongDefinitions.forEach((wd) => {
        expect(wd).not.toBe(problem.definition);
      });
    }
  });

  it('should include theme vocabulary when enabled', () => {
    const settings = {
      includeThemeVocabulary: true,
      themeId: 'space',
    };

    const pool = getVocabularyPool(settings);
    expect(pool.length).toBeGreaterThan(GENERAL_VOCABULARY.length);
  });

  it('should not include theme vocabulary when disabled', () => {
    const settings = {
      includeThemeVocabulary: false,
      themeId: 'space',
    };

    const pool = getVocabularyPool(settings);
    expect(pool.length).toBe(GENERAL_VOCABULARY.length);
  });

  it('should handle missing themeId gracefully', () => {
    const settings = {
      includeThemeVocabulary: true,
      // no themeId
    };

    const pool = getVocabularyPool(settings);
    expect(pool.length).toBe(GENERAL_VOCABULARY.length);
  });
});

describe('generateUniqueVocabularyProblems', () => {
  it('should generate unique vocabulary problems', () => {
    const problems = generateUniqueVocabularyProblems({}, 5);
    expect(problems.length).toBe(5);

    const words = problems.map((p) => p.word);
    const uniqueWords = new Set(words);
    expect(uniqueWords.size).toBe(5);
  });
});

// ============================================
// READING COMPREHENSION
// ============================================

describe('generateReadingProblem', () => {
  it('should generate a valid reading problem', () => {
    for (let i = 0; i < 20; i++) {
      const problem = generateReadingProblem({ readingLevel: 'short' });
      expect(problem.type).toBe('reading');
      expect(problem.text).toBeTruthy();
      expect(problem.question).toBeTruthy();
      expect(problem.answer).toBeTruthy();
      expect(problem.wrongAnswers).toHaveLength(3);
    }
  });

  it('should filter by level - short', () => {
    for (let i = 0; i < 20; i++) {
      const problem = generateReadingProblem({ readingLevel: 'short' });
      expect(problem.level).toBe('short');
    }
  });

  it('should filter by level - long', () => {
    for (let i = 0; i < 20; i++) {
      const problem = generateReadingProblem({ readingLevel: 'long' });
      expect(problem.level).toBe('long');
    }
  });

  it('should not include correct answer in wrongAnswers', () => {
    for (let i = 0; i < 30; i++) {
      const problem = generateReadingProblem({});
      problem.wrongAnswers.forEach((wa) => {
        expect(wa).not.toBe(problem.answer);
      });
    }
  });

  it('should default to short level', () => {
    const problem = generateReadingProblem({});
    expect(problem.level).toBe('short');
  });
});

describe('generateUniqueReadingProblems', () => {
  it('should generate unique reading problems', () => {
    const problems = generateUniqueReadingProblems(
      { readingLevel: 'short' },
      4,
    );
    expect(problems.length).toBe(4);

    const texts = problems.map((p) => p.text);
    const uniqueTexts = new Set(texts);
    expect(uniqueTexts.size).toBe(4);
  });
});

// ============================================
// VOCABULARY FILL-IN
// ============================================

describe('generateVocabularyFillInProblem', () => {
  it('should generate a valid fill-in problem', () => {
    for (let i = 0; i < 30; i++) {
      const problem = generateVocabularyFillInProblem({});
      expect(problem.type).toBe('vocabularyFillIn');
      expect(problem.sentence).toBeTruthy();
      expect(problem.correctWord).toBeTruthy();
      expect(problem.wrongWords).toHaveLength(3);
      expect(problem.definition).toBeTruthy();
    }
  });

  it('should not include correct word in wrong words', () => {
    for (let i = 0; i < 30; i++) {
      const problem = generateVocabularyFillInProblem({});
      problem.wrongWords.forEach((ww) => {
        expect(ww).not.toBe(problem.correctWord);
      });
    }
  });

  it('should include the correct word somewhere in the sentence', () => {
    for (let i = 0; i < 20; i++) {
      const problem = generateVocabularyFillInProblem({});
      // The sentence should contain the word (case-insensitive)
      expect(problem.sentence.toLowerCase()).toContain(
        problem.correctWord.toLowerCase(),
      );
    }
  });

  it('should work with theme vocabulary', () => {
    const settings = {
      includeThemeVocabulary: true,
      themeId: 'space',
    };

    for (let i = 0; i < 10; i++) {
      const problem = generateVocabularyFillInProblem(settings);
      expect(problem.type).toBe('vocabularyFillIn');
      expect(problem.sentence).toBeTruthy();
    }
  });
});

// ============================================
// READING TRUE/FALSE
// ============================================

describe('generateReadingTrueFalseProblem', () => {
  it('should generate a valid true/false problem', () => {
    for (let i = 0; i < 20; i++) {
      const problem = generateReadingTrueFalseProblem({
        readingLevel: 'short',
      });
      expect(problem.type).toBe('readingTrueFalse');
      expect(problem.text).toBeTruthy();
      expect(problem.statements).toHaveLength(2);
      expect(problem.level).toBeTruthy();
    }
  });

  it('should have statements with text and isTrue properties', () => {
    const problem = generateReadingTrueFalseProblem({});
    problem.statements.forEach((s) => {
      expect(s.text).toBeTruthy();
      expect(typeof s.isTrue).toBe('boolean');
    });
  });

  it('should filter by level', () => {
    for (let i = 0; i < 20; i++) {
      const problem = generateReadingTrueFalseProblem({
        readingLevel: 'short',
      });
      expect(problem.level).toBe('short');
    }
  });

  it('should work with long texts', () => {
    for (let i = 0; i < 20; i++) {
      const problem = generateReadingTrueFalseProblem({ readingLevel: 'long' });
      expect(problem.level).toBe('long');
    }
  });

  it('should default to short level', () => {
    const problem = generateReadingTrueFalseProblem({});
    expect(problem.level).toBe('short');
  });
});

// ============================================
// READING POOL (theme reading texts)
// ============================================

describe('getReadingPool', () => {
  it('should return only general texts when includeThemeReading is false', () => {
    const pool = getReadingPool({
      includeThemeReading: false,
      themeId: 'space',
    });
    expect(pool.length).toBe(READING_TEXTS.length);
  });

  it('should include theme texts when includeThemeReading is true', () => {
    const pool = getReadingPool({
      includeThemeReading: true,
      themeId: 'space',
    });
    expect(pool.length).toBeGreaterThan(READING_TEXTS.length);
  });

  it('should handle missing themeId gracefully', () => {
    const pool = getReadingPool({ includeThemeReading: true });
    expect(pool.length).toBe(READING_TEXTS.length);
  });

  it('should handle empty settings gracefully', () => {
    const pool = getReadingPool({});
    expect(pool.length).toBe(READING_TEXTS.length);
  });

  it('should include theme texts for all themes', () => {
    for (const theme of Object.values(THEMES)) {
      const pool = getReadingPool({
        includeThemeReading: true,
        themeId: theme.id,
      });
      expect(pool.length).toBeGreaterThan(READING_TEXTS.length);
    }
  });
});

// ============================================
// THEME READING TEXTS DATA INTEGRITY
// ============================================

describe('theme readingTexts data integrity', () => {
  it('every theme should have exactly 4 readingTexts', () => {
    for (const [key, theme] of Object.entries(THEMES)) {
      expect(
        theme.readingTexts,
        `${key} should have readingTexts`,
      ).toBeDefined();
      expect(
        theme.readingTexts.length,
        `${key} should have 4 readingTexts`,
      ).toBe(4);
    }
  });

  it('each readingText should have correct structure', () => {
    for (const [key, theme] of Object.entries(THEMES)) {
      for (const rt of theme.readingTexts) {
        expect(rt.level, `${key}: level`).toMatch(/^(short|long)$/);
        expect(rt.text, `${key}: text`).toBeTruthy();
        expect(rt.question, `${key}: question`).toBeTruthy();
        expect(rt.answer, `${key}: answer`).toBeTruthy();
        expect(rt.wrongAnswers, `${key}: wrongAnswers`).toHaveLength(3);
        expect(rt.statements, `${key}: statements`).toHaveLength(4);
      }
    }
  });

  it('each theme should have 2 short and 2 long readingTexts', () => {
    for (const [key, theme] of Object.entries(THEMES)) {
      const shorts = theme.readingTexts.filter((t) => t.level === 'short');
      const longs = theme.readingTexts.filter((t) => t.level === 'long');
      expect(shorts.length, `${key} should have 2 short`).toBe(2);
      expect(longs.length, `${key} should have 2 long`).toBe(2);
    }
  });

  it('statements should have text and isTrue boolean', () => {
    for (const [key, theme] of Object.entries(THEMES)) {
      for (const rt of theme.readingTexts) {
        for (const s of rt.statements) {
          expect(s.text, `${key}: statement text`).toBeTruthy();
          expect(typeof s.isTrue, `${key}: statement isTrue`).toBe('boolean');
        }
      }
    }
  });

  it('each readingText should have 2 true and 2 false statements', () => {
    for (const [key, theme] of Object.entries(THEMES)) {
      for (const rt of theme.readingTexts) {
        const trueCount = rt.statements.filter((s) => s.isTrue).length;
        const falseCount = rt.statements.filter((s) => !s.isTrue).length;
        expect(trueCount, `${key}: 2 true statements`).toBe(2);
        expect(falseCount, `${key}: 2 false statements`).toBe(2);
      }
    }
  });
});

// ============================================
// MAIN GENERATOR
// ============================================

describe('generateLanguageProblem', () => {
  it('should generate spelling when only spelling enabled', () => {
    const settings = {
      enabledOperations: { spelling: true },
      spellingCategories: [1, 2, 3],
    };

    for (let i = 0; i < 20; i++) {
      const problem = generateLanguageProblem(settings);
      expect(problem.type).toBe('spelling');
    }
  });

  it('should generate vocabulary when only vocabulary enabled', () => {
    const settings = {
      enabledOperations: { vocabulary: true },
    };

    for (let i = 0; i < 20; i++) {
      const problem = generateLanguageProblem(settings);
      expect(problem.type).toBe('vocabulary');
    }
  });

  it('should generate reading when only reading enabled', () => {
    const settings = {
      enabledOperations: { reading: true },
      readingLevel: 'short',
    };

    for (let i = 0; i < 20; i++) {
      const problem = generateLanguageProblem(settings);
      expect(problem.type).toBe('reading');
    }
  });

  it('should pick from all enabled types', () => {
    const settings = {
      enabledOperations: { spelling: true, vocabulary: true, reading: true },
      spellingCategories: [1, 2, 3, 4, 5, 6, 7, 8],
      readingLevel: 'short',
    };

    const types = new Set();
    for (let i = 0; i < 100; i++) {
      const problem = generateLanguageProblem(settings);
      types.add(problem.type);
    }

    expect(types.has('spelling')).toBe(true);
    expect(types.has('vocabulary')).toBe(true);
    expect(types.has('reading')).toBe(true);
  });

  it('should fallback to spelling when nothing enabled', () => {
    const settings = {
      enabledOperations: {},
    };

    const problem = generateLanguageProblem(settings);
    expect(problem.type).toBe('spelling');
  });
});

// ============================================
// DATA INTEGRITY
// ============================================

describe('Data integrity', () => {
  it('all spelling categories should have words', () => {
    // Main categories
    for (const catId of [1, 2, 3, 4, 6, 7, 8]) {
      expect(SPELLING_WORDS[catId]).toBeDefined();
      expect(SPELLING_WORDS[catId].length).toBeGreaterThanOrEqual(5);
    }
    // Subcategories
    for (const subId of ['5a', '5b', '5c', '5d']) {
      expect(SPELLING_WORDS[subId]).toBeDefined();
      expect(SPELLING_WORDS[subId].length).toBeGreaterThanOrEqual(5);
    }
  });

  it('all reading texts should have exactly 3 wrong answers', () => {
    READING_TEXTS.forEach((text) => {
      expect(text.wrongAnswers).toHaveLength(3);
      expect(text.answer).toBeTruthy();
      expect(text.question).toBeTruthy();
      expect(text.text).toBeTruthy();
      expect(['short', 'long']).toContain(text.level);
    });
  });

  it('all vocabulary entries should have word and definition', () => {
    GENERAL_VOCABULARY.forEach((entry) => {
      expect(entry.word).toBeTruthy();
      expect(entry.definition).toBeTruthy();
      expect(typeof entry.word).toBe('string');
      expect(typeof entry.definition).toBe('string');
    });
  });

  it('all vocabulary entries should have an exampleSentence', () => {
    GENERAL_VOCABULARY.forEach((entry) => {
      expect(entry.exampleSentence).toBeTruthy();
      expect(typeof entry.exampleSentence).toBe('string');
      // Sentence should contain the word
      expect(entry.exampleSentence.toLowerCase()).toContain(
        entry.word.toLowerCase(),
      );
    });
  });

  it('all reading texts should have statements', () => {
    READING_TEXTS.forEach((text) => {
      expect(text.statements).toBeDefined();
      expect(text.statements).toHaveLength(4);
      text.statements.forEach((s) => {
        expect(s.text).toBeTruthy();
        expect(typeof s.isTrue).toBe('boolean');
      });
    });
  });

  it('SPELLING_CATEGORIES should have 8 categories', () => {
    expect(SPELLING_CATEGORIES).toHaveLength(8);
    expect(SPELLING_CATEGORIES.map((c) => c.id)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8,
    ]);
  });

  it('category 5 should have subcategories', () => {
    const cat5 = SPELLING_CATEGORIES.find((c) => c.id === 5);
    expect(cat5.subcategories).toHaveLength(4);
  });

  it('should have both short and long reading texts', () => {
    const shortTexts = READING_TEXTS.filter((t) => t.level === 'short');
    const longTexts = READING_TEXTS.filter((t) => t.level === 'long');
    expect(shortTexts.length).toBeGreaterThanOrEqual(5);
    expect(longTexts.length).toBeGreaterThanOrEqual(5);
  });

  it('no duplicate words within a spelling category', () => {
    for (const [_catId, words] of Object.entries(SPELLING_WORDS)) {
      const unique = new Set(words);
      expect(unique.size).toBe(words.length);
    }
  });
});

// ============================================
// ENGLISH VOCABULARY DATA
// ============================================

describe('ENGLISH_VOCABULARY data', () => {
  it('should have exactly 150 words', () => {
    expect(ENGLISH_VOCABULARY).toHaveLength(150);
  });

  it('should have 50 words per level', () => {
    const easy = ENGLISH_VOCABULARY.filter((w) => w.level === 'easy');
    const medium = ENGLISH_VOCABULARY.filter((w) => w.level === 'medium');
    const hard = ENGLISH_VOCABULARY.filter((w) => w.level === 'hard');
    expect(easy).toHaveLength(50);
    expect(medium).toHaveLength(50);
    expect(hard).toHaveLength(50);
  });

  it('every word should have english, dutch and level', () => {
    ENGLISH_VOCABULARY.forEach((entry) => {
      expect(entry.english).toBeTruthy();
      expect(entry.dutch).toBeTruthy();
      expect(['easy', 'medium', 'hard']).toContain(entry.level);
    });
  });

  it('medium and hard words should have exampleSentence', () => {
    const mediumHard = ENGLISH_VOCABULARY.filter(
      (w) => w.level === 'medium' || w.level === 'hard',
    );
    mediumHard.forEach((entry) => {
      expect(entry.exampleSentence).toBeTruthy();
      expect(entry.exampleSentence).toContain('____');
    });
  });

  it('easy words should not have exampleSentence', () => {
    const easy = ENGLISH_VOCABULARY.filter((w) => w.level === 'easy');
    easy.forEach((entry) => {
      expect(entry.exampleSentence).toBeUndefined();
    });
  });

  it('no duplicate english words', () => {
    const englishWords = ENGLISH_VOCABULARY.map((w) => w.english.toLowerCase());
    const unique = new Set(englishWords);
    expect(unique.size).toBe(englishWords.length);
  });

  it('no duplicate dutch words', () => {
    const dutchWords = ENGLISH_VOCABULARY.map((w) => w.dutch.toLowerCase());
    const unique = new Set(dutchWords);
    expect(unique.size).toBe(dutchWords.length);
  });
});

// ============================================
// ENGLISH POOL
// ============================================

describe('getEnglishPool', () => {
  it('should return only easy words for easy level', () => {
    const pool = getEnglishPool({ englishLevel: 'easy' });
    expect(pool.length).toBe(50);
    pool.forEach((w) => expect(w.level).toBe('easy'));
  });

  it('should return easy + medium for medium level', () => {
    const pool = getEnglishPool({ englishLevel: 'medium' });
    expect(pool.length).toBe(100);
    const levels = new Set(pool.map((w) => w.level));
    expect(levels).toEqual(new Set(['easy', 'medium']));
  });

  it('should return all words for hard level', () => {
    const pool = getEnglishPool({ englishLevel: 'hard' });
    expect(pool.length).toBe(150);
  });

  it('should default to easy when no level specified', () => {
    const pool = getEnglishPool({});
    expect(pool.length).toBe(50);
  });
});

// ============================================
// ENGLISH MULTIPLE CHOICE
// ============================================

describe('generateEnglishMultipleChoice', () => {
  it('should return correct structure', () => {
    const result = generateEnglishMultipleChoice({
      englishLevel: 'easy',
      englishDirection: 'nl-en',
    });
    expect(result.type).toBe('englishMultipleChoice');
    expect(result.question).toBeTruthy();
    expect(result.answer).toBeTruthy();
    expect(result.wrongAnswers).toHaveLength(3);
    expect(result.questionLang).toBe('nl');
    expect(result.answerLang).toBe('en');
  });

  it('should respect nl-en direction', () => {
    for (let i = 0; i < 10; i++) {
      const result = generateEnglishMultipleChoice({
        englishLevel: 'easy',
        englishDirection: 'nl-en',
      });
      expect(result.questionLang).toBe('nl');
      expect(result.answerLang).toBe('en');
    }
  });

  it('should respect en-nl direction', () => {
    for (let i = 0; i < 10; i++) {
      const result = generateEnglishMultipleChoice({
        englishLevel: 'easy',
        englishDirection: 'en-nl',
      });
      expect(result.questionLang).toBe('en');
      expect(result.answerLang).toBe('nl');
    }
  });

  it('should produce both directions when set to both', () => {
    const results = [];
    for (let i = 0; i < 50; i++) {
      results.push(
        generateEnglishMultipleChoice({
          englishLevel: 'easy',
          englishDirection: 'both',
        }),
      );
    }
    const langs = new Set(results.map((r) => r.questionLang));
    expect(langs.size).toBe(2);
  });

  it('wrongAnswers should not contain the correct answer', () => {
    for (let i = 0; i < 20; i++) {
      const result = generateEnglishMultipleChoice({
        englishLevel: 'hard',
        englishDirection: 'nl-en',
      });
      expect(result.wrongAnswers).not.toContain(result.answer);
    }
  });

  it('should only use words from allowed levels', () => {
    const easyPool = getEnglishPool({ englishLevel: 'easy' });
    const easyDutch = new Set(easyPool.map((w) => w.dutch));
    const easyEnglish = new Set(easyPool.map((w) => w.english));

    for (let i = 0; i < 20; i++) {
      const result = generateEnglishMultipleChoice({
        englishLevel: 'easy',
        englishDirection: 'nl-en',
      });
      // question is Dutch, answer is English
      expect(easyDutch.has(result.question)).toBe(true);
      expect(easyEnglish.has(result.answer)).toBe(true);
    }
  });
});

// ============================================
// ENGLISH MEMORY PAIRS
// ============================================

describe('generateEnglishMemoryPairs', () => {
  it('should return requested number of pairs', () => {
    const pairs = generateEnglishMemoryPairs({ englishLevel: 'easy' }, 4);
    expect(pairs).toHaveLength(4);
  });

  it('each pair should have question, answer, questionLang, answerLang', () => {
    const pairs = generateEnglishMemoryPairs({ englishLevel: 'medium' }, 4);
    pairs.forEach((pair) => {
      expect(pair.question).toBeTruthy();
      expect(pair.answer).toBeTruthy();
      expect(pair.questionLang).toBeTruthy();
      expect(pair.answerLang).toBeTruthy();
    });
  });

  it('should not exceed available pool size', () => {
    // Easy has 50 words, asking for 100 should cap at 50
    const pairs = generateEnglishMemoryPairs({ englishLevel: 'easy' }, 100);
    expect(pairs.length).toBeLessThanOrEqual(50);
  });

  it('should return unique words', () => {
    const pairs = generateEnglishMemoryPairs({ englishLevel: 'hard' }, 10);
    const questions = pairs.map((p) => p.question);
    const unique = new Set(questions);
    expect(unique.size).toBe(pairs.length);
  });
});

// ============================================
// ENGLISH FILL IN
// ============================================

describe('generateEnglishFillIn', () => {
  it('should return fill-in structure for medium level', () => {
    const result = generateEnglishFillIn({ englishLevel: 'medium' });
    expect(result.type).toBe('englishFillIn');
    expect(result.sentence).toBeTruthy();
    expect(result.correctWord).toBeTruthy();
    expect(result.wrongWords).toHaveLength(3);
    expect(result.dutch).toBeTruthy();
  });

  it('should return fill-in structure for hard level', () => {
    const result = generateEnglishFillIn({ englishLevel: 'hard' });
    expect(result.type).toBe('englishFillIn');
    expect(result.sentence).toContain('____');
  });

  it('wrongWords should not contain the correct word', () => {
    for (let i = 0; i < 20; i++) {
      const result = generateEnglishFillIn({ englishLevel: 'hard' });
      expect(result.wrongWords).not.toContain(result.correctWord);
    }
  });

  it('should fallback to multiple choice for easy level (no exampleSentences)', () => {
    const result = generateEnglishFillIn({ englishLevel: 'easy' });
    // Easy words have no exampleSentence, so it falls back to MC
    expect(result.type).toBe('englishMultipleChoice');
  });
});

// ============================================
// ENGLISH TYPE WORD
// ============================================

describe('generateEnglishTypeWord', () => {
  it('should return correct structure', () => {
    const result = generateEnglishTypeWord({ englishLevel: 'easy' });
    expect(result.type).toBe('englishTypeWord');
    expect(result.dutch).toBeTruthy();
    expect(result.english).toBeTruthy();
    expect(result.prompt).toBeTruthy();
    expect(result.answer).toBeTruthy();
    expect(result.promptLang).toBeTruthy();
    expect(result.answerLang).toBeTruthy();
  });

  it('should only use words from the allowed pool', () => {
    const pool = getEnglishPool({ englishLevel: 'easy' });
    const validEnglish = new Set(pool.map((w) => w.english));
    for (let i = 0; i < 20; i++) {
      const result = generateEnglishTypeWord({ englishLevel: 'easy' });
      expect(validEnglish.has(result.english)).toBe(true);
    }
  });

  it('should respect nl-en direction', () => {
    for (let i = 0; i < 10; i++) {
      const result = generateEnglishTypeWord({
        englishLevel: 'easy',
        englishDirection: 'nl-en',
      });
      expect(result.promptLang).toBe('nl');
      expect(result.answerLang).toBe('en');
      expect(result.prompt).toBe(result.dutch);
      expect(result.answer).toBe(result.english);
    }
  });

  it('should respect en-nl direction', () => {
    for (let i = 0; i < 10; i++) {
      const result = generateEnglishTypeWord({
        englishLevel: 'easy',
        englishDirection: 'en-nl',
      });
      expect(result.promptLang).toBe('en');
      expect(result.answerLang).toBe('nl');
      expect(result.prompt).toBe(result.english);
      expect(result.answer).toBe(result.dutch);
    }
  });

  it('should produce both directions when set to both', () => {
    const results = [];
    for (let i = 0; i < 50; i++) {
      results.push(
        generateEnglishTypeWord({
          englishLevel: 'easy',
          englishDirection: 'both',
        }),
      );
    }
    const langs = new Set(results.map((r) => r.promptLang));
    expect(langs.size).toBe(2);
  });
});

// ============================================
// ENGLISH CONNECT PAIRS
// ============================================

describe('generateEnglishConnectPairs', () => {
  it('should return requested number of pairs', () => {
    const pairs = generateEnglishConnectPairs({ englishLevel: 'easy' }, 4);
    expect(pairs).toHaveLength(4);
  });

  it('each pair should have dutch and english', () => {
    const pairs = generateEnglishConnectPairs({ englishLevel: 'medium' }, 4);
    pairs.forEach((pair) => {
      expect(pair.dutch).toBeTruthy();
      expect(pair.english).toBeTruthy();
    });
  });

  it('pairs should be unique', () => {
    const pairs = generateEnglishConnectPairs({ englishLevel: 'hard' }, 8);
    const englishWords = pairs.map((p) => p.english);
    const unique = new Set(englishWords);
    expect(unique.size).toBe(pairs.length);
  });
});

// ============================================
// MAIN GENERATOR WITH ENGLISH
// ============================================

describe('generateLanguageProblem with english', () => {
  it('should return english problem when only english is enabled', () => {
    const result = generateLanguageProblem({
      enabledOperations: { english: true },
      englishLevel: 'easy',
      englishDirection: 'nl-en',
    });
    expect(result.type).toBe('englishMultipleChoice');
  });

  it('should include english in pool when enabled alongside others', () => {
    const types = new Set();
    for (let i = 0; i < 100; i++) {
      const result = generateLanguageProblem({
        enabledOperations: { spelling: true, english: true },
        spellingCategories: [1, 2, 3],
        englishLevel: 'easy',
        englishDirection: 'nl-en',
      });
      types.add(result.type);
    }
    expect(types.has('spelling')).toBe(true);
    expect(types.has('englishMultipleChoice')).toBe(true);
  });
});
