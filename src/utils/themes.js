// Thema's die kids van groep 4 leuk vinden
// Elk thema heeft een vocabularyWords array voor thematische woordenschat.
// Voeg woorden toe door { word, definition } objecten aan de array toe te voegen.
export const THEMES = {
  SPACE: {
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
  },
  JUNGLE: {
    id: 'jungle',
    name: '🦁 Jungle',
    emoji: '🦁',
    vocabularyWords: [
      {
        word: 'oerwoud',
        definition: 'Een heel dicht bos met veel bomen en planten.',
        exampleSentence:
          'In het oerwoud groeien heel veel bomen dicht bij elkaar.',
      },
      {
        word: 'liaan',
        definition: 'Een lange slingerende plant in het oerwoud.',
        exampleSentence: 'De aap slingerde van liaan naar liaan door het bos.',
      },
      {
        word: 'waterval',
        definition: 'Water dat van een hoge rots naar beneden valt.',
        exampleSentence:
          'Het water stortte van de hoge rots naar beneden als een waterval.',
      },
      {
        word: 'kameleon',
        definition: 'Een dier dat van kleur kan veranderen.',
        exampleSentence:
          'De kameleon werd groen toen hij op een blad ging zitten.',
      },
      {
        word: 'roofvogel',
        definition: 'Een vogel die andere dieren vangt om te eten.',
        exampleSentence:
          'De roofvogel vloog hoog in de lucht en zocht naar eten.',
      },
      {
        word: 'tropisch',
        definition: 'Warm en vochtig, zoals het weer in de jungle.',
        exampleSentence:
          'In de jungle is het altijd warm en vochtig, dat noemen we tropisch weer.',
      },
      {
        word: 'camouflage',
        definition:
          'Je verstoppen door dezelfde kleur als je omgeving te hebben.',
        exampleSentence:
          'Het dier had dezelfde kleur als de bladeren, dat is camouflage.',
      },
      {
        word: 'stammen',
        definition: 'De dikke delen van bomen waar de takken uit groeien.',
        exampleSentence:
          'De stammen van de bomen waren zo dik dat je er niet omheen kon.',
      },
      {
        word: 'roofdier',
        definition: 'Een dier dat andere dieren jaagt en opeet.',
        exampleSentence: 'De tijger is een roofdier dat andere dieren vangt.',
      },
      {
        word: 'ontdekken',
        definition: 'Iets vinden dat je nog niet kende.',
        exampleSentence: 'We gingen het bos in om nieuwe planten te ontdekken.',
      },
    ],
    readingTexts: [
      {
        level: 'short',
        text: 'De papegaai zit hoog in de boom. Hij heeft prachtige rode en blauwe veren.',
        question: 'Welke kleuren heeft de papegaai?',
        answer: 'Rood en blauw',
        wrongAnswers: ['Groen en geel', 'Zwart en wit', 'Oranje en paars'],
        statements: [
          { text: 'De papegaai zit hoog in de boom.', isTrue: true },
          { text: 'Hij heeft rode en blauwe veren.', isTrue: true },
          { text: 'De papegaai zit op de grond.', isTrue: false },
          { text: 'De papegaai heeft groene en gele veren.', isTrue: false },
        ],
      },
      {
        level: 'short',
        text: 'De aap slingert van tak naar tak. Hij zoekt bananen om te eten.',
        question: 'Wat zoekt de aap?',
        answer: 'Bananen',
        wrongAnswers: ['Noten', 'Bladeren', 'Insecten'],
        statements: [
          { text: 'De aap slingert van tak naar tak.', isTrue: true },
          { text: 'De aap zoekt bananen.', isTrue: true },
          { text: 'De aap zit stil in de boom.', isTrue: false },
          { text: 'De aap zoekt noten.', isTrue: false },
        ],
      },
      {
        level: 'long',
        text: 'Diep in de jungle stroomt een grote rivier. Bij de waterval spelen de apen in het water. Er groeien hoge bomen met lianen. De toekan vliegt van boom naar boom met zijn grote snavel.',
        question: 'Welke vogel vliegt van boom naar boom?',
        answer: 'De toekan',
        wrongAnswers: ['De papegaai', 'De uil', 'De adelaar'],
        statements: [
          { text: 'Er stroomt een grote rivier in de jungle.', isTrue: true },
          { text: 'De toekan vliegt van boom naar boom.', isTrue: true },
          { text: 'De papegaai vliegt van boom naar boom.', isTrue: false },
          { text: 'Er groeien lage struiken in de jungle.', isTrue: false },
        ],
      },
      {
        level: 'long',
        text: 'De kameleon zit op een groen blad. Hij verandert van kleur zodat hij niet gezien wordt. Zo kan hij insecten vangen zonder dat ze hem zien. De kameleon is een slim dier.',
        question: 'Waarom verandert de kameleon van kleur?',
        answer: 'Zodat hij niet gezien wordt',
        wrongAnswers: [
          'Omdat hij het koud heeft',
          'Omdat hij boos is',
          'Omdat hij honger heeft',
        ],
        statements: [
          { text: 'De kameleon zit op een groen blad.', isTrue: true },
          { text: 'De kameleon vangt insecten.', isTrue: true },
          {
            text: 'De kameleon verandert van kleur omdat hij boos is.',
            isTrue: false,
          },
          { text: 'De kameleon eet planten.', isTrue: false },
        ],
      },
    ],
    colors: {
      primary: 'bg-green-700',
      secondary: 'bg-green-600',
      wall: 'bg-green-900',
      path: 'bg-green-800',
      player: '🧒',
      challenge: '🐒',
    },
    pathChar: '✿',
    friendlies: ['🦜', '🐘', '🦋', '🐸', '🐰', '🦁', '🦅', '🦧', '🦓', '🦥'],
    story: {
      intro:
        'Help! Een grote storm heeft door de jungle geraasd en je diervriendjes zijn verdwaald in het dichte oerwoud! Ze zitten verstopt tussen de bomen en struiken en durven niet alleen verder. Trek de jungle in en breng al je vriendjes veilig terug naar de open plek!',
      friendTexts: [
        'Oef, gelukkig! Ik zat helemaal vast tussen de takken!',
        'Joehoe! Ik hoorde de apen, maar kon de weg niet meer vinden!',
        'Dankjewel! Het was zo donker hier tussen de grote bomen!',
        'Eindelijk een vriendelijk gezicht! De jungle is zo groot!',
        'Hoera! Ik was bang voor de geluiden in het oerwoud!',
        'Yes! Nu kan ik weer spelen bij de waterval!',
        'Fijn! Ik miste het zonlicht en mijn vriendjes!',
        'Super! Samen zijn we sterker in de jungle!',
        'Geweldig! Laten we de anderen ook gaan zoeken!',
        'Wauw, je hebt me gevonden tussen al die planten!',
      ],
      endingComplete:
        'JUNGLE AVONTUUR VOLTOOID! 🦁 Alle diervriendjes zijn weer veilig samen op de open plek! De zon schijnt, de vogels fluiten en iedereen is weer herenigd. Jij bent een echte jungle-ontdekker!',
      endingIncomplete:
        'Je verlaat de jungle... maar sommige vriendjes zijn nog steeds verdwaald tussen de bomen. Ze wachten nog steeds tot iemand ze vindt. 🥺',
      warningLeave:
        'Wacht! Er zitten nog vriendjes verstopt in de jungle! Ze zijn bang en alleen. Weet je zeker dat je ze achterlaat?',
    },
  },
  OCEAN: {
    id: 'ocean',
    name: '🌊 Oceaan',
    emoji: '🌊',
    vocabularyWords: [
      {
        word: 'koraal',
        definition: 'Kleurrijke dieren op de zeebodem die op planten lijken.',
        exampleSentence:
          'Tussen het kleurrijke koraal zwommen veel kleine visjes.',
      },
      {
        word: 'getij',
        definition: 'Het stijgen en dalen van het water in de zee.',
        exampleSentence: 'Door het getij is de zee soms hoog en soms laag.',
      },
      {
        word: 'duiken',
        definition: 'Onder water zwemmen.',
        exampleSentence:
          'We gingen duiken om de vissen onder water te bekijken.',
      },
      {
        word: 'zeewier',
        definition: 'Planten die in de zee groeien.',
        exampleSentence:
          'Er zat een lange sliert zeewier om mijn been gewikkeld.',
      },
      {
        word: 'stroming',
        definition: 'Water dat in een bepaalde richting beweegt.',
        exampleSentence:
          'De stroming in de zee was zo sterk dat we werden meegetrokken.',
      },
      {
        word: 'schelp',
        definition: 'Het harde huisje van een zeedier.',
        exampleSentence: 'Ik vond een mooie schelp op het strand.',
      },
      {
        word: 'diepzee',
        definition: 'Het allerdiepste deel van de oceaan.',
        exampleSentence:
          'In de diepzee is het helemaal donker en leven rare vissen.',
      },
      {
        word: 'walvis',
        definition: 'Het grootste dier ter wereld dat in de zee leeft.',
        exampleSentence: 'De grote walvis spoot water uit zijn blaasgat.',
      },
      {
        word: 'golven',
        definition: 'Het op en neer bewegen van het water in de zee.',
        exampleSentence: 'De golven sloegen tegen de rotsen aan het strand.',
      },
      {
        word: 'zeebodem',
        definition: 'De grond helemaal onder in de zee.',
        exampleSentence: 'Op de zeebodem lagen schelpen en zeesterren.',
      },
    ],
    readingTexts: [
      {
        level: 'short',
        text: 'De dolfijn springt hoog uit het water. Hij is het snelste dier in de zee.',
        question: 'Welk dier springt uit het water?',
        answer: 'De dolfijn',
        wrongAnswers: ['De walvis', 'De haai', 'De zeehond'],
        statements: [
          { text: 'De dolfijn springt hoog uit het water.', isTrue: true },
          { text: 'De dolfijn is het snelste dier in de zee.', isTrue: true },
          { text: 'De walvis springt uit het water.', isTrue: false },
          { text: 'De dolfijn is het langzaamste dier.', isTrue: false },
        ],
      },
      {
        level: 'short',
        text: 'Op de zeebodem groeit een prachtig koraalrif. Er zwemmen veel kleurrijke vissen.',
        question: 'Wat groeit op de zeebodem?',
        answer: 'Een koraalrif',
        wrongAnswers: ['Bomen', 'Bloemen', 'Gras'],
        statements: [
          { text: 'Op de zeebodem groeit een koraalrif.', isTrue: true },
          { text: 'Er zwemmen veel kleurrijke vissen.', isTrue: true },
          { text: 'Op de zeebodem groeien bomen.', isTrue: false },
          { text: 'Er zwemmen geen vissen bij het rif.', isTrue: false },
        ],
      },
      {
        level: 'long',
        text: 'De duiker zwemt onder water met een grote zeeschildpad. Ze zwemmen langs het koraalrif. Er zijn gele, blauwe en oranje vissen te zien. De zeeschildpad is al meer dan vijftig jaar oud.',
        question: 'Hoe oud is de zeeschildpad?',
        answer: 'Meer dan vijftig jaar',
        wrongAnswers: ['Tien jaar', 'Vijf jaar', 'Honderd jaar'],
        statements: [
          { text: 'De duiker zwemt met een zeeschildpad.', isTrue: true },
          {
            text: 'Er zijn gele, blauwe en oranje vissen te zien.',
            isTrue: true,
          },
          { text: 'De zeeschildpad is tien jaar oud.', isTrue: false },
          { text: 'De duiker zwemt alleen.', isTrue: false },
        ],
      },
      {
        level: 'long',
        text: 'De walvis is het grootste dier ter wereld. Hij leeft in de oceaan en eet kleine diertjes. Baby walvissen zwemmen dicht bij hun moeder. De walvis kan heel diep duiken.',
        question: 'Wat eet de walvis?',
        answer: 'Kleine diertjes',
        wrongAnswers: ['Grote vissen', 'Zeewier', 'Koraal'],
        statements: [
          { text: 'De walvis is het grootste dier ter wereld.', isTrue: true },
          {
            text: 'Baby walvissen zwemmen dicht bij hun moeder.',
            isTrue: true,
          },
          { text: 'De walvis eet grote vissen.', isTrue: false },
          { text: 'De walvis leeft in een rivier.', isTrue: false },
        ],
      },
    ],
    colors: {
      primary: 'bg-blue-600',
      secondary: 'bg-cyan-500',
      wall: 'bg-blue-900',
      path: 'bg-blue-700',
      player: '🤿',
      challenge: '🐠',
    },
    pathChar: '~',
    friendlies: ['🐙', '🦀', '🐬', '🦭', '🐚', '🦈', '🐳', '🦑', '🐡', '🪸'],
    story: {
      intro:
        'SOS vanuit de diepzee! Een sterke stroming heeft je onderwatervriendjes meegevoerd naar alle hoeken van de oceaan! Ze zitten verstopt tussen het koraal en de zeeplanten. Duik de zee in en breng al je vriendjes weer veilig naar de onderwatergrot!',
      friendTexts: [
        'Blub blub! Eindelijk! Ik zwom al rondjes tussen het koraal!',
        'Joepie! De stroming was zo sterk, ik kon niet meer terug!',
        'Dankjewel! Ik verstopte me voor een grote vis!',
        'Hoera! Het is zo donker hier op de zeebodem!',
        'Yes! Nu kan ik weer zwemmen met mijn vriendjes!',
        'Gelukkig! Ik miste de warme wateren bij de grot!',
        'Super! Samen maken we de mooiste bubbels!',
        'Fijn! Ik was een beetje bang voor de haaien!',
        'Geweldig! Laten we de anderen ook gaan redden!',
        'Wauw, je hebt me gevonden in deze diepe zee!',
      ],
      endingComplete:
        'DUIKMISSIE GESLAAGD! 🌊 Alle zeevriendjes zijn weer veilig samen in de onderwatergrot! De vissen zwemmen vrolijk rond en het koraal gloeit prachtig. Jij bent een echte oceaanheld!',
      endingIncomplete:
        'Je zwemt naar de oppervlakte... maar niet alle vriendjes zijn gered. Ze zwemmen nog steeds verloren door de oceaan. 🥺',
      warningLeave:
        'Wacht! Er zwemmen nog vriendjes verloren in de oceaan! Ze wachten op hulp. Weet je zeker dat je ze achterlaat?',
    },
  },
  CASTLE: {
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
  },
  DINO: {
    id: 'dino',
    name: '🦕 Dinosaurus',
    emoji: '🦕',
    vocabularyWords: [
      {
        word: 'fossiel',
        definition:
          'Overblijfselen van dieren of planten van heel lang geleden.',
        exampleSentence:
          'We vonden een fossiel van een dinosaurus in de grond.',
      },
      {
        word: 'vulkaan',
        definition: 'Een berg die lava en rook kan uitspuwen.',
        exampleSentence:
          'De vulkaan spuwde hete lava en een grote rookwolk uit.',
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
  },
  CANDY: {
    id: 'candy',
    name: '🍭 Snoep',
    emoji: '🍭',
    vocabularyWords: [
      {
        word: 'karamel',
        definition: 'Een zoete, plakkerige snoep gemaakt van suiker.',
        exampleSentence:
          'De karamel was zo plakkerig dat het aan mijn tanden bleef kleven.',
      },
      {
        word: 'chocolade',
        definition: 'Een lekkernij gemaakt van cacaobonen.',
        exampleSentence: 'Ik kreeg een reep chocolade voor mijn verjaardag.',
      },
      {
        word: 'lolly',
        definition: 'Een snoepje op een stokje.',
        exampleSentence:
          'Na het zwemmen kreeg ik een grote rode lolly van mama.',
      },
      {
        word: 'marshmallow',
        definition: 'Een zacht, luchtig snoepje.',
        exampleSentence: 'We roosterden een marshmallow boven het kampvuur.',
      },
      {
        word: 'traktatie',
        definition: 'Iets lekkers dat je uitdeelt aan anderen.',
        exampleSentence:
          'Op mijn verjaardag nam ik een leuke traktatie mee naar school.',
      },
      {
        word: 'bakkerij',
        definition: 'Een winkel waar brood en taart gemaakt wordt.',
        exampleSentence: 'We kochten een verjaardagstaart bij de bakkerij.',
      },
      {
        word: 'ingrediënt',
        definition: 'Iets dat je nodig hebt om eten klaar te maken.',
        exampleSentence:
          'Suiker is een belangrijk ingrediënt voor het maken van koekjes.',
      },
      {
        word: 'smaak',
        definition: 'Hoe iets proeft, zoals zoet of zuur.',
        exampleSentence: 'Dit snoepje heeft een hele zoete smaak.',
      },
      {
        word: 'suikerspin',
        definition: 'Luchtige, zoete draadjes suiker op een stokje.',
        exampleSentence: 'Op de kermis kocht ik een grote roze suikerspin.',
      },
      {
        word: 'smullen',
        definition: 'Met veel plezier eten.',
        exampleSentence: 'We gingen lekker smullen van de pannenkoeken.',
      },
    ],
    readingTexts: [
      {
        level: 'short',
        text: 'In de snoepwinkel staan potten vol kleurrijke snoepjes. Er zijn zuurtjes, dropjes en lolly\u2019s.',
        question: 'Wat staat er in de potten?',
        answer: 'Kleurrijke snoepjes',
        wrongAnswers: ['Koekjes', 'Bloemen', 'Speelgoed'],
        statements: [
          { text: 'In de snoepwinkel staan potten.', isTrue: true },
          { text: 'Er zijn zuurtjes, dropjes en lolly\u2019s.', isTrue: true },
          { text: 'De potten staan in een speelgoedwinkel.', isTrue: false },
          { text: 'Er zijn alleen maar dropjes.', isTrue: false },
        ],
      },
      {
        level: 'short',
        text: 'Chocolade wordt gemaakt van cacaobonen. Die groeien aan bomen in warme landen.',
        question: 'Waar wordt chocolade van gemaakt?',
        answer: 'Cacaobonen',
        wrongAnswers: ['Suikerbieten', 'Melk', 'Tarwe'],
        statements: [
          { text: 'Chocolade wordt gemaakt van cacaobonen.', isTrue: true },
          { text: 'Cacaobonen groeien in warme landen.', isTrue: true },
          { text: 'Cacaobonen groeien in koude landen.', isTrue: false },
          { text: 'Chocolade wordt gemaakt van melk.', isTrue: false },
        ],
      },
      {
        level: 'long',
        text: 'Op de kermis maakt de man suikerspinnen. Hij draait een stokje rond in de machine. Langzaam komt er een grote roze wolk van suiker op het stokje. De kinderen vinden het heerlijk.',
        question: 'Welke kleur heeft de suikerspin?',
        answer: 'Roze',
        wrongAnswers: ['Blauw', 'Geel', 'Groen'],
        statements: [
          { text: 'De man maakt suikerspinnen op de kermis.', isTrue: true },
          { text: 'De suikerspin is roze.', isTrue: true },
          { text: 'De suikerspin is blauw.', isTrue: false },
          { text: 'De kinderen vinden het niet lekker.', isTrue: false },
        ],
      },
      {
        level: 'long',
        text: 'In de snoepfabriek worden duizenden snoepjes per dag gemaakt. Eerst worden de ingrediënten gemengd. Daarna worden de snoepjes in vormpjes gedrukt. Tot slot gaan ze in mooie zakjes verpakt.',
        question: 'Waar worden de snoepjes in gedrukt?',
        answer: 'In vormpjes',
        wrongAnswers: ['In doosjes', 'In kopjes', 'In bakjes'],
        statements: [
          {
            text: 'Er worden duizenden snoepjes per dag gemaakt.',
            isTrue: true,
          },
          { text: 'De snoepjes gaan in mooie zakjes verpakt.', isTrue: true },
          {
            text: 'Er worden maar tien snoepjes per dag gemaakt.',
            isTrue: false,
          },
          { text: 'De snoepjes worden in doosjes gedrukt.', isTrue: false },
        ],
      },
    ],
    colors: {
      primary: 'bg-pink-500',
      secondary: 'bg-yellow-400',
      wall: 'bg-pink-700',
      path: 'bg-pink-600',
      player: '👧',
      challenge: '🪅',
    },
    pathChar: '✧',
    friendlies: ['🍩', '🧁', '🍪', '🧇', '🎀', '🍬', '🍭', '🍫', '🍰', '🍡'],
    story: {
      intro:
        "Paniek in Snoepland! De Snoepkoningin is haar feest aan het voorbereiden, maar al haar zoete vriendjes zijn verdwaald in het reusachtige snoeppaleis! Ze zitten verstopt tussen de lolly's, karamels en chocolade. Help de Snoepkoningin om al haar vriendjes te vinden voor het feest begint!",
      friendTexts: [
        'Hoera! Ik zat vast in de karamel, zo plakkerig!',
        "Eindelijk! Ik verdwaalde tussen de reuzenlolly's!",
        'Dankjewel! De chocoladerivier was zo verleidelijk!',
        'Joepie! Nu kan ik mee naar het snoepfeest!',
        'Yes! Ik at bijna alle marshmallows op!',
        'Gelukkig! De zure matten waren te zuur voor mij!',
        'Super! Samen eten we de lekkerste traktaties!',
        'Fijn! Ik was bang dat ik het feest zou missen!',
        'Geweldig! Laten we de anderen ook gaan zoeken!',
        'Wauw, je hebt me gevonden in deze zoete wereld!',
      ],
      endingComplete:
        'SNOEPFEEST! 🍭 Alle zoete vriendjes zijn gevonden en het feest kan beginnen! De Snoepkoningin is dolgelukkig en iedereen smult van de heerlijkste lekkernijen. Jij bent de zoetste held ooit!',
      endingIncomplete:
        'Je verlaat Snoepland... maar niet alle vriendjes zijn op het feest. Ze dwalen nog rond tussen de snoepjes, alleen en verdwaald. 🥺',
      warningLeave:
        'Wacht! Er zijn nog vriendjes verdwaald in Snoepland! Het feest is niet compleet zonder hen. Weet je zeker dat je ze achterlaat?',
    },
  },
  SPORTS: {
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
        exampleSentence:
          'In de laatste minuut maakte hij het winnende doelpunt!',
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
  },
  FOOD: {
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
        exampleSentence:
          'We misten nog een ingrediënt voor het recept: een ei.',
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
  },
  TRAFFIC: {
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
  },
  FARM: {
    id: 'farm',
    name: '🚜 Boerderij',
    emoji: '🚜',
    vocabularyWords: [
      {
        word: 'oogst',
        definition: 'Groenten of fruit van het land halen.',
        exampleSentence:
          'In de herfst is het tijd voor de oogst van de appels.',
      },
      {
        word: 'tractor',
        definition: 'Een groot voertuig dat op de boerderij werkt.',
        exampleSentence: 'De boer reed met de tractor over het land.',
      },
      {
        word: 'schuur',
        definition:
          'Een groot gebouw op de boerderij om spullen in te bewaren.',
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
        exampleSentence:
          'In het voorjaar gaan we worteltjes zaaien in de tuin.',
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
  },
  MUSIC: {
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
  },
  PIRATES: {
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
  },
};

export const getTheme = (themeId) => {
  return Object.values(THEMES).find((t) => t.id === themeId) || THEMES.SPACE;
};
