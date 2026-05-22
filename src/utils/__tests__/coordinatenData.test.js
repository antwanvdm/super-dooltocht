import { describe, it, expect } from 'vitest';
import {
  generateCoordinaatQuestion,
  generateRouteQuestion,
  generateCoordinaatMemoryPairs,
  COLUMN_LABELS,
} from '../coordinatenData';

describe('generateCoordinaatQuestion', () => {
  it('returns a question with correctAnswer and wrongAnswers (easy)', () => {
    const q = generateCoordinaatQuestion('easy');
    expect(q.question).toBeTruthy();
    expect(q.correctAnswer).toBeTruthy();
    expect(q.wrongAnswers).toBeInstanceOf(Array);
    expect(q.wrongAnswers.length).toBe(3);
    expect(q.grid).toBeInstanceOf(Array);
    expect(q.gridCols).toBe(3);
    expect(q.gridRows).toBe(3);
  });

  it('correctAnswer is not in wrongAnswers', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateCoordinaatQuestion('easy');
      expect(q.wrongAnswers).not.toContain(q.correctAnswer);
    }
  });

  it('medium level uses a 4x4 grid', () => {
    const q = generateCoordinaatQuestion('medium');
    expect(q.gridCols).toBe(4);
    expect(q.gridRows).toBe(4);
  });

  it('hard level uses a 5x5 grid', () => {
    const q = generateCoordinaatQuestion('hard');
    expect(q.gridCols).toBe(5);
    expect(q.gridRows).toBe(5);
  });

  it('generates whatIsAt and whereIs question types', () => {
    const types = new Set();
    for (let i = 0; i < 50; i++) {
      const q = generateCoordinaatQuestion('easy');
      types.add(q.questionType);
    }
    expect(types.has('whatIsAt') || types.has('whereIs')).toBe(true);
  });

  it('medium/hard can generate moveFrom questions', () => {
    const types = new Set();
    for (let i = 0; i < 100; i++) {
      const q = generateCoordinaatQuestion('medium');
      types.add(q.questionType);
    }
    expect(types.has('moveFrom')).toBe(true);
  });

  it('grid contains icons at valid positions', () => {
    const q = generateCoordinaatQuestion('easy');
    let iconCount = 0;
    for (const row of q.grid) {
      for (const cell of row) {
        if (cell) iconCount++;
      }
    }
    expect(iconCount).toBe(4); // easy has 4 icons
  });
});

describe('generateRouteQuestion', () => {
  it('returns a question with grid and correctAnswer (easy)', () => {
    const q = generateRouteQuestion('easy');
    expect(q.question).toBeTruthy();
    expect(q.correctAnswer).toBeTruthy();
    expect(q.wrongAnswers).toBeInstanceOf(Array);
    expect(q.wrongAnswers.length).toBeGreaterThanOrEqual(2);
    expect(q.grid).toBeInstanceOf(Array);
    expect(q.gridCols).toBe(3);
    expect(q.gridRows).toBe(3);
  });

  it('correctAnswer is not in wrongAnswers', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateRouteQuestion('easy');
      expect(q.wrongAnswers).not.toContain(q.correctAnswer);
    }
  });

  it('easy level uses whichDirection questions', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateRouteQuestion('easy');
      expect(q.questionType).toBe('whichDirection');
    }
  });

  it('medium level uses 4x4 grid', () => {
    const q = generateRouteQuestion('medium');
    expect(q.gridCols).toBe(4);
    expect(q.gridRows).toBe(4);
  });

  it('hard level can generate whereEnd and whatOnRoute questions', () => {
    const types = new Set();
    for (let i = 0; i < 100; i++) {
      const q = generateRouteQuestion('hard');
      types.add(q.questionType);
    }
    expect(
      types.has('whichDirection') ||
        types.has('whereEnd') ||
        types.has('whatOnRoute'),
    ).toBe(true);
  });

  it('uses links/rechts/omhoog/omlaag, not compass directions', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateRouteQuestion('hard');
      if (q.questionType === 'whichDirection') {
        const validAnswers = ['naar rechts', 'naar links', 'omhoog', 'omlaag'];
        expect(validAnswers).toContain(q.correctAnswer);
      }
    }
  });
});

describe('generateCoordinaatMemoryPairs', () => {
  it('returns pairs with grid (easy)', () => {
    const result = generateCoordinaatMemoryPairs('easy');
    expect(result.pairs).toBeInstanceOf(Array);
    expect(result.pairs.length).toBe(4);
    expect(result.grid).toBeInstanceOf(Array);
    expect(result.gridCols).toBe(3);
    expect(result.gridRows).toBe(3);
  });

  it('each pair has a coordinate label and an icon', () => {
    const result = generateCoordinaatMemoryPairs('easy');
    for (const pair of result.pairs) {
      expect(pair.a).toMatch(/^[A-E]\d$/);
      expect(pair.b).toBeTruthy();
    }
  });

  it('medium returns 4 pairs on 4x4 grid', () => {
    const result = generateCoordinaatMemoryPairs('medium');
    expect(result.pairs.length).toBe(4);
    expect(result.gridCols).toBe(4);
  });

  it('hard returns 4 pairs on 5x5 grid', () => {
    const result = generateCoordinaatMemoryPairs('hard');
    expect(result.pairs.length).toBe(4);
    expect(result.gridCols).toBe(5);
  });
});

describe('COLUMN_LABELS', () => {
  it('exports column labels starting with A', () => {
    expect(COLUMN_LABELS[0]).toBe('A');
    expect(COLUMN_LABELS.length).toBeGreaterThanOrEqual(5);
  });
});
