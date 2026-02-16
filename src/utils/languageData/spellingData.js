// ============================================
// SPELLING CATEGORIEËN & WOORDEN
// ============================================

export const SPELLING_CATEGORIES = [
  {
    id: 1,
    name: 'Hakwoord',
    rule: 'Ik schrijf het woord zoals ik het hoor.',
    example: 'kat',
    icon: '✂️',
  },
  {
    id: 2,
    name: 'Zingwoord',
    rule: 'Ik schrijf ng.',
    example: 'zing',
    icon: '🎵',
  },
  {
    id: 3,
    name: 'Luchtwoord',
    rule: 'Korte klank + cht van lucht. Behalve bij hij ligt, hij legt en hij zegt.',
    example: 'lucht',
    icon: '💨',
  },
  {
    id: 4,
    name: 'Plankwoord',
    rule: 'Daar mag niets tussen.',
    example: 'plank',
    icon: '🪵',
  },
  {
    id: 5,
    name: 'Eer-oor-eur-eel-woord',
    rule: 'Schrijf ee (eer/eel) of oo (oor) of eu (eur).',
    example: 'beer, hoor, geur, geel',
    icon: '🔤',
    subcategories: [
      { id: '5a', name: 'Eer-woord', rule: 'Ik schrijf ee.', example: 'beer' },
      { id: '5b', name: 'Oor-woord', rule: 'Ik schrijf oo.', example: 'hoor' },
      { id: '5c', name: 'Eur-woord', rule: 'Ik schrijf eu.', example: 'geur' },
      { id: '5d', name: 'Eel-woord', rule: 'Ik schrijf ee.', example: 'geel' },
    ],
  },
  {
    id: 6,
    name: 'Aai-ooi-oei-woord',
    rule: 'Ik schrijf i.',
    example: 'haai, mooi, loei',
    icon: '🌈',
  },
  {
    id: 7,
    name: 'Eeuw-ieuw-woord',
    rule: 'Ik denk aan de u.',
    example: 'leeuw, nieuw',
    icon: '✨',
  },
  {
    id: 8,
    name: 'Langermaakwoord',
    rule: 'Ik hoor een /t/ aan het eind, dus langermaken. Ik hoor of ik d of t moet schrijven.',
    example: 'hart, vind',
    icon: '📏',
  },
];

export const SPELLING_WORDS = {

  // 1. Hakwoorden (korte klank)
  1: [
    'kat','mop','bus','pen','dak','vis','pot','map','bel','dop',
    'ham','vel','pit','rok','tas','net','kip','bal','mus','lap',
    'sap','pan','man','bak','tak','zak','hek','lek','pet','bed',
    'bok','mok','sok','kop','top','lip','rat','mat','lat','gat',
    'pad','bad','rad','kam','ram','dam','som','kom','bom','kus',
    'zus','hut','put','rug'
  ],

  // 2. Zingwoorden (-ng)
  2: [
    'zing','ring','bang','lang','gang','slang','wang','tang',
    'jong','sprong','ding','ling','long','tong','gong','zang',
    'wring','spring','zong','dwang','drang','stang','vang',
    'hang','kring'
  ],

  // 3. Luchtwoorden (-cht)
  3: [
    'lucht','nacht','recht','slecht','vocht','macht','pracht',
    'klacht','dicht','licht','gracht','plicht','tocht','wacht',
    'kracht','bocht','jacht','zacht','echt','vlecht',
    'hecht','knecht','vlucht','zucht'
  ],

  // 4. Plankwoorden (-nk)
  4: [
    'plank','dank','bank','blank','klink','denk','drink','stink',
    'rank','klank','stank','wenk','blink','tank','honk','vonk',
    'zink','flink','slank','pronk'
  ],

  // 5a. Eer-woorden (je hoort i-klank)
  '5a': [
    'beer','veer','peer','meer','weer','leer','keer','smeer',
    'sfeer','neer','zeer','heer','teer'
  ],

  // 5b. Oor-woorden (je hoort oo-klank)
  '5b': [
    'hoor','door','voor','boor','spoor','koor','stoor','vroor'
  ],

  // 5c. Eur-woorden (je hoort eu-klank)
  '5c': [
    'geur','deur','kleur','leur','speur','scheur','sleur',
    'beurt','zeur','keur','treur'
  ],

  // 5d. Eel-woorden (je hoort i-klank)
  '5d': [
    'geel','veel','deel','heel','steel','speel','streel',
    'scheel','keel','meel'
  ],

  // 6. Aai-ooi-oei
  6: [
    'mooi','fraai','draai','haai','maai','kraai',
    'groei','bloei','boei','hooi','fooi','gooi',
    'roei','loei','kooi','zaai','taai','saai',
    'dooi','tooi','sproei','knoei'
  ],

  // 7. Eeuw-ieuw
  7: [
    'nieuw','leeuw','meeuw','sneeuw','schreeuw',
    'spreeuw','geeuw','kieuw'
  ],

  // 8. Langermaakwoorden
  8: [
    'hart','kaart','paard','hond','mond','hand','land',
    'zand','wand','band','rond','bond','bord',
    'woord','aard','baard','waard','koord','staart',
    'taart','zwaard','vind','brand','krant',
    'plant','stand','kant','tent','punt',
    'sport','kort','start','markt'
  ],
};
