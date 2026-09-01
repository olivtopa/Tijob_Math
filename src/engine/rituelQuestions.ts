// Générateur de questions QCM dynamiques pour le Rituel 45 secondes (Anti-Répétition & Multi-Cycles)
import { CycleId } from '../types/mathquest';

export interface RituelQuestion {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
  subCategory: 'mental' | 'flashcards' | 'geometry';
}

function buildRituelQuestion(
  prompt: string,
  answer: string,
  distractors: string[],
  subCategory: 'mental' | 'flashcards' | 'geometry'
): RituelQuestion {
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

// -------------------------------------------------------------
// 1. CALCUL EXPRESS (Mental)
// -------------------------------------------------------------
export function generateMentalRituelQuestion(recentPrompts: string[] = [], cycle: CycleId = '3eme'): RituelQuestion {
  for (let attempt = 0; attempt < 30; attempt++) {
    let q: RituelQuestion;

    if (cycle === 'lycee') {
      const types = ['radicaux', 'val_abs', 'coeff_mult', 'carre_ref', 'puissance', 'fraction_alg'];
      const type = types[Math.floor(Math.random() * types.length)];

      if (type === 'radicaux') {
        const squareFactors = [2, 3, 4, 5, 6, 7, 8, 9];
        const primes = [2, 3, 5, 6, 7];
        const a = squareFactors[Math.floor(Math.random() * squareFactors.length)];
        const b = primes[Math.floor(Math.random() * primes.length)];
        const n = a * a * b;
        const prompt = `Forme simplifiée de $\\sqrt{${n}}$ :`;
        const ans = `$${a}\\sqrt{${b}}$`;
        const dist = [`$${b}\\sqrt{${a}}$`, `$${a * a}\\sqrt{${b}}$`, `$${a}\\sqrt{${b * 2}}$`];
        q = buildRituelQuestion(prompt, ans, dist, 'mental');
      } else if (type === 'val_abs') {
        const a = Math.floor(Math.random() * 15) + 1;
        const b = Math.floor(Math.random() * 15) + 10;
        const isSwap = Math.random() > 0.5;
        const val1 = isSwap ? b : a;
        const val2 = isSwap ? a : b;
        const diff = Math.abs(val1 - val2);
        const prompt = `$|${val1} - ${val2}| = ?$`;
        q = buildRituelQuestion(prompt, String(diff), [String(-diff), String(val1 + val2), String(diff + 3)], 'mental');
      } else if (type === 'coeff_mult') {
        const rates = [5, 10, 15, 20, 25, 30, 35, 40, 50];
        const r = rates[Math.floor(Math.random() * rates.length)];
        const isIncrease = Math.random() > 0.5;
        const cm = isIncrease ? 1 + r / 100 : 1 - r / 100;
        const prompt = `Coefficient multiplicateur pour une ${isIncrease ? 'hausse' : 'baisse'} de $${r}\\%$ :`;
        const cmStr = cm.toFixed(2).replace('.', ',');
        const dist = [
          (isIncrease ? 1 - r / 100 : 1 + r / 100).toFixed(2).replace('.', ','),
          (r / 100).toFixed(2).replace('.', ','),
          (isIncrease ? 1 + (r + 10) / 100 : 1 - (r + 10) / 100).toFixed(2).replace('.', ',')
        ];
        q = buildRituelQuestion(prompt, cmStr, dist, 'mental');
      } else if (type === 'carre_ref') {
        const n = Math.floor(Math.random() * 10) + 11;
        const isNeg = Math.random() > 0.5;
        const prompt = isNeg ? `$(-${n})^2 = ?$` : `$${n}^2 = ?$`;
        const res = n * n;
        q = buildRituelQuestion(prompt, String(res), [String(-res), String(2 * n), String(res + 10)], 'mental');
      } else if (type === 'puissance') {
        const p = Math.floor(Math.random() * 10) + 2;
        const isEven = Math.random() > 0.5;
        const exp = isEven ? 2 * p : 2 * p + 1;
        const prompt = `$(-1)^{${exp}} = ?$`;
        const ans = isEven ? '1' : '-1';
        q = buildRituelQuestion(prompt, ans, [isEven ? '-1' : '1', '0', String(exp)], 'mental');
      } else {
        const a = Math.floor(Math.random() * 6) + 2;
        const b = Math.floor(Math.random() * 6) + 2;
        const prompt = `Développement de $(x - ${a})(x + ${b})$ :`;
        const sum = b - a;
        const prod = -a * b;
        const sumStr = sum === 0 ? '' : sum > 0 ? `+ ${sum}x ` : `- ${Math.abs(sum)}x `;
        const ans = `$x^2 ${sumStr}- ${Math.abs(prod)}$`;
        const dist = [
          `$x^2 + ${a + b}x - ${Math.abs(prod)}$`,
          `$x^2 - ${Math.abs(prod)}$`,
          `$x^2 ${sumStr}+ ${Math.abs(prod)}$`
        ];
        q = buildRituelQuestion(prompt, ans, dist, 'mental');
      }
    } else if (cycle === 'terminale') {
      const types = ['exp_deriv', 'ln_calc', 'ln_deriv', 'cos_sin_deriv', 'lim_usuelle', 'puiss_deriv'];
      const type = types[Math.floor(Math.random() * types.length)];

      if (type === 'exp_deriv') {
        const k = Math.floor(Math.random() * 7) + 2;
        const prompt = `Dérivée de $f(x) = e^{${k}x}$ :`;
        const ans = `$${k}e^{${k}x}$`;
        const dist = [`$e^{${k}x}$`, `$\\frac{e^{${k}x}}{${k}}$`, `$${k}x e^{${k}x}$`];
        q = buildRituelQuestion(prompt, ans, dist, 'mental');
      } else if (type === 'ln_calc') {
        const n = Math.floor(Math.random() * 8) + 2;
        const prompt = `Valeur exacte de $\\ln(e^{${n}})$ :`;
        q = buildRituelQuestion(prompt, String(n), [`e^{${n}}`, '1', `\\ln(${n})`], 'mental');
      } else if (type === 'ln_deriv') {
        const a = Math.floor(Math.random() * 5) + 2;
        const b = Math.floor(Math.random() * 6) + 1;
        const prompt = `Dérivée de $f(x) = \\ln(${a}x + ${b})$ :`;
        const ans = `$\\frac{${a}}{${a}x + ${b}}$`;
        const dist = [`$\\frac{1}{${a}x + ${b}}$`, `$\\frac{${a}}{x}$`, `$${a}\\ln(${a}x + ${b})$`];
        q = buildRituelQuestion(prompt, ans, dist, 'mental');
      } else if (type === 'cos_sin_deriv') {
        const isCos = Math.random() > 0.5;
        const w = Math.floor(Math.random() * 4) + 2;
        const prompt = isCos ? `Dérivée de $f(x) = \\cos(${w}x)$ :` : `Dérivée de $f(x) = \\sin(${w}x)$ :`;
        const ans = isCos ? `$-${w}\\sin(${w}x)$` : `$${w}\\cos(${w}x)$`;
        const dist = isCos ? [`$${w}\\sin(${w}x)$`, `$-\\sin(${w}x)$`, `$-${w}\\cos(${w}x)$`] : [`$-${w}\\cos(${w}x)$`, `$\\cos(${w}x)$`, `$${w}\\sin(${w}x)$`];
        q = buildRituelQuestion(prompt, ans, dist, 'mental');
      } else if (type === 'lim_usuelle') {
        const lims = [
          { p: '\\lim_{x \\to +\\infty} \\frac{e^x}{x}', a: '+\\infty', d: ['0', '1', 'e'] },
          { p: '\\lim_{x \\to +\\infty} \\frac{\\ln(x)}{x}', a: '0', d: ['+\\infty', '1', '-1'] },
          { p: '\\lim_{x \\to 0^+} x\\ln(x)', a: '0', d: ['-\\infty', '1', 'e'] },
          { p: '\\lim_{x \\to -\\infty} x e^x', a: '0', d: ['-\\infty', '-1', '1'] }
        ];
        const item = lims[Math.floor(Math.random() * lims.length)];
        q = buildRituelQuestion(`Limite $${item.p}$ :`, item.a, item.d, 'mental');
      } else {
        const n = Math.floor(Math.random() * 6) + 3;
        const prompt = `Dérivée de $f(x) = x^{${n}}$ :`;
        const ans = `$${n}x^{${n - 1}}$`;
        const dist = [`$x^{${n - 1}}$`, `$${n}x^{${n}}$`, `$${n - 1}x^{${n}}$`];
        q = buildRituelQuestion(prompt, ans, dist, 'mental');
      }
    } else {
      // 3ème (défaut)
      const types = ['mult', 'add', 'frac_simple', 'pow_simple', 'pourcentage'];
      const type = types[Math.floor(Math.random() * types.length)];

      if (type === 'mult') {
        const a = Math.floor(Math.random() * 9) + 6;
        const b = Math.floor(Math.random() * 9) + 4;
        const res = a * b;
        q = buildRituelQuestion(`$${a} \\times ${b} = ?$`, String(res), [String(res + a), String(res - b), String(res + 10)], 'mental');
      } else if (type === 'add') {
        const a = Math.floor(Math.random() * 60) + 25;
        const b = Math.floor(Math.random() * 50) + 18;
        const res = a + b;
        q = buildRituelQuestion(`$${a} + ${b} = ?$`, String(res), [String(res + 10), String(res - 10), String(res + 2)], 'mental');
      } else if (type === 'frac_simple') {
        const den = [4, 5, 8, 10, 20][Math.floor(Math.random() * 5)];
        const num = Math.floor(Math.random() * (den - 1)) + 1;
        const dec = (num / den).toFixed(2).replace('.', ',');
        q = buildRituelQuestion(`Écriture décimale de $\\frac{${num}}{${den}}$ :`, dec, [
          ((num + 1) / den).toFixed(2).replace('.', ','),
          (num / (den * 2)).toFixed(2).replace('.', ','),
          `${num},${den}`
        ], 'mental');
      } else if (type === 'pow_simple') {
        const n = Math.floor(Math.random() * 5) + 2;
        const m = Math.floor(Math.random() * 4) + 2;
        q = buildRituelQuestion(`$10^{${n}} \\times 10^{${m}} = ?$`, `10^{${n + m}}`, [`10^{${n * m}}`, `10^{${n + m + 1}}`, `100^{${n + m}}`], 'mental');
      } else {
        const pcts = [10, 20, 25, 30, 40, 50, 75];
        const p = pcts[Math.floor(Math.random() * pcts.length)];
        const base = (Math.floor(Math.random() * 8) + 2) * 20;
        const res = (base * p) / 100;
        q = buildRituelQuestion(`$${p}\\%$ de $${base} = ?$`, String(res), [String(res * 2), String(res + 5), String(base - p)], 'mental');
      }
    }

    if (!recentPrompts.includes(q.prompt)) {
      return q;
    }
  }

  const randNum = Math.floor(Math.random() * 50) + 10;
  return buildRituelQuestion(`Calcul express : $${randNum} + 15 = ?$`, String(randNum + 15), [String(randNum + 25), String(randNum + 5), String(randNum + 30)], 'mental');
}

// -------------------------------------------------------------
// 2. FLASHCARDS RÉFLEXES (Méthodes & Formules)
// -------------------------------------------------------------
export function generateFlashcardsRituelQuestion(recentPrompts: string[] = [], cycle: CycleId = '3eme'): RituelQuestion {
  for (let attempt = 0; attempt < 30; attempt++) {
    let q: RituelQuestion;

    if (cycle === 'lycee') {
      const types = ['ensemble', 'union_proba', 'colin_formule', 'carre_min', 'fact_diff', 'py_range', 'milieu_formule', 'droite_pente'];
      const type = types[Math.floor(Math.random() * types.length)];

      if (type === 'ensemble') {
        const samples = [
          { val: '-7', ens: '\\mathbb{Z} (Entiers relatifs)' },
          { val: '3,25', ens: '\\mathbb{D} (Décimaux)' },
          { val: '\\frac{1}{3}', ens: '\\mathbb{Q} (Rationnels non décimaux)' },
          { val: '\\pi', ens: '\\mathbb{R} (Réels irrationnels)' },
          { val: '12', ens: '\\mathbb{N} (Entiers naturels)' },
          { val: '-\\frac{15}{3}', ens: '\\mathbb{Z} (Car égal à -5)' },
          { val: '\\sqrt{2}', ens: '\\mathbb{R} (Irrationnel)' }
        ];
        const item = samples[Math.floor(Math.random() * samples.length)];
        q = buildRituelQuestion(`Plus petit ensemble contenant $${item.val}$ :`, `$${item.ens}$`, [
          '$\\mathbb{N}$ (Entiers naturels)',
          '$\\mathbb{Z}$ (Entiers relatifs)',
          '$\\mathbb{D}$ (Décimaux)',
          '$\\mathbb{Q}$ (Rationnels)'
        ], 'flashcards');
      } else if (type === 'union_proba') {
        q = buildRituelQuestion('Formule de l\'Union $P(A \\cup B)$ :', '$P(A) + P(B) - P(A \\cap B)$', [
          '$P(A) \\times P(B)$',
          '$P(A) + P(B)$',
          '$1 - P(A \\cap B)$'
        ], 'flashcards');
      } else if (type === 'colin_formule') {
        q = buildRituelQuestion('Critère de colinéarité pour $\\vec{u}(x ; y)$ et $\\vec{v}(x\' ; y\')$ :', '$x y\' - y x\' = 0$', [
          '$x x\' + y y\' = 0$',
          '$x y\' + y x\' = 0$',
          '$x/x\' = -y/y\'$'
        ], 'flashcards');
      } else if (type === 'carre_min') {
        const a = Math.floor(Math.random() * 5) + 2;
        const b = Math.floor(Math.random() * 5) + 3;
        q = buildRituelQuestion(`Valeur minimale de $x^2$ pour $x \\in [-${a} ; ${b}]$ :`, '0', [
          String(a * a),
          String(b * b),
          String(-a * a)
        ], 'flashcards');
      } else if (type === 'fact_diff') {
        const a = Math.floor(Math.random() * 8) + 2;
        q = buildRituelQuestion(`Forme factorisée de $x^2 - ${a * a}$ :`, `$(x - ${a})(x + ${a})$`, [
          `$(x - ${a})^2$`,
          `$(x + ${a})^2$`,
          `$x(x - ${a * a})$`
        ], 'flashcards');
      } else if (type === 'py_range') {
        const start = Math.floor(Math.random() * 3) + 1;
        const end = start + Math.floor(Math.random() * 4) + 3;
        const vals: number[] = [];
        for (let i = start; i < end; i++) vals.push(i);
        q = buildRituelQuestion(`En Python, \`range(${start}, ${end})\` parcourt :`, vals.join(', '), [
          [...vals, end].join(', '),
          [start - 1, ...vals].join(', '),
          vals.map(v => v + 1).join(', ')
        ], 'flashcards');
      } else if (type === 'milieu_formule') {
        q = buildRituelQuestion('Formule des coordonnées du milieu $I$ de $[AB]$ :', '$(\\frac{x_A+x_B}{2} ; \\frac{y_A+y_B}{2})$', [
          '$(x_B - x_A ; y_B - y_A)$',
          '$(x_A + x_B ; y_A + y_B)$',
          '$(\\frac{x_B-x_A}{2} ; \\frac{y_B-y_A}{2})$'
        ], 'flashcards');
      } else {
        q = buildRituelQuestion('Formule du coefficient directeur $m$ d\'une droite $(AB)$ :', '$m = \\frac{y_B - y_A}{x_B - x_A}$', [
          '$m = \\frac{x_B - x_A}{y_B - y_A}$',
          '$m = (y_B - y_A)(x_B - x_A)$',
          '$m = \\frac{y_A + y_B}{x_A + x_B}$'
        ], 'flashcards');
      }
    } else if (cycle === 'terminale') {
      const types = ['deriv_prod', 'deriv_comp_exp', 'deriv_comp_ln', 'loi_binom_esp', 'loi_binom_calc', 'tvi_cond', 'scal_3d_formule', 'deriv_quot'];
      const type = types[Math.floor(Math.random() * types.length)];

      if (type === 'deriv_prod') {
        q = buildRituelQuestion('Formule de dérivation du produit $(uv)\'$ :', '$u\'v + uv\'$', [
          '$u\'v\'$',
          '$u\'v - uv\'$',
          '$\\frac{u\'v + uv\'}{v^2}$'
        ], 'flashcards');
      } else if (type === 'deriv_comp_exp') {
        q = buildRituelQuestion('Dérivée de la composée $(e^u)\'$ :', '$u\' e^u$', [
          '$e^u$',
          '$u e^{u-1}$',
          '$\\frac{e^u}{u\'}$'
        ], 'flashcards');
      } else if (type === 'deriv_comp_ln') {
        q = buildRituelQuestion('Dérivée de la composée $(\\ln(u))\'$ pour $u > 0$ :', '$\\frac{u\'}{u}$', [
          '$\\frac{1}{u}$',
          '$\\frac{u}{u\'}$',
          '$u\' \\ln(u)$'
        ], 'flashcards');
      } else if (type === 'loi_binom_esp') {
        q = buildRituelQuestion('Espérance d\'une variable binomiale $X \\sim \\mathcal{B}(n, p)$ :', '$E(X) = n \\times p$', [
          '$E(X) = n p (1 - p)$',
          '$E(X) = \\frac{p}{n}$',
          '$E(X) = n^2 p$'
        ], 'flashcards');
      } else if (type === 'loi_binom_calc') {
        const n = [20, 50, 100, 200][Math.floor(Math.random() * 4)];
        const p = [0.1, 0.2, 0.25, 0.5][Math.floor(Math.random() * 4)];
        const esp = n * p;
        q = buildRituelQuestion(`Si $X \\sim \\mathcal{B}(${n} ; ${p})$, alors $E(X) = ?$`, String(esp), [
          String(esp * (1 - p)),
          String(n + p),
          String(esp * 2)
        ], 'flashcards');
      } else if (type === 'tvi_cond') {
        q = buildRituelQuestion('Pour appliquer le corollaire du TVI (solution unique), $f$ doit être :', 'Continue et strictement monotone', [
          'Dérivable et positive',
          'Continue uniquement',
          'Paire et croissante'
        ], 'flashcards');
      } else if (type === 'scal_3d_formule') {
        q = buildRituelQuestion('Produit scalaire 3D $\\vec{u}(x,y,z) \\cdot \\vec{v}(x\',y\',z\')$ :', '$x x\' + y y\' + z z\'$', [
          '$x y\' + y z\' + z x\'$',
          '$\\sqrt{x x\' + y y\' + z z\'}$',
          '$x x\' - y y\' - z z\'$'
        ], 'flashcards');
      } else {
        q = buildRituelQuestion('Formule de la dérivée du quotient $(\\frac{u}{v})\'$ :', '$\\frac{u\'v - uv\'}{v^2}$', [
          '$\\frac{u\'v + uv\'}{v^2}$',
          '$\\frac{u\'}{v\'}$',
          '$\\frac{u\'v - uv\'}{v}$'
        ], 'flashcards');
      }
    } else {
      // 3ème dynamique
      const types = ['identite_dyn', 'inverse_num', 'affine_pente_dyn', 'affine_ord_dyn', 'frac_mult_inv', 'puiss_regle', 'thales_rapport'];
      const type = types[Math.floor(Math.random() * types.length)];

      if (type === 'identite_dyn') {
        const a = Math.floor(Math.random() * 8) + 2;
        q = buildRituelQuestion(`Développement de $(x + ${a})(x - ${a})$ :`, `$x^2 - ${a * a}$`, [
          `$x^2 + ${a * a}$`,
          `$(x - ${a})^2$`,
          `$x^2 - ${2 * a}x + ${a * a}$`
        ], 'flashcards');
      } else if (type === 'inverse_num') {
        const n = [2, 4, 5, 10, 20, 25, 50][Math.floor(Math.random() * 7)];
        const inv = (1 / n).toString().replace('.', ',');
        q = buildRituelQuestion(`L'inverse du nombre ${n} en écriture décimale :`, inv, [
          `-${n}`,
          (1 / (n * 2)).toString().replace('.', ','),
          `0,0${n}`
        ], 'flashcards');
      } else if (type === 'affine_pente_dyn') {
        const a = Math.floor(Math.random() * 6) + 2;
        const b = Math.floor(Math.random() * 8) + 1;
        q = buildRituelQuestion(`Dans la fonction affine $f(x) = ${a}x + ${b}$, le nombre ${a} est :`, 'Le coefficient directeur (la pente)', [
          'L\'ordonnée à l\'origine',
          'La racine de la fonction',
          'L\'antécédent de 0'
        ], 'flashcards');
      } else if (type === 'affine_ord_dyn') {
        const a = Math.floor(Math.random() * 6) + 2;
        const b = Math.floor(Math.random() * 8) + 1;
        q = buildRituelQuestion(`Dans la fonction affine $f(x) = ${a}x + ${b}$, le point d'intersection avec l'axe $(Oy)$ est :`, `$(0 ; ${b})$`, [
          `$(${b} ; 0)$`,
          `$(${a} ; 0)$`,
          `$(0 ; ${a})$`
        ], 'flashcards');
      } else if (type === 'frac_mult_inv') {
        const c = Math.floor(Math.random() * 4) + 2;
        const d = Math.floor(Math.random() * 5) + 3;
        q = buildRituelQuestion(`Pour diviser par $\\frac{${c}}{${d}}$, on multiplie par :`, `$\\frac{${d}}{${c}}$`, [
          `-\\frac{${c}}{${d}}`,
          `\\frac{${c * 2}}{${d}}`,
          `\\frac{${c}}{${d * 2}}`
        ], 'flashcards');
      } else if (type === 'puiss_regle') {
        q = buildRituelQuestion('Règle de calcul : $a^n \\times a^m = ?$', '$a^{n + m}$', [
          '$a^{n \\times m}$',
          '$a^{n - m}$',
          '$(2a)^{n + m}$'
        ], 'flashcards');
      } else {
        q = buildRituelQuestion('Dans une configuration de Thalès $(MN) // (BC)$, l\'égalité est :', '$\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$', [
          '$\\frac{AM}{AN} = \\frac{AB}{AC}$',
          '$\\frac{AM}{BC} = \\frac{AN}{MN}$',
          '$AM \\times AB = AN \\times AC$'
        ], 'flashcards');
      }
    }

    if (!recentPrompts.includes(q.prompt)) {
      return q;
    }
  }

  const randN = Math.floor(Math.random() * 8) + 2;
  return buildRituelQuestion(`Développement de $(x - ${randN})(x + ${randN})$ :`, `$x^2 - ${randN * randN}$`, [`$x^2 + ${randN * randN}$`, `x^2 - ${2 * randN}`], 'flashcards');
}

// -------------------------------------------------------------
// 3. GÉOMÉTRIE FLASH (Calculs & Théorèmes)
// -------------------------------------------------------------
export function generateGeometryRituelQuestion(recentPrompts: string[] = [], cycle: CycleId = '3eme'): RituelQuestion {
  for (let attempt = 0; attempt < 30; attempt++) {
    let q: RituelQuestion;

    if (cycle === 'lycee') {
      const types = ['vec_coord', 'milieu_calc', 'chasles', 'droite_pente_calc', 'norme_calc'];
      const type = types[Math.floor(Math.random() * types.length)];

      if (type === 'vec_coord') {
        const xa = Math.floor(Math.random() * 8) - 3;
        const ya = Math.floor(Math.random() * 8) - 2;
        const xb = Math.floor(Math.random() * 8) + 1;
        const yb = Math.floor(Math.random() * 8) + 1;
        const vx = xb - xa;
        const vy = yb - ya;
        const prompt = `Coordonnées de $\\vec{AB}$ avec $A(${xa} ; ${ya})$ et $B(${xb} ; ${yb})$ :`;
        const ans = `$(${vx} ; ${vy})$`;
        const dist = [`$(${-vx} ; ${-vy})$`, `$(${xa + xb} ; ${ya + yb})$`, `$(${vx} ; ${-vy})$`];
        q = buildRituelQuestion(prompt, ans, dist, 'geometry');
      } else if (type === 'milieu_calc') {
        const xa = Math.floor(Math.random() * 5) * 2;
        const ya = Math.floor(Math.random() * 5) * 2;
        const xb = Math.floor(Math.random() * 5) * 2 + 2;
        const yb = Math.floor(Math.random() * 5) * 2 + 2;
        const xm = (xa + xb) / 2;
        const ym = (ya + yb) / 2;
        const prompt = `Milieu $I$ de $[AB]$ avec $A(${xa} ; ${ya})$ et $B(${xb} ; ${yb})$ :`;
        const ans = `$(${xm} ; ${ym})$`;
        const dist = [`$(${xa + xb} ; ${ya + yb})$`, `$(${xb - xa} ; ${yb - ya})$`, `$(${xm + 1} ; ${ym - 1})$`];
        q = buildRituelQuestion(prompt, ans, dist, 'geometry');
      } else if (type === 'chasles') {
        const letters = ['A', 'B', 'C', 'D', 'M', 'N', 'P'];
        const l1 = letters[Math.floor(Math.random() * letters.length)];
        let l2 = letters[Math.floor(Math.random() * letters.length)];
        while (l2 === l1) l2 = letters[Math.floor(Math.random() * letters.length)];
        let l3 = letters[Math.floor(Math.random() * letters.length)];
        while (l3 === l2 || l3 === l1) l3 = letters[Math.floor(Math.random() * letters.length)];
        const prompt = `Relation de Chasles : $\\vec{${l1}${l2}} + \\vec{${l2}${l3}} = ?$`;
        const ans = `$\\vec{${l1}${l3}}$`;
        const dist = [`$\\vec{${l3}${l1}}$`, '$\\vec{0}$', `$\\vec{${l1}${l2}}$`];
        q = buildRituelQuestion(prompt, ans, dist, 'geometry');
      } else if (type === 'droite_pente_calc') {
        const m = Math.floor(Math.random() * 5) + 1;
        const p = Math.floor(Math.random() * 6) - 2;
        const prompt = `Pente de la droite passant par $A(1 ; ${m + p})$ et $B(3 ; ${3 * m + p})$ :`;
        q = buildRituelQuestion(prompt, `$m = ${m}$`, [`$m = ${m + 1}$`, `$m = ${2 * m}$`, `$m = ${Math.max(1, m - 1)}$`], 'geometry');
      } else {
        const triplets = [
          { x: 3, y: 4, norm: 5 },
          { x: 6, y: 8, norm: 10 },
          { x: 5, y: 12, norm: 13 },
          { x: 8, y: 15, norm: 17 }
        ];
        const item = triplets[Math.floor(Math.random() * triplets.length)];
        const prompt = `Norme du vecteur $\\vec{u}(${item.x} ; ${item.y})$ :`;
        const ans = `$\\|\\vec{u}\\| = ${item.norm}$`;
        const dist = [`$\\|\\vec{u}\\| = ${item.x + item.y}$`, `$\\|\\vec{u}\\| = ${item.norm * item.norm}$`, `$\\|\\vec{u}\\| = ${item.norm + 2}$`];
        q = buildRituelQuestion(prompt, ans, dist, 'geometry');
      }
    } else if (cycle === 'terminale') {
      const types = ['vect_normal_dyn', 'ortho_3d_dyn', 'norme_3d_dyn'];
      const type = types[Math.floor(Math.random() * types.length)];

      if (type === 'vect_normal_dyn') {
        const a = Math.floor(Math.random() * 5) + 1;
        const b = Math.floor(Math.random() * 5) - 3;
        const c = Math.floor(Math.random() * 5) + 2;
        const d = Math.floor(Math.random() * 9) + 1;
        const prompt = `Vecteur normal au plan $\\mathcal{P} : ${a}x ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}y + ${c}z - ${d} = 0$ :`;
        const ans = `$\\vec{n}(${a} ; ${b} ; ${c})$`;
        const dist = [`$\\vec{n}(${-a} ; ${b} ; ${c})$`, `$\\vec{n}(${a} ; ${b} ; ${-d})$`, `$\\vec{n}(${a} ; ${-b} ; ${c})$`];
        q = buildRituelQuestion(prompt, ans, dist, 'geometry');
      } else if (type === 'ortho_3d_dyn') {
        const k = Math.floor(Math.random() * 4) + 1;
        const prompt = `Si $\\vec{u}(${k} ; 2 ; 1)$ et $\\vec{v}(x ; -1 ; 0)$ sont orthogonaux, alors $x = ?$`;
        const ans = `$${(2 / k).toFixed(2).replace('.', ',')}$`;
        q = buildRituelQuestion(prompt, ans, ['0', '1', '2'], 'geometry');
      } else {
        const triplets = [
          { x: 1, y: 2, z: 2, norm: 3 },
          { x: 2, y: 3, z: 6, norm: 7 },
          { x: 1, y: 4, z: 8, norm: 9 },
          { x: 4, y: 4, z: 7, norm: 9 }
        ];
        const item = triplets[Math.floor(Math.random() * triplets.length)];
        const prompt = `Norme du vecteur $\\vec{u}(${item.x} ; ${item.y} ; ${item.z})$ :`;
        q = buildRituelQuestion(prompt, String(item.norm), [String(item.norm * item.norm), String(item.x + item.y + item.z), String(item.norm + 2)], 'geometry');
      }
    } else {
      // 3ème géométrie dynamique
      const types = ['pythagore_dyn', 'angles_triangle_dyn', 'trigo_cos_dyn', 'aire_triangle_dyn', 'perim_carre_dyn', 'aire_rectangle_dyn'];
      const type = types[Math.floor(Math.random() * types.length)];

      if (type === 'pythagore_dyn') {
        const mult = Math.floor(Math.random() * 4) + 1;
        const base = [{ a: 3, b: 4, c: 5 }, { a: 5, b: 12, c: 13 }][Math.floor(Math.random() * 2)];
        const a = base.a * mult;
        const b = base.b * mult;
        const c = base.c * mult;
        const prompt = `Dans un triangle rectangle de côtés ${a} cm et ${b} cm, l'hypoténuse mesure :`;
        q = buildRituelQuestion(prompt, `${c} cm`, [`${a + b} cm`, `${c + 2} cm`, `${c * 2} cm`], 'geometry');
      } else if (type === 'angles_triangle_dyn') {
        const a1 = (Math.floor(Math.random() * 6) + 3) * 10;
        const a2 = (Math.floor(Math.random() * 5) + 2) * 10;
        const a3 = 180 - (a1 + a2);
        const prompt = `Dans un triangle, si deux angles mesurent $${a1}^\\circ$ et $${a2}^\\circ$, le 3ème vaut :`;
        q = buildRituelQuestion(prompt, `$${a3}^\\circ$`, [`$${a3 + 10}^\\circ$`, `$${a3 - 10}^\\circ$`, `$${180 - a1}^\\circ$`], 'geometry');
      } else if (type === 'trigo_cos_dyn') {
        q = buildRituelQuestion('Formule trigonométrique : $\\cos(\\alpha) = ?$', '$\\frac{\\text{Adjacent}}{\\text{Hypoténuse}}$', [
          '$\\frac{\\text{Opposé}}{\\text{Hypoténuse}}$',
          '$\\frac{\\text{Opposé}}{\\text{Adjacent}}$',
          '$\\frac{\\text{Hypoténuse}}{\\text{Adjacent}}$'
        ], 'geometry');
      } else if (type === 'aire_triangle_dyn') {
        const base = (Math.floor(Math.random() * 5) + 2) * 2;
        const h = Math.floor(Math.random() * 7) + 3;
        const aire = (base * h) / 2;
        const prompt = `Aire d'un triangle de base $b = ${base}\\text{ cm}$ et hauteur $h = ${h}\\text{ cm}$ :`;
        q = buildRituelQuestion(prompt, `$${aire}\\text{ cm}^2$`, [
          `$${base * h}\\text{ cm}^2$`,
          `$${aire + 10}\\text{ cm}^2$`,
          `$${base + h}\\text{ cm}^2$`
        ], 'geometry');
      } else if (type === 'perim_carre_dyn') {
        const c = Math.floor(Math.random() * 8) + 3;
        const p = 4 * c;
        const prompt = `Périmètre d'un carré de côté $c = ${c}\\text{ cm}$ :`;
        q = buildRituelQuestion(prompt, `$${p}\\text{ cm}$`, [
          `$${c * c}\\text{ cm}$`,
          `$${2 * c}\\text{ cm}$`,
          `$${p + 4}\\text{ cm}$`
        ], 'geometry');
      } else {
        const l = Math.floor(Math.random() * 5) + 3;
        const L = l + Math.floor(Math.random() * 5) + 2;
        const aire = L * l;
        const prompt = `Aire d'un rectangle de longueur $L = ${L}\\text{ cm}$ et largeur $l = ${l}\\text{ cm}$ :`;
        q = buildRituelQuestion(prompt, `$${aire}\\text{ cm}^2$`, [
          `$${2 * (L + l)}\\text{ cm}^2$`,
          `$${aire + 5}\\text{ cm}^2$`,
          `$${L + l}\\text{ cm}^2$`
        ], 'geometry');
      }
    }

    if (!recentPrompts.includes(q.prompt)) {
      return q;
    }
  }

  const randS = Math.floor(Math.random() * 8) + 2;
  return buildRituelQuestion(`Périmètre d'un carré de côté $c = ${randS}\\text{ cm}$ :`, `$${4 * randS}\\text{ cm}$`, [`$${randS * randS}\\text{ cm}$`, `$${2 * randS}\\text{ cm}$`], 'geometry');
}

export function generateNextRituelQuestion(
  subCategory: 'mental' | 'flashcards' | 'geometry',
  recentPrompts: string[] = [],
  cycle: CycleId = '3eme'
): RituelQuestion {
  if (subCategory === 'mental') return generateMentalRituelQuestion(recentPrompts, cycle);
  if (subCategory === 'flashcards') return generateFlashcardsRituelQuestion(recentPrompts, cycle);
  return generateGeometryRituelQuestion(recentPrompts, cycle);
}
