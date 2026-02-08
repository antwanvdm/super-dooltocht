// Genereer rekensommen op basis van gekozen instellingen
// settings: {
//   enabledOperations: { add, sub, mul, placeValue, lovingHearts, money },
//   maxValue: number,
//   mulTables: string,
//   addSubMode: 'within' | 'beyond',  // binnen of buiten het tiental
//   beyondDigits: 'units' | 'tens' | 'hundreds',  // bij buiten tiental: enkel eenheid, met tiental, met honderdtal
//   placeValueLevel: 'tens' | 'hundreds' | 'thousands',  // niveau voor getallen begrijpen
//   moneyMaxAmount: 2000 | 10000 | 50000 | 100000,  // max bedrag in centen
//   moneyIncludeCents: boolean  // wel of niet met centen
// }
export const generateMathProblem = (settings) => {
  const maxValue = Math.max(5, settings?.maxValue || 20);
  const mulTables = settings?.mulTables || 'easy';
  const addSubMode = settings?.addSubMode || 'beyond';
  const beyondDigits = settings?.beyondDigits || 'units';
  const placeValueLevel = settings?.placeValueLevel || 'tens';
  const moneyMaxAmount = settings?.moneyMaxAmount || 2000;
  const moneyIncludeCents = settings?.moneyIncludeCents || false;
  const forceMoneyType = settings?.forceMoneyType || null;
  const enabled = settings?.enabledOperations || {
    add: true,
    sub: true,
    mul: true,
    placeValue: false,
    lovingHearts: false,
    money: false,
  };
  const pool = [];
  if (enabled.add) pool.push('add');
  if (enabled.sub) pool.push('sub');
  if (enabled.mul) pool.push('mul');
  if (enabled.placeValue) pool.push('placeValue');
  if (enabled.lovingHearts) pool.push('lovingHearts');
  if (enabled.money) pool.push('money');
  if (enabled.clock) pool.push('clock');

  const type = pool.length
    ? pool[Math.floor(Math.random() * pool.length)]
    : 'add';

  switch (type) {
    case 'mul':
      return generateMultiplication(mulTables);
    case 'sub':
      return generateSubtraction(maxValue, addSubMode, beyondDigits);
    case 'placeValue':
      return generatePlaceValue(placeValueLevel);
    case 'lovingHearts':
      return generateLovingHearts();
    case 'money':
      return generateMoneyProblem(
        moneyMaxAmount,
        moneyIncludeCents,
        forceMoneyType,
      );
    case 'clock':
      return _generateClockProblem(settings);
    default:
      return generateAddition(maxValue, addSubMode, beyondDigits);
  }
};

const randBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Helper: bepaal het tiental van een getal
const getTens = (n) => Math.floor(n / 10) * 10;

