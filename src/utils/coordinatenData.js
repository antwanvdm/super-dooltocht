// Coördinaten & Plattegrond — data & problem generation for educational minigames.
// Topics: grid coordinates, route descriptions, spatial reasoning.

// ── Grid icons — used as content in grid cells ──────────────────────
const GRID_ICONS = [
  '🌳',
  '🏠',
  '⭐',
  '🐱',
  '🎁',
  '🚗',
  '🌸',
  '🐶',
  '🍎',
  '🎈',
  '🔑',
  '🦋',
  '🐟',
  '🎵',
  '💎',
  '🍕',
  '🐻',
  '🌈',
  '🚀',
  '🎪',
  '🏰',
  '⚽',
  '🌻',
  '🎂',
];

const COLUMN_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// ── Grid generation helpers ─────────────────────────────────────────

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Generate a grid with randomly placed icons.
 * @param {number} cols - Number of columns
 * @param {number} rows - Number of rows
 * @param {number} iconCount - How many cells get an icon
 * @returns {{ grid: (string|null)[][], icons: {icon: string, col: number, row: number}[] }}
 */
function generateGrid(cols, rows, iconCount) {
  // Create empty grid
  const grid = Array.from({ length: rows }, () => Array(cols).fill(null));

  // Place icons in random unique positions
  const allPositions = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      allPositions.push({ col: c, row: r });
    }
  }
  const shuffled = shuffleArray(allPositions);
  const selectedIcons = shuffleArray(GRID_ICONS).slice(0, iconCount);
  const icons = [];

  for (let i = 0; i < iconCount && i < shuffled.length; i++) {
    const pos = shuffled[i];
    const icon = selectedIcons[i];
    grid[pos.row][pos.col] = icon;
    icons.push({ icon, col: pos.col, row: pos.row });
  }

  return { grid, icons };
}

function coordLabel(col, row) {
  return `${COLUMN_LABELS[col]}${row + 1}`;
}

// ── Quiz question generators ────────────────────────────────────────

/**
 * Generate a coordinate quiz question.
 * @param {string} level - 'easy' | 'medium' | 'hard'
 * @returns {{ question: string, correctAnswer: string, wrongAnswers: string[], grid: (string|null)[][], gridCols: number, gridRows: number, questionType: string, highlightCell?: {col: number, row: number} }}
 */
