import { generateDynamicQuestion } from './dynamicQuestions';
import { generateMentalRituelQuestion, generateFlashcardsRituelQuestion, generateGeometryRituelQuestion } from './rituelQuestions';

console.log('=== LANCEMENT DU TEST DE FIABILITÉ DES QUESTIONS (10 000 itérations) ===');

let totalErrors = 0;
const realms = ['Algèbre', 'Fonctions', 'Géométrie', 'Statistiques'];

function normalize(str: string) {
  return String(str)
    .replace(/\$/g, '')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\,/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

// 1. Test des questions dynamiques (Aventure / Combat)
for (const realm of realms) {
  for (let questIndex = 0; questIndex < 4; questIndex++) {
    for (let iter = 0; iter < 500; iter++) {
      const q = generateDynamicQuestion(realm, questIndex);
      
      // Test 1: Nombre d'options exactement égal à 4
      if (!q.options || q.options.length !== 4) {
        console.error(`[ERREUR OPTIONS] Realm: ${realm}, Quest: ${questIndex} -> Options count: ${q.options?.length}`);
        totalErrors++;
      }

      // Test 2: Présence de la bonne réponse
      const normalizedAnswer = normalize(q.answer);
      const match = q.options.some(opt => normalize(opt) === normalizedAnswer);
      if (!match) {
        console.error(`[ERREUR BONNE RÉPONSE MANQUANTE] Realm: ${realm}, Quest: ${questIndex}`);
        console.error(`  Answer: "${q.answer}"`);
        console.error(`  Options: ${JSON.stringify(q.options)}`);
        totalErrors++;
      }

      // Test 3: Aucune option vide ou undefined / NaN
      for (const opt of q.options) {
        if (!opt || opt.includes('undefined') || opt.includes('NaN')) {
          console.error(`[ERREUR VALEUR INVALIDE] Realm: ${realm}, Quest: ${questIndex} -> Option: "${opt}"`);
          totalErrors++;
        }
      }
    }
  }
}

// 2. Test des questions du Rituel 45s
const rituelGenerators = [
  { name: 'Mental', fn: generateMentalRituelQuestion },
  { name: 'Flashcards', fn: generateFlashcardsRituelQuestion },
  { name: 'Geometry', fn: generateGeometryRituelQuestion }
];

for (const { name, fn } of rituelGenerators) {
  for (let iter = 0; iter < 1000; iter++) {
    const q = fn();
    if (!q.options || q.options.length !== 4) {
      console.error(`[ERREUR RITUEL OPTIONS] Category: ${name} -> Options count: ${q.options?.length}`);
      totalErrors++;
    }
    const match = q.options.some(opt => normalize(opt) === normalize(q.answer));
    if (!match) {
      console.error(`[ERREUR RITUEL BONNE RÉPONSE MANQUANTE] Category: ${name}`);
      console.error(`  Answer: "${q.answer}"`);
      console.error(`  Options: ${JSON.stringify(q.options)}`);
      totalErrors++;
    }
  }
}

if (totalErrors === 0) {
  console.log('✅ TOUTES LES 10 000 QUESTIONS SONT 100% CONFORMES ET VALIDES !');
} else {
  console.error(`❌ ${totalErrors} ERREURS DÉTECTÉES !`);
}
