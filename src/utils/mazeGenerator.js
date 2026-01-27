// Procedurele maze generator met depth-first search algoritme

export const generateMaze = (width = 51, height = 51) => {
  // Creëer een grid met allemaal muren
  const maze = Array(height)
    .fill(null)
    .map(() =>
      Array(width)
        .fill(null)
        .map(() => ({ wall: true, visited: false })),
    );

  // Recursive backtracking algoritme
  const carve = (x, y) => {
    maze[y][x].wall = false;
    maze[y][x].visited = true;

    // Random volgorde van richtingen
    const directions = [
      [0, -2], // boven
      [2, 0], // rechts
      [0, 2], // onder
      [-2, 0], // links
    ].sort(() => Math.random() - 0.5);

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (
        newX > 0 &&
        newX < width - 1 &&
        newY > 0 &&
        newY < height - 1 &&
        !maze[newY][newX].visited
      ) {
        // Breek de muur tussen huidige en nieuwe cel
        maze[y + dy / 2][x + dx / 2].wall = false;
        carve(newX, newY);
      }
    }
  };

  // Start in het midden
  carve(1, 1);

  // Zorg dat de start en finish open zijn
  maze[1][1].wall = false;
  maze[height - 2][width - 2].wall = false;

  return maze;
};

export const getEndPosition = (maze) => {
  return { x: maze[0].length - 2, y: maze.length - 2 };
};

export const placeChallenges = (maze, numChallenges = 10) => {
  // We plaatsen numChallenges - 1 gelijkmatig over 9 sectoren, en 1 vlak voor de uitgang.
  const challenges = [];
  const height = maze.length;
  const width = maze[0].length;
  const endPos = getEndPosition(maze);
  const startPos = { x: 1, y: 1 };

  const sectorsX = 3;
  const sectorsY = 3;
  const perSector = Math.floor((numChallenges - 1) / (sectorsX * sectorsY)); // meestal 1 of 0

  const manhattan = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  const minDistanceBetween = 6;

  const sectorWidth = Math.floor(width / sectorsX);
  const sectorHeight = Math.floor(height / sectorsY);

  // Helper om in sector te plaatsen met retries
  const placeInSector = (sx, sy) => {
    let attempts = 0;
    const maxAttempts = 500;
    while (attempts < maxAttempts) {
      attempts++;
      const x =
        sx * sectorWidth +
        1 +
        Math.floor(Math.random() * Math.max(1, sectorWidth - 2));
      const y =
        sy * sectorHeight +
        1 +
        Math.floor(Math.random() * Math.max(1, sectorHeight - 2));
      const candidate = { x, y };

      if (
        x <= 0 ||
        x >= width - 1 ||
        y <= 0 ||
        y >= height - 1 ||
        maze[y][x].wall ||
        (x === startPos.x && y === startPos.y) ||
        (x === endPos.x && y === endPos.y)
      )
        continue;

      const farFromOthers = challenges.every(
        (c) => manhattan(c, candidate) >= minDistanceBetween,
      );
      if (farFromOthers) {
        challenges.push({
          x,
          y,
          completed: false,
          id: challenges.length,
        });
        return true;
      }
    }
    return false;
  };

  // Plaats gelijkmatig in sectoren tot we numChallenges - 1 hebben
  for (let sy = 0; sy < sectorsY; sy++) {
    for (let sx = 0; sx < sectorsX; sx++) {
      if (challenges.length >= numChallenges - 1) break;
      const needed = perSector || 1;
      for (
        let i = 0;
        i < needed && challenges.length < numChallenges - 1;
        i++
      ) {
        placeInSector(sx, sy);
      }
    }
  }

  // Fallback random plaatsing als we nog niet genoeg hebben
  let attempts = 0;
  while (challenges.length < numChallenges - 1 && attempts < 3000) {
    attempts++;
    const x = Math.floor(Math.random() * (width - 2)) + 1;
    const y = Math.floor(Math.random() * (height - 2)) + 1;
    const candidate = { x, y };

    if (
      maze[y][x].wall ||
      (x === startPos.x && y === startPos.y) ||
      (x === endPos.x && y === endPos.y) ||
      challenges.some((c) => c.x === x && c.y === y)
    )
      continue;

    const farFromOthers = challenges.every(
      (c) => manhattan(c, candidate) >= minDistanceBetween,
    );
    if (farFromOthers) {
      challenges.push({ x, y, completed: false, id: challenges.length });
    }
  }

  // Plaats altijd één uitdaging vlak voor de uitgang
  const finalChallenge = Math.sqrt((endPos.x - 1) ** 2 + (endPos.y - 1) ** 2);
  for (let dist = 1; dist < finalChallenge; dist++) {
    const targetX = Math.round(endPos.x - dist * 2);
    const targetY = Math.round(endPos.y - dist * 2);

    if (
      targetX > 0 &&
      targetX < width - 1 &&
      targetY > 0 &&
      targetY < height - 1 &&
      !maze[targetY][targetX].wall &&
      !challenges.some((c) => c.x === targetX && c.y === targetY)
    ) {
      challenges.push({
        x: targetX,
        y: targetY,
        completed: false,
        id: challenges.length,
      });
      break;
    }
  }

  // Forceer exact numChallenges door eventueel te trimmen
  return challenges.slice(0, numChallenges);
};