const generateAddition = (max, mode, beyondDigits, attempts = 0) => {
  if (mode === 'within') {
    // Binnen het tiental: resultaat blijft in hetzelfde tiental als eerste getal
    // Bijv: 45+4=49 (blijft in de 40), niet 45+8=53 (gaat naar 50)

    // Prevent infinite loops voor kleine ranges
    if (attempts > 20) {
      // Fallback: kies gewoon een simpele som binnen max
      const a = randBetween(1, Math.floor(max / 2));
      const b = randBetween(1, Math.min(5, max - a));
      return {
        question: `${a} + ${b}`,
        answer: a + b,
        type: 'addition',
      };
    }

    const a = randBetween(Math.max(1, Math.floor(max * 0.2)), max - 1);
    const tensOfA = getTens(a);
    const maxB = Math.min(9 - (a % 10), max - a); // niet over tiental EN niet over max
    if (maxB < 1) {
      // Als a al op 9 eindigt, kies nieuw getal
      return generateAddition(max, mode, beyondDigits, attempts + 1);
    }
    const b = randBetween(1, maxB);
    return {
      question: `${a} + ${b}`,
      answer: a + b,
      type: 'addition',
    };
  }

  // Buiten het tiental
  if (beyondDigits === 'units') {
    // Alleen eenheden: bijv. 78+3=81 (gaat over tiental maar b is eenheid)

    // Prevent infinite loops
    if (attempts > 20) {
      const a = randBetween(1, Math.floor(max / 2));
      const b = randBetween(1, Math.min(9, max - a));
      return {
        question: `${a} + ${b}`,
        answer: a + b,
        type: 'addition',
      };
    }

    const a = randBetween(Math.max(10, Math.floor(max * 0.3)), max - 9);
    const unitsOfA = a % 10;
    // We willen dat a+b over het tiental gaat, dus b > (10 - unitsOfA)
    const minB = Math.max(1, 10 - unitsOfA + 1);
    const maxB = Math.min(9, max - a);
    if (maxB < minB) {
      return generateAddition(max, mode, beyondDigits, attempts + 1);
    }
    const b = randBetween(minB, maxB);
    return {
      question: `${a} + ${b}`,
      answer: a + b,
      type: 'addition',
    };
  } else if (beyondDigits === 'tens') {
    // Met tiental: bijv. 78+13=91
    const a = randBetween(Math.max(10, Math.floor(max * 0.3)), max - 11);
    const b = randBetween(10, Math.min(99, max - a));
    return {
      question: `${a} + ${b}`,
      answer: a + b,
      type: 'addition',
    };
  } else {
    // Met honderdtal: bijv. 178+123=301
    const a = randBetween(Math.max(100, Math.floor(max * 0.3)), max - 100);
    const b = randBetween(100, Math.min(999, max - a));
    return {
      question: `${a} + ${b}`,
      answer: a + b,
      type: 'addition',
    };
  }
};

const generateSubtraction = (max, mode, beyondDigits) => {
  if (mode === 'within') {
    // Binnen het tiental: resultaat blijft in hetzelfde tiental als eerste getal
    // Bijv: 45-4=41 (blijft in de 40), niet 43-5=38 (gaat naar 30)
    const a = randBetween(Math.max(11, Math.floor(max * 0.3)), max);
    const unitsOfA = a % 10;
    const maxB = unitsOfA; // niet onder het tiental
    if (maxB < 1) {
      // Als a op 0 eindigt, kies nieuw getal
      return generateSubtraction(max, mode, beyondDigits);
    }
    const b = randBetween(1, maxB);
    return {
      question: `${a} - ${b}`,
      answer: a - b,
      type: 'subtraction',
    };
  }

  // Buiten het tiental
  if (beyondDigits === 'units') {
    // Alleen eenheden: bijv. 61-9=52 (gaat over tiental maar b is eenheid)
    const a = randBetween(Math.max(11, Math.floor(max * 0.3)), max);
    const unitsOfA = a % 10;
    // We willen dat a-b onder het tiental gaat, dus b > unitsOfA
    const minB = unitsOfA + 1;
    const maxB = Math.min(9, a - 1);
    if (maxB < minB) {
      return generateSubtraction(max, mode, beyondDigits);
    }
    const b = randBetween(minB, maxB);
    return {
      question: `${a} - ${b}`,
      answer: a - b,
      type: 'subtraction',
    };
  } else if (beyondDigits === 'tens') {
    // Met tiental: bijv. 61-39=22
    const a = randBetween(Math.max(20, Math.floor(max * 0.4)), max);
    const b = randBetween(10, Math.min(99, a - 1));
    return {
      question: `${a} - ${b}`,
      answer: a - b,
      type: 'subtraction',
    };
  } else {
    // Met honderdtal: bijv. 461-239=222
    const a = randBetween(Math.max(200, Math.floor(max * 0.4)), max);
    const b = randBetween(100, Math.min(999, a - 1));
    return {
      question: `${a} - ${b}`,
      answer: a - b,
      type: 'subtraction',
    };
  }
};

