import { describe, it, expect } from 'vitest';

// ============================================
// Game Selection Logic Tests
//
// These test the getAvailableGameTypes function that will be
// extracted from ChallengeModal into utils/gameSelection.js.
// The logic determines which minigame types are available
// based on mathSettings.
// ============================================

// We import from the utility that will be created.
// Before extraction this file can be run to verify the extraction is correct.
import {
  getAvailableGameTypes,
  pickRandomGameType,
  GAME_NAMES,
} from '../gameSelection';

describe('getAvailableGameTypes', () => {
  // ============================================
  // STANDARD MATH OPERATIONS
  // ============================================

  describe('Standard math operations', () => {
    it('should return standard games when add is enabled', () => {
      const settings = { enabledOperations: { add: true } };
      const types = getAvailableGameTypes(settings);

      expect(types).toContain('multiple-choice');
      expect(types).toContain('memory');
      expect(types).toContain('puzzle');
      expect(types).toContain('darts');
    });

    it('should return standard games when sub is enabled', () => {
      const settings = { enabledOperations: { sub: true } };
      const types = getAvailableGameTypes(settings);

      expect(types).toContain('multiple-choice');
      expect(types).toContain('memory');
      expect(types).toContain('puzzle');
      expect(types).toContain('darts');
    });

    it('should return standard games when mul is enabled', () => {
      const settings = { enabledOperations: { mul: true } };
      const types = getAvailableGameTypes(settings);

      expect(types).toContain('multiple-choice');
      expect(types).toContain('memory');
      expect(types).toContain('puzzle');
      expect(types).toContain('darts');
    });

    it('should return standard games when div is enabled', () => {
      const settings = { enabledOperations: { div: true } };
      const types = getAvailableGameTypes(settings);

      expect(types).toContain('multiple-choice');
      expect(types).toContain('memory');
      expect(types).toContain('puzzle');
      expect(types).toContain('darts');
    });

    it('should NOT include standard games when no standard ops enabled', () => {
      const settings = {
        enabledOperations: { add: false, sub: false, mul: false, money: true },
      };
      const types = getAvailableGameTypes(settings);

      expect(types).not.toContain('multiple-choice');
      expect(types).not.toContain('memory');
      expect(types).not.toContain('puzzle');
      expect(types).not.toContain('darts');
    });
  });

  // ============================================
  // SPECIAL MATH TYPES
  // ============================================

  describe('Special math types', () => {
    it('should include placeValue when enabled', () => {
      const settings = { enabledOperations: { placeValue: true } };
      const types = getAvailableGameTypes(settings);

      expect(types).toContain('placeValue');
    });

    it('should include lovingHearts when enabled', () => {
      const settings = { enabledOperations: { lovingHearts: true } };
      const types = getAvailableGameTypes(settings);

      expect(types).toContain('lovingHearts');
    });
  });

  // ============================================
  // MONEY GAMES
  // ============================================

  describe('Money games', () => {
    it('should include all money games when money is enabled', () => {
      const settings = { enabledOperations: { money: true } };
      const types = getAvailableGameTypes(settings);

      expect(types).toContain('makeAmount');
      expect(types).toContain('countMoney');
      expect(types).toContain('smartPay');
      expect(types).toContain('change');
    });

    it('should NOT include money games when money is disabled', () => {
      const settings = { enabledOperations: { add: true, money: false } };
      const types = getAvailableGameTypes(settings);

      expect(types).not.toContain('makeAmount');
      expect(types).not.toContain('countMoney');
    });
  });

  // ============================================
  // CLOCK GAMES
  // ============================================

  describe('Clock games', () => {
    it('should include base clock games when clock is enabled', () => {
      const settings = { enabledOperations: { clock: true } };
      const types = getAvailableGameTypes(settings);

      expect(types).toContain('clockMultipleChoice');
      expect(types).toContain('clockMemory');
      expect(types).toContain('clockInput');
      expect(types).toContain('clockMatchAnalog');
    });

    it('should include clock24h when clock24h setting is true', () => {
      const settings = { enabledOperations: { clock: true }, clock24h: true };
      const types = getAvailableGameTypes(settings);

      expect(types).toContain('clock24h');
    });

    it('should NOT include clock24h when clock24h setting is false', () => {
      const settings = { enabledOperations: { clock: true }, clock24h: false };
      const types = getAvailableGameTypes(settings);

      expect(types).not.toContain('clock24h');
    });

    it('should include clockWords when clockWords setting is true', () => {
      const settings = { enabledOperations: { clock: true }, clockWords: true };
      const types = getAvailableGameTypes(settings);

      expect(types).toContain('clockWords');
    });

    it('should NOT include clockWords when clockWords setting is false', () => {
      const settings = {
        enabledOperations: { clock: true },
        clockWords: false,
      };
      const types = getAvailableGameTypes(settings);

      expect(types).not.toContain('clockWords');
    });
  });

  // ============================================
  // SPELLING GAMES
  // ============================================

  describe('Spelling games', () => {
    it('should include spellingCategoryMatch and spellingTypeWord when spelling is enabled', () => {
      const settings = {
        enabledOperations: { spelling: true },
        spellingCategories: [1],
      };
      const types = getAvailableGameTypes(settings);

      expect(types).toContain('spellingCategoryMatch');
      expect(types).toContain('spellingTypeWord');
    });

    it('should include spellingConnect only when 2+ categories selected', () => {
      const settings1 = {
        enabledOperations: { spelling: true },
        spellingCategories: [1],
      };
      const types1 = getAvailableGameTypes(settings1);
      expect(types1).not.toContain('spellingConnect');

      const settings2 = {
        enabledOperations: { spelling: true },
        spellingCategories: [1, 2],
      };
      const types2 = getAvailableGameTypes(settings2);
      expect(types2).toContain('spellingConnect');
    });

    it('should include spellingConnect with 3+ categories', () => {
      const settings = {
        enabledOperations: { spelling: true },
        spellingCategories: [1, 2, 3],
      };
      const types = getAvailableGameTypes(settings);
      expect(types).toContain('spellingConnect');
    });
  });

  // ============================================
  // VOCABULARY GAMES
  // ============================================

  describe('Vocabulary games', () => {
    it('should include all vocabulary games when vocabulary is enabled', () => {
      const settings = { enabledOperations: { vocabulary: true } };
      const types = getAvailableGameTypes(settings);

      expect(types).toContain('vocabularyMatch');
      expect(types).toContain('vocabularyMemory');
      expect(types).toContain('vocabularyFillIn');
    });
  });

  // ============================================
  // READING GAMES
  // ============================================

  describe('Reading games', () => {
    it('should include all reading games when reading is enabled', () => {
      const settings = { enabledOperations: { reading: true } };
      const types = getAvailableGameTypes(settings);

      expect(types).toContain('readingComprehension');
      expect(types).toContain('readingTrueFalse');
    });
  });

  // ============================================
  // ENGLISH GAMES
  // ============================================

  describe('English games', () => {
    it('should include base english games at easy level', () => {
      const settings = {
        enabledOperations: { english: true },
        englishLevel: 'easy',
      };
      const types = getAvailableGameTypes(settings);

      expect(types).toContain('englishMultipleChoice');
      expect(types).toContain('englishMemory');
      expect(types).toContain('englishConnect');
      expect(types).not.toContain('englishTypeWord');
      expect(types).not.toContain('englishFillIn');
    });

    it('should include englishTypeWord and englishFillIn at medium level', () => {
      const settings = {
        enabledOperations: { english: true },
        englishLevel: 'medium',
      };
      const types = getAvailableGameTypes(settings);

      expect(types).toContain('englishTypeWord');
      expect(types).toContain('englishFillIn');
    });

    it('should include englishTypeWord and englishFillIn at hard level', () => {
      const settings = {
        enabledOperations: { english: true },
        englishLevel: 'hard',
      };
      const types = getAvailableGameTypes(settings);

      expect(types).toContain('englishTypeWord');
      expect(types).toContain('englishFillIn');
    });
  });

  // ============================================
  // TIME AWARENESS GAMES
  // ============================================

  describe('Time awareness games', () => {
    it('should include time awareness games when enabled with at least one subcategory', () => {
      const settings = {
        enabledOperations: { timeAwareness: true },
        timeAwarenessDagen: true,
        timeAwarenessMaanden: false,
        timeAwarenessSeizoen: false,
      };
      const types = getAvailableGameTypes(settings);

      expect(types).toContain('kalenderQuiz');
      expect(types).toContain('volgordeSorteer');
      expect(types).toContain('kalenderMemory');
    });

    it('should include seizoenenMatch only when seizoen is enabled', () => {
      const settingsNo = {
        enabledOperations: { timeAwareness: true },
        timeAwarenessDagen: true,
        timeAwarenessMaanden: false,
        timeAwarenessSeizoen: false,
      };
      const typesNo = getAvailableGameTypes(settingsNo);
      expect(typesNo).not.toContain('seizoenenMatch');

      const settingsYes = {
        enabledOperations: { timeAwareness: true },
        timeAwarenessDagen: false,
        timeAwarenessMaanden: false,
        timeAwarenessSeizoen: true,
      };
      const typesYes = getAvailableGameTypes(settingsYes);
      expect(typesYes).toContain('seizoenenMatch');
    });

    it('should NOT include time awareness games when all subcategories disabled', () => {
      const settings = {
        enabledOperations: { timeAwareness: true },
        timeAwarenessDagen: false,
        timeAwarenessMaanden: false,
        timeAwarenessSeizoen: false,
      };
      const types = getAvailableGameTypes(settings);

      expect(types).not.toContain('kalenderQuiz');
      expect(types).not.toContain('volgordeSorteer');
      expect(types).not.toContain('kalenderMemory');
    });
  });

  // ============================================
  // TIME CALCULATION GAMES
  // ============================================

  describe('Time calculation games', () => {
    it('should include all time calculation games for non-daysWeeks levels', () => {
      const settings = {
        enabledOperations: { timeCalculation: true },
        timeCalcLevel: 'wholeHours',
      };
      const types = getAvailableGameTypes(settings);

      expect(types).toContain('klokVooruit');
      expect(types).toContain('tijdsduurQuiz');
      expect(types).toContain('omrekenMemory');
      expect(types).toContain('tijdRekenen');
      expect(types).toContain('klokRekenen');
    });

    it('should exclude klokRekenen for daysWeeks level', () => {
      const settings = {
        enabledOperations: { timeCalculation: true },
        timeCalcLevel: 'daysWeeks',
      };
      const types = getAvailableGameTypes(settings);

      expect(types).toContain('klokVooruit');
      expect(types).toContain('tijdsduurQuiz');
      expect(types).toContain('omrekenMemory');
      expect(types).toContain('tijdRekenen');
      expect(types).not.toContain('klokRekenen');
    });
  });

  // ============================================
  // FALLBACK
  // ============================================

  describe('Fallback behavior', () => {
    it('should fallback to multiple-choice when nothing is enabled', () => {
      const settings = { enabledOperations: {} };
      const types = getAvailableGameTypes(settings);

      expect(types).toContain('multiple-choice');
      expect(types.length).toBe(1);
    });

    it('should fallback to multiple-choice with null settings', () => {
      const types = getAvailableGameTypes(null);

      expect(types).toContain('multiple-choice');
    });

    it('should fallback to multiple-choice with undefined settings', () => {
      const types = getAvailableGameTypes(undefined);

      expect(types).toContain('multiple-choice');
    });
  });

  // ============================================
  // COMBINED OPERATIONS
  // ============================================

  describe('Combined operations', () => {
    it('should combine standard games with money games', () => {
      const settings = { enabledOperations: { add: true, money: true } };
      const types = getAvailableGameTypes(settings);

      // Should have standard + money
      expect(types).toContain('multiple-choice');
      expect(types).toContain('makeAmount');
      expect(types.length).toBe(8); // 4 standard + 4 money
    });

    it('should combine multiple categories', () => {
      const settings = {
        enabledOperations: { add: true, placeValue: true, lovingHearts: true },
      };
      const types = getAvailableGameTypes(settings);

      expect(types).toContain('multiple-choice');
      expect(types).toContain('placeValue');
      expect(types).toContain('lovingHearts');
      expect(types.length).toBe(6); // 4 standard + 1 placeValue + 1 lovingHearts
    });

    it('should handle all operations enabled at once', () => {
      const settings = {
        enabledOperations: {
          add: true,
          sub: true,
          mul: true,
          div: true,
          placeValue: true,
          lovingHearts: true,
          money: true,
          clock: true,
          spelling: true,
          vocabulary: true,
          reading: true,
          english: true,
          timeAwareness: true,
          timeCalculation: true,
        },
        clock24h: true,
        clockWords: true,
        spellingCategories: [1, 2, 3],
        englishLevel: 'hard',
        timeAwarenessDagen: true,
        timeAwarenessMaanden: true,
        timeAwarenessSeizoen: true,
        timeCalcLevel: 'wholeHours',
      };
      const types = getAvailableGameTypes(settings);

      // Should include types from all categories
      expect(types.length).toBeGreaterThan(20);
      expect(types).toContain('multiple-choice');
      expect(types).toContain('makeAmount');
      expect(types).toContain('clockMultipleChoice');
      expect(types).toContain('clock24h');
      expect(types).toContain('clockWords');
      expect(types).toContain('spellingConnect');
      expect(types).toContain('vocabularyMatch');
      expect(types).toContain('readingComprehension');
      expect(types).toContain('englishTypeWord');
      expect(types).toContain('kalenderQuiz');
      expect(types).toContain('seizoenenMatch');
      expect(types).toContain('klokRekenen');
    });
  });
});

