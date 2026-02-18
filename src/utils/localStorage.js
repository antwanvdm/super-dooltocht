// LocalStorage utility functies
const STORAGE_KEYS = {
  COMPLETED_MAZES: 'super-dooltocht-completed',
  DIFFICULTY_LEVEL: 'super-dooltocht-difficulty',
  PERFORMANCE_HISTORY: 'super-dooltocht-performance',
  SAVED_FRIENDS: 'super-dooltocht-saved-friends',
  GAME_STATE: 'super-dooltocht-game-state',
  USER_SETTINGS: 'super-dooltocht-user-settings',
  PLAYER_CODE: 'super-dooltocht-player-code',
};

// ─── Veilige localStorage helpers ─────────────────────────────────────────────
// Voorkomt dat corrupt data (JSON.parse crash) of volle opslag
// (QuotaExceededError) de hele app laat crashen.

function safeGet(key, defaultValue) {
  try {
    const data = localStorage.getItem(key);
    return data !== null ? JSON.parse(data) : defaultValue;
  } catch {
    console.warn(`Corrupt localStorage data voor "${key}", reset naar default`);
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
    return defaultValue;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error(`localStorage write mislukt voor "${key}":`, e.message);
    return false;
  }
}

function safeRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

// ─── Getters & Setters ───────────────────────────────────────────────────────

export const getCompletedMazes = () => {
  return safeGet(STORAGE_KEYS.COMPLETED_MAZES, 0);
};

export const incrementCompletedMazes = () => {
  const current = getCompletedMazes();
  safeSet(STORAGE_KEYS.COMPLETED_MAZES, current + 1);
  return current + 1;
};

// Totaal geredde vriendjes
export const getSavedFriends = () => {
  return safeGet(STORAGE_KEYS.SAVED_FRIENDS, 0);
};

export const addSavedFriends = (count) => {
  const current = getSavedFriends();
  const newTotal = current + count;
  safeSet(STORAGE_KEYS.SAVED_FRIENDS, newTotal);
  return newTotal;
};

// Game state save/load
export const saveGameState = (state) => {
  safeSet(STORAGE_KEYS.GAME_STATE, state);
};

export const getGameState = () => {
  return safeGet(STORAGE_KEYS.GAME_STATE, null);
};

export const clearGameState = () => {
  safeRemove(STORAGE_KEYS.GAME_STATE);
};

export const getDifficultyLevel = () => {
  return safeGet(STORAGE_KEYS.DIFFICULTY_LEVEL, 1);
};

export const setDifficultyLevel = (level) => {
  safeSet(STORAGE_KEYS.DIFFICULTY_LEVEL, level);
};

export const getPerformanceHistory = () => {
  return safeGet(STORAGE_KEYS.PERFORMANCE_HISTORY, []);
};

export const addPerformanceRecord = (isCorrect) => {
  const history = getPerformanceHistory();
  // Bewaar de laatste 10 antwoorden
  const newHistory = [...history, isCorrect].slice(-10);
  safeSet(STORAGE_KEYS.PERFORMANCE_HISTORY, newHistory);
  return newHistory;
};

// User settings save/load
export const saveUserSettings = (settings) => {
  safeSet(STORAGE_KEYS.USER_SETTINGS, settings);
};

export const getUserSettings = () => {
  return safeGet(STORAGE_KEYS.USER_SETTINGS, null);
};

export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach((key) => safeRemove(key));
};

// Code-based sync functions
export const getPlayerCode = () => {
  return safeGet(STORAGE_KEYS.PLAYER_CODE, null);
};

export const setPlayerCode = (code) => {
  safeSet(STORAGE_KEYS.PLAYER_CODE, code);
};

export const clearPlayerCode = () => {
  safeRemove(STORAGE_KEYS.PLAYER_CODE);
};

// Verzamel alle game data voor server sync
export const getAllGameData = () => {
  return {
    completedMazes: getCompletedMazes(),
    savedFriends: getSavedFriends(),
    difficultyLevel: getDifficultyLevel(),
    performanceHistory: getPerformanceHistory(),
    userSettings: getUserSettings(),
    gameState: getGameState(),
  };
};

// Herstel alle game data vanaf server
export const restoreAllGameData = (data) => {
  if (!data || typeof data !== 'object') return;

  if (data.completedMazes !== undefined) {
    safeSet(STORAGE_KEYS.COMPLETED_MAZES, data.completedMazes);
  }
  if (data.savedFriends !== undefined) {
    safeSet(STORAGE_KEYS.SAVED_FRIENDS, data.savedFriends);
  }
  if (data.difficultyLevel !== undefined) {
    safeSet(STORAGE_KEYS.DIFFICULTY_LEVEL, data.difficultyLevel);
  }
  if (data.performanceHistory !== undefined) {
    safeSet(STORAGE_KEYS.PERFORMANCE_HISTORY, data.performanceHistory);
  }
  if (data.userSettings !== undefined) {
    safeSet(STORAGE_KEYS.USER_SETTINGS, data.userSettings);
  }
  if (data.gameState !== undefined) {
    safeSet(STORAGE_KEYS.GAME_STATE, data.gameState);
  }
};
