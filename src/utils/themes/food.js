export const FOOD = {
  id: 'food',
  name: '🍕 Eten',
  emoji: '🍕',
  vocabularyWords: [
    {
      word: 'recept',
      definition: 'Een beschrijving van hoe je iets klaarmaakt.',
      exampleSentence:
        'Mama las het recept voor zodat we wisten wat we moesten doen.',
    },
    {
      word: 'ingrediënt',
      definition: 'Iets dat je nodig hebt om eten klaar te maken.',
      exampleSentence: 'We misten nog een ingrediënt voor het recept: een ei.',
    },
    {
      word: 'oven',
      definition: 'Een apparaat om eten in te bakken of braden.',
      exampleSentence: 'De taart moet een half uur in de oven staan.',
    },
    {
      word: 'bestek',
      definition: 'Mes, vork en lepel waarmee je eet.',
      exampleSentence: 'Wil jij het bestek op tafel leggen voor het eten?',
    },
    {
      word: 'voorgerecht',
      definition: 'Het eerste kleine gerecht van een maaltijd.',
      exampleSentence: 'Als voorgerecht kregen we een lekker soepje.',
    },
    {
      word: 'bakken',
      definition: 'Eten klaarmaken in een pan of oven.',
      exampleSentence: 'We gaan vandaag koekjes bakken in de keuken.',
    },
    {
      word: 'proeven',
      definition: 'Een klein beetje eten om te checken hoe het smaakt.',
      exampleSentence: 'Mag ik even proeven of de soep genoeg zout heeft?',
    },
    {
      word: 'maaltijd',
      definition:
        'Het eten dat je op een vast moment eet, zoals lunch of diner.',
      exampleSentence: 'Het avondeten is de laatste maaltijd van de dag.',
    },
    {
      word: 'gezond',
      definition: 'Goed voor je lichaam.',
      exampleSentence: 'Groente en fruit zijn heel gezond voor je lichaam.',
    },
    {
      word: 'kruiden',
      definition: 'Plantjes die je aan eten toevoegt voor meer smaak.',
      exampleSentence:
        'De kok deed lekkere kruiden bij het eten voor meer smaak.',
    },
  ],
  readingTexts: [
    {
      level: 'short',
      text: 'De bakker bakt elke ochtend vers brood. Het hele dorp ruikt de heerlijke geur.',
      question: 'Wat bakt de bakker?',
      answer: 'Vers brood',
      wrongAnswers: ['Een taart', 'Koekjes', 'Pannenkoeken'],
      statements: [
        { text: 'De bakker bakt elke ochtend vers brood.', isTrue: true },
        { text: 'Het hele dorp ruikt de geur.', isTrue: true },
        { text: 'De bakker bakt \u2019s avonds.', isTrue: false },
        { text: 'Niemand ruikt het brood.', isTrue: false },
      ],
    },
    {
      level: 'short',
      text: 'Groenten en fruit zijn heel gezond. Je moet elke dag minstens twee stuks fruit eten.',
      question: 'Hoeveel stuks fruit moet je elke dag eten?',
      answer: 'Minstens twee',
      wrongAnswers: ['Eén', 'Vijf', 'Tien'],
      statements: [
        { text: 'Groenten en fruit zijn gezond.', isTrue: true },
        {
          text: 'Je moet elke dag minstens twee stuks fruit eten.',
          isTrue: true,
        },
        { text: 'Fruit is ongezond.', isTrue: false },
        { text: 'Je hoeft maar één stuk fruit te eten.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'Mama en Sanne bakken samen een taart. Ze gebruiken meel, eieren, suiker en boter. De taart gaat een half uur in de oven. Daarna versieren ze hem met slagroom en aardbeien.',
      question: 'Hoe lang gaat de taart in de oven?',
      answer: 'Een half uur',
      wrongAnswers: ['Een uur', 'Tien minuten', 'Twee uur'],
      statements: [
        { text: 'Mama en Sanne bakken samen een taart.', isTrue: true },
        {
          text: 'Ze versieren de taart met slagroom en aardbeien.',
          isTrue: true,
        },
        { text: 'De taart gaat een uur in de oven.', isTrue: false },
        { text: 'Ze versieren de taart met chocolade.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'Het gezin gaat uit eten in een restaurant. Papa bestelt pasta en mama kiest een salade. De kinderen nemen allebei een pizza. Als toetje eten ze allemaal een ijsje.',
      question: 'Wat bestelt mama?',
      answer: 'Een salade',
      wrongAnswers: ['Pasta', 'Pizza', 'Soep'],
      statements: [
        { text: 'Papa bestelt pasta.', isTrue: true },
        { text: 'Als toetje eten ze allemaal een ijsje.', isTrue: true },
        { text: 'Mama bestelt pasta.', isTrue: false },
        { text: 'De kinderen eten een salade.', isTrue: false },
      ],
    },
  ],
  colors: {
    primary: 'bg-orange-500',
    secondary: 'bg-red-400',
    wall: 'bg-orange-800',
    path: 'bg-orange-600',
    player: '👨‍🍳',
    challenge: '🍳',
  },
  pathChar: '·',
  friendlies: ['🍅', '🍲', '🥕', '🍟', '🍔', '🥪', '🥞', '🍝', '🍉', '🍳'],
  story: {
    intro:
      'Chaos in de keuken! Het grote kookfeest begint bijna, maar alle ingrediënten en keukenhulpjes zijn door de keuken verspreid geraakt! Ze zitten verstopt in de kasten, achter de pannen en in de koelkast. Verzamel alle vriendjes zodat het feestmaal klaargemaakt kan worden!',
    friendTexts: [
      'Hoera! Ik zat verstopt achter de grote pannen!',
      "Eindelijk! De keuken is zo'n doolhof van kasten!",
      'Dankjewel! Het was koud in de koelkast!',
      'Joepie! Nu kan ik helpen met het kookfeest!',
      'Yes! De chef-kok heeft me nodig!',
      'Gelukkig! Ik rook al het lekkere eten maar kon er niet bij!',
      'Super! Samen maken we het lekkerste gerecht!',
      'Fijn! Ik was bang dat ik zou aanbranden!',
      'Geweldig! Laten we de andere ingrediënten ook vinden!',
      'Wauw, je hebt me gevonden in deze grote keuken!',
    ],
    endingComplete:
      'SMAKELIJK! 🍕 Alle ingrediënten en hulpjes zijn gevonden! Het kookfeest is een groot succes en iedereen geniet van het heerlijke eten. Jij bent de beste chef-kok!',
    endingIncomplete:
      'Je verlaat de keuken... maar niet alle ingrediënten zijn verzameld. Het feestmaal is onvolledig en niet iedereen kan mee-eten. 🥺',
    warningLeave:
      'Wacht! Er zijn nog hulpjes verstopt in de keuken! Het kookfeest kan niet zonder hen. Weet je zeker dat je ze achterlaat?',
  },
};