const generateMultiplication = (mulTables) => {
  // Bepaal welke tafels beschikbaar zijn op basis van de selectie
  let availableTables;
  switch (mulTables) {
    case 'easy':
      availableTables = [1, 2, 5, 10];
      break;
    case 'medium':
      availableTables = [3, 4, 6, 7, 8, 9];
      break;
    case 'hard':
      availableTables = [11, 12];
      break;
    case 'expert':
      availableTables = [13, 14, 15, 16, 17, 18, 19, 20];
      break;
    case 'all':
      availableTables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      break;
    case 'allplus':
    default:
      availableTables = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ];
      break;
  }

  // Kies een random tafel uit de beschikbare tafels
  const table =
    availableTables[Math.floor(Math.random() * availableTables.length)];
  // Kies een random vermenigvuldiger van 1 t/m 10
  const multiplier = randBetween(1, 10);

  // Tafel altijd als tweede getal: 1x5, 2x5, 3x5 (tafel van 5)
  return {
    question: `${multiplier} × ${table}`,
    answer: multiplier * table,
    type: 'multiplication',
  };
};

// Getallen begrijpen: wat is het tiental/eenheid/honderdtal/duizendtal van een getal
// Antwoorden zijn de werkelijke plaatswaarden: 44 -> eenheid=4, tiental=40
const generatePlaceValue = (level) => {
  let number, position, answer, positionName, allPlaceValues;

  switch (level) {
    case 'tens':
      // Getal van 10-99, vraag naar tiental of eenheid
      number = randBetween(10, 99);
      position = Math.random() < 0.5 ? 'units' : 'tens';
      allPlaceValues = [
        number % 10, // eenheid: 4
        (Math.floor(number / 10) % 10) * 10, // tiental: 40
      ];
      if (position === 'units') {
        answer = number % 10;
        positionName = 'eenheid';
      } else {
        answer = (Math.floor(number / 10) % 10) * 10;
        positionName = 'tiental';
      }
      break;
    case 'hundreds':
      // Getal van 100-999, vraag naar eenheid/tiental/honderdtal
      number = randBetween(100, 999);
      const positions100 = ['units', 'tens', 'hundreds'];
      position = positions100[Math.floor(Math.random() * positions100.length)];
      allPlaceValues = [
        number % 10, // eenheid: 8
        (Math.floor(number / 10) % 10) * 10, // tiental: 70
        (Math.floor(number / 100) % 10) * 100, // honderdtal: 600
      ];
      if (position === 'units') {
        answer = number % 10;
        positionName = 'eenheid';
      } else if (position === 'tens') {
        answer = (Math.floor(number / 10) % 10) * 10;
        positionName = 'tiental';
      } else {
        answer = (Math.floor(number / 100) % 10) * 100;
        positionName = 'honderdtal';
      }
      break;
    case 'thousands':
    default:
      // Getal van 1000-9999, vraag naar eenheid/tiental/honderdtal/duizendtal
      number = randBetween(1000, 9999);
      const positions1000 = ['units', 'tens', 'hundreds', 'thousands'];
      position =
        positions1000[Math.floor(Math.random() * positions1000.length)];
      allPlaceValues = [
        number % 10, // eenheid: 1
        (Math.floor(number / 10) % 10) * 10, // tiental: 20
        (Math.floor(number / 100) % 10) * 100, // honderdtal: 300
        (Math.floor(number / 1000) % 10) * 1000, // duizendtal: 4000
      ];
      if (position === 'units') {
        answer = number % 10;
        positionName = 'eenheid';
      } else if (position === 'tens') {
        answer = (Math.floor(number / 10) % 10) * 10;
        positionName = 'tiental';
      } else if (position === 'hundreds') {
        answer = (Math.floor(number / 100) % 10) * 100;
        positionName = 'honderdtal';
      } else {
        answer = (Math.floor(number / 1000) % 10) * 1000;
        positionName = 'duizendtal';
      }
      break;
  }

  return {
    question: `${number}`,
    answer: answer,
    type: 'placeValue',
    positionName: positionName,
    number: number,
    allPlaceValues: allPlaceValues, // alle plaatswaarden als antwoordopties
  };
};

