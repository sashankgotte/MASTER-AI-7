import React, { useState, useEffect, useCallback } from 'react';
import {
  Brain,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  Flame,
  RotateCcw,
  Zap,
  HelpCircle,
  Eye,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generatePuzzleForLevel, getDifficulty } from './puzzleGenerator';

const STORAGE_KEY = 'master_ai_7_puzzle_progress';

function loadSavedLevel() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      level: Math.max(1, Number(saved.level) || 1),
      score: Math.max(0, Number(saved.score) || 0),
      streak: Math.max(0, Number(saved.streak) || 0)
    };
  } catch {
    return { level: 1, score: 0, streak: 0 };
  }
}

function saveLevelProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn('Could not save puzzle progress:', e);
  }
}

// Web Audio API chimes (zero external assets needed)
function playSound(type) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc.start(now);
      osc.stop(now + 0.55);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(175, now + 0.12);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    }
  } catch (e) {}
}

export default function ExistingPuzzleGame({ onBack }) {
  const [progress, setProgress] = useState(loadSavedLevel);
  const [puzzle, setPuzzle] = useState(() => generatePuzzleForLevel(loadSavedLevel().level));
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [manualInput, setManualInput] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  // Memory Challenge Flash State
  const [memoryRevealed, setMemoryRevealed] = useState(false);
  const [memoryCountdown, setMemoryCountdown] = useState(3);

  // Sync puzzle when progress.level changes
  const loadLevel = useCallback((lvl) => {
    const newPuzzle = generatePuzzleForLevel(lvl);
    setPuzzle(newPuzzle);
    setSelectedChoice(null);
    setManualInput('');
    setFeedback(null);
    setShowHint(false);
    setElapsed(0);

    if (newPuzzle.isMemory) {
      setMemoryRevealed(true);
      setMemoryCountdown(3);
    } else {
      setMemoryRevealed(false);
    }
  }, []);

  // Timer loop for level
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [puzzle.level]);

  // Memory challenge countdown
  useEffect(() => {
    if (!puzzle.isMemory || !memoryRevealed) return;
    if (memoryCountdown <= 0) {
      setMemoryRevealed(false);
      return;
    }
    const timer = setTimeout(() => {
      setMemoryCountdown((c) => c - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [puzzle.isMemory, memoryRevealed, memoryCountdown]);

  // Handle Answer Submission
  const handleCheckAnswer = (answerCandidate = selectedChoice) => {
    if (feedback === 'correct' || isTransitioning) return;

    let candidate = answerCandidate;
    if (candidate === null && manualInput.trim() !== '') {
      candidate = manualInput.trim();
    }

    if (candidate === null || candidate === undefined || candidate === '') return;

    const isMatch = String(candidate).trim().toLowerCase() === String(puzzle.answer).trim().toLowerCase();

    if (isMatch) {
      playSound('correct');
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });

      setFeedback('correct');
      setIsTransitioning(true);

      const bonus = Math.max(10, 60 - elapsed * 2);
      const points = progress.level * 100 + bonus;
      const nextProgress = {
        level: progress.level + 1,
        score: progress.score + points,
        streak: progress.streak + 1
      };

      setProgress(nextProgress);
      saveLevelProgress(nextProgress);

      setTimeout(() => {
        setIsTransitioning(false);
        loadLevel(nextProgress.level);
      }, 1000);
    } else {
      playSound('wrong');
      setFeedback('wrong');
      setProgress((prev) => {
        const updated = { ...prev, streak: 0 };
        saveLevelProgress(updated);
        return updated;
      });
    }
  };

  const handleRestart = () => {
    const reset = { level: 1, score: 0, streak: 0 };
    setProgress(reset);
    saveLevelProgress(reset);
    loadLevel(1);
  };

  const difficulty = getDifficulty(progress.level);

  return (
    <div className="space-y-6">
      {/* Main Game Interface Card */}
      <div
        className={`relative rounded-3xl glass-panel-glow border p-5 sm:p-8 transition-all duration-500 shadow-2xl ${
          feedback === 'correct'
            ? 'border-emerald-500 shadow-emerald-500/20 bg-emerald-950/20'
            : feedback === 'wrong'
            ? 'border-rose-500/70 shadow-rose-500/20 bg-rose-950/20'
            : 'border-cyan-500/30 bg-slate-950/85'
        }`}
      >
        {/* Header: Level Status & Stats */}
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
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-600/30 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-neon-cyan">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-300 font-bold">
                PUZZLE
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                LEVEL {progress.level}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className={`px-3 py-1.5 rounded-full border text-xs font-bold ${difficulty.bg} ${difficulty.color}`}>
              {difficulty.name}
            </span>

            {progress.streak > 0 && (
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
                <Flame className="w-3.5 h-3.5 fill-current" />
                {progress.streak} Streak
              </span>
            )}

            <span className="px-3 py-1.5 rounded-full bg-dark-900 border border-slate-700 text-slate-200">
              Score: <strong className="text-cyan-300 font-sans">{progress.score.toLocaleString()}</strong>
            </span>

            <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-dark-900 border border-slate-700 text-slate-300">
              <Clock className="w-3.5 h-3.5" />
              {elapsed}s
            </span>
          </div>
        </div>

        {/* Puzzle Metadata & Category */}
        <div className="my-5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono font-bold tracking-wider uppercase">
            {puzzle.badge || puzzle.category}
          </span>
          <span className="text-slate-400 font-medium">{puzzle.title}</span>
        </div>

        {/* Puzzle Prompt / Description */}
        <div className="mb-6 p-4 rounded-2xl bg-dark-900/80 border border-cyan-500/20 text-center">
          <p className="text-base sm:text-lg font-medium text-slate-200 leading-relaxed whitespace-pre-line">
            {puzzle.description}
          </p>
          {puzzle.hint && showHint && (
            <p className="mt-2 text-xs text-amber-300 font-mono italic">
              💡 Hint: {puzzle.hint}
            </p>
          )}
        </div>

        {/* Puzzle Interactive Display Area */}
        <div className="my-6">
          {puzzle.gridDisplay && (
            <div className="mx-auto max-w-[280px] sm:max-w-[320px] grid grid-cols-3 gap-2.5 p-4 rounded-2xl bg-dark-900/90 border border-cyan-500/30 shadow-inner">
              {puzzle.gridDisplay.flat().map((cell, idx) => (
                <div
                  key={idx}
                  className={`aspect-square rounded-xl border flex items-center justify-center text-2xl sm:text-3xl font-black transition-all ${
                    cell === '?'
                      ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)] animate-pulse'
                      : 'border-cyan-500/30 bg-slate-900/80 text-cyan-200'
                  }`}
                >
                  {cell}
                </div>
              ))}
            </div>
          )}

          {puzzle.sequenceDisplay && (
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-4">
              {puzzle.sequenceDisplay.map((item, idx) => (
                <div
                  key={idx}
                  className={`min-w-14 sm:min-w-16 px-3.5 py-4 rounded-2xl border text-center font-black text-xl sm:text-2xl shadow-lg transition-all ${
                    item === '?'
                      ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.4)] animate-pulse'
                      : 'border-cyan-500/30 bg-slate-900/90 text-cyan-100'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          )}

          {puzzle.mathDisplay && (
            <div className="mx-auto max-w-md p-5 rounded-2xl bg-dark-900/90 border border-cyan-500/30 text-center font-mono text-lg sm:text-xl font-bold text-cyan-200 leading-loose shadow-inner whitespace-pre-line">
              {puzzle.mathDisplay}
            </div>
          )}

          {puzzle.isMemory && (
            <div className="space-y-4">
              {memoryRevealed ? (
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 text-amber-400 text-sm font-mono font-bold animate-pulse">
                    <Eye className="w-4 h-4" /> Memorize the positions! ({memoryCountdown}s)
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 p-4 rounded-2xl bg-dark-900/90 border border-amber-400/40 shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                    {puzzle.memoryItems.map((sym, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1">
                        <span className="text-[10px] font-mono text-slate-400">#{idx + 1}</span>
                        <div className="w-14 h-14 rounded-xl bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-3xl font-black text-amber-100">
                          {sym}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <p className="text-cyan-300 font-bold text-base">{puzzle.memoryQuestion}</p>
                  <div className="flex flex-wrap justify-center gap-3 p-4 rounded-2xl bg-dark-900/80 border border-cyan-500/20">
                    {puzzle.memoryItems.map((_, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1">
                        <span className="text-[10px] font-mono text-slate-400">#{idx + 1}</span>
                        <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-xl font-black text-slate-400">
                          ?
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Answer Options Area */}
        <div className="space-y-4 mt-6">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 text-center">
            Select Your Answer:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {puzzle.choices.map((choice, idx) => {
              const isSelected = selectedChoice === choice;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedChoice(choice);
                    setFeedback(null);
                  }}
                  disabled={feedback === 'correct' || isTransitioning}
                  className={`p-4 rounded-2xl border text-base sm:text-lg font-bold transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/25 text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.3)] ring-2 ring-amber-400/50'
                      : 'border-slate-800 bg-dark-900/90 hover:bg-dark-850 hover:border-cyan-400/60 text-slate-200'
                  }`}
                >
                  <span className="text-xs font-mono text-slate-500 uppercase mr-1">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <span>{String(choice)}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={() => handleCheckAnswer()}
              disabled={selectedChoice === null || feedback === 'correct' || isTransitioning}
              className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all transform active:scale-95 shadow-neon-cyan flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-dark-950 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Check Answer</span>
            </button>
          </div>
        </div>

        {/* Feedback Alerts */}
        <div className="mt-5 min-h-[56px]">
          {feedback === 'correct' && (
            <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400 text-emerald-200 font-bold text-center animate-in fade-in zoom-in-95 duration-200 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <p className="text-base sm:text-lg">Correct! ✓</p>
                <p className="text-xs font-normal text-emerald-300">
                  Advancing to Level {progress.level + 1}...
                </p>
              </div>
            </div>
          )}

          {feedback === 'wrong' && (
            <div className="flex items-center justify-between p-4 rounded-2xl bg-rose-500/15 border border-rose-500 text-rose-200 font-bold animate-in shake duration-200">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>Incorrect — Try Again</span>
              </div>
              <button
                onClick={() => setFeedback(null)}
                className="text-xs underline text-rose-300 hover:text-white"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>

        {/* Footer Controls: Hint & Restart */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          {puzzle.hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1.5 text-slate-400 hover:text-amber-300 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
            </button>
          )}

          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={handleRestart}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-dark-900/60 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition-all"
              title="Reset progress back to Level 1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Level 1</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
