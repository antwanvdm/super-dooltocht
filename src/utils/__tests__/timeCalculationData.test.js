import { describe, it, expect } from 'vitest';
import {
  formatTime,
  addMinutes,
  formatDuration,
  generateKlokVooruitQuestion,
  generateKlokRekenenQuestion,
  generateTijdsduurQuestion,
  generateOmrekenMemoryPairs,
  generateTijdRekenenProblem,
  generateTijdRekenenProblems,
} from '../timeCalculationData';

// ============================================
// HELPER FUNCTIONS
// ============================================

describe('formatTime', () => {
  it('should format in 12h by default', () => {
    expect(formatTime(3, 0)).toBe('03:00');
    expect(formatTime(10, 0)).toBe('10:00');
    expect(formatTime(0, 0)).toBe('12:00');
    expect(formatTime(12, 0)).toBe('12:00');
  });

  it('should convert afternoon hours to 12h format', () => {
    expect(formatTime(13, 0)).toBe('01:00');
    expect(formatTime(15, 30)).toBe('03:30');
    expect(formatTime(23, 45)).toBe('11:45');
  });

  it('should format hours and minutes', () => {
    expect(formatTime(3, 15)).toBe('03:15');
    expect(formatTime(10, 5)).toBe('10:05');
  });

  it('should normalize hours to 0-23', () => {
    expect(formatTime(24, 0)).toBe('12:00');
    expect(formatTime(25, 30)).toBe('01:30');
    expect(formatTime(-1, 0)).toBe('11:00');
  });

  it('should format in 24h when use24h is true', () => {
    expect(formatTime(0, 0, true)).toBe('00:00');
    expect(formatTime(13, 0, true)).toBe('13:00');
    expect(formatTime(15, 30, true)).toBe('15:30');
    expect(formatTime(23, 45, true)).toBe('23:45');
    expect(formatTime(24, 0, true)).toBe('00:00');
  });
});

describe('addMinutes', () => {
  it('should add minutes within the same hour', () => {
    expect(addMinutes(3, 0, 30)).toEqual([3, 30]);
    expect(addMinutes(10, 15, 15)).toEqual([10, 30]);
  });

  it('should add minutes across hours', () => {
    expect(addMinutes(3, 30, 45)).toEqual([4, 15]);
    expect(addMinutes(10, 0, 120)).toEqual([12, 0]);
  });

  it('should subtract minutes', () => {
    expect(addMinutes(3, 0, -60)).toEqual([2, 0]);
    expect(addMinutes(3, 30, -45)).toEqual([2, 45]);
  });

  it('should wrap around midnight', () => {
    expect(addMinutes(23, 0, 120)).toEqual([1, 0]);
    expect(addMinutes(1, 0, -180)).toEqual([22, 0]);
  });
});

describe('formatDuration', () => {
  it('should format whole hours', () => {
    expect(formatDuration(60)).toBe('1 uur');
    expect(formatDuration(120)).toBe('2 uur');
    expect(formatDuration(300)).toBe('5 uur');
  });

  it('should format minutes only', () => {
    expect(formatDuration(15)).toBe('15 min');
    expect(formatDuration(30)).toBe('30 min');
    expect(formatDuration(45)).toBe('45 min');
  });

  it('should format mixed hours and minutes', () => {
    expect(formatDuration(90)).toBe('1 uur en 30 min');
    expect(formatDuration(75)).toBe('1 uur en 15 min');
    expect(formatDuration(150)).toBe('2 uur en 30 min');
  });
});

// ============================================
// KLOK VOORUIT
// ============================================

describe('generateKlokVooruitQuestion', () => {
  it('should return a valid question structure', () => {
    const q = generateKlokVooruitQuestion('wholeHours');
    expect(q).toHaveProperty('question');
    expect(q).toHaveProperty('answer');
    expect(q).toHaveProperty('wrongAnswers');
    expect(q.wrongAnswers).toHaveLength(3);
  });

  it('should generate whole hour questions with time format', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateKlokVooruitQuestion('wholeHours');
      // Answer should be in HH:MM format with :00
      expect(q.answer).toMatch(/^\d{2}:00$/);
      expect(q.question).toMatch(/uur/);
    }
  });

  it('should generate half hour questions', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateKlokVooruitQuestion('halfHours');
      // Answer should be in HH:MM format
      expect(q.answer).toMatch(/^\d{2}:(00|30)$/);
    }
  });

  it('should generate quarter questions', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateKlokVooruitQuestion('quarters');
      expect(q.answer).toMatch(/^\d{2}:\d{2}$/);
      // Minutes should be in quarter increments
      const mins = parseInt(q.answer.split(':')[1]);
      expect([0, 15, 30, 45]).toContain(mins);
    }
  });

  it('should generate minute questions', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateKlokVooruitQuestion('minutes');
      expect(q.answer).toMatch(/^\d{2}:\d{2}$/);
    }
  });

  it('should use 24h format when use24h is true', () => {
    let saw24h = false;
    for (let i = 0; i < 50; i++) {
      const q = generateKlokVooruitQuestion('wholeHours', true);
      const hour = parseInt(q.answer.split(':')[0]);
      if (hour >= 13) saw24h = true;
    }
    expect(saw24h).toBe(true);
  });

  it('should generate day forward questions', () => {
    const days = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'];
    for (let i = 0; i < 20; i++) {
      const q = generateKlokVooruitQuestion('daysWeeks');
      expect(days).toContain(q.answer);
      expect(q.wrongAnswers).toHaveLength(3);
      q.wrongAnswers.forEach(w => expect(days).toContain(w));
      // Wrong answers should not include the correct answer
      expect(q.wrongAnswers).not.toContain(q.answer);
    }
  });

  it('should have unique wrong answers', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateKlokVooruitQuestion('wholeHours');
      const allOptions = [q.answer, ...q.wrongAnswers];
      expect(new Set(allOptions).size).toBe(4);
    }
  });
});

