export const SPACE = {
  id: 'space',
  name: '🚀 Ruimte',
  emoji: '🚀',
  vocabularyWords: [
    {
      word: 'raket',
      definition: 'Een voertuig dat de ruimte in vliegt.',
      exampleSentence: 'De raket vloog met een enorme snelheid de lucht in.',
    },
    {
      word: 'astronaut',
      definition: 'Iemand die naar de ruimte reist.',
      exampleSentence: 'De astronaut zweefde door het ruimtestation.',
    },
    {
      word: 'planeet',
      definition:
        'Een groot rond object dat om een ster draait, zoals de Aarde.',
      exampleSentence: 'De Aarde is de planeet waarop wij wonen.',
    },
    {
      word: 'ster',
      definition: 'Een lichtgevend object aan de hemel, zoals de zon.',
      exampleSentence:
        'In de nacht zie je soms een hele heldere ster aan de hemel.',
    },
    {
      word: 'maan',
      definition: 'Het grote ronde ding dat je s nachts aan de hemel ziet.',
      exampleSentence: 'De maan scheen helder in de donkere nacht.',
    },
    {
      word: 'telescoop',
      definition: 'Een instrument om dingen ver weg dichterbij te zien.',
      exampleSentence: 'Met de telescoop kon ik de planeten goed bekijken.',
    },
    {
      word: 'meteoriet',
      definition: 'Een steen uit de ruimte die naar de aarde valt.',
      exampleSentence: 'De meteoriet vloog als een vuurbal door de lucht.',
    },
    {
      word: 'zwaartekracht',
      definition: 'De kracht die alles naar de grond trekt.',
      exampleSentence:
        'Door de zwaartekracht valt alles naar beneden als je het loslaat.',
    },
    {
      word: 'ruimtestation',
      definition: 'Een groot gebouw in de ruimte waar astronauten wonen.',
      exampleSentence: 'De astronauten wonen en werken in het ruimtestation.',
    },
    {
      word: 'melkweg',
      definition: 'De grote groep sterren waar ons zonnestelsel bij hoort.',
      exampleSentence: 'Ons zonnestelsel is een klein deel van de melkweg.',
    },
  ],
  facts: [
    {
      emoji: '🪐',
      fact: 'Wist je dat Saturnus ringen heeft die gemaakt zijn van ijs en stenen?',
    },
    {
      emoji: '🌍',
      fact: 'Wist je dat de aarde er 365 dagen over doet om één rondje om de zon te draaien?',
    },
    {
      emoji: '🌙',
      fact: 'Wist je dat er op de maan geen wind is, waardoor voetstappen daar voor altijd blijven staan?',
    },
    { emoji: '☀️', fact: 'Wist je dat de zon eigenlijk een enorme ster is?' },
    {
      emoji: '🚀',
      fact: 'Wist je dat astronauten in de ruimte een paar centimeter langer worden?',
    },
    {
      emoji: '⭐',
      fact: 'Wist je dat er meer sterren in het heelal zijn dan zandkorrels op alle stranden van de wereld?',
    },
    {
      emoji: '🔴',
      fact: 'Wist je dat Mars de "rode planeet" wordt genoemd vanwege het roestige stof op het oppervlak?',
    },
    {
      emoji: '🌌',
      fact: 'Wist je dat een dag op Venus langer duurt dan een jaar op Venus?',
    },
    {
      emoji: '🧑‍🚀',
      fact: 'Wist je dat André Kuipers twee keer in de ruimte is geweest?',
    },
    {
      emoji: '🌕',
      fact: 'Wist je dat Jupiter de grootste planeet van ons zonnestelsel is? Er passen wel 1.300 aardes in!',
    },
  ],
  readingTexts: [
    {
      level: 'short',
      text: 'De raket stijgt op van de aarde. Hij vliegt heel snel naar de ruimte.',
      question: 'Waar vliegt de raket naartoe?',
      answer: 'Naar de ruimte',
      wrongAnswers: ['Naar de maan', 'Naar een ander land', 'Naar de zon'],
      statements: [
        { text: 'De raket stijgt op van de aarde.', isTrue: true },
        { text: 'De raket vliegt heel snel.', isTrue: true },
        { text: 'De raket vliegt naar de maan.', isTrue: false },
        { text: 'De raket gaat langzaam.', isTrue: false },
      ],
    },
    {
      level: 'short',
      text: 'De zon is een grote ster. Alle planeten draaien om de zon.',
      question: 'Wat is de zon?',
      answer: 'Een grote ster',
      wrongAnswers: ['Een planeet', 'Een maan', 'Een komeet'],
      statements: [
        { text: 'De zon is een grote ster.', isTrue: true },
        { text: 'Alle planeten draaien om de zon.', isTrue: true },
        { text: 'De zon is een planeet.', isTrue: false },
        { text: 'De zon draait om de aarde.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'De astronaut stapt uit het ruimtestation. Hij zweeft in de ruimte en ziet de aarde onder zich. Het is heel stil buiten het ruimtestation. De aarde ziet er blauw en groen uit.',
      question: 'Welke kleuren heeft de aarde?',
      answer: 'Blauw en groen',
      wrongAnswers: ['Rood en geel', 'Zwart en wit', 'Oranje en paars'],
      statements: [
        { text: 'De astronaut zweeft in de ruimte.', isTrue: true },
        { text: 'Het is heel stil buiten het ruimtestation.', isTrue: true },
        { text: 'De aarde ziet er rood en geel uit.', isTrue: false },
        { text: 'Het is heel luid buiten het ruimtestation.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'Ons zonnestelsel heeft acht planeten. De aarde is de derde planeet vanaf de zon. Mars is de vierde planeet en die is rood. Jupiter is de grootste planeet van allemaal.',
      question: 'Welke planeet is de grootste?',
      answer: 'Jupiter',
      wrongAnswers: ['Mars', 'De aarde', 'De zon'],
      statements: [
        { text: 'Ons zonnestelsel heeft acht planeten.', isTrue: true },
        { text: 'Mars is rood.', isTrue: true },
        { text: 'De aarde is de vierde planeet.', isTrue: false },
        { text: 'Mars is de grootste planeet.', isTrue: false },
      ],
    },
  ],
  colors: {
    primary: 'bg-indigo-900',
    secondary: 'bg-purple-800',
    wall: 'bg-gray-800',
    path: 'bg-indigo-950',
    player: '👨‍🚀',
    challenge: '👽',
  },
  pathChar: '✦',
  friendlies: ['🛸', '🌟', '🌍', '🚀', '☄️', '🌌', '👾', '🛰️', '🪐', '🌠'],
  story: {
    intro:
      'NOODOPROEP uit de ruimte! Een meteorietenregen heeft het ruimteschip geraakt en je vriendjes zijn door het heelal verspreid! Ze zweven verloren tussen de sterren en wachten tot iemand ze vindt. Kun jij door het ruimtestation navigeren en al je vriendjes veilig terugbrengen?',
    friendTexts: [
      'Hoera, je hebt me gevonden! Ik dreef al uren rond tussen de sterren!',
      'Eindelijk! Ik was zo bang dat niemand me zou vinden in deze donkere ruimte!',
      'Jippie! Nu kan ik weer terug naar het ruimteschip!',
      'Dankjewel! Ik zag alleen maar sterren en planeten, maar geen vriendjes!',
      'Yes! Ik wist dat je me zou komen redden, beste astronaut!',
      'Gelukkig! Ik was bijna in een zwart gat gevallen!',
      'Hoera! Samen vliegen we terug naar de aarde!',
      'Super! Ik miste jullie allemaal zo erg hier in de ruimte!',
      'Fantastisch! Laten we de anderen ook snel gaan zoeken!',
      'Wauw, je hebt me gevonden tussen al die meteorieten!',
    ],
    endingComplete:
      'MISSIE GESLAAGD! 🚀 Alle ruimtevriendjes zijn weer veilig aan boord van het ruimteschip! Dankzij jouw moed en slimheid kan de crew nu veilig terug naar de aarde vliegen. Jij bent een echte ruimteheld!',
    endingIncomplete:
      'Je verlaat het ruimtestation... maar niet al je vriendjes zijn gered. Ze zweven nog steeds verloren in de ruimte en hopen dat iemand ze vindt. 🥺',
    warningLeave:
      'Wacht! Er zweven nog vriendjes verloren in de ruimte! Ze rekenen op jou om ze te vinden. Weet je zeker dat je ze achterlaat?',
  },
  music: 'space',
};
