export const DINO = {
  id: 'dino',
  name: '🦕 Dinosaurus',
  emoji: '🦕',
  vocabularyWords: [
    {
      word: 'fossiel',
      definition: 'Overblijfselen van dieren of planten van heel lang geleden.',
      exampleSentence: 'We vonden een fossiel van een dinosaurus in de grond.',
    },
    {
      word: 'vulkaan',
      definition: 'Een berg die lava en rook kan uitspuwen.',
      exampleSentence: 'De vulkaan spuwde hete lava en een grote rookwolk uit.',
    },
    {
      word: 'oertijd',
      definition: 'Heel lang geleden, toen er nog dinosaurussen leefden.',
      exampleSentence:
        'In de oertijd leefden er enorme dinosaurussen op de aarde.',
    },
    {
      word: 'herbivoor',
      definition: 'Een dier dat alleen planten eet.',
      exampleSentence: 'Een herbivoor eet alleen maar planten en geen vlees.',
    },
    {
      word: 'carnivoor',
      definition: 'Een dier dat alleen vlees eet.',
      exampleSentence:
        'De T-Rex was een gevaarlijke carnivoor die andere dieren at.',
    },
    {
      word: 'uitgestorven',
      definition: 'Wanneer een diersoort niet meer bestaat.',
      exampleSentence:
        'De dinosaurussen zijn al heel lang geleden uitgestorven.',
    },
    {
      word: 'skelet',
      definition: 'Alle botten van een lichaam bij elkaar.',
      exampleSentence:
        'In het museum stond een groot skelet van een dinosaurus.',
    },
    {
      word: 'prehistorisch',
      definition: 'Van heel lang geleden, voor mensen konden schrijven.',
      exampleSentence:
        'Dit prehistorische dier leefde miljoenen jaren geleden.',
    },
    {
      word: 'klauwen',
      definition: 'De scherpe nagels van een dier.',
      exampleSentence:
        'De dinosaurus had grote scherpe klauwen aan zijn poten.',
    },
    {
      word: 'reptiel',
      definition: 'Een koudbloedig dier met schubben, zoals een hagedis.',
      exampleSentence: 'Een krokodil is een reptiel met harde schubben.',
    },
  ],
  readingTexts: [
    {
      level: 'short',
      text: 'De T-Rex was een groot vleesetend roofdier. Hij had scherpe tanden en kleine armpjes.',
      question: 'Wat voor soort dier was de T-Rex?',
      answer: 'Een vleesetend roofdier',
      wrongAnswers: ['Een planteneter', 'Een vis', 'Een vogel'],
      statements: [
        { text: 'De T-Rex was een groot roofdier.', isTrue: true },
        { text: 'Hij had scherpe tanden.', isTrue: true },
        { text: 'De T-Rex at planten.', isTrue: false },
        { text: 'De T-Rex had grote armen.', isTrue: false },
      ],
    },
    {
      level: 'short',
      text: 'Wetenschappers vinden botten van dinosaurussen in de grond. Die botten heten fossielen.',
      question: 'Hoe noem je botten van dinosaurussen?',
      answer: 'Fossielen',
      wrongAnswers: ['Skeletten', 'Mineralen', 'Stenen'],
      statements: [
        { text: 'Wetenschappers vinden botten in de grond.', isTrue: true },
        { text: 'De botten heten fossielen.', isTrue: true },
        { text: 'De botten liggen bovenop de grond.', isTrue: false },
        { text: 'De botten heten mineralen.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'Sommige dinosaurussen waren heel groot, zoals de Brachiosaurus. Andere waren juist heel klein, net zo groot als een kip. Dinosaurussen leefden miljoenen jaren geleden. Er waren vleeseters en planteneters.',
      question: 'Hoe groot was de kleinste dinosaurus?',
      answer: 'Net zo groot als een kip',
      wrongAnswers: [
        'Net zo groot als een hond',
        'Net zo groot als een muis',
        'Net zo groot als een paard',
      ],
      statements: [
        { text: 'De Brachiosaurus was heel groot.', isTrue: true },
        {
          text: 'Dinosaurussen leefden miljoenen jaren geleden.',
          isTrue: true,
        },
        { text: 'Alle dinosaurussen waren heel groot.', isTrue: false },
        { text: 'Dinosaurussen waren allemaal planteneters.', isTrue: false },
      ],
    },
    {
      level: 'long',
      text: 'In het museum staat een echt skelet van een dinosaurus. Het is een Triceratops met drie hoorns op zijn kop. Kinderen kijken met grote ogen naar de botten. De Triceratops was een planteneter.',
      question: 'Hoeveel hoorns had de Triceratops?',
      answer: 'Drie',
      wrongAnswers: ['Twee', 'Eén', 'Vier'],
      statements: [
        {
          text: 'In het museum staat een skelet van een Triceratops.',
          isTrue: true,
        },
        { text: 'De Triceratops was een planteneter.', isTrue: true },
        { text: 'De Triceratops had twee hoorns.', isTrue: false },
        { text: 'De Triceratops was een vleeseater.', isTrue: false },
      ],
    },
  ],
  colors: {
    primary: 'bg-lime-700',
    secondary: 'bg-orange-600',
    wall: 'bg-lime-900',
    path: 'bg-lime-800',
    player: '🧑‍🔬',
    challenge: '🌋',
  },
  pathChar: '❋',
  friendlies: ['🦎', '🐢', '🐊', '🦤', '🐣', '🦗', '🦕', '🦖', '🦴', '🐉'],
  story: {
    intro:
      'Tijdreis naar de oertijd! Je tijdmachine is geland in het dinotijdperk, maar je vriendjes zijn verspreid over het hele prehistorische landschap! De vulkaan rommelt en je moet snel zijn. Vind al je vriendjes voordat de vulkaan uitbarst!',
    friendTexts: [
      'Hoera! Ik verstopte me voor een enorme T-Rex!',
      'Eindelijk! De vulkaan maakte me zo bang!',
      'Dankjewel! Ik kon de tijdmachine niet meer vinden!',
      "Joepie! De dino's zijn groot, maar jij bent dapper!",
      'Yes! Nu kunnen we samen terug naar de toekomst!',
      'Gelukkig! Ik miste onze eigen tijd!',
      'Super! Deze oertijd is spannend maar ook eng!',
      'Fijn! Ik hoorde steeds een brullende dinosaurus!',
      'Geweldig! Laten we de anderen ook snel vinden!',
      'Wauw, je hebt me gevonden tussen al die fossielen!',
    ],
    endingComplete:
      'TIJDREIS VOLTOOID! 🦕 Alle vriendjes zijn gevonden en veilig terug in de tijdmachine! Net op tijd, want de vulkaan barst uit! Jullie reizen veilig terug naar huis. Jij bent een echte tijdreiziger!',
    endingIncomplete:
      'De tijdmachine vertrekt... maar niet iedereen is aan boord. Sommige vriendjes blijven achter in de oertijd met de dinosaurussen. 🥺',
    warningLeave:
      'Wacht! Er zijn nog vriendjes in het dinoland! De vulkaan kan elk moment uitbarsten! Weet je zeker dat je ze achterlaat?',
  },
};