// Verliefde harten: welke getallen samen 10 maken
const generateLovingHearts = () => {
  // Paren die samen 10 maken: 1+9, 2+8, 3+7, 4+6, 5+5
  const a = randBetween(1, 9);
  const b = 10 - a;

  return {
    question: `${a} + ? = 10`,
    answer: b,
    type: 'lovingHearts',
    firstNumber: a,
  };
};

// Genereer verkeerde antwoorden die logisch lijken, geschaald naar antwoordgrootte
export const generateWrongAnswers = (correctAnswer, count = 3) => {
  const wrong = new Set();
  // Schaal de offset op basis van de grootte van het antwoord
  // Minimum scale van 3 om te voorkomen dat we vastlopen bij kleine antwoorden
  const scale = Math.max(3, Math.floor(correctAnswer * 0.15) || 3);

  let attempts = 0;
  const maxAttempts = 100;

  while (wrong.size < count && attempts < maxAttempts) {
    attempts++;
    const offset = randBetween(-scale * 2, scale * 2);
    const wrongAnswer = correctAnswer + offset;

    if (wrongAnswer !== correctAnswer && wrongAnswer > 0) {
      wrong.add(wrongAnswer);
    }
  }

  // Fallback: als we niet genoeg unieke antwoorden hebben, vul aan met simpele offsets
  let fallbackOffset = 1;
  while (wrong.size < count) {
    const fallbackWrong = correctAnswer + fallbackOffset;
    if (fallbackWrong > 0 && !wrong.has(fallbackWrong)) {
      wrong.add(fallbackWrong);
    } else {
      // Probeer negatieve offset als positieve al bestaat
      const negativeFallback = correctAnswer - fallbackOffset;
      if (negativeFallback > 0 && !wrong.has(negativeFallback)) {
        wrong.add(negativeFallback);
      }
    }
    fallbackOffset++;
  }

  return Array.from(wrong);
};

// ============================================
// GELD OEFENINGEN
// ============================================

// Beschikbare valuta (waarden in centen)
const CURRENCY = {
  cents: [5, 10, 20, 50],
  euroCoins: [100, 200],
  smallBills: [500, 1000, 2000],
  mediumBills: [5000],
  largeBills: [10000, 20000, 50000],
};

// Helper: krijg beschikbare valuta op basis van niveau
const getCurrencyForLevel = (maxAmount, includeCents) => {
  const currency = [...CURRENCY.euroCoins, ...CURRENCY.smallBills];

  if (includeCents) {
    currency.push(...CURRENCY.cents);
  }

  if (maxAmount >= 10000) {
    currency.push(...CURRENCY.mediumBills);
  }

  if (maxAmount >= 50000) {
    currency.push(10000, 20000);
  }

  if (maxAmount >= 100000) {
    currency.push(50000);
  }

  return currency.sort((a, b) => a - b);
};

// Helper: genereer een valide bedrag
const generateValidAmount = (maxAmount, includeCents, minAmount = 100) => {
  if (includeCents) {
    const min = Math.max(minAmount, 5);
    return Math.floor(Math.random() * ((maxAmount - min) / 5 + 1)) * 5 + min;
  } else {
    const minEuros = Math.max(Math.ceil(minAmount / 100), 1);
    const maxEuros = Math.floor(maxAmount / 100);
    return (
      (Math.floor(Math.random() * (maxEuros - minEuros + 1)) + minEuros) * 100
    );
  }
};

