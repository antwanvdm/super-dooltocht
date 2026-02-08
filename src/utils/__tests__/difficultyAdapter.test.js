import { describe, it, expect } from 'vitest';
import {
  generateMathProblem,
  generateUniqueMathProblems,
  generateWrongAnswers,
  formatMoney,
  findOptimalCombination,
  getCurrencyForLevel,
  generateValidAmount,
  generateClockProblem,
  generateUniqueClockProblems,
  generateWrongClockTimes,
  timeToWords,
  formatDigital,
  formatDigital24,
  to24h,
  dagdeel,
} from '../difficultyAdapter';

// ============================================
// HELPER FUNCTIONS
// ============================================

const parseQuestion = (question, type) => {
  if (type === 'multiplication') {
    const [a, , b] = question.split(' ');
    return { a: parseInt(a), b: parseInt(b) };
  }
  if (type === 'addition') {
    const [a, , b] = question.split(' ');
    return { a: parseInt(a), b: parseInt(b) };
  }
  if (type === 'subtraction') {
    const [a, , b] = question.split(' ');
    return { a: parseInt(a), b: parseInt(b) };
  }
  return null;
};

const getTens = (n) => Math.floor(n / 10) * 10;

// ============================================
// ADDITION TESTS
// ============================================

describe('Addition', () => {
  it('should generate 100 valid addition problems within maxValue', () => {
    const settings = {
      enabledOperations: { add: true },
      maxValue: 100,
    };

    for (let i = 0; i < 100; i++) {
      const problem = generateMathProblem(settings);
      expect(problem.type).toBe('addition');
      expect(problem.answer).toBeGreaterThanOrEqual(0);
      expect(problem.answer).toBeLessThanOrEqual(100);

      const { a, b } = parseQuestion(problem.question, 'addition');
      expect(a + b).toBe(problem.answer);
      expect(a).toBeGreaterThanOrEqual(0);
      expect(b).toBeGreaterThanOrEqual(0);
    }
  });

  it('should respect "within tens" mode - answer stays in same ten', () => {
    const settings = {
      enabledOperations: { add: true },
      maxValue: 50,
      addSubMode: 'within',
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      const { a, b } = parseQuestion(problem.question, 'addition');
      const answer = a + b;

      // Answer should stay in same tens group as 'a'
      expect(getTens(answer)).toBe(getTens(a));
    }
  });

  it('should respect "beyond tens" mode with units - crosses ten boundary', () => {
    const settings = {
      enabledOperations: { add: true },
      maxValue: 100,
      addSubMode: 'beyond',
      beyondDigits: 'units',
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      const { a, b } = parseQuestion(problem.question, 'addition');

      // b should be single digit (units)
      expect(b).toBeGreaterThanOrEqual(1);
      expect(b).toBeLessThanOrEqual(9);

      // Should cross ten boundary
      expect(getTens(a + b)).toBeGreaterThan(getTens(a));
    }
  });

  it('should respect "beyond tens" mode with tens - adds double digit numbers', () => {
    const settings = {
      enabledOperations: { add: true },
      maxValue: 200,
      addSubMode: 'beyond',
      beyondDigits: 'tens',
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      const { a, b } = parseQuestion(problem.question, 'addition');

      // b should be at least 10
      expect(b).toBeGreaterThanOrEqual(10);
    }
  });

  it('should respect "beyond tens" mode with hundreds - adds three digit numbers', () => {
    const settings = {
      enabledOperations: { add: true },
      maxValue: 1000,
      addSubMode: 'beyond',
      beyondDigits: 'hundreds',
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      const { a, b } = parseQuestion(problem.question, 'addition');

      // b should be at least 100
      expect(b).toBeGreaterThanOrEqual(100);
    }
  });

  it('should work with small ranges (edge case)', () => {
    const settings = {
      enabledOperations: { add: true },
      maxValue: 20,
    };

    for (let i = 0; i < 30; i++) {
      const problem = generateMathProblem(settings);
      expect(problem.answer).toBeLessThanOrEqual(20);
      expect(problem.answer).toBeGreaterThanOrEqual(0);
    }
  });
});

// ============================================
// SUBTRACTION TESTS
// ============================================

