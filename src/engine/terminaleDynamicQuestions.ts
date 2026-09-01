import { DynamicQuestion } from '../types/mathquest';

type SetupOptionsFn = (correct: string, list: string[]) => void;

export function generateTerminaleQuestion(
  realm: string,
  questIndex: number,
  setupOptions: SetupOptionsFn,
  q: DynamicQuestion
): boolean {
  if (realm === 'Analyse') {
    if (questIndex === 0) {
      q.title = 'Terminale : Raisonnement par Récurrence';
      q.question = `Soit la suite $(u_n)$ définie par $u_0 = 2$ et $u_{n+1} = 3u_n - 2$. Dans une preuve par récurrence de la propriété $P(n) : u_n > 1$, quelle est l'étape d'hérédité correcte ?`;
      setupOptions('Supposer un > 1 et montrer que un+1 > 1', [
        'Vérifier que u0 > 1',
        'Calculer u1 = 4',
        'Montrer que la suite est croissante'
      ]);
      q.explanationHtml = `
        <div><strong>Hérédité :</strong> On suppose que pour un entier $n \\ge 0$, $u_n > 1$ (Hypothèse de Récurrence).</div>
        <div>Alors $3u_n > 3 \\implies 3u_n - 2 > 1 \\implies u_{n+1} > 1$. L'hérédité est établie.</div>
      `;
      q.hints = [
        { level: 1, title: 'Définition de l\'hérédité', content: 'L\'hérédité consiste à prouver que si $P(n)$ est vraie, alors $P(n+1)$ est vraie.' }
      ];
      return true;
    }

    if (questIndex === 1) {
      q.title = 'Terminale : Limite de Suite Rationnelle';
      q.question = `Quelle est la limite quand $n \\to +\\infty$ de la suite $u_n = \\frac{5n^2 - 3n + 1}{2n^2 + 7}$ ?`;
      setupOptions('5/2', ['+∞', '0', '5/7']);
      q.explanationHtml = `
        <div><strong>Termes de plus haut degré :</strong> En factorisant par $n^2$ au numérateur et dénominateur :</div>
        <div>$\\lim_{n \\to +\\infty} u_n = \\lim_{n \\to +\\infty} \\frac{5n^2}{2n^2} = <strong>\\frac{5}{2}</strong>$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Règle des plus hauts degrés', content: 'Pour une fraction rationnelle à l\'infini, la limite est celle du quotient des termes de plus haut degré.' }
      ];
      return true;
    }

    if (questIndex === 2) {
      q.title = 'Terminale : Théorème des Valeurs Intermédiaires (TVI)';
      q.question = `Soit $f$ une fonction continue et strictement croissante sur $[1 ; 5]$ telle que $f(1) = -4$ et $f(5) = 8$. Combien de solutions l'équation $f(x) = 0$ admet-elle sur $[1 ; 5]$ ?`;
      setupOptions('Exactement 1 solution unique', [
        'Au moins 2 solutions',
        'Aucune solution',
        'Une infinité de solutions'
      ]);
      q.explanationHtml = `
        <div><strong>Corollaire du TVI (Bijection) :</strong> Comme $f$ est <strong>continue</strong> et <strong>strictement monotone</strong> sur $[1 ; 5]$, et que $0 \\in [-4 ; 8]$, l'équation $f(x) = 0$ admet <strong>une unique solution</strong> sur $[1 ; 5]$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Continuité et stricte monotonie', content: 'La stricte croissance garantit l\'unicité de la solution.' }
      ];
      return true;
    }
  }

  if (realm === 'Exponentielle') {
    if (questIndex === 0) {
      q.title = 'Terminale : Dérivée d\'un Produit avec Exponentielle';
      q.question = `Soit $f(x) = (2x + 1)e^x$. Quelle est l'expression factorisée de sa dérivée $f'(x)$ ?`;
      setupOptions('(2x + 3)e^x', [
        '2e^x',
        '(2x + 1)e^x',
        '(2x + 2)e^x'
      ]);
      q.explanationHtml = `
        <div><strong>Formule $(uv)' = u'v + uv'$ :</strong> Avec $u(x) = 2x+1 \\implies u'(x) = 2$ et $v(x) = e^x \\implies v'(x) = e^x$.</div>
        <div>$f'(x) = 2e^x + (2x+1)e^x = (2 + 2x + 1)e^x = <strong>(2x + 3)e^x</strong>$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Dérivée du produit', content: '$(uv)\' = u\'v + uv\'$. N\'oublie pas de factoriser par $e^x$.' }
      ];
      return true;
    }

    if (questIndex === 1) {
      q.title = 'Terminale : Équation avec Exponentielle';
      q.question = `Résous dans $\\mathbb{R}$ l'équation $e^{2x} = 5$. Quelle est la solution exacte ?`;
      setupOptions('x = ln(5)/2', [
        'x = ln(5) - 2',
        'x = 2ln(5)',
        'x = ln(2,5)'
      ]);
      q.explanationHtml = `
        <div><strong>Passage au logarithme népérien :</strong></div>
        <div>$e^{2x} = 5 \\iff 2x = \\ln(5) \\iff x = <strong>\\frac{\\ln(5)}{2}</strong>$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Fonction réciproque ln', content: 'Applique le logarithme $\\ln$ aux deux membres : $\\ln(e^u) = u$.' }
      ];
      return true;
    }

    if (questIndex === 2) {
      q.title = 'Terminale : Logarithme Népérien & Propriétés';
      q.question = `Simplifie l'expression $\\ln(32) - \\ln(8)$ sous la forme $\\ln(a)$ :`;
      setupOptions('ln(4)', ['ln(24)', 'ln(40)', '4']);
      q.explanationHtml = `
        <div><strong>Propriété :</strong> $\\ln(a) - \\ln(b) = \\ln\\left(\\frac{a}{b}\\right)$.</div>
        <div>$\\ln(32) - \\ln(8) = \\ln\\left(\\frac{32}{8}\\right) = <strong>\\ln(4) = 2\\ln(2)</strong>$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Différence de logarithmes', content: '$\\ln(a) - \\ln(b) = \\ln(a/b)$.' }
      ];
      return true;
    }
  }

  if (realm === 'GeometrieEspace') {
    if (questIndex === 0) {
      q.title = 'Terminale : Produit Scalaire dans l\'Espace';
      q.question = `Dans un repère orthonormé $(O; \\vec{i}, \\vec{j}, \\vec{k})$, soient $\\vec{u}(2 ; -1 ; 3)$ et $\\vec{v}(4 ; 5 ; -1)$. Que vaut le produit scalaire $\\vec{u} \\cdot \\vec{v}$ ?`;
      setupOptions('0 (vecteurs orthogonaux)', [
        '6',
        '-2',
        '16'
      ]);
      q.explanationHtml = `
        <div><strong>Formule :</strong> $\\vec{u} \\cdot \\vec{v} = x x' + y y' + z z'$.</div>
        <div>$\\vec{u} \\cdot \\vec{v} = 2(4) + (-1)(5) + 3(-1) = 8 - 5 - 3 = <strong>0</strong>$.</div>
        <div>Comme le produit scalaire est nul, les vecteurs sont <strong>orthogonaux</strong>.</div>
      `;
      q.hints = [
        { level: 1, title: 'Formule analytique 3D', content: '$\\vec{u} \\cdot \\vec{v} = xx\' + yy\' + zz\'$.' }
      ];
      return true;
    }
  }

  if (realm === 'Probabilites') {
    if (questIndex === 0) {
      q.title = 'Terminale : Loi Binomiale & Espérance';
      q.question = `Soit $X \\sim \\mathcal{B}(50 ; 0,2)$ une variable aléatoire suivant une loi binomiale. Quelle est l'espérance mathématique $E(X)$ ?`;
      setupOptions('10', ['8', '20', '5']);
      q.explanationHtml = `
        <div><strong>Formule de l'espérance binomiale :</strong> $E(X) = n \\times p$.</div>
        <div>$E(X) = 50 \\times 0,2 = <strong>10</strong>$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Formule de l\'espérance', content: '$E(X) = n \\times p$.' }
      ];
      return true;
    }
  }

  return false;
}