// Helper: vind optimale combinatie (greedy) - voor onbeperkte currency
const findOptimalCombination = (targetCents, availableCurrency) => {
  const sorted = [...availableCurrency].sort((a, b) => b - a);
  const combination = [];
  let remaining = targetCents;

  for (const value of sorted) {
    while (remaining >= value) {
      combination.push(value);
      remaining -= value;
    }
  }

  return remaining === 0 ? combination : null;
};

// Helper: vind een subset van de wallet die exact het bedrag maakt (subset sum)
const findExactCombinationFromWallet = (targetCents, wallet) => {
  // Gebruik dynamische programmering om een exacte combinatie te vinden
  // We houden bij welke combinatie elk bedrag kan maken
  const dp = new Map();
  dp.set(0, []);

  for (let i = 0; i < wallet.length; i++) {
    const value = wallet[i];
    // Loop van hoog naar laag om elk item maar 1x te gebruiken
    const entries = Array.from(dp.entries()).sort((a, b) => b[0] - a[0]);

    for (const [currentSum, combination] of entries) {
      const newSum = currentSum + value;
      if (newSum <= targetCents && !dp.has(newSum)) {
        dp.set(newSum, [...combination, value]);
      }
      if (newSum === targetCents) {
        return dp.get(targetCents);
      }
    }
  }

  return dp.get(targetCents) || null;
};

// Helper: formatteer bedrag
const formatMoney = (cents) => {
  const euros = Math.floor(cents / 100);
  const remainingCents = cents % 100;

  if (remainingCents === 0) {
    return `€${euros}`;
  }
  return `€${euros},${remainingCents.toString().padStart(2, '0')}`;
};

// Genereer een geld probleem (kiest random uit de 4 types, of een specifiek type)
const generateMoneyProblem = (maxAmount, includeCents, forceType = null) => {
  const types = ['makeAmount', 'countMoney', 'smartPay', 'change'];
  const type =
    forceType && types.includes(forceType)
      ? forceType
      : types[Math.floor(Math.random() * types.length)];

  const currency = getCurrencyForLevel(maxAmount, includeCents);
  const amount = generateValidAmount(maxAmount, includeCents, 100);

  switch (type) {
    case 'makeAmount':
      return generateMakeAmount(amount, currency);
    case 'countMoney':
      return generateCountMoney(maxAmount, currency);
    case 'smartPay':
      return generateSmartPay(amount, currency);
    case 'change':
      return generateChange(maxAmount, includeCents, currency);
    default:
      return generateMakeAmount(amount, currency);
  }
};

// Type 1: Maak het bedrag - welke combinatie is juist?
const generateMakeAmount = (amount, currency) => {
  const correctCombination = findOptimalCombination(amount, currency);

  if (!correctCombination) {
    // Fallback: genereer een makkelijker bedrag
    const simpleAmount = Math.floor(amount / 100) * 100;
    return generateMakeAmount(simpleAmount, currency);
  }

  return {
    type: 'makeAmount',
    moneyType: 'makeAmount',
    amount: amount,
    amountFormatted: formatMoney(amount),
    correctCombination: correctCombination,
    currency: currency,
  };
};

// Type 2: Tel het geld - hoeveel is dit bij elkaar?
const generateCountMoney = (maxAmount, currency) => {
  // Genereer random verzameling geld
  const numItems = randBetween(3, 6);
  const money = [];
  let total = 0;

  for (let i = 0; i < numItems; i++) {
    const value = currency[Math.floor(Math.random() * currency.length)];
    if (total + value <= maxAmount) {
      money.push(value);
      total += value;
    }
  }

  // Zorg dat we minstens iets hebben
  if (money.length === 0) {
    money.push(currency[0]);
    total = currency[0];
  }

  return {
    type: 'countMoney',
    moneyType: 'countMoney',
    money: money.sort((a, b) => b - a),
    answer: total,
    amountFormatted: formatMoney(total),
    currency: currency,
  };
};

