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

export const getCompletedMazes = () => {
  const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_MAZES);
  return data ? JSON.parse(data) : 0;
};

export const incrementCompletedMazes = () => {
  const current = getCompletedMazes();
  localStorage.setItem(
    STORAGE_KEYS.COMPLETED_MAZES,
    JSON.stringify(current + 1),
  );
  return current + 1;
};

// Totaal geredde vriendjes
export const getSavedFriends = () => {
  const data = localStorage.getItem(STORAGE_KEYS.SAVED_FRIENDS);
  return data ? JSON.parse(data) : 0;
};

export const addSavedFriends = (count) => {
  const current = getSavedFriends();
  const newTotal = current + count;
  localStorage.setItem(STORAGE_KEYS.SAVED_FRIENDS, JSON.stringify(newTotal));
  return newTotal;
};

// Game state save/load
export const saveGameState = (state) => {
  localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(state));
};

export const getGameState = () => {
  const data = localStorage.getItem(STORAGE_KEYS.GAME_STATE);
  return data ? JSON.parse(data) : null;
};

export const clearGameState = () => {
  localStorage.removeItem(STORAGE_KEYS.GAME_STATE);
};

export const getDifficultyLevel = () => {
  const data = localStorage.getItem(STORAGE_KEYS.DIFFICULTY_LEVEL);
  return data ? JSON.parse(data) : 1; // Start op niveau 1
};

export const setDifficultyLevel = (level) => {
  localStorage.setItem(STORAGE_KEYS.DIFFICULTY_LEVEL, JSON.stringify(level));
};

export const getPerformanceHistory = () => {
  const data = localStorage.getItem(STORAGE_KEYS.PERFORMANCE_HISTORY);
  return data ? JSON.parse(data) : [];
};

export const addPerformanceRecord = (isCorrect) => {
  const history = getPerformanceHistory();
  // Bewaar de laatste 10 antwoorden
  const newHistory = [...history, isCorrect].slice(-10);
  localStorage.setItem(
    STORAGE_KEYS.PERFORMANCE_HISTORY,
    JSON.stringify(newHistory),
  );
  return newHistory;
};

// User settings save/load
export const saveUserSettings = (settings) => {
  localStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(settings));
};

export const getUserSettings = () => {
  const data = localStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
  return data ? JSON.parse(data) : null;
};

export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
};

// Code-based sync functions
export const getPlayerCode = () => {
  const data = localStorage.getItem(STORAGE_KEYS.PLAYER_CODE);
  return data ? JSON.parse(data) : null;
};

export const setPlayerCode = (code) => {
  localStorage.setItem(STORAGE_KEYS.PLAYER_CODE, JSON.stringify(code));
};

export const clearPlayerCode = () => {
  localStorage.removeItem(STORAGE_KEYS.PLAYER_CODE);
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
    localStorage.setItem(
      STORAGE_KEYS.COMPLETED_MAZES,
      JSON.stringify(data.completedMazes),
    );
  }
  if (data.savedFriends !== undefined) {
    localStorage.setItem(
      STORAGE_KEYS.SAVED_FRIENDS,
      JSON.stringify(data.savedFriends),
    );
  }
  if (data.difficultyLevel !== undefined) {
    localStorage.setItem(
      STORAGE_KEYS.DIFFICULTY_LEVEL,
      JSON.stringify(data.difficultyLevel),
    );
  }
  if (data.performanceHistory !== undefined) {
    localStorage.setItem(
      STORAGE_KEYS.PERFORMANCE_HISTORY,
      JSON.stringify(data.performanceHistory),
    );
  }
  if (data.userSettings !== undefined) {
    localStorage.setItem(
      STORAGE_KEYS.USER_SETTINGS,
      JSON.stringify(data.userSettings),
    );
  }
  if (data.gameState !== undefined) {
    localStorage.setItem(
      STORAGE_KEYS.GAME_STATE,
      JSON.stringify(data.gameState),
    );
  }
};
