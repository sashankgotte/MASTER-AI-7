import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAgent } from '../../context/AgentContext';
import { useLanguage } from '../../context/LanguageContext';
import { TOPICS } from '../../data/topicData';
import {
  Brain,
  Volume2,
  VolumeX,
  User,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  Flame,
  Award
} from 'lucide-react';

export default function Navbar({ activeSection, onNavigate }) {
  const { user, openAuth } = useAuth();
  const { isMuted, toggleMute, setIsDrawerOpen, speak } = useAgent();
  const { language, setLanguage, allLanguages } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTopicsDropdownOpen, setIsTopicsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-cyan-500/20 px-4 lg:px-8 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-neon-cyan transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-dark-950 rounded-[10px] flex items-center justify-center">
              <span className="text-xl font-black font-display text-gradient-cyan">7</span>
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg lg:text-xl font-black font-display tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                MASTER AI <span className="text-cyan-400">7</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] font-mono tracking-widest text-slate-400 hidden sm:block">
              LEARN • CREATE • INNOVATE
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('iq-games')}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-dark-950 text-xs font-black shadow-neon-cyan transition-all"
        >
          <Award className="w-4 h-4" />
          <span>IQ Games</span>
        </button>

        <div className="hidden md:flex items-center gap-2 rounded-full border border-cyan-500/30 bg-dark-900/90 p-1">
          {allLanguages.map((lang) => {
            const isActive = language === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id)}
                className={`px-2.5 py-1.5 rounded-full text-[10px] font-bold font-mono transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-dark-950 shadow-neon-cyan'
                    : 'text-slate-300 hover:text-cyan-300'
                }`}
                title={lang.label}
              >
                {lang.flag} {lang.id === 'en' ? 'EN' : 'తెలు'}
              </button>
            );
          })}
        </div>

        {/* Center / Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Topics Navigation Dropdown */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setIsTopicsDropdownOpen(!isTopicsDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-dark-850 hover:bg-dark-800 text-slate-200 border border-cyan-500/20 text-xs font-bold transition-colors"
            >
              <span>7 Modules</span>
              <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
            </button>

            {isTopicsDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-xl glass-panel-glow py-2 shadow-2xl z-50 border border-cyan-500/40 divide-y divide-cyan-900/40"
                onMouseLeave={() => setIsTopicsDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  The 7 Main Topics
                </div>
                <div className="py-1">
                  {TOPICS.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => {
                        onNavigate(topic.id);
                        setIsTopicsDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-cyan-950/60 transition-colors ${
                        activeSection === topic.id ? 'text-cyan-300 font-bold bg-cyan-950/40' : 'text-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-cyan-400 font-bold">{topic.number}.</span>
                        <span>{topic.shortTitle}</span>
                      </span>
                      {topic.id === 'spoken-english' && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/40">
                          LIVE
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AI Voice Toggle */}
          <button
            onClick={toggleMute}
            className={`p-2 rounded-lg border transition-all ${
              isMuted
                ? 'bg-rose-950/50 text-rose-400 border-rose-500/30'
                : 'bg-dark-850 hover:bg-dark-800 text-cyan-300 border-cyan-500/30'
            }`}
            title={isMuted ? 'Unmute AI Voice Audio' : 'Mute AI Voice Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Ask AI Agent Assistant Drawer Toggle */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-neon-purple transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin-slow" />
            <span className="hidden sm:inline">Ask AI Guide</span>
          </button>

          {/* User Progress / Auth */}
          {user.isLoggedIn ? (
            <button
              onClick={() => openAuth('profile')}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-dark-850 hover:bg-dark-800 border border-cyan-500/30 transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center text-sm">
                {user.avatar || '🤖'}
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-200 truncate max-w-[100px]">{user.name}</span>
                <span className="text-[10px] font-mono text-cyan-400">{user.xp} XP</span>
              </div>
            </button>
          ) : (
            <button
              onClick={() => openAuth('login')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-dark-950 text-xs font-bold shadow-neon-cyan transition-all"
            >
              <User className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-dark-850 text-slate-300 border border-cyan-500/20"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-3 p-4 rounded-xl glass-panel-glow border border-cyan-500/40 space-y-4 animate-in slide-in-from-top duration-200">
          <button
            onClick={() => { onNavigate('iq-games'); setIsMobileMenuOpen(false); }}
            className="w-full p-3 rounded-lg bg-amber-500 text-dark-950 text-sm font-black flex items-center justify-center gap-2"
          >
            <Award className="w-4 h-4" /> IQ Games
          </button>

          <div>
            <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase mb-2">
              Language
            </div>
            <div className="grid grid-cols-2 gap-2">
              {allLanguages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => {
                    setLanguage(lang.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded-lg text-xs font-bold border ${
                    language === lang.id
                      ? 'bg-cyan-500 text-dark-950 border-cyan-400'
                      : 'bg-dark-900 text-slate-300 border-cyan-500/20'
                  }`}
                >
                  {lang.flag} {lang.id === 'en' ? 'ENGLISH' : 'తెలుగు'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase mb-2">
              7 Main Topics
            </div>
            <div className="grid grid-cols-1 gap-1">
              {TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => {
                    onNavigate(topic.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full p-2.5 rounded-lg text-left text-xs font-medium flex items-center justify-between ${
                    activeSection === topic.id
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                      : 'bg-dark-900/80 text-slate-300'
                  }`}
                >
                  <span>{topic.number}. {topic.title}</span>
                  {topic.id === 'spoken-english' && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-500/20 text-emerald-300 rounded">
                      VOICE
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

