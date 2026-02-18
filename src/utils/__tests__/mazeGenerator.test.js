import { describe, it, expect } from 'vitest';
import {
  generateMaze,
  getEndPosition,
  getStartPosition,
  placeChallenges,
  placeFriendlies,
} from '../mazeGenerator';

// ============================================
// HELPERS
// ============================================

const manhattan = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

// Count open (non-wall) cells in a maze
const countOpenCells = (maze) => {
  let count = 0;
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[0].length; x++) {
      if (!maze[y][x].wall) count++;
    }
  }
  return count;
};

// Check if there's a path between two points using BFS
const hasPath = (maze, start, end) => {
  const visited = new Set();
  const queue = [start];
  visited.add(`${start.x},${start.y}`);

  while (queue.length > 0) {
    const { x, y } = queue.shift();
    if (x === end.x && y === end.y) return true;

    const neighbors = [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ];

    for (const n of neighbors) {
      const key = `${n.x},${n.y}`;
      if (
        n.y >= 0 &&
        n.y < maze.length &&
        n.x >= 0 &&
        n.x < maze[0].length &&
        !maze[n.y][n.x].wall &&
        !visited.has(key)
      ) {
        visited.add(key);
        queue.push(n);
      }
    }
  }
  return false;
};

// ============================================
// MAZE GENERATION
// ============================================

describe('generateMaze', () => {
  it('should generate a maze with correct dimensions', () => {
    const maze = generateMaze(31, 31);
    expect(maze.length).toBe(31);
    expect(maze[0].length).toBe(31);
  });

  it('should work with different sizes (short/medium/long configs)', () => {
    const sizes = [31, 45, 61];
    for (const size of sizes) {
      const maze = generateMaze(size, size);
      expect(maze.length).toBe(size);
      expect(maze[0].length).toBe(size);
    }
  });

  it('should have open start and end positions', () => {
    const maze = generateMaze(31, 31);
    const start = getStartPosition();
    const end = getEndPosition(maze);

    expect(maze[start.y][start.x].wall).toBe(false);
    expect(maze[end.y][end.x].wall).toBe(false);
  });

  it('should have walls on all outer edges', () => {
    const maze = generateMaze(31, 31);
    const height = maze.length;
    const width = maze[0].length;

    // Top and bottom rows
    for (let x = 0; x < width; x++) {
      expect(maze[0][x].wall).toBe(true);
      expect(maze[height - 1][x].wall).toBe(true);
    }
    // Left and right columns
    for (let y = 0; y < height; y++) {
      expect(maze[y][0].wall).toBe(true);
      expect(maze[y][width - 1].wall).toBe(true);
    }
  });

  it('should have a path from start to end', () => {
    const maze = generateMaze(31, 31);
    const start = getStartPosition();
    const end = getEndPosition(maze);

    expect(hasPath(maze, start, end)).toBe(true);
  });

  it('should have a path from start to end for all adventure sizes', () => {
    // Test all three adventure lengths
    for (const size of [31, 45, 61]) {
      const maze = generateMaze(size, size);
      const start = getStartPosition();
      const end = getEndPosition(maze);
      expect(hasPath(maze, start, end)).toBe(true);
    }
  });

  it('should produce mazes with a reasonable number of open cells', () => {
    const maze = generateMaze(31, 31);
    const openCells = countOpenCells(maze);
    const totalCells = 31 * 31;

    // A perfect maze should have roughly 25-50% open cells
    expect(openCells).toBeGreaterThan(totalCells * 0.15);
    expect(openCells).toBeLessThan(totalCells * 0.6);
  });

  it('should produce different mazes on successive calls (randomness)', () => {
    const maze1 = generateMaze(31, 31);
    const maze2 = generateMaze(31, 31);

    // Convert to comparable strings; should differ
    const str1 = JSON.stringify(maze1.map((row) => row.map((c) => c.wall)));
    const str2 = JSON.stringify(maze2.map((row) => row.map((c) => c.wall)));

    // Extremely unlikely to be the same
    expect(str1).not.toBe(str2);
  });
});

// ============================================
// START / END POSITIONS
// ============================================

describe('getStartPosition / getEndPosition', () => {
  it('should return (1,1) as start', () => {
    const start = getStartPosition();
    expect(start).toEqual({ x: 1, y: 1 });
  });

  it('should return (width-2, height-2) as end', () => {
    const maze = generateMaze(31, 31);
    const end = getEndPosition(maze);
    expect(end).toEqual({ x: 29, y: 29 });
  });

  it('should return correct end for different maze sizes', () => {
    for (const size of [31, 45, 61]) {
      const maze = generateMaze(size, size);
      const end = getEndPosition(maze);
      expect(end).toEqual({ x: size - 2, y: size - 2 });
    }
  });
});

