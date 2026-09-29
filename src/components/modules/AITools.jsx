import React, { useState } from 'react';
import { useAgent } from '../../context/AgentContext';
import { useAuth } from '../../context/AuthContext';
import { TOOL_CATEGORIES, AI_TOOLS } from '../../data/toolsData';
import { recommendAITools } from '../../utils/aiEngine';
import {
  Grid,
  Search,
  Sparkles,
  ExternalLink,
  Volume2,
  Filter,
  ArrowRight,
  Bot,
  Star,
  CheckCircle,
  HelpCircle,
  X
} from 'lucide-react';
import TopicKnowledgeCheck from '../common/TopicKnowledgeCheck';

export default function AITools({ onNavigate }) {
  const { speak } = useAgent();
  const { markTopicComplete } = useAuth();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedToolModal, setSelectedToolModal] = useState(null);

  // AI Tool Recommender Assistant State
  const [recommenderQuery, setRecommenderQuery] = useState('');
  const [recommendationResult, setRecommendationResult] = useState(null);

  const filteredTools = AI_TOOLS.filter((tool) => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.useCase.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenTool = (tool) => {
    setSelectedToolModal(tool);
    speak(`${tool.name}. ${tool.beginnerExplanation}`);
  };

  const handleRecommend = (e) => {
    e.preventDefault();
    if (!recommenderQuery.trim()) return;
    const rec = recommendAITools(recommenderQuery);
    setRecommendationResult(rec);
    markTopicComplete(4);
    speak(`I recommend using ${rec.primary} for ${rec.category}. ${rec.why}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Header Banner */}
      <div className="relative rounded-3xl glass-panel-glow border border-amber-500/40 p-6 md:p-10 overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-400 text-amber-300 text-xs font-mono font-bold">
              <Grid className="w-4 h-4" />
              <span>TOPIC 4 • CURATED DIRECTORY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>

            <h1 className="text-3xl md:text-5xl font-black font-display text-white">
              AI TOOLS & <span className="text-gradient-gold">APPLICATIONS</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Explore the premier directory of AI applications across Chatbots, Image Creation, Cinematic Video, Full-Stack Coding, Presentations, Study, and Productivity.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => speak("Welcome to Topic 4: AI Tools & Applications! Explore the top tools for every task, or ask me for a personalized tool recommendation.")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold text-xs shadow-neon-amber transition-all"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear AI Directory Intro</span>
              </button>
            </div>
          </div>

          <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-600/20 border-2 border-amber-400/50 flex items-center justify-center p-4 shadow-neon-amber flex-shrink-0">
            <Grid className="w-16 h-16 text-amber-300 animate-pulse" />
          </div>
        </div>
      </div>

      {/* AI Tool Recommendation Assistant */}
      <div className="p-6 md:p-8 rounded-3xl glass-panel border border-amber-500/30 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 shadow-neon-amber">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-display">
              Ask AI Guide: Which Tool Should I Use?
            </h3>
            <p className="text-xs text-slate-400">
              Describe what you need to create or solve, and your AI Agent will recommend the ideal tool!
            </p>
          </div>
        </div>

        <form onSubmit={handleRecommend} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={recommenderQuery}
            onChange={(e) => setRecommenderQuery(e.target.value)}
            placeholder="e.g. 'I need to create a slide deck for a science exhibition' or 'I need to debug Python code'..."
            className="flex-1 px-4 py-3 rounded-xl bg-dark-950 border border-amber-500/30 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 text-dark-950 font-bold text-xs shadow-neon-amber flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Recommend Best Tool</span>
          </button>
        </form>

        {recommendationResult && (
          <div className="p-5 rounded-2xl bg-dark-950 border border-amber-500/40 space-y-3 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-dark-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                  Recommended Primary Tool
                </span>
                <h4 className="text-lg font-bold text-white font-display">
                  {recommendationResult.primary}
                </h4>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-300 text-xs font-mono font-bold border border-amber-500/30 w-fit">
                {recommendationResult.category}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              💡 <strong>Why this tool:</strong> {recommendationResult.why}
            </p>

            <div className="p-3 rounded-xl bg-dark-900 border border-amber-500/20 text-xs font-mono text-amber-300">
              ⚡ <strong>Suggested Starter Prompt:</strong> “{recommendationResult.recommendedPrompt}”
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Alternatives:</span>
              {recommendationResult.alternatives.map((alt, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-dark-900 text-slate-300 border border-dark-700">
                  {alt}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
            {TOOL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-dark-950 shadow-neon-amber'
                    : 'bg-dark-900 text-slate-400 hover:text-slate-200 border border-cyan-500/20'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search AI tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-dark-900 border border-amber-500/20 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="p-5 rounded-2xl glass-panel border border-amber-500/20 hover:border-amber-400/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                      {tool.provider}
                    </span>
                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {tool.name}
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/30">
                    {tool.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {tool.description}
                </p>

                <div className="p-2.5 rounded-xl bg-dark-950/80 border border-amber-500/15 text-[11px] text-slate-300">
                  <strong className="text-amber-400">Beginner view:</strong> {tool.beginnerExplanation}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-dark-800 flex items-center justify-between">
                <button
                  onClick={() => handleOpenTool(tool)}
                  className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <span>Learn & Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-dark-900 hover:bg-dark-800 text-slate-400 hover:text-white border border-dark-700"
                  title="Visit Website"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Tool Exploration Modal */}
      {selectedToolModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl glass-panel-glow border border-amber-500/40 p-6 md:p-8 shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedToolModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 text-xl font-bold">
                ⚡
              </div>
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                  {selectedToolModal.provider}
                </span>
                <h3 className="text-xl font-bold text-white font-display">
                  {selectedToolModal.name}
                </h3>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-950 text-xs text-slate-200 leading-relaxed border border-amber-500/20">
              <strong className="text-amber-300 block mb-1">Simple Explanation:</strong>
              {selectedToolModal.beginnerExplanation}
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase font-bold">
                Core Use Case:
              </span>
              <p className="text-xs text-slate-200 bg-dark-900 p-2.5 rounded-lg border border-dark-700">
                {selectedToolModal.useCase}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase font-bold">
                Sample Interactive Prompt:
              </span>
              <div className="p-3 rounded-xl bg-dark-950 font-mono text-xs text-amber-300 border border-amber-900/40">
                “{selectedToolModal.example}”
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={selectedToolModal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold text-xs text-center shadow-neon-amber flex items-center justify-center gap-1.5"
              >
                <span>Launch {selectedToolModal.name}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => speak(`${selectedToolModal.name}. ${selectedToolModal.beginnerExplanation}. For example: ${selectedToolModal.example}`)}
                className="p-2.5 rounded-xl bg-dark-900 hover:bg-dark-800 text-amber-300 border border-amber-500/30"
                title="Speak details"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <TopicKnowledgeCheck topicId="ai-tools" title="Topic 4 Knowledge Check" />

      {/* Next Step Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => onNavigate('prompt-engineering')}
          className="px-4 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 text-xs border border-cyan-500/20"
        >
          ← Previous: Topic 3 Prompt Engineering
        </button>
        <button
          onClick={() => onNavigate('ai-projects')}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold text-xs flex items-center gap-1.5 shadow-neon-cyan"
        >
          <span>Next: Topic 5 — AI Projects</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

