import React, { useState, useEffect, useRef } from 'react';
import { Clock, Play, X, Zap, Award, CheckCircle2, RotateCcw } from 'lucide-react';
import { GameState } from '../types/mathquest';
import { MathRenderer } from './MathRenderer';
import { generateNextRituelQuestion, RituelQuestion } from '../engine/rituelQuestions';

interface RituelViewProps {
  gameState: GameState;
  onUpdateGameState: (updater: (prev: GameState) => GameState) => void;
  onAddRewards?: (xp: number, gold: number) => void;
}

export const RituelView: React.FC<RituelViewProps> = ({
  gameState,
  onUpdateGameState,
  onAddRewards
}) => {
  const [activeStage, setActiveStage] = useState<'mental' | 'flashcards' | 'geometry' | null>(null);
  const [timerLeft, setTimerLeft] = useState<number>(45);
  const [sessionScore, setSessionScore] = useState<number>(0);
  const [currentQ, setCurrentQ] = useState<RituelQuestion | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [rewardToast, setRewardToast] = useState<{ show: boolean; text: string } | null>(null);
  const recentPromptsRef = useRef<string[]>([]);
  const timerRef = useRef<any>(null);

  // Timer 45 secondes strict
  useEffect(() => {
    if (activeStage && !isFinished) {
      if (timerLeft > 0) {
        timerRef.current = setTimeout(() => {
          setTimerLeft(prev => prev - 1);
        }, 1000);
      } else {
        // Fin des 45 secondes
        handleEndSession();
      }
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeStage, timerLeft, isFinished]);

  const handleStartStage = (stage: 'mental' | 'flashcards' | 'geometry') => {
    setActiveStage(stage);
    setTimerLeft(45);
    setSessionScore(0);
    setIsFinished(false);
    setRewardToast(null);
    recentPromptsRef.current = [];
    const firstQ = generateNextRituelQuestion(stage, []);
    recentPromptsRef.current.push(firstQ.prompt);
    setCurrentQ(firstQ);
  };

  const handleEndSession = () => {
    setIsFinished(true);
    if (activeStage) {
      const currentStageKey = activeStage;
      const finalScore = sessionScore;
      
      // Persistance du HighScore et récompenses
      onUpdateGameState(prev => {
        const prevHigh = prev.highScores?.[currentStageKey] || 0;
        const newHigh = Math.max(prevHigh, finalScore);
        const xpEarned = finalScore * 15;
        const goldEarned = finalScore * 5;

        return {
          ...prev,
          xp: prev.xp + xpEarned,
          gold: prev.gold + goldEarned,
          highScores: {
            ...prev.highScores,
            [currentStageKey]: newHigh
          }
        };
      });

      if (onAddRewards) {
        onAddRewards(finalScore * 15, finalScore * 5);
      }
    }
  };

  const handleAnswerClick = (option: string) => {
    if (!currentQ || isFinished || timerLeft <= 0) return;

    const normalizeAnswer = (str: string): string => {
      return str
        .replace(/\$/g, '')
        .replace(/\\text\{([^}]+)\}/g, '$1')
        .replace(/\\,/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
    };

    const isCorrect = normalizeAnswer(option) === normalizeAnswer(currentQ.answer);

    if (isCorrect) {
      setSessionScore(prev => prev + 1);
      // Récompense visuelle instantanée sans pause du timer
      setRewardToast({ show: true, text: '+1 ✨ (+15 XP)' });
      setTimeout(() => setRewardToast(null), 450);
    }

    // Passage immédiat à la question suivante avec exclusion des questions déjà posées
    const nextQ = generateNextRituelQuestion(activeStage!, recentPromptsRef.current);
    recentPromptsRef.current.push(nextQ.prompt);
    if (recentPromptsRef.current.length > 20) {
      recentPromptsRef.current.shift();
    }
    setCurrentQ(nextQ);
  };

  const highScores = gameState.highScores || { mental: 0, flashcards: 0, geometry: 0 };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="mq-glass p-6 sm:p-8 relative overflow-hidden bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs sm:text-sm font-bold">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Entraînement Éclair Quotidien</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Rituel Flash 45s
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Choisis ta sous-catégorie du jour et réponds à un maximum de questions en <strong>45 secondes</strong> chrono ! Chaque bonne réponse booste ton XP et ton score persiste.
          </p>
        </div>
      </div>

      {/* 3 Independant Subcategories Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Catégorie 1 : Calcul Express */}
        <div className="mq-glass p-6 space-y-5 border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                45s Chrono
              </span>
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Record : {highScores.mental || 0}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
              Calcul Express
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Tables, additions rapides, fractions décimales et calcul mental automatisé.
            </p>
          </div>
          <button
            onClick={() => handleStartStage('mental')}
            className="mq-btn-primary w-full py-3.5 text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold"
          >
            <Play className="w-4 h-4 fill-slate-950" /> Lancer le Défi (45s)
          </button>
        </div>

        {/* Catégorie 2 : Flashcards Définitions */}
        <div className="mq-glass p-6 space-y-5 border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-indigo-400 uppercase tracking-wider bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
                45s Chrono
              </span>
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-indigo-400" /> Record : {highScores.flashcards || 0}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
              Flashcards & Formules
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Identités remarquables, propriétés des puissances et formules indispensables.
            </p>
          </div>
          <button
            onClick={() => handleStartStage('flashcards')}
            className="mq-btn-primary w-full py-3.5 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold"
          >
            <Play className="w-4 h-4 fill-white" /> Lancer le Défi (45s)
          </button>
        </div>

        {/* Catégorie 3 : Géométrie Flash */}
        <div className="mq-glass p-6 space-y-5 border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                45s Chrono
              </span>
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-emerald-400" /> Record : {highScores.geometry || 0}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
              Géométrie Flash
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Triplets pythagoriciens, Thalès, aires, périmètres et propriétés de base.
            </p>
          </div>
          <button
            onClick={() => handleStartStage('geometry')}
            className="mq-btn-primary w-full py-3.5 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold"
          >
            <Play className="w-4 h-4 fill-slate-950" /> Lancer le Défi (45s)
          </button>
        </div>
      </div>

      {/* Interactive 45s Game Modal */}
      {activeStage && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="mq-glass p-6 sm:p-8 max-w-xl w-full max-h-[85vh] overflow-y-auto space-y-6 relative border-amber-500/40 shadow-2xl rounded-2xl scrollbar-thin">
            {/* Close / Quit Button */}
            <button
              onClick={() => setActiveStage(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-slate-900 border border-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!isFinished ? (
              <div className="space-y-6">
                {/* Timer & Live Score Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className={`w-5 h-5 ${timerLeft <= 10 ? 'text-rose-500 animate-bounce' : 'text-amber-400'}`} />
                    <span className={`text-xl sm:text-2xl font-black font-mono ${timerLeft <= 10 ? 'text-rose-400' : 'text-amber-300'}`}>
                      {timerLeft}s
                    </span>
                  </div>

                  <div className="relative flex items-center gap-2 bg-slate-900 px-4 py-1.5 rounded-full border border-slate-800">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="text-sm sm:text-base font-extrabold text-white">Score : {sessionScore}</span>
                    {rewardToast?.show && (
                      <span className="absolute -top-6 right-2 text-xs font-extrabold text-emerald-400 animate-reward-pop pointer-events-none">
                        {rewardToast.text}
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress bar of time */}
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-1000 ${
                      timerLeft <= 10 ? 'bg-rose-500' : 'bg-gradient-to-r from-amber-500 to-emerald-500'
                    }`}
                    style={{ width: `${(timerLeft / 45) * 100}%` }}
                  />
                </div>

                {/* Question Box */}
                {currentQ && (
                  <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 text-center space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {activeStage === 'mental' ? 'Calcul Mental Express' : activeStage === 'flashcards' ? 'Rappel Flash' : 'Géométrie Rapide'}
                    </p>
                    <div className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                      <MathRenderer content={currentQ.prompt} />
                    </div>
                  </div>
                )}

                {/* Options QCM (One-click instant transition) */}
                {currentQ && (
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {currentQ.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswerClick(opt)}
                        className="mq-glass mq-glass-interactive p-4 sm:p-5 rounded-xl text-center border border-slate-800 hover:border-amber-400/60 active:scale-95 transition-all text-slate-100 font-bold text-base sm:text-lg flex items-center justify-center"
                      >
                        <MathRenderer content={opt} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Session End Result Screen */
              <div className="text-center space-y-6 py-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-3xl">
                  🏆
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">Session Flash Terminée !</h3>
                  <p className="text-slate-300 text-sm">Temps écoulé (45s)</p>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400">Score de la session</span>
                    <p className="text-2xl font-extrabold text-amber-400">{sessionScore} réussites</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400">Gains obtenus</span>
                    <p className="text-lg font-bold text-emerald-400">+{sessionScore * 15} XP • +{sessionScore * 5} 🪙</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleStartStage(activeStage!)}
                    className="mq-btn-secondary flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Rejouer (45s)
                  </button>
                  <button
                    onClick={() => setActiveStage(null)}
                    className="mq-btn-primary flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Terminer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
