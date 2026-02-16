export const OCEAN = {
  id: 'ocean',
  name: '🌊 Oceaan',
  emoji: '🌊',
  vocabularyWords: [
    {
      word: 'koraal',
      definition: 'Kleurrijke dieren op de zeebodem die op planten lijken.',
      exampleSentence:
        'Tussen het kleurrijke koraal zwommen veel kleine visjes.',
    },
    {
      word: 'getij',
      definition: 'Het stijgen en dalen van het water in de zee.',
      exampleSentence: 'Door het getij is de zee soms hoog en soms laag.',
    },
    {
      word: 'duiken',
      definition: 'Onder water zwemmen.',
      exampleSentence: 'We gingen duiken om de vissen onder water te bekijken.',
    },
    {
      word: 'zeewier',
      definition: 'Planten die in de zee groeien.',
      exampleSentence:
        'Er zat een lange sliert zeewier om mijn been gewikkeld.',
    },
    {
      word: 'stroming',
      definition: 'Water dat in een bepaalde richting beweegt.',
      exampleSentence:
        'De stroming in de zee was zo sterk dat we werden meegetrokken.',
    },
    {
      word: 'schelp',
      definition: 'Het harde huisje van een zeedier.',
      exampleSentence: 'Ik vond een mooie schelp op het strand.',
    },
    {
      word: 'diepzee',
      definition: 'Het allerdiepste deel van de oceaan.',
      exampleSentence:
        'In de diepzee is het helemaal donker en leven rare vissen.',
    },
    {
      word: 'walvis',
      definition: 'Het grootste dier ter wereld dat in de zee leeft.',
      exampleSentence: 'De grote walvis spoot water uit zijn blaasgat.',
    },
    {
      word: 'golven',
      definition: 'Het op en neer bewegen van het water in de zee.',
      exampleSentence: 'De golven sloegen tegen de rotsen aan het strand.',
    },
    {
      word: 'zeebodem',
      definition: 'De grond helemaal onder in de zee.',
      exampleSentence: 'Op de zeebodem lagen schelpen en zeesterren.',
    },
  ],
  readingTexts: [
    {
      level: 'short',
      text: 'De dolfijn springt hoog uit het water. Hij is het snelste dier in de zee.',
      question: 'Welk dier springt uit het water?',
      answer: 'De dolfijn',
      wrongAnswers: ['De walvis', 'De haai', 'De zeehond'],
      statements: [
        { text: 'De dolfijn springt hoog uit het water.', isTrue: true },
        { text: 'De dolfijn is het snelste dier in de zee.', isTrue: true },
        { text: 'De walvis springt uit het water.', isTrue: false },
        { text: 'De dolfijn is het langzaamste dier.', isTrue: false },
      ],
    },
    {
      level: 'short',
      text: 'Op de zeebodem groeit een prachtig koraalrif. Er zwemmen veel kleurrijke vissen.',
      question: 'Wat groeit op de zeebodem?',
      answer: 'Een koraalrif',
      wrongAnswers: ['Bomen', 'Bloemen', 'Gras'],
      statements: [
        { text: 'Op de zeebodem groeit een koraalrif.', isTrue: true },
        { text: 'Er zwemmen veel kleurrijke vissen.', isTrue: true },
        { text: 'Op de zeebodem groeien bomen.', isTrue: false },
        { text: 'Er zwemmen geen vissen bij het rif.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'De duiker zwemt onder water met een grote zeeschildpad. Ze zwemmen langs het koraalrif. Er zijn gele, blauwe en oranje vissen te zien. De zeeschildpad is al meer dan vijftig jaar oud.',
      question: 'Hoe oud is de zeeschildpad?',
      answer: 'Meer dan vijftig jaar',
      wrongAnswers: ['Tien jaar', 'Vijf jaar', 'Honderd jaar'],
      statements: [
        { text: 'De duiker zwemt met een zeeschildpad.', isTrue: true },
        {
          text: 'Er zijn gele, blauwe en oranje vissen te zien.',
          isTrue: true,
        },
        { text: 'De zeeschildpad is tien jaar oud.', isTrue: false },
        { text: 'De duiker zwemt alleen.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'De walvis is het grootste dier ter wereld. Hij leeft in de oceaan en eet kleine diertjes. Baby walvissen zwemmen dicht bij hun moeder. De walvis kan heel diep duiken.',
      question: 'Wat eet de walvis?',
      answer: 'Kleine diertjes',
      wrongAnswers: ['Grote vissen', 'Zeewier', 'Koraal'],
      statements: [
        { text: 'De walvis is het grootste dier ter wereld.', isTrue: true },
        {
          text: 'Baby walvissen zwemmen dicht bij hun moeder.',
          isTrue: true,
        },
        { text: 'De walvis eet grote vissen.', isTrue: false },
        { text: 'De walvis leeft in een rivier.', isTrue: false },
      ],
    },
  ],
  colors: {
    primary: 'bg-blue-600',
    secondary: 'bg-cyan-500',
    wall: 'bg-blue-900',
    path: 'bg-blue-700',
    player: '🤿',
    challenge: '🐠',
  },
  pathChar: '~',
  friendlies: ['🐙', '🦀', '🐬', '🦭', '🐚', '🦈', '🐳', '🦑', '🐡', '🪸'],
  story: {
    intro:
      'SOS vanuit de diepzee! Een sterke stroming heeft je onderwatervriendjes meegevoerd naar alle hoeken van de oceaan! Ze zitten verstopt tussen het koraal en de zeeplanten. Duik de zee in en breng al je vriendjes weer veilig naar de onderwatergrot!',
    friendTexts: [
      'Blub blub! Eindelijk! Ik zwom al rondjes tussen het koraal!',
      'Joepie! De stroming was zo sterk, ik kon niet meer terug!',
      'Dankjewel! Ik verstopte me voor een grote vis!',
      'Hoera! Het is zo donker hier op de zeebodem!',
      'Yes! Nu kan ik weer zwemmen met mijn vriendjes!',
      'Gelukkig! Ik miste de warme wateren bij de grot!',
      'Super! Samen maken we de mooiste bubbels!',
      'Fijn! Ik was een beetje bang voor de haaien!',
      'Geweldig! Laten we de anderen ook gaan redden!',
      'Wauw, je hebt me gevonden in deze diepe zee!',
    ],
    endingComplete:
      'DUIKMISSIE GESLAAGD! 🌊 Alle zeevriendjes zijn weer veilig samen in de onderwatergrot! De vissen zwemmen vrolijk rond en het koraal gloeit prachtig. Jij bent een echte oceaanheld!',
    endingIncomplete:
      'Je zwemt naar de oppervlakte... maar niet alle vriendjes zijn gered. Ze zwemmen nog steeds verloren door de oceaan. 🥺',
    warningLeave:
      'Wacht! Er zwemmen nog vriendjes verloren in de oceaan! Ze wachten op hulp. Weet je zeker dat je ze achterlaat?',
  },
};
