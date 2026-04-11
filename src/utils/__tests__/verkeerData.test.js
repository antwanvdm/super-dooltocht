import { describe, it, expect } from 'vitest';
import {
  generateBordenQuestion,
  generateRegelsQuestion,
  generateBordenMemoryPairs,
  generateRegelsMemoryPairs,
} from '../verkeerData';

describe('generateBordenQuestion', () => {
  it('returns a question with correctAnswer and wrongAnswers', () => {
    const q = generateBordenQuestion();
    expect(q.question).toBeTruthy();
    expect(q.correctAnswer).toBeTruthy();
    expect(q.wrongAnswers).toBeInstanceOf(Array);
    expect(q.wrongAnswers.length).toBe(3);
  });

  it('correctAnswer is not in wrongAnswers', () => {
    for (let i = 0; i < 30; i++) {
      const q = generateBordenQuestion();
      expect(q.wrongAnswers).not.toContain(q.correctAnswer);
    }
  });

  it('works with easy and medium levels', () => {
    for (const level of ['easy', 'medium']) {
      for (let i = 0; i < 20; i++) {
        const q = generateBordenQuestion(level);
        expect(q.question).toBeTruthy();
        expect(q.wrongAnswers.length).toBe(3);
      }
    }
  });
});

describe('generateRegelsQuestion', () => {
  it('returns a question with correctAnswer and wrongAnswers', () => {
    const q = generateRegelsQuestion();
    expect(q.question).toBeTruthy();
    expect(q.correctAnswer).toBeTruthy();
    expect(q.wrongAnswers.length).toBe(3);
  });

  it('correctAnswer is not in wrongAnswers', () => {
    for (let i = 0; i < 30; i++) {
      const q = generateRegelsQuestion();
      expect(q.wrongAnswers).not.toContain(q.correctAnswer);
    }
  });

  it('works with easy and medium levels', () => {
    for (const level of ['easy', 'medium']) {
      for (let i = 0; i < 20; i++) {
        const q = generateRegelsQuestion(level);
        expect(q.question).toBeTruthy();
        expect(q.wrongAnswers.length).toBe(3);
      }
    }
  });
});

describe('generateBordenMemoryPairs', () => {
  it('returns the requested number of pairs', () => {
    const pairs = generateBordenMemoryPairs(4);
    expect(pairs).toHaveLength(4);
  });

  it('each pair has svg and right string', () => {
    const pairs = generateBordenMemoryPairs(4);
    for (const pair of pairs) {
      expect(pair.svg).toBeTruthy();
      expect(pair.right).toBeTruthy();
      expect(typeof pair.svg).toBe('string');
      expect(typeof pair.right).toBe('string');
    }
  });

  it('returns unique pairs', () => {
    const pairs = generateBordenMemoryPairs(4);
    const svgValues = pairs.map((p) => p.svg);
    expect(new Set(svgValues).size).toBe(svgValues.length);
  });

  it('works with easy and medium levels', () => {
    for (const level of ['easy', 'medium']) {
      const pairs = generateBordenMemoryPairs(4, level);
      expect(pairs).toHaveLength(4);
    }
  });
});

describe('generateRegelsMemoryPairs', () => {
  it('returns the requested number of pairs', () => {
    const pairs = generateRegelsMemoryPairs(4);
    expect(pairs).toHaveLength(4);
  });

  it('each pair has left and right strings', () => {
    const pairs = generateRegelsMemoryPairs(4);
    for (const pair of pairs) {
      expect(pair.left).toBeTruthy();
      expect(pair.right).toBeTruthy();
    }
  });

  it('works with easy and medium levels', () => {
    for (const level of ['easy', 'medium']) {
      const pairs = generateRegelsMemoryPairs(4, level);
      expect(pairs).toHaveLength(4);
    }
  });

  it('does not exceed available pairs', () => {
    const pairs = generateRegelsMemoryPairs(20, 'easy');
    expect(pairs.length).toBeGreaterThan(0);
    expect(pairs.length).toBeLessThanOrEqual(20);
  });
});
