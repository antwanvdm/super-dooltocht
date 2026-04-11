// Meetkunde (Geometry) data & problem generation for educational minigames.
// Topics: shapes, symmetry, perimeter/area, unit conversion.

// ── Shape definitions ────────────────────────────────────────────────
// level: 'easy' = basic 2D shapes, 'medium' = extended 2D + 3D shapes
export const SHAPES_2D_EASY = [
  { name: 'driehoek', sides: 3, svg: 'driehoek', description: '3 zijden' },
  {
    name: 'vierkant',
    sides: 4,
    svg: 'vierkant',
    description: '4 gelijke zijden, 4 rechte hoeken',
  },
  {
    name: 'rechthoek',
    sides: 4,
    svg: 'rechthoek',
    description: '4 zijden, tegenoverliggende zijden even lang',
  },
  { name: 'cirkel', sides: 0, svg: 'cirkel', description: 'Rond, geen hoeken' },
];

export const SHAPES_2D_MEDIUM = [
  ...SHAPES_2D_EASY,
  {
    name: 'ruit',
    sides: 4,
    svg: 'ruit',
    description: '4 gelijke zijden, geen rechte hoeken',
  },
  {
    name: 'parallellogram',
    sides: 4,
    svg: 'parallellogram',
    description: 'Overstaande zijden evenwijdig',
  },
  {
    name: 'trapezium',
    sides: 4,
    svg: 'trapezium',
    description: 'Minstens 1 paar evenwijdige zijden',
  },
  { name: 'vijfhoek', sides: 5, svg: 'vijfhoek', description: '5 zijden' },
  { name: 'zeshoek', sides: 6, svg: 'zeshoek', description: '6 zijden' },
  { name: 'achthoek', sides: 8, svg: 'achthoek', description: '8 zijden' },
  {
    name: 'ovaal',
    sides: 0,
    svg: 'ovaal',
    description: 'Langwerpig rond, geen hoeken',
  },
];

export const SHAPES_3D = [
  { name: 'kubus', svg: 'kubus', description: 'Zoals een dobbelsteen' },
  { name: 'balk', svg: 'balk', description: 'Rechthoekige doos' },
  { name: 'bol', svg: 'bol', description: 'Zoals een bal' },
  { name: 'cilinder', svg: 'cilinder', description: 'Zoals een blikje' },
  { name: 'kegel', svg: 'kegel', description: 'Zoals een ijsje' },
];

// Legacy compat: flat list used by symmetry + memory
export const SHAPES = [
  ...SHAPES_2D_MEDIUM.map((s) => ({ ...s, emoji: s.svg })),
  {
    name: 'ster',
    sides: 10,
    emoji: 'ster',
    svg: 'ster',
    angles: null,
    regular: 'ster',
  },
];

// Properties for quiz questions about shapes
export const SHAPE_PROPERTIES = [
  {
    question: (s) => `Hoeveel zijden heeft een ${s.name}?`,
    answer: (s) => s.sides,
    type: 'sides',
  },
  {
    question: (s) => `Welke vorm heeft ${s.sides} zijden?`,
    answer: (s) => s.name,
    type: 'name',
  },
];

// ── Symmetry data ────────────────────────────────────────────────────
// Easy: shapes children in groep 3-4 recognize. Only "Is dit symmetrisch?" questions.
export const SYMMETRY_SHAPES_EASY = [
  { name: 'vierkant', svg: 'vierkant', lines: 4, hasSymmetry: true },
  { name: 'rechthoek', svg: 'rechthoek', lines: 2, hasSymmetry: true },
  { name: 'cirkel', svg: 'cirkel', lines: Infinity, hasSymmetry: true },
  { name: 'driehoek', svg: 'driehoek', lines: 3, hasSymmetry: true },
  { name: 'ster', svg: 'ster', lines: 5, hasSymmetry: true },
  { name: 'trapezium', svg: 'trapezium', lines: 0, hasSymmetry: false },
];

