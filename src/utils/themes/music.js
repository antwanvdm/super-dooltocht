export const MUSIC = {
  id: 'music',
  name: '🎵 Muziek',
  emoji: '🎵',
  vocabularyWords: [
    {
      word: 'melodie',
      definition: 'Een reeks noten die samen mooi klinken.',
      exampleSentence:
        'Ik floot een vrolijke melodie terwijl ik naar school liep.',
    },
    {
      word: 'ritme',
      definition: 'De maat of het tempo van de muziek.',
      exampleSentence: 'We klapten mee op het ritme van het liedje.',
    },
    {
      word: 'dirigent',
      definition: 'De persoon die het orkest leidt.',
      exampleSentence:
        'De dirigent zwaaide met zijn stokje en het orkest begon te spelen.',
    },
    {
      word: 'concert',
      definition: 'Een optreden waar muzikanten muziek spelen voor publiek.',
      exampleSentence:
        'We gingen naar een concert en hoorden prachtige muziek.',
    },
    {
      word: 'orkest',
      definition: 'Een grote groep muzikanten die samen muziek maken.',
      exampleSentence:
        'Het orkest speelde een prachtig muziekstuk in de grote zaal.',
    },
    {
      word: 'componist',
      definition: 'Iemand die muziek bedenkt en opschrijft.',
      exampleSentence: 'De componist schreef een nieuw lied voor het koor.',
    },
    {
      word: 'refrein',
      definition: 'Het deel van een lied dat steeds terugkomt.',
      exampleSentence:
        'Het refrein van dit liedje is zo leuk dat iedereen meezingt.',
    },
    {
      word: 'toonladder',
      definition: 'Een rij noten die steeds hoger of lager gaan.',
      exampleSentence: 'Op muziekles oefenden we de toonladder op de piano.',
    },
    {
      word: 'stemmen',
      definition: 'Een instrument zo afstellen dat het mooi klinkt.',
      exampleSentence:
        'Voor het concert moest de gitaar eerst gestemd worden, dat heet stemmen.',
    },
    {
      word: 'optreden',
      definition: 'Muziek maken of toneel spelen voor publiek.',
      exampleSentence:
        'We gaan morgen optreden op het schoolfeest met ons bandje.',
    },
  ],
  readingTexts: [
    {
      level: 'short',
      text: 'De gitaar heeft zes snaren. Als je aan de snaren tokkelt, hoor je muziek.',
      question: 'Hoeveel snaren heeft de gitaar?',
      answer: 'Zes',
      wrongAnswers: ['Vier', 'Acht', 'Tien'],
      statements: [
        { text: 'De gitaar heeft zes snaren.', isTrue: true },
        {
          text: 'Je kunt muziek maken door aan de snaren te tokkelen.',
          isTrue: true,
        },
        { text: 'De gitaar heeft acht snaren.', isTrue: false },
        {
          text: 'Je moet op de gitaar blazen om muziek te maken.',
          isTrue: false,
        },
      ],
    },
    {
      level: 'short',
      text: 'Het schoolkoor oefent een liedje voor het kerstfeest. Ze zingen heel mooi samen.',
      question: 'Waarvoor oefent het koor?',
      answer: 'Voor het kerstfeest',
      wrongAnswers: [
        'Voor een verjaardag',
        'Voor de meester',
        'Voor een wedstrijd',
      ],
      statements: [
        { text: 'Het schoolkoor oefent een liedje.', isTrue: true },
        { text: 'Ze zingen samen.', isTrue: true },
        { text: 'Het koor oefent voor een verjaardag.', isTrue: false },
        { text: 'Ze zingen elk alleen.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'Lisa leert blokfluit spelen op school. Ze oefent elke dag thuis. Eerst speelde ze alleen losse noten. Nu kan ze al een heel liedje spelen.',
      question: 'Welk instrument leert Lisa?',
      answer: 'Blokfluit',
      wrongAnswers: ['Gitaar', 'Piano', 'Viool'],
      statements: [
        { text: 'Lisa oefent elke dag thuis.', isTrue: true },
        { text: 'Nu kan Lisa al een heel liedje spelen.', isTrue: true },
        { text: 'Lisa leert piano spelen.', isTrue: false },
        { text: 'Lisa oefent alleen op school.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'In het orkest spelen veel muzikanten samen. Er zijn strijkinstrumenten zoals de viool. Er zijn blaasinstrumenten zoals de trompet. De dirigent staat vooraan en geeft de maat aan.',
      question: 'Wie geeft de maat aan?',
      answer: 'De dirigent',
      wrongAnswers: ['De violist', 'De trompettist', 'De drummer'],
      statements: [
        { text: 'In het orkest spelen veel muzikanten samen.', isTrue: true },
        { text: 'De dirigent staat vooraan.', isTrue: true },
        { text: 'De dirigent speelt de trompet.', isTrue: false },
        {
          text: 'Er zijn alleen strijkinstrumenten in het orkest.',
          isTrue: false,
        },
      ],
    },
  ],
  colors: {
    primary: 'bg-violet-600',
    secondary: 'bg-fuchsia-500',
    wall: 'bg-violet-900',
    path: 'bg-violet-700',
    player: '🎤',
    challenge: '🎼',
  },
  pathChar: '♪',
  friendlies: ['🎸', '🥁', '🎹', '🎺', '🎻', '🎷', '🎤', '🪗', '🪕', '🪈'],
  story: {
    intro:
      'Stilte in de concertzaal! Het grote concert begint zo, maar alle instrumenten zijn zoekgeraakt in het muziekgebouw! Ze liggen verspreid in kleedkamers, oefenruimtes en backstage. Vind alle instrumenten zodat het orkest kan spelen!',
    friendTexts: [
      'La la la! Ik was mijn toonladders aan het oefenen!',
      'Eindelijk! De concertzaal is zo groot, ik raakte verdwaald!',
      'Dankjewel! Mijn snaren moeten nog gestemd worden!',
      'Hoera! Nu kan ik meedoen met het concert!',
      'Yes! De dirigent zocht me overal!',
      'Gelukkig! Ik miste mijn plekje in het orkest!',
      'Super! Samen maken we de mooiste muziek!',
      'Fijn! Het was zo stil zonder de andere instrumenten!',
      'Geweldig! Laten we de rest van het orkest vinden!',
      'Wauw, je hebt me gevonden in dit muziekpaleis!',
    ],
    endingComplete:
      'APPLAUS! 🎵 Alle instrumenten zijn gevonden en het concert is een daverend succes! Het publiek klapt, juicht en vraagt om een toegift. Jij bent een echte muziekheld!',
    endingIncomplete:
      'Het concert begint... maar niet alle instrumenten zijn er. De muziek klinkt onvolledig en het publiek is teleurgesteld. 🥺',
    warningLeave:
      'Wacht! Er zijn nog instrumenten zoek in het muziekgebouw! Het concert kan niet zonder hen. Weet je zeker dat je ze achterlaat?',
  },
};
