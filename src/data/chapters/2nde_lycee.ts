import { Chapter } from '../../types/mathquest';

export const chapters2nde: Chapter[] = [
  // =========================================================================
  // CHAPITRE 1 : Nombres, Arithmétique & Calcul Algébrique
  // =========================================================================
  {
    id: 'chap_2nde_nombres',
    cycle: 'lycee',
    title: 'Nombres, Arithmétique & Algèbre',
    subtitle: 'Ensembles, intervalles, valeur absolue et calculs algébriques',
    icon: 'Calculator',
    quests: [
      {
        id: 'quest_2nde_arithmetique',
        title: 'Arithmétique & Ensembles de Nombres',
        description: 'Maîtrise les ensembles (N, Z, D, Q, R), la parité et les nombres premiers.',
        iconName: 'Hash',
        isUnlocked: true,
        exercises: [
          {
            id: 'ex_2nde_arith_1',
            title: 'Appartenance aux Ensembles de Nombres',
            description: 'Identifie le plus petit ensemble de nombres auquel appartient le nombre $A = \\frac{15}{6} - \\frac{1}{4}$.',
            difficulty: 'Facile',
            rewardXP: 140,
            competencies: ['Chercher', 'Raisonner', 'Calculer'],
            steps: [
              {
                id: 'step_2nde_arith_1_1',
                title: 'Calcul de la fraction simplifiée',
                instruction: 'Calcule $A = \\frac{15}{6} - \\frac{1}{4}$ sous forme de fraction irréductible.',
                expectedType: 'expression',
                expectedAnswers: ['9/4', '\\frac{9}{4}'],
                hints: [
                  {
                    level: 1,
                    title: 'Simplification préalable',
                    content: 'Remarque que $\\frac{15}{6} = \\frac{5}{2}$.'
                  },
                  {
                    level: 2,
                    title: 'Dénominateur commun',
                    content: 'Le dénominateur commun entre 2 et 4 est 4 : $\\frac{5}{2} = \\frac{10}{4}$.'
                  },
                  {
                    level: 3,
                    title: 'Soustraction finale',
                    content: '$A = \\frac{10}{4} - \\frac{1}{4} = \\frac{9}{4}$.'
                  }
                ],
                errorFeedback: {
                  '14/2': 'N\'oublie pas de mettre au même dénominateur avant de soustraire !',
                  '14/6': 'Attention à la réduction au même dénominateur.'
                }
              },
              {
                id: 'step_2nde_arith_1_2',
                title: 'Identification du plus petit ensemble',
                instruction: 'Écris la valeur décimale de $\\frac{9}{4}$ et déduis-en son plus petit ensemble d\'appartenance ($\\mathbb{N}, \\mathbb{Z}, \\mathbb{D}, \\mathbb{Q}$ ou $\\mathbb{R}$).',
                expectedType: 'qcm',
                expectedAnswers: ['D (Décimaux)'],
                qcmChoices: [
                  'N (Entiers naturels)',
                  'Z (Entiers relatifs)',
                  'D (Décimaux)',
                  'Q (Rationnels non décimaux)'
                ],
                hints: [
                  {
                    level: 1,
                    title: 'Définition d\'un décimal',
                    content: 'Un nombre est décimal ($\\mathbb{D}$) s\'il possède un nombre fini de chiffres après la virgule, ou s\'écrit $\\frac{a}{10^n}$.'
                  },
                  {
                    level: 2,
                    title: 'Valeur exacte',
                    content: '$\\frac{9}{4} = 2,25$. Le développement décimal s\'arrête après 2 chiffres.'
                  },
                  {
                    level: 3,
                    title: 'Conclusion',
                    content: '$2,25$ appartient donc à l\'ensemble $\\mathbb{D}$.'
                  }
                ]
              }
            ]
          },
          {
            id: 'ex_2nde_arith_2',
            title: 'Démonstration de Parité',
            description: 'Soit $n$ un entier naturel. On pose $A = (2n + 1)^2 - 1$. Montre que $A$ est un multiple de 4.',
            difficulty: 'Moyen',
            rewardXP: 180,
            competencies: ['Raisonner', 'Calculer'],
            steps: [
              {
                id: 'step_2nde_arith_2_1',
                title: 'Développement de l\'expression',
                instruction: 'Développe et réduis l\'expression $(2n + 1)^2 - 1$.',
                expectedType: 'expression',
                expectedAnswers: ['4n^2 + 4n', '4n^2+4n', '4n(n+1)'],
                hints: [
                  {
                    level: 1,
                    title: 'Identité remarquable',
                    content: 'Applique $(a + b)^2 = a^2 + 2ab + b^2$ avec $a = 2n$ et $b = 1$.'
                  },
                  {
                    level: 2,
                    title: 'Attention au carré',
                    content: '$(2n)^2 = 4n^2$, donc $(2n + 1)^2 = 4n^2 + 4n + 1$.'
                  },
                  {
                    level: 3,
                    title: 'Réduction',
                    content: '$(4n^2 + 4n + 1) - 1 = 4n^2 + 4n$.'
                  }
                ]
              },
              {
                id: 'step_2nde_arith_2_2',
                title: 'Factorisation par 4',
                instruction: 'Factorise $4n^2 + 4n$ par 4 pour prouver la divisibilité.',
                expectedType: 'expression',
                expectedAnswers: ['4(n^2 + n)', '4(n^2+n)', '4n(n+1)', '4*(n^2+n)'],
                hints: [
                  {
                    level: 1,
                    title: 'Mise en facteur commun',
                    content: 'Mets 4 en facteur dans l\'expression $4n^2 + 4n$.'
                  },
                  {
                    level: 2,
                    title: 'Forme factorisée',
                    content: '$4n^2 + 4n = 4(n^2 + n)$. Comme $k = n^2 + n$ est un entier, $A = 4k$.'
                  },
                  {
                    level: 3,
                    title: 'Propriété',
                    content: '$A$ est donc bien un multiple de 4.'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'quest_2nde_intervalles',
        title: 'Intervalles & Valeur Absolue',
        description: 'Comprends les intervalles réels, les intersections/réunions et la distance $|x-a|$.',
        iconName: 'Sliders',
        isUnlocked: true,
        exercises: [
          {
            id: 'ex_2nde_intervalles_1',
            title: 'Intersection et Réunion d\'Intervalles',
            description: 'Soient $I = [-3 ; 5[$ et $J = [1 ; 8]$. Détermine l\'intersection $I \\cap J$ et la réunion $I \\cup J$.',
            difficulty: 'Moyen',
            rewardXP: 160,
            competencies: ['Représenter', 'Raisonner'],
            steps: [
              {
                id: 'step_2nde_inter_1_1',
                title: 'Calcul de l\'intersection I ∩ J',
                instruction: 'Donne l\'intervalle correspondant à $I \\cap J$ (les réels appartenant à $I$ ET à $J$).',
                expectedType: 'expression',
                expectedAnswers: ['[1;5[', '[1 ; 5[', '[1, 5[', '[1; 5['],
                hints: [
                  {
                    level: 1,
                    title: 'Définition de l\'intersection',
                    content: '$I \\cap J$ est la zone de superposition des deux intervalles sur la droite graduée.'
                  },
                  {
                    level: 2,
                    title: 'Bornes',
                    content: 'Les réels communs commencent à 1 (inclus) et se terminent avant 5 (exclu).'
                  },
                  {
                    level: 3,
                    title: 'Forme finale',
                    content: '$I \\cap J = [1 ; 5[$.'
                  }
                ]
              },
              {
                id: 'step_2nde_inter_1_2',
                title: 'Calcul de la réunion I ∪ J',
                instruction: 'Donne l\'intervalle correspondant à $I \\cup J$ (les réels appartenant à $I$ OU à $J$).',
                expectedType: 'expression',
                expectedAnswers: ['[-3;8]', '[-3 ; 8]', '[-3, 8]', '[-3; 8]'],
                hints: [
                  {
                    level: 1,
                    title: 'Définition de la réunion',
                    content: '$I \\cup J$ regroupe l\'ensemble des nombres couverts par $I$ ou par $J$.'
                  },
                  {
                    level: 2,
                    title: 'Bornes extrêmes',
                    content: 'La borne minimale est $-3$ (inclus) et la borne maximale est $8$ (inclus).'
                  },
                  {
                    level: 3,
                    title: 'Forme finale',
                    content: '$I \\cup J = [-3 ; 8]$.'
                  }
                ]
              }
            ]
          },
          {
            id: 'ex_2nde_intervalles_2',
            title: 'Valeur Absolue & Distance',
            description: 'Résous l\'inéquation $|x - 3| \\le 4$ en utilisant la notion de distance sur la droite graduée.',
            difficulty: 'Moyen',
            rewardXP: 170,
            competencies: ['Modéliser', 'Calculer'],
            steps: [
              {
                id: 'step_2nde_valabs_1',
                title: 'Interprétation géométrique',
                instruction: '$|x - 3|$ représente la distance entre $x$ et le point d\'abscisse $c$. Que vaut $c$ ?',
                expectedType: 'number',
                expectedAnswers: ['3'],
                hints: [
                  {
                    level: 1,
                    title: 'Propriété du cours',
                    content: 'Pour tous réels $x$ et $a$, $|x - a|$ est la distance entre $x$ et $a$.'
                  },
                  {
                    level: 2,
                    title: 'Identification',
                    content: 'Dans $|x - 3|$, le centre est donc $3$.'
                  },
                  {
                    level: 3,
                    title: 'Réponse',
                    content: 'Le centre $c$ vaut 3.'
                  }
                ]
              },
              {
                id: 'step_2nde_valabs_2',
                title: 'Ensemble des solutions',
                instruction: 'Donne l\'intervalle solution de $|x - 3| \\le 4$.',
                expectedType: 'expression',
                expectedAnswers: ['[-1;7]', '[-1 ; 7]', '[-1, 7]', '[-1; 7]'],
                hints: [
                  {
                    level: 1,
                    title: 'Calcul des bornes',
                    content: 'La distance à 3 est au maximum de 4 : borne inférieure $= 3 - 4 = -1$, borne supérieure $= 3 + 4 = 7$.'
                  },
                  {
                    level: 2,
                    title: 'Crochets',
                    content: 'Comme l\'inégalité est large ($\\le$), les crochets sont fermés.'
                  },
                  {
                    level: 3,
                    title: 'Intervalle',
                    content: '$S = [-1 ; 7]$.'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'quest_2nde_calcul_algebrique',
        title: 'Calcul Algébrique & Équations Produits',
        description: 'Identités remarquables, factorisations avancées et équations quotients.',
        iconName: 'Sparkles',
        isUnlocked: true,
        exercises: [
          {
            id: 'ex_2nde_factorisation_1',
            title: 'Factorisation par Identité Remarquable',
            description: 'Factorise l\'expression $E(x) = (3x - 2)^2 - 25$.',
            difficulty: 'Moyen',
            rewardXP: 170,
            competencies: ['Calculer', 'Raisonner'],
            steps: [
              {
                id: 'step_2nde_fact_1_1',
                title: 'Identification de la forme a² - b²',
                instruction: 'Applique $a^2 - b^2 = (a - b)(a + b)$ avec $a = 3x - 2$ et $b = 5$. Donne l\'expression factorisée et réduite.',
                expectedType: 'expression',
                expectedAnswers: ['(3x - 7)(3x + 3)', '(3x-7)(3x+3)', '(3x+3)(3x-7)', '3(3x-7)(x+1)'],
                hints: [
                  {
                    level: 1,
                    title: 'Reconnaître le carré',
                    content: '$25 = 5^2$, donc $E(x) = (3x - 2)^2 - 5^2$.'
                  },
                  {
                    level: 2,
                    title: 'Application',
                    content: '$E(x) = [(3x - 2) - 5][(3x - 2) + 5]$.'
                  },
                  {
                    level: 3,
                    title: 'Réduction des termes',
                    content: '$(3x - 7)(3x + 3)$.'
                  }
                ]
              },
              {
                id: 'step_2nde_fact_1_2',
                title: 'Résolution de l\'équation E(x) = 0',
                instruction: 'Quelles sont les deux solutions de $(3x - 7)(3x + 3) = 0$ ? Choisis la bonne paire.',
                expectedType: 'qcm',
                expectedAnswers: ['x = -1 et x = 7/3'],
                qcmChoices: [
                  'x = -1 et x = 7/3',
                  'x = 1 et x = -7/3',
                  'x = 7 et x = -3',
                  'x = -7/3 et x = 3'
                ],
                hints: [
                  {
                    level: 1,
                    title: 'Théorème de l\'équation produit nul',
                    content: 'Un produit de facteurs est nul si et seulement si l\'un au moins des facteurs est nul.'
                  },
                  {
                    level: 2,
                    title: 'Résolution séparée',
                    content: '$3x - 7 = 0 \\iff 3x = 7 \\iff x = \\frac{7}{3}$ et $3x + 3 = 0 \\iff 3x = -3 \\iff x = -1$.'
                  },
                  {
                    level: 3,
                    title: 'Conclusion',
                    content: 'Les solutions sont $x = -1$ et $x = \\frac{7}{3}$.'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CHAPITRE 2 : Géométrie du Plan, Vecteurs & Droites
  // =========================================================================
  {
    id: 'chap_2nde_geometrie',
    cycle: 'lycee',
    title: 'Géométrie du Plan, Vecteurs & Droites',
    subtitle: 'Calcul vectoriel, colinéarité, repérage et équations cartésiennes',
    icon: 'Compass',
    quests: [
      {
        id: 'quest_2nde_vecteurs',
        title: 'Calcul Vectoriel & Colinéarité',
        description: 'Maîtrise la relation de Chasles, les coordonnées de vecteurs et le critère de colinéarité.',
        iconName: 'Navigation',
        isUnlocked: true,
        exercises: [
          {
            id: 'ex_2nde_vect_1',
            title: 'Coordonnées d\'un Vecteur et Norme',
            description: 'Dans un repère orthonormé $(O; \\vec{i}, \\vec{j})$, on donne $A(-2 ; 3)$ et $B(4 ; -1)$.',
            difficulty: 'Facile',
            rewardXP: 150,
            competencies: ['Calculer', 'Représenter'],
            steps: [
              {
                id: 'step_2nde_vect_1_1',
                title: 'Calcul des coordonnées de vecteur AB',
                instruction: 'Donne les coordonnées du vecteur $\\vec{AB}$ sous la forme $(x;y)$ ou $(x, y)$.',
                expectedType: 'expression',
                expectedAnswers: ['(6;-4)', '(6 ; -4)', '(6, -4)', '(6,-4)'],
                hints: [
                  {
                    level: 1,
                    title: 'Formule des coordonnées',
                    content: '$\\vec{AB}(x_B - x_A ; y_B - y_A)$.'
                  },
                  {
                    level: 2,
                    title: 'Application numérique',
                    content: '$x_B - x_A = 4 - (-2) = 6$ et $y_B - y_A = -1 - 3 = -4$.'
                  },
                  {
                    level: 3,
                    title: 'Résultat',
                    content: '$\\vec{AB}(6 ; -4)$.'
                  }
                ],
                errorFeedback: {
                  '(-6;4)': 'Attention à l\'ordre : c\'est toujours arrivée moins départ ($B - A$).',
                  '(2;2)': 'Attention à la soustraction des nombres négatifs : $4 - (-2) = 4 + 2 = 6$.'
                }
              },
              {
                id: 'step_2nde_vect_1_2',
                title: 'Calcul de la distance AB',
                instruction: 'Calcule $AB^2 = (x_B - x_A)^2 + (y_B - y_A)^2$. Que vaut $AB^2$ ?',
                expectedType: 'number',
                expectedAnswers: ['52'],
                hints: [
                  {
                    level: 1,
                    title: 'Formule de la distance',
                    content: '$AB^2 = 6^2 + (-4)^2$.'
                  },
                  {
                    level: 2,
                    title: 'Calcul des carrés',
                    content: '$6^2 = 36$ et $(-4)^2 = 16$.'
                  },
                  {
                    level: 3,
                    title: 'Somme',
                    content: '$36 + 16 = 52$.'
                  }
                ]
              }
            ]
          },
          {
            id: 'ex_2nde_vect_colinearite',
            title: 'Test de Colinéarité de Deux Vecteurs',
            description: 'On donne $\\vec{u}(4 ; -6)$ et $\\vec{v}(-6 ; 9)$. Démontre si ces vecteurs sont colinéaires.',
            difficulty: 'Moyen',
            rewardXP: 170,
            competencies: ['Raisonner', 'Calculer'],
            steps: [
              {
                id: 'step_2nde_colin_1',
                title: 'Calcul du déterminant xy\' - x\'y',
                instruction: 'Calcule le déterminant $\\det(\\vec{u}, \\vec{v}) = x_{\\vec{u}} \\times y_{\\vec{v}} - y_{\\vec{u}} \\times x_{\\vec{v}}$.',
                expectedType: 'number',
                expectedAnswers: ['0'],
                hints: [
                  {
                    level: 1,
                    title: 'Formule du déterminant',
                    content: '$\\det(\\vec{u}, \\vec{v}) = 4 \\times 9 - (-6) \\times (-6)$.'
                  },
                  {
                    level: 2,
                    title: 'Calcul des produits',
                    content: '$4 \\times 9 = 36$ et $(-6) \\times (-6) = 36$.'
                  },
                  {
                    level: 3,
                    title: 'Différence',
                    content: '$36 - 36 = 0$.'
                  }
                ]
              },
              {
                id: 'step_2nde_colin_2',
                title: 'Conclusion géométrique',
                instruction: 'Que peut-on en déduire pour les vecteurs $\\vec{u}$ et $\\vec{v}$ ?',
                expectedType: 'qcm',
                expectedAnswers: ['Les vecteurs u et v sont colinéaires'],
                qcmChoices: [
                  'Les vecteurs u et v sont colinéaires',
                  'Les vecteurs u et v sont orthogonaux',
                  'Les vecteurs u et v ont la même norme',
                  'Les vecteurs u et v ne sont pas colinéaires'
                ],
                hints: [
                  {
                    level: 1,
                    title: 'Propriété fondamentale',
                    content: 'Deux vecteurs sont colinéaires si et seulement si leur déterminant est égal à 0.'
                  },
                  {
                    level: 2,
                    title: 'Conclusion',
                    content: 'Comme $\\det(\\vec{u}, \\vec{v}) = 0$, les vecteurs $\\vec{u}$ et $\\vec{v}$ sont colinéaires (avec $\\vec{v} = -1,5\\vec{u}$).'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'quest_2nde_droites',
        title: 'Équations de Droites & Systèmes',
        description: 'Équations réduites y=mx+p, équations cartésiennes ax+by+c=0 et systèmes linéaires.',
        iconName: 'GitCommit',
        isUnlocked: true,
        exercises: [
          {
            id: 'ex_2nde_droite_reduite',
            title: 'Déterminer l\'équation réduite d\'une droite',
            description: 'Soient les points $A(2 ; 5)$ et $B(6 ; 13)$. Détermine l\'équation réduite de la droite $(AB)$.',
            difficulty: 'Moyen',
            rewardXP: 180,
            competencies: ['Calculer', 'Modéliser'],
            steps: [
              {
                id: 'step_2nde_dr_1',
                title: 'Calcul du coefficient directeur m',
                instruction: 'Calcule $m = \\frac{y_B - y_A}{x_B - x_A}$.',
                expectedType: 'number',
                expectedAnswers: ['2'],
                hints: [
                  {
                    level: 1,
                    title: 'Application numérique',
                    content: '$m = \\frac{13 - 5}{6 - 2} = \\frac{8}{4}$.'
                  },
                  {
                    level: 2,
                    title: 'Simplification',
                    content: '$\\frac{8}{4} = 2$.'
                  }
                ]
              },
              {
                id: 'step_2nde_dr_2',
                title: 'Calcul de l\'ordonnée à l\'origine p',
                instruction: 'Sachant que $y = 2x + p$ et que $A(2 ; 5) \\in (AB)$, calcule $p$.',
                expectedType: 'number',
                expectedAnswers: ['1'],
                hints: [
                  {
                    level: 1,
                    title: 'Substitution',
                    content: '$y_A = 2 \\times x_A + p \\iff 5 = 2 \\times 2 + p$.'
                  },
                  {
                    level: 2,
                    title: 'Résolution',
                    content: '$5 = 4 + p \\iff p = 5 - 4 = 1$.'
                  }
                ]
              },
              {
                id: 'step_2nde_dr_3',
                title: 'Équation réduite complète',
                instruction: 'Donne l\'équation réduite de $(AB)$ sous la forme $y = ...$',
                expectedType: 'expression',
                expectedAnswers: ['y = 2x + 1', 'y=2x+1', '2x + 1', '2x+1'],
                hints: [
                  {
                    level: 1,
                    title: 'Synthèse',
                    content: 'Remplace $m=2$ et $p=1$ dans $y = mx + p$.'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CHAPITRE 3 : Fonctions, Variations & Signes
  // =========================================================================
  {
    id: 'chap_2nde_fonctions',
    cycle: 'lycee',
    title: 'Fonctions, Variations & Signes',
    subtitle: 'Fonctions de référence, tableaux de variations, extremums et tableaux de signes',
    icon: 'TrendingUp',
    quests: [
      {
        id: 'quest_2nde_fonctions_ref',
        title: 'Fonctions de Référence (Carré, Inverse, Racine)',
        description: 'Étudie le sens de variation et les propriétés de $x^2$, $1/x$, $\\sqrt{x}$ et $x^3$.',
        iconName: 'LineChart',
        isUnlocked: true,
        exercises: [
          {
            id: 'ex_2nde_fct_carre',
            title: 'Encadrement avec la fonction Carré',
            description: 'Soit $x \\in [-3 ; 4]$. Quel est l\'encadrement exact de $x^2$ ?',
            difficulty: 'Moyen',
            rewardXP: 170,
            competencies: ['Raisonner', 'Représenter'],
            steps: [
              {
                id: 'step_2nde_carre_1',
                title: 'Minimum de la fonction carré',
                instruction: 'Comme $0 \\in [-3 ; 4]$ et que $x^2 \\ge 0$ pour tout réel, quel est le minimum de $x^2$ ?',
                expectedType: 'number',
                expectedAnswers: ['0'],
                hints: [
                  {
                    level: 1,
                    title: 'Propriété de la parabole',
                    content: 'La fonction carré admet un minimum absolu en $x = 0$, et $0^2 = 0$.'
                  }
                ]
              },
              {
                id: 'step_2nde_carre_2',
                title: 'Intervalle image de x²',
                instruction: 'Donne l\'intervalle exact auquel appartient $x^2$ lorsque $x \\in [-3 ; 4]$.',
                expectedType: 'expression',
                expectedAnswers: ['[0;16]', '[0 ; 16]', '[0, 16]', '[0; 16]'],
                hints: [
                  {
                    level: 1,
                    title: 'Calcul des bornes',
                    content: 'Le minimum est $0$. Les valeurs aux extrémités sont $(-3)^2 = 9$ et $4^2 = 16$. Le maximum est donc $\\max(9, 16) = 16$.'
                  },
                  {
                    level: 2,
                    title: 'Intervalle',
                    content: 'L\'encadrement est $0 \\le x^2 \\le 16$, donc l\'intervalle est $[0 ; 16]$.'
                  }
                ],
                errorFeedback: {
                  '[9;16]': 'Attention ! 0 appartient à l\'intervalle $[-3 ; 4]$, donc la valeur minimale de $x^2$ est 0 et non 9 !'
                }
              }
            ]
          }
        ]
      },
      {
        id: 'quest_2nde_signes_inequations',
        title: 'Tableaux de Signes & Inéquations Produits/Quotients',
        description: 'Dresse des tableaux de signes pour résoudre des inéquations de type $(ax+b)(cx+d) \\ge 0$.',
        iconName: 'CheckSquare',
        isUnlocked: true,
        exercises: [
          {
            id: 'ex_2nde_tableau_signes',
            title: 'Inéquation Produit (2x - 6)(4 - x) ≥ 0',
            description: 'Résous dans $\\mathbb{R}$ l\'inéquation $(2x - 6)(4 - x) \\ge 0$.',
            difficulty: 'Moyen',
            rewardXP: 190,
            competencies: ['Raisonner', 'Calculer'],
            steps: [
              {
                id: 'step_2nde_ts_1',
                title: 'Racines des facteurs',
                instruction: 'Quelles sont les valeurs qui annulent les facteurs $2x - 6$ et $4 - x$ ? (Donne les deux valeurs séparées par une virgule ou un point-virgule).',
                expectedType: 'qcm',
                expectedAnswers: ['x = 3 et x = 4'],
                qcmChoices: [
                  'x = 3 et x = 4',
                  'x = -3 et x = 4',
                  'x = 6 et x = -4',
                  'x = 3 et x = -4'
                ],
                hints: [
                  {
                    level: 1,
                    title: 'Annulation des facteurs',
                    content: '$2x - 6 = 0 \\iff 2x = 6 \\iff x = 3$ et $4 - x = 0 \\iff x = 4$.'
                  }
                ]
              },
              {
                id: 'step_2nde_ts_2',
                title: 'Ensemble des solutions de l\'inéquation',
                instruction: 'Donne l\'intervalle solution de $(2x - 6)(4 - x) \\ge 0$.',
                expectedType: 'expression',
                expectedAnswers: ['[3;4]', '[3 ; 4]', '[3, 4]', '[3; 4]'],
                hints: [
                  {
                    level: 1,
                    title: 'Étude de signe par zone',
                    content: 'Pour $x < 3$ : $(-)(+) = (-)$. Pour $3 \\le x \\le 4$ : $(+)(+) = (+)$. Pour $x > 4$ : $(+)(-) = (-)$.'
                  },
                  {
                    level: 2,
                    title: 'Conclusion',
                    content: 'Le produit est positif ou nul sur l\'intervalle $[3 ; 4]$.'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CHAPITRE 4 : Statistiques Descriptives & Probabilités
  // =========================================================================
  {
    id: 'chap_2nde_proba_stats',
    cycle: 'lycee',
    title: 'Statistiques & Probabilités',
    subtitle: 'Caractéristiques de position/dispersion, information chiffrée et arbres pondérés',
    icon: 'PieChart',
    quests: [
      {
        id: 'quest_2nde_stats',
        title: 'Statistiques & Information Chiffrée',
        description: 'Médiane, quartiles Q1/Q3, taux d\'évolution et coefficient multiplicateur.',
        iconName: 'BarChart2',
        isUnlocked: true,
        exercises: [
          {
            id: 'ex_2nde_evolution_taux',
            title: 'Évolutions Successives et Coefficient Multiplicateur',
            description: 'Le prix d\'un article augmente de 20%, puis baisse de 20%.',
            difficulty: 'Facile',
            rewardXP: 150,
            competencies: ['Modéliser', 'Calculer'],
            steps: [
              {
                id: 'step_2nde_evol_1',
                title: 'Calcul du coefficient multiplicateur global',
                instruction: 'Calcule le coefficient multiplicateur global $CM = CM_1 \\times CM_2$.',
                expectedType: 'number',
                expectedAnswers: ['0.96', '0,96'],
                hints: [
                  {
                    level: 1,
                    title: 'Formule du coefficient',
                    content: 'Une hausse de 20% correspond à $CM_1 = 1 + 0,20 = 1,20$. Une baisse de 20% correspond à $CM_2 = 1 - 0,20 = 0,80$.'
                  },
                  {
                    level: 2,
                    title: 'Produit des coefficients',
                    content: '$CM = 1,20 \\times 0,80 = 0,96$.'
                  }
                ]
              },
              {
                id: 'step_2nde_evol_2',
                title: 'Taux d\'évolution global en pourcentage',
                instruction: 'Quel est le taux de variation global ? (ex : -4% correspond à une baisse de 4%). Donne la valeur numérique du pourcentage (ex: -4).',
                expectedType: 'number',
                expectedAnswers: ['-4', '-4%'],
                hints: [
                  {
                    level: 1,
                    title: 'Formule du taux global',
                    content: '$T = CM - 1 = 0,96 - 1 = -0,04 = -4\\%$.'
                  },
                  {
                    level: 2,
                    title: 'Piège classique',
                    content: 'Augmenter de 20% puis baisser de 20% ne revient PAS à revenir au prix de départ, mais à une baisse globale de 4% !'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'quest_2nde_probabilites',
        title: 'Probabilités & Arbres Pondérés',
        description: 'Événements, formules d\'union P(A ∪ B) et règles de calculs sur les arbres.',
        iconName: 'HelpCircle',
        isUnlocked: true,
        exercises: [
          {
            id: 'ex_2nde_proba_union',
            title: 'Formule de l\'Union de deux événements',
            description: 'On donne $P(A) = 0,6$, $P(B) = 0,5$ et $P(A \\cap B) = 0,3$.',
            difficulty: 'Facile',
            rewardXP: 140,
            competencies: ['Calculer', 'Raisonner'],
            steps: [
              {
                id: 'step_2nde_pu_1',
                title: 'Calcul de P(A ∪ B)',
                instruction: 'Applique la formule $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$ pour trouver $P(A \\cup B)$.',
                expectedType: 'number',
                expectedAnswers: ['0.8', '0,8'],
                hints: [
                  {
                    level: 1,
                    title: 'Application numérique',
                    content: '$P(A \\cup B) = 0,6 + 0,5 - 0,3$.'
                  },
                  {
                    level: 2,
                    title: 'Calcul',
                    content: '$1,1 - 0,3 = 0,8$.'
                  }
                ]
              },
              {
                id: 'step_2nde_pu_2',
                title: 'Calcul de la probabilité de l\'événement contraire',
                instruction: 'Calcule $P(\\overline{A \\cup B})$ (probabilité de l\'événement contraire).',
                expectedType: 'number',
                expectedAnswers: ['0.2', '0,2'],
                hints: [
                  {
                    level: 1,
                    title: 'Formule du contraire',
                    content: '$P(\\overline{E}) = 1 - P(E)$.'
                  },
                  {
                    level: 2,
                    title: 'Application',
                    content: '$1 - 0,8 = 0,2$.'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CHAPITRE 5 : Algorithmique, Logique & Automatismes
  // =========================================================================
  {
    id: 'chap_2nde_algo_auto',
    cycle: 'lycee',
    title: 'Algorithmique, Logique & Automatismes',
    subtitle: 'Python, conditions, boucles, raisonnement déductif et calcul mental',
    icon: 'Cpu',
    quests: [
      {
        id: 'quest_2nde_algo_python',
        title: 'Algorithmique & Fonctions Python',
        description: 'Comprends l\'exécution pas à pas de boucles et fonctions Python pour les maths.',
        iconName: 'Terminal',
        isUnlocked: true,
        exercises: [
          {
            id: 'ex_2nde_algo_boucle',
            title: 'Comprendre une boucle For en Python',
            description: 'On considère l\'algorithme suivant :\n\n```python\ns = 0\nfor k in range(1, 5):\n    s = s + 2 * k\n```\nQue vaut la variable `s` à la fin de l\'exécution ?',
            difficulty: 'Moyen',
            rewardXP: 180,
            competencies: ['Modéliser', 'Calculer'],
            steps: [
              {
                id: 'step_2nde_algo_1',
                title: 'Valeurs prises par k',
                instruction: 'Quelles sont les valeurs prises successivement par $k$ dans `range(1, 5)` ?',
                expectedType: 'qcm',
                expectedAnswers: ['1, 2, 3, 4'],
                qcmChoices: [
                  '1, 2, 3, 4',
                  '1, 2, 3, 4, 5',
                  '0, 1, 2, 3, 4',
                  '2, 3, 4, 5'
                ],
                hints: [
                  {
                    level: 1,
                    title: 'Spécificité de range(a, b)',
                    content: 'En Python, `range(a, b)` commence à $a$ et s\'arrête à $b-1$ (la borne supérieure $b$ est exclue).'
                  }
                ]
              },
              {
                id: 'step_2nde_algo_2',
                title: 'Calcul de la valeur finale de s',
                instruction: 'Calcule la somme $s = 2(1) + 2(2) + 2(3) + 2(4)$. Que vaut $s$ ?',
                expectedType: 'number',
                expectedAnswers: ['20'],
                hints: [
                  {
                    level: 1,
                    title: 'Calcul pas à pas',
                    content: '$s = 2 + 4 + 6 + 8 = 20$.'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'quest_2nde_boss_automatismes',
        title: 'Défi des Automatismes Flash (Boss Seconde)',
        description: 'Évalue ta rapidité et ta précision sur les automatismes clés de l\'année de Seconde.',
        iconName: 'Zap',
        isUnlocked: true,
        exercises: [
          {
            id: 'ex_2nde_boss_auto_1',
            title: 'Automatismes Algébriques & Fractions',
            description: 'Simplifie l\'expression $\\frac{\\sqrt{72}}{3}$.',
            difficulty: 'Boss',
            rewardXP: 250,
            competencies: ['Calculer', 'Raisonner'],
            steps: [
              {
                id: 'step_2nde_boss_1',
                title: 'Décomposition de racine de 72',
                instruction: 'Écris $\\sqrt{72}$ sous la forme $a\\sqrt{2}$ où $a$ est un entier.',
                expectedType: 'expression',
                expectedAnswers: ['6\\sqrt{2}', '6*sqrt(2)', '6sqrt(2)', '6 \\sqrt{2}'],
                hints: [
                  {
                    level: 1,
                    title: 'Carré parfait',
                    content: '$72 = 36 \\times 2$, donc $\\sqrt{72} = \\sqrt{36} \\times \\sqrt{2} = 6\\sqrt{2}$.'
                  }
                ]
              },
              {
                id: 'step_2nde_boss_2',
                title: 'Simplification de la fraction',
                instruction: 'Divise $6\\sqrt{2}$ par 3 pour obtenir l\'écriture simplifiée.',
                expectedType: 'expression',
                expectedAnswers: ['2\\sqrt{2}', '2*sqrt(2)', '2sqrt(2)', '2 \\sqrt{2}'],
                hints: [
                  {
                    level: 1,
                    title: 'Division des coefficients',
                    content: '$\\frac{6\\sqrt{2}}{3} = \\frac{6}{3}\\sqrt{2} = 2\\sqrt{2}$.'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
