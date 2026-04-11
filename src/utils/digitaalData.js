// Digitale Geletterdheid (Digital Literacy) data & problem generation.
// Topics: computer terminology, online safety, media literacy.

// ── Computer terminology ─────────────────────────────────────────────
const COMPUTER_TERMS = [
  {
    term: 'browser',
    definition: 'Een programma waarmee je websites bekijkt',
    example: 'Chrome, Firefox, Safari',
  },
  {
    term: 'URL',
    definition: 'Het adres van een website',
    example: 'www.google.nl',
  },
  {
    term: 'wifi',
    definition: 'Draadloos internet',
    example: 'Je verbindt je laptop via wifi',
  },
  {
    term: 'wachtwoord',
    definition: 'Een geheim woord om ergens in te loggen',
    example: 'Je hebt een wachtwoord voor je e-mail',
  },
  {
    term: 'downloaden',
    definition: 'Een bestand van internet ophalen en opslaan',
    example: 'Een foto downloaden van een website',
  },
  {
    term: 'uploaden',
    definition: 'Een bestand vanaf jouw computer naar internet sturen',
    example: 'Een werkstuk uploaden naar school',
  },
  {
    term: 'zoekmachine',
    definition: 'Een website waarmee je informatie kunt zoeken',
    example: 'Google is een zoekmachine',
  },
  {
    term: 'e-mail',
    definition: 'Een digitale brief die je via internet verstuurt',
    example: 'Je stuurt een e-mail naar je oma',
  },
  {
    term: 'bijlage',
    definition: 'Een bestand dat je meestuurt met een e-mail',
    example: 'Een foto als bijlage meesturen',
  },
  {
    term: 'app',
    definition: 'Een programma op je telefoon of tablet',
    example: 'WhatsApp is een app',
  },
  {
    term: 'bestand',
    definition: 'Een opgeslagen document, foto of video op de computer',
    example: 'Een Word-bestand met je werkstuk',
  },
  {
    term: 'map',
    definition: 'Een plek op de computer waar je bestanden in bewaart',
    example: 'De map "Huiswerk" op je bureaublad',
  },
  {
    term: 'printer',
    definition: 'Een apparaat dat tekst en plaatjes op papier zet',
    example: 'Je werkstuk uitprinten',
  },
  {
    term: 'toetsenbord',
    definition: 'Het apparaat met letters en cijfers om te typen',
    example: 'Je typt met het toetsenbord',
  },
  {
    term: 'muis',
    definition: 'Het apparaat waarmee je de pijl op het scherm beweegt',
    example: 'Klik met de muis op de knop',
  },
  {
    term: 'schermafbeelding',
    definition: 'Een foto van wat er op je scherm staat',
    example: 'Een screenshot maken van een foutmelding',
  },
  {
    term: 'server',
    definition: 'Een krachtige computer die websites en bestanden opslaat',
    example: "YouTube-video's staan op servers",
  },
  {
    term: 'cloud',
    definition: 'Opslag op internet in plaats van op je eigen computer',
    example: "Foto's bewaren in de cloud",
  },
  {
    term: 'link',
    definition:
      'Tekst of plaatje waar je op klikt om naar een andere pagina te gaan',
    example: 'Klik op de link om meer te lezen',
  },
  {
    term: 'tabblad',
    definition: 'Een extra pagina die je opent in je browser',
    example: 'Meerdere tabbladen openen in Chrome',
  },
  {
    term: 'virus',
    definition: 'Een schadelijk programma dat je computer kan beschadigen',
    example: 'Een virus kan je bestanden wissen',
  },
  {
    term: 'spam',
    definition: 'Ongewenste berichten of e-mails',
    example: 'Reclame-mails in je spammap',
  },
  {
    term: 'update',
    definition: 'Een verbetering of vernieuwing van software',
    example: 'Je telefoon vraagt om een update',
  },
  {
    term: 'bluetooth',
    definition: 'Draadloze verbinding over korte afstand',
    example: 'Koptelefoon verbinden via bluetooth',
  },
  {
    term: 'USB',
    definition: 'Een aansluiting om apparaten te verbinden met de computer',
    example: "Een USB-stick met foto's",
  },
  {
    term: 'pixel',
    definition: 'Een heel klein puntje op je beeldscherm',
    example: 'Een foto bestaat uit miljoenen pixels',
  },
  {
    term: 'code',
    definition: 'Instructies die een computer kan begrijpen',
    example: 'Een programmeur schrijft code',
  },
  {
    term: 'algoritme',
    definition: 'Een stappenplan dat een computer volgt',
    example: 'YouTube gebruikt een algoritme voor aanbevelingen',
  },
  {
    term: 'QR-code',
    definition: 'Een vierkant plaatje met blokjes dat je kunt scannen',
    example: 'Scan de QR-code voor het menu',
  },
];

