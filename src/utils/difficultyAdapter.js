// Genereer rekensommen op basis van gekozen instellingen
// settings: {
//   enabledOperations: { add, sub, mul, placeValue, lovingHearts, money },
//   maxValue: number,
//   mulTables: string,
//   addSubMode: 'within' | 'beyond',  // binnen of buiten het tiental
//   beyondDigits: 'units' | 'tens' | 'hundreds',  // bij buiten tiental: enkel eenheid, met tiental, met honderdtal
//   placeValueLevel: 'tens' | 'hundreds' | 'thousands',  // niveau voor begripsoefening
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
      return generateMoneyProblem(moneyMaxAmount, moneyIncludeCents);
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

// Begripsoefening: wat is het tiental/eenheid/honderdtal/duizendtal van een getal
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

// Helper: vind optimale combinatie (greedy)
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

// Helper: formatteer bedrag
const formatMoney = (cents) => {
  const euros = Math.floor(cents / 100);
  const remainingCents = cents % 100;

  if (remainingCents === 0) {
    return `€${euros}`;
  }
  return `€${euros},${remainingCents.toString().padStart(2, '0')}`;
};

// Genereer een geld probleem (kiest random uit de 4 types)
const generateMoneyProblem = (maxAmount, includeCents) => {
  const types = ['makeAmount', 'countMoney', 'smartPay', 'change'];
  const type = types[Math.floor(Math.random() * types.length)];

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
  // Simuleer een portemonnee met wat geld
  const wallet = [];
  let walletTotal = 0;

  // Voeg genoeg geld toe om te kunnen betalen
  const sorted = [...currency].sort((a, b) => b - a);
  for (const value of sorted) {
    // Voeg 1-2 van elk toe
    const count = randBetween(1, 2);
    for (let i = 0; i < count; i++) {
      wallet.push(value);
      walletTotal += value;
    }
  }

  // Zorg dat we genoeg hebben
  while (walletTotal < amount) {
    const value = currency[Math.floor(Math.random() * currency.length)];
    wallet.push(value);
    walletTotal += value;
  }

  const optimalCombination = findOptimalCombination(amount, wallet);

  return {
    type: 'smartPay',
    moneyType: 'smartPay',
    amount: amount,
    amountFormatted: formatMoney(amount),
    wallet: wallet.sort((a, b) => b - a),
    optimalCombination: optimalCombination || [],
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

// Exporteer ook helpers voor de minigames
export {
  formatMoney,
  findOptimalCombination,
  getCurrencyForLevel,
  generateValidAmount,
};