export function generateCoordinaatQuestion(level = 'easy') {
  const config = {
    easy: { cols: 3, rows: 3, icons: 4 },
    medium: { cols: 4, rows: 4, icons: 6 },
    hard: { cols: 5, rows: 5, icons: 8 },
  };
  const { cols, rows, icons: iconCount } = config[level] || config.easy;
  const { grid, icons } = generateGrid(cols, rows, iconCount);

  // Pick a question type
  const questionTypes = ['whatIsAt', 'whereIs'];
  if (level === 'medium' || level === 'hard') {
    questionTypes.push('moveFrom');
  }
  const questionType = pickRandom(questionTypes);

  const target = pickRandom(icons);
  const colLabels = COLUMN_LABELS.slice(0, cols);

  if (questionType === 'whatIsAt') {
    // "Wat staat er op B2?"
    const coord = coordLabel(target.col, target.row);
    const question = `Wat staat er op ${coord}?`;
    const correctAnswer = target.icon;

    // Wrong answers: other icons on the grid
    const otherIcons = icons
      .filter((i) => i.icon !== target.icon)
      .map((i) => i.icon);
    const wrongAnswers = shuffleArray(otherIcons).slice(0, 3);
    // Fill up with random icons if not enough on grid
    while (wrongAnswers.length < 3) {
      const extra = pickRandom(GRID_ICONS);
      if (extra !== correctAnswer && !wrongAnswers.includes(extra)) {
        wrongAnswers.push(extra);
      }
    }

    return {
      question,
      correctAnswer,
      wrongAnswers,
      grid,
      gridCols: cols,
      gridRows: rows,
      questionType,
    };
  }

  if (questionType === 'whereIs') {
    // "Waar staat de ⭐?"
    const question = `Waar staat de ${target.icon}?`;
    const correctAnswer = coordLabel(target.col, target.row);

    // Wrong answers: other valid coordinates
    const wrongAnswers = [];
    let attempts = 0;
    while (wrongAnswers.length < 3 && attempts < 50) {
      const c = Math.floor(Math.random() * cols);
      const r = Math.floor(Math.random() * rows);
      const label = coordLabel(c, r);
      if (label !== correctAnswer && !wrongAnswers.includes(label)) {
        wrongAnswers.push(label);
      }
      attempts++;
    }

    return {
      question,
      correctAnswer,
      wrongAnswers,
      grid,
      gridCols: cols,
      gridRows: rows,
      questionType,
    };
  }

  // moveFrom: "De 🐱 staat op C2. Ze loopt 2 naar rechts. Waar is ze nu?"
  const directions = [
    { label: 'naar rechts', dc: 1, dr: 0 },
    { label: 'naar links', dc: -1, dr: 0 },
    { label: 'naar boven', dc: 0, dr: -1 },
    { label: 'naar beneden', dc: 0, dr: 1 },
  ];

  // Find a valid move
  let moveQuestion = null;
  const shuffledIcons = shuffleArray(icons);
  for (const icon of shuffledIcons) {
    const shuffledDirs = shuffleArray(directions);
    for (const dir of shuffledDirs) {
      const maxSteps = level === 'hard' ? 3 : 2;
      for (let steps = 1; steps <= maxSteps; steps++) {
        const newCol = icon.col + dir.dc * steps;
        const newRow = icon.row + dir.dr * steps;
        if (newCol >= 0 && newCol < cols && newRow >= 0 && newRow < rows) {
          moveQuestion = {
            icon,
            dir,
            steps,
            newCol,
            newRow,
          };
          break;
        }
      }
      if (moveQuestion) break;
    }
    if (moveQuestion) break;
  }

  // Fallback to whereIs if no valid move found
  if (!moveQuestion) {
    return generateCoordinaatQuestion(level);
  }

  const { icon, dir, steps, newCol, newRow } = moveQuestion;
  const startCoord = coordLabel(icon.col, icon.row);
  const question = `De ${icon.icon} staat op ${startCoord}. Ze loopt ${steps} ${dir.label}. Waar is ze nu?`;
  const correctAnswer = coordLabel(newCol, newRow);

  const wrongAnswers = [];
  let att = 0;
  while (wrongAnswers.length < 3 && att < 50) {
    const c = Math.floor(Math.random() * cols);
    const r = Math.floor(Math.random() * rows);
    const label = coordLabel(c, r);
    if (label !== correctAnswer && !wrongAnswers.includes(label)) {
      wrongAnswers.push(label);
    }
    att++;
  }

  return {
    question,
    correctAnswer,
    wrongAnswers,
    grid,
    gridCols: cols,
    gridRows: rows,
    questionType: 'moveFrom',
    highlightCell: { col: icon.col, row: icon.row },
  };
}

// ── Route question generators ───────────────────────────────────────
// Route questions use a grid with buildings placed on it, so answers
// are always derivable from the visual. No compass directions (those
// belong to the Windrichtingen game under Topografie).

const ROUTE_BUILDINGS = [
  { name: 'school', icon: '🏫' },
  { name: 'winkel', icon: '🏪' },
  { name: 'park', icon: '🌳' },
  { name: 'ziekenhuis', icon: '🏥' },
  { name: 'bibliotheek', icon: '📚' },
  { name: 'station', icon: '🚉' },
  { name: 'bakker', icon: '🥐' },
  { name: 'speeltuin', icon: '🎠' },
  { name: 'sporthal', icon: '🏟️' },
  { name: 'brandweer', icon: '🚒' },
];

const DIR_LABELS = {
  right: 'naar rechts',
  left: 'naar links',
  up: 'omhoog',
  down: 'omlaag',
};

const DIR_DELTAS = {
  right: { dc: 1, dr: 0 },
  left: { dc: -1, dr: 0 },
  up: { dc: 0, dr: -1 },
  down: { dc: 0, dr: 1 },
};

/**
 * Generate a route quiz question based on a grid with buildings.
 * The grid is shown to the child so all questions are answerable.
 * @param {string} level - 'easy' | 'medium' | 'hard'
 * @returns {{ question: string, correctAnswer: string, wrongAnswers: string[], grid: (string|null)[][], gridCols: number, gridRows: number, questionType: string, highlightCells?: {col: number, row: number}[] }}
 */
