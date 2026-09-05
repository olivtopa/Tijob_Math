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
      // Arithmétique & Ensembles de nombres (3 sous-modes variés)
      const subMode = Math.floor(Math.random() * 3);

      if (subMode === 0) {
        // Sous-mode A : Plus petit ensemble de nombres avec un large panel dynamique
        const numberPool = [
          // N (Entiers naturels)
          { expr: '\\sqrt{64}', val: '8', ens: 'N (Entiers naturels)' },
          { expr: '\\sqrt{121}', val: '11', ens: 'N (Entiers naturels)' },
          { expr: '\\frac{28}{4}', val: '7', ens: 'N (Entiers naturels)' },
          { expr: '(-3)^2', val: '9', ens: 'N (Entiers naturels)' },
          // Z (Entiers relatifs non naturels)
          { expr: '-\\sqrt{81}', val: '-9', ens: 'Z (Entiers relatifs)' },
          { expr: '-\\frac{36}{4}', val: '-9', ens: 'Z (Entiers relatifs)' },
          { expr: '5 - 12', val: '-7', ens: 'Z (Entiers relatifs)' },
          { expr: '-\\frac{42}{7}', val: '-6', ens: 'Z (Entiers relatifs)' },
          // D (Décimaux non entiers)
          { expr: '\\frac{7}{4}', val: '1,75', ens: 'D (Décimaux)' },
          { expr: '\\frac{13}{8}', val: '1,625', ens: 'D (Décimaux)' },
          { expr: '-\\frac{9}{5}', val: '-1,8', ens: 'D (Décimaux)' },
          { expr: '\\frac{3}{25}', val: '0,12', ens: 'D (Décimaux)' },
          { expr: '\\frac{31}{10^2}', val: '0,31', ens: 'D (Décimaux)' },
          // Q (Rationnels non décimaux)
          { expr: '\\frac{1}{3}', val: '0,333...', ens: 'Q (Rationnels non décimaux)' },
          { expr: '\\frac{2}{7}', val: '0,2857...', ens: 'Q (Rationnels non décimaux)' },
          { expr: '-\\frac{5}{6}', val: '-0,833...', ens: 'Q (Rationnels non décimaux)' },
          { expr: '\\frac{4}{11}', val: '0,3636...', ens: 'Q (Rationnels non décimaux)' },
          // R (Réels irrationnels)
          { expr: '\\sqrt{5}', val: '2,236...', ens: 'R (Réels irrationnels)' },
          { expr: '\\sqrt{18}', val: '3\\sqrt{2} \\approx 4,242...', ens: 'R (Réels irrationnels)' },
          { expr: '\\pi + 1', val: '4,1415...', ens: 'R (Réels irrationnels)' },
          { expr: '2\\pi', val: '6,283...', ens: 'R (Réels irrationnels)' },
          { expr: '\\frac{\\sqrt{2}}{2}', val: '0,707...', ens: 'R (Réels irrationnels)' }
        ];
        const item = numberPool[Math.floor(Math.random() * numberPool.length)];
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
      } else if (subMode === 1) {
        // Sous-mode B : Parité dynamique
        const parityType = Math.floor(Math.random() * 4);
        let expr = '';
        let ans = '';
        let expl = '';

        if (parityType === 0) {
          const k1 = (Math.floor(Math.random() * 3) + 1) * 2; // pair
          const k2 = (Math.floor(Math.random() * 3) + 1) * 2; // pair
          expr = `2n^2 + ${k1}n + ${k2}`;
          ans = 'Toujours Pair';
          expl = `On peut factoriser par 2 : $${expr} = 2(n^2 + ${k1 / 2}n + ${k2 / 2}) = 2k$. L'expression est <strong>toujours paire</strong>.`;
        } else if (parityType === 1) {
          const k1 = (Math.floor(Math.random() * 3) + 1) * 2; // pair
          const c = (Math.floor(Math.random() * 3) * 2) + 1; // impair : 1, 3, 5
          expr = `2n^2 + ${k1}n + ${c}`;
          ans = 'Toujours Impair';
          expl = `On peut écrire $${expr} = 2(n^2 + ${k1 / 2}n + ${Math.floor(c / 2)}) + 1 = 2k + 1$. L'expression est <strong>toujours impaire</strong>.`;
        } else if (parityType === 2) {
          expr = 'n(n + 1)';
          ans = 'Toujours Pair';
          expl = 'Le produit de deux entiers consécutifs $n$ et $n+1$ comporte obligatoirement un nombre pair, donc le produit est <strong>toujours pair</strong>.';
        } else {
          expr = '(2n + 1)^2 - 1';
          ans = 'Toujours Multiple de 4';
          expl = 'En développant : $(2n+1)^2 - 1 = 4n^2 + 4n + 1 - 1 = 4(n^2 + n) = 4k$. C\'est <strong>toujours un multiple de 4</strong> (donc pair).';
        }

        q.title = 'Seconde : Arithmétique & Parité';
        q.question = `Soit $n \\in \\mathbb{N}$. Quelle est la propriété de l'expression $A = ${expr}$ ?`;
        setupOptions(ans, [
          ans === 'Toujours Pair' ? 'Toujours Impair' : 'Toujours Pair',
          'Pair seulement si n est pair',
          'Pair seulement si n est impair',
          'Toujours Multiple de 3'
        ]);
        q.explanationHtml = `<div><strong>Démonstration :</strong> ${expl}</div>`;
        q.hints = [
          { level: 1, title: 'Factorisation ou raisonnement', content: 'Essaie de mettre 2 ou un multiple en facteur, ou teste pour n=0 et n=1.' },
          { level: 2, title: 'Définition', content: 'Un nombre pair s\'écrit $2k$ et un nombre impair s\'écrit $2k+1$ avec $k \\in \\mathbb{Z}$.' }
        ];
      } else {
        // Sous-mode C : Nombres premiers & Décomposition
        const decomps = [
          { n: 60, decomp: '2^2 \\times 3 \\times 5', distractors: ['2 \\times 3^2 \\times 5', '4 \\times 3 \\times 5', '2^3 \\times 3 \\times 5'] },
          { n: 72, decomp: '2^3 \\times 3^2', distractors: ['2^2 \\times 3^3', '8 \\times 9', '2^4 \\times 3'] },
          { n: 84, decomp: '2^2 \\times 3 \\times 7', distractors: ['2 \\times 3^2 \\times 7', '4 \\times 21', '2^3 \\times 3 \\times 7'] },
          { n: 90, decomp: '2 \\times 3^2 \\times 5', distractors: ['2^2 \\times 3 \\times 5', '9 \\times 10', '2 \\times 3 \\times 5^2'] },
          { n: 120, decomp: '2^3 \\times 3 \\times 5', distractors: ['2^2 \\times 3^2 \\times 5', '8 \\times 15', '2^4 \\times 3 \\times 5'] },
          { n: 150, decomp: '2 \\times 3 \\times 5^2', distractors: ['2^2 \\times 3 \\times 5', '6 \\times 25', '2 \\times 3^2 \\times 5'] }
        ];
        const item = decomps[Math.floor(Math.random() * decomps.length)];
        q.title = 'Seconde : Décomposition en Facteurs Premiers';
        q.question = `Quelle est la décomposition en produit de facteurs premiers du nombre $N = ${item.n}$ ?`;
        setupOptions(item.decomp, item.distractors);
        q.explanationHtml = `
          <div><strong>Méthode :</strong> On divise successivement $${item.n}$ par les nombres premiers ($2, 3, 5, 7, \\dots$).</div>
          <div>La décomposition exacte est <strong>$${item.n} = ${item.decomp}$</strong>.</div>
        `;
        q.hints = [
          { level: 1, title: 'Nombres premiers autorisés', content: 'La décomposition ne doit contenir que des nombres premiers : 2, 3, 5, 7, etc.' },
          { level: 2, title: 'Divisions successives', content: `Commence par diviser ${item.n} par 2 autant de fois que possible.` }
        ];
      }
      return true;
    }

    if (questIndex === 1) {
      // Intervalles & Valeur Absolue (2 sous-modes)
      const sub = Math.random() > 0.5;
      if (sub) {
        // Sous-mode A : |x - c| <= r
        const center = Math.floor(Math.random() * 11) - 4; // -4 à 6
        const radius = Math.floor(Math.random() * 5) + 2; // 2 à 6
        const minVal = center - radius;
        const maxVal = center + radius;
        const correctInterval = `[${minVal} ; ${maxVal}]`;
        const centerStr = center >= 0 ? `- ${center}` : `+ ${Math.abs(center)}`;

        q.title = 'Seconde : Valeur Absolue & Intervalles';
        q.question = `Résous dans $\\mathbb{R}$ l'inéquation $|x ${centerStr}| \\le ${radius}$. Donne l'intervalle solution :`;
        setupOptions(correctInterval, [
          `[${minVal + 1} ; ${maxVal - 1}]`,
          `[${center} ; ${maxVal}]`,
          `[-${radius} ; ${radius}]`
        ]);
        q.explanationHtml = `
          <div><strong>Propriété :</strong> $|x - c| \\le r \\iff c - r \\le x \\le c + r$.</div>
          <div>Ici le centre est $c = ${center}$ et le rayon est $r = ${radius}$ :</div>
          <div>$${center} - ${radius} \\le x \\le ${center} + ${radius} \\iff ${minVal} \\le x \\le ${maxVal}$.</div>
          <div>L'ensemble des solutions est <strong>$S = [${minVal} ; ${maxVal}]$</strong>.</div>
        `;
        q.hints = [
          { level: 1, title: 'Distance géométrique', content: '$|x - a|$ représente la distance entre $x$ et $a$ sur la droite graduée.' },
          { level: 2, title: 'Encadrement', content: `La distance entre $x$ et ${center} est inférieure ou égale à ${radius}.` }
        ];
      } else {
        // Sous-mode B : Intersection ou Réunion d'intervalles
        const a = Math.floor(Math.random() * 4) - 5; // -5 à -2
        const b = a + Math.floor(Math.random() * 4) + 3; // ex: 0
        const c = b - 1; // chevauchement
        const d = b + Math.floor(Math.random() * 4) + 2;
        const isInter = Math.random() > 0.5;

        q.title = isInter ? 'Seconde : Intersection d\'Intervalles' : 'Seconde : Réunion d\'Intervalles';
        if (isInter) {
          q.question = `Soient $I = [${a} ; ${b}]$ et $J = [${c} ; ${d}]$. Détermine l'intersection $I \\cap J$ :`;
          const correctAns = `[${c} ; ${b}]`;
          setupOptions(correctAns, [
            `[${a} ; ${d}]`,
            `[${a} ; ${c}]`,
            `[${b} ; ${d}]`
          ]);
          q.explanationHtml = `
            <div><strong>Définition :</strong> L'intersection $I \\cap J$ est l'ensemble des réels appartenant à la fois à $I$ et à $J$.</div>
            <div>La zone commune sur l'axe gradué commence à $${c}$ et se termine à $${b}$.</div>
            <div>Donc $I \\cap J = <strong>[${c} ; ${b}]</strong>$.</div>
          `;
        } else {
          q.question = `Soient $I = [${a} ; ${b}]$ et $J = [${c} ; ${d}]$. Détermine la réunion $I \\cup J$ :`;
          const correctAns = `[${a} ; ${d}]`;
          setupOptions(correctAns, [
            `[${c} ; ${b}]`,
            `[${a} ; ${c}]`,
            `[${b} ; ${d}]`
          ]);
          q.explanationHtml = `
            <div><strong>Définition :</strong> La réunion $I \\cup J$ regroupe l'ensemble de tous les réels de $I$ ou de $J$.</div>
            <div>Comme les intervalles se chevauchent ($${c} \\le ${b}$), la réunion s'étend de la plus petite borne à la plus grande.</div>
            <div>Donc $I \\cup J = <strong>[${a} ; ${d}]</strong>$.</div>
          `;
        }
        q.hints = [
          { level: 1, title: 'Représentation', content: 'Trace une droite graduée pour visualiser la zone commune ou totale.' }
        ];
      }
      return true;
    }

    if (questIndex === 2) {
      // Calcul Algébrique & Identités remarquables a² - b²
      const a = Math.floor(Math.random() * 3) + 2; // 2 à 4
      const b = Math.floor(Math.random() * 5) + 1; // 1 à 5
      const c = Math.floor(Math.random() * 4) + 2; // 2 à 5
      const c2 = c * c;
      const term1 = b - c;
      const term2 = b + c;
      const sign1 = term1 >= 0 ? `+ ${term1}` : `- ${Math.abs(term1)}`;
      const sign2 = term2 >= 0 ? `+ ${term2}` : `- ${Math.abs(term2)}`;
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
      const a = Math.floor(Math.random() * 4) + 2; // 2 à 5
      const b = Math.floor(Math.random() * 5) + 1;
      const sol = Math.floor(Math.random() * 7) + 1;
      const signSol = Math.random() > 0.5 ? 1 : -1;
      const signedSol = sol * signSol;
      const factor2Str = signedSol >= 0 ? `(x - ${signedSol})` : `(x + ${Math.abs(signedSol)})`;

      q.title = 'Seconde : Équation Produit Nul';
      q.question = `Résous dans $\\mathbb{R}$ l'équation $(${a}x - ${b})${factor2Str} = 0$. Quelles sont les solutions ?`;
      const correctStr = `x = ${signedSol} ou x = ${b}/${a}`;
      setupOptions(correctStr, [
        `x = ${-signedSol} ou x = -${b}/${a}`,
        `x = ${signedSol} ou x = -${b}/${a}`,
        `x = ${-signedSol} ou x = ${b}/${a}`
      ]);
      q.explanationHtml = `
        <div><strong>Théorème :</strong> Un produit de facteurs est nul si et seulement si l'un au moins des facteurs est nul.</div>
        <div>$${a}x - ${b} = 0 \\iff ${a}x = ${b} \\iff x = \\frac{${b}}{${a}}$</div>
        <div>$x ${signedSol >= 0 ? `- ${signedSol}` : `+ ${Math.abs(signedSol)}`} = 0 \\iff x = ${signedSol}$</div>
        <div>Les solutions sont <strong>$x = ${signedSol}$ et $x = \\frac{${b}}{${a}}$</strong>.</div>
      `;
      q.hints = [
        { level: 1, title: 'Théorème produit nul', content: '$A \\times B = 0 \\iff A = 0$ ou $B = 0$.' },
        { level: 2, title: 'Résolution', content: `Résous séparément chaque facteur égal à 0.` }
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
      const xa = Math.floor(Math.random() * 9) - 4;
      const ya = Math.floor(Math.random() * 9) - 4;
      const xb = Math.floor(Math.random() * 9) - 4;
      const yb = Math.floor(Math.random() * 9) - 4;
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
      // Colinéarité & Déterminant dynamique
      const xu = Math.floor(Math.random() * 5) + 1; // 1 à 5
      const yu = (Math.floor(Math.random() * 7) - 3) || 2; // non nul
      const k = [-3, -2, 2, 3][Math.floor(Math.random() * 4)];
      const isColinear = Math.random() > 0.45;
      const xv = isColinear ? xu * k : xu * k + (Math.random() > 0.5 ? 1 : -1);
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
      // Milieu et Distance dynamique
      const xa = Math.floor(Math.random() * 9) - 4;
      const ya = Math.floor(Math.random() * 9) - 4;
      // Choisir xb et yb avec même parité pour avoir des coordonnées entières ou demi-entières propres
      const dx = (Math.floor(Math.random() * 4) + 1) * 2;
      const dy = (Math.floor(Math.random() * 4) + 1) * 2;
      const xb = xa + dx;
      const yb = ya + dy;
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
      // Équation de droite y = mx + p dynamique
      const m = Math.floor(Math.random() * 5) + 1; // 1 à 5
      const p = Math.floor(Math.random() * 9) - 4; // -4 à 4
      const x1 = Math.floor(Math.random() * 3) + 1;
      const x2 = x1 + 2;
      const y1 = m * x1 + p;
      const y2 = m * x2 + p;
      q.title = 'Seconde : Coefficient Directeur d\'une Droite';
      q.question = `Une droite $(D)$ passe par les points $A(${x1} ; ${y1})$ et $B(${x2} ; ${y2})$. Quel est son coefficient directeur $m$ ?`;
      setupOptions(String(m), [
        String(m + 1),
        String(Math.max(1, m - 1)),
        String(2 * m)
      ]);
      q.explanationHtml = `
        <div><strong>Formule du coefficient directeur :</strong> $m = \\frac{y_B - y_A}{x_B - x_A}$.</div>
        <div>$m = \\frac{${y2} - (${y1})}{${x2} - ${x1}} = \\frac{${y2 - y1}}{2} = <strong>${m}</strong>$.</div>
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
      const b = Math.floor(Math.random() * 7) - 3;
      const xVal = Math.floor(Math.random() * 5) - 2; // -2 à 2
      const img = a * xVal * xVal + b;
      const bStr = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
      q.title = 'Seconde : Calcul d\'Image par une Fonction';
      q.question = `Soit la fonction $f$ définie par $f(x) = ${a}x^2 ${bStr}$. Quelle est l'image de $${xVal}$ par $f$ ?`;
      setupOptions(String(img), [
        String(img + a),
        String(img - 2),
        String(a * xVal + b)
      ]);
      q.explanationHtml = `
        <div><strong>Calcul :</strong> On remplace $x$ par $${xVal}$ dans l'expression de $f$ :</div>
        <div>$f(${xVal}) = ${a} \\times (${xVal})^2 ${bStr} = ${a} \\times ${xVal * xVal} ${bStr} = <strong>${img}</strong>$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Priorité opératoire', content: 'Calcule d\'abord la puissance $(x)^2$, puis la multiplication, et enfin l\'addition.' }
      ];
      return true;
    }

    if (questIndex === 1) {
      // Fonctions de Référence (Carré) avec bornes dynamiques
      const a = Math.floor(Math.random() * 4) + 2; // 2 à 5
      const b = a + Math.floor(Math.random() * 3) + 1; // b > a
      const maxSq = Math.max(a * a, b * b);
      q.title = 'Seconde : Encadrement avec la Fonction Carré';
      q.question = `Soit $x \\in [-${a} ; ${b}]$. Quel est l'encadrement exact de $x^2$ ?`;
      setupOptions(`[0 ; ${maxSq}]`, [
        `[${a * a} ; ${b * b}]`,
        `[-${a * a} ; ${b * b}]`,
        `[0 ; ${a * a}]`
      ]);
      q.explanationHtml = `
        <div><strong>Attention au zéro :</strong> Comme $0 \\in [-${a} ; ${b}]$ et que la fonction carré est toujours positive ($x^2 \\ge 0$), le minimum de $x^2$ est <strong>0</strong>.</div>
        <div>Le maximum est $\\max((-${a})^2, ${b}^2) = \\max(${a * a}, ${b * b}) = ${maxSq}$.</div>
        <div>Donc $x^2 \\in <strong>[0 ; ${maxSq}]</strong>$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Minimum d\'un carré', content: 'Un carré est toujours positif ou nul. Si 0 est dans l\'intervalle, la valeur minimale est 0.' }
      ];
      return true;
    }

    if (questIndex === 2) {
      // Extremums & Variations dynamiques (Sommet (x0, y0), signe a)
      const x0 = Math.floor(Math.random() * 7) - 3; // -3 à 3
      const y0 = Math.floor(Math.random() * 9) + 1; // 1 à 9
      const isMax = Math.random() > 0.5;
      const x0Str = x0 >= 0 ? `- ${x0}` : `+ ${Math.abs(x0)}`;
      const expr = isMax ? `-(x ${x0Str})^2 + ${y0}` : `(x ${x0Str})^2 + ${y0}`;
      const extremumType = isMax ? 'Maximum' : 'Minimum';
      const ans = `${extremumType} = ${y0} atteint en x = ${x0}`;

      q.title = `Seconde : ${extremumType} d'une Fonction`;
      q.question = `Soit $f(x) = ${expr}$ définie sur $\\mathbb{R}$. Quel est l'extremum de $f$ et en quelle valeur de $x$ est-il atteint ?`;
      setupOptions(ans, [
        `${extremumType} = -${y0} atteint en x = ${-x0}`,
        `${extremumType} = ${x0} atteint en x = ${y0}`,
        `${isMax ? 'Minimum' : 'Maximum'} = ${y0} atteint en x = ${x0}`
      ]);
      q.explanationHtml = `
        <div><strong>Analyse :</strong> Pour tout réel $x$, $(x ${x0Str})^2 \\ge 0$.</div>
        <div>${isMax ? `Donc $-(x ${x0Str})^2 \\le 0 \\implies f(x) \\le ${y0}$.` : `Donc $f(x) \\ge ${y0}$.`}</div>
        <div>L'égalité $f(x) = ${y0}$ est atteinte lorsque $x ${x0Str} = 0 \\iff x = ${x0}$.</div>
        <div>Le <strong>${extremumType.toLowerCase()} est ${y0}, atteint en $x = ${x0}$</strong>.</div>
      `;
      q.hints = [
        { level: 1, title: 'Forme canonique', content: `Un carré est toujours positif ou nul. Déduis-en le sens de l'inégalité.` }
      ];
      return true;
    }

    if (questIndex === 3) {
      // Tableaux de Signes & Inéquations dynamiques
      const r1 = Math.floor(Math.random() * 4) - 4; // -4 à -1
      const r2 = Math.floor(Math.random() * 4) + 1; // 1 à 4
      const signR1 = r1 >= 0 ? `- ${r1}` : `+ ${Math.abs(r1)}`;
      const signR2 = r2 >= 0 ? `- ${r2}` : `+ ${Math.abs(r2)}`;
      const isStrictInf = Math.random() > 0.5;

      q.title = 'Seconde : Signe d\'un Produit de Facteurs';
      q.question = `Pour quelles valeurs de $x$ le produit $(x ${signR1})(x ${signR2})$ est-il ${isStrictInf ? 'strictement négatif (< 0)' : 'strictement positif (> 0)'} ?`;
      const ans = isStrictInf ? `]${r1} ; ${r2}[` : `]-∞ ; ${r1}[ ∪ ]${r2} ; +∞[`;
      setupOptions(ans, [
        isStrictInf ? `]-∞ ; ${r1}[ ∪ ]${r2} ; +∞[` : `]${r1} ; ${r2}[`,
        `[${r1} ; ${r2}]`,
        `]-${r2} ; ${-r1}[`
      ]);
      q.explanationHtml = `
        <div><strong>Racines :</strong> $x ${signR1} = 0 \\iff x = ${r1}$ et $x ${signR2} = 0 \\iff x = ${r2}$.</div>
        <div>Le coefficient de $x^2$ est positif ($1 > 0$).</div>
        <div>Le produit est <strong>négatif à l'intérieur des racines</strong> ($]${r1} ; ${r2}[$) et <strong>positif à l'extérieur</strong> ($]-∞ ; ${r1}[ \\cup ]${r2} ; +∞[$).</div>
        <div>La réponse est donc <strong>${ans}</strong>.</div>
      `;
      q.hints = [
        { level: 1, title: 'Racines', content: `Trouve les valeurs qui annulent chaque facteur : $x = ${r1}$ et $x = ${r2}$.` },
        { level: 2, title: 'Règle des signes', content: 'Dresse un tableau de signes avec les deux facteurs.' }
      ];
      return true;
    }
  }

  // -------------------------------------------------------------
  // DOMAINE 4 : Statistiques & Probabilités
  // -------------------------------------------------------------
  if (realm === 'ProbasStatsAlgo') {
    if (questIndex === 0) {
      // Statistiques : Médiane dynamique
      const start = Math.floor(Math.random() * 6) + 4; // 4 à 9
      const step1 = Math.floor(Math.random() * 2) + 1;
      const step2 = Math.floor(Math.random() * 3) + 1;
      const step3 = Math.floor(Math.random() * 3) + 1;
      const step4 = Math.floor(Math.random() * 2) + 1;
      const step5 = Math.floor(Math.random() * 3) + 1;
      const step6 = Math.floor(Math.random() * 3) + 1;
      const notes = [
        start,
        start + step1,
        start + step1 + step2,
        start + step1 + step2 + step3,
        start + step1 + step2 + step3 + step4,
        start + step1 + step2 + step3 + step4 + step5,
        start + step1 + step2 + step3 + step4 + step5 + step6
      ];
      const median = notes[3];
      q.title = 'Seconde : Médiane d\'une Série Statistique';
      q.question = `On donne la série ordonnée de 7 notes : $${notes.join(' \\; ; \\; ')}$. Quelle est la médiane de cette série ?`;
      setupOptions(String(median), [
        String(notes[2]),
        String(notes[4]),
        String(median + 2)
      ]);
      q.explanationHtml = `
        <div><strong>Calcul :</strong> L'effectif total est $N = 7$ (impair).</div>
        <div>Le rang de la médiane est $\\frac{N + 1}{2} = \\frac{8}{2} = 4^{\\text{ème}}$ valeur.</div>
        <div>La $4^{\\text{ème}}$ valeur de la série ordonnée est <strong>${median}</strong>.</div>
      `;
      q.hints = [
        { level: 1, title: 'Rang de la médiane', content: 'Pour 7 valeurs ordonnées, la médiane est exactement la 4ème valeur.' }
      ];
      return true;
    }

    if (questIndex === 1) {
      // Information Chiffrée & Évolutions dynamiques
      const scenarios = [
        { h: 20, b: 10, cm1: 1.20, cm2: 0.90, cm: 1.08, res: '+8%' },
        { h: 30, b: 20, cm1: 1.30, cm2: 0.80, cm: 1.04, res: '+4%' },
        { h: 10, b: 20, cm1: 1.10, cm2: 0.80, cm: 0.88, res: '-12%' },
        { h: 50, b: 50, cm1: 1.50, cm2: 0.50, cm: 0.75, res: '-25%' },
        { h: 25, b: 20, cm1: 1.25, cm2: 0.80, cm: 1.00, res: '0% (stabilité)' }
      ];
      const sc = scenarios[Math.floor(Math.random() * scenarios.length)];
      q.title = `Seconde : Évolution Successive (+${sc.h}% puis -${sc.b}%)`;
      q.question = `Un prix augmente de ${sc.h}% puis diminue de ${sc.b}%. Quel est le taux d'évolution global ?`;
      setupOptions(sc.res, [
        `+${sc.h - sc.b}%`,
        `-${sc.h - sc.b}%`,
        `+${Math.round((sc.cm - 1) * 100 + 5)}%`
      ]);
      q.explanationHtml = `
        <div><strong>Coefficients multiplicateurs :</strong> $CM_1 = 1 + \\frac{${sc.h}}{100} = ${sc.cm1.toFixed(2)}$ et $CM_2 = 1 - \\frac{${sc.b}}{100} = ${sc.cm2.toFixed(2)}$.</div>
        <div>$CM = ${sc.cm1.toFixed(2)} \\times ${sc.cm2.toFixed(2)} = ${sc.cm.toFixed(2)}$.</div>
        <div>Taux global $T = CM - 1 = ${sc.cm.toFixed(2)} - 1 = <strong>${sc.res}</strong>.</div>
      `;
      q.hints = [
        { level: 1, title: 'Multiplication des coefficients', content: `Calcule $CM = ${sc.cm1.toFixed(2)} \\times ${sc.cm2.toFixed(2)}$.` }
      ];
      return true;
    }

    if (questIndex === 2) {
      // Formule de l'Union P(A ∪ B) dynamique
      const pInter = (Math.floor(Math.random() * 3) + 1) / 10; // 0.1, 0.2, 0.3
      const pA = pInter + (Math.floor(Math.random() * 3) + 2) / 10; // 0.4 à 0.7
      const pB = pInter + (Math.floor(Math.random() * 3) + 1) / 10; // 0.3 à 0.5
      const pUnion = Math.round((pA + pB - pInter) * 100) / 100;

      q.title = 'Seconde : Formule de l\'Union de deux événements';
      q.question = `Soient $A$ et $B$ deux événements tels que $P(A) = ${pA.toFixed(1)}$, $P(B) = ${pB.toFixed(1)}$ et $P(A \\cap B) = ${pInter.toFixed(1)}$. Que vaut $P(A \\cup B)$ ?`;
      setupOptions(String(pUnion).replace('.', ','), [
        String(Math.round((pA + pB) * 100) / 100).replace('.', ','),
        String(Math.round((pA - pInter) * 100) / 100).replace('.', ','),
        String(Math.round((pUnion - 0.1) * 100) / 100).replace('.', ',')
      ]);
      q.explanationHtml = `
        <div><strong>Formule :</strong> $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.</div>
        <div>$P(A \\cup B) = ${pA.toFixed(1)} + ${pB.toFixed(1)} - ${pInter.toFixed(1)} = <strong>${String(pUnion).replace('.', ',')}</strong>$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Formule du cours', content: '$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.' }
      ];
      return true;
    }

    if (questIndex === 3) {
      // Arbres pondérés dynamiques
      const pA = (Math.floor(Math.random() * 4) + 3) / 10; // 0.3 à 0.6
      const pB = (Math.floor(Math.random() * 5) + 2) / 10; // 0.2 à 0.6
      const pInter = Math.round((pA * pB) * 100) / 100;

      q.title = 'Seconde : Probabilités sur un Arbre Pondéré';
      q.question = `Dans un arbre pondéré, la branche vers $A$ a une probabilité $P(A) = ${pA.toFixed(1)}$, et à partir de $A$, la branche vers $B$ a une probabilité $P_A(B) = ${pB.toFixed(1)}$. Que vaut $P(A \\cap B)$ ?`;
      setupOptions(String(pInter).replace('.', ','), [
        String(Math.round((pA + pB) * 100) / 100).replace('.', ','),
        String(Math.round(Math.abs(pA - pB) * 100) / 100).replace('.', ','),
        String(Math.round((pInter + 0.15) * 100) / 100).replace('.', ',')
      ]);
      q.explanationHtml = `
        <div><strong>Règle du produit :</strong> La probabilité d'un chemin est le produit des probabilités sur ses branches :</div>
        <div>$P(A \\cap B) = P(A) \\times P_A(B) = ${pA.toFixed(1)} \\times ${pB.toFixed(1)} = <strong>${String(pInter).replace('.', ',')}</strong>$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Règle des branches', content: `Multiplie les probabilités le long du chemin : $${pA.toFixed(1)} \\times ${pB.toFixed(1)}$.` }
      ];
      return true;
    }
  }

  // -------------------------------------------------------------
  // DOMAINE 5 : Algorithmique Python & Automatismes
  // -------------------------------------------------------------
  if (realm === 'AlgoAutomatismes') {
    if (questIndex === 0) {
      // Python boucle for dynamique
      const endK = Math.floor(Math.random() * 3) + 4; // 4 à 6
      const mult = Math.floor(Math.random() * 3) + 2; // 2 à 4
      let sum = 0;
      for (let k = 1; k < endK; k++) {
        sum += mult * k;
      }
      q.title = 'Seconde : Boucle For en Python';
      q.question = `On exécute le code Python suivant :<br/><code>s = 0<br/>for k in range(1, ${endK}):<br/>&nbsp;&nbsp;&nbsp;&nbsp;s = s + ${mult} * k</code><br/>Que vaut la variable <code>s</code> après exécution ?`;
      setupOptions(String(sum), [
        String(sum + mult * endK),
        String(sum - mult),
        String(mult * (endK - 1))
      ]);
      q.explanationHtml = `
        <div><strong>Itérations :</strong> <code>range(1, ${endK})</code> prend les valeurs $k = 1, \\dots, ${endK - 1}$ (${endK} est exclu).</div>
        <div>$s = ${Array.from({ length: endK - 1 }, (_, i) => `${mult}(${i + 1})`).join(' + ')} = <strong>${sum}</strong>$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Borne supérieure', content: `En Python, \`range(1, ${endK})\` s'arrête à $k = ${endK - 1}$.` }
      ];
      return true;
    }

    if (questIndex === 1) {
      // Simplification racine carrée dynamique : sqrt(a^2 * b)
      const squares = [
        { a: 2, b: 3, n: 12 },
        { a: 2, b: 5, n: 20 },
        { a: 3, b: 2, n: 18 },
        { a: 3, b: 3, n: 27 },
        { a: 4, b: 2, n: 32 },
        { a: 3, b: 5, n: 45 },
        { a: 2, b: 7, n: 28 },
        { a: 5, b: 2, n: 50 },
        { a: 5, b: 3, n: 75 },
        { a: 6, b: 2, n: 72 }
      ];
      const item = squares[Math.floor(Math.random() * squares.length)];
      const correctVal = `${item.a}√${item.b}`;
      q.title = 'Seconde : Automatismes sur les Radicaux';
      q.question = `Simplifie l'expression $\\sqrt{${item.n}}$ sous la forme $a\\sqrt{b}$ où $b$ est le plus petit entier possible :`;
      setupOptions(correctVal, [
        `${item.b}√${item.a}`,
        `${item.a * item.a}√${item.b}`,
        `${item.a + 1}√${item.b}`
      ]);
      q.explanationHtml = `
        <div><strong>Carré parfait :</strong> $${item.n} = ${item.a * item.a} \\times ${item.b} = ${item.a}^2 \\times ${item.b}$.</div>
        <div>$\\sqrt{${item.n}} = \\sqrt{${item.a * item.a}} \\times \\sqrt{${item.b}} = <strong>${item.a}\\sqrt{${item.b}}</strong>$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Recherche du carré parfait', content: `Remarque que $${item.n} = ${item.a * item.a} \\times ${item.b}$.` }
      ];
      return true;
    }
  }

  return false;
}
