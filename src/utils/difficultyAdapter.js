// Genereer rekensommen op basis van gekozen instellingen (operations + max)
// settings: { enabledOperations: { add: boolean, sub: boolean, mul: boolean }, maxValue: number, mulTables: string }
export const generateMathProblem = (settings) => {
  const maxValue = Math.max(5, settings?.maxValue || 20);
  const mulTables = settings?.mulTables || 'easy';
  const enabled = settings?.enabledOperations || {
    add: true,
    sub: true,
    mul: true,
  };
  const pool = [];
  if (enabled.add) pool.push('add');
  if (enabled.sub) pool.push('sub');
  if (enabled.mul) pool.push('mul');

  const type = pool.length
    ? pool[Math.floor(Math.random() * pool.length)]
    : 'add';

  switch (type) {
    case 'mul':
      return generateMultiplication(mulTables);
    case 'sub':
      return generateSubtraction(maxValue);
    default:
      return generateAddition(maxValue);
  }
};

const randBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateAddition = (max) => {
  // Kies een doelwaarde die tussen 40% en 100% van max ligt voor grotere sommen
  const target = randBetween(Math.max(6, Math.floor(max * 0.4)), max);
  const a = randBetween(1, target - 1);
  const b = target - a;
  return {
    question: `${a} + ${b}`,
    answer: target,
    type: 'addition',
  };
};

const generateSubtraction = (max) => {
  // Start met een groter minuend, zodat verschillen ook groter kunnen zijn
  const minuend = randBetween(Math.max(8, Math.floor(max * 0.5)), max);
  const subtrahend = randBetween(1, Math.max(2, Math.floor(minuend * 0.8)));
  return {
    question: `${minuend} - ${subtrahend}`,
    answer: minuend - subtrahend,
    type: 'subtraction',
  };
};

const generateMultiplication = (mulTables) => {
  // Bepaal welke tafels beschikbaar zijn op basis van de selectie
  let availableTables;
  switch (mulTables) {
    case 'easy':
      availableTables = [1, 2, 5, 10];
      break;
    case 'medium':
      availableTables = [3, 4, 6, 7, 8, 9];
      break;
    case 'hard':
      availableTables = [11, 12];
      break;
    case 'all':
    default:
      availableTables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      break;
  }

  // Kies een random tafel uit de beschikbare tafels
  const table =
    availableTables[Math.floor(Math.random() * availableTables.length)];
  // Kies een random vermenigvuldiger van 1 t/m 10
  const multiplier = randBetween(1, 10);

  return {
    question: `${table} × ${multiplier}`,
    answer: table * multiplier,
    type: 'multiplication',
  };
};

// Genereer verkeerde antwoorden die logisch lijken, geschaald naar antwoordgrootte
export const generateWrongAnswers = (correctAnswer, count = 3) => {
  const wrong = new Set();
  // Schaal de offset op basis van de grootte van het antwoord
  // Minimum scale van 3 om te voorkomen dat we vastlopen bij kleine antwoorden
  const scale = Math.max(3, Math.floor(correctAnswer * 0.15) || 3);

  let attempts = 0;
  const maxAttempts = 100;

  while (wrong.size < count && attempts < maxAttempts) {
    attempts++;
    const offset = randBetween(-scale * 2, scale * 2);
    const wrongAnswer = correctAnswer + offset;

    if (wrongAnswer !== correctAnswer && wrongAnswer > 0) {
      wrong.add(wrongAnswer);
    }
  }

  // Fallback: als we niet genoeg unieke antwoorden hebben, vul aan met simpele offsets
  let fallbackOffset = 1;
  while (wrong.size < count) {
    const fallbackWrong = correctAnswer + fallbackOffset;
    if (fallbackWrong > 0 && !wrong.has(fallbackWrong)) {
      wrong.add(fallbackWrong);
    } else {
      // Probeer negatieve offset als positieve al bestaat
      const negativeFallback = correctAnswer - fallbackOffset;
      if (negativeFallback > 0 && !wrong.has(negativeFallback)) {
        wrong.add(negativeFallback);
      }
    }
    fallbackOffset++;
  }

  return Array.from(wrong);
};