// Medium: more shapes, also "Hoeveel symmetrielijnen?" questions (lines ≤ 4).
export const SYMMETRY_SHAPES_MEDIUM = [
  ...SYMMETRY_SHAPES_EASY,
  { name: 'ruit', svg: 'ruit', lines: 2, hasSymmetry: true },
  { name: 'ovaal', svg: 'ovaal', lines: 2, hasSymmetry: true },
  { name: 'vijfhoek', svg: 'vijfhoek', lines: 5, hasSymmetry: true },
  { name: 'zeshoek', svg: 'zeshoek', lines: 6, hasSymmetry: true },
  {
    name: 'parallellogram',
    svg: 'parallellogram',
    lines: 0,
    hasSymmetry: false,
  },
];

// Legacy compat
export const SYMMETRY_SHAPES = SYMMETRY_SHAPES_MEDIUM;

// ── Unit conversion tables ───────────────────────────────────────────
export const UNIT_CONVERSIONS = {
  length: {
    label: 'Lengte',
    units: ['mm', 'cm', 'dm', 'm', 'km'],
    // Factor relative to base unit (m)
    factors: { mm: 0.001, cm: 0.01, dm: 0.1, m: 1, km: 1000 },
  },
  weight: {
    label: 'Gewicht',
    units: ['g', 'kg'],
    factors: { g: 0.001, kg: 1 },
  },
  volume: {
    label: 'Inhoud',
    units: ['ml', 'cl', 'dl', 'L'],
    factors: { ml: 0.001, cl: 0.01, dl: 0.1, L: 1 },
  },
};

// Easy conversion pairs (child-friendly numbers) per difficulty level
const EASY_CONVERSIONS = [
  // Length
  { value: 100, fromUnit: 'cm', toUnit: 'm', answer: 1, category: 'length' },
  { value: 1, fromUnit: 'm', toUnit: 'cm', answer: 100, category: 'length' },
  { value: 200, fromUnit: 'cm', toUnit: 'm', answer: 2, category: 'length' },
  { value: 50, fromUnit: 'cm', toUnit: 'm', answer: 0.5, category: 'length' },
  { value: 1, fromUnit: 'km', toUnit: 'm', answer: 1000, category: 'length' },
  { value: 2, fromUnit: 'km', toUnit: 'm', answer: 2000, category: 'length' },
  { value: 1000, fromUnit: 'm', toUnit: 'km', answer: 1, category: 'length' },
  { value: 500, fromUnit: 'm', toUnit: 'km', answer: 0.5, category: 'length' },
  { value: 10, fromUnit: 'mm', toUnit: 'cm', answer: 1, category: 'length' },
  { value: 30, fromUnit: 'mm', toUnit: 'cm', answer: 3, category: 'length' },
  { value: 10, fromUnit: 'cm', toUnit: 'dm', answer: 1, category: 'length' },
  { value: 10, fromUnit: 'dm', toUnit: 'm', answer: 1, category: 'length' },
  // Weight
  { value: 1000, fromUnit: 'g', toUnit: 'kg', answer: 1, category: 'weight' },
  { value: 500, fromUnit: 'g', toUnit: 'kg', answer: 0.5, category: 'weight' },
  { value: 2000, fromUnit: 'g', toUnit: 'kg', answer: 2, category: 'weight' },
  { value: 1, fromUnit: 'kg', toUnit: 'g', answer: 1000, category: 'weight' },
  { value: 2, fromUnit: 'kg', toUnit: 'g', answer: 2000, category: 'weight' },
  { value: 3, fromUnit: 'kg', toUnit: 'g', answer: 3000, category: 'weight' },
  { value: 250, fromUnit: 'g', toUnit: 'kg', answer: 0.25, category: 'weight' },
  // Volume
  { value: 1000, fromUnit: 'ml', toUnit: 'L', answer: 1, category: 'volume' },
  { value: 500, fromUnit: 'ml', toUnit: 'L', answer: 0.5, category: 'volume' },
  { value: 1, fromUnit: 'L', toUnit: 'ml', answer: 1000, category: 'volume' },
  { value: 2, fromUnit: 'L', toUnit: 'ml', answer: 2000, category: 'volume' },
  { value: 250, fromUnit: 'ml', toUnit: 'L', answer: 0.25, category: 'volume' },
  { value: 10, fromUnit: 'dl', toUnit: 'L', answer: 1, category: 'volume' },
  { value: 5, fromUnit: 'dl', toUnit: 'L', answer: 0.5, category: 'volume' },
  { value: 100, fromUnit: 'cl', toUnit: 'L', answer: 1, category: 'volume' },
];

