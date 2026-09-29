import React, { useState } from 'react';
import { useAgent } from '../../context/AgentContext';
import { useAuth } from '../../context/AuthContext';
import { TOPICS } from '../../data/topicData';
import { evaluatePrompt } from '../../utils/aiEngine';
import {
  Terminal,
  Sparkles,
  CheckCircle2,
  XCircle,
  Volume2,
  ArrowRight,
  Code,
  Zap,
  Check,
  Send,
  Layers,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import TopicKnowledgeCheck from '../common/TopicKnowledgeCheck';

export default function PromptEngineering({ onNavigate }) {
  const { speak } = useAgent();
  const { markTopicComplete } = useAuth();

  const topicInfo = TOPICS.find((t) => t.id === 'prompt-engineering');

  // Custom User Prompt Sandbox state
  const [userPrompt, setUserPrompt] = useState(
    'You are an AI teacher. Explain Artificial Intelligence to a beginner using simple English and 3 real-life examples.'
  );
  const [evaluation, setEvaluation] = useState(() => evaluatePrompt(userPrompt));
  const [activeComparisonTab, setActiveComparisonTab] = useState(0);

  const handleEvaluate = (e) => {
    if (e) e.preventDefault();
    const result = evaluatePrompt(userPrompt);
    setEvaluation(result);
    markTopicComplete(3);

    if (result.score >= 80) {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      speak(`Excellent prompt! It scored ${result.score} out of 100 on our engineering framework.`);
    } else {
      speak(`Your prompt scored ${result.score} out of 100. Check the suggestions to make it even more powerful!`);
    }
  };

  const sampleTemplates = [
    {
      title: 'Homework Helper',
      prompt: 'Act as a fun 8th-grade science teacher. Explain Newton’s 3 Laws of Motion using soccer analogies and bullet points under 150 words.'
    },
    {
      title: 'Python Debugger',
      prompt: 'You are a Python mentor. Review this loop function, explain the logic error step-by-step, and provide the fixed code with docstrings.'
    },
    {
      title: 'Machine Learning Architect',
      prompt: 'Act as a Senior ML Engineer at Google. Compare ResNet-50 vs Vision Transformers for medical X-ray classification across accuracy, latency, and VRAM overhead.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Header Banner */}
      <div className="relative rounded-3xl glass-panel-glow border border-emerald-500/40 p-6 md:p-10 overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400 text-emerald-300 text-xs font-mono font-bold">
              <Terminal className="w-4 h-4" />
              <span>TOPIC 3 • MASTERCLASS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>

            <h1 className="text-3xl md:text-5xl font-black font-display text-white">
              PROMPT <span className="text-gradient-neon">ENGINEERING</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Prompt Engineering is the high-leverage skill of designing precision instructions, persona constraints, and context for Large Language Models to produce high-value outputs.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => speak(topicInfo.speechIntro)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs shadow-neon-green transition-all"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear AI Masterclass Intro</span>
              </button>
            </div>
          </div>

          <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-600/20 border-2 border-emerald-400/50 flex items-center justify-center p-4 shadow-neon-green flex-shrink-0">
            <Terminal className="w-16 h-16 text-emerald-300 animate-pulse" />
          </div>
        </div>
      </div>

      {/* 5 Core Pillars of a Great Prompt */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-400" />
          The 5 Pillars of High-Precision Prompts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {topicInfo.pillars.map((p, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl glass-panel border border-emerald-500/20 hover:border-emerald-400 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="w-6 h-6 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold flex items-center justify-center mb-2">
                  0{idx + 1}
                </span>
                <h4 className="text-sm font-bold text-white mb-1">{p.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bad Prompt vs Good Prompt Interactive Demonstration */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          Bad Prompt vs Good Prompt Live Comparison
        </h2>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {topicInfo.comparisons.map((c, idx) => (
            <button
              key={idx}
              onClick={() => setActiveComparisonTab(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
                activeComparisonTab === idx
                  ? 'bg-emerald-500 text-dark-950 shadow-neon-green'
                  : 'bg-dark-900 text-slate-400 hover:text-slate-200 border border-cyan-500/20'
              }`}
            >
              Scenario {idx + 1}: {c.title}
            </button>
          ))}
        </div>

        {/* Side by side cards */}
        {(() => {
          const comp = topicInfo.comparisons[activeComparisonTab];
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bad Prompt Card */}
              <div className="p-6 rounded-3xl bg-rose-950/20 border border-rose-500/40 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-rose-950 text-rose-300 text-xs font-mono font-bold flex items-center gap-1 border border-rose-500/40">
                    <XCircle className="w-3.5 h-3.5" />
                    BAD PROMPT (Vague & Weak)
                  </span>
                  <button
                    onClick={() => speak(`Bad prompt example: ${comp.bad}. Why it fails: ${comp.badWhy}`)}
                    className="p-1.5 rounded-lg bg-dark-900 text-rose-300 border border-rose-500/30"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-dark-950 font-mono text-xs text-rose-300 border border-rose-900/50">
                  “{comp.bad}”
                </div>

                <div className="text-xs text-slate-300 leading-relaxed space-y-1">
                  <strong className="text-rose-400 font-mono">Why this fails:</strong>
                  <p>{comp.badWhy}</p>
                </div>
              </div>

              {/* Good Prompt Card */}
              <div className="p-6 rounded-3xl bg-emerald-950/20 border border-emerald-500/40 space-y-4 shadow-neon-green">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1 border border-emerald-500/40">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    GOOD PROMPT (High-Precision)
                  </span>
                  <button
                    onClick={() => speak(`Good prompt example: ${comp.good}. Why it works: ${comp.goodWhy}`)}
                    className="p-1.5 rounded-lg bg-dark-900 text-emerald-300 border border-emerald-500/30"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-dark-950 font-mono text-xs text-emerald-300 border border-emerald-500/40">
                  “{comp.good}”
                </div>

                <div className="text-xs text-slate-300 leading-relaxed space-y-1">
                  <strong className="text-emerald-400 font-mono">Why this succeeds:</strong>
                  <p>{comp.goodWhy}</p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Live AI Prompt Evaluation Sandbox */}
      <div className="p-6 md:p-8 rounded-3xl glass-panel-glow border border-emerald-500/40 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              Interactive Prompt Evaluation Sandbox
            </h3>
            <p className="text-xs text-slate-400">
              Type or paste your prompt below to have our AI Agent grade it across the 5 pillars!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Templates:</span>
            {sampleTemplates.map((t, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setUserPrompt(t.prompt);
                  const res = evaluatePrompt(t.prompt);
                  setEvaluation(res);
                }}
                className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-dark-900 hover:bg-emerald-950 border border-emerald-500/20 text-[11px] text-slate-300 font-mono"
              >
                {t.title}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleEvaluate} className="space-y-3">
          <textarea
            rows={4}
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Type your prompt here (e.g., 'You are a data science teacher. Explain gradient descent to beginners using 2 analogies and bullet points under 100 words.')..."
            className="w-full p-4 rounded-2xl bg-dark-950 border border-emerald-500/30 text-slate-100 text-sm focus:outline-none focus:border-emerald-400 font-mono"
          />

          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">
              Length: {userPrompt.length} chars
            </span>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-dark-950 font-bold text-xs shadow-neon-green flex items-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Evaluate & Run Prompt</span>
            </button>
          </div>
        </form>

        {/* Real-Time Evaluation Dashboard */}
        {evaluation && (
          <div className="p-6 rounded-2xl bg-dark-950 border border-emerald-500/30 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-dark-800">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-dark-900 border-2 border-emerald-400 flex flex-col items-center justify-center text-emerald-300 shadow-neon-green">
                  <span className="text-2xl font-black font-mono">{evaluation.score}</span>
                  <span className="text-[9px] font-mono text-slate-400 uppercase">Score / 100</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display">Prompt Precision Rating</h4>
                  <p className="text-xs text-slate-300 mt-0.5">{evaluation.critique}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {Object.entries(evaluation.breakdown).map(([key, val]) => (
                  <span
                    key={key}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 border ${
                      val
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-400'
                        : 'bg-dark-900 text-slate-400 border-dark-700'
                    }`}
                  >
                    {val ? <Check className="w-3 h-3 text-emerald-400" /> : <XCircle className="w-3 h-3 text-slate-500" />}
                    {key.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Generated AI Response to Prompt */}
            {evaluation.sampleResponse && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Live AI Generated Response:
                  </span>
                  <button
                    onClick={() => speak(evaluation.sampleResponse)}
                    className="p-1.5 rounded-lg bg-dark-900 text-cyan-300 border border-cyan-500/20 text-xs flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen</span>
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-dark-900/90 border border-cyan-500/20 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {evaluation.sampleResponse}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <TopicKnowledgeCheck topicId="prompt-engineering" title="Topic 3 Knowledge Check" />

      {/* Next Step */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => onNavigate('how-ai-works')}
          className="px-4 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 text-xs border border-cyan-500/20"
        >
          ← Previous: Topic 2 How AI Works
        </button>
        <button
          onClick={() => onNavigate('ai-tools')}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold text-xs flex items-center gap-1.5 shadow-neon-cyan"
        >
          <span>Next: Topic 4 — AI Tools Directory</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