describe('Subtraction', () => {
  it('should generate 100 valid subtraction problems - no negative results', () => {
    const settings = {
      enabledOperations: { sub: true },
      maxValue: 100,
    };

    for (let i = 0; i < 100; i++) {
      const problem = generateMathProblem(settings);
      expect(problem.type).toBe('subtraction');
      expect(problem.answer).toBeGreaterThanOrEqual(0);

      const { a, b } = parseQuestion(problem.question, 'subtraction');
      expect(a - b).toBe(problem.answer);
      expect(a).toBeGreaterThanOrEqual(b); // No negative answers
    }
  });

  it('should respect "within tens" mode - result stays in same ten', () => {
    const settings = {
      enabledOperations: { sub: true },
      maxValue: 50,
      addSubMode: 'within',
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      const { a, b } = parseQuestion(problem.question, 'subtraction');
      const answer = a - b;

      // Answer should stay in same tens group as 'a'
      expect(getTens(answer)).toBe(getTens(a));
    }
  });

  it('should respect "beyond tens" mode with units - crosses ten boundary', () => {
    const settings = {
      enabledOperations: { sub: true },
      maxValue: 100,
      addSubMode: 'beyond',
      beyondDigits: 'units',
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      const { a, b } = parseQuestion(problem.question, 'subtraction');

      // b should be single digit
      expect(b).toBeGreaterThanOrEqual(1);
      expect(b).toBeLessThanOrEqual(9);

      // Should cross ten boundary
      expect(getTens(a - b)).toBeLessThan(getTens(a));
    }
  });

  it('should respect "beyond tens" mode with tens', () => {
    const settings = {
      enabledOperations: { sub: true },
      maxValue: 200,
      addSubMode: 'beyond',
      beyondDigits: 'tens',
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      const { a, b } = parseQuestion(problem.question, 'subtraction');

      expect(b).toBeGreaterThanOrEqual(10);
      expect(a - b).toBeGreaterThanOrEqual(0);
    }
  });
});

// ============================================
// MULTIPLICATION TESTS
// ============================================

describe('Multiplication', () => {
  it('should generate 100 valid multiplication problems', () => {
    const settings = {
      enabledOperations: { mul: true },
      mulTables: 'all',
    };

    for (let i = 0; i < 100; i++) {
      const problem = generateMathProblem(settings);
      expect(problem.type).toBe('multiplication');

      const { a, b } = parseQuestion(problem.question, 'multiplication');
      expect(a * b).toBe(problem.answer);
    }
  });

  it('should respect correct order: multiplier × table (not table × multiplier)', () => {
    const settings = {
      enabledOperations: { mul: true },
      mulTables: 'easy', // 1, 2, 5, 10
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      const { a, b } = parseQuestion(problem.question, 'multiplication');

      // a is multiplier (1-10), b is table number
      expect(a).toBeGreaterThanOrEqual(1);
      expect(a).toBeLessThanOrEqual(10);

      // b should be from easy tables: 1, 2, 5, 10
      expect([1, 2, 5, 10]).toContain(b);
    }
  });

  it('should only use easy tables (1, 2, 5, 10) when selected', () => {
    const settings = {
      enabledOperations: { mul: true },
      mulTables: 'easy',
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      const { a, b } = parseQuestion(problem.question, 'multiplication');
      expect([1, 2, 5, 10]).toContain(b);
    }
  });

  it('should only use medium tables (3, 4, 6, 7, 8, 9) when selected', () => {
    const settings = {
      enabledOperations: { mul: true },
      mulTables: 'medium',
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      const { a, b } = parseQuestion(problem.question, 'multiplication');
      expect([3, 4, 6, 7, 8, 9]).toContain(b);
    }
  });

  it('should only use hard tables (11, 12) when selected', () => {
    const settings = {
      enabledOperations: { mul: true },
      mulTables: 'hard',
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      const { a, b } = parseQuestion(problem.question, 'multiplication');
      expect([11, 12]).toContain(b);
    }
  });

  it('should only use expert tables (13-20) when selected', () => {
    const settings = {
      enabledOperations: { mul: true },
      mulTables: 'expert',
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      const { a, b } = parseQuestion(problem.question, 'multiplication');
      expect(b).toBeGreaterThanOrEqual(13);
      expect(b).toBeLessThanOrEqual(20);
    }
  });

  it('should use tables 1-10 when "all" is selected', () => {
    const settings = {
      enabledOperations: { mul: true },
      mulTables: 'all',
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      const { a, b } = parseQuestion(problem.question, 'multiplication');
      expect(b).toBeGreaterThanOrEqual(1);
      expect(b).toBeLessThanOrEqual(10);
    }
  });

  it('should use tables 1-20 when "allplus" is selected', () => {
    const settings = {
      enabledOperations: { mul: true },
      mulTables: 'allplus',
    };

    for (let i = 0; i < 100; i++) {
      const problem = generateMathProblem(settings);
      const { a, b } = parseQuestion(problem.question, 'multiplication');
      expect(b).toBeGreaterThanOrEqual(1);
      expect(b).toBeLessThanOrEqual(20);
    }
  });
});

// ============================================
// PLACE VALUE TESTS
// ============================================