// ── Online safety scenarios ──────────────────────────────────────────
const SAFETY_QUESTIONS = [
  {
    question: 'Iemand die je niet kent vraagt online om je adres. Wat doe je?',
    correctAnswer: 'Niet geven en het aan een volwassene vertellen',
    wrongAnswers: [
      'Je adres sturen',
      'Vragen waarom die persoon het wil weten',
      'Je adres geven als het een kind lijkt',
    ],
  },
  {
    question:
      'Je krijgt een e-mail dat je een prijs hebt gewonnen. Je moet op een link klikken. Wat doe je?',
    correctAnswer: 'Niet klikken, het is waarschijnlijk nep',
    wrongAnswers: [
      'Meteen klikken om je prijs op te halen',
      'De link doorsturen naar vrienden',
      'Je gegevens invullen',
    ],
  },
  {
    question: 'Wat is een sterk wachtwoord?',
    correctAnswer: 'Een mix van letters, cijfers en tekens',
    wrongAnswers: ['Je naam', 'Je geboortedatum', '123456'],
  },
  {
    question:
      'Iemand online is heel gemeen tegen je. Wat is het beste om te doen?',
    correctAnswer: 'Niet reageren en het aan een volwassene vertellen',
    wrongAnswers: [
      'Zelf gemeen terug doen',
      'Niks, dat hoort erbij',
      'Een boos bericht terugsturen',
    ],
  },
  {
    question: 'Je vriend(in) wil dat je je wachtwoord deelt. Wat doe je?',
    correctAnswer: 'Nee zeggen, je wachtwoord is privé',
    wrongAnswers: [
      'Delen, het is je vriend(in)',
      'Delen als die belooft het niet door te geven',
      'Jullie wachtwoorden ruilen',
    ],
  },
  {
    question: 'Welke informatie deel je NIET online met vreemden?',
    correctAnswer: 'Je achternaam, adres en telefoonnummer',
    wrongAnswers: [
      'Je favoriete kleur',
      'Je favoriete dier',
      'Welk boek je leest',
    ],
  },
  {
    question:
      'Je ziet een pop-up: "Je computer heeft een virus! Klik hier!" Wat doe je?',
    correctAnswer: 'De pop-up sluiten zonder te klikken',
    wrongAnswers: [
      'Snel klikken om het virus te verwijderen',
      'Je gegevens invullen',
      'De computer uitzetten via de pop-up',
    ],
  },
  {
    question: 'Mag je zomaar een foto van iemand anders online zetten?',
    correctAnswer: 'Nee, je moet eerst toestemming vragen',
    wrongAnswers: [
      'Ja, dat mag altijd',
      'Ja, als het een grappige foto is',
      'Ja, als je het op privé zet',
    ],
  },
  {
    question: 'Wat doe je als je per ongeluk op een enge website komt?',
    correctAnswer: 'De pagina sluiten en het aan een volwassene vertellen',
    wrongAnswers: [
      'Verder kijken uit nieuwsgierigheid',
      'Een screenshot maken',
      'Er niks over zeggen',
    ],
  },
  {
    question: 'Is alles wat je op internet leest waar?',
    correctAnswer: 'Nee, niet alles op internet is waar',
    wrongAnswers: [
      'Ja, alles op internet is gecontroleerd',
      'Ja, als het op een mooie website staat',
      'Ja, als veel mensen het delen',
    ],
  },
  {
    question:
      'Waarom moet je uitloggen als je klaar bent op een schoolcomputer?',
    correctAnswer: 'Zodat niemand anders bij jouw account kan',
    wrongAnswers: [
      'Dat hoeft niet',
      'Alleen als de juf het zegt',
      'Alleen als je een wachtwoord hebt',
    ],
  },
  {
    question:
      'Iemand stuurt je een bestand via chat. Je kent die persoon niet. Wat doe je?',
    correctAnswer: 'Niet openen, het kan gevaarlijk zijn',
    wrongAnswers: [
      'Openen om te kijken wat het is',
      'Downloaden en later bekijken',
      'Doorsturen naar een vriend',
    ],
  },
];

