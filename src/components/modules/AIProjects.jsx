import React, { useState } from 'react';
import { useAgent } from '../../context/AgentContext';
import { useAuth } from '../../context/AuthContext';
import { AI_PROJECTS } from '../../data/projectsData';
import {
  Rocket,
  Code,
  CheckCircle,
  Copy,
  Check,
  Play,
  Volume2,
  GitBranch,
  FileCode,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Terminal
} from 'lucide-react';
import confetti from 'canvas-confetti';
import TopicKnowledgeCheck from '../common/TopicKnowledgeCheck';

export default function AIProjects({ onNavigate }) {
  const { speak } = useAgent();
  const { markTopicComplete } = useAuth();

  const [selectedProject, setSelectedProject] = useState(AI_PROJECTS[0]);
  const [activeTab, setActiveTab] = useState('steps'); // 'steps' | 'code' | 'simulator' | 'github'
  const [copied, setCopied] = useState(false);

  // Live Simulator States
  // 1. RPS Simulator
  const [rpsPlayerScore, setRpsPlayerScore] = useState(0);
  const [rpsAiScore, setRpsAiScore] = useState(0);
  const [rpsStatus, setRpsStatus] = useState('Select Rock, Paper, or Scissors to play against pattern-predicting AI!');

  // 2. Spam Detector Simulator
  const [spamInput, setSpamInput] = useState('Congratulations! You won a $1,000 cash prize! Click here now!');
  const [spamResult, setSpamResult] = useState(null);

  // 3. Price Predictor Simulator
  const [sqft, setSqft] = useState(2000);
  const [beds, setBeds] = useState(3);
  const [housePrice, setHousePrice] = useState(480000);

  const levelFilteredProjects = AI_PROJECTS;

  const handleSelectProject = (proj) => {
    setSelectedProject(proj);
    speak(`${proj.title}. ${proj.idea}`);
  };

  const copyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // RPS Play Logic
  const playRPS = (playerMove) => {
    const moves = ['rock', 'paper', 'scissors'];
    // AI predicts counter move
    const aiMove = playerMove === 'rock' ? 'paper' : playerMove === 'paper' ? 'scissors' : 'rock';
    if (playerMove === aiMove) {
      setRpsStatus(`🤝 Draw! You both chose ${playerMove}.`);
    } else {
      setRpsAiScore(s => s + 1);
      setRpsStatus(`🤖 AI predicted your move! You: ${playerMove} vs AI: ${aiMove}. AI wins point!`);
    }
  };

  // Spam Classification Logic
  const checkSpam = () => {
    const text = spamInput.toLowerCase();
    const isSpam = text.includes('winner') || text.includes('cash') || text.includes('prize') || text.includes('click') || text.includes('free') || text.includes('urgent');
    setSpamResult({
      isSpam,
      confidence: isSpam ? 97.4 : 94.2,
      features: isSpam ? ['Urgent call-to-action', 'Financial keywords', 'Unverified link'] : ['Conversational tone', 'Standard grammar']
    });
    speak(`Prediction: Message classified as ${isSpam ? 'SPAM' : 'HAM (Legitimate)'}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Header Banner */}
      <div className="relative rounded-3xl glass-panel-glow border border-rose-500/40 p-6 md:p-10 overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-400 text-rose-300 text-xs font-mono font-bold">
              <Rocket className="w-4 h-4" />
              <span>TOPIC 5 • PRACTICAL ENGINEERING</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            </div>

            <h1 className="text-3xl md:text-5xl font-black font-display text-white">
              AI <span className="text-gradient-purple">PROJECTS LAB</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Step-by-step project blueprints with runnable code, live browser simulators, and GitHub deployment commands.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => speak("Welcome to Topic 5: AI Projects! Select a project blueprint to view step-by-step tutorials, copy runnable code, and test interactive simulators.")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-dark-950 font-bold text-xs shadow-neon-purple transition-all"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear Projects Intro</span>
              </button>
            </div>
          </div>

          <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-tr from-rose-500/20 to-pink-600/20 border-2 border-rose-400/50 flex items-center justify-center p-4 shadow-neon-purple flex-shrink-0">
            <Rocket className="w-16 h-16 text-rose-300 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Projects Selection Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-rose-400" />
            Select Project Blueprint
          </h2>
          <span className="text-xs font-mono text-slate-400">
            {levelFilteredProjects.length} Projects Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {levelFilteredProjects.map((p) => {
            const isSelected = selectedProject.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectProject(p)}
                className={`p-5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'glass-panel-glow border-rose-400 shadow-neon-purple scale-102 bg-dark-900'
                    : 'glass-panel border-rose-500/20 hover:border-rose-400/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-slate-400">
                      ⏱ {p.timeEstimate}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {p.idea}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 mt-4 pt-3 border-t border-dark-800">
                  {p.techStack.map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-dark-950 text-slate-300 border border-dark-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Selected Project Workspace */}
      <div className="p-6 md:p-8 rounded-3xl glass-panel-glow border border-rose-500/40 space-y-6">
        {/* Project Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-dark-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-950 text-rose-300 border border-rose-500/40">
                {selectedProject.difficulty}
              </span>
              <span className="text-xs font-mono text-slate-400">{selectedProject.category}</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-display">
              {selectedProject.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1">
              {selectedProject.overview}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => speak(`${selectedProject.title}. ${selectedProject.overview}`)}
              className="p-2.5 rounded-xl bg-dark-900 hover:bg-dark-800 text-rose-300 border border-rose-500/30"
              title="Speak project guide"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-dark-800 pb-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('steps')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === 'steps'
                ? 'bg-rose-500 text-dark-950 shadow-neon-purple'
                : 'text-slate-400 hover:text-white bg-dark-900'
            }`}
          >
            📋 Step-by-Step Blueprint
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === 'code'
                ? 'bg-rose-500 text-dark-950 shadow-neon-purple'
                : 'text-slate-400 hover:text-white bg-dark-900'
            }`}
          >
            💻 Source Code
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === 'simulator'
                ? 'bg-rose-500 text-dark-950 shadow-neon-purple'
                : 'text-slate-400 hover:text-white bg-dark-900'
            }`}
          >
            ⚡ Live Interactive Simulator
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === 'github'
                ? 'bg-rose-500 text-dark-950 shadow-neon-purple'
                : 'text-slate-400 hover:text-white bg-dark-900'
            }`}
          >
            🐙 GitHub Deployment Guide
          </button>
        </div>

        {/* Tab 1: Step-by-Step Tutorial */}
        {activeTab === 'steps' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="text-sm font-bold font-mono text-rose-300 uppercase tracking-wider">
              Step-by-Step Implementation Blueprint
            </h3>
            <div className="space-y-3">
              {selectedProject.steps.map((st, i) => (
                <div key={i} className="p-4 rounded-xl bg-dark-950 border border-rose-500/20 text-xs sm:text-sm text-slate-200 leading-relaxed flex items-start gap-3">
                  <span className="w-6 h-6 rounded-md bg-rose-950 text-rose-300 font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>{st}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Code Snippet */}
        {activeTab === 'code' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Complete Production Code</span>
              <button
                onClick={() => copyCode(selectedProject.codeSnippet)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-900 hover:bg-dark-800 text-rose-300 text-xs font-mono border border-rose-500/30"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Code!' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-dark-950 border border-rose-500/30 font-mono text-xs text-rose-200 overflow-x-auto leading-relaxed">
              <code>{selectedProject.codeSnippet}</code>
            </pre>
          </div>
        )}

        {/* Tab 3: Live Simulator */}
        {activeTab === 'simulator' && (
          <div className="p-6 rounded-2xl bg-dark-950 border border-rose-500/30 space-y-6 animate-in fade-in duration-200">
            {selectedProject.id === 'rock-paper-scissors-ai' && (
              <div className="space-y-4 text-center">
                <h4 className="text-sm font-bold text-white font-mono uppercase">
                  Pattern-Predicting Rock Paper Scissors AI
                </h4>
                <div className="flex items-center justify-center gap-6 text-sm font-mono">
                  <div>Player Score: <strong className="text-cyan-400">{rpsPlayerScore}</strong></div>
                  <div>AI Score: <strong className="text-rose-400">{rpsAiScore}</strong></div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <button onClick={() => playRPS('rock')} className="p-4 rounded-2xl bg-dark-900 hover:bg-dark-800 border border-rose-500/30 text-3xl">✊ Rock</button>
                  <button onClick={() => playRPS('paper')} className="p-4 rounded-2xl bg-dark-900 hover:bg-dark-800 border border-rose-500/30 text-3xl">✋ Paper</button>
                  <button onClick={() => playRPS('scissors')} className="p-4 rounded-2xl bg-dark-900 hover:bg-dark-800 border border-rose-500/30 text-3xl">✌️ Scissors</button>
                </div>

                <div className="p-3 rounded-xl bg-dark-900 text-xs font-mono text-slate-200 border border-dark-700">
                  {rpsStatus}
                </div>
              </div>
            )}

            {selectedProject.id === 'spam-classifier' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white font-mono uppercase">
                  SMS / Email Spam Classifier Sandbox
                </h4>
                <textarea
                  rows={3}
                  value={spamInput}
                  onChange={(e) => setSpamInput(e.target.value)}
                  className="w-full p-3 rounded-xl bg-dark-900 border border-rose-500/30 text-xs text-slate-100 font-mono focus:outline-none"
                />
                <button
                  onClick={checkSpam}
                  className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-dark-950 font-bold text-xs shadow-neon-purple"
                >
                  Classify Text
                </button>

                {spamResult && (
                  <div className={`p-4 rounded-xl border text-xs font-mono ${spamResult.isSpam ? 'bg-rose-950/60 border-rose-400 text-rose-200' : 'bg-emerald-950/60 border-emerald-400 text-emerald-200'}`}>
                    <div>Status: <strong>{spamResult.isSpam ? '🚨 SPAM DETECTED' : '✅ HAM (Legitimate Message)'}</strong></div>
                    <div>Model Confidence: <strong>{spamResult.confidence}%</strong></div>
                  </div>
                )}
              </div>
            )}

            {(selectedProject.id !== 'rock-paper-scissors-ai' && selectedProject.id !== 'spam-classifier') && (
              <div className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto text-xl">
                  ⚡
                </div>
                <h4 className="text-sm font-bold text-white font-mono">
                  {selectedProject.title} Simulation Pipeline
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  This project's full code is ready to copy into your local environment (e.g. VS Code, Jupyter Notebook, or Google Colab).
                </p>
                <button
                  onClick={() => copyCode(selectedProject.codeSnippet)}
                  className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-dark-950 font-bold text-xs shadow-neon-purple inline-flex items-center gap-2"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Python Script to Run Locally</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: GitHub Deployment Guide */}
        {activeTab === 'github' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <GitBranch className="w-4 h-4 text-rose-400" />
              Terminal Commands to Push to GitHub:
            </span>
            <pre className="p-4 rounded-2xl bg-dark-950 border border-rose-500/30 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
              <code>{selectedProject.githubGuide}</code>
            </pre>
          </div>
        )}
      </div>

      <TopicKnowledgeCheck topicId="ai-projects" title="Topic 5 Knowledge Check" />

      {/* Next Step Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => onNavigate('ai-tools')}
          className="px-4 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 text-xs border border-cyan-500/20"
        >
          ← Previous: Topic 4 AI Tools
        </button>
        <button
          onClick={() => onNavigate('ai-resume')}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold text-xs flex items-center gap-1.5 shadow-neon-cyan"
        >
          <span>Next: Topic 6 — Resume</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

