// LocalStorage utility functies
const STORAGE_KEYS = {
  COMPLETED_MAZES: 'super-dooltocht-completed',
  DIFFICULTY_LEVEL: 'super-dooltocht-difficulty',
  PERFORMANCE_HISTORY: 'super-dooltocht-performance',
  SAVED_FRIENDS: 'super-dooltocht-saved-friends',
  GAME_STATE: 'super-dooltocht-game-state',
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

export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
};
