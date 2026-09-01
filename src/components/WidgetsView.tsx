import React, { useState } from 'react';
import { Wrench, TrendingUp, Triangle, Cpu, ArrowLeft, GitCommit, Percent, Activity, Box, BarChart2 } from 'lucide-react';
import { CycleId } from '../types/mathquest';

interface WidgetsViewProps {
  cycle?: CycleId;
}

export const WidgetsView: React.FC<WidgetsViewProps> = ({ cycle = '3eme' }) => {
  const [activeWidget, setActiveWidget] = useState<string | null>(null);

  // -------------------------------------------------------------
  // ÉTATS DES WIDGETS 3ÈME
  // -------------------------------------------------------------
  const [sliderA, setSliderA] = useState<number>(2);
  const [sliderB, setSliderB] = useState<number>(1);
  const [testPointX, setTestPointX] = useState<number>(3);

  const [trigoAngle, setTrigoAngle] = useState<number>(35);
  const [hypothenuseLength, setHypothenuseLength] = useState<number>(10);

  const [scratchInitialX, setScratchInitialX] = useState<number>(5);
  const [scratchLoopCount, setScratchLoopCount] = useState<number>(3);
  const [scratchStepAdd, setScratchStepAdd] = useState<number>(4);
  const [scratchThreshold] = useState<number>(15);

  const [pythSideA, setPythSideA] = useState<number>(3);
  const [pythSideB, setPythSideB] = useState<number>(4);

  // -------------------------------------------------------------
  // ÉTATS DES WIDGETS SECONDE
  // -------------------------------------------------------------
  const [paraboleA, setParaboleA] = useState<number>(1);
  const [paraboleAlpha, setParaboleAlpha] = useState<number>(2);
  const [paraboleBeta, setParaboleBeta] = useState<number>(-3);

  const [vecAx, setVecAx] = useState<number>(-2);
  const [vecAy, setVecAy] = useState<number>(3);
  const [vecBx, setVecBx] = useState<number>(4);
  const [vecBy, setVecBy] = useState<number>(-1);

  const [pyStart, setPyStart] = useState<number>(1);
  const [pyEnd, setPyEnd] = useState<number>(5);
  const [pyCoeff, setPyCoeff] = useState<number>(2);

  const [evolTaux1, setEvolTaux1] = useState<number>(20);
  const [evolTaux2, setEvolTaux2] = useState<number>(-20);
  const [initialPrice, setInitialPrice] = useState<number>(100);

  // -------------------------------------------------------------
  // ÉTATS DES WIDGETS TERMINALE
  // -------------------------------------------------------------
  const [tangentA, setTangentA] = useState<number>(1);
  const [vecU, setVecU] = useState<{ x: number; y: number; z: number }>({ x: 2, y: -1, z: 3 });
  const [vecV, setVecV] = useState<{ x: number; y: number; z: number }>({ x: 4, y: 5, z: -1 });
  const [binomN, setBinomN] = useState<number>(20);
  const [binomP, setBinomP] = useState<number>(0.3);

  // Calculs 3ème
  const computedY = sliderA * testPointX + sliderB;
  const radAngle = (trigoAngle * Math.PI) / 180;
  const oppLength = hypothenuseLength * Math.sin(radAngle);
  const adjLength = hypothenuseLength * Math.cos(radAngle);
  const pythHyp = Math.sqrt(pythSideA * pythSideA + pythSideB * pythSideB);

  // Calculs Seconde
  const vecVx = vecBx - vecAx;
  const vecVy = vecBy - vecAy;
  const vecNorme = Math.sqrt(vecVx * vecVx + vecVy * vecVy);
  const vecMilieuX = (vecAx + vecBx) / 2;
  const vecMilieuY = (vecAy + vecBy) / 2;
  const droitePente = vecBx !== vecAx ? (vecBy - vecAy) / (vecBx - vecAx) : null;
  const droiteP = droitePente !== null ? vecAy - droitePente * vecAx : null;

  const cm1 = 1 + evolTaux1 / 100;
  const cm2 = 1 + evolTaux2 / 100;
  const cmGlobal = cm1 * cm2;
  const tauxGlobalPct = (cmGlobal - 1) * 100;
  const finalPrice = initialPrice * cmGlobal;

  // Calculs Terminale
  const expVal = Math.exp(tangentA);
  const dotProduct3D = vecU.x * vecV.x + vecU.y * vecV.y + vecU.z * vecV.z;
  const binomEsperance = binomN * binomP;
  const binomVariance = binomN * binomP * (1 - binomP);

  // Titres & descriptions selon le cycle
  const cycleInfo = {
    '3eme': {
      label: 'Niveau 3ème / Brevet',
      desc: 'Manipule en temps réel les curseurs, observe la géométrie se déformer, exécute des algorithmes Scratch et visualise les théorèmes clés du Brevet.'
    },
    'lycee': {
      label: 'Niveau Seconde / Lycée',
      desc: 'Simulateurs de fonctions carré et polynômes, laboratoire vectoriel analytique, exécution pas-à-pas de scripts Python et calculateurs de pourcentages d\'évolution.'
    },
    'terminale': {
      label: 'Niveau Terminale Spécialité',
      desc: 'Visualisation dynamique des tangentes et dérivées d\'exponentielles, produit scalaire dans l\'espace 3D et estimateur de loi binomiale.'
    }
  }[cycle] || {
    label: 'Niveau 3ème / Brevet',
    desc: 'Laboratoires mathématiques interactifs et visuels.'
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Banner */}
      <div className="mq-glass p-6 sm:p-8 relative overflow-hidden bg-gradient-to-r from-teal-950/60 via-slate-900 to-slate-950 border border-teal-500/30">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs sm:text-sm font-bold">
            <Wrench className="w-4 h-4 text-teal-400" />
            <span>{cycleInfo.label} — Laboratoires Interactifs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Laboratoire d'Expérimentation Visuelle
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {cycleInfo.desc}
          </p>
        </div>
      </div>

      {/* Modal / Vue active d'un widget */}
      {activeWidget && (
        <div className="mq-glass p-6 sm:p-8 space-y-6 border-slate-700 bg-slate-950/95 rounded-2xl">
          <button
            onClick={() => setActiveWidget(null)}
            className="mq-btn-secondary text-sm py-2 px-4 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Retour aux simulateurs
          </button>

          {/* ---------------- WIDGETS SECONDE ---------------- */}
          {cycle === 'lycee' && activeWidget === 'parabole' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white">Parabole & Forme Canonique : f(x) = a(x - α)² + β</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-300 block">
                    {`Coefficient a = ${paraboleA} (${paraboleA > 0 ? 'Orientée vers le haut ∪' : 'Orientée vers le bas ∩'})`}
                  </label>
                  <input
                    type="range"
                    min="-3"
                    max="3"
                    step="0.5"
                    value={paraboleA}
                    onChange={(e) => setParaboleA(parseFloat(e.target.value) || 0.5)}
                    className="w-full accent-amber-500"
                  />
                  <label className="text-sm font-bold text-slate-300 block">
                    {`Abscisse du sommet α = ${paraboleAlpha}`}
                  </label>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    value={paraboleAlpha}
                    onChange={(e) => setParaboleAlpha(parseFloat(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                  <label className="text-sm font-bold text-slate-300 block">
                    {`Ordonnée du sommet β = ${paraboleBeta}`}
                  </label>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    value={paraboleBeta}
                    onChange={(e) => setParaboleBeta(parseFloat(e.target.value))}
                    className="w-full accent-teal-500"
                  />
                </div>
                <div className="md:col-span-2 bg-slate-900/80 p-6 rounded-xl border border-slate-800 space-y-4">
                  <div className="text-lg font-bold text-amber-400">
                    {`Équation : f(x) = ${paraboleA}(x - (${paraboleAlpha}))² + (${paraboleBeta})`}
                  </div>
                  <div className="text-slate-300 text-sm space-y-2">
                    <p>{`• Sommet S : (${paraboleAlpha} ; ${paraboleBeta})`}</p>
                    <p>{`• Extremum : ${paraboleA > 0 ? `Minimum = ${paraboleBeta}` : `Maximum = ${paraboleBeta}`} atteint en x = ${paraboleAlpha}.`}</p>
                    <p>{`• Axe de symétrie : Droite d'équation x = ${paraboleAlpha}.`}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {cycle === 'lycee' && activeWidget === 'vector_lab' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white">Laboratoire Vectoriel & Droite (AB)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-amber-400">Coordonnées des points A et B</h4>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-400">Point A(x, y) :</label>
                      <div className="flex gap-2 mt-1">
                        <input type="number" value={vecAx} onChange={e => setVecAx(Number(e.target.value))} className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white" />
                        <input type="number" value={vecAy} onChange={e => setVecAy(Number(e.target.value))} className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-400">Point B(x, y) :</label>
                      <div className="flex gap-2 mt-1">
                        <input type="number" value={vecBx} onChange={e => setVecBx(Number(e.target.value))} className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white" />
                        <input type="number" value={vecBy} onChange={e => setVecBy(Number(e.target.value))} className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-3 text-sm text-slate-300">
                  <h4 className="font-bold text-emerald-400">Résultats en direct</h4>
                  <p>{`• Vecteur AB : (${vecVx} ; ${vecVy})`}</p>
                  <p>{`• Distance AB (Norme) : √(${vecVx}² + ${vecVy}²) ≈ ${vecNorme.toFixed(2)}`}</p>
                  <p>{`• Milieu I : (${vecMilieuX} ; ${vecMilieuY})`}</p>
                  <p>{`• Équation réduite (AB) : ${droitePente !== null ? `y = ${droitePente.toFixed(2)}x ${droiteP! >= 0 ? `+ ${droiteP!.toFixed(2)}` : `- ${Math.abs(droiteP!).toFixed(2)}`}` : `Droite verticale x = ${vecAx}`}`}</p>
                </div>
              </div>
            </div>
          )}

          {cycle === 'lycee' && activeWidget === 'python_sim' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white">Simulateur d'Algorithmes Python : Boucles & Sommes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-blue-400">Paramètres du script</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <label className="text-slate-300">{`Borne de début : start = ${pyStart}`}</label>
                      <input type="range" min="0" max="3" value={pyStart} onChange={e => setPyStart(Number(e.target.value))} className="w-full accent-blue-500" />
                    </div>
                    <div>
                      <label className="text-slate-300">{`Borne de fin : end = ${pyEnd} (exclue en Python)`}</label>
                      <input type="range" min="3" max="8" value={pyEnd} onChange={e => setPyEnd(Number(e.target.value))} className="w-full accent-blue-500" />
                    </div>
                    <div>
                      <label className="text-slate-300">{`Coefficient : step = ${pyCoeff}`}</label>
                      <input type="range" min="1" max="5" value={pyCoeff} onChange={e => setPyCoeff(Number(e.target.value))} className="w-full accent-blue-500" />
                    </div>
                  </div>
                </div>
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 font-mono text-xs text-slate-300">
                  <div className="text-emerald-400 font-bold"># Code exécuté :</div>
                  <pre className="text-slate-200">
{`s = 0
for k in range(${pyStart}, ${pyEnd}):
    s = s + ${pyCoeff} * k
print(s)`}
                  </pre>
                  <div className="pt-2 border-t border-slate-800 text-amber-300 font-bold">
                    {`Valeur finale de s : ${(() => {
                      let s = 0;
                      for (let k = pyStart; k < pyEnd; k++) s += pyCoeff * k;
                      return s;
                    })()}`}
                  </div>
                </div>
              </div>
            </div>
          )}

          {cycle === 'lycee' && activeWidget === 'evolutions' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white">Calculateur d'Évolutions Successives & Taux Global</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-amber-400">Évolutions successives</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <label className="text-slate-300">{`Prix initial : ${initialPrice} €`}</label>
                      <input type="number" value={initialPrice} onChange={e => setInitialPrice(Number(e.target.value) || 100)} className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white mt-1" />
                    </div>
                    <div>
                      <label className="text-slate-300">{`Évolution 1 : ${evolTaux1 > 0 ? `+${evolTaux1}%` : `${evolTaux1}%`}`}</label>
                      <input type="range" min="-50" max="50" step="5" value={evolTaux1} onChange={e => setEvolTaux1(Number(e.target.value))} className="w-full accent-amber-500" />
                    </div>
                    <div>
                      <label className="text-slate-300">{`Évolution 2 : ${evolTaux2 > 0 ? `+${evolTaux2}%` : `${evolTaux2}%`}`}</label>
                      <input type="range" min="-50" max="50" step="5" value={evolTaux2} onChange={e => setEvolTaux2(Number(e.target.value))} className="w-full accent-amber-500" />
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-3 text-sm text-slate-300">
                  <h4 className="font-bold text-emerald-400">Bilan des Coefficients</h4>
                  <p>{`• CM₁ = 1 + ${evolTaux1}/100 = ${cm1.toFixed(2)}`}</p>
                  <p>{`• CM₂ = 1 + ${evolTaux2}/100 = ${cm2.toFixed(2)}`}</p>
                  <p><strong>{`• CM_global = CM₁ × CM₂ = ${cmGlobal.toFixed(4)}`}</strong></p>
                  <p className="text-base font-extrabold text-amber-400">
                    {`Taux d'évolution global : ${tauxGlobalPct >= 0 ? `+${tauxGlobalPct.toFixed(2)}%` : `${tauxGlobalPct.toFixed(2)}%`}`}
                  </p>
                  <p className="text-emerald-300 font-bold">{`Prix final : ${finalPrice.toFixed(2)} €`}</p>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- WIDGETS TERMINALE ---------------- */}
          {cycle === 'terminale' && activeWidget === 'tangent' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white">Tangente & Dérivation de l'Exponentielle f(x) = e^x</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-4">
                  <label className="text-sm font-bold text-slate-300 block">
                    {`Point de tangence a = ${tangentA}`}
                  </label>
                  <input
                    type="range"
                    min="-2"
                    max="3"
                    step="0.5"
                    value={tangentA}
                    onChange={e => setTangentA(parseFloat(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-3 text-sm text-slate-300">
                  <h4 className="font-bold text-blue-400">Équation de la Tangente</h4>
                  <p>{`• f(a) = e^(${tangentA}) ≈ ${expVal.toFixed(3)}`}</p>
                  <p>{`• f'(a) = e^(${tangentA}) ≈ ${expVal.toFixed(3)} (Pente)`}</p>
                  <p>• Formule : y = f'(a)(x - a) + f(a)</p>
                  <p className="text-amber-300 font-bold">
                    {`y = ${expVal.toFixed(2)}x ${expVal * (1 - tangentA) >= 0 ? `+ ${(expVal * (1 - tangentA)).toFixed(2)}` : `- ${Math.abs(expVal * (1 - tangentA)).toFixed(2)}`}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {cycle === 'terminale' && activeWidget === 'vector_3d' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white">Produit Scalaire dans l'Espace 3D</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Vecteur u(x, y, z) :</label>
                    <div className="flex gap-2">
                      <input type="number" value={vecU.x} onChange={e => setVecU({ ...vecU, x: Number(e.target.value) })} className="w-14 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white" />
                      <input type="number" value={vecU.y} onChange={e => setVecU({ ...vecU, y: Number(e.target.value) })} className="w-14 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white" />
                      <input type="number" value={vecU.z} onChange={e => setVecU({ ...vecU, z: Number(e.target.value) })} className="w-14 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Vecteur v(x', y', z') :</label>
                    <div className="flex gap-2">
                      <input type="number" value={vecV.x} onChange={e => setVecV({ ...vecV, x: Number(e.target.value) })} className="w-14 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white" />
                      <input type="number" value={vecV.y} onChange={e => setVecV({ ...vecV, y: Number(e.target.value) })} className="w-14 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white" />
                      <input type="number" value={vecV.z} onChange={e => setVecV({ ...vecV, z: Number(e.target.value) })} className="w-14 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white" />
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-3 text-sm text-slate-300">
                  <h4 className="font-bold text-emerald-400">Calcul analytique</h4>
                  <p>{`u · v = (${vecU.x})(${vecV.x}) + (${vecU.y})(${vecV.y}) + (${vecU.z})(${vecV.z})`}</p>
                  <p className="text-xl font-black text-amber-400">{`Résultat : u · v = ${dotProduct3D}`}</p>
                  <p className={dotProduct3D === 0 ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                    {dotProduct3D === 0 ? '✓ Les vecteurs sont ORTHOGONAUX !' : '✗ Les vecteurs ne sont pas orthogonaux.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {cycle === 'terminale' && activeWidget === 'binomiale' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white">Loi Binomiale B(n, p)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-4 text-sm">
                  <div>
                    <label className="text-slate-300">{`Nombre d'essais n = ${binomN}`}</label>
                    <input type="range" min="5" max="100" value={binomN} onChange={e => setBinomN(Number(e.target.value))} className="w-full accent-purple-500" />
                  </div>
                  <div>
                    <label className="text-slate-300">{`Probabilité de succès p = ${binomP}`}</label>
                    <input type="range" min="0.05" max="0.95" step="0.05" value={binomP} onChange={e => setBinomP(Number(e.target.value))} className="w-full accent-purple-500" />
                  </div>
                </div>
                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-3 text-sm text-slate-300">
                  <h4 className="font-bold text-purple-400">Paramètres statistiques</h4>
                  <p>{`• Espérance E(X) = n × p : ${binomEsperance.toFixed(2)}`}</p>
                  <p>{`• Variance V(X) = np(1-p) : ${binomVariance.toFixed(2)}`}</p>
                  <p>{`• Écart-type σ(X) : ${Math.sqrt(binomVariance).toFixed(2)}`}</p>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- WIDGETS 3ÈME (DÉFAUT) ---------------- */}
          {cycle === '3eme' && activeWidget === 'functions' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white">Laboratoire des Droites & Fonctions Affines</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-300 block">{`Pente a = ${sliderA}`}</label>
                  <input type="range" min="-5" max="5" value={sliderA} onChange={e => setSliderA(Number(e.target.value))} className="w-full accent-amber-500" />
                  <label className="text-sm font-bold text-slate-300 block">{`Ordonnée à l'origine b = ${sliderB}`}</label>
                  <input type="range" min="-5" max="5" value={sliderB} onChange={e => setSliderB(Number(e.target.value))} className="w-full accent-purple-500" />
                  <label className="text-sm font-bold text-slate-300 block">{`Point x = ${testPointX}`}</label>
                  <input type="range" min="-5" max="5" value={testPointX} onChange={e => setTestPointX(Number(e.target.value))} className="w-full accent-teal-500" />
                </div>
                <div className="md:col-span-2 bg-slate-900/80 p-6 rounded-xl border border-slate-800 space-y-4">
                  <div className="text-lg font-bold text-amber-400">
                    {`Équation de droite : f(x) = ${sliderA}x ${sliderB >= 0 ? `+ ${sliderB}` : `- ${Math.abs(sliderB)}`}`}
                  </div>
                  <p className="text-slate-300 text-sm">
                    {`Image de ${testPointX} : f(${testPointX}) = ${sliderA}(${testPointX}) + (${sliderB}) = ${computedY}.`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {cycle === '3eme' && activeWidget === 'trigonometry' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white">Trigonométrie SOH CAH TOA</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-300 block">{`Angle aigu α = ${trigoAngle}°`}</label>
                  <input type="range" min="10" max="80" value={trigoAngle} onChange={e => setTrigoAngle(Number(e.target.value))} className="w-full accent-emerald-500" />
                  <label className="text-sm font-bold text-slate-300 block">{`Hypoténuse H = ${hypothenuseLength} cm`}</label>
                  <input type="range" min="5" max="20" value={hypothenuseLength} onChange={e => setHypothenuseLength(Number(e.target.value))} className="w-full accent-teal-500" />
                </div>
                <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 space-y-3 text-sm text-slate-300">
                  <p>{`• Côté Opposé : H × sin(${trigoAngle}°) = ${oppLength.toFixed(2)} cm`}</p>
                  <p>{`• Côté Adjacent : H × cos(${trigoAngle}°) = ${adjLength.toFixed(2)} cm`}</p>
                  <p>{`• Tangente : tan(${trigoAngle}°) = ${(oppLength / adjLength).toFixed(2)}`}</p>
                </div>
              </div>
            </div>
          )}

          {cycle === '3eme' && activeWidget === 'scratch' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white">Simulateur d'Algorithmes Scratch</h3>
              <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 space-y-4">
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="text-slate-400">{`Départ x = ${scratchInitialX}`}</label>
                    <input type="range" min="0" max="10" value={scratchInitialX} onChange={e => setScratchInitialX(Number(e.target.value))} className="w-full accent-amber-500" />
                  </div>
                  <div>
                    <label className="text-slate-400">{`Répéter ${scratchLoopCount} fois`}</label>
                    <input type="range" min="1" max="5" value={scratchLoopCount} onChange={e => setScratchLoopCount(Number(e.target.value))} className="w-full accent-amber-500" />
                  </div>
                  <div>
                    <label className="text-slate-400">{`Ajouter ${scratchStepAdd}`}</label>
                    <input type="range" min="1" max="10" value={scratchStepAdd} onChange={e => setScratchStepAdd(Number(e.target.value))} className="w-full accent-amber-500" />
                  </div>
                </div>
                <div className="p-4 bg-slate-950 rounded-lg text-sm text-slate-200 font-mono">
                  {`Résultat final après exécution : x = ${scratchInitialX + scratchLoopCount * scratchStepAdd + (scratchInitialX + scratchLoopCount * scratchStepAdd > scratchThreshold ? 20 : 0)}`}
                </div>
              </div>
            </div>
          )}

          {cycle === '3eme' && activeWidget === 'pythagore' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white">Simulateur du Théorème de Pythagore</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-300 block">{`Côté a = ${pythSideA} cm`}</label>
                  <input type="range" min="2" max="12" value={pythSideA} onChange={e => setPythSideA(Number(e.target.value))} className="w-full accent-rose-500" />
                  <label className="text-sm font-bold text-slate-300 block">{`Côté b = ${pythSideB} cm`}</label>
                  <input type="range" min="2" max="12" value={pythSideB} onChange={e => setPythSideB(Number(e.target.value))} className="w-full accent-rose-500" />
                </div>
                <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 space-y-3 text-sm text-slate-300">
                  <p>{`• a² = ${pythSideA}² = ${pythSideA * pythSideA}`}</p>
                  <p>{`• b² = ${pythSideB}² = ${pythSideB * pythSideB}`}</p>
                  <p>{`• c² = a² + b² = ${pythSideA * pythSideA + pythSideB * pythSideB}`}</p>
                  <p className="text-lg font-extrabold text-amber-400">
                    {`Hypoténuse c = √(${pythSideA * pythSideA + pythSideB * pythSideB}) ≈ ${pythHyp.toFixed(2)} cm`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ---------------- GRILLES DE WIDGETS SELON LE CYCLE ---------------- */}
      {!activeWidget && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GRILLE SECONDE */}
          {cycle === 'lycee' && (
            <>
              <div className="mq-glass mq-glass-interactive p-6 space-y-5 border-slate-800 flex flex-col justify-between group hover:border-amber-500/40 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-amber-500/15 text-amber-400 rounded-xl w-fit border border-amber-500/30">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                      Fonctions de Référence
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    Laboratoire Parabole & Forme Canonique
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Fais varier a, α, β pour visualiser la parabole f(x) = a(x - α)² + β, son orientation et son extremum.
                  </p>
                </div>
                <button
                  onClick={() => setActiveWidget('parabole')}
                  className="mq-btn-primary w-full py-3 text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold"
                >
                  Expérimenter la Parabole →
                </button>
              </div>

              <div className="mq-glass mq-glass-interactive p-6 space-y-5 border-slate-800 flex flex-col justify-between group hover:border-emerald-500/40 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-emerald-500/15 text-emerald-400 rounded-xl w-fit border border-emerald-500/30">
                      <GitCommit className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      Géométrie Analytique
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Laboratoire Vectoriel & Droite (AB)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Modifie les coordonnées de A et B et obtiens en direct le vecteur AB, la distance, le milieu I et l'équation y = mx + p.
                  </p>
                </div>
                <button
                  onClick={() => setActiveWidget('vector_lab')}
                  className="mq-btn-primary w-full py-3 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold"
                >
                  Expérimenter les Vecteurs →
                </button>
              </div>

              <div className="mq-glass mq-glass-interactive p-6 space-y-5 border-slate-800 flex flex-col justify-between group hover:border-blue-500/40 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-blue-500/15 text-blue-400 rounded-xl w-fit border border-blue-500/30">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-blue-300 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                      Python & Boucles
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    Simulateur de Boucles Python (for in range)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Exécute des boucles `for k in range(start, end)` pas à pas et observe l'accumulation des variables.
                  </p>
                </div>
                <button
                  onClick={() => setActiveWidget('python_sim')}
                  className="mq-btn-primary w-full py-3 text-sm bg-gradient-to-r from-blue-500 to-indigo-500 text-slate-950 font-bold"
                >
                  Lancer le Simulateur Python →
                </button>
              </div>

              <div className="mq-glass mq-glass-interactive p-6 space-y-5 border-slate-800 flex flex-col justify-between group hover:border-purple-500/40 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-purple-500/15 text-purple-400 rounded-xl w-fit border border-purple-500/30">
                      <Percent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                      Information Chiffrée
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    Calculateur d'Évolutions & Coeff. Multiplicateur
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Teste des hausses et baisses successives, observe CM = CM₁ × CM₂ et calcule le taux d'évolution global.
                  </p>
                </div>
                <button
                  onClick={() => setActiveWidget('evolutions')}
                  className="mq-btn-primary w-full py-3 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-slate-950 font-bold"
                >
                  Calculer les Évolutions →
                </button>
              </div>
            </>
          )}

          {/* GRILLE TERMINALE */}
          {cycle === 'terminale' && (
            <>
              <div className="mq-glass mq-glass-interactive p-6 space-y-5 border-slate-800 flex flex-col justify-between group hover:border-blue-500/40 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-blue-500/15 text-blue-400 rounded-xl w-fit border border-blue-500/30">
                      <Activity className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-blue-300 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                      Analyse & Dérivation
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    Tangente Dynamique à l'Exponentielle e^x
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Déplace le point de tangence a, calcule f'(a) et visualise l'équation complète de la tangente.
                  </p>
                </div>
                <button
                  onClick={() => setActiveWidget('tangent')}
                  className="mq-btn-primary w-full py-3 text-sm bg-gradient-to-r from-blue-500 to-indigo-500 text-slate-950 font-bold"
                >
                  Explorer la Tangente →
                </button>
              </div>

              <div className="mq-glass mq-glass-interactive p-6 space-y-5 border-slate-800 flex flex-col justify-between group hover:border-emerald-500/40 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-emerald-500/15 text-emerald-400 rounded-xl w-fit border border-emerald-500/30">
                      <Box className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      Géométrie dans l'Espace
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Produit Scalaire 3D & Orthogonalité
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Saisis deux vecteurs de l'espace u(x,y,z) et v(x',y',z') et vérifie instantanément leur orthogonalité.
                  </p>
                </div>
                <button
                  onClick={() => setActiveWidget('vector_3d')}
                  className="mq-btn-primary w-full py-3 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold"
                >
                  Calculer le Produit Scalaire 3D →
                </button>
              </div>

              <div className="mq-glass mq-glass-interactive p-6 space-y-5 border-slate-800 flex flex-col justify-between group hover:border-purple-500/40 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-purple-500/15 text-purple-400 rounded-xl w-fit border border-purple-500/30">
                      <BarChart2 className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                      Probabilités
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    Simulateur de Loi Binomiale B(n, p)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Ajuste n et p, obtiens en direct l'espérance E(X)=np, la variance et l'écart-type.
                  </p>
                </div>
                <button
                  onClick={() => setActiveWidget('binomiale')}
                  className="mq-btn-primary w-full py-3 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-slate-950 font-bold"
                >
                  Simuler la Loi Binomiale →
                </button>
              </div>
            </>
          )}

          {/* GRILLE 3ÈME (DÉFAUT) */}
          {cycle === '3eme' && (
            <>
              <div className="mq-glass mq-glass-interactive p-6 space-y-5 border-slate-800 flex flex-col justify-between group hover:border-amber-500/40 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-amber-500/15 text-amber-400 rounded-xl w-fit border border-amber-500/30">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                      Algèbre & Graphique
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    Laboratoire des Droites & Fonctions Affines
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Fais varier la pente (coefficient a) et l'ordonnée à l'origine (b) pour observer en direct l'inclinaison et la translation.
                  </p>
                </div>
                <button
                  onClick={() => setActiveWidget('functions')}
                  className="mq-btn-primary w-full py-3 text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold"
                >
                  Expérimenter le Labo Fonctions →
                </button>
              </div>

              <div className="mq-glass mq-glass-interactive p-6 space-y-5 border-slate-800 flex flex-col justify-between group hover:border-emerald-500/40 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-emerald-500/15 text-emerald-400 rounded-xl w-fit border border-emerald-500/30">
                      <Triangle className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      Trigonométrie Active
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Triangle Rectangle & Rapports SOH CAH TOA
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Modifie l'angle aigu et l'hypoténuse. Observe les calculs de sinus, cosinus et tangente en temps réel.
                  </p>
                </div>
                <button
                  onClick={() => setActiveWidget('trigonometry')}
                  className="mq-btn-primary w-full py-3 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold"
                >
                  Expérimenter la Trigonométrie →
                </button>
              </div>

              <div className="mq-glass mq-glass-interactive p-6 space-y-5 border-slate-800 flex flex-col justify-between group hover:border-blue-500/40 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-blue-500/15 text-blue-400 rounded-xl w-fit border border-blue-500/30">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-blue-300 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                      Algorithmique & Code
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    Simulateur de Scripts Scratch (Boucles & Si)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Configure une variable x, le nombre de tours de boucle et teste la condition pour comprendre l'organigramme pas-à-pas.
                  </p>
                </div>
                <button
                  onClick={() => setActiveWidget('scratch')}
                  className="mq-btn-primary w-full py-3 text-sm bg-gradient-to-r from-blue-500 to-indigo-500 text-slate-950 font-bold"
                >
                  Lancer le Simulateur Scratch →
                </button>
              </div>

              <div className="mq-glass mq-glass-interactive p-6 space-y-5 border-slate-800 flex flex-col justify-between group hover:border-rose-500/40 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-rose-500/15 text-rose-400 rounded-xl w-fit border border-rose-500/30">
                      <Triangle className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-rose-300 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                      Géométrie Fondamentale
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-rose-300 transition-colors">
                    Simulateur Visuel du Théorème de Pythagore
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Fais varier les longueurs des deux côtés de l'angle droit et vérifie la relation a² + b² = c².
                  </p>
                </div>
                <button
                  onClick={() => setActiveWidget('pythagore')}
                  className="mq-btn-primary w-full py-3 text-sm bg-gradient-to-r from-rose-500 to-pink-500 text-slate-950 font-bold"
                >
                  Explorer Pythagore →
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