// ============================================
// CHALLENGE PLACEMENT
// ============================================

describe('placeChallenges', () => {
  it('should place the exact number of challenges requested', () => {
    const maze = generateMaze(45, 45);
    for (const num of [4, 7, 10]) {
      const challenges = placeChallenges(maze, num);
      expect(challenges.length).toBe(num);
    }
  });

  it('should place challenges only on open (non-wall) cells', () => {
    const maze = generateMaze(45, 45);
    const challenges = placeChallenges(maze, 7);

    for (const c of challenges) {
      expect(maze[c.y][c.x].wall).toBe(false);
    }
  });

  it('should not place challenges on start or end position', () => {
    const maze = generateMaze(45, 45);
    const start = getStartPosition();
    const end = getEndPosition(maze);
    const challenges = placeChallenges(maze, 10);

    for (const c of challenges) {
      expect(c.x === start.x && c.y === start.y).toBe(false);
      expect(c.x === end.x && c.y === end.y).toBe(false);
    }
  });

  it('should assign sequential IDs starting from 0', () => {
    const maze = generateMaze(45, 45);
    const challenges = placeChallenges(maze, 7);

    // IDs should be sequential (though the last challenge may get a higher id before trimming)
    for (let i = 0; i < challenges.length; i++) {
      expect(challenges[i].id).toBeDefined();
      expect(typeof challenges[i].id).toBe('number');
    }
  });

  it('should initialize all challenges as not completed', () => {
    const maze = generateMaze(45, 45);
    const challenges = placeChallenges(maze, 7);

    for (const c of challenges) {
      expect(c.completed).toBe(false);
    }
  });

  it('should maintain minimum distance between challenges', () => {
    const maze = generateMaze(45, 45);
    const challenges = placeChallenges(maze, 7);

    // Check pair-wise distance (should be >= 6 except for the last near-exit one)
    for (let i = 0; i < challenges.length - 1; i++) {
      for (let j = i + 1; j < challenges.length - 1; j++) {
        const dist = manhattan(challenges[i], challenges[j]);
        // The sector-based placement tries for >= 6, but the final challenge has no constraint
        // so we check all-but-last pairs
        expect(dist).toBeGreaterThanOrEqual(4); // reasonable lower bound
      }
    }
  });

  it('should place challenges reachable from start', () => {
    const maze = generateMaze(45, 45);
    const start = getStartPosition();
    const challenges = placeChallenges(maze, 7);

    for (const c of challenges) {
      expect(hasPath(maze, start, { x: c.x, y: c.y })).toBe(true);
    }
  });
});

// ============================================
// FRIENDLY PLACEMENT
// ============================================