// Type 3: Slim betalen - betaal met zo min mogelijk
const generateSmartPay = (amount, currency) => {
  // Stap 1: Bouw eerst een combinatie die exact het bedrag maakt
  // Dit garandeert dat er altijd een oplossing is
  const optimalCombination = findOptimalCombination(amount, currency);

  if (!optimalCombination) {
    // Fallback: zou niet moeten gebeuren met normale currency
    return {
      type: 'smartPay',
      moneyType: 'smartPay',
      amount: amount,
      amountFormatted: formatMoney(amount),
      wallet: currency.sort((a, b) => b - a),
      optimalCombination: [],
      currency: currency,
    };
  }

  // Start de wallet met de exacte combinatie
  const wallet = [...optimalCombination];

  // Stap 2: Voeg extra geld toe als afleiding (maar niet teveel)
  const sorted = [...currency].sort((a, b) => b - a);
  const extraCount = randBetween(3, 6); // Voeg 3-6 extra items toe

  for (let i = 0; i < extraCount; i++) {
    // Kies een random waarde uit de currency
    const value = sorted[Math.floor(Math.random() * sorted.length)];
    wallet.push(value);
  }

  // Shuffle en sorteer de wallet
  const shuffledWallet = wallet.sort((a, b) => b - a);

  // Dubbelcheck: zoek de optimale combinatie in de daadwerkelijke wallet
  const verifiedCombination = findExactCombinationFromWallet(
    amount,
    shuffledWallet,
  );

  return {
    type: 'smartPay',
    moneyType: 'smartPay',
    amount: amount,
    amountFormatted: formatMoney(amount),
    wallet: shuffledWallet,
    optimalCombination: verifiedCombination || optimalCombination,
    currency: currency,
  };
};

// Type 4: Wisselgeld - hoeveel krijg je terug?
const generateChange = (maxAmount, includeCents, currency) => {
  // Genereer een prijs
  const price = generateValidAmount(
    Math.min(maxAmount, 5000),
    includeCents,
    50,
  );

  // Bepaal betaald bedrag (rond getal groter dan prijs)
  const paymentOptions = [500, 1000, 2000, 5000, 10000].filter(
    (p) => p > price && p <= maxAmount,
  );
  const paid =
    paymentOptions.length > 0
      ? paymentOptions[Math.floor(Math.random() * paymentOptions.length)]
      : Math.ceil(price / 100) * 100 + 100;

  const change = paid - price;

  return {
    type: 'change',
    moneyType: 'change',
    price: price,
    priceFormatted: formatMoney(price),
    paid: paid,
    paidFormatted: formatMoney(paid),
    change: change,
    changeFormatted: formatMoney(change),
    currency: currency,
  };
};

// Genereer meerdere unieke sommen (geen dubbele question strings)
export const generateUniqueMathProblems = (settings, count = 4) => {
  const problems = [];
  const seenQuestions = new Set();
  const maxAttempts = count * 20;
  let attempts = 0;

  while (problems.length < count && attempts < maxAttempts) {
    attempts++;
    const problem = generateMathProblem(settings);
    if (!seenQuestions.has(problem.question)) {
      seenQuestions.add(problem.question);
      problems.push(problem);
    }
  }

  // Fallback: als we na maxAttempts nog niet genoeg hebben, vul aan met wat we
  // krijgen (beter dan niets tonen)
  while (problems.length < count) {
    problems.push(generateMathProblem(settings));
  }

  return problems;
};

// ============================================
// KLOKKIJKEN OEFENINGEN
// ============================================

// Genereer een random kloktijd op basis van niveau
const generateClockTime = (level) => {
  const hours = randBetween(1, 12);

  let minutes;
  switch (level) {
    case 'hours':
      minutes = 0;
      break;
    case 'halfHours':
      minutes = [0, 30][Math.floor(Math.random() * 2)];
      break;
    case 'quarters':
      minutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
      break;
    case 'fiveMinutes':
      minutes = Math.floor(Math.random() * 12) * 5;
      break;
    case 'minutes':
    default:
      minutes = randBetween(0, 59);
      break;
  }

  return { hours, minutes };
};