// ── Media literacy questions ─────────────────────────────────────────
const MEDIA_QUESTIONS = [
  {
    question: 'Hoe kun je controleren of een nieuwsbericht echt is?',
    correctAnswer: 'Zoeken of andere betrouwbare bronnen hetzelfde zeggen',
    wrongAnswers: [
      'Als het veel likes heeft is het waar',
      'Kijken of er een foto bij zit',
      'Als een vriend het deelt is het waar',
    ],
  },
  {
    question: 'Wat is een "influencer"?',
    correctAnswer: 'Iemand met veel volgers die meningen kan beïnvloeden',
    wrongAnswers: [
      'Een soort virus',
      'Een computerprogrammeur',
      'Een leraar op internet',
    ],
  },
  {
    question: 'Waarom staan er reclames op websites en in apps?',
    correctAnswer: 'Zo verdienen de makers geld',
    wrongAnswers: [
      'Omdat ze denken dat je het leuk vindt',
      'Omdat het verplicht is',
      'Zomaar, zonder reden',
    ],
  },
  {
    question:
      'Een YouTube-video zegt: "Dit product is geweldig!" Waarom moet je oppassen?',
    correctAnswer: 'De maker kan betaald zijn om dat te zeggen',
    wrongAnswers: [
      "YouTube-video's zijn altijd eerlijk",
      'Het is altijd waar als er een video van is',
      'Mensen liegen nooit op camera',
    ],
  },
  {
    question: 'Wat is het verschil tussen een feit en een mening?',
    correctAnswer: 'Een feit kun je bewijzen, een mening is wat iemand vindt',
    wrongAnswers: [
      'Er is geen verschil',
      'Een mening is altijd juist',
      'Een feit is wat de meeste mensen zeggen',
    ],
  },
  {
    question: 'Wat is "beeldschermtijd"?',
    correctAnswer: 'Hoelang je naar een scherm kijkt',
    wrongAnswers: [
      'Hoe snel je scherm is',
      'Hoeveel apps je hebt',
      'De helderheid van je scherm',
    ],
  },
  {
    question: 'Wat is een "profiel" op social media?',
    correctAnswer: 'Een pagina met informatie over jezelf',
    wrongAnswers: [
      'Een foto van je gezicht',
      'Een geheim wachtwoord',
      'De naam van je computer',
    ],
  },
  {
    question: 'Wat betekent "privé-instelling" op social media?',
    correctAnswer: 'Alleen mensen die je toevoegt kunnen je berichten zien',
    wrongAnswers: [
      'Niemand kan je berichten zien',
      'Iedereen op internet kan je zien',
      'Je account wordt verwijderd',
    ],
  },
];

// ── Public generation functions ──────────────────────────────────────

/**
 * Generate a computer terminology quiz question.
 * @returns {{ question: string, correctAnswer: string, wrongAnswers: string[], term: string }}
 */
export function generateComputerTermQuestion() {
  const term =
    COMPUTER_TERMS[Math.floor(Math.random() * COMPUTER_TERMS.length)];
  const askDefinition = Math.random() < 0.5;

  if (askDefinition) {
    // Show term → pick correct definition
    const otherTerms = COMPUTER_TERMS.filter((t) => t.term !== term.term);
    const shuffled = otherTerms.sort(() => Math.random() - 0.5);
    return {
      question: `Wat is "${term.term}"?`,
      correctAnswer: term.definition,
      wrongAnswers: shuffled.slice(0, 3).map((t) => t.definition),
      term: term.term,
    };
  } else {
    // Show definition → pick correct term
    const otherTerms = COMPUTER_TERMS.filter((t) => t.term !== term.term);
    const shuffled = otherTerms.sort(() => Math.random() - 0.5);
    return {
      question: term.definition,
      correctAnswer: term.term,
      wrongAnswers: shuffled.slice(0, 3).map((t) => t.term),
      term: term.term,
    };
  }
}

/**
 * Generate an online safety quiz question.
 * @returns {{ question: string, correctAnswer: string, wrongAnswers: string[] }}
 */
export function generateVeiligheidQuestion() {
  const q =
    SAFETY_QUESTIONS[Math.floor(Math.random() * SAFETY_QUESTIONS.length)];
  return { ...q };
}

/**
 * Generate a media literacy quiz question.
 * @returns {{ question: string, correctAnswer: string, wrongAnswers: string[] }}
 */
export function generateMediawijsheidQuestion() {
  const q = MEDIA_QUESTIONS[Math.floor(Math.random() * MEDIA_QUESTIONS.length)];
  return { ...q };
}

/**
 * Generate a digital literacy question (picks from any enabled sub-topic).
 * @param {{ computerkennis?: boolean, veiligheid?: boolean, mediawijsheid?: boolean }} options
 * @returns {{ question: string, correctAnswer: string, wrongAnswers: string[] }}
 */
export function generateDigitaalQuestion(options = {}) {
  const generators = [];
  if (options.computerkennis !== false)
    generators.push(generateComputerTermQuestion);
  if (options.veiligheid !== false) generators.push(generateVeiligheidQuestion);
  if (options.mediawijsheid !== false)
    generators.push(generateMediawijsheidQuestion);

  if (generators.length === 0) generators.push(generateComputerTermQuestion);

  const gen = generators[Math.floor(Math.random() * generators.length)];
  return gen();
}

/**
 * Generate computer term memory pairs.
 * @param {number} count - Number of pairs
 * @returns {{ left: string, right: string }[]}
 */
export function generateDigitaalMemoryPairs(count = 4) {
  const shuffled = [...COMPUTER_TERMS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((t) => ({
    left: t.term,
    right: t.definition,
  }));
}

/**
 * Generate connect pairs from computer terms.
 * @param {number} count - Number of pairs
 * @returns {{ left: string, right: string }[]}
 */
export function generateDigitaalConnectPairs(count = 4) {
  const shuffled = [...COMPUTER_TERMS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((t) => ({
    left: t.term,
    right: t.definition,
  }));
}
