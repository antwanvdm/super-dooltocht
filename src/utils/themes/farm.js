export const FARM = {
  id: 'farm',
  name: '🚜 Boerderij',
  emoji: '🚜',
  vocabularyWords: [
    {
      word: 'oogst',
      definition: 'Groenten of fruit van het land halen.',
      exampleSentence: 'In de herfst is het tijd voor de oogst van de appels.',
    },
    {
      word: 'tractor',
      definition: 'Een groot voertuig dat op de boerderij werkt.',
      exampleSentence: 'De boer reed met de tractor over het land.',
    },
    {
      word: 'schuur',
      definition: 'Een groot gebouw op de boerderij om spullen in te bewaren.',
      exampleSentence: 'Het hooi lag opgestapeld in de grote schuur.',
    },
    {
      word: 'weiland',
      definition: 'Een groot grasveld waar dieren lopen.',
      exampleSentence:
        'De koeien stonden rustig te grazen in het groene weiland.',
    },
    {
      word: 'melken',
      definition: 'Melk uit de uier van een koe halen.',
      exampleSentence: 'Elke ochtend gaat de boer de koeien melken.',
    },
    {
      word: 'gewas',
      definition: 'Planten die een boer kweekt, zoals tarwe of mais.',
      exampleSentence:
        'De boer zorgde goed voor zijn gewas zodat het mooi zou groeien.',
    },
    {
      word: 'hooiberg',
      definition: 'Een grote stapel gedroogd gras.',
      exampleSentence: 'De kat verstopte zich boven op de grote hooiberg.',
    },
    {
      word: 'voederbak',
      definition: 'Een bak waar je eten in doet voor de dieren.',
      exampleSentence: 'De kippen kwamen snel naar de voederbak om te eten.',
    },
    {
      word: 'erf',
      definition: 'Het terrein rondom de boerderij.',
      exampleSentence: 'De hond rende vrolijk over het erf van de boerderij.',
    },
    {
      word: 'zaaien',
      definition: 'Zaadjes in de grond stoppen zodat er planten groeien.',
      exampleSentence: 'In het voorjaar gaan we worteltjes zaaien in de tuin.',
    },
  ],
  facts: [
    {
      emoji: '🐄',
      fact: 'Wist je dat een koe elke dag wel 100 liter water drinkt?',
    },
    { emoji: '🐔', fact: 'Wist je dat een kip bijna elke dag een ei legt?' },
    {
      emoji: '🐷',
      fact: 'Wist je dat varkens heel slim zijn en zelfs trucjes kunnen leren?',
    },
    {
      emoji: '🌾',
      fact: 'Wist je dat het graan voor één brood op een stuk land zo groot als een klaslokaal groeit?',
    },
    {
      emoji: '🐑',
      fact: 'Wist je dat de wol van één schaap genoeg is voor een paar truien?',
    },
    {
      emoji: '🥛',
      fact: 'Wist je dat melk goed is voor je botten? Daar worden ze sterk van!',
    },
    {
      emoji: '🐝',
      fact: 'Wist je dat bijen van bloem naar bloem vliegen en zo helpen dat er fruit en groenten groeien?',
    },
    {
      emoji: '🌻',
      fact: 'Wist je dat zonnebloemen altijd naar de zon draaien als ze jong zijn?',
    },
    {
      emoji: '🚜',
      fact: 'Wist je dat een tractor vroeger niet bestond en boeren alles met paarden deden?',
    },
    {
      emoji: '🥚',
      fact: 'Wist je dat bruine en witte eieren even gezond zijn? De kleur komt door het soort kip!',
    },
  ],
  readingTexts: [
    {
      level: 'short',
      text: 'De boer melkt elke ochtend de koeien. Van de melk wordt kaas en boter gemaakt.',
      question: 'Wat wordt er van de melk gemaakt?',
      answer: 'Kaas en boter',
      wrongAnswers: ['Brood en jam', 'Sap en limonade', 'Soep en saus'],
      statements: [
        { text: 'De boer melkt de koeien elke ochtend.', isTrue: true },
        { text: 'Van de melk wordt kaas en boter gemaakt.', isTrue: true },
        { text: 'De boer melkt de koeien \u2019s avonds.', isTrue: false },
        { text: 'Van de melk wordt brood gemaakt.', isTrue: false },
      ],
    },
    {
      level: 'short',
      text: 'De kippen lopen vrij rond op de boerderij. Elke dag leggen ze verse eieren.',
      question: 'Wat leggen de kippen?',
      answer: 'Verse eieren',
      wrongAnswers: ['Kleine steentjes', 'Veertjes', 'Korrels'],
      statements: [
        { text: 'De kippen lopen vrij rond.', isTrue: true },
        { text: 'Ze leggen elke dag eieren.', isTrue: true },
        { text: 'De kippen zitten in een kooi.', isTrue: false },
        { text: 'De kippen leggen elke week één ei.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'Op de boerderij wonen veel dieren. Er zijn koeien, varkens, kippen en schapen. De hond van de boer helpt met het hoeden van de schapen. De kat vangt muizen in de schuur.',
      question: 'Welk dier helpt met de schapen?',
      answer: 'De hond',
      wrongAnswers: ['De kat', 'Het varken', 'De koe'],
      statements: [
        {
          text: 'Er wonen koeien, varkens, kippen en schapen.',
          isTrue: true,
        },
        { text: 'De kat vangt muizen in de schuur.', isTrue: true },
        {
          text: 'De kat helpt met het hoeden van de schapen.',
          isTrue: false,
        },
        { text: 'Er zijn geen varkens op de boerderij.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'In de lente zaait de boer graan op het veld. In de zomer groeit het graan hoog. In de herfst is het graan rijp en wordt het geoogst. Van het graan wordt meel gemaakt voor brood.',
      question: 'Wanneer wordt het graan geoogst?',
      answer: 'In de herfst',
      wrongAnswers: ['In de lente', 'In de zomer', 'In de winter'],
      statements: [
        { text: 'De boer zaait graan in de lente.', isTrue: true },
        { text: 'Van het graan wordt meel gemaakt.', isTrue: true },
        { text: 'Het graan wordt in de zomer geoogst.', isTrue: false },
        { text: 'Van het graan wordt suiker gemaakt.', isTrue: false },
      ],
    },
  ],
  colors: {
    primary: 'bg-amber-600',
    secondary: 'bg-amber-500',
    wall: 'bg-amber-900',
    path: 'bg-amber-700',
    player: '👨‍🌾',
    challenge: '🌾',
  },
  pathChar: '≋',
  friendlies: ['🐄', '🐷', '🐔', '🐑', '🐴', '🦆', '🐐', '🦃', '🐕', '🐈'],
  story: {
    intro:
      'Het hek staat open! Alle boerderijdieren zijn ontsnapt en dwalen nu rond over de velden, in de schuren en tussen het hooi! De boer heeft dringend hulp nodig om alle dieren terug te vinden voordat het donker wordt!',
    friendTexts: [
      'Boe! Moe! Ik verdwaalde tussen het hoge koren!',
      'Eindelijk! De wei was zo groot, ik vond de stal niet meer!',
      'Dankjewel! Ik verstopte me in het hooi maar kon er niet meer uit!',
      'Tok tok! Nu kan ik weer lekker scharrelen op het erf!',
      'Yes! De boer zocht me overal!',
      'Gelukkig! Ik miste mijn warme stal!',
      'Super! Samen gaan we terug naar de boerderij!',
      'Fijn! Het was eenzaam zo alleen in het veld!',
      'Geweldig! Laten we de andere dieren ook vinden!',
      'Wauw, je hebt me gevonden op deze grote boerderij!',
    ],
    endingComplete:
      'BOERDERIJ COMPLEET! 🚜 Alle dieren zijn weer veilig in de stal en op het erf! De boer is dolgelukkig en iedereen krijgt extra voer als beloning. Jij bent de beste boerenhelper!',
    endingIncomplete:
      'Je verlaat de boerderij... maar niet alle dieren zijn terug. Ze dwalen nog steeds rond, ver van hun warme stal. 🥺',
    warningLeave:
      'Wacht! Er zijn nog dieren verdwaald op de boerderij! De boer maakt zich zorgen. Weet je zeker dat je ze achterlaat?',
  },
  music: 'farm',
};
