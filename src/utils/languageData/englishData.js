// ============================================
// ENGELSE WOORDENSCHAT
// ============================================
// 150 woorden (50 per niveau) voor Engels leren.
// Elke entry: { english, dutch, level: 'easy'|'medium'|'hard', exampleSentence? }
// exampleSentence alleen bij medium en hard niveau.

export const ENGLISH_VOCABULARY = [
  // ============================================
  // EASY (50 woorden) - Basiswoorden
  // ============================================

  // Kleuren
  { english: 'red', dutch: 'rood', level: 'easy' },
  { english: 'blue', dutch: 'blauw', level: 'easy' },
  { english: 'green', dutch: 'groen', level: 'easy' },
  { english: 'yellow', dutch: 'geel', level: 'easy' },
  { english: 'black', dutch: 'zwart', level: 'easy' },
  { english: 'white', dutch: 'wit', level: 'easy' },
  { english: 'orange', dutch: 'oranje', level: 'easy' },
  { english: 'pink', dutch: 'roze', level: 'easy' },

  // Dieren
  { english: 'cat', dutch: 'kat', level: 'easy' },
  { english: 'dog', dutch: 'hond', level: 'easy' },
  { english: 'fish', dutch: 'vis', level: 'easy' },
  { english: 'bird', dutch: 'vogel', level: 'easy' },
  { english: 'horse', dutch: 'paard', level: 'easy' },
  { english: 'cow', dutch: 'koe', level: 'easy' },
  { english: 'pig', dutch: 'varken', level: 'easy' },
  { english: 'mouse', dutch: 'muis', level: 'easy' },

  // Fruit
  { english: 'apple', dutch: 'appel', level: 'easy' },
  { english: 'banana', dutch: 'banaan', level: 'easy' },
  { english: 'grape', dutch: 'druif', level: 'easy' },
  { english: 'strawberry', dutch: 'aardbei', level: 'easy' },
  { english: 'cherry', dutch: 'kers', level: 'easy' },
  { english: 'lemon', dutch: 'citroen', level: 'easy' },

  // Cijfers
  { english: 'one', dutch: 'één', level: 'easy' },
  { english: 'two', dutch: 'twee', level: 'easy' },
  { english: 'three', dutch: 'drie', level: 'easy' },
  { english: 'four', dutch: 'vier', level: 'easy' },
  { english: 'five', dutch: 'vijf', level: 'easy' },
  { english: 'ten', dutch: 'tien', level: 'easy' },

  // Lichaamsdelen
  { english: 'head', dutch: 'hoofd', level: 'easy' },
  { english: 'hand', dutch: 'hand', level: 'easy' },
  { english: 'foot', dutch: 'voet', level: 'easy' },
  { english: 'eye', dutch: 'oog', level: 'easy' },
  { english: 'nose', dutch: 'neus', level: 'easy' },
  { english: 'mouth', dutch: 'mond', level: 'easy' },
  { english: 'ear', dutch: 'oor', level: 'easy' },

  // Familie
  { english: 'mother', dutch: 'moeder', level: 'easy' },
  { english: 'father', dutch: 'vader', level: 'easy' },
  { english: 'brother', dutch: 'broer', level: 'easy' },
  { english: 'sister', dutch: 'zus', level: 'easy' },
  { english: 'baby', dutch: 'baby', level: 'easy' },

  // Dagelijks
  { english: 'house', dutch: 'huis', level: 'easy' },
  { english: 'school', dutch: 'school', level: 'easy' },
  { english: 'book', dutch: 'boek', level: 'easy' },
  { english: 'water', dutch: 'water', level: 'easy' },
  { english: 'sun', dutch: 'zon', level: 'easy' },
  { english: 'moon', dutch: 'maan', level: 'easy' },
  { english: 'tree', dutch: 'boom', level: 'easy' },
  { english: 'car', dutch: 'auto', level: 'easy' },
  { english: 'ball', dutch: 'bal', level: 'easy' },
  { english: 'door', dutch: 'deur', level: 'easy' },

  // ============================================
  // MEDIUM (50 woorden) - Met voorbeeldzinnen
  // ============================================

  // Voorwerpen & huis
  { english: 'table', dutch: 'tafel', level: 'medium', exampleSentence: 'The book is on the ____.' },
  { english: 'chair', dutch: 'stoel', level: 'medium', exampleSentence: 'Please sit on the ____.' },
  { english: 'window', dutch: 'raam', level: 'medium', exampleSentence: 'Look through the ____.' },
  { english: 'kitchen', dutch: 'keuken', level: 'medium', exampleSentence: 'We cook food in the ____.' },
  { english: 'garden', dutch: 'tuin', level: 'medium', exampleSentence: 'The flowers grow in the ____.' },
  { english: 'bed', dutch: 'bed', level: 'medium', exampleSentence: 'I sleep in my ____ every night.' },
  { english: 'clock', dutch: 'klok', level: 'medium', exampleSentence: 'The ____ on the wall shows three o\'clock.' },
  { english: 'key', dutch: 'sleutel', level: 'medium', exampleSentence: 'I need a ____ to open the door.' },

  // Weer
  { english: 'rain', dutch: 'regen', level: 'medium', exampleSentence: 'Take an umbrella because of the ____.' },
  { english: 'snow', dutch: 'sneeuw', level: 'medium', exampleSentence: 'The ____ makes everything white.' },
  { english: 'wind', dutch: 'wind', level: 'medium', exampleSentence: 'The ____ blows the leaves away.' },
  { english: 'cloud', dutch: 'wolk', level: 'medium', exampleSentence: 'A big ____ is hiding the sun.' },
  { english: 'storm', dutch: 'storm', level: 'medium', exampleSentence: 'Stay inside during the ____.' },

  // Hobby's & sport
  { english: 'football', dutch: 'voetbal', level: 'medium', exampleSentence: 'We play ____ after school.' },
  { english: 'swimming', dutch: 'zwemmen', level: 'medium', exampleSentence: 'I go ____ in the pool.' },
  { english: 'drawing', dutch: 'tekenen', level: 'medium', exampleSentence: 'I love ____ pictures of animals.' },
  { english: 'reading', dutch: 'lezen', level: 'medium', exampleSentence: 'I enjoy ____ books before bed.' },
  { english: 'dancing', dutch: 'dansen', level: 'medium', exampleSentence: 'She is ____ to the music.' },
  { english: 'singing', dutch: 'zingen', level: 'medium', exampleSentence: 'The birds are ____ in the tree.' },

  // School
  { english: 'teacher', dutch: 'leraar', level: 'medium', exampleSentence: 'The ____ helps us learn new things.' },
  { english: 'pencil', dutch: 'potlood', level: 'medium', exampleSentence: 'I write with a ____.' },
  { english: 'paper', dutch: 'papier', level: 'medium', exampleSentence: 'Draw a picture on the ____.' },
  { english: 'classroom', dutch: 'klaslokaal', level: 'medium', exampleSentence: 'We study in the ____.' },
  { english: 'homework', dutch: 'huiswerk', level: 'medium', exampleSentence: 'I do my ____ after dinner.' },
  { english: 'lesson', dutch: 'les', level: 'medium', exampleSentence: 'Today we have a math ____.' },

  // Eten & drinken
  { english: 'bread', dutch: 'brood', level: 'medium', exampleSentence: 'I eat ____ for breakfast.' },
  { english: 'cheese', dutch: 'kaas', level: 'medium', exampleSentence: 'I put ____ on my sandwich.' },
  { english: 'milk', dutch: 'melk', level: 'medium', exampleSentence: 'I drink a glass of ____ every day.' },
  { english: 'chicken', dutch: 'kip', level: 'medium', exampleSentence: 'We eat ____ for dinner tonight.' },
  { english: 'cake', dutch: 'taart', level: 'medium', exampleSentence: 'We have ____ at the birthday party.' },
  { english: 'soup', dutch: 'soep', level: 'medium', exampleSentence: 'The ____ is very hot.' },
  { english: 'cookie', dutch: 'koekje', level: 'medium', exampleSentence: 'Can I have a ____ please?' },

  // Kleding
  { english: 'shirt', dutch: 'shirt', level: 'medium', exampleSentence: 'I wear a blue ____ today.' },
  { english: 'shoes', dutch: 'schoenen', level: 'medium', exampleSentence: 'Put on your ____ before you go outside.' },
  { english: 'hat', dutch: 'hoed', level: 'medium', exampleSentence: 'Wear a ____ when it is sunny.' },
  { english: 'coat', dutch: 'jas', level: 'medium', exampleSentence: 'Take your ____ because it is cold.' },
  { english: 'pants', dutch: 'broek', level: 'medium', exampleSentence: 'I put on my ____ before going to school.' },

  // Overig medium
  { english: 'friend', dutch: 'vriend', level: 'medium', exampleSentence: 'My best ____ lives next door.' },
  { english: 'birthday', dutch: 'verjaardag', level: 'medium', exampleSentence: 'Today is my ____!' },
  { english: 'morning', dutch: 'ochtend', level: 'medium', exampleSentence: 'I wake up early in the ____.' },
  { english: 'night', dutch: 'nacht', level: 'medium', exampleSentence: 'The stars shine at ____.' },
  { english: 'today', dutch: 'vandaag', level: 'medium', exampleSentence: '____ is a beautiful day.' },
  { english: 'tomorrow', dutch: 'morgen', level: 'medium', exampleSentence: 'We go to the park ____.' },
  { english: 'holiday', dutch: 'vakantie', level: 'medium', exampleSentence: 'We go to Spain for our ____.' },
  { english: 'street', dutch: 'straat', level: 'medium', exampleSentence: 'Look both ways before crossing the ____.' },
  { english: 'forest', dutch: 'bos', level: 'medium', exampleSentence: 'We walk through the ____ every Sunday.' },
  { english: 'mountain', dutch: 'berg', level: 'medium', exampleSentence: 'The ____ is very high.' },
  { english: 'river', dutch: 'rivier', level: 'medium', exampleSentence: 'The ____ flows through the city.' },
  { english: 'bridge', dutch: 'brug', level: 'medium', exampleSentence: 'We walk over the ____ to get to school.' },
  { english: 'island', dutch: 'eiland', level: 'medium', exampleSentence: 'The ____ is surrounded by water.' },

  // ============================================
  // HARD (50 woorden) - Met voorbeeldzinnen
  // ============================================

  // Gevoelens
  { english: 'happy', dutch: 'blij', level: 'hard', exampleSentence: 'I feel ____ when I play with my friends.' },
  { english: 'sad', dutch: 'verdrietig', level: 'hard', exampleSentence: 'She was ____ because her cat was lost.' },
  { english: 'angry', dutch: 'boos', level: 'hard', exampleSentence: 'He got ____ when someone took his toy.' },
  { english: 'afraid', dutch: 'bang', level: 'hard', exampleSentence: 'The little boy was ____ of the dark.' },
  { english: 'surprised', dutch: 'verrast', level: 'hard', exampleSentence: 'I was ____ to see my friends at the party.' },
  { english: 'excited', dutch: 'opgewonden', level: 'hard', exampleSentence: 'She is ____ about the school trip.' },
  { english: 'tired', dutch: 'moe', level: 'hard', exampleSentence: 'I am very ____ after running.' },
  { english: 'brave', dutch: 'dapper', level: 'hard', exampleSentence: 'The firefighter is very ____.' },
  { english: 'proud', dutch: 'trots', level: 'hard', exampleSentence: 'My parents are ____ of me.' },
  { english: 'curious', dutch: 'nieuwsgierig', level: 'hard', exampleSentence: 'The ____ cat looked through the window.' },

  // Beroepen
  { english: 'doctor', dutch: 'dokter', level: 'hard', exampleSentence: 'The ____ helps sick people get better.' },
  { english: 'firefighter', dutch: 'brandweerman', level: 'hard', exampleSentence: 'The ____ puts out the fire.' },
  { english: 'police officer', dutch: 'politieagent', level: 'hard', exampleSentence: 'The ____ keeps us safe.' },
  { english: 'farmer', dutch: 'boer', level: 'hard', exampleSentence: 'The ____ grows vegetables on the farm.' },
  { english: 'baker', dutch: 'bakker', level: 'hard', exampleSentence: 'The ____ bakes fresh bread every morning.' },
  { english: 'pilot', dutch: 'piloot', level: 'hard', exampleSentence: 'The ____ flies the airplane.' },
  { english: 'dentist', dutch: 'tandarts', level: 'hard', exampleSentence: 'I visit the ____ twice a year.' },

  // Reizen & vervoer
  { english: 'airplane', dutch: 'vliegtuig', level: 'hard', exampleSentence: 'We fly to London by ____.' },
  { english: 'bicycle', dutch: 'fiets', level: 'hard', exampleSentence: 'I ride my ____ to school every day.' },
  { english: 'train', dutch: 'trein', level: 'hard', exampleSentence: 'The ____ goes very fast.' },
  { english: 'airport', dutch: 'vliegveld', level: 'hard', exampleSentence: 'We drive to the ____ to catch our flight.' },
  { english: 'ticket', dutch: 'kaartje', level: 'hard', exampleSentence: 'You need a ____ to get on the bus.' },
  { english: 'suitcase', dutch: 'koffer', level: 'hard', exampleSentence: 'Pack your ____ for the trip.' },
  { english: 'passport', dutch: 'paspoort', level: 'hard', exampleSentence: 'Show your ____ at the border.' },

  // Tijd & seizoenen
  { english: 'spring', dutch: 'lente', level: 'hard', exampleSentence: 'In ____ the flowers start to bloom.' },
  { english: 'summer', dutch: 'zomer', level: 'hard', exampleSentence: 'We go to the beach in ____.' },
  { english: 'autumn', dutch: 'herfst', level: 'hard', exampleSentence: 'The leaves fall from the trees in ____.' },
  { english: 'winter', dutch: 'winter', level: 'hard', exampleSentence: 'It snows a lot in ____.' },
  { english: 'yesterday', dutch: 'gisteren', level: 'hard', exampleSentence: '____ we visited grandma.' },
  { english: 'already', dutch: 'al', level: 'hard', exampleSentence: 'I have ____ finished my homework.' },
  { english: 'sometimes', dutch: 'soms', level: 'hard', exampleSentence: '____ I walk to school instead of cycling.' },
  { english: 'always', dutch: 'altijd', level: 'hard', exampleSentence: 'She ____ brushes her teeth before bed.' },
  { english: 'never', dutch: 'nooit', level: 'hard', exampleSentence: 'I have ____ been to Australia.' },

  // Werkwoorden & bijvoeglijk
  { english: 'beautiful', dutch: 'mooi', level: 'hard', exampleSentence: 'The sunset is very ____.' },
  { english: 'dangerous', dutch: 'gevaarlijk', level: 'hard', exampleSentence: 'Playing near the road is ____.' },
  { english: 'important', dutch: 'belangrijk', level: 'hard', exampleSentence: 'It is ____ to eat healthy food.' },
  { english: 'different', dutch: 'anders', level: 'hard', exampleSentence: 'Every snowflake is ____.' },
  { english: 'difficult', dutch: 'moeilijk', level: 'hard', exampleSentence: 'This puzzle is very ____.' },
  { english: 'together', dutch: 'samen', level: 'hard', exampleSentence: 'We play ____ in the garden.' },
  { english: 'enough', dutch: 'genoeg', level: 'hard', exampleSentence: 'Do we have ____ chairs for everyone?' },
  { english: 'between', dutch: 'tussen', level: 'hard', exampleSentence: 'The cat sits ____ the two dogs.' },

  // Natuur & omgeving
  { english: 'ocean', dutch: 'oceaan', level: 'hard', exampleSentence: 'The ____ is very deep and blue.' },
  { english: 'desert', dutch: 'woestijn', level: 'hard', exampleSentence: 'It is very hot in the ____.' },
  { english: 'rainbow', dutch: 'regenboog', level: 'hard', exampleSentence: 'Look at the ____ in the sky!' },
  { english: 'butterfly', dutch: 'vlinder', level: 'hard', exampleSentence: 'A colorful ____ landed on the flower.' },
  { english: 'elephant', dutch: 'olifant', level: 'hard', exampleSentence: 'The ____ is the biggest land animal.' },
  { english: 'dolphin', dutch: 'dolfijn', level: 'hard', exampleSentence: 'The ____ jumps out of the water.' },
  { english: 'penguin', dutch: 'pinguïn', level: 'hard', exampleSentence: 'A ____ cannot fly but can swim very well.' },
  { english: 'adventure', dutch: 'avontuur', level: 'hard', exampleSentence: 'Going camping in the forest is a real ____.' },
  { english: 'village', dutch: 'dorp', level: 'hard', exampleSentence: 'My grandmother lives in a small ____.' },
];
