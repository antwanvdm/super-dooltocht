export const CASTLE = {
  id: 'castle',
  name: '🏰 Kasteel',
  emoji: '🏰',
  vocabularyWords: [
    {
      word: 'ridder',
      definition: 'Een dappere strijder die een harnas draagt.',
      exampleSentence:
        'De dappere ridder reed op zijn paard naar het kasteel.',
    },
    {
      word: 'toren',
      definition: 'Een hoog, smal gebouw, vaak op de hoek van een kasteel.',
      exampleSentence:
        'De prinses zwaaide vanuit de hoge toren van het kasteel.',
    },
    {
      word: 'slotgracht',
      definition: 'Het water rondom een kasteel.',
      exampleSentence:
        'Rondom het kasteel lag een brede slotgracht vol water.',
    },
    {
      word: 'ophaalbrug',
      definition: 'Een brug die je omhoog kunt trekken.',
      exampleSentence:
        'De ophaalbrug ging omhoog zodat niemand het kasteel in kon.',
    },
    {
      word: 'troon',
      definition: 'De speciale stoel van een koning of koningin.',
      exampleSentence: 'De koning zat op zijn gouden troon in de grote zaal.',
    },
    {
      word: 'harnas',
      definition: 'Een ijzeren pak dat ridders beschermt.',
      exampleSentence:
        'De ridder trok zijn zware harnas aan voor het gevecht.',
    },
    {
      word: 'kerker',
      definition: 'Een donkere gevangenis onder het kasteel.',
      exampleSentence:
        'De boef werd opgesloten in de donkere kerker onder het kasteel.',
    },
    {
      word: 'schild',
      definition: 'Iets dat je vasthoudt om je te beschermen in een gevecht.',
      exampleSentence:
        'De ridder hield zijn schild omhoog om zich te beschermen.',
    },
    {
      word: 'tovenaar',
      definition: 'Iemand die toverspreuken kan doen.',
      exampleSentence:
        'De tovenaar sprak een toverspreuk uit en alles veranderde.',
    },
    {
      word: 'draak',
      definition: 'Een groot fantasiedier dat vuur kan spuwen.',
      exampleSentence: 'De draak spuwde vuur en vloog boven het kasteel.',
    },
  ],
  readingTexts: [
    {
      level: 'short',
      text: 'De ridder draagt een glimmend harnas. Hij rijdt op zijn witte paard.',
      question: 'Wat draagt de ridder?',
      answer: 'Een glimmend harnas',
      wrongAnswers: [
        'Een gouden kroon',
        'Een rode mantel',
        'Een zilveren helm',
      ],
      statements: [
        { text: 'De ridder draagt een glimmend harnas.', isTrue: true },
        { text: 'Hij rijdt op een wit paard.', isTrue: true },
        { text: 'De ridder rijdt op een zwart paard.', isTrue: false },
        { text: 'De ridder draagt een kroon.', isTrue: false },
      ],
    },
    {
      level: 'short',
      text: 'De ophaalbrug gaat omhoog. Nu kan niemand het kasteel binnenkomen.',
      question: 'Wat gaat er omhoog?',
      answer: 'De ophaalbrug',
      wrongAnswers: ['De toren', 'De vlag', 'Het raam'],
      statements: [
        { text: 'De ophaalbrug gaat omhoog.', isTrue: true },
        { text: 'Niemand kan het kasteel binnenkomen.', isTrue: true },
        { text: 'De ophaalbrug gaat naar beneden.', isTrue: false },
        { text: 'Iedereen kan het kasteel in.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'De prinses woont in de hoogste toren van het kasteel. Elke ochtend kijkt ze uit het raam over het land. Ze ziet de boeren op het veld werken. Vandaag ziet ze ook een ridder op een paard aankomen.',
      question: 'Waar woont de prinses?',
      answer: 'In de hoogste toren',
      wrongAnswers: ['In de kelder', 'In de tuin', 'In de ridderzaal'],
      statements: [
        { text: 'De prinses woont in de hoogste toren.', isTrue: true },
        { text: 'Ze ziet de boeren op het veld werken.', isTrue: true },
        { text: 'De prinses woont in de kelder.', isTrue: false },
        { text: 'Vandaag ziet ze een draak aankomen.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'Het is feest in het kasteel. De koning heeft een groot banket laten klaarmaken. Er is soep, vlees en taart. Alle ridders en prinsessen zijn uitgenodigd voor het feest.',
      question: 'Wie heeft het banket laten klaarmaken?',
      answer: 'De koning',
      wrongAnswers: ['De prinses', 'De ridder', 'De kok'],
      statements: [
        {
          text: 'De koning heeft een groot banket laten klaarmaken.',
          isTrue: true,
        },
        { text: 'Er is soep, vlees en taart.', isTrue: true },
        { text: 'Alleen de ridders zijn uitgenodigd.', isTrue: false },
        { text: 'Het feest is in de tuin.', isTrue: false },
      ],
    },
  ],
  colors: {
    primary: 'bg-stone-600',
    secondary: 'bg-amber-700',
    wall: 'bg-stone-800',
    path: 'bg-stone-700',
    player: '🤴',
    challenge: '🐉',
  },
  pathChar: '◆',
  friendlies: ['🦉', '🐈', '🐭', '🦔', '🐇', '🦊', '🦄', '🐲', '🦅', '🦢'],
  story: {
    intro:
      'Alarm in het kasteel! Een ondeugende tovenaar heeft een spreuk uitgesproken en al je vriendjes zijn verstopt in de geheime gangen van het kasteel! Ze kunnen de uitgang niet meer vinden. Doorzoek alle torens en gangen om je vriendjes te bevrijden!',
    friendTexts: [
      'Hoera, de spreuk is verbroken! Ik zat vast in deze toren!',
      'Eindelijk! Het was zo donker en eng in deze gang!',
      'Dankjewel! Ik hoorde steeds vreemde geluiden!',
      'Joepie! De tovenaar had me goed verstopt!',
      'Yes! Nu kan ik weer spelen in de troonzaal!',
      'Gelukkig! Ik miste de andere kasteelbewoners!',
      'Super! Samen verslaan we de tovenaar!',
      'Fijn! Ik was bang voor de spoken in het kasteel!',
      'Geweldig! Laten we de anderen ook bevrijden!',
      'Wauw, je hebt me gevonden in dit doolhof van gangen!',
    ],
    endingComplete:
      'KASTEEL BEVRIJD! 🏰 Alle vriendjes zijn weer veilig en de tovenaar is verslagen! Het kasteel is weer vrolijk en iedereen viert feest in de grote zaal. Jij bent een echte ridder!',
    endingIncomplete:
      'Je verlaat het kasteel... maar sommige vriendjes zitten nog steeds gevangen in de geheime gangen. De tovenaar grinnikt... 🥺',
    warningLeave:
      'Wacht! Er zitten nog vriendjes gevangen in het kasteel! De tovenaar houdt ze verborgen. Weet je zeker dat je ze achterlaat?',
  },
};
