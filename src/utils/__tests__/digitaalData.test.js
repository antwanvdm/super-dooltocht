import { describe, it, expect } from 'vitest';
import {
  generateComputerTermQuestion,
  generateVeiligheidQuestion,
  generateMediawijsheidQuestion,
  generateDigitaalQuestion,
  generateDigitaalMemoryPairs,
  generateDigitaalConnectPairs,
} from '../digitaalData';

describe('generateComputerTermQuestion', () => {
  it('returns a question with correctAnswer and wrongAnswers', () => {
    const q = generateComputerTermQuestion();
    expect(q.question).toBeTruthy();
    expect(q.correctAnswer).toBeTruthy();
    expect(q.wrongAnswers).toBeInstanceOf(Array);
    expect(q.wrongAnswers.length).toBe(3);
  });

  it('correctAnswer is not in wrongAnswers', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateComputerTermQuestion();
      expect(q.wrongAnswers).not.toContain(q.correctAnswer);
    }
  });

  it('has a term field', () => {
    const q = generateComputerTermQuestion();
    expect(q.term).toBeTruthy();
  });
});

describe('generateVeiligheidQuestion', () => {
  it('returns a question with correctAnswer and wrongAnswers', () => {
    const q = generateVeiligheidQuestion();
    expect(q.question).toBeTruthy();
    expect(q.correctAnswer).toBeTruthy();
    expect(q.wrongAnswers).toBeInstanceOf(Array);
    expect(q.wrongAnswers.length).toBe(3);
  });

  it('correctAnswer is not in wrongAnswers', () => {
    for (let i = 0; i < 10; i++) {
      const q = generateVeiligheidQuestion();
      expect(q.wrongAnswers).not.toContain(q.correctAnswer);
    }
  });
});

describe('generateMediawijsheidQuestion', () => {
  it('returns a question with correctAnswer and wrongAnswers', () => {
    const q = generateMediawijsheidQuestion();
    expect(q.question).toBeTruthy();
    expect(q.correctAnswer).toBeTruthy();
    expect(q.wrongAnswers).toBeInstanceOf(Array);
    expect(q.wrongAnswers.length).toBe(3);
  });
});

describe('generateDigitaalQuestion', () => {
  it('picks from all topics by default', () => {
    // Just ensure it doesn't throw for 50 iterations
    for (let i = 0; i < 50; i++) {
      const q = generateDigitaalQuestion();
      expect(q.question).toBeTruthy();
      expect(q.correctAnswer).toBeTruthy();
      expect(q.wrongAnswers.length).toBe(3);
    }
  });

  it('respects topic filtering', () => {
    const q = generateDigitaalQuestion({ computerkennis: false, veiligheid: false, mediawijsheid: true });
    expect(q.question).toBeTruthy();
    expect(q.correctAnswer).toBeTruthy();
  });

  it('falls back to computerkennis when all disabled', () => {
    const q = generateDigitaalQuestion({ computerkennis: false, veiligheid: false, mediawijsheid: false });
    expect(q.question).toBeTruthy();
    expect(q.correctAnswer).toBeTruthy();
  });
});

describe('generateDigitaalMemoryPairs', () => {
  it('returns requested number of pairs', () => {
    const pairs = generateDigitaalMemoryPairs(4);
    expect(pairs.length).toBe(4);
    pairs.forEach(p => {
      expect(p.left).toBeTruthy();
      expect(p.right).toBeTruthy();
    });
  });

  it('pairs have different left and right', () => {
    const pairs = generateDigitaalMemoryPairs(4);
    pairs.forEach(p => {
      expect(p.left).not.toBe(p.right);
    });
  });
});

describe('generateDigitaalConnectPairs', () => {
  it('returns requested number of pairs', () => {
    const pairs = generateDigitaalConnectPairs(4);
    expect(pairs.length).toBe(4);
    pairs.forEach(p => {
      expect(p.left).toBeTruthy();
      expect(p.right).toBeTruthy();
    });
  });
});
