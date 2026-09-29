import React, { useState, useEffect } from 'react';
import {
  Brain,
  BrainCircuit,
  Compass,
  Zap,
  Sparkles,
  ChevronRight,
  Flame,
  Award,
  Layers,
  ArrowLeft,
  Play
} from 'lucide-react';
import ExistingPuzzleGame from './ExistingPuzzleGame';
import NeuralMatrixGame from './NeuralMatrixGame';
import SpatialRotationGame from './SpatialRotationGame';

export default function IQGamesSection() {
  // activeGame: null (Hub with 3 cards) | 'puzzle' | 'neural_matrix' | 'spatial_rotation'
  const [activeGame, setActiveGame] = useState(null);

  // Read saved progress from localStorage for cards display
  const [progressData, setProgressData] = useState({
    puzzle: { level: 1, score: 0 },
    neuralMatrix: { level: 1, highestLevel: 1, score: 0 },
    spatialRotation: { level: 1, highestLevel: 1, score: 0 }
  });

  const loadAllProgress = () => {
    try {
      const pz = JSON.parse(localStorage.getItem('master_ai_7_puzzle_progress') || '{}');
      const nm = JSON.parse(localStorage.getItem('master_ai_7_neural_matrix_progress') || '{}');
      const sr = JSON.parse(localStorage.getItem('master_ai_7_spatial_rotation_progress') || '{}');

      setProgressData({
        puzzle: {
          level: Math.max(1, Number(pz.level) || 1),
          score: Math.max(0, Number(pz.score) || 0)
        },
        neuralMatrix: {
          level: Math.max(1, Number(nm.level) || 1),
          highestLevel: Math.max(1, Number(nm.highestLevel) || 1),
          score: Math.max(0, Number(nm.totalScore) || 0)
        },
        spatialRotation: {
          level: Math.max(1, Number(sr.level) || 1),
          highestLevel: Math.max(1, Number(sr.highestLevel) || 1),
          score: Math.max(0, Number(sr.totalScore) || 0)
        }
      });
    } catch (e) {
      console.warn('Could not read game progress:', e);
    }
  };

  useEffect(() => {
    loadAllProgress();
  }, [activeGame]);

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 md:py-12 select-none space-y-8">
      {/* Arena Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold uppercase tracking-[0.25em]">
          <Brain className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>IQ GAMES ARENA</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-white">
          IQ <span className="text-gradient-cyan">GAMES</span>
        </h1>
        <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
          Three dedicated infinite brain-training games designed to sharpen logic, working memory, and 3D spatial reasoning.
        </p>
      </div>

      {/* Quick Navigation Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setActiveGame(null)}
          className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
            activeGame === null
              ? 'bg-cyan-500 text-dark-950 border-cyan-400 shadow-neon-cyan'
              : 'bg-dark-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-cyan-500/40'
          }`}
        >
          All Games (3)
        </button>

        <button
          onClick={() => setActiveGame('puzzle')}
          className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeGame === 'puzzle'
              ? 'bg-amber-500 text-dark-950 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
              : 'bg-dark-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-amber-400/40'
          }`}
        >
          <Brain className="w-3.5 h-3.5" />
          <span>1. Puzzle Game</span>
        </button>

        <button
          onClick={() => setActiveGame('neural_matrix')}
          className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeGame === 'neural_matrix'
              ? 'bg-cyan-400 text-dark-950 border-cyan-300 shadow-neon-cyan'
              : 'bg-dark-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-cyan-400/40'
          }`}
        >
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>2. Neural Matrix</span>
        </button>

        <button
          onClick={() => setActiveGame('spatial_rotation')}
          className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeGame === 'spatial_rotation'
              ? 'bg-purple-400 text-dark-950 border-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
              : 'bg-dark-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-purple-400/40'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>3. Spatial Rotation</span>
        </button>
      </div>

      {/* ==================================================== */}
      {/* 3 GAME CARDS (HUB VIEW)                             */}
      {/* ==================================================== */}
      {activeGame === null && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
          {/* CARD 1: EXISTING PUZZLE GAME (KEPT 100% INTACT) */}
          <article className="group relative overflow-hidden rounded-3xl glass-panel-glow border border-amber-500/30 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/60 shadow-xl">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl bg-amber-500/15 pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-transform group-hover:scale-105">
                  <Brain className="w-7 h-7" />
                </div>
                <span className="px-2.5 py-1 rounded-full border border-amber-400/30 bg-amber-500/10 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                  Infinite
                </span>
              </div>

              <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-amber-400">
                  EXISTING GAME • LOGIC
                </p>
                <h3 className="mt-1 text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                  PUZZLE
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300 min-h-[48px]">
                  11 procedural challenge types including sequences, matrix logic, symbol algebra, and lateral brain teasers.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-dark-900/80 border border-slate-800">
                  <span className="text-[9px] uppercase text-slate-500 block">Current Level</span>
                  <strong className="text-amber-300 font-black text-sm">LEVEL {progressData.puzzle.level}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-dark-900/80 border border-slate-800">
                  <span className="text-[9px] uppercase text-slate-500 block">Total Score</span>
                  <strong className="text-slate-200 font-black text-sm">{progressData.puzzle.score.toLocaleString()}</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveGame('puzzle')}
              className="mt-6 w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-dark-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all transform active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>PLAY NOW</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </article>

          {/* CARD 2: NEW IQ GAME 1 (NEURAL MATRIX) */}
          <article className="group relative overflow-hidden rounded-3xl glass-panel-glow border border-cyan-500/30 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300/60 shadow-xl">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl bg-cyan-500/15 pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-neon-cyan transition-transform group-hover:scale-105">
                  <BrainCircuit className="w-7 h-7" />
                </div>
                <span className="px-2.5 py-1 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                  New Game 1
                </span>
              </div>

              <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-cyan-400">
                  NEW GAME 1 • MEMORY
                </p>
                <h3 className="mt-1 text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                  Neural Matrix
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300 min-h-[48px]">
                  Memorize the illuminated neural nodes in the grid, then recreate the pattern from memory as the matrix expands.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-dark-900/80 border border-slate-800">
                  <span className="text-[9px] uppercase text-slate-500 block">Current Level</span>
                  <strong className="text-cyan-300 font-black text-sm">LEVEL {progressData.neuralMatrix.level}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-dark-900/80 border border-slate-800">
                  <span className="text-[9px] uppercase text-slate-500 block">Highest Level</span>
                  <strong className="text-slate-200 font-black text-sm">LEVEL {progressData.neuralMatrix.highestLevel}</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveGame('neural_matrix')}
              className="mt-6 w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-dark-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-neon-cyan transition-all transform active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>PLAY NOW</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </article>

          {/* CARD 3: NEW IQ GAME 2 (SPATIAL ROTATION) */}
          <article className="group relative overflow-hidden rounded-3xl glass-panel-glow border border-purple-500/30 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-300/60 shadow-xl">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl bg-purple-500/15 pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-400/50 flex items-center justify-center text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-transform group-hover:scale-105">
                  <Compass className="w-7 h-7" />
                </div>
                <span className="px-2.5 py-1 rounded-full border border-purple-400/30 bg-purple-500/10 text-purple-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                  New Game 2
                </span>
              </div>

              <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-purple-400">
                  NEW GAME 2 • SPATIAL
                </p>
                <h3 className="mt-1 text-2xl font-black text-white group-hover:text-purple-300 transition-colors">
                  Spatial Rotation
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300 min-h-[48px]">
                  Exercise your 3D spatial intellect by identifying the true rotated geometry and perspective symmetry.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-dark-900/80 border border-slate-800">
                  <span className="text-[9px] uppercase text-slate-500 block">Current Level</span>
                  <strong className="text-purple-300 font-black text-sm">LEVEL {progressData.spatialRotation.level}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-dark-900/80 border border-slate-800">
                  <span className="text-[9px] uppercase text-slate-500 block">Highest Level</span>
                  <strong className="text-slate-200 font-black text-sm">LEVEL {progressData.spatialRotation.highestLevel}</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveGame('spatial_rotation')}
              className="mt-6 w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-400 hover:to-cyan-300 text-dark-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all transform active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>PLAY NOW</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </article>
        </div>
      )}

      {/* ==================================================== */}
      {/* DEDICATED GAME SCREENS                              */}
      {/* ==================================================== */}
      {activeGame === 'puzzle' && (
        <div className="animate-in fade-in duration-300">
          <ExistingPuzzleGame onBack={() => setActiveGame(null)} />
        </div>
      )}

      {activeGame === 'neural_matrix' && (
        <div className="animate-in fade-in duration-300">
          <NeuralMatrixGame onBack={() => setActiveGame(null)} />
        </div>
      )}

      {activeGame === 'spatial_rotation' && (
        <div className="animate-in fade-in duration-300">
          <SpatialRotationGame onBack={() => setActiveGame(null)} />
        </div>
      )}

      {/* Feature notice */}
      <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-2 font-mono pt-4">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>Infinite Procedural IQ Games • Progress saved locally • No hardcoded level cap</span>
      </div>
    </section>
  );
}