const MEDIUM_CONVERSIONS = [
  { value: 150, fromUnit: 'cm', toUnit: 'm', answer: 1.5, category: 'length' },
  { value: 3.5, fromUnit: 'km', toUnit: 'm', answer: 3500, category: 'length' },
  { value: 450, fromUnit: 'cm', toUnit: 'm', answer: 4.5, category: 'length' },
  { value: 2500, fromUnit: 'm', toUnit: 'km', answer: 2.5, category: 'length' },
  { value: 75, fromUnit: 'mm', toUnit: 'cm', answer: 7.5, category: 'length' },
  { value: 35, fromUnit: 'cm', toUnit: 'dm', answer: 3.5, category: 'length' },
  { value: 1500, fromUnit: 'g', toUnit: 'kg', answer: 1.5, category: 'weight' },
  { value: 750, fromUnit: 'g', toUnit: 'kg', answer: 0.75, category: 'weight' },
  { value: 2.5, fromUnit: 'kg', toUnit: 'g', answer: 2500, category: 'weight' },
  { value: 1500, fromUnit: 'ml', toUnit: 'L', answer: 1.5, category: 'volume' },
  { value: 750, fromUnit: 'ml', toUnit: 'L', answer: 0.75, category: 'volume' },
  { value: 2.5, fromUnit: 'L', toUnit: 'ml', answer: 2500, category: 'volume' },
  { value: 15, fromUnit: 'dl', toUnit: 'L', answer: 1.5, category: 'volume' },
];

// ── Perimeter & Area problems ────────────────────────────────────────
const generateRectangleProblem = (level) => {
  let width, height;
  if (level === 'easy') {
    width = Math.floor(Math.random() * 8) + 2; // 2-9
    height = Math.floor(Math.random() * 8) + 2;
  } else {
    width = Math.floor(Math.random() * 15) + 3; // 3-17
    height = Math.floor(Math.random() * 15) + 3;
  }
  const perimeter = 2 * (width + height);
  const area = width * height;
  const askPerimeter = Math.random() < 0.5;

  return {
    shape: 'rechthoek',
    width,
    height,
    question: askPerimeter
      ? `Wat is de omtrek van een rechthoek van ${width} cm breed en ${height} cm hoog?`
      : `Wat is de oppervlakte van een rechthoek van ${width} cm breed en ${height} cm hoog?`,
    answer: askPerimeter ? perimeter : area,
    unit: askPerimeter ? 'cm' : 'cm²',
    type: askPerimeter ? 'perimeter' : 'area',
  };
};

const generateSquareProblem = (level) => {
  let side;
  if (level === 'easy') {
    side = Math.floor(Math.random() * 9) + 2; // 2-10
  } else {
    side = Math.floor(Math.random() * 18) + 3; // 3-20
  }
  const perimeter = 4 * side;
  const area = side * side;
  const askPerimeter = Math.random() < 0.5;

  return {
    shape: 'vierkant',
    side,
    question: askPerimeter
      ? `Wat is de omtrek van een vierkant met zijde ${side} cm?`
      : `Wat is de oppervlakte van een vierkant met zijde ${side} cm?`,
    answer: askPerimeter ? perimeter : area,
    unit: askPerimeter ? 'cm' : 'cm²',
    type: askPerimeter ? 'perimeter' : 'area',
  };
};