// ============================================
// KLOK REKENEN (analoge klok + MC)
// ============================================

describe('generateKlokRekenenQuestion', () => {
  it('should return a valid structure with startH, startM and durationText', () => {
    const q = generateKlokRekenenQuestion('wholeHours');
    expect(q).toHaveProperty('startH');
    expect(q).toHaveProperty('startM');
    expect(q).toHaveProperty('durationText');
    expect(q).toHaveProperty('isForward');
    expect(q).toHaveProperty('answer');
    expect(q).toHaveProperty('wrongAnswers');
    expect(q.wrongAnswers).toHaveLength(3);
    expect(typeof q.isForward).toBe('boolean');
  });

  it('should generate valid clock hours (1-12)', () => {
    for (let i = 0; i < 30; i++) {
      const q = generateKlokRekenenQuestion('wholeHours');
      expect(q.startH).toBeGreaterThanOrEqual(1);
      expect(q.startH).toBeLessThanOrEqual(12);
      expect(q.startM).toBe(0);
    }
  });

  it('should generate zero-padded time answers', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateKlokRekenenQuestion('wholeHours');
      expect(q.answer).toMatch(/^\d{2}:00$/);
    }
  });

  it('should generate half hour questions with valid minutes', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateKlokRekenenQuestion('halfHours');
      expect([0, 30]).toContain(q.startM);
      expect(q.answer).toMatch(/^\d{2}:(00|30)$/);
    }
  });

  it('should generate quarter questions', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateKlokRekenenQuestion('quarters');
      expect([0, 15, 30, 45]).toContain(q.startM);
      expect(q.answer).toMatch(/^\d{2}:\d{2}$/);
    }
  });

  it('should generate minute questions', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateKlokRekenenQuestion('minutes');
      expect(q.answer).toMatch(/^\d{2}:\d{2}$/);
    }
  });

  it('should have unique wrong answers', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateKlokRekenenQuestion('wholeHours');
      const allOptions = [q.answer, ...q.wrongAnswers];
      expect(new Set(allOptions).size).toBe(4);
    }
  });

  it('should support 24h notation', () => {
    let saw24h = false;
    for (let i = 0; i < 50; i++) {
      const q = generateKlokRekenenQuestion('wholeHours', true);
      const hour = parseInt(q.answer.split(':')[0]);
      if (hour >= 13) saw24h = true;
    }
    expect(saw24h).toBe(true);
  });

  it('should include duration text with uur or minuten', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateKlokRekenenQuestion('wholeHours');
      expect(q.durationText).toMatch(/uur/);
    }
    for (let i = 0; i < 20; i++) {
      const q = generateKlokRekenenQuestion('quarters');
      expect(q.durationText).toMatch(/minuten/);
    }
  });
});

// ============================================
// TIJDSDUUR QUIZ
// ============================================

describe('generateTijdsduurQuestion', () => {
  it('should return a valid question structure', () => {
    const q = generateTijdsduurQuestion('wholeHours');
    expect(q).toHaveProperty('question');
    expect(q).toHaveProperty('answer');
    expect(q).toHaveProperty('wrongAnswers');
    expect(q.wrongAnswers).toHaveLength(3);
  });

  it('should generate whole hour duration questions', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateTijdsduurQuestion('wholeHours');
      expect(q.answer).toMatch(/^\d+ uur$/);
      expect(q.question).toMatch(/Hoe lang duurt het van/);
    }
  });

  it('should generate half hour duration questions', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateTijdsduurQuestion('halfHours');
      expect(q.answer).toMatch(/uur|min/);
    }
  });

  it('should generate day/week duration questions', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateTijdsduurQuestion('daysWeeks');
      expect(q.answer).toMatch(/dag|dagen/);
    }
  });

  it('should have unique wrong answers', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateTijdsduurQuestion('wholeHours');
      const allOptions = [q.answer, ...q.wrongAnswers];
      expect(new Set(allOptions).size).toBe(4);
    }
  });
});

// ============================================
// OMREKEN MEMORY
// ============================================

