import { describe, it, expect } from 'vitest';
import {
  DAGEN,
  MAANDEN,
  SEIZOENEN,
  DAGEN_PER_MAAND,
  SEIZOEN_KENMERKEN,
  generateKalenderQuizQuestion,
  generateVolgordeChallenge,
  generateSeizoenenMatchPairs,
  generateKalenderMemoryPairs,
} from '../timeAwarenessData';

// ============================================
// DATA CONSTANTS
// ============================================

describe('Data constants', () => {
  it('should have 7 days', () => {
    expect(DAGEN).toHaveLength(7);
    expect(DAGEN[0]).toBe('maandag');
    expect(DAGEN[6]).toBe('zondag');
  });

  it('should have 12 months', () => {
    expect(MAANDEN).toHaveLength(12);
    expect(MAANDEN[0]).toBe('januari');
    expect(MAANDEN[11]).toBe('december');
  });

  it('should have 4 seasons', () => {
    expect(SEIZOENEN).toHaveLength(4);
    expect(SEIZOENEN.map((s) => s.naam)).toEqual([
      'lente',
      'zomer',
      'herfst',
      'winter',
    ]);
  });

  it('should have correct season start months', () => {
    expect(SEIZOENEN[0].startMaand).toBe('maart');
    expect(SEIZOENEN[1].startMaand).toBe('juni');
    expect(SEIZOENEN[2].startMaand).toBe('september');
    expect(SEIZOENEN[3].startMaand).toBe('december');
  });

  it('should have 3 months per season', () => {
    SEIZOENEN.forEach((s) => {
      expect(s.maanden).toHaveLength(3);
    });
  });

  it('all 12 months should belong to a season', () => {
    const allSeasonMonths = SEIZOENEN.flatMap((s) => s.maanden);
    expect(allSeasonMonths).toHaveLength(12);
    MAANDEN.forEach((m) => {
      expect(allSeasonMonths).toContain(m);
    });
  });

  it('should have correct days per month', () => {
    expect(DAGEN_PER_MAAND.januari).toBe(31);
    expect(DAGEN_PER_MAAND.februari).toBe(28);
    expect(DAGEN_PER_MAAND.april).toBe(30);
    expect(DAGEN_PER_MAAND.december).toBe(31);
  });

  it('should have 8 seizoen kenmerken, 2 per seizoen', () => {
    expect(SEIZOEN_KENMERKEN).toHaveLength(8);
    const perSeizoen = {};
    SEIZOEN_KENMERKEN.forEach((k) => {
      perSeizoen[k.seizoen] = (perSeizoen[k.seizoen] || 0) + 1;
    });
    expect(perSeizoen.lente).toBe(2);
    expect(perSeizoen.zomer).toBe(2);
    expect(perSeizoen.herfst).toBe(2);
    expect(perSeizoen.winter).toBe(2);
  });
});

// ============================================
// KALENDER QUIZ
// ============================================

describe('generateKalenderQuizQuestion', () => {
  it('should return a question with answer and 3 wrong answers', () => {
    const q = generateKalenderQuizQuestion();
    expect(q).toHaveProperty('question');
    expect(q).toHaveProperty('answer');
    expect(q).toHaveProperty('wrongAnswers');
    expect(q).toHaveProperty('category');
    expect(q.wrongAnswers).toHaveLength(3);
    expect(typeof q.question).toBe('string');
    expect(typeof q.answer).toBe('string');
  });

  it('should not include the correct answer in wrong answers', () => {
    for (let i = 0; i < 50; i++) {
      const q = generateKalenderQuizQuestion();
      expect(q.wrongAnswers).not.toContain(q.answer);
    }
  });

  it('should only generate dagen questions when only dagen enabled', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateKalenderQuizQuestion({
        dagen: true,
        maanden: false,
        seizoenen: false,
      });
      expect(q.category).toBe('dagen');
    }
  });

  it('should only generate maanden questions when only maanden enabled', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateKalenderQuizQuestion({
        dagen: false,
        maanden: true,
        seizoenen: false,
      });
      expect(q.category).toBe('maanden');
    }
  });

  it('should only generate seizoenen questions when only seizoenen enabled', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateKalenderQuizQuestion({
        dagen: false,
        maanden: false,
        seizoenen: true,
      });
      expect(q.category).toBe('seizoenen');
    }
  });

  it('should fallback to dagen when nothing enabled', () => {
    const q = generateKalenderQuizQuestion({
      dagen: false,
      maanden: false,
      seizoenen: false,
    });
    expect(q.category).toBe('dagen');
  });

  it('should generate mixed categories when all enabled', () => {
    const categories = new Set();
    for (let i = 0; i < 100; i++) {
      const q = generateKalenderQuizQuestion({
        dagen: true,
        maanden: true,
        seizoenen: true,
      });
      categories.add(q.category);
    }
    // Should have at least 2 different categories over 100 tries
    expect(categories.size).toBeGreaterThanOrEqual(2);
  });

  it('should include overmorgen/eergisteren concept questions for dagen', () => {
    const questions = [];
    for (let i = 0; i < 200; i++) {
      const q = generateKalenderQuizQuestion({
        dagen: true,
        maanden: false,
        seizoenen: false,
      });
      questions.push(q.question);
    }
    const hasOvermorgen = questions.some((q) => q.includes('dag na morgen'));
    const hasEergisteren = questions.some((q) => q.includes('dag vóór gisteren'));
    expect(hasOvermorgen).toBe(true);
    expect(hasEergisteren).toBe(true);
  });
});

