import { describe, it, expect } from 'vitest';
import {
  generateClockProblem,
  generateUniqueClockProblems,
  generateWrongClockTimes,
  timeToWords,
  formatDigital,
  formatDigital24,
  to24h,
  dagdeel,
} from '../clockAdapter';
import { generateMathProblem } from '../difficultyAdapter';

// ============================================
// CLOCK - generateClockProblem
// ============================================

describe('Clock - generateClockProblem', () => {
  it('should return a valid clock problem with all required fields', () => {
    const settings = { clockLevel: 'hours' };
    const problem = generateClockProblem(settings);

    expect(problem).toHaveProperty('hours');
    expect(problem).toHaveProperty('minutes');
    expect(problem).toHaveProperty('digital');
    expect(problem).toHaveProperty('digital24');
    expect(problem).toHaveProperty('words');
    expect(problem).toHaveProperty('type', 'clock');
    expect(problem).toHaveProperty('level');
    expect(problem).toHaveProperty('hours24');
    expect(problem).toHaveProperty('dagdeel');
    expect(problem.hours).toBeGreaterThanOrEqual(1);
    expect(problem.hours).toBeLessThanOrEqual(12);
    expect(problem.minutes).toBeGreaterThanOrEqual(0);
    expect(problem.minutes).toBeLessThanOrEqual(59);
    expect(problem.hours24).toBeGreaterThanOrEqual(0);
    expect(problem.hours24).toBeLessThanOrEqual(23);
    expect(typeof problem.dagdeel).toBe('string');
    expect(problem.dagdeel.length).toBeGreaterThan(0);
  });

  it('should generate only whole hours when level is "hours"', () => {
    const settings = { clockLevel: 'hours' };

    for (let i = 0; i < 50; i++) {
      const problem = generateClockProblem(settings);
      expect(problem.minutes).toBe(0);
      expect(problem.hours).toBeGreaterThanOrEqual(1);
      expect(problem.hours).toBeLessThanOrEqual(12);
    }
  });

  it('should generate only :00 or :30 when level is "halfHours"', () => {
    const settings = { clockLevel: 'halfHours' };

    for (let i = 0; i < 50; i++) {
      const problem = generateClockProblem(settings);
      expect([0, 30]).toContain(problem.minutes);
    }
  });

  it('should generate only :00, :15, :30, :45 when level is "quarters"', () => {
    const settings = { clockLevel: 'quarters' };

    for (let i = 0; i < 50; i++) {
      const problem = generateClockProblem(settings);
      expect([0, 15, 30, 45]).toContain(problem.minutes);
    }
  });

  it('should generate multiples of 5 when level is "fiveMinutes"', () => {
    const settings = { clockLevel: 'fiveMinutes' };

    for (let i = 0; i < 50; i++) {
      const problem = generateClockProblem(settings);
      expect(problem.minutes % 5).toBe(0);
    }
  });

  it('should generate any minute (0-59) when level is "minutes"', () => {
    const settings = { clockLevel: 'minutes' };
    const seenMinutes = new Set();

    for (let i = 0; i < 200; i++) {
      const problem = generateClockProblem(settings);
      expect(problem.minutes).toBeGreaterThanOrEqual(0);
      expect(problem.minutes).toBeLessThanOrEqual(59);
      seenMinutes.add(problem.minutes);
    }

    // Should see various minutes over 200 runs, at least more than just multiples of 5
    expect(seenMinutes.size).toBeGreaterThan(12);
  });

  it('should use default level "hours" when no settings provided', () => {
    const problem = generateClockProblem({});
    expect(problem.minutes).toBe(0);
    expect(problem.level).toBe('hours');
  });
});

// ============================================
// CLOCK - timeToWords (Nederlandse woordweergave)
// ============================================