// ============================================
// GAME_NAMES
// ============================================

describe('GAME_NAMES', () => {
  it('should have a display name for every possible game type', () => {
    const allGameTypes = [
      'multiple-choice',
      'memory',
      'puzzle',
      'darts',
      'placeValue',
      'lovingHearts',
      'makeAmount',
      'countMoney',
      'smartPay',
      'change',
      'clockMultipleChoice',
      'clockMemory',
      'clockInput',
      'clockMatchAnalog',
      'clock24h',
      'clockWords',
      'spellingCategoryMatch',
      'spellingConnect',
      'spellingTypeWord',
      'vocabularyMatch',
      'vocabularyMemory',
      'vocabularyFillIn',
      'readingComprehension',
      'readingTrueFalse',
      'englishMultipleChoice',
      'englishMemory',
      'englishTypeWord',
      'englishFillIn',
      'englishConnect',
      'kalenderQuiz',
      'volgordeSorteer',
      'seizoenenMatch',
      'kalenderMemory',
      'klokVooruit',
      'tijdsduurQuiz',
      'omrekenMemory',
      'tijdRekenen',
      'klokRekenen',
    ];

    for (const type of allGameTypes) {
      expect(GAME_NAMES[type]).toBeDefined();
      expect(typeof GAME_NAMES[type]).toBe('string');
      expect(GAME_NAMES[type].length).toBeGreaterThan(0);
    }
  });
});

