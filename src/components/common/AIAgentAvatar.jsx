import React, { useState, useEffect } from 'react';
import { useAgent } from '../../context/AgentContext';
import { useLevel } from '../../context/LevelContext';
import { useLanguage } from '../../context/LanguageContext';
import { Mic, MicOff, Volume2, VolumeX, MessageSquare, Play, Sparkles } from 'lucide-react';

export default function AIAgentAvatar({ size = 'large', onStartTour }) {
  const {
    agentStatus,
    isMuted,
    toggleMute,
    currentText,
    speak,
    stopSpeaking,
    startVoiceInput,
    stopVoiceInput,
    setIsDrawerOpen,
    sendMessageToAgent
  } = useAgent();
  const { currentLevel, currentLevelInfo } = useLevel();
  const { isTelugu, language } = useLanguage();
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouthPhase, setMouthPhase] = useState(0);

  // Blinking loop
  // Blinking animation loop
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Mouth animation when speaking
  // Mouth audio waveform animation when speaking
  useEffect(() => {
    let mouthInterval;
    if (agentStatus === 'speaking') {
      mouthInterval = setInterval(() => {
        setMouthPhase(p => (p + 1) % 4);
      }, 120);
    } else {
      setMouthPhase(0);
    }
    return () => clearInterval(mouthInterval);
  }, [agentStatus]);

  const handleMicToggle = () => {
    if (agentStatus === 'listening') {
      stopVoiceInput();
    } else {
      startVoiceInput((transcript, isFinal) => {
        if (isFinal && transcript) {
          // Process user voice query
        if (isFinal && transcript && transcript.trim()) {
          stopVoiceInput();
          sendMessageToAgent(transcript.trim());
        }
       }
      });
    }
  };

  const handleStartLearning = () => {
    const levelIntro = currentLevel === 'school'
      ? "Welcome to MASTER AI 7! I am your AI Guide. Click on any of the 7 topics around me to start exploring fun AI lessons, games, and voice practice!"
      : currentLevel === 'intermediate'
        ? "Welcome to MASTER AI 7! I am your AI Learning Guide. We have 7 comprehensive learning modules prepared for you. Choose a topic to dive into practical AI tools, machine learning concepts, and projects!"
        : "Welcome to MASTER AI 7! I am your Advanced AI & Engineering Mentor. Explore our 7 core tracks spanning neural networks, Prompt Engineering, PyTorch projects, ATS resume optimization, and technical interview English practice!";

    const introMsg = isTelugu
      ? "MASTER AI 7 కి స్వాగతం! నేను మీ AI అభ్యాస గైడ్. నా చుట్టూ ఉన్న 7 టాపిక్స్ లో ఏదైనా ఒకదాన్ని ఎంచుకుని పాఠాలు, పజిల్స్ మరియు నాలెడ్జ్ చెక్ ప్రారంభించండి!"
      : levelIntro;

    speak(introMsg, { lang: language });
    if (onStartTour) onStartTour();
  };
  const isLarge = size === 'large';
  const containerDim = isLarge ? 'w-64 h-64 md:w-80 md:h-80' : 'w-24 h-24';

  return (
    <div className="flex flex-col items-center justify-center relative">
      {/* Outer Pulse Rings */}
      <div className={`relative ${containerDim} flex items-center justify-center`}>
        {/* Glow halo */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-700 ${
            agentStatus === 'speaking'
              ? 'bg-cyan-500/30 blur-2xl animate-pulse'
              : agentStatus === 'listening'
                ? 'bg-emerald-500/35 blur-2xl animate-ping'
                : agentStatus === 'thinking'
                  ? 'bg-purple-500/35 blur-2xl animate-spin-slow'
                  : 'bg-cyan-500/15 blur-xl'
          }`}
        />
               
        {/* Orbiting Cyber Ring 1 */}
        <div className="absolute inset-1 rounded-full border border-cyan-400/40 border-dashed animate-spin-slow pointer-events-none" />

        {/* Orbiting Cyber Ring 2 */}
        <div className="absolute inset-4 rounded-full border border-purple-500/30 border-t-cyan-400 animate-spin-reverse pointer-events-none" />

        {/* Central Core Head / Avatar Container */}
        <div className="relative w-5/6 h-5/6 rounded-full bg-gradient-to-b from-dark-850 to-dark-950 border-2 border-cyan-400/60 shadow-neon-cyan flex flex-col items-center justify-center p-4 overflow-hidden">
          {/* Cyber grid texture on face */}
          <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

          {/* Thinking Holographic Ring Animation */}
          {agentStatus === 'thinking' && (
            <div className="absolute inset-2 border-2 border-t-purple-400 border-r-transparent border-b-cyan-400 border-l-transparent rounded-full animate-spin" />
          )}

          {/* Face Holographic Interface */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full">
            {/* Forehead Core Badge */}
            <div className="flex items-center gap-1 mb-2 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[10px] font-mono tracking-widest text-cyan-300 uppercase font-bold">
                AI 7 CORE
              </span>
            </div>

            {/* Eyes Container */}
            <div className="flex items-center justify-center gap-6 my-2">
              {/* Left Eye */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-200 ${
                  agentStatus === 'listening'
                    ? 'border-emerald-400 bg-emerald-950 shadow-[0_0_15px_#10b981]'
                    : agentStatus === 'thinking'
                      ? 'border-purple-400 bg-purple-950 shadow-[0_0_15px_#a855f7]'
                      : 'border-cyan-400 bg-cyan-950 shadow-[0_0_15px_#00f0ff]'
                } ${isBlinking ? 'scale-y-0' : 'scale-y-100'}`}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-transform ${
                    agentStatus === 'listening'
                      ? 'bg-emerald-300 scale-125'
                      : agentStatus === 'thinking'
                        ? 'bg-purple-300 animate-bounce'
                        : 'bg-cyan-300'
                  }`}
                />
              </div>

              {/* Right Eye */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-200 ${
                  agentStatus === 'listening'
                    ? 'border-emerald-400 bg-emerald-950 shadow-[0_0_15px_#10b981]'
                    : agentStatus === 'thinking'
                      ? 'border-purple-400 bg-purple-950 shadow-[0_0_15px_#a855f7]'
                      : 'border-cyan-400 bg-cyan-950 shadow-[0_0_15px_#00f0ff]'
                } ${isBlinking ? 'scale-y-0' : 'scale-y-100'}`}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-transform ${
                    agentStatus === 'listening'
                      ? 'bg-emerald-300 scale-125'
                      : agentStatus === 'thinking'
                        ? 'bg-purple-300 animate-bounce'
                        : 'bg-cyan-300'
                  }`}
                />
              </div>
            </div>

            {/* Dynamic Animated Mouth / Audio Waveform */}
            <div className="h-8 flex items-center justify-center mt-1">
              {agentStatus === 'speaking' ? (
                /* Equalizer wave mouth while speaking */
                <div className="flex items-center gap-1">
                  <span className="w-1 bg-cyan-400 rounded-full h-2 animate-[wave_0.8s_ease-in-out_infinite]" />
                  <span className="w-1.5 bg-cyan-300 rounded-full h-5 animate-[wave_0.6s_ease-in-out_infinite_0.1s]" />
                  <span className="w-2 bg-cyan-400 rounded-full h-7 animate-[wave_0.5s_ease-in-out_infinite_0.2s]" />
                  <span className="w-1.5 bg-cyan-300 rounded-full h-5 animate-[wave_0.6s_ease-in-out_infinite_0.3s]" />
                  <span className="w-1 bg-cyan-400 rounded-full h-2 animate-[wave_0.8s_ease-in-out_infinite_0.4s]" />
                </div>
              ) : agentStatus === 'listening' ? (
                /* Glowing mic listening wave */
                <div className="flex items-center gap-1.5">
                  <span className="w-1 bg-emerald-400 rounded-full h-3 animate-ping" />
                  <span className="w-1 bg-emerald-300 rounded-full h-4 animate-ping" />
                  <span className="w-1 bg-emerald-400 rounded-full h-3 animate-ping" />
                </div>
              ) : agentStatus === 'thinking' ? (
                /* Processing dots */
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              ) : (
                /* Neutral smiling glowing visor line */
                <div className="w-12 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full shadow-[0_0_8px_#00f0ff]" />
              )}
            </div>
          </div>
        </div>
      </div>
    
      {/* Status Badge */}
      <div className="mt-3 flex items-center gap-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border shadow-lg flex items-center gap-1.5 transition-all duration-300 ${
            agentStatus === 'speaking'
              ? 'bg-cyan-950/90 text-cyan-300 border-cyan-400 shadow-cyan-500/30'
              : agentStatus === 'listening'
                ? 'bg-emerald-950/90 text-emerald-300 border-emerald-400 shadow-emerald-500/30 animate-pulse'
                : agentStatus === 'thinking'
                  ? 'bg-purple-950/90 text-purple-300 border-purple-400 shadow-purple-500/30'
                  : 'bg-dark-850/90 text-slate-300 border-cyan-500/30'
            }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              agentStatus === 'speaking'
                ? 'bg-cyan-400 animate-ping'
                : agentStatus === 'listening'
                  ? 'bg-emerald-400 animate-ping'
                  : agentStatus === 'thinking'
                    ? 'bg-purple-400 animate-spin'
                    : 'bg-cyan-500'
            }`}
          />
          {agentStatus === 'speaking' && (isTelugu ? 'మాట్లాడుతోంది...' : 'SPEAKING...')}
          {agentStatus === 'listening' && (isTelugu ? 'వింటోంది...' : 'LISTENING...')}
          {agentStatus === 'thinking' && (isTelugu ? 'ఆలోచిస్తోంది...' : 'THINKING...')}
          {agentStatus === 'idle' && (isTelugu ? 'సిద్ధంగా ఉంది • మీ AI గైడ్' : 'READY • YOUR AI GUIDE')}
        </span>
      </div>
      
      {/* Control Buttons Panel */}
      {isLarge && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {/* Start Learning Button */}
          <button
            onClick={handleStartLearning}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-dark-950 font-bold text-sm shadow-neon-cyan transition-all transform hover:scale-105 active:scale-95"
            title="Start interactive learning introduction"
          >
            <Play className="w-4 h-4 fill-current" />
            {isTelugu ? 'నేర్చుకోవడం ప్రారంభించండి' : 'Start Learning'}
          </button>
          {/* Microphone Toggle Button */}
          <button
            onClick={handleMicToggle}
            className={`p-2.5 rounded-full border transition-all transform hover:scale-110 active:scale-95 ${
              agentStatus === 'listening'
                ? 'bg-emerald-500 text-dark-950 border-emerald-400 shadow-neon-green animate-pulse'
                : 'bg-dark-850 hover:bg-dark-800 text-cyan-300 border-cyan-500/30'
            }`}
            title={agentStatus === 'listening' ? 'Stop Listening' : 'Speak to AI Agent (Microphone)'}
          >
            {agentStatus === 'listening' ? <Mic className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Speaker Sound Toggle */}
          <button
            onClick={toggleMute}
            className={`p-2.5 rounded-full border transition-all transform hover:scale-110 active:scale-95 ${
              isMuted
                ? 'bg-rose-950/80 text-rose-400 border-rose-500/40'
                : 'bg-dark-850 hover:bg-dark-800 text-cyan-300 border-cyan-500/30'
            }`}
            title={isMuted ? 'Unmute AI Voice' : 'Mute AI Voice'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Open Chat Drawer */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2.5 rounded-full bg-dark-850 hover:bg-dark-800 text-cyan-300 border border-cyan-500/30 transition-all transform hover:scale-110 active:scale-95"
            title="Open AI Chat Assistant"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}