describe('generateOmrekenMemoryPairs', () => {
  it('should return the requested number of pairs', () => {
    expect(generateOmrekenMemoryPairs('wholeHours', 4)).toHaveLength(4);
    expect(generateOmrekenMemoryPairs('halfHours', 3)).toHaveLength(3);
  });

  it('should return pairs with content and matchContent', () => {
    const pairs = generateOmrekenMemoryPairs('wholeHours', 4);
    pairs.forEach(pair => {
      expect(pair).toHaveProperty('content');
      expect(pair).toHaveProperty('matchContent');
      expect(pair.content).toBeTruthy();
      expect(pair.matchContent).toBeTruthy();
    });
  });

  it('should have unique matchContent values', () => {
    const pairs = generateOmrekenMemoryPairs('wholeHours', 4);
    const matchContents = pairs.map(p => p.matchContent);
    expect(new Set(matchContents).size).toBe(4);
  });

  it('should work for all levels', () => {
    ['wholeHours', 'halfHours', 'quarters', 'minutes', 'daysWeeks'].forEach(level => {
      const pairs = generateOmrekenMemoryPairs(level, 4);
      expect(pairs).toHaveLength(4);
      pairs.forEach(pair => {
        expect(pair.content).toBeTruthy();
        expect(pair.matchContent).toBeTruthy();
      });
    });
  });

  it('should return day/week conversion pairs for daysWeeks level', () => {
    const pairs = generateOmrekenMemoryPairs('daysWeeks', 4);
    // At least some pairs should contain "dagen" or "uur"
    const allText = pairs.map(p => `${p.content} ${p.matchContent}`).join(' ');
    expect(allText).toMatch(/dagen|uur/);
  });
});

// ============================================
// TIJD REKENEN
// ============================================

describe('generateTijdRekenenProblem', () => {
  it('should return a problem with question and numeric answer', () => {
    const p = generateTijdRekenenProblem('wholeHours');
    expect(p).toHaveProperty('question');
    expect(p).toHaveProperty('answer');
    expect(typeof p.answer).toBe('number');
  });

  it('should have ___ placeholder in question', () => {
    for (let i = 0; i < 20; i++) {
      const p = generateTijdRekenenProblem('wholeHours');
      expect(p.question).toContain('___');
    }
  });

  it('should generate whole hour problems with uur unit', () => {
    for (let i = 0; i < 20; i++) {
      const p = generateTijdRekenenProblem('wholeHours');
      expect(p.question).toMatch(/uur/);
      expect(p.answer).toBeGreaterThanOrEqual(1);
      expect(p.answer).toBeLessThanOrEqual(5);
    }
  });

  it('should generate half hour problems with minuten unit', () => {
    for (let i = 0; i < 20; i++) {
      const p = generateTijdRekenenProblem('halfHours');
      expect(p.question).toMatch(/minuten/);
      expect([30, 60, 90, 120]).toContain(p.answer);
    }
  });

  it('should generate quarter problems', () => {
    for (let i = 0; i < 20; i++) {
      const p = generateTijdRekenenProblem('quarters');
      expect(p.question).toMatch(/minuten/);
      expect([15, 30, 45, 60]).toContain(p.answer);
    }
  });

  it('should generate minute problems', () => {
    for (let i = 0; i < 20; i++) {
      const p = generateTijdRekenenProblem('minutes');
      expect(p.question).toMatch(/minuten/);
      expect(p.answer).toBeGreaterThanOrEqual(5);
    }
  });

  it('should use 24h format when use24h is true', () => {
    let saw24h = false;
    for (let i = 0; i < 50; i++) {
      const p = generateTijdRekenenProblem('wholeHours', true);
      if (p.question.match(/\d{2}:\d{2}/) || p.question.match(/1[3-9]:|2[0-3]:/)) saw24h = true;
    }
    expect(saw24h).toBe(true);
  });

  it('should generate day/week problems', () => {
    for (let i = 0; i < 20; i++) {
      const p = generateTijdRekenenProblem('daysWeeks');
      expect(p.question).toMatch(/weken|dagen/);
      expect(p.answer).toBeGreaterThanOrEqual(1);
    }
  });
});

describe('generateTijdRekenenProblems', () => {
  it('should return the requested number of problems', () => {
    const problems = generateTijdRekenenProblems('wholeHours', 4);
    expect(problems).toHaveLength(4);
  });

  it('should try to generate unique answers', () => {
    // With wholeHours (answers 1-5), we should easily get 4 unique
    const problems = generateTijdRekenenProblems('wholeHours', 4);
    const answers = problems.map(p => p.answer);
    expect(new Set(answers).size).toBe(4);
  });

  it('should work for all levels', () => {
    ['wholeHours', 'halfHours', 'quarters', 'minutes', 'daysWeeks'].forEach(level => {
      const problems = generateTijdRekenenProblems(level, 4);
      expect(problems).toHaveLength(4);
      problems.forEach(p => {
        expect(p.question).toContain('___');
        expect(typeof p.answer).toBe('number');
      });
    });
  });
});
