export const JUNGLE = {
  id: 'jungle',
  name: '🦁 Jungle',
  emoji: '🦁',
  vocabularyWords: [
    {
      word: 'oerwoud',
      definition: 'Een heel dicht bos met veel bomen en planten.',
      exampleSentence:
        'In het oerwoud groeien heel veel bomen dicht bij elkaar.',
    },
    {
      word: 'liaan',
      definition: 'Een lange slingerende plant in het oerwoud.',
      exampleSentence: 'De aap slingerde van liaan naar liaan door het bos.',
    },
    {
      word: 'waterval',
      definition: 'Water dat van een hoge rots naar beneden valt.',
      exampleSentence:
        'Het water stortte van de hoge rots naar beneden als een waterval.',
    },
    {
      word: 'kameleon',
      definition: 'Een dier dat van kleur kan veranderen.',
      exampleSentence:
        'De kameleon werd groen toen hij op een blad ging zitten.',
    },
    {
      word: 'roofvogel',
      definition: 'Een vogel die andere dieren vangt om te eten.',
      exampleSentence:
        'De roofvogel vloog hoog in de lucht en zocht naar eten.',
    },
    {
      word: 'tropisch',
      definition: 'Warm en vochtig, zoals het weer in de jungle.',
      exampleSentence:
        'In de jungle is het altijd warm en vochtig, dat noemen we tropisch weer.',
    },
    {
      word: 'camouflage',
      definition:
        'Je verstoppen door dezelfde kleur als je omgeving te hebben.',
      exampleSentence:
        'Het dier had dezelfde kleur als de bladeren, dat is camouflage.',
    },
    {
      word: 'stammen',
      definition: 'De dikke delen van bomen waar de takken uit groeien.',
      exampleSentence:
        'De stammen van de bomen waren zo dik dat je er niet omheen kon.',
    },
    {
      word: 'roofdier',
      definition: 'Een dier dat andere dieren jaagt en opeet.',
      exampleSentence: 'De tijger is een roofdier dat andere dieren vangt.',
    },
    {
      word: 'ontdekken',
      definition: 'Iets vinden dat je nog niet kende.',
      exampleSentence: 'We gingen het bos in om nieuwe planten te ontdekken.',
    },
  ],
  readingTexts: [
    {
      level: 'short',
      text: 'De papegaai zit hoog in de boom. Hij heeft prachtige rode en blauwe veren.',
      question: 'Welke kleuren heeft de papegaai?',
      answer: 'Rood en blauw',
      wrongAnswers: ['Groen en geel', 'Zwart en wit', 'Oranje en paars'],
      statements: [
        { text: 'De papegaai zit hoog in de boom.', isTrue: true },
        { text: 'Hij heeft rode en blauwe veren.', isTrue: true },
        { text: 'De papegaai zit op de grond.', isTrue: false },
        { text: 'De papegaai heeft groene en gele veren.', isTrue: false },
      ],
    },
    {
      level: 'short',
      text: 'De aap slingert van tak naar tak. Hij zoekt bananen om te eten.',
      question: 'Wat zoekt de aap?',
      answer: 'Bananen',
      wrongAnswers: ['Noten', 'Bladeren', 'Insecten'],
      statements: [
        { text: 'De aap slingert van tak naar tak.', isTrue: true },
        { text: 'De aap zoekt bananen.', isTrue: true },
        { text: 'De aap zit stil in de boom.', isTrue: false },
        { text: 'De aap zoekt noten.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'Diep in de jungle stroomt een grote rivier. Bij de waterval spelen de apen in het water. Er groeien hoge bomen met lianen. De toekan vliegt van boom naar boom met zijn grote snavel.',
      question: 'Welke vogel vliegt van boom naar boom?',
      answer: 'De toekan',
      wrongAnswers: ['De papegaai', 'De uil', 'De adelaar'],
      statements: [
        { text: 'Er stroomt een grote rivier in de jungle.', isTrue: true },
        { text: 'De toekan vliegt van boom naar boom.', isTrue: true },
        { text: 'De papegaai vliegt van boom naar boom.', isTrue: false },
        { text: 'Er groeien lage struiken in de jungle.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'De kameleon zit op een groen blad. Hij verandert van kleur zodat hij niet gezien wordt. Zo kan hij insecten vangen zonder dat ze hem zien. De kameleon is een slim dier.',
      question: 'Waarom verandert de kameleon van kleur?',
      answer: 'Zodat hij niet gezien wordt',
      wrongAnswers: [
        'Omdat hij het koud heeft',
        'Omdat hij boos is',
        'Omdat hij honger heeft',
      ],
      statements: [
        { text: 'De kameleon zit op een groen blad.', isTrue: true },
        { text: 'De kameleon vangt insecten.', isTrue: true },
        {
          text: 'De kameleon verandert van kleur omdat hij boos is.',
          isTrue: false,
        },
        { text: 'De kameleon eet planten.', isTrue: false },
      ],
    },
  ],
  colors: {
    primary: 'bg-green-700',
    secondary: 'bg-green-600',
    wall: 'bg-green-900',
    path: 'bg-green-800',
    player: '🧒',
    challenge: '🐒',
  },
  pathChar: '✿',
  friendlies: ['🦜', '🐘', '🦋', '🐸', '🐰', '🦁', '🦅', '🦧', '🦓', '🦥'],
  story: {
    intro:
      'Help! Een grote storm heeft door de jungle geraasd en je diervriendjes zijn verdwaald in het dichte oerwoud! Ze zitten verstopt tussen de bomen en struiken en durven niet alleen verder. Trek de jungle in en breng al je vriendjes veilig terug naar de open plek!',
    friendTexts: [
      'Oef, gelukkig! Ik zat helemaal vast tussen de takken!',
      'Joehoe! Ik hoorde de apen, maar kon de weg niet meer vinden!',
      'Dankjewel! Het was zo donker hier tussen de grote bomen!',
      'Eindelijk een vriendelijk gezicht! De jungle is zo groot!',
      'Hoera! Ik was bang voor de geluiden in het oerwoud!',
      'Yes! Nu kan ik weer spelen bij de waterval!',
      'Fijn! Ik miste het zonlicht en mijn vriendjes!',
      'Super! Samen zijn we sterker in de jungle!',
      'Geweldig! Laten we de anderen ook gaan zoeken!',
      'Wauw, je hebt me gevonden tussen al die planten!',
    ],
    endingComplete:
      'JUNGLE AVONTUUR VOLTOOID! 🦁 Alle diervriendjes zijn weer veilig samen op de open plek! De zon schijnt, de vogels fluiten en iedereen is weer herenigd. Jij bent een echte jungle-ontdekker!',
    endingIncomplete:
      'Je verlaat de jungle... maar sommige vriendjes zijn nog steeds verdwaald tussen de bomen. Ze wachten nog steeds tot iemand ze vindt. 🥺',
    warningLeave:
      'Wacht! Er zitten nog vriendjes verstopt in de jungle! Ze zijn bang en alleen. Weet je zeker dat je ze achterlaat?',
  },
};