describe('Place Value (Getallen begrijpen)', () => {
  it('should generate 50 valid place value problems for tens level', () => {
    const settings = {
      enabledOperations: { placeValue: true },
      placeValueLevel: 'tens',
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      expect(problem.type).toBe('placeValue');

      const number = parseInt(problem.question);
      expect(number).toBeGreaterThanOrEqual(10);
      expect(number).toBeLessThanOrEqual(99);

      // Verify decomposition
      const units = number % 10;
      const tens = Math.floor(number / 10) * 10;

      expect(problem.allPlaceValues).toContain(units);
      expect(problem.allPlaceValues).toContain(tens);

      // Verify answer matches position
      if (problem.positionName === 'eenheid') {
        expect(problem.answer).toBe(units);
      } else if (problem.positionName === 'tiental') {
        expect(problem.answer).toBe(tens);
      }
    }
  });

  it('should generate 50 valid place value problems for hundreds level', () => {
    const settings = {
      enabledOperations: { placeValue: true },
      placeValueLevel: 'hundreds',
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      const number = parseInt(problem.question);
      expect(number).toBeGreaterThanOrEqual(100);
      expect(number).toBeLessThanOrEqual(999);

      const units = number % 10;
      const tens = (Math.floor(number / 10) % 10) * 10;
      const hundreds = Math.floor(number / 100) * 100;

      // Sum of place values equals original number
      expect(units + tens + hundreds).toBe(number);

      // Verify answer
      if (problem.positionName === 'eenheid') {
        expect(problem.answer).toBe(units);
      } else if (problem.positionName === 'tiental') {
        expect(problem.answer).toBe(tens);
      } else if (problem.positionName === 'honderdtal') {
        expect(problem.answer).toBe(hundreds);
      }
    }
  });

  it('should generate 50 valid place value problems for thousands level', () => {
    const settings = {
      enabledOperations: { placeValue: true },
      placeValueLevel: 'thousands',
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      const number = parseInt(problem.question);
      expect(number).toBeGreaterThanOrEqual(1000);
      expect(number).toBeLessThanOrEqual(9999);

      const units = number % 10;
      const tens = (Math.floor(number / 10) % 10) * 10;
      const hundreds = (Math.floor(number / 100) % 10) * 100;
      const thousands = Math.floor(number / 1000) * 1000;

      // Sum equals original
      expect(units + tens + hundreds + thousands).toBe(number);
    }
  });

  it('should use correct Dutch terms (De eenheid, Het tiental)', () => {
    const settings = {
      enabledOperations: { placeValue: true },
      placeValueLevel: 'hundreds',
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      expect(['eenheid', 'tiental', 'honderdtal', 'duizendtal']).toContain(
        problem.positionName,
      );
    }
  });
});

// ============================================
// LOVING HEARTS TESTS
// ============================================

describe('Loving Hearts (Verliefde harten)', () => {
  it('should generate 50 valid loving hearts problems - all sum to 10', () => {
    const settings = {
      enabledOperations: { lovingHearts: true },
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      expect(problem.type).toBe('lovingHearts');

      // firstNumber + answer should always equal 10
      expect(problem.firstNumber + problem.answer).toBe(10);

      // Both should be between 1 and 9
      expect(problem.firstNumber).toBeGreaterThanOrEqual(1);
      expect(problem.firstNumber).toBeLessThanOrEqual(9);
      expect(problem.answer).toBeGreaterThanOrEqual(1);
      expect(problem.answer).toBeLessThanOrEqual(9);
    }
  });

  it('should have question format "X + ? = 10"', () => {
    const settings = {
      enabledOperations: { lovingHearts: true },
    };

    for (let i = 0; i < 20; i++) {
      const problem = generateMathProblem(settings);
      expect(problem.question).toMatch(/^\d+ \+ \? = 10$/);
    }
  });
});

// ============================================
// MONEY TESTS - Count Money
// ============================================

describe('Money - Count Money', () => {
  it('should generate valid money amounts within maxAmount', () => {
    const settings = {
      enabledOperations: { money: true },
      moneyMaxAmount: 10000, // €100
      moneyIncludeCents: true,
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);

      if (problem.moneyType === 'countMoney') {
        expect(problem.type).toBe('countMoney');
        expect(problem.answer).toBeLessThanOrEqual(10000);
        expect(problem.answer).toBeGreaterThan(0);

        // Sum of money array should equal answer
        const total = problem.money.reduce((sum, value) => sum + value, 0);
        expect(total).toBe(problem.answer);

        // All denominations should be valid
        const validDenominations = [
          5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000,
        ];
        problem.money.forEach((value) => {
          expect(validDenominations).toContain(value);
        });
      }
    }
  });

  it('should only include valid currency for the level (no large bills for small amounts)', () => {
    const settings = {
      enabledOperations: { money: true },
      moneyMaxAmount: 2000, // €20
      moneyIncludeCents: false,
    };

    for (let i = 0; i < 30; i++) {
      const problem = generateMathProblem(settings);

      if (problem.moneyType === 'countMoney') {
        problem.money.forEach((value) => {
          // Should not have €50 bills or larger with €20 max
          expect(value).toBeLessThanOrEqual(2000);
        });
      }
    }
  });

  it('should exclude cents when moneyIncludeCents is false', () => {
    const settings = {
      enabledOperations: { money: true },
      moneyMaxAmount: 10000,
      moneyIncludeCents: false,
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);

      if (problem.moneyType === 'countMoney') {
        // Answer should be whole euros (divisible by 100)
        expect(problem.answer % 100).toBe(0);

        // No cents in money array
        problem.money.forEach((value) => {
          expect(value).toBeGreaterThanOrEqual(100);
        });
      }
    }
  });

  it('should include cents when moneyIncludeCents is true', () => {
    const settings = {
      enabledOperations: { money: true },
      moneyMaxAmount: 5000,
      moneyIncludeCents: true,
    };

    let foundCents = false;
    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);

      if (problem.moneyType === 'countMoney') {
        // Check if any cents were generated
        if (problem.money.some((v) => v < 100)) {
          foundCents = true;
        }
      }
    }
    // With 50 iterations, we should find at least one problem with cents
    expect(foundCents).toBe(true);
  });
});

