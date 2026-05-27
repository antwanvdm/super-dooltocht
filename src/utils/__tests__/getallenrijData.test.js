import { describe, it, expect } from 'vitest';
import { generateGetallenrijQuestion } from '../getallenrijData';

describe('generateGetallenrijQuestion', () => {
  const LEVELS = ['easy', 'medium', 'hard'];

  LEVELS.forEach((level) => {
    describe(`level: ${level}`, () => {
      it('returns the expected shape', () => {
        const result = generateGetallenrijQuestion(level);
        expect(result).toHaveProperty('sequence');
        expect(result).toHaveProperty('correctAnswer');
        expect(result).toHaveProperty('wrongAnswers');
        expect(result).toHaveProperty('question');
        expect(result).toHaveProperty('level', level);
      });

      it('sequence has exactly 5 elements', () => {
        const result = generateGetallenrijQuestion(level);
        expect(result.sequence).toHaveLength(5);
      });

      it('sequence has exactly one null (the gap)', () => {
        const result = generateGetallenrijQuestion(level);
        const nullCount = result.sequence.filter((n) => n === null).length;
        expect(nullCount).toBe(1);
      });

      it('correctAnswer fills the gap correctly', () => {
        for (let i = 0; i < 10; i++) {
          const result = generateGetallenrijQuestion(level);
          const gapIndex = result.sequence.indexOf(null);
          // Rebuild the full sequence
          const full = [...result.sequence];
          full[gapIndex] = result.correctAnswer;
          // All values should be positive integers
          expect(full.every((n) => Number.isInteger(n) && n > 0)).toBe(true);
        }
      });

      it('wrongAnswers does not contain the correct answer', () => {
        const result = generateGetallenrijQuestion(level);
        expect(result.wrongAnswers).not.toContain(result.correctAnswer);
      });

      it('wrongAnswers contains 3 values', () => {
        const result = generateGetallenrijQuestion(level);
        expect(result.wrongAnswers.length).toBeGreaterThanOrEqual(3);
      });

      it('all wrongAnswers are positive', () => {
        const result = generateGetallenrijQuestion(level);
        expect(result.wrongAnswers.every((n) => n > 0)).toBe(true);
      });

      it('is stable across multiple calls', () => {
        for (let i = 0; i < 20; i++) {
          const result = generateGetallenrijQuestion(level);
          expect(result.sequence.filter((n) => n === null)).toHaveLength(1);
          expect(result.correctAnswer).toBeGreaterThan(0);
        }
      });
    });
  });

  it('defaults to easy when level is undefined', () => {
    const result = generateGetallenrijQuestion();
    expect(result.level).toBe('easy');
    expect(result.sequence).toHaveLength(5);
  });
});