describe('Clock - timeToWords', () => {
  it('should say "X uur" for whole hours', () => {
    expect(timeToWords(3, 0)).toBe('drie uur');
    expect(timeToWords(12, 0)).toBe('twaalf uur');
    expect(timeToWords(1, 0)).toBe('één uur');
  });

  it('should say "half X" for half hours (referring to next hour)', () => {
    expect(timeToWords(3, 30)).toBe('half vier');
    expect(timeToWords(12, 30)).toBe('half één'); // 12:30 → half 1
    expect(timeToWords(11, 30)).toBe('half twaalf');
  });

  it('should say "kwart over X" for quarter past', () => {
    expect(timeToWords(3, 15)).toBe('kwart over drie');
    expect(timeToWords(12, 15)).toBe('kwart over twaalf');
  });

  it('should say "kwart voor X" for quarter to (referring to next hour)', () => {
    expect(timeToWords(3, 45)).toBe('kwart voor vier');
    expect(timeToWords(12, 45)).toBe('kwart voor één'); // 12:45 → kwart voor 1
  });

  it('should say "vijf over X" for 5 past', () => {
    expect(timeToWords(3, 5)).toBe('vijf over drie');
  });

  it('should say "tien over X" for 10 past', () => {
    expect(timeToWords(3, 10)).toBe('tien over drie');
  });

  it('should say "tien voor half X" for :20 (Dutch convention)', () => {
    expect(timeToWords(3, 20)).toBe('tien voor half vier');
  });

  it('should say "vijf voor half X" for :25 (Dutch convention)', () => {
    expect(timeToWords(3, 25)).toBe('vijf voor half vier');
  });

  it('should say "vijf over half X" for :35 (Dutch convention)', () => {
    expect(timeToWords(3, 35)).toBe('vijf over half vier');
  });

  it('should say "tien over half X" for :40 (Dutch convention)', () => {
    expect(timeToWords(3, 40)).toBe('tien over half vier');
  });

  it('should say "tien voor X" for :50', () => {
    expect(timeToWords(3, 50)).toBe('tien voor vier');
  });

  it('should say "vijf voor X" for :55', () => {
    expect(timeToWords(3, 55)).toBe('vijf voor vier');
  });

  it('should handle hour 12 wrapping to 1 correctly', () => {
    // At 12:xx, the "next hour" is 1
    expect(timeToWords(12, 30)).toBe('half één');
    expect(timeToWords(12, 45)).toBe('kwart voor één');
    expect(timeToWords(12, 55)).toBe('vijf voor één');
    expect(timeToWords(12, 20)).toBe('tien voor half één');
    expect(timeToWords(12, 35)).toBe('vijf over half één');
  });

  it('should handle all minutes with proper Dutch convention relative to half hour', () => {
    // 1-14: "X over Y" (over huidig uur)
    expect(timeToWords(8, 1)).toBe('één over acht');
    expect(timeToWords(3, 7)).toBe('zeven over drie');
    expect(timeToWords(8, 14)).toBe('veertien over acht');

    // 16-29: "X voor half Z" (voor half volgend uur)
    expect(timeToWords(8, 16)).toBe('veertien voor half negen');
    expect(timeToWords(8, 22)).toBe('acht voor half negen');
    expect(timeToWords(8, 28)).toBe('twee voor half negen');

    // 31-44: "X over half Z" (over half volgend uur)
    expect(timeToWords(7, 31)).toBe('één over half acht');
    expect(timeToWords(7, 41)).toBe('elf over half acht');
    expect(timeToWords(8, 43)).toBe('dertien over half negen');

    // 46-59: "X voor Z" (voor volgend uur)
    expect(timeToWords(9, 48)).toBe('twaalf voor tien');
    expect(timeToWords(3, 52)).toBe('acht voor vier');
    expect(timeToWords(3, 57)).toBe('drie voor vier');
  });

  it('should handle hour 12 wrapping for non-standard minutes', () => {
    expect(timeToWords(12, 7)).toBe('zeven over twaalf');
    expect(timeToWords(12, 22)).toBe('acht voor half één');
    expect(timeToWords(12, 41)).toBe('elf over half één');
    expect(timeToWords(12, 52)).toBe('acht voor één');
  });
});

// ============================================
// CLOCK - formatDigital
// ============================================

describe('Clock - formatDigital', () => {
  it('should format 12h time correctly with zero-padded hours', () => {
    expect(formatDigital(3, 0)).toBe('03:00');
    expect(formatDigital(12, 30)).toBe('12:30');
    expect(formatDigital(1, 5)).toBe('01:05');
    expect(formatDigital(9, 45)).toBe('09:45');
  });

  it('should pad minutes with zero', () => {
    expect(formatDigital(3, 0)).toBe('03:00');
    expect(formatDigital(3, 5)).toBe('03:05');
    expect(formatDigital(3, 9)).toBe('03:09');
  });

  it('should always return 12h format (extra args are ignored)', () => {
    // formatDigital is now deterministic, always 12h
    expect(formatDigital(3, 15)).toBe('03:15');
    expect(formatDigital(11, 0)).toBe('11:00');
  });
});

// ============================================
// CLOCK - formatDigital24
// ============================================

describe('Clock - formatDigital24', () => {
  it('should format 24h time correctly with zero-padding', () => {
    expect(formatDigital24(0, 0)).toBe('00:00');
    expect(formatDigital24(3, 15)).toBe('03:15');
    expect(formatDigital24(13, 0)).toBe('13:00');
    expect(formatDigital24(15, 30)).toBe('15:30');
    expect(formatDigital24(23, 59)).toBe('23:59');
  });

  it('should handle midnight and noon', () => {
    expect(formatDigital24(0, 0)).toBe('00:00');
    expect(formatDigital24(12, 0)).toBe('12:00');
  });
});