// ============================================
// MONEY TESTS - Make Amount
// ============================================

describe('Money - Make Amount', () => {
  it('should generate valid makeAmount problems with correct combinations', () => {
    const settings = {
      enabledOperations: { money: true },
      moneyMaxAmount: 10000,
      moneyIncludeCents: false,
    };

    for (let i = 0; i < 30; i++) {
      const problem = generateMathProblem(settings);

      if (problem.moneyType === 'makeAmount') {
        expect(problem.type).toBe('makeAmount');
        expect(problem.amount).toBeGreaterThan(0);
        expect(problem.amount).toBeLessThanOrEqual(10000);

        // Verify the correct combination sums to the amount
        const total = problem.correctCombination.reduce((sum, v) => sum + v, 0);
        expect(total).toBe(problem.amount);

        // All values in combination should be valid currency
        problem.correctCombination.forEach((value) => {
          expect(problem.currency).toContain(value);
        });
      }
    }
  });
});

// ============================================
// MONEY TESTS - Smart Pay
// ============================================

describe('Money - Smart Pay', () => {
  it('should generate valid smartPay problems with sufficient wallet', () => {
    const settings = {
      enabledOperations: { money: true },
      moneyMaxAmount: 10000,
      moneyIncludeCents: false,
    };

    for (let i = 0; i < 30; i++) {
      const problem = generateMathProblem(settings);

      if (problem.moneyType === 'smartPay') {
        expect(problem.type).toBe('smartPay');

        // Wallet total should be >= amount
        const walletTotal = problem.wallet.reduce((sum, v) => sum + v, 0);
        expect(walletTotal).toBeGreaterThanOrEqual(problem.amount);

        // Optimal combination should sum to exact amount
        if (
          problem.optimalCombination &&
          problem.optimalCombination.length > 0
        ) {
          const optimalTotal = problem.optimalCombination.reduce(
            (sum, v) => sum + v,
            0,
          );
          expect(optimalTotal).toBe(problem.amount);

          // All values in optimal should be in wallet
          problem.optimalCombination.forEach((value) => {
            expect(problem.wallet).toContain(value);
          });
        }
      }
    }
  });

  it('should ALWAYS have a solvable optimalCombination that exactly matches the amount', () => {
    // This test catches the bug where wallet didn't contain a valid combination
    // Example: amount €14, wallet [€20, €10, €5, €2, €1] - impossible to make €14 exactly
    const settings = {
      enabledOperations: { money: true },
      moneyMaxAmount: 5000,
      moneyIncludeCents: false,
    };

    for (let i = 0; i < 100; i++) {
      const problem = generateMathProblem(settings);

      if (problem.moneyType === 'smartPay') {
        // optimalCombination MUST exist and be non-empty
        expect(problem.optimalCombination).toBeDefined();
        expect(problem.optimalCombination.length).toBeGreaterThan(0);

        // The combination MUST sum to exactly the amount
        const optimalTotal = problem.optimalCombination.reduce(
          (sum, v) => sum + v,
          0,
        );
        expect(optimalTotal).toBe(problem.amount);

        // Every item in optimalCombination must actually be in the wallet
        // (accounting for duplicates - each used item must be available)
        const walletCopy = [...problem.wallet];
        for (const value of problem.optimalCombination) {
          const index = walletCopy.indexOf(value);
          expect(index).toBeGreaterThanOrEqual(0); // Item must exist in wallet
          walletCopy.splice(index, 1); // Remove it so duplicates are properly counted
        }
      }
    }
  });

  it('should handle tricky amounts like €14 that caused the original bug', () => {
    // The original bug: €14 with wallet [€20, €10, €5, €2, €1] was unsolvable
    // because greedy would take €10, leaving €4, but €5 is too big and only 1x €2, 1x €1
    const settings = {
      enabledOperations: { money: true },
      moneyMaxAmount: 2000, // Keep amounts small to hit edge cases more often
      moneyIncludeCents: false,
    };

    // Run many iterations to catch probabilistic bugs
    for (let i = 0; i < 200; i++) {
      const problem = generateMathProblem(settings);

      if (problem.moneyType === 'smartPay') {
        // Verify the solution actually works
        const optimalSum = problem.optimalCombination.reduce(
          (s, v) => s + v,
          0,
        );
        expect(optimalSum).toBe(problem.amount);

        // Verify all items are actually in the wallet
        const walletCopy = [...problem.wallet];
        let allItemsFound = true;
        for (const value of problem.optimalCombination) {
          const idx = walletCopy.indexOf(value);
          if (idx === -1) {
            allItemsFound = false;
            break;
          }
          walletCopy.splice(idx, 1);
        }
        expect(allItemsFound).toBe(true);
      }
    }
  });
});