// Converteer tijd naar Nederlands woordformaat
const timeToWords = (hours, minutes) => {
  if (minutes === 0) {
    return `${numberToWord(hours)} uur`;
  }
  if (minutes === 30) {
    // "half" + volgend uur
    const nextHour = hours === 12 ? 1 : hours + 1;
    return `half ${numberToWord(nextHour)}`;
  }
  if (minutes === 15) {
    // "kwart over" + huidig uur
    return `kwart over ${numberToWord(hours)}`;
  }
  if (minutes === 45) {
    // "kwart voor" + volgend uur
    const nextHour = hours === 12 ? 1 : hours + 1;
    return `kwart voor ${numberToWord(nextHour)}`;
  }
  if (minutes < 30) {
    if (minutes === 5) return `vijf over ${numberToWord(hours)}`;
    if (minutes === 10) return `tien over ${numberToWord(hours)}`;
    if (minutes === 20)
      return `tien voor half ${numberToWord(hours === 12 ? 1 : hours + 1)}`;
    if (minutes === 25)
      return `vijf voor half ${numberToWord(hours === 12 ? 1 : hours + 1)}`;
    // Overige minuten: "X over Y"
    return `${minutes} over ${numberToWord(hours)}`;
  }
  // minutes > 30
  const nextHour = hours === 12 ? 1 : hours + 1;
  if (minutes === 35) return `vijf over half ${numberToWord(nextHour)}`;
  if (minutes === 40) return `tien over half ${numberToWord(nextHour)}`;
  if (minutes === 50) return `tien voor ${numberToWord(nextHour)}`;
  if (minutes === 55) return `vijf voor ${numberToWord(nextHour)}`;
  // Overige minuten > 30
  const remaining = 60 - minutes;
  return `${remaining} voor ${numberToWord(nextHour)}`;
};

// Helper: getal naar Nederlands woord (1-12)
const numberToWord = (n) => {
  const words = [
    '',
    'één',
    'twee',
    'drie',
    'vier',
    'vijf',
    'zes',
    'zeven',
    'acht',
    'negen',
    'tien',
    'elf',
    'twaalf',
  ];
  return words[n] || String(n);
};