// ============================================
// CLOCK - to24h
// ============================================

describe('Clock - to24h', () => {
  it('should always return a value between 0 and 23', () => {
    for (let h = 1; h <= 12; h++) {
      for (let i = 0; i < 20; i++) {
        const result = to24h(h);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThanOrEqual(23);
      }
    }
  });

  it('should return either AM or PM variant', () => {
    const seen = new Set();
    // For hour 3, we expect to see both 3 (AM) and 15 (PM)
    for (let i = 0; i < 100; i++) {
      seen.add(to24h(3));
    }
    expect(seen.has(3)).toBe(true);
    expect(seen.has(15)).toBe(true);
  });

  it('should handle hour 12 correctly (0 or 12)', () => {
    const seen = new Set();
    for (let i = 0; i < 100; i++) {
      seen.add(to24h(12));
    }
    // 12 AM = 0, 12 PM = 12
    expect(seen.has(0)).toBe(true);
    expect(seen.has(12)).toBe(true);
  });
});

// ============================================
// CLOCK - dagdeel
// ============================================

describe('Clock - dagdeel', () => {
  it("should return 's nachts for 0-5", () => {
    for (let h = 0; h <= 5; h++) {
      expect(dagdeel(h)).toBe("'s nachts");
    }
  });

  it("should return 's ochtends for 6-11", () => {
    for (let h = 6; h <= 11; h++) {
      expect(dagdeel(h)).toBe("'s ochtends");
    }
  });

  it("should return 's middags for 12-17", () => {
    for (let h = 12; h <= 17; h++) {
      expect(dagdeel(h)).toBe("'s middags");
    }
  });

  it("should return 's avonds for 18-23", () => {
    for (let h = 18; h <= 23; h++) {
      expect(dagdeel(h)).toBe("'s avonds");
    }
  });
});

// ============================================
// CLOCK - generateWrongClockTimes
// ============================================

describe('Clock - generateWrongClockTimes', () => {
  it('should generate exactly 3 wrong times by default', () => {
    const wrong = generateWrongClockTimes(3, 15, 'quarters', 3);
    expect(wrong).toHaveLength(3);
  });

  it('should not include the correct time in wrong answers', () => {
    for (let i = 0; i < 50; i++) {
      const wrong = generateWrongClockTimes(3, 15, 'quarters', 3);
      const hasCorrect = wrong.some((t) => t.hours === 3 && t.minutes === 15);
      expect(hasCorrect).toBe(false);
    }
  });

  it('should generate valid hour values (1-12)', () => {
    for (let i = 0; i < 50; i++) {
      const wrong = generateWrongClockTimes(6, 30, 'halfHours', 3);
      wrong.forEach((t) => {
        expect(t.hours).toBeGreaterThanOrEqual(1);
        expect(t.hours).toBeLessThanOrEqual(12);
      });
    }
  });

  it('should generate valid minute values (0-59)', () => {
    for (let i = 0; i < 50; i++) {
      const wrong = generateWrongClockTimes(6, 30, 'fiveMinutes', 3);
      wrong.forEach((t) => {
        expect(t.minutes).toBeGreaterThanOrEqual(0);
        expect(t.minutes).toBeLessThanOrEqual(59);
      });
    }
  });

  it('should snap minutes to level for "hours"', () => {
    const wrong = generateWrongClockTimes(3, 0, 'hours', 3);
    wrong.forEach((t) => {
      expect(t.minutes).toBe(0);
    });
  });

  it('should snap minutes to level for "halfHours"', () => {
    for (let i = 0; i < 20; i++) {
      const wrong = generateWrongClockTimes(3, 30, 'halfHours', 3);
      wrong.forEach((t) => {
        expect([0, 30]).toContain(t.minutes);
      });
    }
  });

  it('should snap minutes to level for "quarters"', () => {
    for (let i = 0; i < 20; i++) {
      const wrong = generateWrongClockTimes(3, 15, 'quarters', 3);
      wrong.forEach((t) => {
        expect([0, 15, 30, 45]).toContain(t.minutes);
      });
    }
  });

  it('should snap minutes to level for "fiveMinutes"', () => {
    for (let i = 0; i < 20; i++) {
      const wrong = generateWrongClockTimes(3, 25, 'fiveMinutes', 3);
      wrong.forEach((t) => {
        expect(t.minutes % 5).toBe(0);
      });
    }
  });

  it('should generate unique wrong times (no duplicates)', () => {
    for (let i = 0; i < 30; i++) {
      const wrong = generateWrongClockTimes(6, 0, 'quarters', 3);
      const keys = wrong.map((t) => `${t.hours}:${t.minutes}`);
      const unique = new Set(keys);
      expect(unique.size).toBe(keys.length);
    }
  });
});

