import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  BrainCircuit,
  Clock,
  Sparkles,
  RotateCcw,
  ChevronRight,
  Eye,
  CheckCircle2,
  XCircle,
  Award,
  Zap,
  Flame,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'master_ai_7_neural_matrix_progress';

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      level: Math.max(1, Number(saved.level) || 1),
      highestLevel: Math.max(1, Number(saved.highestLevel) || 1),
      totalScore: Math.max(0, Number(saved.totalScore) || 0),
      correct: Math.max(0, Number(saved.correct) || 0),
      wrong: Math.max(0, Number(saved.wrong) || 0)
    };
  } catch {
    return { level: 1, highestLevel: 1, totalScore: 0, correct: 0, wrong: 0 };
  }
}

function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Could not save Neural Matrix progress:', e);
  }
}

// Web Audio API chimes
function playChime(type) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'tile') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.1);
      osc.frequency.setValueAtTime(783.99, now + 0.2);
      osc.frequency.setValueAtTime(1046.50, now + 0.3);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'wrong') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(160, now + 0.12);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (e) {}
}

export default function NeuralMatrixGame({ onBack }) {
  const [stats, setStats] = useState(loadProgress);
  const [currentLevel, setCurrentLevel] = useState(() => loadProgress().level);
  
  // Grid Configuration based on level
  const gridSize = currentLevel <= 4 ? 3 : currentLevel <= 14 ? 4 : 5;
  const totalTiles = gridSize * gridSize;
  const targetCount = Math.min(
    3 + Math.floor((currentLevel - 1) / 2.5),
    totalTiles - 3
  );

  // Gameplay State
  const [targetIndices, setTargetIndices] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [wrongIndices, setWrongIndices] = useState([]);
  const [phase, setPhase] = useState('memorize'); // 'memorize' | 'recall' | 'result'
  const [countdown, setCountdown] = useState(3.0);
  const [elapsed, setElapsed] = useState(0);
  const [lastRoundScore, setLastRoundScore] = useState(0);

  // Procedural level generation
  const startLevel = useCallback((lvl) => {
    const size = lvl <= 4 ? 3 : lvl <= 14 ? 4 : 5;
    const total = size * size;
    const count = Math.min(3 + Math.floor((lvl - 1) / 2.5), total - 3);

    // Pick unique random indices
    const indices = [];
    while (indices.length < count) {
      const rand = Math.floor(Math.random() * total);
      if (!indices.includes(rand)) indices.push(rand);
    }

    setTargetIndices(indices);
    setSelectedIndices([]);
    setWrongIndices([]);
    setPhase('memorize');
    setCountdown(Math.max(1.8, 3.2 - lvl * 0.04));
    setElapsed(0);
  }, []);

  useEffect(() => {
    startLevel(currentLevel);
  }, [currentLevel, startLevel]);

  // Memorize Phase Countdown
  useEffect(() => {
    if (phase !== 'memorize') return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0.1) {
          clearInterval(timer);
          setPhase('recall');
          return 0;
        }
        return Math.max(0, +(prev - 0.1).toFixed(1));
      });
    }, 100);
    return () => clearInterval(timer);
  }, [phase]);

  // Elapsed Timer during Recall
  useEffect(() => {
    if (phase !== 'recall') return;
    const timer = setInterval(() => {
      setElapsed((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  // Tile Selection Handler
  const handleTileClick = (index) => {
    if (phase !== 'recall' || selectedIndices.includes(index) || wrongIndices.includes(index)) return;

    if (targetIndices.includes(index)) {
      playChime('tile');
      const nextSelected = [...selectedIndices, index];
      setSelectedIndices(nextSelected);

      // Check if all target tiles were successfully found
      if (nextSelected.length === targetIndices.length) {
        playChime('success');
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });

        const earned = currentLevel * 120 + Math.max(0, 50 - elapsed * 2);
        setLastRoundScore(earned);

        const nextStats = {
          ...stats,
          level: currentLevel + 1,
          highestLevel: Math.max(stats.highestLevel, currentLevel + 1),
          totalScore: stats.totalScore + earned,
          correct: stats.correct + 1
        };

        setStats(nextStats);
        saveProgress(nextStats);
        setPhase('result');
      }
    } else {
      // Wrong tile selected
      playChime('wrong');
      setWrongIndices((prev) => [...prev, index]);

      const nextStats = {
        ...stats,
        wrong: stats.wrong + 1
      };
      setStats(nextStats);
      saveProgress(nextStats);
    }
  };

  const handleNextLevel = () => {
    const nextLvl = currentLevel + 1;
    setCurrentLevel(nextLvl);
    startLevel(nextLvl);
  };

  const handleRestartGame = () => {
    setCurrentLevel(1);
    startLevel(1);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="rounded-3xl glass-panel-glow border border-cyan-500/30 p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2.5 rounded-xl border border-slate-700 bg-dark-900 text-slate-300 hover:text-white hover:border-cyan-400 transition-all"
                title="Back to All IQ Games"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-neon-cyan">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400 font-bold">
                NEW IQ GAME 1 • SPATIAL MEMORY
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                LEVEL {currentLevel}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-bold">
              Highest: Level {stats.highestLevel}
            </span>
            <span className="px-3 py-1.5 rounded-full bg-dark-900 border border-slate-700 text-slate-200">
              Score: <strong className="text-cyan-300 font-sans">{stats.totalScore.toLocaleString()}</strong>
            </span>
            <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-dark-900 border border-slate-700 text-slate-300">
              <Clock className="w-3.5 h-3.5" />
              {elapsed}s
            </span>
          </div>
        </div>

        {/* Phase Instructions & Progress Bar */}
        <div className="my-5 text-center space-y-2">
          {phase === 'memorize' ? (
            <div className="space-y-1">
              <p className="text-sm sm:text-base font-bold text-amber-300 flex items-center justify-center gap-2 animate-pulse">
                <Eye className="w-4 h-4" /> Memorize the {targetCount} illuminated neural nodes! ({countdown.toFixed(1)}s)
              </p>
              <div className="w-48 sm:w-64 h-1.5 bg-slate-800 rounded-full mx-auto overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-cyan-400 transition-all duration-100"
                  style={{ width: `${Math.min(100, (countdown / 3) * 100)}%` }}
                />
              </div>
            </div>
          ) : phase === 'recall' ? (
            <p className="text-sm sm:text-base font-bold text-cyan-300">
              Tap the {targetCount} memorized tiles ({selectedIndices.length}/{targetCount} found)
            </p>
          ) : (
            <p className="text-sm font-bold text-emerald-300">
              Pattern successfully locked!
            </p>
          )}
        </div>

        {/* Matrix Grid */}
        <div className="my-6 flex justify-center">
          <div
            className="grid gap-2.5 sm:gap-3 p-4 rounded-3xl bg-dark-900/90 border border-cyan-500/30 shadow-inner max-w-sm sm:max-w-md w-full"
            style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: totalTiles }).map((_, idx) => {
              const isTarget = targetIndices.includes(idx);
              const isSelected = selectedIndices.includes(idx);
              const isWrong = wrongIndices.includes(idx);

              let style = 'border-slate-800 bg-slate-900/90 hover:border-cyan-400/50';

              if (phase === 'memorize') {
                if (isTarget) {
                  style = 'border-cyan-300 bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-[0_0_20px_rgba(34,211,238,0.7)] animate-pulse';
                }
              } else if (phase === 'recall') {
                if (isSelected) {
                  style = 'border-emerald-300 bg-emerald-500/30 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.5)]';
                } else if (isWrong) {
                  style = 'border-rose-400 bg-rose-500/30 text-rose-300';
                }
              } else if (phase === 'result') {
                if (isTarget) {
                  style = 'border-emerald-400 bg-emerald-500/40 text-emerald-200';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleTileClick(idx)}
                  disabled={phase !== 'recall' || isSelected}
                  className={`aspect-square rounded-2xl border-2 transition-all transform active:scale-95 flex items-center justify-center font-black text-lg ${style}`}
                >
                  {phase === 'memorize' && isTarget && (
                    <Zap className="w-5 h-5 fill-current" />
                  )}
                  {phase === 'recall' && isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                  )}
                  {phase === 'recall' && isWrong && (
                    <XCircle className="w-5 h-5 text-rose-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Level Completion Screen / Modal */}
        {phase === 'result' && (
          <div className="mt-6 rounded-3xl bg-emerald-950/40 border border-emerald-500/50 p-6 sm:p-8 text-center animate-in fade-in zoom-in-95 duration-300 shadow-2xl">
            <Sparkles className="w-10 h-10 text-emerald-300 mx-auto" />
            <h3 className="mt-2 text-2xl sm:text-3xl font-black text-white">
              LEVEL {currentLevel} COMPLETE!
            </h3>
            <p className="mt-1 text-xs text-emerald-300 font-mono">
              Memory recall sequence verified with 100% precision.
            </p>

            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg mx-auto text-left font-mono">
              <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase">Score Earned</span>
                <p className="text-lg font-black text-amber-300">+{lastRoundScore}</p>
              </div>
              <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase">Total Score</span>
                <p className="text-lg font-black text-cyan-300">{stats.totalScore.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase">Mistakes</span>
                <p className="text-lg font-black text-rose-400">{wrongIndices.length}</p>
              </div>
              <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase">Time Taken</span>
                <p className="text-lg font-black text-slate-200">{elapsed}s</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleRestartGame}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-slate-700 hover:border-slate-500 text-slate-300 text-xs font-bold flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restart Game</span>
              </button>

              <button
                onClick={handleNextLevel}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 text-dark-950 font-black text-sm uppercase shadow-neon-green flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95"
              >
                <span>Next Level →</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <span className="font-mono">
            Nodes: {targetCount} / {totalTiles} • Grid: {gridSize}×{gridSize}
          </span>
          <button
            onClick={handleRestartGame}
            className="flex items-center gap-1.5 text-slate-400 hover:text-rose-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Run to Level 1</span>
          </button>
        </div>
      </div>
    </div>
  );
}
