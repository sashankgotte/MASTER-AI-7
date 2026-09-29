import React from 'react';
import { TOPICS } from '../../data/topicData';
import { Brain, Heart, Sparkles, Terminal, Code, Cpu } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="w-full bg-dark-950 border-t border-cyan-500/20 text-slate-400 py-12 px-4 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-neon-cyan">
              <div className="w-full h-full bg-dark-950 rounded-[10px] flex items-center justify-center">
                <span className="text-lg font-black font-display text-gradient-cyan">7</span>
              </div>
            </div>
            <span className="text-xl font-black font-display tracking-tight text-white">
              MASTER AI <span className="text-cyan-400">7</span>
            </span>
          </div>

          {/* Primary Tagline */}
          <div className="space-y-1">
            <p className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
              “LEARN • CREATE • INNOVATE”
            </p>
            <p className="text-xs font-mono text-purple-400 tracking-wider">
              “Your Interest, Your World”
            </p>
            <p className="text-xs font-mono text-emerald-400 tracking-wider">
              “DISCOVER • LEARN • GROW”
            </p>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            The next-generation interactive AI learning platform with dynamic education levels, live voice tutor, hands-on projects, and intelligent career tools.
          </p>
        </div>

        {/* 7 Learning Tracks */}
        <div>
          <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest mb-4 flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-cyan-400" />
            The 7 Main Topics
          </h4>
          <ul className="space-y-2 text-xs">
            {TOPICS.slice(0, 4).map((topic) => (
              <li key={topic.id}>
                <button
                  onClick={() => onNavigate(topic.id)}
                  className="hover:text-cyan-300 transition-colors text-left flex items-center gap-1.5"
                >
                  <span className="text-cyan-500 font-mono">{topic.number}.</span>
                  <span>{topic.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Remaining Topics & Features */}
        <div>
          <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest mb-4 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Applied Skills & Career
          </h4>
          <ul className="space-y-2 text-xs">
            {TOPICS.slice(4).map((topic) => (
              <li key={topic.id}>
                <button
                  onClick={() => onNavigate(topic.id)}
                  className="hover:text-purple-300 transition-colors text-left flex items-center gap-1.5"
                >
                  <span className="text-purple-400 font-mono">{topic.number}.</span>
                  <span>{topic.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom Copyright & Mission Line */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-cyan-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div className="flex items-center gap-2">
          <span>MASTER AI 7 PLATFORM</span>
          <span>•</span>
          <span>DISCOVER • LEARN • GROW</span>
        </div>
        <div className="text-center sm:text-right">
          “LEARN • CREATE • INNOVATE” — Your Interest, Your World.
        </div>
      </div>
    </footer>
  );
}

