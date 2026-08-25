// Générateur de questions QCM rapides pour le Rituel 45 secondes

export interface RituelQuestion {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
  subCategory: 'mental' | 'flashcards' | 'geometry';
}

// 1. Calcul Express (Automatismes de calcul mental)
export function generateMentalRituelQuestion(): RituelQuestion {
  const types = ['mult', 'add', 'frac_simple', 'pow_simple', 'pourcentage'];
  const type = types[Math.floor(Math.random() * types.length)];

  let prompt = '';
  let answer = '';
  let distractors: string[] = [];

  if (type === 'mult') {
    const a = Math.floor(Math.random() * 8) + 6; // 6 à 13
    const b = Math.floor(Math.random() * 8) + 4; // 4 à 11
    const res = a * b;
    prompt = `$${a} \\times ${b} = ?$`;
    answer = String(res);
    distractors = [String(res + a), String(res - b), String(res + 10)];
  } else if (type === 'add') {
    const a = Math.floor(Math.random() * 60) + 25;
    const b = Math.floor(Math.random() * 50) + 18;
    const res = a + b;
    prompt = `$${a} + ${b} = ?$`;
    answer = String(res);
    distractors = [String(res + 10), String(res - 10), String(res + 2)];
  } else if (type === 'frac_simple') {
    const den = [4, 5, 10][Math.floor(Math.random() * 3)];
    const num = Math.floor(Math.random() * (den - 1)) + 1;
    const dec = (num / den).toFixed(2).replace('.', ',');
    prompt = `Écriture décimale de $\\frac{${num}}{${den}}$ :`;
    answer = dec;
    distractors = [
      ((num + 1) / den).toFixed(2).replace('.', ','),
      (num / (den * 2)).toFixed(2).replace('.', ','),
      `${num},${den}`
    ];
  } else if (type === 'pow_simple') {
    const n = Math.floor(Math.random() * 4) + 2;
    const m = Math.floor(Math.random() * 3) + 2;
    prompt = `$10^{${n}} \\times 10^{${m}} = ?$`;
    answer = `10^{${n + m}}`;
    distractors = [`10^{${n * m}}`, `10^{${n + m + 1}}`, `100^{${n + m}}`];
  } else {
    // pourcentage simple
    const pcts = [10, 20, 25, 50];
    const p = pcts[Math.floor(Math.random() * pcts.length)];
    const base = (Math.floor(Math.random() * 8) + 2) * 20; // 40, 60, 80...
    const res = (base * p) / 100;
    prompt = `$${p}\\%$ de $${base} = ?$`;
    answer = String(res);
    distractors = [String(res * 2), String(res + 5), String(base - p)];
  }

  return buildRituelQuestion(prompt, answer, distractors, 'mental');
}