// ============================================
// MONEY TESTS - Change
// ============================================

describe('Money - Change (Wisselgeld)', () => {
  it('should generate valid change problems with correct math', () => {
    const settings = {
      enabledOperations: { money: true },
      moneyMaxAmount: 10000,
      moneyIncludeCents: true,
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);

      if (problem.moneyType === 'change') {
        expect(problem.type).toBe('change');

        // paid should be greater than price
        expect(problem.paid).toBeGreaterThan(problem.price);

        // change = paid - price
        expect(problem.change).toBe(problem.paid - problem.price);

        // change should be >= 0
        expect(problem.change).toBeGreaterThanOrEqual(0);

        // All amounts should be positive
        expect(problem.price).toBeGreaterThan(0);
        expect(problem.paid).toBeGreaterThan(0);
      }
    }
  });

  it('should have valid formatted money strings', () => {
    const settings = {
      enabledOperations: { money: true },
      moneyMaxAmount: 10000,
      moneyIncludeCents: true,
    };

    for (let i = 0; i < 30; i++) {
      const problem = generateMathProblem(settings);

      if (problem.moneyType === 'change') {
        // Should have formatted strings
        expect(problem.priceFormatted).toMatch(/^€\d+/);
        expect(problem.paidFormatted).toMatch(/^€\d+/);
        expect(problem.changeFormatted).toMatch(/^€\d+/);
      }
    }
  });
});

// ============================================
// HELPER FUNCTION TESTS
// ============================================

describe('formatMoney helper', () => {
  it('should format whole euros correctly', () => {
    expect(formatMoney(500)).toBe('€5');
    expect(formatMoney(1000)).toBe('€10');
    expect(formatMoney(10000)).toBe('€100');
  });

  it('should format euros with cents correctly', () => {
    expect(formatMoney(505)).toBe('€5,05');
    expect(formatMoney(1050)).toBe('€10,50');
    expect(formatMoney(1234)).toBe('€12,34');
  });

  it('should pad single digit cents', () => {
    expect(formatMoney(105)).toBe('€1,05');
    expect(formatMoney(2001)).toBe('€20,01');
  });
});

describe('findOptimalCombination helper', () => {
  it('should find optimal combination for simple amounts', () => {
    const currency = [100, 200, 500];
    const result = findOptimalCombination(500, currency);
    expect(result).toEqual([500]);
  });

  it('should find optimal combination using multiple denominations', () => {
    const currency = [100, 200, 500];
    const result = findOptimalCombination(700, currency);
    expect(result).toEqual([500, 200]);
  });

  it('should return null for impossible combinations', () => {
    const currency = [200, 500];
    const result = findOptimalCombination(150, currency);
    expect(result).toBeNull();
  });

  it('should handle cents correctly', () => {
    const currency = [5, 10, 20, 50, 100];
    const result = findOptimalCombination(75, currency);
    expect(result?.reduce((sum, v) => sum + v, 0)).toBe(75);
  });
});

describe('generateWrongAnswers helper', () => {
  it('should generate 3 unique wrong answers', () => {
    const correct = 42;
    const wrong = generateWrongAnswers(correct, 3);

    expect(wrong).toHaveLength(3);
    expect(wrong).not.toContain(correct);
    expect(new Set(wrong).size).toBe(3); // All unique
  });

  it('should generate only positive numbers', () => {
    const correct = 5;
    const wrong = generateWrongAnswers(correct, 3);

    wrong.forEach((answer) => {
      expect(answer).toBeGreaterThan(0);
    });
  });

  it('should scale offset based on answer size', () => {
    const smallCorrect = 10;
    const largeCorrect = 1000;

    const smallWrong = generateWrongAnswers(smallCorrect, 3);
    const largeWrong = generateWrongAnswers(largeCorrect, 3);

    // For large numbers, wrong answers should be further away
    const smallMaxDiff = Math.max(
      ...smallWrong.map((w) => Math.abs(w - smallCorrect)),
    );
    const largeMaxDiff = Math.max(
      ...largeWrong.map((w) => Math.abs(w - largeCorrect)),
    );

    expect(largeMaxDiff).toBeGreaterThan(smallMaxDiff);
  });
});

