import React, { useState, useEffect, useCallback } from 'react';
import {
  Compass,
  Clock,
  Sparkles,
  RotateCcw,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Award,
  Zap,
  RotateCw,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'master_ai_7_spatial_rotation_progress';

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
    console.warn('Could not save Spatial Rotation progress:', e);
  }
}

// Rotate a 2D matrix 90 degrees clockwise
function rotate90Clockwise(matrix) {
  const n = matrix.length;
  const result = Array.from({ length: n }, () => Array(n).fill(0));
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      result[c][n - 1 - r] = matrix[r][c];
    }
  }
  return result;
}

// Rotate 180 degrees
function rotate180(matrix) {
  return rotate90Clockwise(rotate90Clockwise(matrix));
}

// Rotate 270 degrees clockwise
function rotate270(matrix) {
  return rotate90Clockwise(rotate180(matrix));
}

// Mirror horizontal (distractor trap)
function mirrorHorizontal(matrix) {
  const n = matrix.length;
  return matrix.map(row => [...row].reverse());
}

// Invert/Shift distractor
function mutateDistractor(matrix) {
  const n = matrix.length;
  const copy = matrix.map(row => [...row]);
  // Flip one cell
  const r = Math.floor(Math.random() * n);
  const c = Math.floor(Math.random() * n);
  copy[r][c] = copy[r][c] === 1 ? 0 : 1;
  return copy;
}

function matrixToString(matrix) {
  return matrix.map(r => r.join('')).join('|');
}

// Procedural generator for Spatial Rotation challenges
function generateRotationChallenge(level) {
  const size = level <= 6 ? 3 : 4;
  const blockCount = Math.min(3 + Math.floor((level - 1) / 3), size * size - 4);

  // Generate an asymmetric base pattern
  let baseMatrix;
  let attempts = 0;
  while (attempts++ < 30) {
    baseMatrix = Array.from({ length: size }, () => Array(size).fill(0));
    let placed = 0;
    while (placed < blockCount) {
      const r = Math.floor(Math.random() * size);
      const c = Math.floor(Math.random() * size);
      if (baseMatrix[r][c] === 0) {
        baseMatrix[r][c] = 1;
        placed++;
      }
    }
    // Ensure asymmetric so rotation creates a distinguishable change
    if (matrixToString(baseMatrix) !== matrixToString(rotate90Clockwise(baseMatrix))) {
      break;
    }
  }

  // Pick target transformation
  const transformTypes = [
    { angle: 90, label: '90° Clockwise Rotation', fn: rotate90Clockwise },
    { angle: 180, label: '180° Half Turn Rotation', fn: rotate180 },
    { angle: 270, label: '270° Clockwise Rotation (90° Counter-Clockwise)', fn: rotate270 }
  ];

  const chosenTransform = transformTypes[(level - 1) % transformTypes.length];
  const trueRotated = chosenTransform.fn(baseMatrix);

  // Generate 3 unique distractor options
  const distractor1 = mirrorHorizontal(trueRotated);
  const distractor2 = mutateDistractor(trueRotated);
  const distractor3 = mirrorHorizontal(baseMatrix);

  const rawOptions = [
    { matrix: trueRotated, isCorrect: true },
    { matrix: distractor1, isCorrect: false },
    { matrix: distractor2, isCorrect: false },
    { matrix: distractor3, isCorrect: false }
  ];

  // Shuffle options
  const shuffled = rawOptions.sort(() => Math.random() - 0.5);

  return {
    size,
    baseMatrix,
    instruction: `Identify the matrix after a ${chosenTransform.label}:`,
    angle: chosenTransform.angle,
    options: shuffled
  };
}