// Plaats vriendelijke NPC's in het doolhof (geen opdrachten, alleen dialoog)
export const placeFriendlies = (
  maze,
  challenges,
  friendlyEmojis = ['🌟', '🛸', '🤖', '🧸', '🐶'],
  count = 5,
  rescueMessages = undefined,
) => {
  const friendlies = [];
  const height = maze.length;
  const width = maze[0].length;
  const endPos = getEndPosition(maze);
  const startPos = { x: 1, y: 1 };

  const manhattan = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  const minDistFromChallenges = 4;
  const minDistFromOthers = 6;

  // Kies een random subset van unieke emoji's voor deze run
  const shuffledEmojis = [...friendlyEmojis]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

  // Fallback standaard teksten
  const defaultMessages = [
    'Help! Ik ben verdwaald... mag ik met je mee naar de uitgang?',
    'Ik loop hier al zo lang rond! Weet jij de weg?',
    'Oh gelukkig! Eindelijk iemand die me kan helpen!',
    'Ik ben zo blij dat je me gevonden hebt! 🥺',
    'Neem me alsjeblieft mee, ik wil hier weg!',
    'Kun je me meenemen? Ik ben bang in het donker!',
    'Hoera, een redder! Mag ik met je meelopen?',
    'Ik dacht dat ik hier voor altijd zou blijven!',
    'Wat fijn dat je er bent! Ik was zo alleen...',
    'Joepie! Nu ben ik niet meer alleen!',
    'Hoi! Wil je mijn vriendje zijn? 💕',
    'Gelukkig! Ik was al bang dat niemand me zou vinden.',
    'Yes! Samen komen we hier wel uit!',
    'Dankjewel dat je me komt halen! 🤗',
    'Wauw, een held! Neem je me mee?',
    'Ik zat hier al uren te wachten!',
    'Super dat je me hebt gevonden!',
    'Hallo! Ik ben zo blij om je te zien!',
    'Eindelijk! Ik begon me al zorgen te maken.',
    'Cool, een avonturier! Mag ik mee?',
    'Hoi hoi! Breng je me naar huis?',
    'Jeej, nu hoef ik niet meer alleen te zijn!',
    'Wat leuk! Gaan we samen op avontuur?',
    'Oh, wat ben jij lief dat je me komt redden!',
    'Hallo vriend! Ik ben zo blij!',
    'Fijn, fijn, fijn! Eindelijk hulp!',
    'Wow! Ben jij hier om mij te helpen?',
    'Ik wist dat er iemand zou komen! ⭐',
    'Hieperdepiep! Je hebt me gevonden!',
    'Super mega bedankt dat je er bent!',
  ];

  // rescueMessages wordt straks als extra argument doorgegeven vanuit MazeGame

  let attempts = 0;

  // De rescue teksten worden random geshuffeld en per doolhof uniek toegekend
  // (deze array wordt straks als argument doorgegeven)

  // Bepaal rescue teksten: als er een rescueTexts array is meegegeven, shuffle en gebruik die, anders fallback
  // (deze logica wordt straks geactiveerd als MazeGame de juiste array doorgeeft)
  // Voor nu: gebruik alleen defaultMessages, maar code is voorbereid op uitbreiding
  const rescueTexts =
    Array.isArray(rescueMessages) && rescueMessages.length >= count
      ? [...rescueMessages].sort(() => Math.random() - 0.5).slice(0, count)
      : [...defaultMessages].sort(() => Math.random() - 0.5).slice(0, count);

  while (friendlies.length < count && attempts < 2000) {
    attempts++;
    const x = Math.floor(Math.random() * (width - 4)) + 2;
    const y = Math.floor(Math.random() * (height - 4)) + 2;

    if (
      maze[y][x].wall ||
      (x === startPos.x && y === startPos.y) ||
      (x === endPos.x && y === endPos.y)
    )
      continue;

    // Niet te dicht bij challenges
    const farFromChallenges = challenges.every(
      (c) => manhattan(c, { x, y }) >= minDistFromChallenges,
    );
    if (!farFromChallenges) continue;

    // Niet te dicht bij andere friendlies
    const farFromOthers = friendlies.every(
      (f) => manhattan(f, { x, y }) >= minDistFromOthers,
    );
    if (!farFromOthers) continue;

    // Kies random emoji uit de geshuffelde subset
    const emoji = shuffledEmojis[friendlies.length];
    const message = rescueTexts[friendlies.length];

    friendlies.push({
      x,
      y,
      id: `friendly-${friendlies.length}`,
      emoji,
      dialogueType: 'verdwaald',
      message,
      spoken: false,
    });
  }

  return friendlies;
};

export const getStartPosition = () => ({ x: 1, y: 1 });
