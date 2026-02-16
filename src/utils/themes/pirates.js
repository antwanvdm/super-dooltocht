export const PIRATES = {
  id: 'pirates',
  name: '🏴‍☠️ Piraten',
  emoji: '🏴‍☠️',
  vocabularyWords: [
    {
      word: 'schatkist',
      definition: 'Een kist vol goud en juwelen.',
      exampleSentence:
        'De piraat groef een schatkist vol goud op uit het zand.',
    },
    {
      word: 'kompas',
      definition: 'Een instrument dat laat zien waar het noorden is.',
      exampleSentence:
        'Met het kompas konden we zien welke kant het noorden was.',
    },
    {
      word: 'bemanning',
      definition: 'Alle mensen die op een schip werken.',
      exampleSentence:
        'De bemanning van het schip werkte hard om de zeilen te hijsen.',
    },
    {
      word: 'eiland',
      definition: 'Een stuk land met water eromheen.',
      exampleSentence:
        'We voeren met de boot naar een klein eiland midden in de zee.',
    },
    {
      word: 'kapitein',
      definition: 'De baas op een schip.',
      exampleSentence:
        'De kapitein stond achter het stuur en gaf bevelen aan de bemanning.',
    },
    {
      word: 'anker',
      definition: 'Een zwaar stuk ijzer dat een schip op zijn plek houdt.',
      exampleSentence:
        'We gooiden het anker uit zodat het schip niet weg zou drijven.',
    },
    {
      word: 'schatkaart',
      definition: 'Een kaart die laat zien waar de schat begraven is.',
      exampleSentence:
        'Op de schatkaart stond een kruis waar de schat begraven lag.',
    },
    {
      word: 'verrekijker',
      definition: 'Een instrument om dingen ver weg dichterbij te zien.',
      exampleSentence:
        'De piraat keek door de verrekijker en zag land in de verte.',
    },
    {
      word: 'zeilen',
      definition: 'Met een boot varen door de wind te gebruiken.',
      exampleSentence:
        'We gingen zeilen op de grote zee met de wind in de rug.',
    },
    {
      word: 'buit',
      definition: 'Spullen die piraten stelen.',
      exampleSentence:
        'De piraten verdeelden de buit na hun avontuur op zee.',
    },
  ],
  readingTexts: [
    {
      level: 'short',
      text: 'De piraat kijkt door zijn verrekijker. In de verte ziet hij een eiland.',
      question: 'Wat ziet de piraat?',
      answer: 'Een eiland',
      wrongAnswers: ['Een schip', 'Een walvis', 'Een storm'],
      statements: [
        { text: 'De piraat gebruikt een verrekijker.', isTrue: true },
        { text: 'Hij ziet een eiland in de verte.', isTrue: true },
        { text: 'De piraat ziet een ander schip.', isTrue: false },
        { text: 'Het eiland is heel dichtbij.', isTrue: false },
      ],
    },
    {
      level: 'short',
      text: 'Op de schatkaart staat een kruis. Daar ligt de schat begraven.',
      question: 'Wat staat er op de kaart?',
      answer: 'Een kruis',
      wrongAnswers: ['Een ster', 'Een pijl', 'Een cirkel'],
      statements: [
        { text: 'Er staat een kruis op de schatkaart.', isTrue: true },
        { text: 'De schat is begraven.', isTrue: true },
        { text: 'De schat ligt in het water.', isTrue: false },
        { text: 'Op de kaart staat een ster.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'Kapitein Bas vaart met zijn piratenschip over de zee. De zeilen wapperen in de wind. De bemanning zoekt naar een onbewoond eiland. Daar willen ze een schat begraven.',
      question: 'Wat zoekt de bemanning?',
      answer: 'Een onbewoond eiland',
      wrongAnswers: ['Een andere piraat', 'Een havenstad', 'Een groot schip'],
      statements: [
        { text: 'De kapitein heet Bas.', isTrue: true },
        { text: 'De zeilen wapperen in de wind.', isTrue: true },
        { text: 'De bemanning wil een schat opgraven.', isTrue: false },
        { text: 'Het schip vaart over een rivier.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'De piraten hebben de schat gevonden onder een palmboom. In de kist zitten gouden munten en edelstenen. Ze zijn heel blij en dansen op het strand. Daarna varen ze terug naar huis.',
      question: 'Waar vonden ze de schat?',
      answer: 'Onder een palmboom',
      wrongAnswers: ['In een grot', 'Op het schip', 'Onder het water'],
      statements: [
        {
          text: 'In de kist zitten gouden munten en edelstenen.',
          isTrue: true,
        },
        { text: 'De piraten dansen op het strand.', isTrue: true },
        { text: 'De schat lag in een grot.', isTrue: false },
        { text: 'De piraten blijven op het eiland wonen.', isTrue: false },
      ],
    },
  ],
  colors: {
    primary: 'bg-yellow-700',
    secondary: 'bg-yellow-600',
    wall: 'bg-yellow-900',
    path: 'bg-yellow-800',
    player: '🏴‍☠️',
    challenge: '🗺️',
  },
  pathChar: '⚓',
  friendlies: ['🦜', '🐙', '🦈', '🐚', '🦞', '🦑', '🪼', '⚓', '💰', '🏝️'],
  story: {
    intro:
      'Ahoy, matroos! Een hevige storm heeft je piratenbemanning overboord geslagen! Ze zijn verspreid over het mysterieuze pirateneiland en wachten om gered te worden. Doorzoek alle grotten, stranden en de jungle om je crew weer te verzamelen!',
    friendTexts: [
      'Arrr! Eindelijk! Ik spoelde aan op dit verlaten strand!',
      'Ahoy! De golven namen me mee naar deze grot!',
      'Yo ho ho! Ik vond een schatkist, maar ik zat alleen!',
      'Dankjewel kapitein! De storm was verschrikkelijk!',
      'Yes! Nu kunnen we weer op schattenjacht!',
      'Gelukkig! Ik miste ons piratenschip!',
      'Arrr! Samen zijn we de sterkste piraten van de zee!',
      'Fijn! Ik was bang voor het zeemonster!',
      'Geweldig! Laten we de rest van de crew redden!',
      'Wauw, je hebt me gevonden op dit wilde eiland!',
    ],
    endingComplete:
      'SCHAT GEVONDEN! 🏴‍☠️ De hele bemanning is weer aan boord en jullie hebben de grootste schat van het eiland gevonden! Het schip zeilt naar de horizon voor nieuwe avonturen. Jij bent de dapperste kapitein!',
    endingIncomplete:
      'Het schip vertrekt... maar niet alle bemanningsleden zijn aan boord. Ze blijven alleen achter op het eiland. 🥺',
    warningLeave:
      'Arrr! Er zijn nog matrozen op het eiland! Een echte kapitein laat zijn crew niet achter. Weet je zeker dat je ze achterlaat?',
  },
};