describe('getCurrencyForLevel helper', () => {
  it('should include cents when moneyIncludeCents is true', () => {
    const currency = getCurrencyForLevel(5000, true);
    expect(currency.some((v) => v < 100)).toBe(true);
  });

  it('should exclude cents when moneyIncludeCents is false', () => {
    const currency = getCurrencyForLevel(5000, false);
    expect(currency.every((v) => v >= 100)).toBe(true);
  });

  it('should include larger bills for higher amounts', () => {
    const low = getCurrencyForLevel(2000, false);
    const high = getCurrencyForLevel(100000, false);

    expect(high.length).toBeGreaterThan(low.length);
    expect(high).toContain(50000); // €500 bill
    expect(low).not.toContain(50000);
  });
});

describe('generateValidAmount helper', () => {
  it('should generate amounts within range', () => {
    for (let i = 0; i < 50; i++) {
      const amount = generateValidAmount(10000, false, 100);
      expect(amount).toBeGreaterThanOrEqual(100);
      expect(amount).toBeLessThanOrEqual(10000);
    }
  });

  it('should generate whole euros when includeCents is false', () => {
    for (let i = 0; i < 30; i++) {
      const amount = generateValidAmount(10000, false, 100);
      expect(amount % 100).toBe(0);
    }
  });

  it('should generate amounts in 5 cent increments when includeCents is true', () => {
    for (let i = 0; i < 30; i++) {
      const amount = generateValidAmount(5000, true, 50);
      expect(amount % 5).toBe(0);
    }
  });
});

// ============================================
// MIXED OPERATIONS TESTS
// ============================================

describe('Mixed Operations', () => {
  it('should randomly select from enabled operations', () => {
    const settings = {
      enabledOperations: {
        add: true,
        sub: true,
        mul: true,
      },
      maxValue: 100,
    };

    const types = new Set();
    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      types.add(problem.type);
    }

    // Should have generated multiple types
    expect(types.size).toBeGreaterThan(1);
    expect(
      Array.from(types).every((t) =>
        ['addition', 'subtraction', 'multiplication'].includes(t),
      ),
    ).toBe(true);
  });

  it('should only generate enabled operation types', () => {
    const settings = {
      enabledOperations: {
        add: false,
        sub: false,
        mul: true,
        placeValue: false,
        lovingHearts: false,
        money: false,
      },
      mulTables: 'easy',
    };

    for (let i = 0; i < 30; i++) {
      const problem = generateMathProblem(settings);
      expect(problem.type).toBe('multiplication');
    }
  });

  it('should generate correct problem types when mixing standard ops with special ops', () => {
    // This test ensures that when placeValue is enabled alongside add,
    // the problem generator correctly returns either type
    const settings = {
      enabledOperations: {
        add: true,
        sub: false,
        mul: false,
        placeValue: true,
        lovingHearts: false,
        money: false,
      },
      maxValue: 100,
      placeValueLevel: 'tens',
    };

    const types = new Set();
    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      types.add(problem.type);

      // Each problem type should have the expected format
      if (problem.type === 'addition') {
        // Standard addition should have question like "5 + 3"
        expect(problem.question).toMatch(/^\d+ \+ \d+$/);
        expect(typeof problem.answer).toBe('number');
      } else if (problem.type === 'placeValue') {
        // PlaceValue should have number, positionName, allPlaceValues
        expect(typeof problem.number).toBe('number');
        expect(problem.positionName).toBeDefined();
        expect(Array.isArray(problem.allPlaceValues)).toBe(true);
      }
    }

    // Both types should appear when both are enabled
    expect(types.has('addition')).toBe(true);
    expect(types.has('placeValue')).toBe(true);
  });

  it('should handle placeValue-only without crashing', () => {
    const settings = {
      enabledOperations: {
        add: false,
        sub: false,
        mul: false,
        placeValue: true,
        lovingHearts: false,
        money: false,
      },
      placeValueLevel: 'hundreds',
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      expect(problem.type).toBe('placeValue');
      expect(typeof problem.number).toBe('number');
      expect(problem.positionName).toBeDefined();
    }
  });

  it('should handle lovingHearts-only without crashing', () => {
    const settings = {
      enabledOperations: {
        add: false,
        sub: false,
        mul: false,
        placeValue: false,
        lovingHearts: true,
        money: false,
      },
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      expect(problem.type).toBe('lovingHearts');
      expect(problem.firstNumber + problem.answer).toBe(10);
    }
  });

  it('should handle money-only without crashing', () => {
    const settings = {
      enabledOperations: {
        add: false,
        sub: false,
        mul: false,
        placeValue: false,
        lovingHearts: false,
        money: true,
      },
      moneyMaxAmount: 5000,
      moneyIncludeCents: true,
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      expect(['makeAmount', 'countMoney', 'smartPay', 'change']).toContain(
        problem.moneyType,
      );
    }
  });
});

// ============================================
// EDGE CASE TESTS - Potential Crash Scenarios
// ============================================