const generateTriangleProblem = (level) => {
  // Only perimeter for triangles (area requires more advanced math)
  let a, b, c;
  if (level === 'easy') {
    a = Math.floor(Math.random() * 8) + 2;
    b = Math.floor(Math.random() * 8) + 2;
    c = Math.floor(Math.random() * 8) + 2;
    // Ensure valid triangle
    while (a + b <= c || a + c <= b || b + c <= a) {
      a = Math.floor(Math.random() * 8) + 2;
      b = Math.floor(Math.random() * 8) + 2;
      c = Math.floor(Math.random() * 8) + 2;
    }
  } else {
    a = Math.floor(Math.random() * 15) + 3;
    b = Math.floor(Math.random() * 15) + 3;
    c = Math.floor(Math.random() * 15) + 3;
    while (a + b <= c || a + c <= b || b + c <= a) {
      a = Math.floor(Math.random() * 15) + 3;
      b = Math.floor(Math.random() * 15) + 3;
      c = Math.floor(Math.random() * 15) + 3;
    }
  }
  const perimeter = a + b + c;

  return {
    shape: 'driehoek',
    sides: [a, b, c],
    question: `Wat is de omtrek van een driehoek met zijden ${a}, ${b} en ${c} cm?`,
    answer: perimeter,
    unit: 'cm',
    type: 'perimeter',
  };
};

// ── Public generation functions ──────────────────────────────────────

/**
 * Generate a shapes quiz question (identify shape or property).
 * @param {string} level - 'easy' or 'medium'
 * @returns {{ question: string, correctAnswer: string, wrongAnswers: string[], svg: string }}
 */
export function generateVormenQuestion(level = 'easy') {
  const pool2D = level === 'easy' ? SHAPES_2D_EASY : SHAPES_2D_MEDIUM;
  const include3D = level === 'medium';

  // Decide question type
  const roll = Math.random();
  if (include3D && roll < 0.25) {
    // 3D shape recognition: "Wat voor vorm is dit?"
    const shape = SHAPES_3D[Math.floor(Math.random() * SHAPES_3D.length)];
    const others = SHAPES_3D.filter((s) => s.name !== shape.name);
    const shuffled = others.sort(() => Math.random() - 0.5);
    return {
      question: 'Welke 3D-vorm is dit?',
      correctAnswer: shape.name,
      wrongAnswers: shuffled.slice(0, 3).map((s) => s.name),
      svg: shape.svg,
      is3D: true,
    };
  }

  // 2D shapes
  const shapesWithSides = pool2D.filter((s) => s.sides > 0);
  const useNameQuestion = Math.random() < 0.5;
  const useRecognition = level === 'medium' && Math.random() < 0.4;

  if (useRecognition) {
    // "Welke vorm is dit?" with SVG shown
    const shape = pool2D[Math.floor(Math.random() * pool2D.length)];
    const others = pool2D.filter((s) => s.name !== shape.name);
    const shuffled = others.sort(() => Math.random() - 0.5);
    return {
      question: 'Welke vorm is dit?',
      correctAnswer: shape.name,
      wrongAnswers: shuffled.slice(0, 3).map((s) => s.name),
      svg: shape.svg,
    };
  }

  if (useNameQuestion) {
    // "Hoeveel zijden heeft een ...?"
    const shape =
      shapesWithSides[Math.floor(Math.random() * shapesWithSides.length)];
    const correctAnswer = String(shape.sides);
    const wrongSet = new Set();
    let attempts = 0;
    while (wrongSet.size < 3 && attempts < 50) {
      attempts++;
      const offset = Math.floor(Math.random() * 5) + 1;
      const wrong =
        Math.random() < 0.5
          ? shape.sides + offset
          : Math.max(2, shape.sides - offset);
      if (wrong !== shape.sides) wrongSet.add(String(wrong));
    }
    return {
      question: `Hoeveel zijden heeft een ${shape.name}?`,
      correctAnswer,
      wrongAnswers: [...wrongSet].slice(0, 3),
      svg: shape.svg,
    };
  } else {
    // "Welke vorm heeft N zijden?"
    const shape =
      shapesWithSides[Math.floor(Math.random() * shapesWithSides.length)];
    const correctAnswer = shape.name;
    const others = shapesWithSides.filter((s) => s.name !== shape.name);
    const shuffled = others.sort(() => Math.random() - 0.5);
    return {
      question: `Welke vorm heeft ${shape.sides} zijden?`,
      correctAnswer,
      wrongAnswers: shuffled.slice(0, 3).map((s) => s.name),
      svg: shape.svg,
    };
  }
}

