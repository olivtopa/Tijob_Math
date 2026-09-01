import { DynamicQuestion } from '../types/mathquest';

type SetupOptionsFn = (correct: string, list: string[]) => void;

export function generateSecondeQuestion(
  realm: string,
  questIndex: number,
  setupOptions: SetupOptionsFn,
  q: DynamicQuestion
): boolean {
  // -------------------------------------------------------------
  // DOMAINE 1 : Nombres, Arithmétique & Ensembles
  // -------------------------------------------------------------
  if (realm === 'Algèbre') {
    if (questIndex === 0) {
      // Arithmétique & Ensembles de nombres
      const mode = Math.random() > 0.5;
      if (mode) {
        // Ensembles de nombres (N, Z, D, Q, R)
        const decimals = [
          { expr: '\\frac{7}{4}', val: '1,75', ens: 'D (Décimaux)' },
          { expr: '\\frac{1}{3}', val: '0,333...', ens: 'Q (Rationnels non décimaux)' },
          { expr: '\\sqrt{49}', val: '7', ens: 'N (Entiers naturels)' },
          { expr: '-\\frac{12}{3}', val: '-4', ens: 'Z (Entiers relatifs)' },
          { expr: '\\pi', val: '3,1415...', ens: 'R (Réels irrationnels)' }
        ];
        const item = decimals[Math.floor(Math.random() * decimals.length)];
        q.title = 'Seconde : Ensembles de Nombres';
        q.question = `Quel est le <strong>plus petit ensemble de nombres</strong> auquel appartient le nombre $A = ${item.expr}$ ?`;
        setupOptions(item.ens, [
          'N (Entiers naturels)',
          'Z (Entiers relatifs)',
          'D (Décimaux)',
          'Q (Rationnels non décimaux)',
          'R (Réels irrationnels)'
        ]);
        q.explanationHtml = `
          <div><strong>Analyse :</strong> $A = ${item.expr} = ${item.val}$.</div>
          <div>Le plus petit ensemble contenant ce nombre est <strong>${item.ens}</strong>.</div>
        `;
        q.hints = [
          { level: 1, title: 'Simplification', content: `Calcule la valeur exacte de $${item.expr}$.` },
          { level: 2, title: 'Rappel des inclusions', content: '$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$.' }
        ];
      } else {
        // Parité / Divisibilité
        q.title = 'Seconde : Arithmétique & Parité';
        q.question = `Soit $n$ un entier. Quelle est la parité de l'expression $A = 2n^2 + 4n + 6$ ?`;
        setupOptions('Toujours Pair', [
          'Toujours Impair',
          'Pair seulement si n est pair',
          'Pair seulement si n est impair'
        ]);
        q.explanationHtml = `
          <div><strong>Factorisation par 2 :</strong> $A = 2(n^2 + 2n + 3)$.</div>
          <div>Comme $k = n^2 + 2n + 3$ est un entier, $A = 2k$, donc $A$ est <strong>toujours pair</strong>.</div>
        `;
        q.hints = [
          { level: 1, title: 'Facteur commun', content: 'Mets 2 en facteur dans $2n^2 + 4n + 6$.' },
          { level: 2, title: 'Définition d\'un nombre pair', content: 'Un nombre est pair s\'il s\'écrit $2k$ avec $k \\in \\mathbb{Z}$.' }
        ];
      }
      return true;
    }

    if (questIndex === 1) {
      // Intervalles & Valeur Absolue
      const center = Math.floor(Math.random() * 6) + 1; // 1 à 6
      const radius = Math.floor(Math.random() * 4) + 2; // 2 à 5
      const minVal = center - radius;
      const maxVal = center + radius;
      const correctInterval = `[${minVal} ; ${maxVal}]`;

      q.title = 'Seconde : Valeur Absolue & Intervalles';
      q.question = `Résous dans $\\mathbb{R}$ l'inéquation $|x - ${center}| \\le ${radius}$. Donne l'intervalle solution :`;
      setupOptions(correctInterval, [
        `[${minVal + 1} ; ${maxVal - 1}]`,
        `[${center} ; ${maxVal}]`,
        `[-${radius} ; ${radius}]`
      ]);
      q.explanationHtml = `
        <div><strong>Propriété :</strong> $|x - c| \\le r \\iff c - r \\le x \\le c + r$.</div>
        <div>Ici avec $c = ${center}$ et $r = ${radius}$ :</div>
        <div>$${center} - ${radius} \\le x \\le ${center} + ${radius} \\iff ${minVal} \\le x \\le ${maxVal}$.</div>
        <div>L'ensemble des solutions est <strong>$S = [${minVal} ; ${maxVal}]$</strong>.</div>
      `;
      q.hints = [
        { level: 1, title: 'Distance géométrique', content: '$|x - a|$ représente la distance entre $x$ et $a$ sur la droite graduée.' },
        { level: 2, title: 'Encadrement', content: `La distance entre $x$ et ${center} est inférieure ou égale à ${radius}.` }
      ];
      return true;
    }

    if (questIndex === 2) {
      // Calcul Algébrique & Identités remarquables a² - b²
      const a = Math.floor(Math.random() * 3) + 2; // 2 à 4
      const b = Math.floor(Math.random() * 4) + 1; // 1 à 4
      const c = Math.floor(Math.random() * 4) + 2; // 2 à 5
      const c2 = c * c;
      const term1 = b - c;
      const term2 = b + c;
      const sign1 = term1 >= 0 ? `+ ${term1}` : `- ${Math.abs(term1)}`;
      const sign2 = `+ ${term2}`;
      const correctFact = `(${a}x ${sign1})(${a}x ${sign2})`;

      q.title = 'Seconde : Factorisation a² - b²';
      q.question = `Factorise l'expression $E(x) = (${a}x + ${b})^2 - ${c2}$.`;
      setupOptions(correctFact, [
        `(${a}x - ${term1})(${a}x + ${term2})`,
        `(${a}x + ${b})(${a}x - ${c})`,
        `(${a}x + ${b - c2})(${a}x + ${b + c2})`
      ]);
      q.explanationHtml = `
        <div><strong>Identité remarquable :</strong> $A^2 - B^2 = (A - B)(A + B)$ avec $A = ${a}x + ${b}$ et $B = ${c}$ (car $B^2 = ${c2}$).</div>
        <div>$E(x) = [(${a}x + ${b}) - ${c}][(${a}x + ${b}) + ${c}] = <strong>${correctFact}</strong>$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Reconnaître le carré', content: `$${c2} = ${c}^2$.` },
        { level: 2, title: 'Application de la formule', content: `Pose $A = ${a}x + ${b}$ et $B = ${c}$.` }
      ];
      return true;
    }

    if (questIndex === 3) {
      // Équations Produits & Quotients
      const a = Math.floor(Math.random() * 3) + 2;
      const b = Math.floor(Math.random() * 5) + 1;
      const sol = Math.floor(Math.random() * 6) + 1;
      q.title = 'Seconde : Équation Produit Nul';
      q.question = `Résous dans $\\mathbb{R}$ l'équation $(${a}x - ${b})(x + ${sol}) = 0$. Quelles sont les solutions ?`;
      const correctStr = `x = -${sol} ou x = ${b}/${a}`;
      setupOptions(correctStr, [
        `x = ${sol} ou x = -${b}/${a}`,
        `x = -${sol} ou x = -${b}/${a}`,
        `x = ${sol} ou x = ${b}/${a}`
      ]);
      q.explanationHtml = `
        <div><strong>Théorème :</strong> Un produit de facteurs est nul si et seulement si l'un au moins des facteurs est nul.</div>
        <div>$${a}x - ${b} = 0 \\iff ${a}x = ${b} \\iff x = \\frac{${b}}{${a}}$</div>
        <div>$x + ${sol} = 0 \\iff x = -${sol}$</div>
        <div>Les solutions sont <strong>$x = -${sol}$ et $x = \\frac{${b}}{${a}}$</strong>.</div>
      `;
      q.hints = [
        { level: 1, title: 'Théorème produit nul', content: '$A \\times B = 0 \\iff A = 0$ ou $B = 0$.' },
        { level: 2, title: 'Résolution', content: `Résous séparément $${a}x - ${b} = 0$ et $x + ${sol} = 0$.` }
      ];
      return true;
    }
  }

  // -------------------------------------------------------------
  // DOMAINE 2 : Géométrie du Plan & Vecteurs
  // -------------------------------------------------------------
  if (realm === 'Géométrie') {
    if (questIndex === 0) {
      // Coordonnées de vecteur AB
      const xa = Math.floor(Math.random() * 6) - 3;
      const ya = Math.floor(Math.random() * 6) - 2;
      const xb = Math.floor(Math.random() * 6) + 1;
      const yb = Math.floor(Math.random() * 6) + 1;
      const vx = xb - xa;
      const vy = yb - ya;
      const correctVec = `(${vx} ; ${vy})`;

      q.title = 'Seconde : Coordonnées du Vecteur AB';
      q.question = `Dans un repère $(O; \\vec{i}, \\vec{j})$, on donne $A(${xa} ; ${ya})$ et $B(${xb} ; ${yb})$. Quelles sont les coordonnées du vecteur $\\vec{AB}$ ?`;
      setupOptions(correctVec, [
        `(${xa - xb} ; ${ya - yb})`,
        `(${vx} ; ${-vy})`,
        `(${xa + xb} ; ${ya + yb})`
      ]);
      q.explanationHtml = `
        <div><strong>Formule :</strong> $\\vec{AB}(x_B - x_A ; y_B - y_A)$.</div>
        <div>$x_{\\vec{AB}} = ${xb} - (${xa}) = ${vx}$</div>
        <div>$y_{\\vec{AB}} = ${yb} - (${ya}) = ${vy}$</div>
        <div>Donc $\\vec{AB} = <strong>${correctVec}</strong>$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Formule des coordonnées', content: '$\\vec{AB}(x_B - x_A ; y_B - y_A)$.' },
        { level: 2, title: 'Attention aux signes', content: `Fais bien attention à la soustraction : $x_B - x_A = ${xb} - (${xa})$.` }
      ];
      return true;
    }

    if (questIndex === 1) {
      // Colinéarité & Déterminant
      const xu = 2;
      const yu = -3;
      const k = [2, -2, 3][Math.floor(Math.random() * 3)];
      const isColinear = Math.random() > 0.4;
      const xv = isColinear ? xu * k : xu * k + 1;
      const yv = yu * k;
      const det = xu * yv - yu * xv;

      q.title = 'Seconde : Colinéarité de Deux Vecteurs';
      q.question = `On donne $\\vec{u}(${xu} ; ${yu})$ et $\\vec{v}(${xv} ; ${yv})$. Les vecteurs $\\vec{u}$ et $\\vec{v}$ sont-ils colinéaires ?`;
      const ans = isColinear ? 'Oui, car det(u, v) = 0' : 'Non, car det(u, v) ≠ 0';
      setupOptions(ans, [
        isColinear ? 'Non, car det(u, v) ≠ 0' : 'Oui, car det(u, v) = 0',
        'Oui, car ils sont orthogonaux',
        'Non, car ils n\'ont pas la même norme'
      ]);
      q.explanationHtml = `
        <div><strong>Calcul du déterminant :</strong> $\\det(\\vec{u}, \\vec{v}) = x_{\\vec{u}} y_{\\vec{v}} - y_{\\vec{u}} x_{\\vec{v}}$.</div>
        <div>$\\det(\\vec{u}, \\vec{v}) = (${xu}) \\times (${yv}) - (${yu}) \\times (${xv}) = ${xu * yv} - (${yu * xv}) = ${det}$.</div>
        <div>Comme le déterminant est <strong>${isColinear ? 'égal à 0' : 'différent de 0'}</strong>, les vecteurs <strong>${isColinear ? 'sont colinéaires' : 'ne sont pas colinéaires'}</strong>.</div>
      `;
      q.hints = [
        { level: 1, title: 'Critère de colinéarité', content: 'Deux vecteurs sont colinéaires si et seulement si $xy\' - x\'y = 0$.' },
        { level: 2, title: 'Calcul', content: `Calcule $(${xu}) \\times (${yv}) - (${yu}) \\times (${xv})$.` }
      ];
      return true;
    }

    if (questIndex === 2) {
      // Milieu et Distance
      const xa = 1;
      const ya = 2;
      const xb = 5;
      const yb = 5;
      const xm = (xa + xb) / 2;
      const ym = (ya + yb) / 2;
      q.title = 'Seconde : Coordonnées du Milieu';
      q.question = `Soient $A(${xa} ; ${ya})$ et $B(${xb} ; ${yb})$. Quelles sont les coordonnées du milieu $M$ du segment $[AB]$ ?`;
      const ans = `(${xm} ; ${ym})`;
      setupOptions(ans, [
        `(${xb - xa} ; ${yb - ya})`,
        `(${xa + xb} ; ${ya + yb})`,
        `(${xm + 1} ; ${ym - 1})`
      ]);
      q.explanationHtml = `
        <div><strong>Formule du milieu :</strong> $M\\left(\\frac{x_A + x_B}{2} ; \\frac{y_A + y_B}{2}\\right)$.</div>
        <div>$x_M = \\frac{${xa} + ${xb}}{2} = ${xm}$ et $y_M = \\frac{${ya} + ${yb}}{2} = ${ym}$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Formule du milieu', content: '$x_M = \\frac{x_A + x_B}{2}$ et $y_M = \\frac{y_A + y_B}{2}$.' }
      ];
      return true;
    }

    if (questIndex === 3) {
      // Équation de droite y = mx + p
      const m = Math.floor(Math.random() * 4) + 1; // 1 à 4
      const p = Math.floor(Math.random() * 6) - 2; // -2 à 3
      q.title = 'Seconde : Coefficient Directeur d\'une Droite';
      q.question = `Une droite $(D)$ passe par les points $A(1 ; ${m + p})$ et $B(3 ; ${3 * m + p})$. Quel est son coefficient directeur $m$ ?`;
      setupOptions(String(m), [
        String(m + 1),
        String(Math.max(1, m - 1)),
        String(2 * m)
      ]);
      q.explanationHtml = `
        <div><strong>Formule du coefficient directeur :</strong> $m = \\frac{y_B - y_A}{x_B - x_A}$.</div>
        <div>$m = \\frac{${3 * m + p} - (${m + p})}{3 - 1} = \\frac{${2 * m}}{2} = <strong>${m}</strong>$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Formule de la pente', content: '$m = \\frac{y_B - y_A}{x_B - x_A}$.' }
      ];
      return true;
    }
  }

  // -------------------------------------------------------------
  // DOMAINE 3 : Fonctions, Variations & Signes
  // -------------------------------------------------------------
  if (realm === 'Fonctions') {
    if (questIndex === 0) {
      // Image et Antécédents
      const a = Math.floor(Math.random() * 3) + 2;
      const b = Math.floor(Math.random() * 5) - 2;
      const xVal = Math.floor(Math.random() * 4) + 1;
      const img = a * xVal * xVal + b;
      q.title = 'Seconde : Calcul d\'Image par une Fonction';
      q.question = `Soit la fonction $f$ définie par $f(x) = ${a}x^2 ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}$. Quelle est l'image de $${xVal}$ par $f$ ?`;
      setupOptions(String(img), [
        String(img + a),
        String(img - 2),
        String(a * xVal + b)
      ]);
      q.explanationHtml = `
        <div><strong>Calcul :</strong> On remplace $x$ par $${xVal}$ dans l'expression de $f$ :</div>
        <div>$f(${xVal}) = ${a} \\times (${xVal})^2 ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`} = ${a} \\times ${xVal * xVal} ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`} = <strong>${img}</strong>$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Priorité opératoire', content: 'Calcule d\'abord la puissance $(x)^2$, puis la multiplication, et enfin l\'addition.' }
      ];
      return true;
    }

    if (questIndex === 1) {
      // Fonctions de Référence (Carré)
      const a = 3;
      const b = 5;
      q.title = 'Seconde : Encadrement avec la Fonction Carré';
      q.question = `Soit $x \\in [-${a} ; ${b}]$. Quel est l'encadrement exact de $x^2$ ?`;
      setupOptions(`[0 ; ${b * b}]`, [
        `[${a * a} ; ${b * b}]`,
        `[-${a * a} ; ${b * b}]`,
        `[0 ; ${a * a}]`
      ]);
      q.explanationHtml = `
        <div><strong>Attention au zéro :</strong> Comme $0 \\in [-${a} ; ${b}]$ et que la fonction carré est toujours positive ($x^2 \\ge 0$), le minimum de $x^2$ est <strong>0</strong>.</div>
        <div>Le maximum est $\\max((-3)^2, 5^2) = \\max(9, 25) = 25$.</div>
        <div>Donc $x^2 \\in <strong>[0 ; 25]</strong>$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Minimum d\'un carré', content: 'Un carré est toujours positif ou nul. Si 0 est dans l\'intervalle, la valeur minimale est 0.' }
      ];
      return true;
    }

    if (questIndex === 2) {
      // Extremums & Variations
      q.title = 'Seconde : Maximum d\'une Fonction';
      q.question = `Soit $f(x) = -(x - 3)^2 + 7$ définie sur $\\mathbb{R}$. Quel est le maximum de $f$ et en quelle valeur de $x$ est-il atteint ?`;
      setupOptions('Maximum = 7 atteint en x = 3', [
        'Maximum = -7 atteint en x = -3',
        'Maximum = 3 atteint en x = 7',
        'Maximum = 7 atteint en x = -3'
      ]);
      q.explanationHtml = `
        <div><strong>Analyse :</strong> Pour tout réel $x$, $(x - 3)^2 \\ge 0 \\implies -(x - 3)^2 \\le 0$.</div>
        <div>En ajoutant 7 : $-(x - 3)^2 + 7 \\le 7$.</div>
        <div>L'égalité $f(x) = 7$ est atteinte lorsque $x - 3 = 0 \\iff x = 3$.</div>
        <div>Le <strong>maximum est 7, atteint en $x = 3$</strong>.</div>
      `;
      q.hints = [
        { level: 1, title: 'Forme canonique', content: 'Comme $-(x-3)^2 \\le 0$, la fonction est toujours inférieure ou égale à 7.' }
      ];
      return true;
    }

    if (questIndex === 3) {
      // Tableaux de Signes & Inéquations
      q.title = 'Seconde : Signe d\'un Produit (2x - 4)(x + 3)';
      q.question = `Pour quelles valeurs de $x$ le produit $(2x - 4)(x + 3)$ est-il strictement négatif ($< 0$) ?`;
      setupOptions(']-3 ; 2[', [
        ']-∞ ; -3[ ∪ ]2 ; +∞[',
        '[-3 ; 2]',
        ']-2 ; 3['
      ]);
      q.explanationHtml = `
        <div><strong>Racines :</strong> $2x - 4 = 0 \\iff x = 2$ et $x + 3 = 0 \\iff x = -3$.</div>
        <div>Le coefficient de $x^2$ est positif ($2 > 0$), donc le produit est négatif <strong>strictement entre les racines</strong> : <strong>$]-3 ; 2[$</strong>.</div>
      `;
      q.hints = [
        { level: 1, title: 'Racines', content: 'Trouve les valeurs qui annulent chaque facteur : $x = 2$ et $x = -3$.' },
        { level: 2, title: 'Règle des signes', content: 'Dresse un mini tableau de signes avec les facteurs $2x - 4$ et $x + 3$.' }
      ];
      return true;
    }
  }

  // -------------------------------------------------------------
  // DOMAINE 4 : Statistiques & Probabilités
  // -------------------------------------------------------------
  if (realm === 'ProbasStatsAlgo') {
    if (questIndex === 0) {
      // Statistiques : Médiane et Quartiles
      q.title = 'Seconde : Médiane d\'une Série Statistique';
      q.question = `On donne la série ordonnée de 7 notes : $8 ; 10 ; 11 ; 13 ; 15 ; 17 ; 19$. Quelle est la médiane de cette série ?`;
      setupOptions('13', ['11', '14', '15']);
      q.explanationHtml = `
        <div><strong>Calcul :</strong> L'effectif total est $N = 7$ (impair).</div>
        <div>Le rang de la médiane est $\\frac{N + 1}{2} = \\frac{8}{2} = 4^{\\text{ème}}$ valeur.</div>
        <div>La $4^{\\text{ème}}$ valeur de la série ordonnée est <strong>13</strong>.</div>
      `;
      q.hints = [
        { level: 1, title: 'Rang de la médiane', content: 'Pour 7 valeurs, la médiane est exactement la 4ème valeur.' }
      ];
      return true;
    }

    if (questIndex === 1) {
      // Information Chiffrée & Évolutions
      q.title = 'Seconde : Évolution Successive (Hausse de 30% puis Baisse de 20%)';
      q.question = `Un prix augmente de 30% puis diminue de 20%. Quel est le taux d'évolution global ?`;
      setupOptions('+4%', ['+10%', '+6%', '-10%']);
      q.explanationHtml = `
        <div><strong>Coefficients multiplicateurs :</strong> $CM_1 = 1 + 0,30 = 1,30$ et $CM_2 = 1 - 0,20 = 0,80$.</div>
        <div>$CM = 1,30 \\times 0,80 = 1,04$.</div>
        <div>Taux global $T = CM - 1 = 1,04 - 1 = +0,04 = <strong>+4\\%</strong>$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Multiplication des coefficients', content: 'Calcule $CM = 1,30 \\times 0,80$.' }
      ];
      return true;
    }

    if (questIndex === 2) {
      // Formule de l'Union P(A ∪ B)
      q.title = 'Seconde : Formule de l\'Union de deux événements';
      q.question = `Soient $A$ et $B$ deux événements tels que $P(A) = 0,7$, $P(B) = 0,4$ et $P(A \\cap B) = 0,2$. Que vaut $P(A \\cup B)$ ?`;
      setupOptions('0,9', ['1,1', '0,5', '0,8']);
      q.explanationHtml = `
        <div><strong>Formule :</strong> $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.</div>
        <div>$P(A \\cup B) = 0,7 + 0,4 - 0,2 = 1,1 - 0,2 = <strong>0,9</strong>$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Formule du cours', content: '$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.' }
      ];
      return true;
    }

    if (questIndex === 3) {
      // Arbres pondérés
      q.title = 'Seconde : Probabilités sur un Arbre Pondéré';
      q.question = `Dans un arbre pondéré, la branche vers $A$ a une probabilité $P(A) = 0,6$, et à partir de $A$, la branche vers $B$ a une probabilité $P_A(B) = 0,5$. Que vaut $P(A \\cap B)$ ?`;
      setupOptions('0,3', ['1,1', '0,1', '0,65']);
      q.explanationHtml = `
        <div><strong>Règle du produit :</strong> La probabilité d'un chemin est le produit des probabilités sur ses branches :</div>
        <div>$P(A \\cap B) = P(A) \\times P_A(B) = 0,6 \\times 0,5 = <strong>0,3</strong>$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Règle des branches', content: 'Multiplie les probabilités le long du chemin : $0,6 \\times 0,5$.' }
      ];
      return true;
    }
  }

  // -------------------------------------------------------------
  // DOMAINE 5 : Algorithmique Python & Automatismes
  // -------------------------------------------------------------
  if (realm === 'AlgoAutomatismes') {
    if (questIndex === 0) {
      // Python boucle
      q.title = 'Seconde : Boucle For en Python';
      q.question = `On exécute le code Python suivant :<br/><code>s = 0<br/>for k in range(1, 4):<br/>&nbsp;&nbsp;&nbsp;&nbsp;s = s + 3 * k</code><br/>Que vaut la variable <code>s</code> après exécution ?`;
      setupOptions('18', ['24', '12', '9']);
      q.explanationHtml = `
        <div><strong>Itérations :</strong> <code>range(1, 4)</code> prend les valeurs $k = 1, 2, 3$ ($4$ est exclu).</div>
        <div>$s = 3(1) + 3(2) + 3(3) = 3 + 6 + 9 = <strong>18</strong>$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Borne supérieure', content: 'En Python, `range(1, 4)` s\'arrête à $k = 3$.' }
      ];
      return true;
    }

    if (questIndex === 1) {
      // Simplification racine carrée
      q.title = 'Seconde : Automatismes sur les Radicaux';
      q.question = `Simplifie l'expression $\\sqrt{75}$ sous la forme $a\\sqrt{b}$ où $b$ est le plus petit entier possible :`;
      setupOptions('5√3', ['3√5', '25√3', '15√5']);
      q.explanationHtml = `
        <div><strong>Carré parfait :</strong> $75 = 25 \\times 3$.</div>
        <div>$\\sqrt{75} = \\sqrt{25} \\times \\sqrt{3} = <strong>5\\sqrt{3}</strong>$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Recherche du carré parfait', content: 'Remarque que $75 = 25 \\times 3$ et $\\sqrt{25} = 5$.' }
      ];
      return true;
    }
  }

  return false;
}