// ============================================
// CLOCK - generateUniqueClockProblems
// ============================================

describe('Clock - generateUniqueClockProblems', () => {
  it('should generate the requested number of problems', () => {
    const problems = generateUniqueClockProblems({ clockLevel: 'quarters' }, 4);
    expect(problems).toHaveLength(4);
  });

  it('should generate unique times', () => {
    const problems = generateUniqueClockProblems(
      { clockLevel: 'fiveMinutes' },
      4,
    );
    const keys = problems.map((p) => `${p.hours}:${p.minutes}`);
    const unique = new Set(keys);
    expect(unique.size).toBe(4);
  });

  it('should still return the requested count even with limited options', () => {
    // "hours" level has only 12 possible times (1:00 - 12:00)
    // Asking for 4 should always work
    const problems = generateUniqueClockProblems({ clockLevel: 'hours' }, 4);
    expect(problems).toHaveLength(4);
  });

  it('should return valid clock problems for all levels', () => {
    const levels = ['hours', 'halfHours', 'quarters', 'fiveMinutes', 'minutes'];

    for (const level of levels) {
      const problems = generateUniqueClockProblems({ clockLevel: level }, 4);
      expect(problems).toHaveLength(4);

      problems.forEach((p) => {
        expect(p.type).toBe('clock');
        expect(p.hours).toBeGreaterThanOrEqual(1);
        expect(p.hours).toBeLessThanOrEqual(12);
        expect(p.minutes).toBeGreaterThanOrEqual(0);
        expect(p.minutes).toBeLessThanOrEqual(59);
        expect(typeof p.words).toBe('string');
        expect(p.words.length).toBeGreaterThan(0);
        expect(typeof p.digital).toBe('string');
        expect(p.digital.length).toBeGreaterThan(0);
      });
    }
  });
});

// ============================================
// CLOCK - Integration: clock via generateMathProblem
// ============================================

describe('Clock - integration with generateMathProblem', () => {
  it('should generate clock problems when clock operation is enabled', () => {
    const settings = {
      enabledOperations: { clock: true },
      clockLevel: 'hours',
    };

    for (let i = 0; i < 20; i++) {
      const problem = generateMathProblem(settings);
      expect(problem.type).toBe('clock');
    }
  });

  it('should not generate clock problems when clock is disabled', () => {
    const settings = {
      enabledOperations: { add: true, clock: false },
      maxValue: 20,
    };

    for (let i = 0; i < 20; i++) {
      const problem = generateMathProblem(settings);
      expect(problem.type).not.toBe('clock');
    }
  });
});

// ============================================
// CLOCK - Word normalization for ClockWordsGame
// ============================================

describe('Clock - word answer normalization', () => {
  // This mirrors the normalize function used in ClockWordsGame
  const normalize = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/[éè]/g, 'e')
      .replace(/ë/g, 'e');
  };

  it('should accept "een" for "één" (without diacritics)', () => {
    const correct = timeToWords(1, 0); // "één uur"
    expect(normalize('een uur')).toBe(normalize(correct));
  });

  it('should accept input with extra spaces', () => {
    const correct = timeToWords(3, 15); // "kwart over drie"
    expect(normalize('  kwart   over   drie  ')).toBe(normalize(correct));
  });

  it('should be case-insensitive', () => {
    const correct = timeToWords(3, 30); // "half vier"
    expect(normalize('Half Vier')).toBe(normalize(correct));
  });

  it('should match all standard time formats correctly', () => {
    // Whole hours
    expect(normalize(timeToWords(5, 0))).toBe('vijf uur');
    // Half hours
    expect(normalize(timeToWords(5, 30))).toBe('half zes');
    // Quarters
    expect(normalize(timeToWords(5, 15))).toBe('kwart over vijf');
    expect(normalize(timeToWords(5, 45))).toBe('kwart voor zes');
    // Five minutes
    expect(normalize(timeToWords(5, 5))).toBe('vijf over vijf');
    expect(normalize(timeToWords(5, 10))).toBe('tien over vijf');
    expect(normalize(timeToWords(5, 20))).toBe('tien voor half zes');
    expect(normalize(timeToWords(5, 25))).toBe('vijf voor half zes');
    expect(normalize(timeToWords(5, 35))).toBe('vijf over half zes');
    expect(normalize(timeToWords(5, 40))).toBe('tien over half zes');
    expect(normalize(timeToWords(5, 50))).toBe('tien voor zes');
    expect(normalize(timeToWords(5, 55))).toBe('vijf voor zes');
  });

  it('should handle "één" with various accent styles', () => {
    expect(normalize('één')).toBe('een');
    expect(normalize('een')).toBe('een');
    expect(normalize('èén')).toBe('een');
  });
});