export default function SpatialRotationGame({ onBack }) {
  const [stats, setStats] = useState(loadProgress);
  const [currentLevel, setCurrentLevel] = useState(() => loadProgress().level);
  const [challenge, setChallenge] = useState(() => generateRotationChallenge(loadProgress().level));
  
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
  const [isCompleted, setIsCompleted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [lastRoundScore, setLastRoundScore] = useState(0);

  // Load level challenge
  const loadLevel = useCallback((lvl) => {
    setChallenge(generateRotationChallenge(lvl));
    setSelectedIdx(null);
    setFeedback(null);
    setIsCompleted(false);
    setElapsed(0);
  }, []);

  useEffect(() => {
    loadLevel(currentLevel);
  }, [currentLevel, loadLevel]);

  // Elapsed Timer
  useEffect(() => {
    if (isCompleted) return;
    const timer = setInterval(() => {
      setElapsed((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isCompleted, currentLevel]);

  const handleSelectOption = (idx) => {
    if (feedback === 'correct' || isCompleted) return;

    setSelectedIdx(idx);
    const chosen = challenge.options[idx];

    if (chosen.isCorrect) {
      confetti({ particleCount: 55, spread: 65, origin: { y: 0.6 } });
      setFeedback('correct');

      const speedBonus = Math.max(10, 50 - elapsed * 2);
      const earned = currentLevel * 110 + speedBonus;
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

      setTimeout(() => {
        setIsCompleted(true);
      }, 700);
    } else {
      setFeedback('wrong');
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
    loadLevel(nextLvl);
  };

  const handleRestartGame = () => {
    setCurrentLevel(1);
    loadLevel(1);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="rounded-3xl glass-panel-glow border border-purple-500/30 p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2.5 rounded-xl border border-slate-700 bg-dark-900 text-slate-300 hover:text-white hover:border-purple-400 transition-all"
                title="Back to All IQ Games"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/50 flex items-center justify-center text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-bold">
                NEW IQ GAME 2 • MENTAL ROTATION
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                LEVEL {currentLevel}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-full bg-purple-950 border border-purple-500/30 text-purple-300 font-bold">
              Highest: Level {stats.highestLevel}
            </span>
            <span className="px-3 py-1.5 rounded-full bg-dark-900 border border-slate-700 text-slate-200">
              Score: <strong className="text-purple-300 font-sans">{stats.totalScore.toLocaleString()}</strong>
            </span>
            <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-dark-900 border border-slate-700 text-slate-300">
              <Clock className="w-3.5 h-3.5" />
              {elapsed}s
            </span>
          </div>
        </div>

        {!isCompleted ? (
          <div className="space-y-6 mt-6">
            {/* Target Geometry Prompt */}
            <div className="text-center space-y-3">
              <p className="text-xs font-mono uppercase text-purple-300 tracking-wider font-bold flex items-center justify-center gap-2">
                <RotateCw className="w-4 h-4 text-purple-400" />
                {challenge.instruction}
              </p>

              {/* Source Figure Box */}
              <div className="inline-block p-4 rounded-3xl bg-dark-900/90 border-2 border-purple-400/50 shadow-[0_0_25px_rgba(168,85,247,0.25)]">
                <p className="text-[10px] font-mono uppercase text-slate-500 mb-2">Original Shape</p>
                <div
                  className="grid gap-2"
                  style={{ gridTemplateColumns: `repeat(${challenge.size}, minmax(0, 1fr))` }}
                >
                  {challenge.baseMatrix.flat().map((cell, idx) => (
                    <div
                      key={idx}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl border transition-all ${
                        cell === 1
                          ? 'bg-gradient-to-tr from-purple-500 to-cyan-400 border-purple-300 shadow-[0_0_12px_rgba(192,132,252,0.6)]'
                          : 'bg-slate-900/80 border-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Candidate Options Grid */}
            <div className="space-y-3">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 text-center">
                Select the correct rotated transformation:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {challenge.options.map((opt, idx) => {
                  const isSelected = selectedIdx === idx;
                  let borderStyle = 'border-slate-800 bg-dark-900/90 hover:border-purple-400/60';

                  if (isSelected) {
                    if (feedback === 'correct') {
                      borderStyle = 'border-emerald-400 bg-emerald-950/40 ring-2 ring-emerald-400';
                    } else if (feedback === 'wrong') {
                      borderStyle = 'border-rose-500 bg-rose-950/40 ring-2 ring-rose-400';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={feedback === 'correct'}
                      className={`p-3 sm:p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all transform active:scale-95 ${borderStyle}`}
                    >
                      <span className="text-[10px] font-mono text-slate-500 font-bold">
                        Option {String.fromCharCode(65 + idx)}
                      </span>

                      <div
                        className="grid gap-1.5"
                        style={{ gridTemplateColumns: `repeat(${challenge.size}, minmax(0, 1fr))` }}
                      >
                        {opt.matrix.flat().map((cell, cIdx) => (
                          <div
                            key={cIdx}
                            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg border ${
                              cell === 1
                                ? 'bg-gradient-to-tr from-purple-500 to-cyan-400 border-purple-300'
                                : 'bg-slate-900 border-slate-800'
                            }`}
                          />
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Real-time Feedback Status */}
            {feedback === 'wrong' && (
              <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500 text-rose-200 text-xs font-bold flex items-center justify-between animate-in shake duration-200">
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-400" />
                  <span>Not quite rotated correctly! Inspect the corner axes and try again.</span>
                </div>
                <button
                  onClick={() => setFeedback(null)}
                  className="underline text-rose-100"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Level Completion / Result Screen */
          <div className="mt-6 rounded-3xl bg-purple-950/40 border border-purple-500/50 p-6 sm:p-8 text-center animate-in fade-in zoom-in-95 duration-300 shadow-2xl">
            <Sparkles className="w-10 h-10 text-purple-300 mx-auto" />
            <h3 className="mt-2 text-2xl sm:text-3xl font-black text-white">
              LEVEL {currentLevel} COMPLETE!
            </h3>
            <p className="mt-1 text-xs text-purple-300 font-mono">
              3D mental rotation perspective accurately identified.
            </p>

            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg mx-auto text-left font-mono">
              <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase">Score Earned</span>
                <p className="text-lg font-black text-amber-300">+{lastRoundScore}</p>
              </div>
              <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase">Total Score</span>
                <p className="text-lg font-black text-purple-300">{stats.totalScore.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase">Mistakes</span>
                <p className="text-lg font-black text-rose-400">{stats.wrong}</p>
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
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-400 hover:to-cyan-300 text-dark-950 font-black text-sm uppercase shadow-[0_0_25px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95"
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
            Spatial Complexity: {challenge.size}×{challenge.size} Matrix • Transformation: {challenge.angle}°
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
