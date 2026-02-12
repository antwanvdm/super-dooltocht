// ============================================
// TAALDATA - Spelling, Woordenschat & Begrijpend Lezen
// ============================================
// Dit bestand bevat alle woordenlijsten en teksten.
// Pas de arrays aan om content toe te voegen of te wijzigen.

// ============================================
// SPELLING CATEGORIEËN
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

// ============================================
// WOORDEN PER SPELLING CATEGORIE
// ============================================
// Voeg woorden toe door ze simpelweg aan de array toe te voegen.

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

// ============================================
// WOORDENSCHAT - ALGEMENE WOORDEN
// ============================================
// Elke entry: { word, definition }

export const GENERAL_VOCABULARY = [
  {
    word: 'buurt',
    definition: 'De plek waar je woont, met huizen en mensen.',
    exampleSentence: 'In onze buurt staan veel gezellige huizen.',
  },
  {
    word: 'bibliotheek',
    definition: 'Een plek waar je boeken kunt lenen.',
    exampleSentence: 'Ik ga naar de bibliotheek om een boek te lenen.',
  },
  {
    word: 'recept',
    definition: 'Een beschrijving van hoe je iets klaarmaakt.',
    exampleSentence: 'Mama zoekt een recept om pannenkoeken te bakken.',
  },
  {
    word: 'avontuur',
    definition: 'Een spannende reis of gebeurtenis.',
    exampleSentence: 'We beleefden een groot avontuur in het bos.',
  },
  {
    word: 'ontdekken',
    definition: 'Iets vinden dat je nog niet kende.',
    exampleSentence: 'We gaan vandaag een nieuw pad ontdekken.',
  },
  {
    word: 'verzamelen',
    definition: 'Dingen bij elkaar zoeken en bewaren.',
    exampleSentence: 'Tim wil postzegels verzamelen als hobby.',
  },
  {
    word: 'uitvinding',
    definition: 'Iets nieuws dat iemand heeft bedacht en gemaakt.',
    exampleSentence: 'De telefoon is een heel handige uitvinding.',
  },
  {
    word: 'beschermen',
    definition: 'Ervoor zorgen dat iets of iemand veilig is.',
    exampleSentence: 'We moeten de dieren in het bos beschermen.',
  },
  {
    word: 'gezellig',
    definition: 'Een fijn en warm gevoel als je bij anderen bent.',
    exampleSentence: 'Het was heel gezellig bij oma thuis.',
  },
  {
    word: 'eerlijk',
    definition: 'De waarheid vertellen en je aan de regels houden.',
    exampleSentence: 'Je moet altijd eerlijk spelen tijdens een spelletje.',
  },
  {
    word: 'geduld',
    definition: 'Rustig kunnen wachten zonder boos te worden.',
    exampleSentence: 'Je hebt veel geduld nodig als je leert breien.',
  },
  {
    word: 'oplossing',
    definition: 'Het antwoord op een probleem.',
    exampleSentence: 'De juf vond een goede oplossing voor het probleem.',
  },
  {
    word: 'instrument',
    definition: 'Een ding waarmee je muziek kunt maken.',
    exampleSentence: 'De gitaar is mijn favoriete instrument.',
  },
  {
    word: 'voorzichtig',
    definition: 'Rustig en oplettend iets doen zodat er niets misgaat.',
    exampleSentence: 'Loop voorzichtig over het gladde ijs.',
  },
  {
    word: 'herinnering',
    definition: 'Iets dat je nog weet van vroeger.',
    exampleSentence: 'Ik heb een mooie herinnering aan die vakantie.',
  },
  {
    word: 'compliment',
    definition: 'Een lief of aardig ding dat je tegen iemand zegt.',
    exampleSentence: 'Lisa kreeg een compliment voor haar mooie tekening.',
  },
  {
    word: 'samenwerken',
    definition: 'Samen met anderen iets doen of maken.',
    exampleSentence: 'Bij dit project moeten we goed samenwerken.',
  },
  {
    word: 'fantasie',
    definition: 'Dingen bedenken die niet echt bestaan.',
    exampleSentence: 'Met veel fantasie schrijf je de leukste verhalen.',
  },
  {
    word: 'onderzoeken',
    definition: 'Goed kijken en uitzoeken hoe iets werkt.',
    exampleSentence: 'De wetenschapper ging het probleem onderzoeken.',
  },
  {
    word: 'waarschuwen',
    definition: 'Iemand vertellen dat er gevaar is.',
    exampleSentence:
      'Het bord is om mensen te waarschuwen voor het diepe water.',
  },
  {
    word: 'verrassing',
    definition: 'Iets onverwachts dat je blij of verbaasd maakt.',
    exampleSentence: 'Het cadeau was een leuke verrassing voor papa.',
  },
  {
    word: 'richting',
    definition: 'De kant waar je naartoe gaat.',
    exampleSentence: 'We lopen in de richting van de school.',
  },
  {
    word: 'prestatie',
    definition: 'Iets knaps dat je hebt gedaan.',
    exampleSentence: 'Het was een geweldige prestatie om de race te winnen.',
  },
  {
    word: 'toestemming',
    definition: 'Wanneer iemand zegt dat iets mag.',
    exampleSentence: 'Ik vroeg toestemming om naar buiten te gaan.',
  },
  {
    word: 'probleem',
    definition: 'Iets moeilijks dat je moet oplossen.',
    exampleSentence: 'Er is een probleem met de computer.',
  },
  {
    word: 'tevreden',
    definition: 'Blij met hoe iets is.',
    exampleSentence: 'De juf was erg tevreden over mijn werkstuk.',
  },
  {
    word: 'verschillend',
    definition: 'Niet hetzelfde, anders.',
    exampleSentence: 'De twee zussen dragen verschillende kleuren.',
  },
  {
    word: 'afstand',
    definition: 'Hoe ver iets weg is.',
    exampleSentence: 'De afstand van huis naar school is twee kilometer.',
  },
  {
    word: 'beloning',
    definition: 'Iets dat je krijgt omdat je iets goed hebt gedaan.',
    exampleSentence: 'Als beloning kreeg hij een sticker van de juf.',
  },
  {
    word: 'oefenen',
    definition: 'Iets steeds opnieuw doen zodat je er beter in wordt.',
    exampleSentence: 'Je moet elke dag oefenen om goed piano te leren spelen.',
  },
];

