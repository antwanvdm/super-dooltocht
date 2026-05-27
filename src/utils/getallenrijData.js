// Getallenrij & patronen (number sequences) generator
// Generates questions where one number is missing from a sequence.

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArr(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeWrongAnswers(correct, step, count = 3) {
  const s = Math.max(Math.abs(step), 1);
  const pool = [];
  for (const d of [s, -s, s * 2, -s * 2, 1, -1, s + 2, -(s + 2)]) {
    const w = correct + d;
    if (w > 0 && w !== correct && !pool.includes(w)) pool.push(w);
  }
  return shuffleArr(pool).slice(0, count);
}

/**
 * Generate a number sequence question with one missing value.
 * @param {string} level - 'easy' | 'medium' | 'hard'
 * @returns {{ sequence: (number|null)[], correctAnswer: number, wrongAnswers: number[], question: string }}
 */
export function generateGetallenrijQuestion(level = 'easy') {
  let seq, gapIndex, step;

  if (level === 'easy') {
    // Simple linear sequences: +2, +3, +4, +5, +10 — gap always in the middle
    step = pickRandom([2, 3, 4, 5, 10]);
    const ascending = Math.random() < 0.7;
    if (ascending) {
      const start = Math.floor(Math.random() * 10) + 1;
      seq = Array.from({ length: 5 }, (_, i) => start + i * step);
    } else {
      // Descending — ensure all values positive
      const start = step * 4 + Math.floor(Math.random() * 8) + 2;
      seq = Array.from({ length: 5 }, (_, i) => start - i * step);
    }
    gapIndex = 2;
  } else if (level === 'medium') {
    // Larger linear steps or doubling (×2) — gap at various positions
    const type = pickRandom(['linearLarge', 'linearLarge', 'double']);
    if (type === 'double') {
      const start = pickRandom([2, 3, 4, 5, 6]);
      seq = [start, start * 2, start * 4, start * 8, start * 16];
      step = start;
    } else {
      step = pickRandom([6, 7, 8, 9, 11, 12, 15, 20, 25]);
      const ascending = Math.random() < 0.7;
      if (ascending) {
        const start = Math.floor(Math.random() * 10) + 1;
        seq = Array.from({ length: 5 }, (_, i) => start + i * step);
      } else {
        const start = step * 4 + Math.floor(Math.random() * 12) + 2;
        seq = Array.from({ length: 5 }, (_, i) => start - i * step);
      }
    }
    gapIndex = pickRandom([1, 2, 3]);
  } else {
    // Hard: ×3, halving, or alternating patterns — gap at various positions
    const type = pickRandom(['triple', 'halving', 'alternating']);

    if (type === 'triple') {
      const start = pickRandom([2, 3, 4]);
      seq = [start, start * 3, start * 9, start * 27, start * 81];
      step = start * 3;
      gapIndex = pickRandom([1, 2, 3]);
    } else if (type === 'halving') {
      const starts = [80, 64, 96, 160, 48];
      const start = pickRandom(starts);
      const candidate = [start, start / 2, start / 4, start / 8, start / 16];
      if (candidate.every((n) => Number.isInteger(n) && n > 0)) {
        seq = candidate;
        step = start / 4;
      } else {
        // Fallback to triple
        seq = [2, 6, 18, 54, 162];
        step = 12;
      }
      gapIndex = pickRandom([1, 2, 3]);
    } else {
      // Alternating: +stepA, -stepB pattern — gap at end for clearest question
      const stepA = pickRandom([3, 4, 5]);
      const stepB = pickRandom([1, 2]);
      const start = Math.floor(Math.random() * 5) + 1;
      seq = [
        start,
        start + stepA,
        start + stepA - stepB,
        start + 2 * stepA - stepB,
        start + 2 * stepA - 2 * stepB,
      ];
      step = stepA;
      gapIndex = pickRandom([2, 3, 4]);
    }

    // Safety: ensure all values are positive integers
    if (seq.some((n) => n <= 0 || !Number.isInteger(n))) {
      step = 3;
      seq = [3, 6, 9, 12, 15];
      gapIndex = 2;
    }
  }

  const correctAnswer = seq[gapIndex];
  const display = seq.map((n, i) => (i === gapIndex ? null : n));
  const wrongAnswers = makeWrongAnswers(correctAnswer, step ?? 1);

  return {
    sequence: display,
    correctAnswer,
    wrongAnswers,
    question: 'Welk getal hoort op de plek van het vraagteken?',
    level,
  };
}
