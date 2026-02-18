// Emoji categorieën worden geladen van server
// Dit bestand bevat alleen helper functies

let EMOJI_CATEGORIES = [];
let CATEGORY_LABELS = [];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Laad categorieën van server
export const loadEmojiCategories = async () => {
  if (EMOJI_CATEGORIES.length > 0)
    return { categories: EMOJI_CATEGORIES, labels: CATEGORY_LABELS };

  try {
    const response = await fetch(`${API_URL}/api/emoji-categories`);
    if (!response.ok) throw new Error('Failed to load emoji categories');
    const data = await response.json();
    EMOJI_CATEGORIES = data.categories;
    CATEGORY_LABELS = data.labels;
    return data;
  } catch (error) {
    console.error('Error loading emoji categories:', error);
    return { categories: [], labels: [] };
  }
};

// Getter voor categorieën (sync, voor na laden)
export const getEmojiCategories = () => EMOJI_CATEGORIES;
export const getCategoryLabels = () => CATEGORY_LABELS;

// Reset cache zodat een retry opnieuw fetcht
export const resetEmojiCache = () => {
  EMOJI_CATEGORIES = [];
  CATEGORY_LABELS = [];
};

// Helper: slug naar emoji
export const slugToEmoji = (slug) => {
  for (const category of EMOJI_CATEGORIES) {
    const found = category.find((item) => item.slug === slug);
    if (found) return found.emoji;
  }
  return '❓';
};

// Helper: emoji naar slug
export const emojiToSlug = (emoji) => {
  for (const category of EMOJI_CATEGORIES) {
    const found = category.find((item) => item.emoji === emoji);
    if (found) return found.slug;
  }
  return null;
};

// Helper: code array (slugs) naar emojis
// Altijd 4 elementen retourneren, ook bij oude 3-element codes
export const codeToEmojis = (code) => {
  if (!Array.isArray(code)) return ['❓', '❓', '❓', '❓'];
  // Pad naar 4 elementen als nodig (voor oude 3-element codes)
  const padded = [...code];
  while (padded.length < 4) padded.push(null);
  return padded.slice(0, 4).map(slugToEmoji);
};

// Helper: emojis naar code array (slugs)
// Altijd 4 elementen retourneren
export const emojisToCode = (emojis) => {
  if (!Array.isArray(emojis)) return [null, null, null, null];
  const padded = [...emojis];
  while (padded.length < 4) padded.push('');
  return padded.slice(0, 4).map(emojiToSlug);
};
