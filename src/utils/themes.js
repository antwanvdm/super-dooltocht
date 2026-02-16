// Thema's die kids van groep 4 leuk vinden
// Elk thema heeft een vocabularyWords array voor thematische woordenschat.
// Voeg woorden toe door { word, definition } objecten aan de array toe te voegen.
// Individuele thema's staan in src/utils/themes/*.js

import { SPACE } from './themes/space.js';
import { JUNGLE } from './themes/jungle.js';
import { OCEAN } from './themes/ocean.js';
import { CASTLE } from './themes/castle.js';
import { DINO } from './themes/dino.js';
import { CANDY } from './themes/candy.js';
import { SPORTS } from './themes/sports.js';
import { FOOD } from './themes/food.js';
import { TRAFFIC } from './themes/traffic.js';
import { FARM } from './themes/farm.js';
import { MUSIC } from './themes/music.js';
import { PIRATES } from './themes/pirates.js';

export const THEMES = {
  SPACE,
  JUNGLE,
  OCEAN,
  CASTLE,
  DINO,
  CANDY,
  SPORTS,
  FOOD,
  TRAFFIC,
  FARM,
  MUSIC,
  PIRATES,
};

export const getTheme = (themeId) => {
  return Object.values(THEMES).find((t) => t.id === themeId) || THEMES.SPACE;
};