/**
 * Generate a symmetry quiz question.
 * @returns {{ question: string, correctAnswer: string, wrongAnswers: string[] }}
 */
export function generateSymmetrieQuestion(level = 'easy') {
  const pool = level === 'easy' ? SYMMETRY_SHAPES_EASY : SYMMETRY_SHAPES_MEDIUM;

  if (level === 'easy') {
    // Easy: only "Is deze vorm symmetrisch?" with visual
    const shape = pool[Math.floor(Math.random() * pool.length)];
    return {
      question: 'Is deze vorm symmetrisch?',
      shapeName: shape.name,
      svg: shape.svg,
      correctAnswer: shape.hasSymmetry ? 'Ja' : 'Nee',
      wrongAnswers: [shape.hasSymmetry ? 'Nee' : 'Ja'],
      isYesNo: true,
      lines: shape.lines,
      hasSymmetry: shape.hasSymmetry,
    };
  }

  // Medium: 50/50 yes/no or line-counting (lines ≤ 4)
  const askHasSymmetry = Math.random() < 0.5;

  if (askHasSymmetry) {
    const shape = pool[Math.floor(Math.random() * pool.length)];
    return {
      question: 'Is deze vorm symmetrisch?',
      shapeName: shape.name,
      svg: shape.svg,
      correctAnswer: shape.hasSymmetry ? 'Ja' : 'Nee',
      wrongAnswers: [shape.hasSymmetry ? 'Nee' : 'Ja'],
      isYesNo: true,
      lines: shape.lines,
      hasSymmetry: shape.hasSymmetry,
    };
  }

  // "Hoeveel symmetrielijnen?" — only shapes with 1 ≤ lines ≤ 4
  const lineShapes = pool.filter(
    (s) => s.hasSymmetry && s.lines >= 1 && s.lines <= 4,
  );
  const shape = lineShapes[Math.floor(Math.random() * lineShapes.length)];
  const correctAnswer = String(shape.lines);
  const wrongSet = new Set();
  let attempts = 0;
  while (wrongSet.size < 3 && attempts < 50) {
    attempts++;
    const wrong = Math.floor(Math.random() * 4) + 1; // 1–4
    if (wrong !== shape.lines) wrongSet.add(String(wrong));
  }
  return {
    question: 'Hoeveel symmetrielijnen heeft deze vorm?',
    shapeName: shape.name,
    svg: shape.svg,
    correctAnswer,
    wrongAnswers: [...wrongSet].slice(0, 3),
    isYesNo: false,
    lines: shape.lines,
    hasSymmetry: shape.hasSymmetry,
  };
}

/**
 * Generate a unit conversion question.
 * @param {string} level - 'easy' or 'medium'
 * @returns {{ question: string, correctAnswer: number, wrongAnswers: number[], fromUnit: string, toUnit: string }}
 */
export function generateEenhedenQuestion(level = 'easy') {
  const pool =
    level === 'easy'
      ? EASY_CONVERSIONS
      : [...EASY_CONVERSIONS, ...MEDIUM_CONVERSIONS];
  const conv = pool[Math.floor(Math.random() * pool.length)];

  const wrongSet = new Set();
  let attempts = 0;
  while (wrongSet.size < 3 && attempts < 50) {
    attempts++;
    const factor = [0.1, 0.5, 2, 5, 10, 0.25, 0.01][
      Math.floor(Math.random() * 7)
    ];
    const wrong = +(conv.answer * factor).toPrecision(4);
    if (wrong !== conv.answer && wrong > 0) wrongSet.add(wrong);
  }
  // Ensure we have 3 wrong answers
  while (wrongSet.size < 3) {
    wrongSet.add(conv.answer + wrongSet.size + 1);
  }

  return {
    question: `${conv.value} ${conv.fromUnit} = ? ${conv.toUnit}`,
    correctAnswer: conv.answer,
    wrongAnswers: [...wrongSet].slice(0, 3),
    fromUnit: conv.fromUnit,
    toUnit: conv.toUnit,
    category: conv.category,
  };
}

