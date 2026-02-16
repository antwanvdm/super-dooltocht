export const TRAFFIC = {
  id: 'traffic',
  name: '🚲 Verkeer',
  emoji: '🚲',
  vocabularyWords: [
    {
      word: 'kruispunt',
      definition: 'Een plek waar twee of meer wegen elkaar kruisen.',
      exampleSentence:
        "Op het kruispunt moest ik goed uitkijken voor auto's.",
    },
    {
      word: 'stoplicht',
      definition:
        'Een lamp die met rood, oranje en groen aangeeft of je mag rijden.',
      exampleSentence: 'Het stoplicht stond op rood, dus we moesten wachten.',
    },
    {
      word: 'rotonde',
      definition: 'Een rond kruispunt waar je in een cirkel rijdt.',
      exampleSentence:
        'Papa reed drie keer rond over de rotonde omdat hij de afslag miste.',
    },
    {
      word: 'voetganger',
      definition: 'Iemand die loopt in het verkeer.',
      exampleSentence:
        'Als voetganger moet je goed uitkijken als je de straat oversteekt.',
    },
    {
      word: 'voorrang',
      definition: 'Wanneer jij eerst mag rijden of lopen.',
      exampleSentence:
        'De auto van rechts heeft voorrang, dus wij moeten wachten.',
    },
    {
      word: 'zebrapad',
      definition: 'Witte strepen op de weg waar je veilig kunt oversteken.',
      exampleSentence:
        'Ik stak de straat over bij het zebrapad met de witte strepen.',
    },
    {
      word: 'helm',
      definition: 'Een harde hoed die je hoofd beschermt.',
      exampleSentence: 'Vergeet je helm niet als je op de fiets stapt!',
    },
    {
      word: 'snelweg',
      definition: "Een brede weg waar auto's hard mogen rijden.",
      exampleSentence:
        "Op de snelweg rijden de auto's veel harder dan in de stad.",
    },
    {
      word: 'parkeren',
      definition: 'Je auto of fiets ergens neerzetten.',
      exampleSentence: 'We moesten lang zoeken naar een plek om te parkeren.',
    },
    {
      word: 'verkeersbord',
      definition: 'Een bord langs de weg met regels of informatie.',
      exampleSentence:
        'Het verkeersbord liet zien dat we maar 30 mochten rijden.',
    },
  ],
  readingTexts: [
    {
      level: 'short',
      text: 'Het stoplicht springt op rood. Alle auto\u2019s moeten stoppen en wachten.',
      question: 'Wat moeten de auto\u2019s doen bij rood?',
      answer: 'Stoppen en wachten',
      wrongAnswers: ['Doorrijden', 'Langzaam rijden', 'Toeteren'],
      statements: [
        { text: 'Het stoplicht springt op rood.', isTrue: true },
        { text: 'Alle auto\u2019s moeten stoppen.', isTrue: true },
        { text: 'Het stoplicht springt op groen.', isTrue: false },
        { text: 'De auto\u2019s mogen doorrijden bij rood.', isTrue: false },
      ],
    },
    {
      level: 'short',
      text: 'Bij het zebrapad steekt Liam de straat over. Hij kijkt eerst links en dan rechts.',
      question: 'Waar steekt Liam over?',
      answer: 'Bij het zebrapad',
      wrongAnswers: ['Bij het stoplicht', 'Op de snelweg', 'Bij de rotonde'],
      statements: [
        { text: 'Liam steekt over bij het zebrapad.', isTrue: true },
        { text: 'Hij kijkt eerst links en dan rechts.', isTrue: true },
        { text: 'Liam steekt over bij het stoplicht.', isTrue: false },
        { text: 'Liam kijkt niet voor hij oversteekt.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'Elke dag fietst Noor naar school. Ze draagt altijd haar fietshelm. Bij het kruispunt steekt ze voorzichtig over. De school is maar vijf minuten fietsen van haar huis.',
      question: 'Wat draagt Noor altijd?',
      answer: 'Haar fietshelm',
      wrongAnswers: ['Een regenjas', 'Een sjaal', 'Handschoenen'],
      statements: [
        { text: 'Noor fietst elke dag naar school.', isTrue: true },
        {
          text: 'De school is vijf minuten fietsen van haar huis.',
          isTrue: true,
        },
        { text: 'Noor loopt elke dag naar school.', isTrue: false },
        { text: 'De school is twintig minuten fietsen.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'Er zijn verschillende soorten wegen. In de stad zijn er brede straten met stoplichten. In het dorp zijn er smalle weggetjes. Op de snelweg mogen alleen auto\u2019s rijden, geen fietsers.',
      question: 'Wie mag er niet op de snelweg?',
      answer: 'Fietsers',
      wrongAnswers: ['Auto\u2019s', 'Vrachtwagens', 'Bussen'],
      statements: [
        {
          text: 'In de stad zijn er brede straten met stoplichten.',
          isTrue: true,
        },
        { text: 'Op de snelweg mogen geen fietsers rijden.', isTrue: true },
        { text: 'In het dorp zijn er brede straten.', isTrue: false },
        { text: 'Fietsers mogen ook op de snelweg.', isTrue: false },
      ],
    },
  ],
  colors: {
    primary: 'bg-slate-600',
    secondary: 'bg-slate-500',
    wall: 'bg-slate-800',
    path: 'bg-slate-700',
    player: '🚶',
    challenge: '🚦',
  },
  pathChar: '═',
  friendlies: ['🚗', '🚌', '🚲', '🚁', '🛵', '🛬', '🚤', '🚂', '🚄', '🛴'],
  story: {
    intro:
      'Verkeerschaos! Een grote file heeft alle voertuigen door de hele stad verspreid! Je voertuigvriendjes staan vast op kruispunten, in tunnels en op rotondes. Navigeer door het verkeer en breng alle voertuigen veilig naar de grote garage!',
    friendTexts: [
      'Toet toet! Ik stond al uren vast bij het stoplicht!',
      'Eindelijk! Deze rotonde maakte me duizelig!',
      'Dankjewel! De tunnel was zo donker en eng!',
      'Hoera! Nu kan ik weer scheuren over de weg!',
      'Yes! Het verkeer was zo druk, ik kon nergens heen!',
      'Gelukkig! Mijn motor begon al te sputteren!',
      'Super! Samen rijden we naar de finish!',
      'Fijn! Ik miste mijn plek in de garage!',
      'Geweldig! Laten we de anderen uit de file halen!',
      'Wauw, je hebt me gevonden in al dit verkeer!',
    ],
    endingComplete:
      'GROEN LICHT! 🚲 Alle voertuigen zijn veilig in de garage! De wegen zijn weer vrij en iedereen toetert van blijdschap. Jij bent de beste verkeersagent!',
    endingIncomplete:
      'Je verlaat de stad... maar sommige voertuigen staan nog steeds vast in het verkeer. Ze wachten nog steeds op hulp. 🥺',
    warningLeave:
      'Wacht! Er staan nog voertuigen vast in het verkeer! Ze kunnen nergens heen zonder jouw hulp. Weet je zeker dat je ze achterlaat?',
  },
};
