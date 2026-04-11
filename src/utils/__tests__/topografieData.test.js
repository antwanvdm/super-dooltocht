import { describe, it, expect } from 'vitest';
import {
  generateNederlandQuestion,
  generateWereldQuestion,
  generateNederlandMemoryPairs,
  generateWereldMemoryPairs,
} from '../topografieData';

describe('generateNederlandQuestion', () => {
  it('returns a question with correctAnswer and wrongAnswers', () => {
    const q = generateNederlandQuestion();
    expect(q.question).toBeTruthy();
    expect(q.correctAnswer).toBeTruthy();
    expect(q.wrongAnswers).toBeInstanceOf(Array);
    expect(q.wrongAnswers.length).toBe(3);
  });

  it('correctAnswer is not in wrongAnswers', () => {
    for (let i = 0; i < 30; i++) {
      const q = generateNederlandQuestion();
      expect(q.wrongAnswers).not.toContain(q.correctAnswer);
    }
  });

  it('works with easy and medium levels', () => {
    for (const level of ['easy', 'medium']) {
      for (let i = 0; i < 20; i++) {
        const q = generateNederlandQuestion(level);
        expect(q.question).toBeTruthy();
        expect(q.wrongAnswers.length).toBe(3);
      }
    }
  });
});

describe('generateWereldQuestion', () => {
  it('returns a question with correctAnswer and wrongAnswers', () => {
    const q = generateWereldQuestion();
    expect(q.question).toBeTruthy();
    expect(q.correctAnswer).toBeTruthy();
    expect(q.wrongAnswers.length).toBe(3);
  });

  it('correctAnswer is not in wrongAnswers', () => {
    for (let i = 0; i < 30; i++) {
      const q = generateWereldQuestion();
      expect(q.wrongAnswers).not.toContain(q.correctAnswer);
    }
  });

  it('works with easy and medium levels', () => {
    for (const level of ['easy', 'medium']) {
      for (let i = 0; i < 20; i++) {
        const q = generateWereldQuestion(level);
        expect(q.question).toBeTruthy();
        expect(q.wrongAnswers.length).toBe(3);
      }
    }
  });
});

describe('generateNederlandMemoryPairs', () => {
  it('returns the requested number of pairs', () => {
    const pairs = generateNederlandMemoryPairs(4);
    expect(pairs).toHaveLength(4);
  });

  it('each pair has left and right strings', () => {
    const pairs = generateNederlandMemoryPairs(4);
    for (const pair of pairs) {
      expect(pair.left).toBeTruthy();
      expect(pair.right).toBeTruthy();
      expect(typeof pair.left).toBe('string');
      expect(typeof pair.right).toBe('string');
    }
  });

  it('returns unique pairs', () => {
    const pairs = generateNederlandMemoryPairs(4);
    const leftValues = pairs.map((p) => p.left);
    expect(new Set(leftValues).size).toBe(leftValues.length);
  });

  it('works with easy and medium levels', () => {
    for (const level of ['easy', 'medium']) {
      const pairs = generateNederlandMemoryPairs(4, level);
      expect(pairs).toHaveLength(4);
    }
  });
});

describe('generateWereldMemoryPairs', () => {
  it('returns the requested number of pairs', () => {
    const pairs = generateWereldMemoryPairs(4);
    expect(pairs).toHaveLength(4);
  });

  it('each pair has left and right strings', () => {
    const pairs = generateWereldMemoryPairs(4);
    for (const pair of pairs) {
      expect(pair.left).toBeTruthy();
      expect(pair.right).toBeTruthy();
    }
  });

  it('works with easy and medium levels', () => {
    for (const level of ['easy', 'medium']) {
      const pairs = generateWereldMemoryPairs(4, level);
      expect(pairs).toHaveLength(4);
    }
  });

  it('does not exceed available pairs', () => {
    const pairs = generateWereldMemoryPairs(20, 'easy');
    expect(pairs.length).toBeGreaterThan(0);
    expect(pairs.length).toBeLessThanOrEqual(20);
  });
});
