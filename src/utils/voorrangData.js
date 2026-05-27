// Traffic priority situations (voorrangssituaties) for VoorrangQuiz.
// All situations are shown from the cyclist's perspective (player going north from south).
//
// Layout types:
//   'cross'      – 4-way intersection
//   'roundabout' – rotonde (special rendering)
//
// others: array of other vehicles:
//   { type: 'car'|'bicycle', going: 'north'|'south'|'east'|'west' }
//   going = direction of travel (vehicle comes from opposite side)
//
// markings: array of road markings:
//   { type: 'sharkTeeth', road: 'south'|'north'|'east'|'west' }
//   'road' = which road entry has the shark teeth facing the approaching vehicle
//
// priorityRoad: 'north-south' | 'east-west' | null
//   Which axis is the priority road (shown with yellow diamonds)

const SITUATIONS = [
  // === EASY: Rechts voor links (right before left at uncontrolled intersections) ===
  {
    id: 'rvl-rechts',
    level: 'easy',
    layout: 'cross',
    playerGoing: 'north',
    others: [{ type: 'car', going: 'west' }], // car from east = from player's right
    markings: [],
    priorityRoad: null,
    question: 'De auto komt van jouw rechts. Mag jij doorrijden?',
    correctAnswer: 'Nee',
    wrongAnswer: 'Ja',
  },
  {
    id: 'rvl-links',
    level: 'easy',
    layout: 'cross',
    playerGoing: 'north',
    others: [{ type: 'car', going: 'east' }], // car from west = from player's left
    markings: [],
    priorityRoad: null,
    question: 'De auto komt van jouw links. Mag jij doorrijden?',
    correctAnswer: 'Ja',
    wrongAnswer: 'Nee',
  },
  {
    id: 'rvl-fietser',
    level: 'easy',
    layout: 'cross',
    playerGoing: 'north',
    others: [{ type: 'bicycle', going: 'west' }], // other cyclist from right
    markings: [],
    priorityRoad: null,
    question: 'De fietser komt van jouw rechts. Mag jij doorrijden?',
    correctAnswer: 'Nee',
    wrongAnswer: 'Ja',
  },

  // === MEDIUM: Haaientanden (shark teeth / yield markings) ===
  {
    id: 'haaien-jij',
    level: 'medium',
    layout: 'cross',
    playerGoing: 'north',
    others: [{ type: 'car', going: 'west' }],
    markings: [{ type: 'sharkTeeth', road: 'south' }], // player's road has shark teeth
    priorityRoad: null,
    question: 'Mag jij doorrijden?',
    correctAnswer: 'Nee',
    wrongAnswer: 'Ja',
  },
  {
    id: 'haaien-auto',
    level: 'medium',
    layout: 'cross',
    playerGoing: 'north',
    others: [{ type: 'car', going: 'west' }],
    markings: [{ type: 'sharkTeeth', road: 'east' }], // car's road has shark teeth
    priorityRoad: null,
    question: 'Mag jij doorrijden?',
    correctAnswer: 'Ja',
    wrongAnswer: 'Nee',
  },
  {
    id: 'haaien-leeg',
    level: 'medium',
    layout: 'cross',
    playerGoing: 'north',
    others: [],
    markings: [{ type: 'sharkTeeth', road: 'south' }], // no other vehicle
    priorityRoad: null,
    question: 'Mag jij doorrijden?',
    correctAnswer: 'Ja, er komt niemand aan',
    wrongAnswer: 'Nee',
  },

  // === HARD: Voorrangsweg & Rotonde ===
  {
    id: 'voorrangsweg-over',
    level: 'hard',
    layout: 'cross',
    playerGoing: 'north',
    others: [{ type: 'car', going: 'east' }], // car on priority road (E-W)
    markings: [{ type: 'sharkTeeth', road: 'south' }],
    priorityRoad: 'east-west',
    question: 'Mag jij oversteken?',
    correctAnswer: 'Nee',
    wrongAnswer: 'Ja',
  },
  {
    id: 'voorrangsweg-op',
    level: 'hard',
    layout: 'cross',
    playerGoing: 'north',
    others: [{ type: 'car', going: 'east' }], // car from west, must yield
    markings: [{ type: 'sharkTeeth', road: 'west' }], // car's entry has shark teeth
    priorityRoad: 'north-south', // player's road (N-S) is priority road
    question: 'Mag jij doorrijden?',
    correctAnswer: 'Ja',
    wrongAnswer: 'Nee',
  },
  {
    id: 'rotonde-geen-haaientanden',
    level: 'hard',
    layout: 'roundabout',
    playerGoing: 'north',
    others: [{ type: 'car', going: 'south', turning: true }], // car turns right exiting ring
    // Car has shark teeth on its path → car must yield → cyclist may proceed
    markings: [{ type: 'sharkTeeth', road: 'carweg' }],
    priorityRoad: null,
    question: 'Mag jij links de rotonde op rijden?',
    correctAnswer: 'Ja',
    wrongAnswer: 'Nee',
  },
  {
    id: 'rotonde-auto-haaientanden',
    level: 'hard',
    layout: 'roundabout',
    playerGoing: 'north',
    others: [{ type: 'car', going: 'south', turning: true }], // car turns right exiting ring
    markings: [{ type: 'sharkTeeth', road: 'fietspad' }],
    priorityRoad: null,
    question: 'Mag jij links de rotonde op rijden?',
    correctAnswer: 'Nee',
    wrongAnswer: 'Ja',
  },
  {
    id: 'rotonde-fietser-ring',
    level: 'hard',
    layout: 'roundabout',
    playerGoing: 'north',
    // onRing: true — tells RoundaboutSVG to place this cyclist on the fietspad ring
    others: [{ type: 'bicycle', going: 'west', onRing: true }],
    markings: [{ type: 'sharkTeeth', road: 'fietsrotonde' }],
    priorityRoad: null,
    question: 'Mag jij het fietspad oprijden?',
    correctAnswer: 'Nee',
    wrongAnswer: 'Ja',
  },
  {
    id: 'rotonde-leeg',
    level: 'hard',
    layout: 'roundabout',
    playerGoing: 'north',
    others: [],
    markings: [],
    priorityRoad: null,
    question: 'Mag jij doorrijden?',
    correctAnswer: 'Ja',
    wrongAnswer: 'Nee',
  },
];


function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Get a random voorrang situation for the given level.
 * @param {string} level - 'easy' | 'medium' | 'hard'
 * @returns {object} A situation object
 */
export function getVoorangSituation(level = 'easy') {
  const levelOrder = ['easy', 'medium', 'hard'];
  const maxIdx = Math.max(0, levelOrder.indexOf(level));
  const eligible = levelOrder.slice(0, maxIdx + 1);
  const pool = SITUATIONS.filter((s) => eligible.includes(s.level));
  return pickRandom(pool.length > 0 ? pool : SITUATIONS);
}

export { SITUATIONS };