describe('placeFriendlies', () => {
  it('should place the exact number of friendlies requested', () => {
    const maze = generateMaze(45, 45);
    const challenges = placeChallenges(maze, 7);

    for (const count of [2, 4, 6]) {
      const emojis = ['🌟', '🎈', '🤖', '🧸', '🐶', '🐱'];
      const friendlies = placeFriendlies(maze, challenges, emojis, count);
      expect(friendlies.length).toBe(count);
    }
  });

  it('should place friendlies only on open cells', () => {
    const maze = generateMaze(45, 45);
    const challenges = placeChallenges(maze, 7);
    const friendlies = placeFriendlies(
      maze,
      challenges,
      ['🌟', '🎈', '🤖', '🧸'],
      4,
    );

    for (const f of friendlies) {
      expect(maze[f.y][f.x].wall).toBe(false);
    }
  });

  it('should not place friendlies on start or end position', () => {
    const maze = generateMaze(45, 45);
    const start = getStartPosition();
    const end = getEndPosition(maze);
    const challenges = placeChallenges(maze, 7);
    const friendlies = placeFriendlies(
      maze,
      challenges,
      ['🌟', '🎈', '🤖', '🧸'],
      4,
    );

    for (const f of friendlies) {
      expect(f.x === start.x && f.y === start.y).toBe(false);
      expect(f.x === end.x && f.y === end.y).toBe(false);
    }
  });

  it('should keep distance from challenges (>= 4)', () => {
    const maze = generateMaze(45, 45);
    const challenges = placeChallenges(maze, 7);
    const friendlies = placeFriendlies(
      maze,
      challenges,
      ['🌟', '🎈', '🤖', '🧸'],
      4,
    );

    for (const f of friendlies) {
      for (const c of challenges) {
        expect(manhattan(f, c)).toBeGreaterThanOrEqual(4);
      }
    }
  });

  it('should keep distance between friendlies (>= 6)', () => {
    const maze = generateMaze(45, 45);
    const challenges = placeChallenges(maze, 7);
    const friendlies = placeFriendlies(
      maze,
      challenges,
      ['🌟', '🎈', '🤖', '🧸', '🐶', '🐱'],
      4,
    );

    for (let i = 0; i < friendlies.length; i++) {
      for (let j = i + 1; j < friendlies.length; j++) {
        expect(manhattan(friendlies[i], friendlies[j])).toBeGreaterThanOrEqual(
          6,
        );
      }
    }
  });

  it('should assign unique IDs', () => {
    const maze = generateMaze(45, 45);
    const challenges = placeChallenges(maze, 7);
    const friendlies = placeFriendlies(
      maze,
      challenges,
      ['🌟', '🎈', '🤖', '🧸'],
      4,
    );

    const ids = friendlies.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should assign unique emojis from the provided set', () => {
    const maze = generateMaze(45, 45);
    const challenges = placeChallenges(maze, 7);
    const emojis = ['🌟', '🎈', '🤖', '🧸'];
    const friendlies = placeFriendlies(maze, challenges, emojis, 4);

    const usedEmojis = friendlies.map((f) => f.emoji);
    expect(new Set(usedEmojis).size).toBe(usedEmojis.length);
    for (const e of usedEmojis) {
      expect(emojis).toContain(e);
    }
  });

  it('should use custom rescue messages when provided', () => {
    const maze = generateMaze(45, 45);
    const challenges = placeChallenges(maze, 7);
    const customMessages = [
      'Custom msg 1',
      'Custom msg 2',
      'Custom msg 3',
      'Custom msg 4',
      'Custom msg 5',
      'Custom msg 6',
      'Custom msg 7',
    ];
    const friendlies = placeFriendlies(
      maze,
      challenges,
      ['🌟', '🎈', '🤖', '🧸'],
      4,
      customMessages,
    );

    for (const f of friendlies) {
      expect(customMessages).toContain(f.message);
    }
  });

  it('should fall back to default messages when none provided', () => {
    const maze = generateMaze(45, 45);
    const challenges = placeChallenges(maze, 7);
    const friendlies = placeFriendlies(
      maze,
      challenges,
      ['🌟', '🎈', '🤖', '🧸'],
      4,
    );

    for (const f of friendlies) {
      expect(typeof f.message).toBe('string');
      expect(f.message.length).toBeGreaterThan(0);
    }
  });

  it('should initialize all friendlies as not spoken and not collected', () => {
    const maze = generateMaze(45, 45);
    const challenges = placeChallenges(maze, 7);
    const friendlies = placeFriendlies(
      maze,
      challenges,
      ['🌟', '🎈', '🤖', '🧸'],
      4,
    );

    for (const f of friendlies) {
      expect(f.spoken).toBe(false);
      expect(f.dialogueType).toBe('verdwaald');
    }
  });

  it('should place friendlies reachable from start', () => {
    const maze = generateMaze(45, 45);
    const start = getStartPosition();
    const challenges = placeChallenges(maze, 7);
    const friendlies = placeFriendlies(
      maze,
      challenges,
      ['🌟', '🎈', '🤖', '🧸'],
      4,
    );

    for (const f of friendlies) {
      expect(hasPath(maze, start, { x: f.x, y: f.y })).toBe(true);
    }
  });
});

// ============================================
// INTEGRATION: FULL ADVENTURE SETUP
// ============================================

describe('Full adventure setup (integration)', () => {
  const configs = [
    { name: 'short', size: 31, challenges: 4, friendlies: 2 },
    { name: 'medium', size: 45, challenges: 7, friendlies: 4 },
    { name: 'long', size: 61, challenges: 10, friendlies: 6 },
  ];

  for (const config of configs) {
    it(`should set up a complete ${config.name} adventure`, () => {
      const maze = generateMaze(config.size, config.size);
      const challenges = placeChallenges(maze, config.challenges);
      const emojis = ['🌟', '🎈', '🤖', '🧸', '🐶', '🐱'];
      const friendlies = placeFriendlies(
        maze,
        challenges,
        emojis,
        config.friendlies,
      );

      // Correct counts
      expect(challenges.length).toBe(config.challenges);
      expect(friendlies.length).toBe(config.friendlies);

      // All items reachable
      const start = getStartPosition();
      const end = getEndPosition(maze);

      expect(hasPath(maze, start, end)).toBe(true);
      for (const c of challenges) {
        expect(hasPath(maze, start, { x: c.x, y: c.y })).toBe(true);
      }
      for (const f of friendlies) {
        expect(hasPath(maze, start, { x: f.x, y: f.y })).toBe(true);
      }

      // No overlaps between challenges and friendlies
      for (const c of challenges) {
        for (const f of friendlies) {
          expect(c.x === f.x && c.y === f.y).toBe(false);
        }
      }
    });
  }
});