export function generateRouteQuestion(level = 'easy') {
  const config = {
    easy: {
      cols: 3,
      rows: 3,
      buildingCount: 4,
      questionTypes: ['whichDirection'],
    },
    medium: {
      cols: 4,
      rows: 4,
      buildingCount: 6,
      questionTypes: ['whichDirection', 'whereEnd'],
    },
    hard: {
      cols: 5,
      rows: 5,
      buildingCount: 7,
      questionTypes: ['whichDirection', 'whereEnd', 'whatOnRoute'],
    },
  };
  const { cols, rows, buildingCount, questionTypes } =
    config[level] || config.easy;
  const questionType = pickRandom(questionTypes);

  // Place buildings on the grid
  const allPositions = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      allPositions.push({ col: c, row: r });
    }
  }
  const shuffledPos = shuffleArray(allPositions);
  const selectedBuildings = shuffleArray(ROUTE_BUILDINGS).slice(
    0,
    buildingCount,
  );
  const grid = Array.from({ length: rows }, () => Array(cols).fill(null));
  const placed = [];

  for (let i = 0; i < buildingCount && i < shuffledPos.length; i++) {
    const pos = shuffledPos[i];
    const building = selectedBuildings[i];
    grid[pos.row][pos.col] = building.icon;
    placed.push({ ...building, col: pos.col, row: pos.row });
  }

  if (questionType === 'whichDirection') {
    // Pick two buildings on the same row or column so there is only one
    // unambiguous direction (no diagonal "primary direction" guessing).
    const shuffled = shuffleArray(placed);
    let from, to;
    for (let i = 0; i < shuffled.length; i++) {
      for (let j = i + 1; j < shuffled.length; j++) {
        if (
          shuffled[i].row === shuffled[j].row ||
          shuffled[i].col === shuffled[j].col
        ) {
          from = shuffled[i];
          to = shuffled[j];
          break;
        }
      }
      if (from) break;
    }
    // Fallback: if no aligned pair exists, just pick two (shouldn't happen with 4+ buildings)
    if (!from) {
      [from, to] = shuffled.slice(0, 2);
    }

    const dc = to.col - from.col;
    const dr = to.row - from.row;

    let correctDir;
    if (dr === 0) {
      correctDir = dc > 0 ? 'right' : 'left';
    } else {
      correctDir = dr > 0 ? 'down' : 'up';
    }

    const question = `Je loopt van de ${from.icon} ${from.name} naar de ${to.icon} ${to.name}. Welke richting ga je?`;
    const correctAnswer = DIR_LABELS[correctDir];
    const wrongAnswers = Object.values(DIR_LABELS)
      .filter((d) => d !== correctAnswer)
      .slice(0, 3);

    return {
      question,
      correctAnswer,
      wrongAnswers,
      grid,
      gridCols: cols,
      gridRows: rows,
      questionType,
      highlightCells: [
        { col: from.col, row: from.row },
        { col: to.col, row: to.row },
      ],
    };
  }

  if (questionType === 'whereEnd') {
    // Start at a building, give 1-2 movement steps, ask where you end up
    const start = pickRandom(placed);
    const dirKeys = Object.keys(DIR_DELTAS);
    let endCol = start.col;
    let endRow = start.row;
    const stepDescriptions = [];
    const maxSteps = level === 'hard' ? 2 : 1;

    for (let s = 0; s < maxSteps; s++) {
      const shuffledDirs = shuffleArray(dirKeys);
      let moved = false;
      for (const dirKey of shuffledDirs) {
        const { dc, dr } = DIR_DELTAS[dirKey];
        const steps = 1 + Math.floor(Math.random() * 2);
        const newCol = endCol + dc * steps;
        const newRow = endRow + dr * steps;
        if (newCol >= 0 && newCol < cols && newRow >= 0 && newRow < rows) {
          endCol = newCol;
          endRow = newRow;
          stepDescriptions.push(`${steps} ${DIR_LABELS[dirKey]}`);
          moved = true;
          break;
        }
      }
      if (!moved) break;
    }

    if (stepDescriptions.length === 0) {
      return generateRouteQuestion(level);
    }

    const endBuilding = placed.find(
      (b) => b.col === endCol && b.row === endRow,
    );
    const endLabel = endBuilding
      ? `${endBuilding.icon} ${endBuilding.name}`
      : coordLabel(endCol, endRow);

    const question = `Je begint bij de ${start.icon} ${start.name} (${coordLabel(start.col, start.row)}). Je loopt ${stepDescriptions.join(' en dan ')}. Waar ben je nu?`;
    const correctAnswer = endBuilding ? endLabel : coordLabel(endCol, endRow);

    // Generate wrong answers
    const wrongAnswers = [];
    if (endBuilding) {
      // Wrong answers: other buildings
      for (const b of placed) {
        if (b.name !== endBuilding.name && wrongAnswers.length < 3) {
          wrongAnswers.push(`${b.icon} ${b.name}`);
        }
      }
    } else {
      // Wrong answers: other coordinates
      let att = 0;
      while (wrongAnswers.length < 3 && att < 50) {
        const c = Math.floor(Math.random() * cols);
        const r = Math.floor(Math.random() * rows);
        const label = coordLabel(c, r);
        if (label !== correctAnswer && !wrongAnswers.includes(label)) {
          wrongAnswers.push(label);
        }
        att++;
      }
    }

    return {
      question,
      correctAnswer,
      wrongAnswers: wrongAnswers.slice(0, 3),
      grid,
      gridCols: cols,
      gridRows: rows,
      questionType,
      highlightCells: [{ col: start.col, row: start.row }],
    };
  }

  // whatOnRoute: walk in a straight line between two buildings, ask what's on the route
  // Find two buildings in the same row or column with something in between
  let found = null;
  const shuffledPlaced = shuffleArray(placed);
  for (const b1 of shuffledPlaced) {
    for (const b2 of shuffledPlaced) {
      if (b1.name === b2.name) continue;
      // Same row
      if (b1.row === b2.row && Math.abs(b1.col - b2.col) >= 2) {
        const minC = Math.min(b1.col, b2.col);
        const maxC = Math.max(b1.col, b2.col);
        for (let c = minC + 1; c < maxC; c++) {
          if (grid[b1.row][c]) {
            found = {
              from: b1,
              to: b2,
              between: { icon: grid[b1.row][c], col: c, row: b1.row },
            };
            break;
          }
        }
      }
      // Same column
      if (!found && b1.col === b2.col && Math.abs(b1.row - b2.row) >= 2) {
        const minR = Math.min(b1.row, b2.row);
        const maxR = Math.max(b1.row, b2.row);
        for (let r = minR + 1; r < maxR; r++) {
          if (grid[r][b1.col]) {
            found = {
              from: b1,
              to: b2,
              between: { icon: grid[r][b1.col], col: b1.col, row: r },
            };
            break;
          }
        }
      }
      if (found) break;
    }
    if (found) break;
  }

  // Fallback to whichDirection if no route-between found
  if (!found) {
    return generateRouteQuestion(level);
  }

  const { from, to, between } = found;
  const betweenBuilding = placed.find(
    (b) => b.col === between.col && b.row === between.row,
  );
  const question = `Je loopt van de ${from.icon} ${from.name} naar de ${to.icon} ${to.name} in een rechte lijn. Langs welk gebouw kom je?`;
  const correctAnswer = `${betweenBuilding.icon} ${betweenBuilding.name}`;
  const wrongAnswers = placed
    .filter(
      (b) =>
        b.name !== betweenBuilding.name &&
        b.name !== from.name &&
        b.name !== to.name,
    )
    .slice(0, 3)
    .map((b) => `${b.icon} ${b.name}`);

  return {
    question,
    correctAnswer,
    wrongAnswers,
    grid,
    gridCols: cols,
    gridRows: rows,
    questionType,
    highlightCells: [
      { col: from.col, row: from.row },
      { col: to.col, row: to.row },
    ],
  };
}

// ── Memory pair generators ──────────────────────────────────────────

/**
 * Generate pairs for a coordinate memory game.
 * Match coordinates to icons on a grid.
 * @param {string} level - 'easy' | 'medium' | 'hard'
 * @returns {{ pairs: {a: string, b: string}[], grid: (string|null)[][], gridCols: number, gridRows: number }}
 */
export function generateCoordinaatMemoryPairs(level = 'easy') {
  const config = {
    easy: { cols: 3, rows: 3, pairs: 4 },
    medium: { cols: 4, rows: 4, pairs: 4 },
    hard: { cols: 5, rows: 5, pairs: 4 },
  };
  const { cols, rows, pairs: pairCount } = config[level] || config.easy;
  const { grid, icons } = generateGrid(cols, rows, pairCount);

  const pairs = icons.map(({ icon, col, row }) => ({
    a: coordLabel(col, row),
    b: icon,
  }));

  return { pairs, grid, gridCols: cols, gridRows: rows };
}

export { COLUMN_LABELS };
