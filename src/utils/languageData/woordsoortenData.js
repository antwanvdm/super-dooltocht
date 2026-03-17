// ============================================
// WOORDSOORTENDATA – Zinnen met gemarkeerd woord + woordsoort
// ============================================
// type: 'zn' = zelfstandig naamwoord, 'ww' = werkwoord, 'bnw' = bijvoeglijk naamwoord
// Het gemarkeerde woord staat tussen ** ** in de zin.

/** Map level → allowed word types */
export const WOORDSOORTEN_LEVEL_TYPES = {
  easy: ['zn', 'ww'],
  medium: ['zn', 'ww', 'bnw'],
  hard: ['zn', 'ww', 'bnw'],
};

export const WOORDSOORT_LABELS = {
  zn: 'Zelfstandig naamwoord',
  ww: 'Werkwoord',
  bnw: 'Bijvoeglijk naamwoord',
};

export const WOORDSOORT_ICONS = {
  zn: '🏷️',
  ww: '🏃',
  bnw: '🎨',
};

export const WOORDSOORTEN_DATA = [
  // Zelfstandig naamwoord
  { sentence: 'De **hond** blaft hard.', word: 'hond', type: 'zn' },
  { sentence: 'Ik eet een **appel**.', word: 'appel', type: 'zn' },
  { sentence: 'De **zon** schijnt.', word: 'zon', type: 'zn' },
  { sentence: 'Mijn **fiets** is rood.', word: 'fiets', type: 'zn' },
  { sentence: 'We zitten in de **klas**.', word: 'klas', type: 'zn' },
  { sentence: 'De **boom** is hoog.', word: 'boom', type: 'zn' },
  { sentence: 'Daar staat een **tafel**.', word: 'tafel', type: 'zn' },
  { sentence: 'Het **konijn** springt.', word: 'konijn', type: 'zn' },
  { sentence: 'Ik lees een **boek**.', word: 'boek', type: 'zn' },
  { sentence: 'De **regen** komt uit de lucht.', word: 'regen', type: 'zn' },
  { sentence: 'We gaan naar het **strand**.', word: 'strand', type: 'zn' },
  { sentence: 'De **sleutel** ligt op tafel.', word: 'sleutel', type: 'zn' },

  // Werkwoord
  { sentence: 'De kat **slaapt** op de bank.', word: 'slaapt', type: 'ww' },
  { sentence: 'Ik **loop** naar school.', word: 'loop', type: 'ww' },
  { sentence: 'Zij **zingt** een liedje.', word: 'zingt', type: 'ww' },
  { sentence: 'Wij **spelen** buiten.', word: 'spelen', type: 'ww' },
  { sentence: 'Hij **leest** een boek.', word: 'leest', type: 'ww' },
  { sentence: 'De vogel **vliegt** hoog.', word: 'vliegt', type: 'ww' },
  { sentence: 'Mama **kookt** het eten.', word: 'kookt', type: 'ww' },
  { sentence: 'De kinderen **rennen** hard.', word: 'rennen', type: 'ww' },
  { sentence: 'Ik **schrijf** een brief.', word: 'schrijf', type: 'ww' },
  { sentence: 'Het water **stroomt** snel.', word: 'stroomt', type: 'ww' },
  { sentence: 'De hond **zwemt** in het meer.', word: 'zwemt', type: 'ww' },
  { sentence: 'Wij **fietsen** naar het park.', word: 'fietsen', type: 'ww' },

  // Bijvoeglijk naamwoord
  { sentence: 'De **grote** hond blaft.', word: 'grote', type: 'bnw' },
  { sentence: 'Dat is een **mooi** plaatje.', word: 'mooi', type: 'bnw' },
  { sentence: 'Het huis is **klein**.', word: 'klein', type: 'bnw' },
  { sentence: 'Ik draag een **rode** jas.', word: 'rode', type: 'bnw' },
  { sentence: 'De soep is **warm**.', word: 'warm', type: 'bnw' },
  { sentence: 'We lopen over het **smalle** pad.', word: 'smalle', type: 'bnw' },
  { sentence: 'De **vrolijke** clown lacht.', word: 'vrolijke', type: 'bnw' },
  { sentence: 'Het is een **donkere** nacht.', word: 'donkere', type: 'bnw' },
  { sentence: 'De bal is **rond**.', word: 'rond', type: 'bnw' },
  { sentence: 'Zij heeft **lang** haar.', word: 'lang', type: 'bnw' },
  { sentence: 'Dat is een **snelle** auto.', word: 'snelle', type: 'bnw' },
  { sentence: 'Het **koude** ijs smelt.', word: 'koude', type: 'bnw' },
];