// ============================================
// VOLGORDE CHALLENGE
// ============================================

describe('generateVolgordeChallenge', () => {
  it('should return items, correctOrder, label, and category', () => {
    const c = generateVolgordeChallenge();
    expect(c).toHaveProperty('items');
    expect(c).toHaveProperty('correctOrder');
    expect(c).toHaveProperty('label');
    expect(c).toHaveProperty('category');
    expect(Array.isArray(c.items)).toBe(true);
    expect(Array.isArray(c.correctOrder)).toBe(true);
  });

  it('should have same items in shuffled and correct arrays', () => {
    for (let i = 0; i < 20; i++) {
      const c = generateVolgordeChallenge();
      expect([...c.items].sort()).toEqual([...c.correctOrder].sort());
    }
  });

  it('items should have 4 elements for dagen', () => {
    for (let i = 0; i < 20; i++) {
      const c = generateVolgordeChallenge({
        dagen: true,
        maanden: false,
        seizoenen: false,
      });
      expect(c.items).toHaveLength(4);
      expect(c.category).toBe('dagen');
      expect(c.cyclical).toBe(true);
    }
  });

  it('items should have 4 elements for maanden', () => {
    for (let i = 0; i < 20; i++) {
      const c = generateVolgordeChallenge({
        dagen: false,
        maanden: true,
        seizoenen: false,
      });
      expect(c.items).toHaveLength(4);
      expect(c.category).toBe('maanden');
      expect(c.cyclical).toBe(true);
    }
  });

  it('items should have 4 elements for seizoenen', () => {
    for (let i = 0; i < 10; i++) {
      const c = generateVolgordeChallenge({
        dagen: false,
        maanden: false,
        seizoenen: true,
      });
      expect(c.items).toHaveLength(4);
      expect(c.category).toBe('seizoenen');
      expect(c.cyclical).toBe(true);
    }
  });

  it('correctOrder for dagen should be in consecutive day order', () => {
    for (let i = 0; i < 20; i++) {
      const c = generateVolgordeChallenge({
        dagen: true,
        maanden: false,
        seizoenen: false,
      });
      // Verify consecutive
      for (let j = 1; j < c.correctOrder.length; j++) {
        const prevIdx = DAGEN.indexOf(c.correctOrder[j - 1]);
        const curIdx = DAGEN.indexOf(c.correctOrder[j]);
        expect((prevIdx + 1) % 7).toBe(curIdx);
      }
    }
  });

  it('correctOrder for maanden should be in consecutive month order', () => {
    for (let i = 0; i < 20; i++) {
      const c = generateVolgordeChallenge({
        dagen: false,
        maanden: true,
        seizoenen: false,
      });
      for (let j = 1; j < c.correctOrder.length; j++) {
        const prevIdx = MAANDEN.indexOf(c.correctOrder[j - 1]);
        const curIdx = MAANDEN.indexOf(c.correctOrder[j]);
        expect((prevIdx + 1) % 12).toBe(curIdx);
      }
    }
  });

  it('correctOrder for seizoenen should be in consecutive season order', () => {
    const seizoenNamen = SEIZOENEN.map((s) => s.naam);
    for (let i = 0; i < 10; i++) {
      const c = generateVolgordeChallenge({
        dagen: false,
        maanden: false,
        seizoenen: true,
      });
      for (let j = 1; j < c.correctOrder.length; j++) {
        const prevIdx = seizoenNamen.indexOf(c.correctOrder[j - 1]);
        const curIdx = seizoenNamen.indexOf(c.correctOrder[j]);
        expect((prevIdx + 1) % 4).toBe(curIdx);
      }
    }
  });
});

