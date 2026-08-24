import { DynamicQuestion } from '../types/mathquest';

export function generateDynamicQuestion(realm: string, questIndex: number): DynamicQuestion {
  let q: DynamicQuestion = {
    id: `q_${realm}_${questIndex}_${Date.now()}`,
    title: '',
    question: '',
    options: [],
    answer: '',
    explanationHtml: '',
    hints: []
  };

  const setupOptions = (correct: string, list: string[]) => {
    const correctStr = String(correct).trim();
    // Nettoyage et dédoublonnage des distracteurs
    const cleanList = list
      .map(v => String(v).trim())
      .filter(v => v !== '' && v !== correctStr && !v.includes('NaN') && !v.includes('undefined'));
    
    // Garder uniquement les distracteurs uniques
    const uniqueDistractors = Array.from(new Set(cleanList));

    // Si on a moins de 3 distracteurs valides, ajouter des variantes sûres
    while (uniqueDistractors.length < 3) {
      const fallback = `${correctStr}*${uniqueDistractors.length + 1}`;
      uniqueDistractors.push(fallback);
    }

    // Sélection de 3 distracteurs
    const selectedDistractors = uniqueDistractors.slice(0, 3);
    
    // Construction des 4 options avec la bonne réponse garantie
    const allOptions = [correctStr, ...selectedDistractors];

    // Mélange Fisher-Yates fiable
    for (let i = allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }

    // Sécurité absolue : s'assurer que la bonne réponse est présente
    if (!allOptions.includes(correctStr)) {
      allOptions[0] = correctStr;
    }

    q.options = allOptions;
    q.answer = correctStr;
  };

  if (realm === 'Algèbre') {
    if (questIndex === 0) {
      const isAddition = Math.random() > 0.5;
      if (isAddition) {
        const pairs = [
          { b: 2, d: 4, k: 2 },
          { b: 2, d: 6, k: 3 },
          { b: 3, d: 6, k: 2 },
          { b: 3, d: 9, k: 3 },
          { b: 4, d: 8, k: 2 },
          { b: 5, d: 10, k: 2 }
        ];
        const pair = pairs[Math.floor(Math.random() * pairs.length)];
        const { b, d, k } = pair;
        const a = Math.floor(Math.random() * (b - 1)) + 1;
        const c = Math.floor(Math.random() * (d - 1)) + 1;
        const num = a * k + c;
        const correctVal = `${num}/${d}`;

        q.title = 'Addition de Fractions';
        q.question = `Calcule et donne le résultat sous forme de fraction irréductible : $A = \\frac{${a}}{${b}} + \\frac{${c}}{${d}}$`;
        setupOptions(correctVal, [
          `${a + c}/${b + d}`,
          `${a * c}/${b * d}`,
          `${num + 2}/${d}`,
          `${Math.max(1, num - 3)}/${d}`
        ]);
        q.explanationHtml = `
          <div><strong>Données :</strong> $\\frac{${a}}{${b}} + \\frac{${c}}{${d}}$.</div>
          <div><strong>Règle :</strong> On réduit au même dénominateur (ici $${d}$) en multipliant par $${k}$.</div>
          <div><strong>Calcul :</strong> $\\frac{${a} \\times ${k}}{${b} \\times ${k}} + \\frac{${c}}{${d}} = \\frac{${a * k}}{${d}} + \\frac{${c}}{${d}} = \\frac{${num}}{${d}}$.</div>
        `;
        q.hints = [
          { level: 1, title: 'Dénominateur commun', content: `Met les deux fractions au même dénominateur : $${d}$.` },
          { level: 2, title: 'Conversion', content: `$\\frac{${a}}{${b}} = \\frac{${a * k}}{${d}}$.` },
          { level: 3, title: 'Addition', content: `Additionne les numérateurs : $${a * k} + ${c} = ${num}$.` }
        ];
        q.svgOverlay = (svg) => {
          svg.innerHTML = `
            <text x="150" y="28" fill="#10b981" font-size="15" font-weight="bold" text-anchor="middle">Modélisation : ${a}/${b} + ${c}/${d}</text>
            <rect x="30" y="52" width="240" height="26" rx="6" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
            <rect x="30" y="52" width="${(240 / b) * a}" height="26" rx="6" fill="#10b981" opacity="0.85"/>
            <text x="150" y="98" fill="#cbd5e1" font-size="14" font-weight="bold" text-anchor="middle">Fraction 1 : ${a}/${b}</text>
            <rect x="30" y="115" width="240" height="26" rx="6" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
            <rect x="30" y="115" width="${(240 / d) * c}" height="26" rx="6" fill="#8b5cf6" opacity="0.85"/>
            <text x="150" y="162" fill="#cbd5e1" font-size="14" font-weight="bold" text-anchor="middle">Fraction 2 : ${c}/${d}</text>
            <text x="150" y="206" fill="#f59e0b" font-size="16" font-weight="extrabold" text-anchor="middle">Somme totale A = ?</text>
          `;
        };
      } else {
        const primes = [2, 3, 5, 7];
        const f1 = primes[Math.floor(Math.random() * primes.length)];
        let f2 = primes[Math.floor(Math.random() * primes.length)];
        while (f2 === f1) f2 = primes[Math.floor(Math.random() * primes.length)];
        const commonList = [2, 3, 4, 5, 6];
        const common = commonList[Math.floor(Math.random() * commonList.length)];
        const num = f1 * common;
        const den = f2 * common;
        const correctVal = `${f1}/${f2}`;

        q.title = 'Simplification de Fraction';
        q.question = `Simplifie la fraction $B = \\frac{${num}}{${den}}$ pour la rendre irréductible.`;
        setupOptions(correctVal, [`${f1 + 1}/${f2}`, `${f1}/${den}`, `${num}/${f2}`]);
        q.explanationHtml = `
          <div><strong>Décomposition :</strong> $${num} = ${f1} \\times ${common}$ et $${den} = ${f2} \\times ${common}$.</div>
          <div><strong>Simplification :</strong> En divisant par le facteur commun $${common}$, on obtient $\\frac{${f1}}{${f2}}$.</div>
        `;
        q.hints = [
          { level: 1, title: 'Facteur commun', content: `Trouve un diviseur commun à $${num}$ et $${den}$ (astuce : $${common}$).` },
          { level: 2, title: 'Division', content: `Divise par $${common}$ en haut et en bas.` }
        ];
        q.svgOverlay = (svg) => {
          svg.innerHTML = `
            <text x="150" y="28" fill="#8b5cf6" font-size="15" font-weight="bold" text-anchor="middle">Recherche de Diviseur Commun</text>
            <rect x="50" y="58" width="80" height="42" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="2"/>
            <text x="90" y="85" fill="#fff" font-size="16" font-weight="bold" text-anchor="middle">${num}</text>
            <path d="M 140 79 L 170 79" stroke="#8b5cf6" stroke-width="2.5"/>
            <rect x="180" y="58" width="70" height="42" rx="8" fill="#1e293b" stroke="#64748b" stroke-width="2" stroke-dasharray="3 3"/>
            <text x="215" y="85" fill="#f59e0b" font-size="16" font-weight="extrabold" text-anchor="middle">?</text>
            
            <rect x="50" y="125" width="80" height="42" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="2"/>
            <text x="90" y="152" fill="#fff" font-size="16" font-weight="bold" text-anchor="middle">${den}</text>
            <path d="M 140 146 L 170 146" stroke="#8b5cf6" stroke-width="2.5"/>
            <rect x="180" y="125" width="70" height="42" rx="8" fill="#1e293b" stroke="#64748b" stroke-width="2" stroke-dasharray="3 3"/>
            <text x="215" y="152" fill="#f59e0b" font-size="16" font-weight="extrabold" text-anchor="middle">?</text>
            
            <text x="150" y="206" fill="#cbd5e1" font-size="14" font-weight="bold" text-anchor="middle">Quel est le plus grand diviseur commun ?</text>
          `;
        };
      }
    } else if (questIndex === 1) {
      const isScientific = Math.random() > 0.5;
      if (isScientific) {
        const valNum = (Math.floor(Math.random() * 80) + 12) / 10;
        const zeros = Math.floor(Math.random() * 3) + 3;
        const fullVal = Math.round(valNum * Math.pow(10, zeros));
        const correctVal = `${valNum.toString().replace('.', ',')} \\times 10^{${zeros}}`;

        q.title = 'Écriture Scientifique';
        q.question = `Donne l'écriture scientifique du nombre $N = ${fullVal.toLocaleString('fr-FR')}$.`;
        setupOptions(correctVal, [
          `${(valNum * 10).toString().replace('.', ',')} \\times 10^{${zeros - 1}}`,
          `${(valNum / 10).toString().replace('.', ',')} \\times 10^{${zeros + 1}}`,
          `${valNum.toString().replace('.', ',')} \\times 10^{${zeros + 1}}`
        ]);
        q.explanationHtml = `
          <div><strong>Définition :</strong> L'écriture scientifique est de la forme $a \\times 10^n$ avec $1 \\le a < 10$.</div>
          <div><strong>Démarche :</strong> On place la virgule après le 1er chiffre non nul : $${valNum.toString().replace('.', ',')}$ et on compte le décalage ($${zeros}$ rangs vers la gauche).</div>
          <div><strong>Conclusion :</strong> $${fullVal.toLocaleString('fr-FR')} = ${valNum.toString().replace('.', ',')} \\times 10^{${zeros}}$.</div>
        `;
        q.hints = [
          { level: 1, title: 'Règle du 1er chiffre', content: 'Le nombre $a$ devant la puissance de 10 doit être compris entre 1 et 9 inclus.' },
          { level: 2, title: 'Déplacement de la virgule', content: `La virgule se déplace de $${zeros}$ rangs vers la gauche.` }
        ];
        q.svgOverlay = (svg) => {
          svg.innerHTML = `
            <text x="150" y="30" fill="#8b5cf6" font-size="15" font-weight="bold" text-anchor="middle">Forme a × 10ⁿ (avec 1 ≤ a < 10)</text>
            <rect x="35" y="65" width="230" height="55" rx="10" fill="#1e293b" stroke="#8b5cf6" stroke-width="2"/>
            <text x="150" y="100" fill="#fff" font-size="18" font-weight="bold" text-anchor="middle">${fullVal.toLocaleString('fr-FR')}</text>
            <text x="150" y="160" fill="#f59e0b" font-size="18" font-weight="extrabold" text-anchor="middle">↳ a × 10ⁿ = ?</text>
            <text x="150" y="202" fill="#cbd5e1" font-size="14" font-weight="bold" text-anchor="middle">Décalage de combien de rangs ?</text>
          `;
        };
      } else {
        const n = Math.floor(Math.random() * 4) + 2;
        const m = Math.floor(Math.random() * 3) + 2;
        const p = Math.floor(Math.random() * 4) + 1;
        const correctExp = n + m - p;
        const correctVal = `10^${correctExp}`;

        q.title = 'Puissances de 10';
        q.question = `Simplifie l'expression $C = \\frac{10^{${n}} \\times 10^{${m}}}{10^{${p}}}$ sous la forme $10^k$.`;
        setupOptions(correctVal, [`10^${n + m + p}`, `10^${n * m - p}`, `10^${n + m}`]);
        q.explanationHtml = `
          <div><strong>Propriétés des puissances :</strong> $10^a \\times 10^b = 10^{a+b}$ et $\\frac{10^a}{10^b} = 10^{a-b}$.</div>
          <div><strong>Calcul :</strong> $\\frac{10^{${n}+${m}}}{10^{${p}}} = 10^{${n + m} - ${p}} = 10^{${correctExp}}$.</div>
        `;
        q.hints = [
          { level: 1, title: 'Numérateur', content: `$10^{${n}} \\times 10^{${m}} = 10^{${n}+${m}} = 10^{${n + m}}$.` },
          { level: 2, title: 'Quotient', content: `$\\frac{10^{${n + m}}}{10^{${p}}} = 10^{${n + m}-${p}}$.` }
        ];
        q.svgOverlay = (svg) => {
          svg.innerHTML = `
            <text x="150" y="28" fill="#8b5cf6" font-size="15" font-weight="bold" text-anchor="middle">Règles des Puissances de 10</text>
            
            <!-- Étape 1 : Produit au numérateur -->
            <rect x="35" y="52" width="230" height="42" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/>
            <text x="150" y="78" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">10^${n} × 10^${m} = 10^(${n} + ${m})</text>
            
            <!-- Étape 2 : Quotient sous forme de fraction avec soustraction d'exposants -->
            <rect x="35" y="108" width="230" height="48" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/>
            <text x="105" y="128" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">10^${n + m}</text>
            <line x1="75" y1="134" x2="135" y2="134" stroke="#38bdf8" stroke-width="2"/>
            <text x="105" y="149" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">10^${p}</text>
            <text x="180" y="138" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">= 10^(... - ${p})</text>
            
            <text x="150" y="196" fill="#f59e0b" font-size="17" font-weight="extrabold" text-anchor="middle">k = (${n} + ${m}) - ${p} = ?</text>
          `;
        };
      }
    } else if (questIndex === 2) {
      const isFactorization = Math.random() > 0.5;
      if (isFactorization) {
        const k = Math.floor(Math.random() * 3) + 2;
        const b = Math.floor(Math.random() * 4) + 1;
        const kb = k * b;
        const correctVal = `${k}(x + ${b})`;

        q.title = 'Calcul Littéral — Factorisation';
        q.question = `Factorise l'expression algébrique $E = ${k}x + ${kb}$.`;
        setupOptions(correctVal, [`${k}(x + ${kb})`, `x(${k} + ${b})`, `${k}(x - ${b})`]);
        q.explanationHtml = `
          <div><strong>Facteur commun :</strong> Le nombre $${k}$ est commun aux deux termes : $${k}x$ et $${kb} = ${k} \\times ${b}$.</div>
          <div><strong>Factorisation :</strong> $E = ${k} \\times x + ${k} \\times ${b} = ${k}(x + ${b})$.</div>
        `;
        q.hints = [
          { level: 1, title: 'Repérer le facteur commun', content: `Écris $${kb}$ sous la forme $${k} \\times ${b}$.` },
          { level: 2, title: 'Mise en facteur', content: `Mets $${k}$ en facteur devant la parenthèse.` }
        ];
        q.svgOverlay = (svg) => {
          svg.innerHTML = `
            <text x="150" y="30" fill="#8b5cf6" font-size="15" font-weight="bold" text-anchor="middle">Mise en Facteur Commun</text>
            <rect x="45" y="65" width="95" height="48" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="2"/>
            <text x="92" y="96" fill="#38bdf8" font-size="17" font-weight="bold" text-anchor="middle">${k}x</text>
            <text x="150" y="96" fill="#fff" font-size="20" font-weight="bold" text-anchor="middle">+</text>
            <rect x="160" y="65" width="95" height="48" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="2"/>
            <text x="207" y="96" fill="#38bdf8" font-size="17" font-weight="bold" text-anchor="middle">${kb}</text>
            <text x="150" y="168" fill="#f59e0b" font-size="18" font-weight="extrabold" text-anchor="middle">↳ ? · (x + ?)</text>
          `;
        };
      } else {
        const a = Math.floor(Math.random() * 4) + 2;
        const b = Math.floor(Math.random() * 4) + 2;
        const correctVal = `x² + ${a + b}x + ${a * b}`;

        q.title = 'Double Distributivité';
        q.question = `Développe et réduis l'expression $D = (x + ${a})(x + ${b})$.`;
        setupOptions(correctVal, [`x² + ${a * b}`, `x² + ${a + b}x + ${a + b}`, `x² - ${a + b}x + ${a * b}`]);
        q.explanationHtml = `
          <div><strong>Formule :</strong> $(x+a)(x+b) = x^2 + ax + bx + ab$.</div>
          <div><strong>Développement :</strong> $x^2 + ${b}x + ${a}x + ${a * b} = x^2 + ${a + b}x + ${a * b}$.</div>
        `;
        q.hints = [
          { level: 1, title: 'Double distributivité', content: `Multiplie chaque terme : $x \\times x + x \\times ${b} + ${a} \\times x + ${a} \\times ${b}$.` },
          { level: 2, title: 'Regroupement', content: `Additionne les termes semblables en $x$ : $${a}x + ${b}x = ${a + b}x$.` }
        ];
        q.svgOverlay = (svg) => {
          svg.innerHTML = `
            <text x="150" y="24" fill="#8b5cf6" font-size="14" font-weight="bold" text-anchor="middle">Modèle d'Aire : (x + ${a})(x + ${b})</text>
            <rect x="70" y="48" width="80" height="80" fill="#3b82f6" opacity="0.4" stroke="#3b82f6" stroke-width="1.5"/>
            <text x="110" y="93" fill="#fff" font-size="16" font-weight="bold" text-anchor="middle">x²</text>
            
            <rect x="150" y="48" width="60" height="80" fill="#8b5cf6" opacity="0.4" stroke="#8b5cf6" stroke-width="1.5"/>
            <text x="180" y="93" fill="#fff" font-size="16" font-weight="bold" text-anchor="middle">${a}x</text>
            
            <rect x="70" y="128" width="80" height="50" fill="#ec4899" opacity="0.4" stroke="#ec4899" stroke-width="1.5"/>
            <text x="110" y="158" fill="#fff" font-size="16" font-weight="bold" text-anchor="middle">${b}x</text>
            
            <rect x="150" y="128" width="60" height="50" fill="#10b981" opacity="0.4" stroke="#10b981" stroke-width="1.5"/>
            <text x="180" y="158" fill="#fff" font-size="16" font-weight="bold" text-anchor="middle">${a * b}</text>
            
            <text x="150" y="210" fill="#f59e0b" font-size="14" font-weight="bold" text-anchor="middle">Somme des 4 aires = ?</text>
          `;
        };
      }
    } else {
      const a = Math.floor(Math.random() * 3) + 2;
      const correctX = Math.floor(Math.random() * 5) + 1;
      const b = Math.floor(Math.random() * 6) + 2;
      const c = a * correctX + b;
      const correctVal = `x = ${correctX}`;

      q.title = "Résolution d'Équation";
      q.question = `Résous l'équation du 1er degré : $${a}x + ${b} = ${c}$.`;
      setupOptions(correctVal, [`x = ${correctX + 1}`, `x = ${correctX - 1}`, `x = ${correctX + 2}`]);
      q.explanationHtml = `
        <div><strong>Étape 1 :</strong> Isoler le terme en $x$ en soustrayant $${b}$ : $${a}x = ${c} - ${b} = ${c - b}$.</div>
        <div><strong>Étape 2 :</strong> Diviser par $${a}$ : $x = \\frac{${c - b}}{${a}} = ${correctX}$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Isoler le terme en x', content: `Soustrais $${b}$ des deux côtés.` },
        { level: 2, title: 'Division finale', content: `Divise par $${a}$.` }
      ];
      q.svgOverlay = (svg) => {
        svg.innerHTML = `
          <text x="150" y="26" fill="#8b5cf6" font-size="15" font-weight="bold" text-anchor="middle">Principe de la Balance d'Équilibre</text>
          <line x1="50" y1="85" x2="250" y2="85" stroke="#f59e0b" stroke-width="4"/>
          <polygon points="150,85 138,135 162,135" fill="#f59e0b"/>
          <rect x="45" y="95" width="80" height="40" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
          <text x="85" y="121" fill="#38bdf8" font-size="15" font-weight="bold" text-anchor="middle">${a}x + ${b}</text>
          <rect x="175" y="95" width="80" height="40" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
          <text x="215" y="121" fill="#10b981" font-size="15" font-weight="bold" text-anchor="middle">${c}</text>
          
          <text x="150" y="195" fill="#f59e0b" font-size="16" font-weight="extrabold" text-anchor="middle">Isoler x = ?</text>
        `;
      };
    }
  } else if (realm === 'Fonctions') {
    if (questIndex === 0) {
      const typeSub = Math.random();
      if (typeSub < 0.5) {
        const coeff = Math.floor(Math.random() * 3) + 2;
        const constant = Math.floor(Math.random() * 5) + 1;
        const xVal = Math.floor(Math.random() * 5) - 2;
        const img = coeff * (xVal * xVal) - constant;
        const correctVal = String(img);

        q.title = 'Notion de Fonction — Calcul d\'Image';
        q.question = `Soit la fonction $g(x) = ${coeff}x^2 - ${constant}$. Calcule l'image de $${xVal}$ par $g$, notée $g(${xVal})$.`;
        setupOptions(correctVal, [String(img + 2), String(img - coeff), String(coeff * xVal - constant)]);
        q.explanationHtml = `
          <div><strong>Règle :</strong> Pour calculer l'image d'un nombre $x$, on remplace $x$ par ce nombre dans l'expression de la fonction.</div>
          <div><strong>Calcul :</strong> $g(${xVal}) = ${coeff} \\times (${xVal})^2 - ${constant} = ${coeff} \\times (${xVal * xVal}) - ${constant} = ${coeff * xVal * xVal} - ${constant} = ${img}$.</div>
        `;
        q.hints = [
          { level: 1, title: 'Priorité opératoire', content: `Calcule d'abord le carré $(${xVal})^2 = ${xVal * xVal}$.` },
          { level: 2, title: 'Multiplication', content: `Multiplie par $${coeff}$ : $${coeff} \\times ${xVal * xVal} = ${coeff * xVal * xVal}$.` },
          { level: 3, title: 'Soustraction', content: `Soustrais $${constant}$ pour trouver $${img}$.` }
        ];
        q.svgOverlay = (svg) => {
          svg.innerHTML = `
            <text x="150" y="30" fill="#ec4899" font-size="15" font-weight="bold" text-anchor="middle">Machine Fonction : x ↦ g(x)</text>
            <circle cx="50" cy="110" r="30" fill="#1e293b" stroke="#ec4899" stroke-width="2"/>
            <text x="50" y="104" fill="#cbd5e1" font-size="12" text-anchor="middle">Antécédent</text>
            <text x="50" y="124" fill="#fff" font-size="16" font-weight="bold" text-anchor="middle">x = ${xVal}</text>
            <path d="M 85 110 L 115 110" stroke="#ec4899" stroke-width="2.5"/>
            <rect x="115" y="78" width="90" height="64" rx="10" fill="#831843" stroke="#ec4899" stroke-width="2"/>
            <text x="160" y="103" fill="#fbcfe8" font-size="13" font-weight="bold" text-anchor="middle">Fonction g</text>
            <text x="160" y="126" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">${coeff}x² - ${constant}</text>
            <path d="M 205 110 L 235 110" stroke="#ec4899" stroke-width="2.5"/>
            <circle cx="260" cy="110" r="30" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
            <text x="260" y="104" fill="#cbd5e1" font-size="12" text-anchor="middle">Image</text>
            <text x="260" y="126" fill="#f59e0b" font-size="18" font-weight="extrabold" text-anchor="middle">?</text>
          `;
        };
      } else {
        const a = Math.floor(Math.random() * 3) + 2;
        const expectedX = Math.floor(Math.random() * 5) + 1;
        const b = Math.floor(Math.random() * 4) + 1;
        const targetImage = a * expectedX + b;
        const correctVal = `x = ${expectedX}`;

        q.title = 'Notion de Fonction — Recherche d\'Antécédent';
        q.question = `Soit la fonction $h(x) = ${a}x + ${b}$. Quel est l'antécédent de $${targetImage}$ par la fonction $h$ ?`;
        setupOptions(correctVal, [`x = ${expectedX + 1}`, `x = ${expectedX - 1}`, `x = ${targetImage}`]);
        q.explanationHtml = `
          <div><strong>Définition :</strong> Trouver l'antécédent de $${targetImage}$, c'est résoudre $h(x) = ${targetImage}$.</div>
          <div><strong>Équation :</strong> $${a}x + ${b} = ${targetImage} \\implies ${a}x = ${targetImage - b} \\implies x = ${expectedX}$.</div>
        `;
        q.hints = [
          { level: 1, title: 'Vocabulaire clé', content: `Trouver l'antécédent signifie résoudre $h(x) = ${targetImage}$.` },
          { level: 2, title: 'Résolution', content: `$${a}x = ${targetImage - b} \\implies x = ${expectedX}$.` }
        ];
        q.svgOverlay = (svg) => {
          svg.innerHTML = `
            <text x="150" y="30" fill="#ec4899" font-size="15" font-weight="bold" text-anchor="middle">Recherche d'Antécédent : h(x) = ${targetImage}</text>
            <rect x="35" y="65" width="230" height="55" rx="10" fill="#1e293b" stroke="#ec4899" stroke-width="2"/>
            <text x="150" y="100" fill="#fff" font-size="17" font-weight="bold" text-anchor="middle">${a}x + ${b} = ${targetImage}</text>
            <text x="150" y="165" fill="#f59e0b" font-size="18" font-weight="extrabold" text-anchor="middle">Antécédent x = ?</text>
          `;
        };
      }
    } else {
      const isLinear = Math.random() > 0.5;
      if (isLinear) {
        const a = Math.floor(Math.random() * 4) + 2;
        const xTest = 3;
        const yTest = a * xTest;
        const correctVal = `f(x) = ${a}x`;

        q.title = 'Fonctions Linéaires & Droites';
        q.question = `Une fonction linéaire $f$ est représentée par une droite passant par l'origine $O(0,0)$ et par le point $A(${xTest}, ${yTest})$. Quelle est son expression algébrique ?`;
        setupOptions(correctVal, [`f(x) = ${a}x + ${yTest}`, `f(x) = ${xTest}x`, `f(x) = x + ${a}`]);
        q.explanationHtml = `
          <div><strong>Propriété :</strong> Une fonction linéaire s'écrit toujours $f(x) = ax$ et passe par l'origine $(0,0)$.</div>
          <div><strong>Coefficient directeur :</strong> $a = \\frac{y_A}{x_A} = \\frac{${yTest}}{${xTest}} = ${a}$.</div>
          <div><strong>Conclusion :</strong> $f(x) = ${a}x$.</div>
        `;
        q.hints = [
          { level: 1, title: 'Forme générale', content: 'Une fonction linéaire est de la forme $f(x) = ax$.' },
          { level: 2, title: 'Pente a', content: `Calcule $a = \\frac{y}{x} = \\frac{${yTest}}{${xTest}} = ${a}$.` }
        ];
        q.svgOverlay = (svg) => {
          svg.innerHTML = `
            <text x="150" y="24" fill="#ec4899" font-size="14" font-weight="bold" text-anchor="middle">Droite linéaire (passe par l'origine O)</text>
            <line x1="40" y1="200" x2="260" y2="200" stroke="#64748b" stroke-width="1.5"/>
            <line x1="60" y1="220" x2="60" y2="40" stroke="#64748b" stroke-width="1.5"/>
            <line x1="60" y1="200" x2="230" y2="60" stroke="#ec4899" stroke-width="3"/>
            <circle cx="60" cy="200" r="5" fill="#f59e0b"/>
            <text x="50" y="218" fill="#f59e0b" font-size="13" font-weight="bold">O(0,0)</text>
            <circle cx="180" cy="100" r="5" fill="#10b981"/>
            <text x="190" y="98" fill="#10b981" font-size="14" font-weight="bold">A(${xTest}, ${yTest})</text>
            <line x1="180" y1="200" x2="180" y2="100" stroke="#10b981" stroke-dasharray="3 3"/>
            <line x1="60" y1="100" x2="180" y2="100" stroke="#10b981" stroke-dasharray="3 3"/>
            <text x="210" y="55" fill="#f59e0b" font-size="15" font-weight="extrabold">f(x) = ?</text>
          `;
        };
      } else {
        const a = Math.floor(Math.random() * 3) + 2;
        const b = Math.floor(Math.random() * 4) + 1;
        const correctVal = `a = ${a} et b = ${b}`;

        q.title = 'Fonction Affine : Coefficient et Ordonnée à l\'origine';
        q.question = `Soit la droite $(d)$ d'équation $y = ${a}x + ${b}$. Que valent son coefficient directeur $a$ et son ordonnée à l'origine $b$ ?`;
        setupOptions(correctVal, [
          `a = ${b} et b = ${a}`,
          `a = ${a} et b = -${b}`,
          `a = ${a + 1} et b = ${b}`
        ]);
        q.explanationHtml = `
          <div><strong>Règle :</strong> Dans $y = ax + b$ :</div>
          <ul>
            <li>$a$ est le <strong>coefficient directeur</strong> (la pente). Ici $a = ${a}$.</li>
            <li>$b$ est l'<strong>ordonnée à l'origine</strong> (intersection avec l'axe $(Oy)$). Ici $b = ${b}$.</li>
          </ul>
        `;
        q.hints = [
          { level: 1, title: 'Forme canonique', content: `Compare $y = ${a}x + ${b}$ avec le modèle $y = ax + b$.` },
          { level: 2, title: 'Ordonnée à l\'origine', content: `Le terme constant sans $x$ donne $b = ${b}$.` }
        ];
        q.svgOverlay = (svg) => {
          svg.innerHTML = `
            <text x="150" y="24" fill="#ec4899" font-size="14" font-weight="bold" text-anchor="middle">Droite affine y = ax + b</text>
            <line x1="40" y1="180" x2="260" y2="180" stroke="#64748b" stroke-width="1.5"/>
            <line x1="80" y1="210" x2="80" y2="40" stroke="#64748b" stroke-width="1.5"/>
            <line x1="50" y1="185" x2="220" y2="65" stroke="#ec4899" stroke-width="3"/>
            <circle cx="80" cy="150" r="5" fill="#f59e0b"/>
            <text x="92" y="153" fill="#f59e0b" font-size="14" font-weight="bold">(0, b)</text>
            <path d="M 120 120 L 160 120 L 160 90" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="2 2"/>
            <text x="140" y="138" fill="#10b981" font-size="13" font-weight="bold" text-anchor="middle">+1</text>
            <text x="175" y="105" fill="#10b981" font-size="13" font-weight="bold">+a</text>
            <text x="150" y="210" fill="#f59e0b" font-size="16" font-weight="extrabold" text-anchor="middle">a = ? et b = ?</text>
          `;
        };
      }
    }
  } else if (realm === 'Géométrie') {
    if (questIndex === 0) {
      const pythTriplets = [
        { ab: 6, ac: 8, bc: 10 },
        { ab: 3, ac: 4, bc: 5 },
        { ab: 5, ac: 12, bc: 13 },
        { ab: 9, ac: 12, bc: 15 },
        { ab: 8, ac: 15, bc: 17 }
      ];
      const trip = pythTriplets[Math.floor(Math.random() * pythTriplets.length)];
      const { ab, ac, bc } = trip;
      const correctVal = `${bc} cm`;

      q.title = 'Théorème de Pythagore';
      q.question = `Dans le triangle $ABC$ rectangle en $A$, on a $AB = ${ab}\\text{ cm}$ et $AC = ${ac}\\text{ cm}$. Calcule la longueur de l'hypoténuse $BC$.`;
      setupOptions(correctVal, [`${ab + ac} cm`, `${bc + 2} cm`, `${Math.round(Math.sqrt(ab*ab + ac*ac + 10))} cm`]);
      q.explanationHtml = `
        <div><strong>Énoncé du théorème :</strong> Dans le triangle $ABC$ rectangle en $A$, l'égalité de Pythagore s'écrit : $BC^2 = AB^2 + AC^2$.</div>
        <div><strong>Application numérique :</strong> $BC^2 = ${ab}^2 + ${ac}^2 = ${ab * ab} + ${ac * ac} = ${bc * bc}$.</div>
        <div><strong>Conclusion :</strong> $BC = \\sqrt{${bc * bc}} = ${bc}\\text{ cm}$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Formule de Pythagore', content: 'Le triangle est rectangle en $A$, donc $BC^2 = AB^2 + AC^2$.' },
        { level: 2, title: 'Calcul des carrés', content: `$${ab}^2 = ${ab * ab}$ et $${ac}^2 = ${ac * ac}$. Leur somme vaut $${bc * bc}$.` },
        { level: 3, title: 'Racine carrée', content: `Prends la racine carrée : $\\sqrt{${bc * bc}} = ${bc}$.` }
      ];
      q.svgOverlay = (svg) => {
        svg.innerHTML = `
          <text x="150" y="24" fill="#10b981" font-size="15" font-weight="bold" text-anchor="middle">Triangle ABC rectangle en A</text>
          <polygon points="60,190 240,190 60,70" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="2.5"/>
          <rect x="60" y="172" width="18" height="18" fill="none" stroke="#f59e0b" stroke-width="2"/>
          <text x="42" y="202" fill="#fff" font-size="15" font-weight="bold">A</text>
          <text x="252" y="202" fill="#fff" font-size="15" font-weight="bold">C</text>
          <text x="48" y="65" fill="#fff" font-size="15" font-weight="bold">B</text>
          <text x="32" y="135" fill="#38bdf8" font-size="14" font-weight="bold">AB = ${ab}</text>
          <text x="145" y="214" fill="#38bdf8" font-size="14" font-weight="bold">AC = ${ac}</text>
          <text x="165" y="120" fill="#f59e0b" font-size="16" font-weight="extrabold">BC = ?</text>
        `;
      };
    } else if (questIndex === 1) {
      const kList = [2, 3, 4];
      const k = kList[Math.floor(Math.random() * kList.length)];
      const am = Math.floor(Math.random() * 3) + 2;
      const an = Math.floor(Math.random() * 3) + 2;
      const ab = am * k;
      const ac = an * k;
      const correctVal = `${ac} cm`;

      q.title = 'Théorème de Thalès';
      q.question = `Sur la figure ci-dessous, les droites $(MN)$ et $(BC)$ sont parallèles. On donne $AM = ${am}\\text{ cm}$, $AB = ${ab}\\text{ cm}$ et $AN = ${an}\\text{ cm}$. Calcule la longueur $AC$.`;
      setupOptions(correctVal, [`${ac + 2} cm`, `${an + ab} cm`, `${am * an} cm`]);
      q.explanationHtml = `
        <div><strong>Théorème de Thalès :</strong> Les droites $(MN)$ et $(BC)$ étant parallèles, on a : $\\frac{AM}{AB} = \\frac{AN}{AC}$.</div>
        <div><strong>Application :</strong> $\\frac{${am}}{${ab}} = \\frac{${an}}{AC}$.</div>
        <div><strong>Produit en croix :</strong> $AC = \\frac{${ab} \\times ${an}}{${am}} = ${ac}\\text{ cm}$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Égalité des rapports', content: 'Écris le rapport de Thalès : $\\frac{AM}{AB} = \\frac{AN}{AC}$.' },
        { level: 2, title: 'Rapport de réduction', content: `Remarque que $\\frac{AB}{AM} = \\frac{${ab}}{${am}} = ${k}$.` },
        { level: 3, title: 'Calcul de AC', content: `$AC = ${an} \\times ${k} = ${ac}\\text{ cm}$.` }
      ];
      q.svgOverlay = (svg) => {
        svg.innerHTML = `
          <text x="150" y="24" fill="#10b981" font-size="15" font-weight="bold" text-anchor="middle">Configuration de Thalès (MN // BC)</text>
          <polygon points="150,45 50,205 250,205" fill="none" stroke="#64748b" stroke-width="1.5"/>
          <line x1="90" y1="140" x2="210" y2="140" stroke="#10b981" stroke-width="2.5"/>
          <line x1="50" y1="205" x2="250" y2="205" stroke="#38bdf8" stroke-width="2.5"/>
          <text x="150" y="38" fill="#fff" font-size="15" font-weight="bold" text-anchor="middle">A</text>
          <text x="70" y="142" fill="#10b981" font-size="14" font-weight="bold">M</text>
          <text x="222" y="142" fill="#10b981" font-size="14" font-weight="bold">N</text>
          <text x="35" y="220" fill="#38bdf8" font-size="15" font-weight="bold">B</text>
          <text x="258" y="220" fill="#38bdf8" font-size="15" font-weight="bold">C</text>
          <text x="95" y="90" fill="#a7f3d0" font-size="13" font-weight="bold">AM=${am}</text>
          <text x="180" y="90" fill="#a7f3d0" font-size="13" font-weight="bold">AN=${an}</text>
          <text x="150" y="232" fill="#f59e0b" font-size="15" font-weight="extrabold" text-anchor="middle">AC = ?</text>
        `;
      };
    } else if (questIndex === 2) {
      const angle = 30;
      const hyp = 10;
      const opp = 5;
      const correctVal = `${opp} cm`;

      q.title = 'Trigonométrie (Sinus / Cosinus / Tangente)';
      q.question = `Dans un triangle $RST$ rectangle en $S$, l'hypoténuse $RT = ${hyp}\\text{ cm}$ et l'angle $\\widehat{SRT} = ${angle}^\\circ$. Sachant que $\\sin(${angle}^\\circ) = 0{,}5$, calcule la longueur du côté opposé $ST$.`;
      setupOptions(correctVal, ['8.66 cm', '7.5 cm', '20 cm']);
      q.explanationHtml = `
        <div><strong>Formule :</strong> Dans le triangle rectangle, $\\sin(\\widehat{SRT}) = \\frac{\\text{Côté Opposé}}{\\text{Hypoténuse}} = \\frac{ST}{RT}$.</div>
        <div><strong>Calcul :</strong> $ST = RT \\times \\sin(${angle}^\\circ) = ${hyp} \\times 0{,}5 = ${opp}\\text{ cm}$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Formule SOH', content: '$\\sin(\\text{angle}) = \\frac{\\text{Opposé}}{\\text{Hypoténuse}}$.' },
        { level: 2, title: 'Application', content: `$ST = RT \\times \\sin(${angle}^\\circ) = ${hyp} \\times 0{,}5$.` }
      ];
      q.svgOverlay = (svg) => {
        svg.innerHTML = `
          <text x="150" y="24" fill="#10b981" font-size="15" font-weight="bold" text-anchor="middle">Triangle rectangle RST</text>
          <polygon points="60,185 240,185 240,95" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" stroke-width="2.5"/>
          <rect x="222" y="167" width="18" height="18" fill="none" stroke="#f59e0b" stroke-width="2"/>
          <text x="40" y="198" fill="#fff" font-size="15" font-weight="bold">R (30°)</text>
          <text x="252" y="198" fill="#fff" font-size="15" font-weight="bold">S</text>
          <text x="252" y="90" fill="#fff" font-size="15" font-weight="bold">T</text>
          <text x="135" y="130" fill="#38bdf8" font-size="14" font-weight="bold">RT = 10 cm</text>
          <text x="255" y="145" fill="#f59e0b" font-size="15" font-weight="extrabold">ST = ?</text>
        `;
      };
    } else {
      const k = 3;
      const initialVol = 12;
      const finalVol = initialVol * (k * k * k);
      const correctVal = `${finalVol} cm³`;

      q.title = 'Agrandissement & Réduction (Volumes)';
      q.question = `On applique un agrandissement de rapport $k = ${k}$ à un solide de volume $V = ${initialVol}\\text{ cm}^3$. Quel est le nouveau volume $V'$ du solide ?`;
      setupOptions(correctVal, [`${initialVol * k} cm³`, `${initialVol * k * k} cm³`, `${finalVol + 10} cm³`]);
      q.explanationHtml = `
        <div><strong>Propriété des agrandissements/réductions :</strong> Dans un agrandissement de rapport $k$, les longueurs sont multipliées par $k$, les aires par $k^2$ et les volumes par $k^3$.</div>
        <div><strong>Calcul :</strong> $V' = V \\times k^3 = ${initialVol} \\times ${k}^3 = ${initialVol} \\times ${k * k * k} = ${finalVol}\\text{ cm}^3$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Règle des puissances', content: 'Pour un volume, le rapport $k$ s\'élève au cube ($k^3$).' },
        { level: 2, title: 'Calcul de k³', content: `$${k}^3 = ${k} \\times ${k} \\times ${k} = ${k * k * k}$.` },
        { level: 3, title: 'Multiplication finale', content: `$${initialVol} \\times ${k * k * k} = ${finalVol}\\text{ cm}^3$.` }
      ];
      q.svgOverlay = (svg) => {
        svg.innerHTML = `
          <text x="150" y="26" fill="#10b981" font-size="15" font-weight="bold" text-anchor="middle">Agrandissement : Volume × k³ (k = ${k})</text>
          <rect x="45" y="105" width="45" height="45" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="67" y="132" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">V = ${initialVol}</text>
          <path d="M 102 128 L 142 128" stroke="#f59e0b" stroke-width="2.5"/>
          <text x="122" y="118" fill="#f59e0b" font-size="13" font-weight="bold" text-anchor="middle">× k³</text>
          <rect x="155" y="65" width="105" height="105" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" stroke-width="2" stroke-dasharray="3 3"/>
          <text x="207" y="125" fill="#f59e0b" font-size="16" font-weight="extrabold" text-anchor="middle">V' = ?</text>
          <text x="150" y="202" fill="#cbd5e1" font-size="13" font-weight="bold" text-anchor="middle">Quel est le volume après agrandissement ?</text>
        `;
      };
    }
  } else {
    // Semaine 4 : Stats, Probas & Algorithmes
    if (questIndex === 0) {
      const isMediane = Math.random() > 0.5;
      if (isMediane) {
        const series = [4, 7, 9, 12, 15, 18, 20];
        const med = 12;
        const correctVal = `${med}`;

        q.title = 'Statistiques — Médiane d\'une Série';
        q.question = `Détermine la médiane de la série statistique ordonnée suivante : $${series.join(' \\; ; \\; ')}$.`;
        setupOptions(correctVal, [`11`, `15`, `12.5`]);
        q.explanationHtml = `
          <div><strong>Définition :</strong> La médiane est la valeur qui partage la série ordonnée en deux groupes de même effectif (50% en dessous, 50% au-dessus).</div>
          <div><strong>Effectif total :</strong> $N = 7$ (impair). La médiane est la $\\frac{7+1}{2} = 4^{\\text{ème}}$ valeur, soit $${med}$.</div>
        `;
        q.hints = [
          { level: 1, title: 'Effectif total', content: 'Il y a 7 valeurs ordonnées.' },
          { level: 2, title: 'Position centrale', content: `La valeur du milieu (4ème position) est $${med}$.` }
        ];
        q.svgOverlay = (svg) => {
          svg.innerHTML = `
            <text x="150" y="28" fill="#f59e0b" font-size="15" font-weight="bold" text-anchor="middle">Série Statistique Ordonnée (N = 7)</text>
            ${series.map((val, idx) => `
              <circle cx="${35 + idx * 38}" cy="100" r="17" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
              <text x="${35 + idx * 38}" y="106" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">${val}</text>
            `).join('')}
            <path d="M 149 140 L 149 122" stroke="#f59e0b" stroke-width="2.5"/>
            <text x="150" y="162" fill="#f59e0b" font-size="15" font-weight="extrabold" text-anchor="middle">Médiane = ?</text>
            <text x="75" y="132" fill="#cbd5e1" font-size="12" font-weight="bold" text-anchor="middle">3 valeurs</text>
            <text x="225" y="132" fill="#cbd5e1" font-size="12" font-weight="bold" text-anchor="middle">3 valeurs</text>
          `;
        };
      } else {
        const notes = [12, 14, 16, 18];
        const mean = (notes.reduce((a, b) => a + b, 0) / notes.length).toFixed(1);
        const correctVal = `${mean}`;

        q.title = 'Statistiques — Calcul de Moyenne';
        q.question = `Un élève obtient les notes suivantes : $${notes.join(' \\; ; \\; ')}$. Quelle est sa moyenne ?`;
        setupOptions(correctVal, [`${Number(mean) + 1}`, `${Number(mean) - 1.5}`, `14.5`]);
        q.explanationHtml = `
          <div><strong>Calcul :</strong> $\\text{Moyenne} = \\frac{${notes.join(' + ')}}{${notes.length}} = \\frac{${notes.reduce((a, b) => a + b, 0)}}{${notes.length}} = ${mean}$.</div>
        `;
        q.hints = [
          { level: 1, title: 'Somme des valeurs', content: `Additionne toutes les notes : $${notes.join(' + ')} = ${notes.reduce((a, b) => a + b, 0)}$.` },
          { level: 2, title: 'Division', content: `Divise par l'effectif total ($${notes.length}$).` }
        ];
        q.svgOverlay = (svg) => {
          svg.innerHTML = `
            <text x="150" y="26" fill="#f59e0b" font-size="15" font-weight="bold" text-anchor="middle">Histogramme des Notes</text>
            
            <!-- Question Badge au-dessus des barres pour zéro superposition -->
            <rect x="75" y="42" width="150" height="30" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="150" y="62" fill="#f59e0b" font-size="15" font-weight="extrabold" text-anchor="middle">Moyenne = ?</text>
            
            <!-- Ligne de repère moyenne en pointillés -->
            <line x1="45" y1="125" x2="255" y2="125" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 4"/>
            
            <!-- Barres de l'histogramme -->
            ${notes.map((note, idx) => `
              <rect x="${55 + idx * 50}" y="${200 - note * 5}" width="38" height="${note * 5}" rx="4" fill="#f59e0b" opacity="0.85"/>
              <text x="${74 + idx * 50}" y="220" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">${note}</text>
            `).join('')}
          `;
        };
      }
    } else if (questIndex === 1) {
      const isTree = Math.random() > 0.5;
      if (isTree) {
        const correctVal = '1/36';
        q.title = 'Probabilités — Tirage Successif';
        q.question = 'Un dé à 6 faces est lancé deux fois de suite. Quelle est la probabilité d\'obtenir un double six $(6, 6)$ ?';
        setupOptions(correctVal, ['1/6', '1/12', '2/6']);
        q.explanationHtml = `
          <div><strong>Événements indépendants :</strong> La probabilité d'un 6 au 1er lancer est $\\frac{1}{6}$ et au 2nd lancer est $\\frac{1}{6}$.</div>
          <div><strong>Calcul :</strong> $P(6, 6) = \\frac{1}{6} \\times \\frac{1}{6} = \\frac{1}{36}$.</div>
        `;
        q.hints = [
          { level: 1, title: 'Premier lancer', content: 'La probabilité d\'avoir 6 est $\\frac{1}{6}$.' },
          { level: 2, title: 'Deuxième lancer', content: 'Multiplie $\\frac{1}{6} \\times \\frac{1}{6} = \\frac{1}{36}$.' }
        ];
        q.svgOverlay = (svg) => {
          svg.innerHTML = `
            <text x="150" y="26" fill="#f59e0b" font-size="15" font-weight="bold" text-anchor="middle">Arbre des Possibilités</text>
            <circle cx="50" cy="115" r="12" fill="#f59e0b"/>
            <line x1="58" y1="115" x2="130" y2="75" stroke="#64748b" stroke-width="2.5"/>
            <line x1="58" y1="115" x2="130" y2="155" stroke="#64748b" stroke-width="2.5"/>
            <text x="85" y="85" fill="#f59e0b" font-size="12" font-weight="bold">1/6</text>
            <text x="85" y="150" fill="#cbd5e1" font-size="12" font-weight="bold">5/6</text>
            <circle cx="130" cy="75" r="16" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
            <text x="130" y="80" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">6</text>
            <line x1="146" y1="75" x2="220" y2="50" stroke="#f59e0b" stroke-width="2.5"/>
            <text x="175" y="55" fill="#f59e0b" font-size="12" font-weight="bold">1/6</text>
            <circle cx="220" cy="50" r="16" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
            <text x="220" y="55" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">6</text>
            <text x="150" y="205" fill="#f59e0b" font-size="16" font-weight="extrabold" text-anchor="middle">P(6, 6) = ?</text>
          `;
        };
      } else {
        const correctVal = '1/4';
        q.title = 'Probabilités à 2 épreuves (Urne)';
        q.question = 'Une urne contient 2 boules Rouges et 2 Bleues. On tire deux boules successivement avec remise. Quelle est la probabilité d\'obtenir deux boules Rouges $(R, R)$ ?';
        setupOptions(correctVal, ['1/2', '1/8', '1/3']);
        q.explanationHtml = `
          <div><strong>Calcul :</strong> $P(R_1) = \\frac{2}{4} = \\frac{1}{2}$ et $P(R_2) = \\frac{1}{2}$.</div>
          <div>$P(R, R) = \\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}$.</div>
        `;
        q.hints = [
          { level: 1, title: 'Probabilité simple', content: 'Calcule la probabilité d\'une boule Rouge : $\\frac{2}{4} = \\frac{1}{2}$.' },
          { level: 2, title: 'Produit', content: 'Multiplie les deux tirages indépendants : $\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}$.' }
        ];
        q.svgOverlay = (svg) => {
          svg.innerHTML = `
            <text x="150" y="28" fill="#f59e0b" font-size="15" font-weight="bold" text-anchor="middle">Urne : 2 Rouges et 2 Bleues</text>
            <rect x="45" y="55" width="90" height="95" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
            <circle cx="70" cy="85" r="12" fill="#ef4444"/>
            <circle cx="105" cy="85" r="12" fill="#ef4444"/>
            <circle cx="70" cy="122" r="12" fill="#3b82f6"/>
            <circle cx="105" cy="122" r="12" fill="#3b82f6"/>
            <text x="90" y="172" fill="#cbd5e1" font-size="12" font-weight="bold" text-anchor="middle">Tirages avec remise</text>
            <text x="210" y="105" fill="#f59e0b" font-size="16" font-weight="extrabold">P(R, R) = ?</text>
          `;
        };
      }
    } else {
      const isCondition = Math.random() > 0.5;
      if (isCondition) {
        const valX = 12;
        const correctVal = '24';
        q.title = 'Algorithmique & Scratch — Instruction Conditionnelle';
        q.question = `On donne l'algorithme suivant avec $x = ${valX}$ : <br/><code>Si $x > 10$ Alors $x \\leftarrow x \\times 2$ Sinon $x \\leftarrow x + 10$</code>.<br/> Quelle est la valeur finale de $x$ ?`;
        setupOptions(correctVal, ['22', '12', '120']);
        q.explanationHtml = `
          <div><strong>Test de la condition :</strong> La condition $x > 10$ est <strong>VRAIE</strong> car $12 > 10$.</div>
          <div><strong>Branche Alors :</strong> On applique $x \\leftarrow 12 \\times 2 = 24$.</div>
        `;
        q.hints = [
          { level: 1, title: 'Tester la condition', content: `Vérifie si $${valX} > 10$.` },
          { level: 2, title: 'Exécuter la bonne branche', content: `Comme la condition est vraie, effectue $${valX} \\times 2$.` }
        ];
        q.svgOverlay = (svg) => {
          svg.innerHTML = `
            <text x="150" y="28" fill="#f59e0b" font-size="15" font-weight="bold" text-anchor="middle">Organigramme pour x = ${valX}</text>
            <polygon points="150,55 215,85 150,115 85,85" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
            <text x="150" y="91" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">x > 10 ?</text>
            <path d="M 215 85 L 245 85 L 245 138" stroke="#10b981" stroke-width="2.5"/>
            <text x="230" y="78" fill="#10b981" font-size="12" font-weight="bold">OUI</text>
            <rect x="200" y="138" width="90" height="38" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
            <text x="245" y="162" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">x ← x × 2</text>
            <path d="M 85 85 L 55 85 L 55 138" stroke="#ef4444" stroke-width="2.5"/>
            <text x="65" y="78" fill="#ef4444" font-size="12" font-weight="bold">NON</text>
            <rect x="10" y="138" width="90" height="38" rx="6" fill="#1e293b" stroke="#ef4444" stroke-width="2"/>
            <text x="55" y="162" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">x ← x + 10</text>
            <text x="150" y="210" fill="#f59e0b" font-size="16" font-weight="extrabold" text-anchor="middle">Valeur finale x = ?</text>
          `;
        };
      } else {
        const correctVal = '20';
        q.title = 'Algorithmique & Scratch — Boucle Répéter';
        q.question = 'On initialise une variable $x$ à $5$. On exécute l\'instruction : "Répéter 3 fois : Ajouter à $x$ la valeur 5". Quelle est la valeur finale de $x$ ?';
        setupOptions(correctVal, ['15', '25', '10']);
        q.explanationHtml = `
          <div><strong>Déroulement de la boucle :</strong></div>
          <ul>
            <li>Départ : $x = 5$</li>
            <li>Tour 1 : $x = 5 + 5 = 10$</li>
            <li>Tour 2 : $x = 10 + 5 = 15$</li>
            <li>Tour 3 : $x = 15 + 5 = 20$</li>
          </ul>
        `;
        q.hints = [
          { level: 1, title: 'Boucle', content: 'La boucle ajoute $5$ à chaque tour pendant 3 tours : $3 \\times 5 = 15$.' },
          { level: 2, title: 'Ajout initial', content: 'N\'oublie pas la valeur de départ $5$ : $5 + 15 = 20$.' }
        ];
        q.svgOverlay = (svg) => {
          svg.innerHTML = `
            <text x="150" y="28" fill="#f59e0b" font-size="15" font-weight="bold" text-anchor="middle">Structure de la Boucle (3 tours)</text>
            <rect x="22" y="60" width="58" height="42" rx="6" fill="#1e293b" stroke="#94a3b8" stroke-width="1.5"/>
            <text x="51" y="86" fill="#cbd5e1" font-size="14" font-weight="bold" text-anchor="middle">x = 5</text>
            <path d="M 80 80 L 95 80" stroke="#f59e0b" stroke-width="2.5"/>
            <rect x="95" y="60" width="58" height="42" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="124" y="86" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">+ 5</text>
            <path d="M 153 80 L 168 80" stroke="#f59e0b" stroke-width="2.5"/>
            <rect x="168" y="60" width="58" height="42" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="197" y="86" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">+ 5</text>
            <path d="M 226 80 L 241 80" stroke="#f59e0b" stroke-width="2.5"/>
            <rect x="241" y="60" width="50" height="42" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3 3"/>
            <text x="266" y="86" fill="#f59e0b" font-size="16" font-weight="extrabold" text-anchor="middle">?</text>
            <text x="150" y="152" fill="#f59e0b" font-size="16" font-weight="extrabold" text-anchor="middle">Valeur finale x = ?</text>
          `;
        };
      }
    }
  }

  return q;
}