describe('Edge Cases - Potential Crash Scenarios', () => {
  it('should handle very small money amounts (€1 max)', () => {
    const settings = {
      enabledOperations: { money: true },
      moneyMaxAmount: 100, // €1 max
      moneyIncludeCents: false,
    };

    for (let i = 0; i < 30; i++) {
      const problem = generateMathProblem(settings);
      expect(problem).toBeDefined();
      // Should not crash, amount should be within range
      if (problem.amount) {
        expect(problem.amount).toBeLessThanOrEqual(100);
      }
    }
  });

  it('should handle money with cents at minimum amount', () => {
    const settings = {
      enabledOperations: { money: true },
      moneyMaxAmount: 200, // €2 max
      moneyIncludeCents: true,
    };

    for (let i = 0; i < 30; i++) {
      const problem = generateMathProblem(settings);
      expect(problem).toBeDefined();
    }
  });

  it('should handle subtraction with very small maxValue (potential negative)', () => {
    const settings = {
      enabledOperations: { sub: true },
      maxValue: 10,
      addSubMode: 'beyond',
      beyondDigits: 'units',
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);
      // Answer should NEVER be negative
      expect(problem.answer).toBeGreaterThanOrEqual(0);
    }
  });

  it('should handle generateWrongAnswers with answer = 1 (edge case)', () => {
    const wrong = generateWrongAnswers(1, 3);

    expect(wrong).toHaveLength(3);
    expect(wrong).not.toContain(1); // Should not contain correct answer
    wrong.forEach((w) => {
      expect(w).toBeGreaterThan(0); // All should be positive
    });
  });

  it('should handle generateWrongAnswers with answer = 0 (edge case)', () => {
    const wrong = generateWrongAnswers(0, 3);

    expect(wrong).toHaveLength(3);
    expect(wrong).not.toContain(0);
    wrong.forEach((w) => {
      expect(w).toBeGreaterThan(0);
    });
  });

  it('should handle generateWrongAnswers with very large answer', () => {
    const wrong = generateWrongAnswers(10000, 3);

    expect(wrong).toHaveLength(3);
    expect(wrong).not.toContain(10000);
    // Wrong answers should be reasonably close to correct answer
    wrong.forEach((w) => {
      expect(Math.abs(w - 10000)).toBeLessThan(5000);
    });
  });

  it('should handle placeValue with numbers containing zeros (e.g., 102, 1005)', () => {
    const settings = {
      enabledOperations: { placeValue: true },
      placeValueLevel: 'hundreds',
    };

    // Run many times to catch numbers with zeros
    for (let i = 0; i < 100; i++) {
      const problem = generateMathProblem(settings);

      // Verify the place values sum to the original number
      const sum = problem.allPlaceValues.reduce((a, b) => a + b, 0);
      expect(sum).toBe(problem.number);

      // Answer should be one of the place values
      expect(problem.allPlaceValues).toContain(problem.answer);
    }
  });

  it('should handle placeValue where a digit is 0 (tiental = 0)', () => {
    // Manually test specific case: number like 105 where tiental = 0
    const settings = {
      enabledOperations: { placeValue: true },
      placeValueLevel: 'hundreds',
    };

    let foundZeroPlaceValue = false;
    for (let i = 0; i < 200; i++) {
      const problem = generateMathProblem(settings);
      if (problem.allPlaceValues.includes(0)) {
        foundZeroPlaceValue = true;
        // Even when a place value is 0, the sum should still equal the number
        const sum = problem.allPlaceValues.reduce((a, b) => a + b, 0);
        expect(sum).toBe(problem.number);
      }
    }
    // With 200 iterations, we should have found at least one number with a 0 digit
    expect(foundZeroPlaceValue).toBe(true);
  });

  it('should handle change game where price is close to max payment options', () => {
    const settings = {
      enabledOperations: { money: true },
      moneyMaxAmount: 5000, // €50 max
      moneyIncludeCents: false,
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);

      if (problem.moneyType === 'change') {
        // paid should always be > price
        expect(problem.paid).toBeGreaterThan(problem.price);
        // change should be non-negative
        expect(problem.change).toBeGreaterThanOrEqual(0);
        // change calculation should be correct
        expect(problem.paid - problem.price).toBe(problem.change);
      }
    }
  });

  it('should handle smartPay where exact amount might be tricky', () => {
    const settings = {
      enabledOperations: { money: true },
      moneyMaxAmount: 2000,
      moneyIncludeCents: true,
    };

    for (let i = 0; i < 50; i++) {
      const problem = generateMathProblem(settings);

      if (problem.moneyType === 'smartPay') {
        // Wallet total should be >= amount
        const walletTotal = problem.wallet.reduce((sum, v) => sum + v, 0);
        expect(walletTotal).toBeGreaterThanOrEqual(problem.amount);

        // If optimalCombination exists, it should sum to exact amount
        if (
          problem.optimalCombination &&
          problem.optimalCombination.length > 0
        ) {
          const optimalSum = problem.optimalCombination.reduce(
            (sum, v) => sum + v,
            0,
          );
          expect(optimalSum).toBe(problem.amount);
        }
      }
    }
  });

  it('should never generate infinite loops with any valid settings combination', () => {
    // Test various edge case combinations
    const edgeCases = [
      { enabledOperations: { add: true }, maxValue: 5, addSubMode: 'within' },
      { enabledOperations: { sub: true }, maxValue: 15, addSubMode: 'within' },
      { enabledOperations: { mul: true }, mulTables: 'hard' }, // Only tables 11, 12
      { enabledOperations: { add: true, placeValue: true }, maxValue: 20 },
      {
        enabledOperations: { money: true },
        moneyMaxAmount: 500,
        moneyIncludeCents: true,
      },
      { enabledOperations: { lovingHearts: true } }, // Only loving hearts
    ];

    edgeCases.forEach((settings, index) => {
      // Each case should complete within reasonable time (no infinite loop)
      const startTime = Date.now();
      for (let i = 0; i < 20; i++) {
        const problem = generateMathProblem(settings);
        expect(problem).toBeDefined();
      }
      const duration = Date.now() - startTime;
      // Should complete 20 generations in under 1 second
      expect(duration).toBeLessThan(1000);
    });
  });

  it('should handle all operations enabled simultaneously', () => {
    const settings = {
      enabledOperations: {
        add: true,
        sub: true,
        mul: true,
        placeValue: true,
        lovingHearts: true,
        money: true,
      },
      maxValue: 100,
      mulTables: 'all',
      placeValueLevel: 'hundreds',
      moneyMaxAmount: 5000,
      moneyIncludeCents: true,
    };

    const types = new Set();
    for (let i = 0; i < 100; i++) {
      const problem = generateMathProblem(settings);
      expect(problem).toBeDefined();
      types.add(problem.type);
    }

    // Should generate variety of types
    expect(types.size).toBeGreaterThan(3);
  });
});

