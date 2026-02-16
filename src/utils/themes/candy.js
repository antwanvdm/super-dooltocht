export const CANDY = {
  id: 'candy',
  name: '🍭 Snoep',
  emoji: '🍭',
  vocabularyWords: [
    {
      word: 'karamel',
      definition: 'Een zoete, plakkerige snoep gemaakt van suiker.',
      exampleSentence:
        'De karamel was zo plakkerig dat het aan mijn tanden bleef kleven.',
    },
    {
      word: 'chocolade',
      definition: 'Een lekkernij gemaakt van cacaobonen.',
      exampleSentence: 'Ik kreeg een reep chocolade voor mijn verjaardag.',
    },
    {
      word: 'lolly',
      definition: 'Een snoepje op een stokje.',
      exampleSentence:
        'Na het zwemmen kreeg ik een grote rode lolly van mama.',
    },
    {
      word: 'marshmallow',
      definition: 'Een zacht, luchtig snoepje.',
      exampleSentence: 'We roosterden een marshmallow boven het kampvuur.',
    },
    {
      word: 'traktatie',
      definition: 'Iets lekkers dat je uitdeelt aan anderen.',
      exampleSentence:
        'Op mijn verjaardag nam ik een leuke traktatie mee naar school.',
    },
    {
      word: 'bakkerij',
      definition: 'Een winkel waar brood en taart gemaakt wordt.',
      exampleSentence: 'We kochten een verjaardagstaart bij de bakkerij.',
    },
    {
      word: 'ingrediënt',
      definition: 'Iets dat je nodig hebt om eten klaar te maken.',
      exampleSentence:
        'Suiker is een belangrijk ingrediënt voor het maken van koekjes.',
    },
    {
      word: 'smaak',
      definition: 'Hoe iets proeft, zoals zoet of zuur.',
      exampleSentence: 'Dit snoepje heeft een hele zoete smaak.',
    },
    {
      word: 'suikerspin',
      definition: 'Luchtige, zoete draadjes suiker op een stokje.',
      exampleSentence: 'Op de kermis kocht ik een grote roze suikerspin.',
    },
    {
      word: 'smullen',
      definition: 'Met veel plezier eten.',
      exampleSentence: 'We gingen lekker smullen van de pannenkoeken.',
    },
  ],
  readingTexts: [
    {
      level: 'short',
      text: 'In de snoepwinkel staan potten vol kleurrijke snoepjes. Er zijn zuurtjes, dropjes en lolly\u2019s.',
      question: 'Wat staat er in de potten?',
      answer: 'Kleurrijke snoepjes',
      wrongAnswers: ['Koekjes', 'Bloemen', 'Speelgoed'],
      statements: [
        { text: 'In de snoepwinkel staan potten.', isTrue: true },
        { text: 'Er zijn zuurtjes, dropjes en lolly\u2019s.', isTrue: true },
        { text: 'De potten staan in een speelgoedwinkel.', isTrue: false },
        { text: 'Er zijn alleen maar dropjes.', isTrue: false },
      ],
    },
    {
      level: 'short',
      text: 'Chocolade wordt gemaakt van cacaobonen. Die groeien aan bomen in warme landen.',
      question: 'Waar wordt chocolade van gemaakt?',
      answer: 'Cacaobonen',
      wrongAnswers: ['Suikerbieten', 'Melk', 'Tarwe'],
      statements: [
        { text: 'Chocolade wordt gemaakt van cacaobonen.', isTrue: true },
        { text: 'Cacaobonen groeien in warme landen.', isTrue: true },
        { text: 'Cacaobonen groeien in koude landen.', isTrue: false },
        { text: 'Chocolade wordt gemaakt van melk.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'Op de kermis maakt de man suikerspinnen. Hij draait een stokje rond in de machine. Langzaam komt er een grote roze wolk van suiker op het stokje. De kinderen vinden het heerlijk.',
      question: 'Welke kleur heeft de suikerspin?',
      answer: 'Roze',
      wrongAnswers: ['Blauw', 'Geel', 'Groen'],
      statements: [
        { text: 'De man maakt suikerspinnen op de kermis.', isTrue: true },
        { text: 'De suikerspin is roze.', isTrue: true },
        { text: 'De suikerspin is blauw.', isTrue: false },
        { text: 'De kinderen vinden het niet lekker.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'In de snoepfabriek worden duizenden snoepjes per dag gemaakt. Eerst worden de ingrediënten gemengd. Daarna worden de snoepjes in vormpjes gedrukt. Tot slot gaan ze in mooie zakjes verpakt.',
      question: 'Waar worden de snoepjes in gedrukt?',
      answer: 'In vormpjes',
      wrongAnswers: ['In doosjes', 'In kopjes', 'In bakjes'],
      statements: [
        {
          text: 'Er worden duizenden snoepjes per dag gemaakt.',
          isTrue: true,
        },
        { text: 'De snoepjes gaan in mooie zakjes verpakt.', isTrue: true },
        {
          text: 'Er worden maar tien snoepjes per dag gemaakt.',
          isTrue: false,
        },
        { text: 'De snoepjes worden in doosjes gedrukt.', isTrue: false },
      ],
    },
  ],
  colors: {
    primary: 'bg-pink-500',
    secondary: 'bg-yellow-400',
    wall: 'bg-pink-700',
    path: 'bg-pink-600',
    player: '👧',
    challenge: '🪅',
  },
  pathChar: '✧',
  friendlies: ['🍩', '🧁', '🍪', '🧇', '🎀', '🍬', '🍭', '🍫', '🍰', '🍡'],
  story: {
    intro:
      "Paniek in Snoepland! De Snoepkoningin is haar feest aan het voorbereiden, maar al haar zoete vriendjes zijn verdwaald in het reusachtige snoeppaleis! Ze zitten verstopt tussen de lolly's, karamels en chocolade. Help de Snoepkoningin om al haar vriendjes te vinden voor het feest begint!",
    friendTexts: [
      'Hoera! Ik zat vast in de karamel, zo plakkerig!',
      "Eindelijk! Ik verdwaalde tussen de reuzenlolly's!",
      'Dankjewel! De chocoladerivier was zo verleidelijk!',
      'Joepie! Nu kan ik mee naar het snoepfeest!',
      'Yes! Ik at bijna alle marshmallows op!',
      'Gelukkig! De zure matten waren te zuur voor mij!',
      'Super! Samen eten we de lekkerste traktaties!',
      'Fijn! Ik was bang dat ik het feest zou missen!',
      'Geweldig! Laten we de anderen ook gaan zoeken!',
      'Wauw, je hebt me gevonden in deze zoete wereld!',
    ],
    endingComplete:
      'SNOEPFEEST! 🍭 Alle zoete vriendjes zijn gevonden en het feest kan beginnen! De Snoepkoningin is dolgelukkig en iedereen smult van de heerlijkste lekkernijen. Jij bent de zoetste held ooit!',
    endingIncomplete:
      'Je verlaat Snoepland... maar niet alle vriendjes zijn op het feest. Ze dwalen nog rond tussen de snoepjes, alleen en verdwaald. 🥺',
    warningLeave:
      'Wacht! Er zijn nog vriendjes verdwaald in Snoepland! Het feest is niet compleet zonder hen. Weet je zeker dat je ze achterlaat?',
  },
};
