import { describe, it, expect } from 'vitest';
import {
  generateVormenQuestion,
  generateSymmetrieQuestion,
  generateEenhedenQuestion,
  generateEenhedenMemoryPairs,
  generateOmtrekOppervlakteQuestion,
  generateVormenMemoryPairs,
  SHAPES,
  SHAPES_2D_EASY,
  SHAPES_2D_MEDIUM,
  SHAPES_3D,
  SYMMETRY_SHAPES,
  SYMMETRY_SHAPES_EASY,
  SYMMETRY_SHAPES_MEDIUM,
} from '../meetkundeData';

describe('generateVormenQuestion', () => {
  it('returns a question with correctAnswer and wrongAnswers (easy)', () => {
    const q = generateVormenQuestion('easy');
    expect(q.question).toBeTruthy();
    expect(q.correctAnswer).toBeTruthy();
    expect(q.wrongAnswers).toBeInstanceOf(Array);
    expect(q.wrongAnswers.length).toBeGreaterThanOrEqual(1);
    expect(q.svg).toBeTruthy();
  });

  it('correctAnswer is not in wrongAnswers', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateVormenQuestion('easy');
      expect(q.wrongAnswers).not.toContain(q.correctAnswer);
    }
  });

  it('medium level can produce 3D or extended 2D questions', () => {
    const all3DNames = SHAPES_3D.map((s) => s.name);
    const extendedNames = SHAPES_2D_MEDIUM.filter(
      (s) => !SHAPES_2D_EASY.some((e) => e.name === s.name),
    ).map((s) => s.name);
    const allAdvanced = [...all3DNames, ...extendedNames];

    let foundAdvanced = false;
    for (let i = 0; i < 100; i++) {
      const q = generateVormenQuestion('medium');
      if (allAdvanced.includes(q.correctAnswer) || q.is3D) {
        foundAdvanced = true;
        break;
      }
    }
    expect(foundAdvanced).toBe(true);
  });

  it('easy level only uses basic shapes', () => {
    const easyNames = SHAPES_2D_EASY.map((s) => s.name);
    const easySides = SHAPES_2D_EASY.filter((s) => s.sides > 0).map((s) =>
      String(s.sides),
    );
    const allowed = [...easyNames, ...easySides];
    for (let i = 0; i < 50; i++) {
      const q = generateVormenQuestion('easy');
      expect(allowed).toContain(q.correctAnswer);
    }
  });
});

describe('generateSymmetrieQuestion', () => {
  it('returns svg and shapeName for visual display', () => {
    const q = generateSymmetrieQuestion('easy');
    expect(q.svg).toBeTruthy();
    expect(q.shapeName).toBeTruthy();
    expect(q.question).toBeTruthy();
    expect(q.correctAnswer).toBeTruthy();
    expect(q.wrongAnswers).toBeInstanceOf(Array);
    expect(q.wrongAnswers.length).toBeGreaterThanOrEqual(1);
  });

  it('easy level only asks yes/no questions', () => {
    for (let i = 0; i < 30; i++) {
      const q = generateSymmetrieQuestion('easy');
      expect(q.isYesNo).toBe(true);
      expect(['Ja', 'Nee']).toContain(q.correctAnswer);
    }
  });

  it('easy level only uses easy shapes', () => {
    const easyNames = SYMMETRY_SHAPES_EASY.map((s) => s.name);
    for (let i = 0; i < 30; i++) {
      const q = generateSymmetrieQuestion('easy');
      expect(easyNames).toContain(q.shapeName);
    }
  });

  it('medium level can produce line-counting questions', () => {
    let foundLineCounting = false;
    for (let i = 0; i < 50; i++) {
      const q = generateSymmetrieQuestion('medium');
      if (!q.isYesNo) {
        foundLineCounting = true;
        expect(Number(q.correctAnswer)).toBeGreaterThanOrEqual(1);
        expect(Number(q.correctAnswer)).toBeLessThanOrEqual(4);
        break;
      }
    }
    expect(foundLineCounting).toBe(true);
  });

  it('medium line-counting answers are in 1–4 range', () => {
    for (let i = 0; i < 50; i++) {
      const q = generateSymmetrieQuestion('medium');
      if (!q.isYesNo) {
        expect(Number(q.correctAnswer)).toBeGreaterThanOrEqual(1);
        expect(Number(q.correctAnswer)).toBeLessThanOrEqual(4);
        q.wrongAnswers.forEach((w) => {
          expect(Number(w)).toBeGreaterThanOrEqual(1);
          expect(Number(w)).toBeLessThanOrEqual(4);
        });
      }
    }
  });

  it('SYMMETRY_SHAPES_EASY is subset of SYMMETRY_SHAPES_MEDIUM', () => {
    const mediumNames = SYMMETRY_SHAPES_MEDIUM.map((s) => s.name);
    SYMMETRY_SHAPES_EASY.forEach((s) => {
      expect(mediumNames).toContain(s.name);
    });
  });

  it('all shapes have svg keys', () => {
    [...SYMMETRY_SHAPES_EASY, ...SYMMETRY_SHAPES_MEDIUM].forEach((s) => {
      expect(s.svg).toBeTruthy();
    });
  });
});