// 2. Flashcards Définitions & Formules (Rappels actifs)
export function generateFlashcardsRituelQuestion(recentPrompts: string[] = []): RituelQuestion {
  const flashs = [
    {
      prompt: 'Identité remarquable $(a+b)^2$ :',
      answer: '$a^2 + 2ab + b^2$',
      distractors: ['$a^2 + b^2$', '$a^2 - 2ab + b^2$', '$2a + 2b$']
    },
    {
      prompt: 'Identité remarquable $(a-b)^2$ :',
      answer: '$a^2 - 2ab + b^2$',
      distractors: ['$a^2 - b^2$', '$a^2 + b^2$', '$a^2 + 2ab + b^2$']
    },
    {
      prompt: 'Identité remarquable $(a-b)(a+b)$ :',
      answer: '$a^2 - b^2$',
      distractors: ['$a^2 + b^2$', '$(a-b)^2$', '$a^2 - 2ab + b^2$']
    },
    {
      prompt: 'Formule du sinus dans le triangle rectangle :',
      answer: '$\\frac{\\text{Opposé}}{\\text{Hypoténuse}}$',
      distractors: ['$\\frac{\\text{Adjacent}}{\\text{Hypoténuse}}$', '$\\frac{\\text{Opposé}}{\\text{Adjacent}}$', '$\\frac{\\text{Hypoténuse}}{\\text{Opposé}}$']
    },
    {
      prompt: 'Formule du cosinus dans le triangle rectangle :',
      answer: '$\\frac{\\text{Adjacent}}{\\text{Hypoténuse}}$',
      distractors: ['$\\frac{\\text{Opposé}}{\\text{Hypoténuse}}$', '$\\frac{\\text{Opposé}}{\\text{Adjacent}}$', '$\\frac{\\text{Adjacent}}{\\text{Opposé}}$']
    },
    {
      prompt: 'Formule de la tangente dans le triangle rectangle :',
      answer: '$\\frac{\\text{Opposé}}{\\text{Adjacent}}$',
      distractors: ['$\\frac{\\text{Adjacent}}{\\text{Opposé}}$', '$\\frac{\\text{Opposé}}{\\text{Hypoténuse}}$', '$\\frac{\\text{Adjacent}}{\\text{Hypoténuse}}$']
    },
    {
      prompt: 'Règle du quotient $\\frac{a^n}{a^m}$ ($a \\neq 0$) :',
      answer: '$a^{n - m}$',
      distractors: ['$a^{n + m}$', '$a^{n \\times m}$', '$a^{n / m}$']
    },
    {
      prompt: 'Règle du produit $a^n \\times a^m$ :',
      answer: '$a^{n + m}$',
      distractors: ['$a^{n \\times m}$', '$a^{n - m}$', '$(ab)^{n+m}$']
    },
    {
      prompt: 'Puissance de puissance $(a^n)^m$ :',
      answer: '$a^{n \\times m}$',
      distractors: ['$a^{n + m}$', '$a^{n - m}$', '$a^{n^m}$']
    },
    {
      prompt: 'Équation d\'une fonction linéaire passant par $O(0,0)$ :',
      answer: '$f(x) = ax$',
      distractors: ['$f(x) = ax + b$', '$f(x) = x + a$', '$f(x) = a$']
    },
    {
      prompt: 'Équation d\'une fonction affine générale :',
      answer: '$f(x) = ax + b$',
      distractors: ['$f(x) = ax$', '$f(x) = x^2 + b$', '$f(x) = a + b$']
    },
    {
      prompt: 'Dans un agrandissement de rapport $k$, les volumes sont multipliés par :',
      answer: '$k^3$',
      distractors: ['$k$', '$k^2$', '$3k$']
    },
    {
      prompt: 'Dans un agrandissement de rapport $k$, les aires sont multipliées par :',
      answer: '$k^2$',
      distractors: ['$k$', '$k^3$', '$2k$']
    },
    {
      prompt: 'La probabilité d\'un événement certain vaut :',
      answer: '$1$',
      distractors: ['$100$', '$0$', '$0{,}5$']
    },
    {
      prompt: 'La probabilité d\'un événement impossible vaut :',
      answer: '$0$',
      distractors: ['$-1$', '$1$', '$0{,}01$']
    },
    {
      prompt: 'Définition de la médiane d\'une série ordonnée :',
      answer: 'Partage la série en deux effectifs égaux',
      distractors: ['La valeur la plus fréquente', 'La somme divisée par le nombre de valeurs', 'La différence Max - Min']
    },
    {
      prompt: 'Définition de l\'étendue d\'une série statistique :',
      answer: 'Valeur Max - Valeur Min',
      distractors: ['La moyenne des extrêmes', 'La valeur du milieu', 'La somme des effectifs']
    }
  ];

  const available = flashs.filter(f => !recentPrompts.includes(f.prompt));
  const pool = available.length > 0 ? available : flashs;
  const item = pool[Math.floor(Math.random() * pool.length)];
  return buildRituelQuestion(item.prompt, item.answer, item.distractors, 'flashcards');
}

