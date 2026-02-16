export const SPORTS = {
  id: 'sports',
  name: '⚽ Sport',
  emoji: '⚽',
  vocabularyWords: [
    {
      word: 'wedstrijd',
      definition: 'Een spel waarbij je probeert te winnen.',
      exampleSentence:
        'Zaterdag spelen we een belangrijke wedstrijd tegen de andere school.',
    },
    {
      word: 'scheidsrechter',
      definition: 'De persoon die de regels bewaakt bij een wedstrijd.',
      exampleSentence:
        'De scheidsrechter blies op zijn fluitje en gaf een vrije trap.',
    },
    {
      word: 'kampioen',
      definition: 'De winnaar van een toernooi of competitie.',
      exampleSentence: 'Ons team werd kampioen van het toernooi!',
    },
    {
      word: 'trainer',
      definition: 'Iemand die je leert hoe je beter kunt sporten.',
      exampleSentence: 'De trainer liet ons nieuwe oefeningen doen.',
    },
    {
      word: 'doelpunt',
      definition: 'Wanneer de bal in het doel gaat bij voetbal.',
      exampleSentence: 'In de laatste minuut maakte hij het winnende doelpunt!',
    },
    {
      word: 'record',
      definition: 'De allerbeste prestatie die ooit is behaald.',
      exampleSentence: 'Ze liep zo snel dat ze een nieuw record vestigde.',
    },
    {
      word: 'teamgenoot',
      definition: 'Iemand die in hetzelfde team speelt als jij.',
      exampleSentence: 'Ik gaf de bal aan mijn teamgenoot en die scoorde.',
    },
    {
      word: 'medaille',
      definition: 'Een prijs die je krijgt als je wint.',
      exampleSentence: 'Na de race kreeg ze een gouden medaille omgehangen.',
    },
    {
      word: 'tribune',
      definition: 'De plek waar het publiek zit in een stadion.',
      exampleSentence: 'Mijn ouders zaten op de tribune te juichen.',
    },
    {
      word: 'opwarmen',
      definition: 'Je lichaam voorbereiden voor het sporten.',
      exampleSentence:
        'Voor de wedstrijd moeten we altijd eerst goed opwarmen.',
    },
  ],
  readingTexts: [
    {
      level: 'short',
      text: 'Het voetbalteam speelt een belangrijke wedstrijd. De spits scoort het winnende doelpunt.',
      question: 'Wie scoort het doelpunt?',
      answer: 'De spits',
      wrongAnswers: ['De keeper', 'De verdediger', 'De scheidsrechter'],
      statements: [
        {
          text: 'Het voetbalteam speelt een belangrijke wedstrijd.',
          isTrue: true,
        },
        { text: 'De spits scoort het winnende doelpunt.', isTrue: true },
        { text: 'De keeper scoort het doelpunt.', isTrue: false },
        { text: 'Het team verliest de wedstrijd.', isTrue: false },
      ],
    },
    {
      level: 'short',
      text: 'Bij de zwemles oefenen de kinderen de schoolslag. Ze zwemmen van de ene kant naar de andere.',
      question: 'Welke slag oefenen de kinderen?',
      answer: 'De schoolslag',
      wrongAnswers: ['De borstcrawl', 'De rugslag', 'De vlinderslag'],
      statements: [
        { text: 'De kinderen oefenen de schoolslag.', isTrue: true },
        { text: 'Ze zwemmen van de ene kant naar de andere.', isTrue: true },
        { text: 'De kinderen oefenen de rugslag.', isTrue: false },
        { text: 'Ze zwemmen alleen maar op één plek.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'Het is sportdag op school. De kinderen doen mee aan hardlopen, verspringen en balwerpen. Emma wint de verspringen. Aan het eind krijgt iedereen een medaille.',
      question: 'Welk onderdeel wint Emma?',
      answer: 'Het verspringen',
      wrongAnswers: ['Het hardlopen', 'Het balwerpen', 'Het touwklimmen'],
      statements: [
        { text: 'Het is sportdag op school.', isTrue: true },
        { text: 'Aan het eind krijgt iedereen een medaille.', isTrue: true },
        { text: 'Emma wint het hardlopen.', isTrue: false },
        { text: 'Alleen de winnaars krijgen een medaille.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'De turnleraar legt uit hoe je een koprol moet maken. Eerst hurk je, dan zet je je handen op de mat. Je rolt over je hoofd en staat weer op. Na een paar keer oefenen kan bijna iedereen het.',
      question: 'Wat zet je als eerste op de mat?',
      answer: 'Je handen',
      wrongAnswers: ['Je hoofd', 'Je voeten', 'Je knieën'],
      statements: [
        {
          text: 'De turnleraar legt uit hoe je een koprol moet maken.',
          isTrue: true,
        },
        {
          text: 'Na een paar keer oefenen kan bijna iedereen het.',
          isTrue: true,
        },
        { text: 'Je zet eerst je hoofd op de mat.', isTrue: false },
        { text: 'Niemand kan de koprol na het oefenen.', isTrue: false },
      ],
    },
  ],
  colors: {
    primary: 'bg-emerald-600',
    secondary: 'bg-emerald-500',
    wall: 'bg-emerald-800',
    path: 'bg-emerald-700',
    player: '🏃',
    challenge: '🏆',
  },
  pathChar: '◦',
  friendlies: ['⚽', '🏀', '🎾', '🏈', '⚾', '🏐', '🏓', '🏸', '⛳', '🎳'],
  story: {
    intro:
      'Code rood in het stadion! De grote sportdag is bijna begonnen, maar je teamgenoten zijn verdwaald in het enorme sportcomplex! Ze zitten verspreid over de velden, zalen en banen. Vind al je teamgenoten zodat jullie samen de wedstrijd kunnen winnen!',
    friendTexts: [
      'Yes, gevonden! Ik was aan het opwarmen maar raakte verdwaald!',
      'Eindelijk! Het stadion is zo groot, ik vond de weg niet meer!',
      'Dankjewel! Ik hoorde het publiek maar zag niemand!',
      'Hoera! Nu kunnen we samen de wedstrijd winnen!',
      'Super! Ik oefende mijn trucjes maar verloor de groep!',
      'Gelukkig! De coach zocht me overal!',
      'Top! Samen zijn we een onverslaanbaar team!',
      'Fijn! Ik was bang dat de wedstrijd zonder mij zou beginnen!',
      'Geweldig! Laten we de rest van het team vinden!',
      'Wauw, je hebt me gevonden in dit grote sportcomplex!',
    ],
    endingComplete:
      'KAMPIOEN! ⚽ Het hele team is weer bij elkaar en jullie winnen de wedstrijd! Het publiek juicht, confetti valt uit de lucht en jullie tillen de beker omhoog. Jij bent de echte MVP!',
    endingIncomplete:
      'Je verlaat het stadion... maar het team is niet compleet. Zonder alle spelers kunnen jullie niet winnen. De wedstrijd gaat door zonder hen. 🥺',
    warningLeave:
      'Wacht! Er zijn nog teamgenoten in het stadion! Zonder hen is het team niet compleet. Weet je zeker dat je ze achterlaat?',
  },
};