describe('generateEenhedenQuestion', () => {
  it('generates easy questions with valid structure', () => {
    const q = generateEenhedenQuestion('easy');
    expect(q.question).toContain('=');
    expect(q.correctAnswer).toEqual(expect.any(Number));
    expect(q.wrongAnswers.length).toBe(3);
    expect(q.wrongAnswers).not.toContain(q.correctAnswer);
  });

  it('generates medium questions', () => {
    const q = generateEenhedenQuestion('medium');
    expect(q.question).toContain('=');
    expect(q.correctAnswer).toEqual(expect.any(Number));
  });

  it('wrong answers are all positive', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateEenhedenQuestion('easy');
      q.wrongAnswers.forEach((w) => expect(w).toBeGreaterThan(0));
    }
  });
});

describe('generateEenhedenMemoryPairs', () => {
  it('returns requested number of pairs', () => {
    const pairs = generateEenhedenMemoryPairs(4, 'easy');
    expect(pairs.length).toBe(4);
    pairs.forEach((p) => {
      expect(p.left).toBeTruthy();
      expect(p.right).toBeTruthy();
    });
  });

  it('pairs have different left and right values', () => {
    const pairs = generateEenhedenMemoryPairs(4, 'easy');
    pairs.forEach((p) => {
      expect(p.left).not.toBe(p.right);
    });
  });
});

describe('generateOmtrekOppervlakteQuestion', () => {
  it('generates a problem with answer and wrongAnswers', () => {
    const q = generateOmtrekOppervlakteQuestion('easy');
    expect(q.question).toBeTruthy();
    expect(q.answer).toEqual(expect.any(Number));
    expect(q.answer).toBeGreaterThan(0);
    expect(q.wrongAnswers.length).toBe(3);
    expect(q.wrongAnswers).not.toContain(q.answer);
    expect(q.unit).toBeTruthy();
  });

  it('generates valid shapes', () => {
    for (let i = 0; i < 30; i++) {
      const q = generateOmtrekOppervlakteQuestion('easy');
      expect(['rechthoek', 'vierkant', 'driehoek']).toContain(q.shape);
      expect(['perimeter', 'area']).toContain(q.type);
    }
  });

  it('rectangle perimeter is correct', () => {
    for (let i = 0; i < 50; i++) {
      const q = generateOmtrekOppervlakteQuestion('easy');
      if (q.shape === 'rechthoek' && q.type === 'perimeter') {
        expect(q.answer).toBe(2 * (q.width + q.height));
      }
      if (q.shape === 'rechthoek' && q.type === 'area') {
        expect(q.answer).toBe(q.width * q.height);
      }
      if (q.shape === 'vierkant' && q.type === 'perimeter') {
        expect(q.answer).toBe(4 * q.side);
      }
      if (q.shape === 'vierkant' && q.type === 'area') {
        expect(q.answer).toBe(q.side * q.side);
      }
    }
  });
});

describe('generateVormenMemoryPairs', () => {
  it('returns requested number of pairs with valid content (easy)', () => {
    const pairs = generateVormenMemoryPairs(4, 'easy');
    expect(pairs.length).toBe(4);
    pairs.forEach((p) => {
      expect(p.left).toBeTruthy();
      expect(p.right).toBeTruthy();
      expect(p.svg).toBeTruthy();
    });
  });

  it('medium level can include 3D shapes', () => {
    let found3D = false;
    for (let i = 0; i < 30; i++) {
      const pairs = generateVormenMemoryPairs(6, 'medium');
      if (pairs.some((p) => SHAPES_3D.some((s) => s.name === p.left))) {
        found3D = true;
        break;
      }
    }
    expect(found3D).toBe(true);
  });
});

describe('SHAPES data', () => {
  it('all legacy SHAPES have required fields', () => {
    SHAPES.forEach((s) => {
      expect(s.name).toBeTruthy();
      expect(typeof s.sides).toBe('number');
      expect(s.svg).toBeTruthy();
    });
  });

  it('SHAPES_2D_EASY has basic shapes', () => {
    const names = SHAPES_2D_EASY.map((s) => s.name);
    expect(names).toContain('driehoek');
    expect(names).toContain('vierkant');
    expect(names).toContain('rechthoek');
    expect(names).toContain('cirkel');
    SHAPES_2D_EASY.forEach((s) => {
      expect(s.svg).toBeTruthy();
      expect(s.description).toBeTruthy();
    });
  });

  it('SHAPES_2D_MEDIUM includes easy shapes plus extras', () => {
    expect(SHAPES_2D_MEDIUM.length).toBeGreaterThan(SHAPES_2D_EASY.length);
    const names = SHAPES_2D_MEDIUM.map((s) => s.name);
    expect(names).toContain('ruit');
    expect(names).toContain('trapezium');
  });

  it('SHAPES_3D has 3D shapes', () => {
    expect(SHAPES_3D.length).toBeGreaterThanOrEqual(5);
    const names = SHAPES_3D.map((s) => s.name);
    expect(names).toContain('kubus');
    expect(names).toContain('bol');
    expect(names).toContain('kegel');
    SHAPES_3D.forEach((s) => {
      expect(s.svg).toBeTruthy();
      expect(s.description).toBeTruthy();
    });
  });
});

describe('SYMMETRY_SHAPES data', () => {
  it('all shapes have required fields', () => {
    SYMMETRY_SHAPES.forEach((s) => {
      expect(s.name).toBeTruthy();
      expect(typeof s.lines).toBe('number');
      expect(typeof s.hasSymmetry).toBe('boolean');
    });
  });
});
