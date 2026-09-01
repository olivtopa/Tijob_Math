import { Chapter, CycleId } from '../../types/mathquest';
import { chapters3eme } from './3eme_brevet';
import { chapters2nde } from './2nde_lycee';

export const allChapters: Record<CycleId, Chapter[]> = {
  '3eme': chapters3eme,
  'lycee': chapters2nde,
  'terminale': [
    {
      id: 'chap_analyse_term',
      cycle: 'terminale',
      title: 'Analyse Avancée, Dérivation & Limites',
      subtitle: 'Étude de fonctions exponentielles, logarithmes et récurrences',
      icon: 'Activity',
      quests: [
        {
          id: 'quest_exp_term',
          title: 'La Fonction Exponentielle & Tangente',
          description: 'Calculs de dérivées et équations de tangentes pour le Bac.',
          iconName: 'Cpu',
          isUnlocked: true,
          exercises: [
            {
              id: 'ex_exp_1',
              title: 'Dérivée d\'une fonction produit avec exp',
              description: 'Soit $f(x) = (3x + 1)e^x$. Détermine sa dérivée $f\'(x)$.',
              difficulty: 'Difficile',
              rewardXP: 250,
              competencies: ['Raisonner', 'Calculer'],
              steps: [
                {
                  id: 'step_exp_1',
                  title: 'Dérivation du produit uv',
                  instruction: 'Utilise la formule $(uv)\' = u\'v + uv\'$. Donne l\'expression factorisée par $e^x$.',
                  expectedType: 'expression',
                  expectedAnswers: ['(3x + 4)e^x', '(3x+4)e^x', 'e^x(3x+4)'],
                  hints: [
                    {
                      level: 1,
                      title: 'Identification',
                      content: 'Pose $u(x) = 3x+1 \\Rightarrow u\'(x) = 3$ et $v(x) = e^x \\Rightarrow v\'(x) = e^x$.'
                    },
                    {
                      level: 2,
                      title: 'Factorisation',
                      content: '$f\'(x) = 3e^x + (3x+1)e^x = e^x(3 + 3x + 1) = (3x+4)e^x$.'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