// ============================================
// UNIQUE MATH PROBLEMS TESTS
// ============================================

describe('generateUniqueMathProblems', () => {
  it('should generate the requested number of problems', () => {
    const settings = {
      enabledOperations: { add: true, sub: true, mul: true },
      maxValue: 100,
      mulTables: 'all',
    };

    const problems = generateUniqueMathProblems(settings, 4);
    expect(problems).toHaveLength(4);
  });

  it('should generate problems with unique question strings', () => {
    const settings = {
      enabledOperations: { add: true, sub: true, mul: true },
      maxValue: 100,
      mulTables: 'all',
    };

    // Run 50 times to catch non-deterministic failures
    for (let run = 0; run < 50; run++) {
      const problems = generateUniqueMathProblems(settings, 4);
      const questions = problems.map((p) => p.question);
      const uniqueQuestions = new Set(questions);
      expect(uniqueQuestions.size).toBe(4);
    }
  });

  it('should generate unique problems even with a single operation type', () => {
    const settings = {
      enabledOperations: { add: true },
      maxValue: 100,
      addSubMode: 'beyond',
      beyondDigits: 'units',
    };

    for (let run = 0; run < 50; run++) {
      const problems = generateUniqueMathProblems(settings, 4);
      const questions = problems.map((p) => p.question);
      const uniqueQuestions = new Set(questions);
      expect(uniqueQuestions.size).toBe(4);
    }
  });

  it('should generate unique multiplication problems', () => {
    const settings = {
      enabledOperations: { mul: true },
      mulTables: 'easy',
    };

    for (let run = 0; run < 50; run++) {
      const problems = generateUniqueMathProblems(settings, 4);
      const questions = problems.map((p) => p.question);
      const uniqueQuestions = new Set(questions);
      expect(uniqueQuestions.size).toBe(4);
    }
  });

  it('should handle small ranges where uniqueness is harder', () => {
    const settings = {
      enabledOperations: { add: true },
      maxValue: 20,
      addSubMode: 'within',
    };

    const problems = generateUniqueMathProblems(settings, 4);
    expect(problems).toHaveLength(4);
    // With very small ranges there's still enough variance for 4 unique problems
    const questions = problems.map((p) => p.question);
    const uniqueQuestions = new Set(questions);
    expect(uniqueQuestions.size).toBe(4);
  });

  it('should still return correct number even if unable to find all unique', () => {
    // This tests the fallback — lovingHearts only has 9 possible questions (1+?=10 through 9+?=10)
    const settings = {
      enabledOperations: { lovingHearts: true },
    };

    const problems = generateUniqueMathProblems(settings, 4);
    expect(problems).toHaveLength(4);
  });
});

// ============================================
// CLOCK PROBLEM GENERATION TESTS
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

  it('should handle non-standard minutes with "X over/voor" pattern', () => {
    // e.g., 03:07 → "7 over drie", 03:52 → "8 voor vier"
    const result7 = timeToWords(3, 7);
    expect(result7).toBe('7 over drie');

    const result52 = timeToWords(3, 52);
    expect(result52).toBe('8 voor vier');
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