// 3. Géométrie Flash (Propriétés et réflexes visuels rapides)
export function generateGeometryRituelQuestion(recentPrompts: string[] = []): RituelQuestion {
  const geoQuestions = [
    {
      prompt: 'Triangle rectangle en $A$ avec $AB = 3$ et $AC = 4$. $BC = ?$ :',
      answer: '$5$',
      distractors: ['$7$', '$6$', '$\\sqrt{7}$']
    },
    {
      prompt: 'Triangle rectangle en $A$ avec $AB = 6$ et $AC = 8$. $BC = ?$ :',
      answer: '$10$',
      distractors: ['$14$', '$12$', '$100$']
    },
    {
      prompt: 'Triangle rectangle en $A$ avec $AB = 5$ et $AC = 12$. $BC = ?$ :',
      answer: '$13$',
      distractors: ['$17$', '$15$', '$14$']
    },
    {
      prompt: 'Triangle rectangle en $A$ avec $AB = 8$ et $AC = 15$. $BC = ?$ :',
      answer: '$17$',
      distractors: ['$23$', '$19$', '$16$']
    },
    {
      prompt: 'Si $(MN) // (BC)$ et $\\frac{AM}{AB} = \\frac{1}{3}$, alors $\\frac{AN}{AC} = ?$ :',
      answer: '$\\frac{1}{3}$',
      distractors: ['$\\frac{2}{3}$', '$3$', '$\\frac{1}{9}$']
    },
    {
      prompt: 'Si $(MN) // (BC)$ et $\\frac{AM}{AB} = \\frac{2}{5}$, alors $\\frac{AN}{AC} = ?$ :',
      answer: '$\\frac{2}{5}$',
      distractors: ['$\\frac{3}{5}$', '$\\frac{4}{25}$', '$\\frac{5}{2}$']
    },
    {
      prompt: 'Somme des 3 angles dans n\'importe quel triangle :',
      answer: '$180^\\circ$',
      distractors: ['$360^\\circ$', '$90^\\circ$', '$100^\\circ$']
    },
    {
      prompt: 'Somme des 4 angles dans un quadrilatère quelconque :',
      answer: '$360^\\circ$',
      distractors: ['$180^\\circ$', '$270^\\circ$', '$540^\\circ$']
    },
    {
      prompt: 'Aire d\'un rectangle de côtés $L = 7\\text{ cm}$ et $l = 4\\text{ cm}$ :',
      answer: '$28\\text{ cm}^2$',
      distractors: ['$22\\text{ cm}^2$', '$11\\text{ cm}^2$', '$14\\text{ cm}^2$']
    },
    {
      prompt: 'Aire d\'un triangle de base $b = 8\\text{ cm}$ et hauteur $h = 5\\text{ cm}$ :',
      answer: '$20\\text{ cm}^2$',
      distractors: ['$40\\text{ cm}^2$', '$26\\text{ cm}^2$', '$13\\text{ cm}^2$']
    },
    {
      prompt: 'Si un carré a pour côté $c = 6\\text{ cm}$, son périmètre vaut :',
      answer: '$24\\text{ cm}$',
      distractors: ['$36\\text{ cm}$', '$12\\text{ cm}$', '$18\\text{ cm}$']
    },
    {
      prompt: 'Si un carré a pour côté $c = 7\\text{ cm}$, son aire vaut :',
      answer: '$49\\text{ cm}^2$',
      distractors: ['$28\\text{ cm}^2$', '$14\\text{ cm}^2$', '$21\\text{ cm}^2$']
    },
    {
      prompt: 'Dans un triangle rectangle, l\'hypoténuse est :',
      answer: 'Le côté opposé à l\'angle droit',
      distractors: ['Le plus petit côté', 'Le côté adjacent à l\'angle droit', 'La hauteur issue de l\'angle droit']
    },
    {
      prompt: 'Volume d\'un cube d\'arête $a = 3\\text{ cm}$ :',
      answer: '$27\\text{ cm}^3$',
      distractors: ['$9\\text{ cm}^3$', '$18\\text{ cm}^3$', '$12\\text{ cm}^3$']
    }
  ];

  const available = geoQuestions.filter(g => !recentPrompts.includes(g.prompt));
  const pool = available.length > 0 ? available : geoQuestions;
  const item = pool[Math.floor(Math.random() * pool.length)];
  return buildRituelQuestion(item.prompt, item.answer, item.distractors, 'geometry');
}

function buildRituelQuestion(prompt: string, answer: string, distractors: string[], subCategory: 'mental' | 'flashcards' | 'geometry'): RituelQuestion {
  const correctStr = String(answer).trim();
  const cleanDistractors = distractors
    .map(v => String(v).trim())
    .filter(v => v !== '' && v !== correctStr);
  
  const uniqueDistractors = Array.from(new Set(cleanDistractors));
  while (uniqueDistractors.length < 3) {
    uniqueDistractors.push(`${correctStr}*${uniqueDistractors.length + 1}`);
  }

  const selectedDistractors = uniqueDistractors.slice(0, 3);
  const allOptions = [correctStr, ...selectedDistractors];

  // Mélange Fisher-Yates
  for (let i = allOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
  }

  if (!allOptions.includes(correctStr)) {
    allOptions[0] = correctStr;
  }

  return {
    id: `rituel_${Date.now()}_${Math.random()}`,
    prompt,
    options: allOptions,
    answer: correctStr,
    subCategory
  };
}

export function generateNextRituelQuestion(subCategory: 'mental' | 'flashcards' | 'geometry', recentPrompts: string[] = []): RituelQuestion {
  if (subCategory === 'mental') return generateMentalRituelQuestion();
  if (subCategory === 'flashcards') return generateFlashcardsRituelQuestion(recentPrompts);
  return generateGeometryRituelQuestion(recentPrompts);
}