// Formatteer digitale tijd (12-uurs notatie, altijd met zero-padding)
const formatDigital = (hours, minutes) => {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

// Formatteer digitale tijd in 24-uurs notatie
const formatDigital24 = (hours24, minutes) => {
  return `${hours24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

// Converteer 12-uurs naar random 24-uurs variant (ochtend of middag)
const to24h = (hours12) => {
  // Geeft een random keuze: ochtend (=zelfde) of middag (+12)
  // Speciale gevallen: 12 → 00:xx of 12:xx
  if (hours12 === 12) {
    return Math.random() < 0.5 ? 0 : 12;
  }
  return Math.random() < 0.5 ? hours12 : hours12 + 12;
};

// Dagdeel tekst op basis van 24-uurs uur
const dagdeel = (hours24) => {
  if (hours24 >= 0 && hours24 < 6) return "'s nachts";
  if (hours24 >= 6 && hours24 < 12) return "'s ochtends";
  if (hours24 >= 12 && hours24 < 18) return "'s middags";
  return "'s avonds";
};

// Genereer foute kloktijden die plausibel zijn
const generateWrongClockTimes = (
  correctHours,
  correctMinutes,
  level,
  count = 3,
) => {
  const wrongTimes = new Set();
  const correctKey = `${correctHours}:${correctMinutes}`;
  let attempts = 0;

  while (wrongTimes.size < count && attempts < 100) {
    attempts++;
    let h = correctHours;
    let m = correctMinutes;
    const variation = Math.floor(Math.random() * 5);

    switch (variation) {
      case 0: // Verkeerd uur
        h = randBetween(1, 12);
        break;
      case 1: // Verwisselde wijzers (klassieke fout)
        if (correctMinutes <= 12 && correctMinutes > 0) {
          h = correctMinutes;
          m = correctHours * 5;
          if (m >= 60) m = m % 60;
        } else {
          h = randBetween(1, 12);
        }
        break;
      case 2: // ±1 uur
        h = correctHours + (Math.random() < 0.5 ? 1 : -1);
        if (h > 12) h = 1;
        if (h < 1) h = 12;
        break;
      case 3: // ±kwartier/half uur
        m = correctMinutes + (Math.random() < 0.5 ? 15 : -15);
        if (m < 0) m += 60;
        if (m >= 60) {
          m -= 60;
          h = h === 12 ? 1 : h + 1;
        }
        break;
      case 4: // ±5 minuten
        m = correctMinutes + (Math.random() < 0.5 ? 5 : -5);
        if (m < 0) m += 60;
        if (m >= 60) {
          m -= 60;
          h = h === 12 ? 1 : h + 1;
        }
        break;
    }

    // Snap naar het juiste niveau
    m = snapMinutesToLevel(m, level);

    const key = `${h}:${m}`;
    if (key !== correctKey && h >= 1 && h <= 12 && m >= 0 && m < 60) {
      wrongTimes.add(key);
    }
  }

  // Fallback als we niet genoeg hebben
  let fallbackH = 1;
  while (wrongTimes.size < count) {
    const key = `${fallbackH}:${correctMinutes}`;
    if (key !== correctKey) wrongTimes.add(key);
    fallbackH++;
  }

  return Array.from(wrongTimes)
    .slice(0, count)
    .map((key) => {
      const [h, m] = key.split(':').map(Number);
      return { hours: h, minutes: m };
    });
};

// Snap minuten naar het dichtstbijzijnde geldige punt voor het niveau
const snapMinutesToLevel = (minutes, level) => {
  switch (level) {
    case 'hours':
      return 0;
    case 'halfHours':
      return minutes >= 45 || minutes < 15 ? 0 : 30;
    case 'quarters':
      return (Math.round(minutes / 15) * 15) % 60;
    case 'fiveMinutes':
      return (Math.round(minutes / 5) * 5) % 60;
    default:
      return minutes;
  }
};

// Genereer een klokprobleem
const _generateClockProblem = (settings) => {
  const clockLevel = settings?.clockLevel || 'hours';
  const clock24h = settings?.clock24h || false;
  const { hours, minutes } = generateClockTime(clockLevel);
  const hours24 = to24h(hours);

  return {
    hours, // 1-12
    hours24, // 0-23 (random ochtend/middag variant)
    minutes,
    digital: formatDigital(hours, minutes),
    digital24: formatDigital24(hours24, minutes),
    words: timeToWords(hours, minutes),
    dagdeel: dagdeel(hours24),
    use24h: clock24h,
    level: clockLevel,
    type: 'clock',
  };
};

export const generateClockProblem = _generateClockProblem;

// Genereer meerdere unieke kloktijden
export const generateUniqueClockProblems = (settings, count = 4) => {
  const problems = [];
  const seen = new Set();
  let attempts = 0;

  while (problems.length < count && attempts < count * 20) {
    attempts++;
    const problem = _generateClockProblem(settings);
    const key = `${problem.hours}:${problem.minutes}`;
    if (!seen.has(key)) {
      seen.add(key);
      problems.push(problem);
    }
  }

  // Fallback
  while (problems.length < count) {
    problems.push(generateClockProblem(settings));
  }

  return problems;
};

// Exporteer ook helpers voor de minigames
export {
  formatMoney,
  findOptimalCombination,
  getCurrencyForLevel,
  generateValidAmount,
  generateWrongClockTimes,
  generateClockTime,
  timeToWords,
  formatDigital,
  formatDigital24,
  to24h,
  dagdeel,
};