/**
 * Generate a unit conversion memory pair set.
 * @param {number} count - Number of pairs
 * @param {string} level - 'easy' or 'medium'
 * @returns {{ left: string, right: string }[]}
 */
export function generateEenhedenMemoryPairs(count = 4, level = 'easy') {
  const pool =
    level === 'easy'
      ? EASY_CONVERSIONS
      : [...EASY_CONVERSIONS, ...MEDIUM_CONVERSIONS];
  const shuffled = pool.sort(() => Math.random() - 0.5);
  const usedAnswers = new Set();
  const pairs = [];

  for (const conv of shuffled) {
    if (pairs.length >= count) break;
    const key = `${conv.answer}-${conv.toUnit}`;
    if (usedAnswers.has(key)) continue;
    usedAnswers.add(key);
    pairs.push({
      left: `${conv.value} ${conv.fromUnit}`,
      right: `${conv.answer} ${conv.toUnit}`,
    });
  }

  // Fallback if we didn't get enough unique pairs
  while (pairs.length < count) {
    const conv = pool[pairs.length % pool.length];
    pairs.push({
      left: `${conv.value} ${conv.fromUnit}`,
      right: `${conv.answer} ${conv.toUnit}`,
    });
  }

  return pairs;
}

/**
 * Generate an area/perimeter calculation problem.
 * @param {string} level - 'easy' or 'medium'
 * @returns {{ question: string, answer: number, unit: string, shape: string, type: string, width?: number, height?: number, side?: number, sides?: number[] }}
 */
export function generateOmtrekOppervlakteQuestion(level = 'easy') {
  const generators = [
    generateRectangleProblem,
    generateSquareProblem,
    generateTriangleProblem,
  ];
  const gen = generators[Math.floor(Math.random() * generators.length)];
  const problem = gen(level);

  // Generate wrong answers close to the correct one
  const wrongSet = new Set();
  let attempts = 0;
  while (wrongSet.size < 3 && attempts < 50) {
    attempts++;
    const offset = Math.floor(Math.random() * 10) + 1;
    const wrong =
      Math.random() < 0.5
        ? problem.answer + offset
        : Math.max(1, problem.answer - offset);
    if (wrong !== problem.answer) wrongSet.add(wrong);
  }
  while (wrongSet.size < 3) {
    wrongSet.add(problem.answer + wrongSet.size + 10);
  }

  return {
    ...problem,
    wrongAnswers: [...wrongSet].slice(0, 3),
  };
}

/**
 * Generate shapes memory pairs (shape name ↔ property).
 * @param {number} count - Number of pairs
 * @param {string} level - 'easy' or 'medium'
 * @returns {{ left: string, right: string, svg: string }[]}
 */
export function generateVormenMemoryPairs(count = 4, level = 'easy') {
  const pool2D = level === 'easy' ? SHAPES_2D_EASY : SHAPES_2D_MEDIUM;
  const include3D = level === 'medium';

  const pairs = [];
  const usedNames = new Set();

  // On medium, reserve at least 1 slot for a 3D shape
  const max2D = include3D ? Math.max(1, count - 1) : count;

  const shuffled2D = [...pool2D].sort(() => Math.random() - 0.5);
  for (const shape of shuffled2D) {
    if (pairs.length >= max2D) break;
    if (usedNames.has(shape.name)) continue;
    usedNames.add(shape.name);
    pairs.push({
      left: shape.name,
      right: shape.sides > 0 ? `${shape.sides} zijden` : shape.description,
      svg: shape.svg,
    });
  }

  // Fill remaining with 3D shapes
  if (include3D) {
    const shuffled3D = [...SHAPES_3D].sort(() => Math.random() - 0.5);
    for (const shape of shuffled3D) {
      if (pairs.length >= count) break;
      if (usedNames.has(shape.name)) continue;
      usedNames.add(shape.name);
      pairs.push({
        left: shape.name,
        right: shape.description,
        svg: shape.svg,
      });
    }
  }

  return pairs;
}
