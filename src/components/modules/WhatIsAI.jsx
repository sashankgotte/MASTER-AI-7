import React, { useState } from 'react';
import { useAgent } from '../../context/AgentContext';
import { useAuth } from '../../context/AuthContext';
import { TOPICS } from '../../data/topicData';
import {
  Brain,
  Sparkles,
  Volume2,
  VolumeX,
  CheckCircle2,
  HelpCircle,
  Award,
  Layers,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import TopicKnowledgeCheck from '../common/TopicKnowledgeCheck';

export default function WhatIsAI({ onNavigate }) {
  const { speak, isMuted } = useAgent();
  const { markTopicComplete } = useAuth();

  const topicInfo = TOPICS.find((t) => t.id === 'what-is-ai');
  const levelData = topicInfo.levels.advanced;

  const [activeTab, setActiveTab] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleVoiceExplain = (text) => {
    speak(text);
  };

  const handleAnswerSelect = (qIdx, optIdx) => {
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    markTopicComplete(1);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    speak("Awesome job completing the Topic 1 knowledge check! You've earned 100 XP.");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Header Banner */}
      <div className="relative rounded-3xl glass-panel-glow border border-cyan-500/40 p-6 md:p-10 overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold">
              <Brain className="w-4 h-4" />
              <span>TOPIC 1 • CORE CONCEPTS</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black font-display text-white">
              WHAT IS <span className="text-gradient-cyan">ARTIFICIAL INTELLIGENCE?</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {levelData.summary}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => handleVoiceExplain(levelData.summary)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold text-xs shadow-neon-cyan transition-all"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear AI Explanation</span>
              </button>
              <span className="text-xs font-mono text-slate-400">
              </span>
            </div>
          </div>

          <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 border-2 border-cyan-400/50 flex items-center justify-center p-4 shadow-neon-cyan flex-shrink-0">
            <Brain className="w-16 h-16 text-cyan-300 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Core Level-Adapted Lesson Pillars */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          Key Pillars of Understanding
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {levelData.keyPoints.map((point, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl glass-panel border border-cyan-500/20 hover:border-cyan-400/60 transition-all group relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {point.title}
                  </h3>
                </div>
                <button
                  onClick={() => handleVoiceExplain(`${point.title}. ${point.desc}`)}
                  className="p-1.5 rounded-lg bg-dark-900 hover:bg-dark-800 text-slate-400 hover:text-cyan-300 border border-cyan-500/20"
                  title="Listen to this section"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Fun Fact / Tech Insight */}
      <div className="p-6 rounded-2xl glass-panel-purple border border-purple-500/30 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center flex-shrink-0">
          <Award className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-purple-300 font-display">
            MASTER AI 7 Insight
          </h4>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
            {levelData.funFact}
          </p>
        </div>
      </div>

      {/* Interactive Concept Quiz */}
      {false && levelData.quiz && levelData.quiz.length > 0 && (
        <div className="p-6 md:p-8 rounded-3xl glass-panel border border-cyan-500/30 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-cyan-400" />
              Topic 1 Knowledge Check
            </h3>
            <span className="px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30">
              +100 XP
            </span>
          </div>

          <div className="space-y-6">
            {levelData.quiz.map((q, qIdx) => {
              const selected = selectedAnswers[qIdx];
              return (
                <div key={qIdx} className="p-4 rounded-xl bg-dark-900/90 border border-cyan-500/20 space-y-3">
                  <div className="text-sm font-bold text-slate-100">
                    {qIdx + 1}. {q.question}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selected === optIdx;
                      const isCorrect = optIdx === q.correct;
                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => handleAnswerSelect(qIdx, optIdx)}
                          className={`p-3 rounded-lg text-xs text-left border transition-all ${
                            quizSubmitted
                              ? isCorrect
                                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 font-bold'
                                : isSelected
                                  ? 'bg-rose-950/80 border-rose-400 text-rose-300'
                                  : 'bg-dark-950 border-dark-800 text-slate-400'
                              : isSelected
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                                : 'bg-dark-950 border-dark-700 text-slate-300 hover:border-cyan-500/40'
                          }`}
                        >
                          <span className="font-mono mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-2.5 rounded-lg bg-dark-950 text-xs text-cyan-300 border border-cyan-500/20 font-mono">
                      💡 {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}

            {!quizSubmitted ? (
              <button
                onClick={handleQuizSubmit}
                disabled={Object.keys(selectedAnswers).length < levelData.quiz.length}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 disabled:opacity-40 text-dark-950 font-bold text-sm shadow-neon-cyan transition-all"
              >
                Submit Knowledge Check
              </button>
            ) : (
              <div className="flex items-center justify-between pt-2">
                <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Topic 1 Completed! +100 XP Earned
                </div>
                <button
                  onClick={() => onNavigate('how-ai-works')}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold text-xs flex items-center gap-1.5 shadow-neon-cyan"
                >
                  <span>Next: Topic 2 — How AI Works</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <TopicKnowledgeCheck topicId="what-is-ai" title="Topic 1 Knowledge Check" />
        </div>
      )}
    </div>
  );
}

