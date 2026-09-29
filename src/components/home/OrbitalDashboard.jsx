import React, { useState } from 'react';
import { TOPICS } from '../../data/topicData';
import AIAgentAvatar from '../common/AIAgentAvatar';
import { useAgent } from '../../context/AgentContext';
import {
  Brain,
  Cpu,
  Terminal,
  Grid,
  Rocket,
  FileText,
  Mic,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle
} from 'lucide-react';

const TOPIC_ICONS = {
  'what-is-ai': Brain,
  'how-ai-works': Cpu,
  'prompt-engineering': Terminal,
  'ai-tools': Grid,
  'ai-projects': Rocket,
  'ai-resume': FileText,
  'spoken-english': Mic,
};

export default function OrbitalDashboard({ onSelectTopic, onStartTour }) {
  const { speak } = useAgent();
  const [hoveredTopic, setHoveredTopic] = useState(null);

  const handleTopicClick = (topic) => {
    speak(topic.speechIntro);
    onSelectTopic(topic.id);
  };

  // Orbital positions (7 items around a circle, angle in degrees)
  // 360 / 7 ≈ 51.4 degrees each
  const orbitalAngles = [270, 321.4, 12.8, 64.2, 115.6, 167, 218.4];

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      {/* Background Cybernetic Ring Elements */}
      <div className="absolute w-[600px] h-[600px] md:w-[750px] md:h-[750px] rounded-full border border-cyan-500/10 pointer-events-none" />
      <div className="absolute w-[450px] h-[450px] md:w-[580px] md:h-[580px] rounded-full border border-purple-500/15 border-dashed animate-spin-slow pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] md:w-[420px] md:h-[420px] rounded-full border border-cyan-400/20 pointer-events-none" />

      {/* Header Headline */}
      <div className="text-center z-10 mb-6 md:mb-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold mb-3 shadow-neon-cyan">
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
          <span>FUTURISTIC AI LEARNING ECOSYSTEM</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white mb-2">
          MASTER AI <span className="text-gradient-cyan">7</span>
        </h1>

        <p className="text-sm md:text-base text-slate-300 font-medium">
          “LEARN • CREATE • INNOVATE”
        </p>
        <p className="text-xs text-cyan-400/90 font-mono mt-1">
          Interactive AI Agent • 7 Core Modules
        </p>
      </div>

      {/* Main Circular Orbital Layout (Desktop & Large Tablets) */}
      <div className="relative w-full max-w-4xl h-[620px] hidden md:flex items-center justify-center">
        {/* Central Circular AI Agent */}
        <div className="relative z-20 flex flex-col items-center">
          <AIAgentAvatar size="large" onStartTour={onStartTour} />
          <div className="text-center mt-2">
            <h3 className="text-base font-bold font-display text-white tracking-wide">
              AI AGENT
            </h3>
            <p className="text-xs text-cyan-400 font-mono">
              “Your AI Learning Guide”
            </p>
          </div>
        </div>

        {/* 7 Orbiting Circular Cards */}
        {TOPICS.map((topic, index) => {
          const Icon = TOPIC_ICONS[topic.id] || Brain;
          const angle = orbitalAngles[index];
          const radius = 285; // Distance from center
          const radian = (angle * Math.PI) / 180;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;
          const isHovered = hoveredTopic === topic.id;

          return (
            <div
              key={topic.id}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
              className="absolute z-30 transition-transform duration-300"
              onMouseEnter={() => setHoveredTopic(topic.id)}
              onMouseLeave={() => setHoveredTopic(null)}
            >
              {/* Connecting line to center */}
              <div
                style={{
                  width: `${radius}px`,
                  transform: `rotate(${angle + 180}deg)`,
                  transformOrigin: '0% 50%',
                }}
                className={`absolute top-1/2 left-1/2 h-[1px] pointer-events-none transition-opacity duration-300 ${
                  isHovered
                    ? 'bg-gradient-to-r from-cyan-400 via-cyan-400/40 to-transparent opacity-100'
                    : 'bg-cyan-500/15 opacity-40'
                }`}
              />

              {/* Circular Card Button */}
              <button
                onClick={() => handleTopicClick(topic)}
                className={`group relative w-24 h-24 rounded-full glass-panel flex flex-col items-center justify-center p-2 transition-all duration-300 border ${
                  isHovered
                    ? 'border-cyan-400 scale-125 shadow-neon-cyan bg-dark-900 z-40'
                    : 'border-cyan-500/30 hover:border-cyan-400/70 shadow-lg'
                }`}
              >
                {/* Topic Number Badge */}
                <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 text-dark-950 font-mono font-black text-xs flex items-center justify-center shadow-md">
                  {topic.number}
                </span>

                {/* Topic Icon */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center mb-1 transition-transform group-hover:scale-110 ${
                    topic.id === 'spoken-english'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-cyan-500/20 text-cyan-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Topic Label */}
                <span className="text-[10px] font-bold font-mono tracking-tight text-slate-200 text-center leading-tight line-clamp-2 group-hover:text-cyan-300">
                  {topic.shortTitle}
                </span>

                {/* Live Badge for Spoken English */}
                {topic.id === 'spoken-english' && (
                  <span className="absolute -bottom-2 px-1.5 py-0.5 rounded-full bg-emerald-500 text-dark-950 text-[8px] font-bold font-mono uppercase tracking-wider animate-pulse">
                    LIVE VOICE
                  </span>
                )}
              </button>

              {/* Hover Tooltip / Detail Popover */}
              {isHovered && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-28 w-56 p-3 rounded-xl glass-panel-glow border border-cyan-400 text-center shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200 pointer-events-none"
                >
                  <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    Topic {topic.number}
                  </div>
                  <div className="text-xs font-bold text-white mb-1 font-display">
                    {topic.title}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    {topic.tagline}
                  </p>
                  <div className="mt-2 text-[10px] text-cyan-300 font-mono flex items-center justify-center gap-1 font-bold">
                    <span>Click to start module</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Responsive Grid for Mobile & Tablets */}
      <div className="w-full max-w-lg md:hidden flex flex-col items-center space-y-6 z-20">
        {/* Central Agent */}
        <div className="flex flex-col items-center">
          <AIAgentAvatar size="large" onStartTour={onStartTour} />
          <div className="text-center mt-2">
            <h3 className="text-base font-bold font-display text-white">AI AGENT</h3>
            <p className="text-xs text-cyan-400 font-mono">“Your AI Learning Guide”</p>
          </div>
        </div>

        {/* 7 Circular / Pill Cards in Grid */}
        <div className="w-full grid grid-cols-2 gap-3">
          {TOPICS.map((topic) => {
            const Icon = TOPIC_ICONS[topic.id] || Brain;
            return (
              <button
                key={topic.id}
                onClick={() => handleTopicClick(topic)}
                className="group relative p-3 rounded-2xl glass-panel border border-cyan-500/30 hover:border-cyan-400 flex items-center gap-3 text-left transition-all active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-mono text-cyan-400 font-bold">
                    TOPIC {topic.number}
                  </div>
                  <div className="text-xs font-bold text-white truncate group-hover:text-cyan-300">
                    {topic.shortTitle}
                  </div>
                </div>
                <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 text-[10px] font-mono font-bold text-cyan-300 flex items-center justify-center">
                  {topic.number}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}