// ============================================
// BEGRIJPEND LEZEN - KORTE TEKSTEN
// ============================================
// level: 'short' (1-2 zinnen) of 'long' (3-4 zinnen)

export const READING_TEXTS = [
  // === KORTE TEKSTEN ===
  {
    level: 'short',
    text: 'Tom loopt naar de winkel. Hij koopt brood bij de bakker.',
    question: 'Wie koopt het brood?',
    answer: 'Tom',
    wrongAnswers: ['De bakker', 'Zijn moeder', 'De juf'],
    statements: [
      { text: 'Tom gaat naar de bakker.', isTrue: true },
      { text: 'Tom koopt kaas.', isTrue: false },
      { text: 'Tom loopt naar de winkel.', isTrue: true },
      { text: 'Tom fietst naar de bakker.', isTrue: false },
    ],
  },
  {
    level: 'short',
    text: 'Lisa heeft een rode fiets. Ze fietst elke dag naar school.',
    question: 'Welke kleur heeft de fiets van Lisa?',
    answer: 'Rood',
    wrongAnswers: ['Blauw', 'Groen', 'Geel'],
    statements: [
      { text: 'Lisa heeft een rode fiets.', isTrue: true },
      { text: 'Lisa heeft een blauwe fiets.', isTrue: false },
      { text: 'Lisa fietst elke dag naar school.', isTrue: true },
      { text: 'Lisa gaat met de bus naar school.', isTrue: false },
    ],
  },
  {
    level: 'short',
    text: 'De hond blaft hard. Hij wil graag naar buiten.',
    question: 'Wat wil de hond?',
    answer: 'Naar buiten',
    wrongAnswers: ['Eten', 'Slapen', 'Spelen met de kat'],
    statements: [
      { text: 'De hond blaft hard.', isTrue: true },
      { text: 'De hond wil eten.', isTrue: false },
      { text: 'De hond wil naar buiten.', isTrue: true },
      { text: 'De hond is stil.', isTrue: false },
    ],
  },
  {
    level: 'short',
    text: 'Opa leest een boek in de tuin. De zon schijnt lekker.',
    question: 'Waar leest opa?',
    answer: 'In de tuin',
    wrongAnswers: ['In de keuken', 'Op school', 'In bed'],
    statements: [
      { text: 'Opa leest een boek.', isTrue: true },
      { text: 'De zon schijnt lekker.', isTrue: true },
      { text: 'Opa zit in de keuken.', isTrue: false },
      { text: 'Het regent buiten.', isTrue: false },
    ],
  },
  {
    level: 'short',
    text: 'Sara tekent een vlinder. Ze gebruikt veel kleuren.',
    question: 'Wat tekent Sara?',
    answer: 'Een vlinder',
    wrongAnswers: ['Een bloem', 'Een huis', 'Een kat'],
    statements: [
      { text: 'Sara tekent een vlinder.', isTrue: true },
      { text: 'Sara gebruikt veel kleuren.', isTrue: true },
      { text: 'Sara gebruikt maar één kleur.', isTrue: false },
      { text: 'Sara tekent een bloem.', isTrue: false },
    ],
  },
  {
    level: 'short',
    text: 'Het regent buiten. De kinderen spelen binnen met blokken.',
    question: 'Waarom spelen de kinderen binnen?',
    answer: 'Omdat het regent',
    wrongAnswers: [
      'Omdat ze moe zijn',
      'Omdat het donker is',
      'Omdat ze ziek zijn',
    ],
    statements: [
      { text: 'Het regent buiten.', isTrue: true },
      { text: 'De kinderen spelen met blokken.', isTrue: true },
      { text: 'De kinderen spelen buiten.', isTrue: false },
      { text: 'De kinderen spelen met poppen.', isTrue: false },
    ],
  },
  {
    level: 'short',
    text: 'Mama bakt een taart voor oma. De taart is met aardbeien.',
    question: 'Voor wie bakt mama de taart?',
    answer: 'Voor oma',
    wrongAnswers: ['Voor papa', 'Voor de juf', 'Voor de buurman'],
    statements: [
      { text: 'Mama bakt een taart.', isTrue: true },
      { text: 'De taart is met aardbeien.', isTrue: true },
      { text: 'De taart is met kersen.', isTrue: false },
      { text: 'De taart is voor opa.', isTrue: false },
    ],
  },
  {
    level: 'short',
    text: 'Tim vindt een schelp op het strand. Hij stopt hem in zijn zak.',
    question: 'Waar vindt Tim de schelp?',
    answer: 'Op het strand',
    wrongAnswers: ['In het bos', 'Op school', 'In de tuin'],
    statements: [
      { text: 'Tim vindt een schelp.', isTrue: true },
      { text: 'Tim stopt de schelp in zijn zak.', isTrue: true },
      { text: 'Tim is in het bos.', isTrue: false },
      { text: 'Tim gooit de schelp weg.', isTrue: false },
    ],
  },
  {
    level: 'short',
    text: 'De kat slaapt op de bank. Ze droomt van muizen.',
    question: 'Waar slaapt de kat?',
    answer: 'Op de bank',
    wrongAnswers: ['Op het bed', 'In de tuin', 'Op de tafel'],
    statements: [
      { text: 'De kat slaapt op de bank.', isTrue: true },
      { text: 'De kat droomt van muizen.', isTrue: true },
      { text: 'De kat droomt van vissen.', isTrue: false },
      { text: 'De kat is wakker.', isTrue: false },
    ],
  },
  {
    level: 'short',
    text: 'Jan speelt voetbal in het park. Hij scoort drie doelpunten.',
    question: 'Hoeveel doelpunten scoort Jan?',
    answer: 'Drie',
    wrongAnswers: ['Twee', 'Vier', 'Vijf'],
    statements: [
      { text: 'Jan speelt voetbal.', isTrue: true },
      { text: 'Jan speelt in het park.', isTrue: true },
      { text: 'Jan scoort vijf doelpunten.', isTrue: false },
      { text: 'Jan speelt basketbal.', isTrue: false },
    ],
  },
  {
    level: 'short',
    text: 'Emma leert zwemmen. Ze gaat elke woensdag naar het zwembad.',
    question: 'Wanneer gaat Emma naar het zwembad?',
    answer: 'Elke woensdag',
    wrongAnswers: ['Elke maandag', 'Elke vrijdag', 'Elke zaterdag'],
    statements: [
      { text: 'Emma leert zwemmen.', isTrue: true },
      { text: 'Emma gaat elke woensdag naar het zwembad.', isTrue: true },
      { text: 'Emma gaat elke maandag naar het zwembad.', isTrue: false },
      { text: 'Emma leert schaatsen.', isTrue: false },
    ],
  },
  {
    level: 'short',
    text: 'De vogel zingt in de boom. Het is vroeg in de ochtend.',
    question: 'Waar zingt de vogel?',
    answer: 'In de boom',
    wrongAnswers: ['Op het dak', 'In de lucht', 'Op de grond'],
    statements: [
      { text: 'De vogel zingt in de boom.', isTrue: true },
      { text: 'Het is vroeg in de ochtend.', isTrue: true },
      { text: 'Het is laat in de avond.', isTrue: false },
      { text: 'De vogel zit op het dak.', isTrue: false },
    ],
  },

  // === LANGE TEKSTEN ===
  {
    level: 'long',
    text: 'Lotte gaat met haar klas naar de dierentuin. Ze ziet leeuwen, olifanten en giraffen. De giraffe is haar lievelingsdier. Na het bezoek eten ze een ijsje.',
    question: 'Wat is het lievelingsdier van Lotte?',
    answer: 'De giraffe',
    wrongAnswers: ['De leeuw', 'De olifant', 'De aap'],
    statements: [
      { text: 'Lotte gaat met haar klas naar de dierentuin.', isTrue: true },
      { text: 'Na het bezoek eten ze een ijsje.', isTrue: true },
      { text: 'De leeuw is het lievelingsdier van Lotte.', isTrue: false },
      { text: 'Lotte gaat alleen naar de dierentuin.', isTrue: false },
    ],
  },
  {
    level: 'long',
    text: 'Het is winter en het sneeuwt hard. De kinderen maken een sneeuwpop in de tuin. Ze geven hem een wortel als neus en twee knoppen als ogen. Daarna drinken ze warme chocolademelk.',
    question: 'Wat gebruiken de kinderen als neus voor de sneeuwpop?',
    answer: 'Een wortel',
    wrongAnswers: ['Een steen', 'Een tak', 'Een knoop'],
    statements: [
      { text: 'De kinderen maken een sneeuwpop.', isTrue: true },
      { text: 'Daarna drinken ze warme chocolademelk.', isTrue: true },
      { text: 'De sneeuwpop heeft stenen als ogen.', isTrue: false },
      { text: 'Het is zomer.', isTrue: false },
    ],
  },
  {
    level: 'long',
    text: 'Finn heeft een nieuw boek gekregen voor zijn verjaardag. Het gaat over piraten en schattenjacht. Hij leest elke avond twee hoofdstukken. Het is het spannendste boek dat hij ooit heeft gelezen.',
    question: 'Wanneer heeft Finn het boek gekregen?',
    answer: 'Voor zijn verjaardag',
    wrongAnswers: ['Met Sinterklaas', 'Op school', 'In de bibliotheek'],
    statements: [
      { text: 'Finn leest elke avond twee hoofdstukken.', isTrue: true },
      { text: 'Het boek gaat over piraten.', isTrue: true },
      { text: 'Het boek gaat over ridders.', isTrue: false },
      { text: 'Finn vindt het boek saai.', isTrue: false },
    ],
  },
  {
    level: 'long',
    text: 'De klas van juf Marieke gaat op schoolreisje naar het strand. Ze bouwen zandkastelen en zoeken schelpen. Sommige kinderen gaan zwemmen in de zee. Aan het eind van de dag zijn ze moe maar gelukkig.',
    question: 'Waar gaat de klas naartoe op schoolreisje?',
    answer: 'Naar het strand',
    wrongAnswers: ['Naar het bos', 'Naar de dierentuin', 'Naar het pretpark'],
    statements: [
      { text: 'Ze bouwen zandkastelen.', isTrue: true },
      { text: 'De juf heet Marieke.', isTrue: true },
      { text: 'Alle kinderen gaan zwemmen.', isTrue: false },
      { text: 'Ze gaan naar het pretpark.', isTrue: false },
    ],
  },
  {
    level: 'long',
    text: 'Sophie heeft een konijn dat Flop heet. Flop woont in een groot hok in de tuin. Elke ochtend geeft Sophie hem wortels en sla. Flop vindt wortels het lekkerst.',
    question: 'Hoe heet het konijn van Sophie?',
    answer: 'Flop',
    wrongAnswers: ['Flap', 'Flip', 'Knabbel'],
    statements: [
      { text: 'Het konijn heet Flop.', isTrue: true },
      { text: 'Flop vindt wortels het lekkerst.', isTrue: true },
      { text: 'Flop woont in huis.', isTrue: false },
      { text: 'Flop vindt sla het lekkerst.', isTrue: false },
    ],
  },
  {
    level: 'long',
    text: 'Op woensdag heeft groep 4 gym. Ze spelen vandaag trefbal. Het team van Daan wint met 5 tegen 3. De juf zegt dat iedereen goed heeft gespeeld.',
    question: 'Welk spel spelen ze bij gym?',
    answer: 'Trefbal',
    wrongAnswers: ['Voetbal', 'Tikkertje', 'Basketbal'],
    statements: [
      { text: 'Ze hebben gym op woensdag.', isTrue: true },
      { text: 'Het team van Daan wint.', isTrue: true },
      { text: 'Het team van Daan verliest.', isTrue: false },
      { text: 'De juf is boos op de kinderen.', isTrue: false },
    ],
  },
  {
    level: 'long',
    text: 'Het is herfst en de bladeren vallen van de bomen. Mila verzamelt de mooiste bladeren in allerlei kleuren. Ze maakt er een collage van voor op school. De juf vindt het prachtig.',
    question: 'Wat maakt Mila van de bladeren?',
    answer: 'Een collage',
    wrongAnswers: ['Een tekening', 'Een boeket', 'Een krans'],
    statements: [
      { text: 'Het is herfst.', isTrue: true },
      { text: 'De juf vindt het prachtig.', isTrue: true },
      { text: 'Mila maakt een krans van de bladeren.', isTrue: false },
      { text: 'Het is lente.', isTrue: false },
    ],
  },
  {
    level: 'long',
    text: 'Bas en zijn vader gaan vissen bij de vijver. Ze pakken hun hengels en brood als aas. Na een uur vangt Bas een kleine vis. Hij laat de vis weer vrij in het water.',
    question: 'Wat gebruiken Bas en zijn vader als aas?',
    answer: 'Brood',
    wrongAnswers: ['Wormen', 'Mais', 'Kaas'],
    statements: [
      { text: 'Ze gaan vissen bij de vijver.', isTrue: true },
      { text: 'Bas laat de vis weer vrij.', isTrue: true },
      { text: 'Bas vangt een grote vis.', isTrue: false },
      { text: 'Ze gebruiken wormen als aas.', isTrue: false },
    ],
  },
  {
    level: 'long',
    text: 'Anna gaat met de trein naar oma. De reis duurt een half uur. Oma staat haar op te wachten op het station. Samen lopen ze naar het huis van oma en bakken ze koekjes.',
    question: 'Hoe lang duurt de reis naar oma?',
    answer: 'Een half uur',
    wrongAnswers: ['Een uur', 'Tien minuten', 'Twee uur'],
    statements: [
      { text: 'Oma wacht op het station.', isTrue: true },
      { text: 'Ze bakken samen koekjes.', isTrue: true },
      { text: 'Anna gaat met de bus naar oma.', isTrue: false },
      { text: 'De reis duurt twee uur.', isTrue: false },
    ],
  },
  {
    level: 'long',
    text: 'De school organiseert een spelletjesmiddag. Er zijn drie activiteiten: knutselen, een quiz en een dansles. Noah kiest de quiz en wint de eerste prijs: een mooi potlood.',
    question: 'Wat wint Noah bij de quiz?',
    answer: 'Een potlood',
    wrongAnswers: ['Een boek', 'Een snoepje', 'Een sticker'],
    statements: [
      { text: 'Er zijn drie activiteiten.', isTrue: true },
      { text: 'Noah wint de eerste prijs.', isTrue: true },
      { text: 'Noah kiest de dansles.', isTrue: false },
      { text: 'Noah wint een boek.', isTrue: false },
    ],
  },
];