// ============================================
// ROUND-ROBIN GAME TYPE SELECTION
// ============================================

describe('pickRandomGameType (round-robin)', () => {
  // Helper: simuleert het voltooien van een challenge door het gekozen type
  // toe te voegen aan playedTypes (net als MazeGame.handleChallengeComplete).
  const pickAndComplete = (settings, playedTypes) => {
    const chosen = pickRandomGameType(settings, playedTypes);
    playedTypes.push(chosen);
    return chosen;
  };

  it('should pick from available types', () => {
    const settings = { enabledOperations: { add: true } };
    const playedTypes = [];
    const type = pickRandomGameType(settings, playedTypes);

    expect(['multiple-choice', 'memory', 'puzzle', 'darts']).toContain(type);
  });

  it('should not mutate playedTypes (caller is responsible for tracking)', () => {
    const settings = { enabledOperations: { add: true } };
    const playedTypes = [];

    pickRandomGameType(settings, playedTypes);
    expect(playedTypes.length).toBe(0);
  });

  it('should avoid already-played types', () => {
    const settings = { enabledOperations: { add: true } };
    const playedTypes = [];

    pickAndComplete(settings, playedTypes);
    expect(playedTypes.length).toBe(1);

    pickAndComplete(settings, playedTypes);
    expect(playedTypes.length).toBe(2);

    // Both entries should be different
    expect(playedTypes[0]).not.toBe(playedTypes[1]);
  });

  it('should not repeat a type until all types are played', () => {
    const settings = { enabledOperations: { add: true } };
    const playedTypes = [];

    // Standard games: 4 types (multiple-choice, memory, puzzle, darts)
    const results = [];
    for (let i = 0; i < 4; i++) {
      results.push(pickAndComplete(settings, playedTypes));
    }

    // All 4 should be unique
    const unique = new Set(results);
    expect(unique.size).toBe(4);
  });

  it('should reset and start a new round after all types are played', () => {
    const settings = { enabledOperations: { add: true } };
    const playedTypes = [];

    // Play all 4 types
    for (let i = 0; i < 4; i++) {
      pickAndComplete(settings, playedTypes);
    }
    expect(playedTypes.length).toBe(4);

    // 5th pick should reset and pick a new one
    const fifth = pickAndComplete(settings, playedTypes);
    expect(['multiple-choice', 'memory', 'puzzle', 'darts']).toContain(fifth);
    // After reset, playedTypes should have 1 entry
    expect(playedTypes.length).toBe(1);
  });

  it('should work correctly over multiple full rounds', () => {
    const settings = { enabledOperations: { add: true } };
    const playedTypes = [];

    // Play 3 full rounds (12 picks)
    for (let round = 0; round < 3; round++) {
      const roundResults = [];
      for (let i = 0; i < 4; i++) {
        roundResults.push(pickAndComplete(settings, playedTypes));
      }
      // Each round should contain all 4 unique types
      const unique = new Set(roundResults);
      expect(unique.size).toBe(4);
    }
  });

  it('should work with a larger pool of game types', () => {
    const settings = { enabledOperations: { add: true, money: true } };
    const playedTypes = [];
    const available = getAvailableGameTypes(settings);

    // Play all available types
    const results = [];
    for (let i = 0; i < available.length; i++) {
      results.push(pickAndComplete(settings, playedTypes));
    }

    // All should be unique
    const unique = new Set(results);
    expect(unique.size).toBe(available.length);
  });

  it('should fallback to pure random when no playedTypes array provided', () => {
    const settings = { enabledOperations: { add: true } };
    // Should not crash when called without playedTypes
    const type = pickRandomGameType(settings);
    expect(['multiple-choice', 'memory', 'puzzle', 'darts']).toContain(type);
  });

  it('should give same type again if challenge was not completed', () => {
    const settings = { enabledOperations: { add: true } };
    const playedTypes = [];

    // Pick without completing (child walked away)
    const first = pickRandomGameType(settings, playedTypes);
    // playedTypes is still empty, so the same type is still in the pool
    expect(playedTypes.length).toBe(0);

    // Pick again - first type is still available since it was never tracked
    // Over many attempts, we should see 'first' appear again
    const attempts = new Set();
    for (let i = 0; i < 50; i++) {
      attempts.add(pickRandomGameType(settings, playedTypes));
    }
    expect(attempts.has(first)).toBe(true);
  });
});
