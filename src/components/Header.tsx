import React from 'react';
import { CycleId, UserProfile } from '../types/mathquest';
import { Zap, Award, Flame, ChevronDown } from 'lucide-react';

interface HeaderProps {
  userProfile: UserProfile;
  onCycleChange: (cycle: CycleId) => void;
  purchasedCycles?: CycleId[];
}

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  onCycleChange,
  purchasedCycles = ['3eme']
}) => {
  // Calcul de la progression de niveau vers le niveau suivant (ex: 200 XP par niveau)
  const xpCurrentLevel = userProfile.xp % 200;
  const xpProgressPercent = Math.min(100, Math.max(10, (xpCurrentLevel / 200) * 100));

  return (
    <header className="mq-glass sticky top-0 z-50 mx-2 my-2 sm:mx-4 sm:my-3 p-3 sm:p-4 space-y-3 border-b border-slate-800/80 max-w-full overflow-hidden">
      {/* Ligne 1 : Identité & Contexte */}
      <div className="flex items-center justify-between gap-4">
        {/* À gauche : Logo compact + Titre simple */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-purple-600 to-blue-500 p-0.5 shadow-md shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[9px] flex items-center justify-center font-black text-amber-400 text-sm sm:text-base tracking-tight">
              TM
            </div>
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-white leading-none">
              Tijob Math
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-400 font-medium">Tuteur Socratique IA</p>
          </div>
        </div>

        {/* À droite : Sélecteur de niveau adaptatif (Menu déroulant sur mobile, Pilules sur desktop) */}
        {purchasedCycles.length > 1 ? (
          <div>
            {/* Version Mobile : Menu déroulant compact et ergonomique (< 640px) */}
            <div className="relative sm:hidden">
              <select
                value={userProfile.cycle}
                onChange={(e) => onCycleChange(e.target.value as CycleId)}
                className="appearance-none bg-slate-950/95 border border-slate-800 text-amber-400 text-xs font-extrabold py-1.5 pl-3 pr-7 rounded-xl focus:outline-none focus:border-amber-500 shadow-sm"
              >
                {purchasedCycles.includes('3eme') && (
                  <option value="3eme" className="bg-slate-900 text-slate-200">
                    3ème / Brevet
                  </option>
                )}
                {purchasedCycles.includes('lycee') && (
                  <option value="lycee" className="bg-slate-900 text-purple-300">
                    Seconde / 1ère
                  </option>
                )}
                {purchasedCycles.includes('terminale') && (
                  <option value="terminale" className="bg-slate-900 text-blue-300">
                    Terminale Spé
                  </option>
                )}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Version Tablette & Ordinateur : Pilules côte à côte (>= 640px) */}
            <div className="hidden sm:flex items-center bg-slate-950/90 p-1 rounded-xl border border-slate-800 shrink-0">
              {purchasedCycles.includes('3eme') && (
                <button
                  onClick={() => onCycleChange('3eme')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    userProfile.cycle === '3eme'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  3ème / Brevet
                </button>
              )}
              {purchasedCycles.includes('lycee') && (
                <button
                  onClick={() => onCycleChange('lycee')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    userProfile.cycle === 'lycee'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Seconde / 1ère
                </button>
              )}
              {purchasedCycles.includes('terminale') && (
                <button
                  onClick={() => onCycleChange('terminale')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    userProfile.cycle === 'terminale'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Terminale Spé
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/80 text-slate-300 text-xs font-semibold hover:border-slate-700 cursor-default transition-all shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span>3ème / Brevet</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </div>
        )}
      </div>

      {/* Ligne 2 : Barre de statut / Gamification sur 1 seule rangée */}
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-900/60">
        {/* 1. Fioles / Énergie */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-bold">
          <Zap className="w-3.5 h-3.5 fill-rose-500 text-rose-500 shrink-0 animate-pulse" />
          <span>{userProfile.energyVials}/{userProfile.maxEnergyVials}</span>
        </div>

        {/* 2. Série en cours */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold">
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
          <span>3 j</span>
        </div>

        {/* 3. Niveau & XP avec fine barre de progression intégrée */}
        <div className="flex-1 max-w-[200px] flex flex-col gap-1 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-200">
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Niv. {userProfile.level}
            </span>
            <span className="text-amber-400 font-mono text-[10px]">{userProfile.xp} XP</span>
          </div>
          <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${xpProgressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
