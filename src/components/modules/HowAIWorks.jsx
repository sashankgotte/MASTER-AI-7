import React, { useState, useEffect } from 'react';
import { useAgent } from '../../context/AgentContext';
import { useAuth } from '../../context/AuthContext';
import { TOPICS } from '../../data/topicData';
import {
  Cpu,
  Database,
  Activity,
  Layers,
  CheckCircle,
  Zap,
  TrendingUp,
  Play,
  RotateCcw,
  Volume2,
  Sparkles,
  ArrowRight,
  Sliders,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import TopicKnowledgeCheck from '../common/TopicKnowledgeCheck';

export default function HowAIWorks({ onNavigate }) {
  const { speak } = useAgent();
  const { markTopicComplete } = useAuth();

  const topicInfo = TOPICS.find((t) => t.id === 'how-ai-works');
  const [activeStep, setActiveStep] = useState(0);

  // Interactive Live Pipeline Simulator State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simEpoch, setSimEpoch] = useState(0);
  const [simLoss, setSimLoss] = useState(1.45);
  const [simAccuracy, setSimAccuracy] = useState(48.2);
  const [testInput, setTestInput] = useState('golden_retriever');
  const [predictionResult, setPredictionResult] = useState(null);

  const stages = topicInfo.workflowStages;
  const currentStage = stages[activeStep];

  const handleStepClick = (idx) => {
    setActiveStep(idx);
    const stage = stages[idx];
    const desc = stage.advancedDesc;
    speak(`Step ${stage.step}: ${stage.name}. ${desc}`);
  };

  const runTrainingSimulation = () => {
    setIsSimulating(true);
    setSimEpoch(0);
    setSimLoss(1.45);
    setSimAccuracy(48.2);
    setPredictionResult(null);

    let epoch = 0;
    const interval = setInterval(() => {
      epoch += 1;
      setSimEpoch(epoch);
      setSimLoss(prev => Math.max(0.08, +(prev - 0.12).toFixed(3)));
      setSimAccuracy(prev => Math.min(98.8, +(prev + 4.9).toFixed(1)));

      if (epoch >= 10) {
        clearInterval(interval);
        setIsSimulating(false);
        markTopicComplete(2);
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        speak("Training complete! The neural network achieved 98.8% accuracy. Try running a prediction test below!");
      }
    }, 280);
  };

  const handlePredictTest = () => {
    const isDog = testInput.includes('retriever') || testInput.includes('poodle') || testInput.includes('puppy');
    setPredictionResult({
      label: isDog ? 'Dog (Canis lupus)' : 'Cat (Felis catus)',
      confidence: (96.5 + Math.random() * 3).toFixed(1),
      inferenceTime: (12 + Math.random() * 4).toFixed(0) + 'ms'
    });
    speak(`Prediction output: Detected ${isDog ? 'Dog' : 'Cat'} with over 96 percent confidence!`);
  };

  const STAGE_ICONS = [Database, Activity, Layers, CheckCircle, Zap, TrendingUp];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Header Banner */}
      <div className="relative rounded-3xl glass-panel-glow border border-purple-500/40 p-6 md:p-10 overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400 text-purple-300 text-xs font-mono font-bold">
              <Cpu className="w-4 h-4" />
              <span>TOPIC 2 • THE 6-STAGE AI PIPELINE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            </div>

            <h1 className="text-3xl md:text-5xl font-black font-display text-white">
              HOW AI <span className="text-gradient-purple">ACTUALLY WORKS</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Every artificial intelligence system follows a structured 6-stage lifecycle: from raw dataset ingestion, backpropagation optimization, and frozen model weights, to validation and real-time inference.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => speak(topicInfo.speechIntro)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-dark-950 font-bold text-xs shadow-neon-purple transition-all"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear AI Pipeline Tour</span>
              </button>
            </div>
          </div>

          <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-indigo-600/20 border-2 border-purple-400/50 flex items-center justify-center p-4 shadow-neon-purple flex-shrink-0">
            <Cpu className="w-16 h-16 text-purple-300 animate-spin-slow" />
          </div>
        </div>
      </div>

      {/* 6-Stage Interactive Workflow Visualizer */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
          <Sliders className="w-5 h-5 text-purple-400" />
          Interactive 6-Stage Workflow Pipeline
        </h2>

        {/* Pipeline Stepper Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {stages.map((st, idx) => {
            const Icon = STAGE_ICONS[idx] || Cpu;
            const isActive = activeStep === idx;
            return (
              <button
                key={st.step}
                onClick={() => handleStepClick(idx)}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between h-28 ${
                  isActive
                    ? 'bg-purple-950/80 border-purple-400 shadow-neon-purple scale-105 z-10'
                    : 'bg-dark-900/80 border-cyan-500/20 hover:border-purple-500/40 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`w-5 h-5 rounded-md text-[10px] font-mono font-bold flex items-center justify-center ${isActive ? 'bg-purple-400 text-dark-950' : 'bg-dark-950 text-slate-400'}`}>
                    {st.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-300 animate-pulse' : 'text-slate-400'}`} />
                </div>
                <div className="text-xs font-bold text-slate-100 line-clamp-2 mt-2">
                  {st.name}
                </div>
                {isActive && (
                  <div className="w-full h-1 bg-purple-400 rounded-full mt-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Panel */}
        <div className="p-6 md:p-8 rounded-3xl glass-panel border border-purple-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400 text-purple-300 font-mono font-bold text-sm flex items-center justify-center">
                {currentStage.step}
              </span>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Stage {currentStage.step}: {currentStage.name}
                </h3>
                <span className="text-[11px] font-mono text-cyan-400">
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                const desc = currentStage.advancedDesc;
                speak(`Stage ${currentStage.step}: ${currentStage.name}. ${desc}`);
              }}
              className="p-2 rounded-xl bg-dark-900 hover:bg-dark-800 text-purple-300 border border-purple-500/30"
              title="Speak stage explanation"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-dark-950/80 border border-purple-500/20 text-sm text-slate-200 leading-relaxed font-sans">
            <p><strong>Engineering & Math:</strong> {currentStage.advancedDesc}</p>
          </div>
        </div>
      </div>

      {/* Live Interactive Neural Training & Inference Simulator */}
      <div className="p-6 md:p-8 rounded-3xl glass-panel-glow border border-purple-500/40 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400 animate-pulse" />
              Live Interactive AI Simulator
            </h3>
            <p className="text-xs text-slate-400">
              Run real-time simulated training epochs and test the resulting inference classifier!
            </p>
          </div>

          <button
            onClick={runTrainingSimulation}
            disabled={isSimulating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 text-white font-bold text-xs shadow-neon-purple disabled:opacity-50 transition-all"
          >
            {isSimulating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Optimizing Weights (Epoch {simEpoch}/10)...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>{simEpoch === 10 ? 'Retrain Model' : 'Start Epoch Training'}</span>
              </>
            )}
          </button>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-dark-950 border border-purple-500/20">
            <span className="text-xs font-mono text-slate-400">Current Epoch</span>
            <div className="text-2xl font-black font-mono text-purple-400 mt-1">
              {simEpoch} / 10
            </div>
            <div className="w-full h-1.5 bg-dark-800 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all duration-300"
                style={{ width: `${(simEpoch / 10) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-dark-950 border border-purple-500/20">
            <span className="text-xs font-mono text-slate-400">Loss L(θ)</span>
            <div className="text-2xl font-black font-mono text-rose-400 mt-1">
              {simLoss}
            </div>
            <span className="text-[10px] font-mono text-emerald-400">
              {simEpoch > 0 ? '↓ Decreasing error' : 'Initial loss baseline'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-dark-950 border border-purple-500/20">
            <span className="text-xs font-mono text-slate-400">Validation Accuracy</span>
            <div className="text-2xl font-black font-mono text-emerald-400 mt-1">
              {simAccuracy}%
            </div>
            <span className="text-[10px] font-mono text-cyan-400">
              {simAccuracy > 90 ? '✨ Converged High Precision' : 'Underfitting phase'}
            </span>
          </div>
        </div>

        {/* Live Inference Sandbox */}
        {simEpoch === 10 && (
          <div className="p-5 rounded-2xl bg-dark-950 border border-cyan-500/30 space-y-4 animate-in fade-in duration-300">
            <h4 className="text-sm font-bold text-cyan-300 font-mono uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Stage 5 & 6: Test Unseen Input On Trained Model
            </h4>

            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <select
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                className="w-full sm:w-64 px-3 py-2.5 rounded-xl bg-dark-900 border border-cyan-500/30 text-xs text-slate-200 focus:outline-none"
              >
                <option value="golden_retriever">Test Sample 1: Golden Retriever Dog Image</option>
                <option value="siamese_cat">Test Sample 2: Siamese Cat Image</option>
                <option value="poodle_puppy">Test Sample 3: Poodle Puppy Image</option>
                <option value="persian_cat">Test Sample 4: Persian Longhair Cat Image</option>
              </select>

              <button
                onClick={handlePredictTest}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold text-xs shadow-neon-cyan transition-all"
              >
                Run Prediction Inference
              </button>
            </div>

            {predictionResult && (
              <div className="p-4 rounded-xl bg-cyan-950/60 border border-cyan-400/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
                <div>
                  <span className="text-slate-400">Class Output: </span>
                  <strong className="text-cyan-300 text-sm">{predictionResult.label}</strong>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <span>Confidence: <strong className="text-emerald-400">{predictionResult.confidence}%</strong></span>
                  <span>Latency: <strong className="text-purple-300">{predictionResult.inferenceTime}</strong></span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <TopicKnowledgeCheck topicId="how-ai-works" title="Topic 2 Knowledge Check" />

      {/* Next Topic Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => onNavigate('what-is-ai')}
          className="px-4 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 text-xs border border-cyan-500/20"
        >
          ← Previous: Topic 1 What is AI
        </button>
        <button
          onClick={() => onNavigate('prompt-engineering')}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold text-xs flex items-center gap-1.5 shadow-neon-cyan"
        >
          <span>Next: Topic 3 — Prompt Engineering</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