// ============================================
// SEIZOENEN MATCH PAIRS
// ============================================

describe('generateSeizoenenMatchPairs', () => {
  it('should return requested number of pairs', () => {
    const pairs = generateSeizoenenMatchPairs(4);
    expect(pairs).toHaveLength(4);
  });

  it('each pair should have kenmerk, emoji, and seizoen', () => {
    const pairs = generateSeizoenenMatchPairs(4);
    pairs.forEach((p) => {
      expect(p).toHaveProperty('kenmerk');
      expect(p).toHaveProperty('emoji');
      expect(p).toHaveProperty('seizoen');
      expect(SEIZOENEN.map((s) => s.naam)).toContain(p.seizoen);
    });
  });

  it('should try to include mix of seasons', () => {
    // Over many tries, we should get multiple seasons
    const allSeasons = new Set();
    for (let i = 0; i < 20; i++) {
      const pairs = generateSeizoenenMatchPairs(4);
      pairs.forEach((p) => allSeasons.add(p.seizoen));
    }
    expect(allSeasons.size).toBeGreaterThanOrEqual(3);
  });

  it('kenmerk-seizoen mapping should be correct', () => {
    for (let i = 0; i < 20; i++) {
      const pairs = generateSeizoenenMatchPairs(4);
      pairs.forEach((p) => {
        const correctEntry = SEIZOEN_KENMERKEN.find(
          (k) => k.kenmerk === p.kenmerk,
        );
        expect(correctEntry).toBeDefined();
        expect(correctEntry.seizoen).toBe(p.seizoen);
      });
    }
  });
});

// ============================================
// KALENDER MEMORY PAIRS
// ============================================

describe('generateKalenderMemoryPairs', () => {
  it('should return requested number of pairs', () => {
    const pairs = generateKalenderMemoryPairs({}, 4);
    expect(pairs).toHaveLength(4);
  });

  it('each pair should have id, content, matchContent, and category', () => {
    const pairs = generateKalenderMemoryPairs({}, 4);
    pairs.forEach((p) => {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('content');
      expect(p).toHaveProperty('matchContent');
      expect(p).toHaveProperty('category');
    });
  });

  it('should only generate dagen pairs when only dagen enabled', () => {
    const pairs = generateKalenderMemoryPairs(
      { dagen: true, maanden: false, seizoenen: false },
      4,
    );
    pairs.forEach((p) => {
      expect(p.category).toBe('dagen');
    });
  });

  it('should only generate maanden pairs when only maanden enabled', () => {
    const pairs = generateKalenderMemoryPairs(
      { dagen: false, maanden: true, seizoenen: false },
      4,
    );
    pairs.forEach((p) => {
      expect(p.category).toBe('maanden');
    });
  });

  it('should only generate seizoenen pairs when only seizoenen enabled', () => {
    const pairs = generateKalenderMemoryPairs(
      { dagen: false, maanden: false, seizoenen: true },
      4,
    );
    expect(pairs.length).toBeLessThanOrEqual(4);
    pairs.forEach((p) => {
      expect(p.category).toBe('seizoenen');
    });
  });

  it('dagen pairs should have correct day numbers', () => {
    const pairs = generateKalenderMemoryPairs(
      { dagen: true, maanden: false, seizoenen: false },
      7,
    );
    pairs.forEach((p) => {
      const dayIdx = DAGEN.indexOf(p.content);
      expect(dayIdx).toBeGreaterThanOrEqual(0);
      expect(p.matchContent).toBe(`dag ${dayIdx + 1}`);
    });
  });

  it('maanden pairs should have correct month numbers', () => {
    const pairs = generateKalenderMemoryPairs(
      { dagen: false, maanden: true, seizoenen: false },
      4,
    );
    pairs.forEach((p) => {
      const maandIdx = MAANDEN.indexOf(p.content);
      expect(maandIdx).toBeGreaterThanOrEqual(0);
      expect(p.matchContent).toBe(`maand ${maandIdx + 1}`);
    });
  });

  it('should fallback to dagen when nothing enabled', () => {
    const pairs = generateKalenderMemoryPairs(
      { dagen: false, maanden: false, seizoenen: false },
      4,
    );
    expect(pairs.length).toBeGreaterThan(0);
    pairs.forEach((p) => {
      expect(p.category).toBe('dagen');
    });
  });
});
