import React, { useState, useEffect, useRef } from 'react';
import { useAgent } from '../../context/AgentContext';
import { useAuth } from '../../context/AuthContext';
import {
  DAILY_CONVERSATION_TOPICS,
  SPEAKING_PRACTICE_PROMPTS,
  INTERVIEW_QUESTIONS,
  analyzeEnglishResponse,
  generateConversationResponse,
  generateTutorResponse,
  generateInterviewFeedback
} from '../../utils/spokenEnglishService';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Bot,
  User,
  MessageSquare,
  Award,
  BookOpen,
  Briefcase,
  Headphones,
  Check,
  ChevronRight,
  Flame,
  HelpCircle,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SpokenEnglish({ onNavigate }) {
  const {
    speak,
    stopSpeaking,
    isMuted,
    toggleMute,
    startVoiceInput,
    stopVoiceInput,
    agentStatus
  } = useAgent();

  const { recordSpokenScore, markTopicComplete } = useAuth();

  // Active Main Sub-Tab: 'tutor' | 'conversation' | 'practice' | 'interview'
  const [activeTab, setActiveTab] = useState('tutor');

  // Microphone availability detection
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  useEffect(() => {
    const supported = typeof window !== 'undefined' &&
      !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    setIsSpeechSupported(supported);
  }, []);

  // Shared Voice & Input State
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // ----------------------------------------------------
  // 1. AI ENGLISH TUTOR STATE
  // ----------------------------------------------------
  const [tutorMessages, setTutorMessages] = useState([
    {
      sender: 'agent',
      text: "Hello! I am your AI English Tutor. You can speak to me with your microphone or type any sentence. I will listen, respond naturally, and help you polish your grammar and speaking confidence!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [tutorFeedback, setTutorFeedback] = useState(null);
  const tutorChatEndRef = useRef(null);

  useEffect(() => {
    tutorChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [tutorMessages, isAnalyzing]);

  // ----------------------------------------------------
  // 2. DAILY CONVERSATION STATE (7 EXACT TOPICS)
  // ----------------------------------------------------
  const [selectedTopicId, setSelectedTopicId] = useState('self_intro');
  const [convMessages, setConvMessages] = useState([]);
  const [convStepIndex, setConvStepIndex] = useState(0);
  const [convFeedback, setConvFeedback] = useState(null);
  const [isConvActive, setIsConvActive] = useState(false);
  const convChatEndRef = useRef(null);

  const activeTopic = DAILY_CONVERSATION_TOPICS.find(t => t.id === selectedTopicId) || DAILY_CONVERSATION_TOPICS[0];

  useEffect(() => {
    convChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [convMessages, isAnalyzing]);

  // Start / Change Daily Conversation Topic
  const startDailyTopic = (topicId) => {
    setSelectedTopicId(topicId);
    const topic = DAILY_CONVERSATION_TOPICS.find(t => t.id === topicId) || DAILY_CONVERSATION_TOPICS[0];
    setIsConvActive(true);
    setConvStepIndex(0);
    setConvFeedback(null);
    setInputText('');

    const initialMsg = {
      sender: 'agent',
      roleName: topic.roleName,
      text: topic.openingPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConvMessages([initialMsg]);
    speak(topic.openingVoice || topic.openingPrompt);
  };

  // ----------------------------------------------------
  // 3. SPEAKING PRACTICE STATE
  // ----------------------------------------------------
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceFeedback, setPracticeFeedback] = useState(null);
  const currentPrompt = SPEAKING_PRACTICE_PROMPTS[practiceIndex] || SPEAKING_PRACTICE_PROMPTS[0];

  // ----------------------------------------------------
  // 4. INTERVIEW ENGLISH (7 QUESTIONS SEQUENTIAL)
  // ----------------------------------------------------
  const [interviewQuestionIndex, setInterviewQuestionIndex] = useState(0);
  const [interviewAnswers, setInterviewAnswers] = useState([]);
  const [currentInterviewFeedback, setCurrentInterviewFeedback] = useState(null);
  const [isInterviewFinished, setIsInterviewFinished] = useState(false);
  const [finalInterviewReport, setFinalInterviewReport] = useState(null);

  const currentInterviewQ = INTERVIEW_QUESTIONS[interviewQuestionIndex] || INTERVIEW_QUESTIONS[0];

  // Ask current interview question on mount / question change
  const promptInterviewQuestion = (index) => {
    const q = INTERVIEW_QUESTIONS[index];
    if (!q) return;
    setCurrentInterviewFeedback(null);
    setInputText('');
    speak(`Question ${q.num}: ${q.question}`);
  };

  const startInterview = () => {
    setInterviewQuestionIndex(0);
    setInterviewAnswers([]);
    setCurrentInterviewFeedback(null);
    setIsInterviewFinished(false);
    setFinalInterviewReport(null);
    promptInterviewQuestion(0);
  };

  // ----------------------------------------------------
  // VOICE INPUT HANDLING (Web Speech API)
  // ----------------------------------------------------
  const toggleListening = (onTranscriptReceived) => {
    if (agentStatus === 'listening') {
      stopVoiceInput();
    } else {
      stopSpeaking();
      const started = startVoiceInput(
        (transcript, isFinal) => {
          setInputText(transcript);
          if (isFinal && transcript.trim()) {
            stopVoiceInput();
            onTranscriptReceived(transcript.trim());
          }
        },
        (finalTranscript) => {
          if (finalTranscript && finalTranscript.trim()) {
            onTranscriptReceived(finalTranscript.trim());
          }
        }
      );

      if (!started) {
        setIsSpeechSupported(false);
      }
    }
  };

  // ----------------------------------------------------
  // SUBMISSION LOGIC PER TAB
  // ----------------------------------------------------

  // 1. Send Message to AI English Tutor
  const handleSendTutorMessage = (userText = inputText) => {
    const text = (userText || '').trim();
    if (!text || isAnalyzing) return;

    setInputText('');
    stopSpeaking();
    stopVoiceInput();

    const userMsg = {
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setTutorMessages(prev => [...prev, userMsg]);
    setIsAnalyzing(true);

    // Process Tutor Analysis & Reply
    setTimeout(() => {
      const response = generateTutorResponse(text, tutorMessages);
      setTutorFeedback(response.analysis);

      const agentMsg = {
        sender: 'agent',
        text: response.tutorMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setTutorMessages(prev => [...prev, agentMsg]);
      setIsAnalyzing(false);

      if (response.analysis.score >= 90) {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      }

      recordSpokenScore(response.analysis.score);
      markTopicComplete(7);

      speak(response.speechText || response.tutorMessage);
    }, 600);
  };

  // 2. Send Message in Daily Conversation Role-Play
  const handleSendConvMessage = (userText = inputText) => {
    const text = (userText || '').trim();
    if (!text || isAnalyzing) return;

    setInputText('');
    stopSpeaking();
    stopVoiceInput();

    const userMsg = {
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setConvMessages(prev => [...prev, userMsg]);
    setIsAnalyzing(true);

    setTimeout(() => {
      const nextStep = convStepIndex + 1;
      const response = generateConversationResponse(selectedTopicId, nextStep, text, convMessages);
      setConvStepIndex(nextStep);
      setConvFeedback(response.analysis);

      const agentMsg = {
        sender: 'agent',
        roleName: activeTopic.roleName,
        text: response.replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setConvMessages(prev => [...prev, agentMsg]);
      setIsAnalyzing(false);

      if (response.analysis.score >= 90) {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      }

      recordSpokenScore(response.analysis.score);
      markTopicComplete(7);

      speak(response.speechText || response.replyText);
    }, 600);
  };

  // 3. Submit Speaking Practice
  const handleCheckSpeakingPractice = (userText = inputText) => {
    const text = (userText || '').trim();
    if (!text || isAnalyzing) return;

    setInputText('');
    stopSpeaking();
    stopVoiceInput();
    setIsAnalyzing(true);

    setTimeout(() => {
      const analysis = analyzeEnglishResponse(text, { prompt: currentPrompt.question });
      setPracticeFeedback(analysis);
      setIsAnalyzing(false);

      if (analysis.score >= 90) {
        confetti({ particleCount: 50, spread: 65, origin: { y: 0.65 } });
      }

      recordSpokenScore(analysis.score);
      markTopicComplete(7);

      speak(`Good job! Your sentence has been analyzed. Better phrasing: ${analysis.betterSentence}`);
    }, 600);
  };

  // 4. Submit Interview Question Answer (Sequential Q1 -> Q7)
  const handleCheckInterviewAnswer = (userText = inputText) => {
    const text = (userText || '').trim();
    if (!text || isAnalyzing) return;

    setInputText('');
    stopSpeaking();
    stopVoiceInput();
    setIsAnalyzing(true);

    setTimeout(() => {
      const analysis = analyzeEnglishResponse(text, { question: currentInterviewQ.question });
      setCurrentInterviewFeedback(analysis);
      setIsAnalyzing(false);

      const updatedAnswers = [...interviewAnswers];
      updatedAnswers[interviewQuestionIndex] = {
        questionNum: currentInterviewQ.num,
        question: currentInterviewQ.question,
        userAnswer: text,
        analysis
      };
      setInterviewAnswers(updatedAnswers);

      recordSpokenScore(analysis.score);
      markTopicComplete(7);

      speak(`Answer recorded for question ${currentInterviewQ.num}. Check your feedback below, and click Next Question when ready.`);
    }, 600);
  };

  // Next Interview Question
  const handleNextInterviewQuestion = () => {
    if (interviewQuestionIndex < 6) {
      const nextIdx = interviewQuestionIndex + 1;
      setInterviewQuestionIndex(nextIdx);
      promptInterviewQuestion(nextIdx);
    } else {
      // Completed all 7 questions -> Generate comprehensive report
      const report = generateInterviewFeedback(interviewAnswers);
      setFinalInterviewReport(report);
      setIsInterviewFinished(true);
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.55 } });
      speak("Congratulations! You have completed all 7 mock interview questions. Here is your full AI Interview Feedback report.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8 select-none">
      {/* Top Banner & Module Navigation Header */}
      <div className="relative rounded-3xl glass-panel-glow border border-emerald-500/40 p-6 md:p-10 overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-400 text-emerald-300 text-xs font-mono font-bold tracking-wider uppercase">
              <Mic className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>TOPIC 7 • SPOKEN ENGLISH ACADEMY</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <h1 className="text-3xl md:text-5xl font-black font-display text-white tracking-tight">
              AI SPOKEN <span className="text-gradient-neon">ENGLISH COACH</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Real-time conversational English with interactive voice feedback, daily role-plays, pronunciation guidance, and an AI mock interview simulator.
            </p>
          </div>

          {/* Sound & Navigation Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={toggleMute}
              className={`p-3 rounded-2xl border transition-all ${
                isMuted
                  ? 'bg-rose-950/80 text-rose-400 border-rose-500/40'
                  : 'bg-dark-900 hover:bg-dark-850 text-cyan-300 border-cyan-500/30'
              }`}
              title={isMuted ? 'Unmute AI Voice' : 'Mute AI Voice'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {onNavigate && (
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-dark-900 hover:bg-dark-850 text-slate-200 text-xs font-bold border border-slate-700 hover:border-cyan-400 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Orbit</span>
              </button>
            )}
          </div>
        </div>

        {/* Browser Speech API Warning if unsupported */}
        {!isSpeechSupported && (
          <div className="relative z-10 mt-5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              Voice recognition is not supported in this browser. You can type your answers in any section and still enjoy complete AI feedback and voice output!
            </span>
          </div>
        )}
      </div>

      {/* 4 Feature Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
        <button
          onClick={() => setActiveTab('tutor')}
          className={`p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'tutor'
              ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200 shadow-neon-green'
              : 'border-slate-800 bg-dark-900/80 text-slate-400 hover:text-slate-200 hover:border-cyan-500/30'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>AI English Tutor</span>
        </button>

        <button
          onClick={() => setActiveTab('conversation')}
          className={`p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'conversation'
              ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200 shadow-neon-green'
              : 'border-slate-800 bg-dark-900/80 text-slate-400 hover:text-slate-200 hover:border-cyan-500/30'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Daily Conversation</span>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'practice'
              ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200 shadow-neon-green'
              : 'border-slate-800 bg-dark-900/80 text-slate-400 hover:text-slate-200 hover:border-cyan-500/30'
          }`}
        >
          <Headphones className="w-4 h-4" />
          <span>Speaking Practice</span>
        </button>

        <button
          onClick={() => setActiveTab('interview')}
          className={`p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'interview'
              ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200 shadow-neon-green'
              : 'border-slate-800 bg-dark-900/80 text-slate-400 hover:text-slate-200 hover:border-cyan-500/30'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Interview English</span>
        </button>
      </div>

      {/* ==================================================== */}
      {/* TAB 1: AI ENGLISH TUTOR                             */}
      {/* ==================================================== */}
      {activeTab === 'tutor' && (
        <div className="space-y-6">
          {/* Chat Window */}
          <div className="rounded-3xl glass-panel border border-cyan-500/30 p-5 md:p-7 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">AI English Tutor</h3>
                  <p className="text-[10px] font-mono text-emerald-400">
                    {agentStatus === 'speaking' ? 'Speaking...' : agentStatus === 'listening' ? 'Listening...' : 'Online & Ready'}
                  </p>
                </div>
              </div>

              {/* Status Waveform / Indicator */}
              <div className="flex items-center gap-1.5">
                {agentStatus === 'speaking' && (
                  <div className="flex items-center gap-1">
                    <span className="w-1 bg-cyan-400 rounded-full h-2 animate-[wave_0.8s_ease-in-out_infinite]" />
                    <span className="w-1 bg-cyan-300 rounded-full h-5 animate-[wave_0.6s_ease-in-out_infinite_0.1s]" />
                    <span className="w-1.5 bg-cyan-400 rounded-full h-7 animate-[wave_0.5s_ease-in-out_infinite_0.2s]" />
                    <span className="w-1 bg-cyan-300 rounded-full h-5 animate-[wave_0.6s_ease-in-out_infinite_0.3s]" />
                    <span className="w-1 bg-cyan-400 rounded-full h-2 animate-[wave_0.8s_ease-in-out_infinite_0.4s]" />
                  </div>
                )}
                {agentStatus === 'listening' && (
                  <span className="px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold animate-pulse flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    LISTENING...
                  </span>
                )}
              </div>
            </div>

            {/* Messages Display */}
            <div className="h-80 overflow-y-auto space-y-4 pr-2">
              {tutorMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'agent' && (
                    <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300 shrink-0 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none'
                        : 'bg-dark-900/90 border border-slate-700 text-slate-100 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="block mt-1.5 text-[10px] opacity-60 text-right font-mono">
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-blue-950 border border-blue-400 flex items-center justify-center text-blue-300 shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isAnalyzing && (
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono p-3 rounded-xl bg-dark-900/60 border border-cyan-500/20">
                  <Sparkles className="w-4 h-4 animate-spin-slow" />
                  <span>AI Tutor is analyzing grammar and phrasing...</span>
                </div>
              )}
              <div ref={tutorChatEndRef} />
            </div>

            {/* Input Bar with Mic & Send */}
            <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <button
                onClick={() => toggleListening((text) => handleSendTutorMessage(text))}
                className={`p-3.5 rounded-2xl border transition-all ${
                  agentStatus === 'listening'
                    ? 'bg-rose-500 border-rose-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.5)] animate-pulse'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-dark-950 border-emerald-400 shadow-neon-green'
                }`}
                title={agentStatus === 'listening' ? 'Stop Listening' : 'Speak into Microphone'}
              >
                {agentStatus === 'listening' ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendTutorMessage()}
                placeholder="Speak with microphone or type your sentence..."
                className="flex-1 bg-dark-900 border border-slate-700 focus:border-cyan-400 rounded-2xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
              />

              <button
                onClick={() => handleSendTutorMessage()}
                disabled={!inputText.trim() || isAnalyzing}
                className="p-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-neon-cyan"
                title="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Section 12: English Feedback Card */}
          {tutorFeedback && (
            <FeedbackDisplayCard
              analysis={tutorFeedback}
              onTryAgain={() => {
                setInputText('');
                toggleListening((text) => handleSendTutorMessage(text));
              }}
            />
          )}
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 2: DAILY CONVERSATION (7 EXACT REQUIRED TOPICS) */}
      {/* ==================================================== */}
      {activeTab === 'conversation' && (
        <div className="space-y-6">
          {/* 7 Topics Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
            {DAILY_CONVERSATION_TOPICS.map((topic) => {
              const isSelected = selectedTopicId === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => startDailyTopic(topic.id)}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                    isSelected
                      ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200 shadow-neon-green'
                      : 'border-slate-800 bg-dark-900/80 hover:bg-dark-850 hover:border-cyan-400/40 text-slate-300'
                  }`}
                >
                  <div className="text-2xl">{topic.emoji}</div>
                  <h4 className="text-xs font-bold line-clamp-1">{topic.title}</h4>
                </button>
              );
            })}
          </div>

          {/* Conversation Workspace */}
          <div className="rounded-3xl glass-panel border border-cyan-500/30 p-5 md:p-7 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  INTERACTIVE ROLE-PLAY
                </span>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <span>{activeTopic.emoji}</span>
                  <span>{activeTopic.title}</span>
                </h3>
                <p className="text-xs text-slate-400">{activeTopic.tagline}</p>
              </div>

              <button
                onClick={() => startDailyTopic(selectedTopicId)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-dark-900 text-slate-300 text-xs font-bold hover:border-cyan-400"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart Topic</span>
              </button>
            </div>

            {/* Conversation Messages */}
            <div className="h-80 overflow-y-auto space-y-4 pr-2">
              {convMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'agent' && (
                    <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-400 flex items-center justify-center text-emerald-300 shrink-0 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-tr-none'
                        : 'bg-dark-900/90 border border-slate-700 text-slate-100 rounded-tl-none'
                    }`}
                  >
                    {msg.roleName && (
                      <span className="block text-[10px] font-mono font-bold text-emerald-400 mb-1">
                        {msg.roleName}
                      </span>
                    )}
                    <p>{msg.text}</p>
                    <span className="block mt-1.5 text-[10px] opacity-60 text-right font-mono">
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-blue-950 border border-blue-400 flex items-center justify-center text-blue-300 shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isAnalyzing && (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono p-3 rounded-xl bg-dark-900/60 border border-emerald-500/20">
                  <Sparkles className="w-4 h-4 animate-spin-slow" />
                  <span>Role-play partner is thinking and analyzing your response...</span>
                </div>
              )}
              <div ref={convChatEndRef} />
            </div>

            {/* Conversation Input Bar */}
            <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <button
                onClick={() => toggleListening((text) => handleSendConvMessage(text))}
                className={`p-3.5 rounded-2xl border transition-all ${
                  agentStatus === 'listening'
                    ? 'bg-rose-500 border-rose-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.5)] animate-pulse'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-dark-950 border-emerald-400 shadow-neon-green'
                }`}
                title={agentStatus === 'listening' ? 'Stop Listening' : 'Speak into Microphone'}
              >
                {agentStatus === 'listening' ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendConvMessage()}
                placeholder="Speak your response or type here..."
                className="flex-1 bg-dark-900 border border-slate-700 focus:border-emerald-400 rounded-2xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
              />

              <button
                onClick={() => handleSendConvMessage()}
                disabled={!inputText.trim() || isAnalyzing}
                className="p-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-neon-green"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Real-time Feedback on Conversation Turn */}
          {convFeedback && (
            <FeedbackDisplayCard
              analysis={convFeedback}
              onTryAgain={() => {
                setInputText('');
                toggleListening((text) => handleSendConvMessage(text));
              }}
            />
          )}
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 3: SPEAKING PRACTICE (DEDICATED 5-PART FEEDBACK) */}
      {/* ==================================================== */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          {/* Prompt Selector Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-dark-900/80 border border-cyan-500/20">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                Challenge {practiceIndex + 1} of {SPEAKING_PRACTICE_PROMPTS.length}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono">
                {currentPrompt.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const prev = (practiceIndex - 1 + SPEAKING_PRACTICE_PROMPTS.length) % SPEAKING_PRACTICE_PROMPTS.length;
                  setPracticeIndex(prev);
                  setPracticeFeedback(null);
                  setInputText('');
                }}
                className="p-2 rounded-lg border border-slate-700 bg-dark-850 hover:border-cyan-400 text-slate-300 text-xs"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  const next = (practiceIndex + 1) % SPEAKING_PRACTICE_PROMPTS.length;
                  setPracticeIndex(next);
                  setPracticeFeedback(null);
                  setInputText('');
                }}
                className="p-2 rounded-lg border border-slate-700 bg-dark-850 hover:border-cyan-400 text-slate-300 text-xs"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Prompt Card */}
          <div className="rounded-3xl glass-panel-glow border border-emerald-500/30 p-6 md:p-8 space-y-6">
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <p className="text-xs font-mono uppercase text-emerald-400 tracking-widest font-bold">
                AI Speaking Prompt
              </p>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                "{currentPrompt.question}"
              </h2>
              <p className="text-xs text-slate-400 italic">
                Tip: {currentPrompt.guidance}
              </p>
            </div>

            {/* Voice Input Center Interaction */}
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <button
                onClick={() => toggleListening((text) => handleCheckSpeakingPractice(text))}
                className={`w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all transform active:scale-95 ${
                  agentStatus === 'listening'
                    ? 'bg-rose-500 border-rose-400 text-white shadow-[0_0_35px_rgba(244,63,94,0.6)] animate-pulse scale-105'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-dark-950 border-emerald-300 shadow-neon-green hover:scale-105'
                }`}
                title="Tap to speak"
              >
                {agentStatus === 'listening' ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>

              <div className="text-center font-mono text-xs">
                {agentStatus === 'listening' ? (
                  <span className="text-rose-400 font-bold animate-pulse">
                    🔴 Listening... Speak now
                  </span>
                ) : (
                  <span className="text-slate-400">
                    🎤 Tap microphone to speak your answer
                  </span>
                )}
              </div>
            </div>

            {/* Optional Manual Text Input Fallback */}
            <div className="max-w-xl mx-auto flex items-center gap-2 pt-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCheckSpeakingPractice()}
                placeholder="Or type your response here..."
                className="flex-1 bg-dark-900 border border-slate-700 focus:border-emerald-400 rounded-2xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none"
              />
              <button
                onClick={() => handleCheckSpeakingPractice()}
                disabled={!inputText.trim() || isAnalyzing}
                className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs uppercase transition-all disabled:opacity-40"
              >
                Analyze
              </button>
            </div>
          </div>

          {/* Section 14: Comprehensive 5-part Feedback */}
          {practiceFeedback && (
            <DetailedFivePointFeedback
              analysis={practiceFeedback}
              onTryAgain={() => {
                setPracticeFeedback(null);
                setInputText('');
                toggleListening((text) => handleCheckSpeakingPractice(text));
              }}
            />
          )}
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 4: INTERVIEW ENGLISH (7 QUESTIONS SEQUENTIAL)   */}
      {/* ==================================================== */}
      {activeTab === 'interview' && (
        <div className="space-y-6">
          {!isInterviewFinished ? (
            <div className="space-y-6">
              {/* Question Progress Tracker */}
              <div className="p-4 rounded-2xl bg-dark-900/90 border border-cyan-500/20 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold">
                    QUESTION {interviewQuestionIndex + 1} OF 7
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {currentInterviewQ.category}
                  </span>
                </div>

                {/* Progress Indicators */}
                <div className="flex items-center gap-1.5">
                  {INTERVIEW_QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`w-7 h-2 rounded-full transition-all ${
                        i === interviewQuestionIndex
                          ? 'bg-cyan-400 shadow-neon-cyan'
                          : i < interviewQuestionIndex
                          ? 'bg-emerald-500'
                          : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Active Interview Question Card */}
              <div className="rounded-3xl glass-panel-glow border border-cyan-500/40 p-6 md:p-10 space-y-6 text-center">
                <div className="space-y-3 max-w-2xl mx-auto">
                  <p className="text-xs font-mono uppercase text-cyan-400 tracking-[0.25em] font-bold">
                    AI Interviewer
                  </p>
                  <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                    "{currentInterviewQ.question}"
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    💡 <strong>Interviewer Advice:</strong> {currentInterviewQ.tip}
                  </p>
                </div>

                {/* Microphone Record Center */}
                <div className="flex flex-col items-center justify-center gap-3 py-4">
                  <button
                    onClick={() => toggleListening((text) => handleCheckInterviewAnswer(text))}
                    className={`w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all transform active:scale-95 ${
                      agentStatus === 'listening'
                        ? 'bg-rose-500 border-rose-400 text-white shadow-[0_0_35px_rgba(244,63,94,0.6)] animate-pulse scale-105'
                        : 'bg-gradient-to-tr from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-dark-950 border-cyan-300 shadow-neon-cyan hover:scale-105'
                    }`}
                    title="Tap to speak your interview answer"
                  >
                    {agentStatus === 'listening' ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                  </button>

                  <p className="text-xs font-mono text-slate-400">
                    {agentStatus === 'listening' ? (
                      <span className="text-rose-400 font-bold animate-pulse">
                        🔴 Listening to your answer...
                      </span>
                    ) : (
                      <span>🎤 Tap microphone to answer Question {interviewQuestionIndex + 1}</span>
                    )}
                  </p>
                </div>

                {/* Text Input Option */}
                <div className="max-w-xl mx-auto flex items-center gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCheckInterviewAnswer()}
                    placeholder="Or type your interview response here..."
                    className="flex-1 bg-dark-900 border border-slate-700 focus:border-cyan-400 rounded-2xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none"
                  />
                  <button
                    onClick={() => handleCheckInterviewAnswer()}
                    disabled={!inputText.trim() || isAnalyzing}
                    className="px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold text-xs uppercase transition-all disabled:opacity-40"
                  >
                    Submit
                  </button>
                </div>
              </div>

              {/* Feedback on Current Interview Question Answer */}
              {currentInterviewFeedback && (
                <div className="space-y-4">
                  <FeedbackDisplayCard
                    analysis={currentInterviewFeedback}
                    onTryAgain={() => {
                      setCurrentInterviewFeedback(null);
                      setInputText('');
                      toggleListening((text) => handleCheckInterviewAnswer(text));
                    }}
                  />

                  {/* Next Question Navigation Button */}
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleNextInterviewQuestion}
                      className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-dark-950 font-black text-sm shadow-neon-cyan transition-all transform hover:scale-105 active:scale-95"
                    >
                      <span>
                        {interviewQuestionIndex < 6 ? 'Next Question →' : 'Complete Interview & View Report →'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ==================================================== */
            /* SECTION 16: AI INTERVIEW FEEDBACK FULL REPORT        */
            /* ==================================================== */
            <div className="rounded-3xl glass-panel-glow border border-emerald-500/50 p-6 md:p-10 space-y-8 animate-in fade-in zoom-in-95 duration-300 shadow-2xl">
              <div className="text-center space-y-3 border-b border-slate-800 pb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-400 text-emerald-300 text-xs font-mono font-bold uppercase tracking-widest">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>SESSION COMPLETE</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black font-display text-white">
                  # AI INTERVIEW FEEDBACK
                </h1>
                <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto">
                  {finalInterviewReport?.overallSummary}
                </p>
              </div>

              {/* Summary Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-dark-900/80 border border-slate-800">
                  <p className="text-[10px] font-mono uppercase text-slate-500 font-bold">Questions Completed</p>
                  <p className="mt-1 text-2xl font-black text-emerald-300">
                    {finalInterviewReport?.questionsCompleted}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-dark-900/80 border border-slate-800">
                  <p className="text-[10px] font-mono uppercase text-slate-500 font-bold">Practice Mode</p>
                  <p className="mt-1 text-sm font-bold text-cyan-300">
                    Full Mock Interview
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-dark-900/80 border border-slate-800">
                  <p className="text-[10px] font-mono uppercase text-slate-500 font-bold">Fluency Assessment</p>
                  <p className="mt-1 text-xs font-semibold text-slate-200">
                    {finalInterviewReport?.fluencySummary}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-dark-900/80 border border-slate-800">
                  <p className="text-[10px] font-mono uppercase text-slate-500 font-bold">Speech Analysis Basis</p>
                  <p className="mt-1 text-xs text-slate-400 font-mono">
                    Transcript & Clarity Signals
                  </p>
                </div>
              </div>

              {/* Detailed Breakdown Sections */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* 1. Grammar Improvement */}
                <div className="p-5 rounded-2xl bg-dark-900/80 border border-cyan-500/30 space-y-3">
                  <h4 className="text-sm font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Grammar Improvement Areas</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {finalInterviewReport?.grammarImprovementAreas.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Vocabulary Improvement */}
                <div className="p-5 rounded-2xl bg-dark-900/80 border border-emerald-500/30 space-y-3">
                  <h4 className="text-sm font-black text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Vocabulary Improvement Areas</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {finalInterviewReport?.vocabularyImprovementAreas.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Pronunciation Practice */}
                <div className="p-5 rounded-2xl bg-dark-900/80 border border-amber-500/30 space-y-3">
                  <h4 className="text-sm font-black text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <Mic className="w-4 h-4 text-amber-400" />
                    <span>Pronunciation Practice Areas</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {finalInterviewReport?.pronunciationPracticeAreas.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Question-by-Question Transcript Review */}
              <div className="space-y-4">
                <h3 className="text-lg font-black text-white">
                  Speaking Practice Review (7 Questions)
                </h3>
                <div className="space-y-3">
                  {interviewAnswers.map((ans, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-dark-900/60 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-cyan-300 font-bold">
                          Question {ans.questionNum}: {ans.question}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">
                        <strong className="text-slate-400">Your Answer:</strong> "{ans.userAnswer}"
                      </p>
                      <p className="text-xs text-emerald-300 font-medium">
                        <strong className="text-emerald-400">Polished Version:</strong> "{ans.analysis?.betterSentence}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset / New Mock Interview Action */}
              <div className="pt-4 flex justify-center">
                <button
                  onClick={startInterview}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 text-dark-950 font-black text-sm uppercase shadow-neon-green transition-all transform hover:scale-105 active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Start New Mock Interview</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// SECTION 12 REUSABLE FEEDBACK CARD
// ----------------------------------------------------
function FeedbackDisplayCard({ analysis, onTryAgain }) {
  if (!analysis) return null;

  return (
    <div className="rounded-3xl glass-panel-glow border border-emerald-500/40 p-5 md:p-7 space-y-4 animate-in fade-in duration-300 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <h4 className="text-sm font-black text-white uppercase tracking-wider">
            English Feedback
          </h4>
        </div>

        <button
          onClick={onTryAgain}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 text-xs font-black shadow-neon-green transition-all transform hover:scale-105 active:scale-95"
        >
          <Mic className="w-3.5 h-3.5" />
          <span>Try Again 🎤</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
        {/* Your Sentence */}
        <div className="p-4 rounded-2xl bg-dark-900/80 border border-slate-800 space-y-1">
          <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">
            Your Sentence
          </p>
          <p className="text-slate-100 font-medium">"{analysis.userSentence}"</p>
        </div>

        {/* Correction */}
        <div className="p-4 rounded-2xl bg-dark-900/80 border border-cyan-500/20 space-y-1">
          <p className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
            Correction
          </p>
          <p className="text-cyan-200 font-medium">"{analysis.correction}"</p>
        </div>
      </div>

      {/* Better Sentence */}
      <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
        <p className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
          Better Sentence
        </p>
        <p className="text-emerald-200 font-semibold text-sm sm:text-base">
          "{analysis.betterSentence}"
        </p>
      </div>

      {/* Grammar & Pronunciation Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-dark-900/60 border border-slate-800 space-y-1">
          <strong className="text-cyan-300 block font-mono">Grammar Feedback:</strong>
          <p className="text-slate-300 leading-relaxed">{analysis.grammarFeedback}</p>
        </div>
        <div className="p-3 rounded-xl bg-dark-900/60 border border-slate-800 space-y-1">
          <strong className="text-amber-300 block font-mono">Pronunciation Feedback:</strong>
          <p className="text-slate-300 leading-relaxed">{analysis.pronunciationFeedback}</p>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// SECTION 14 REUSABLE 5-POINT DETAILED FEEDBACK CARD
// ----------------------------------------------------
function DetailedFivePointFeedback({ analysis, onTryAgain }) {
  if (!analysis) return null;

  return (
    <div className="rounded-3xl glass-panel-glow border border-emerald-500/50 p-6 md:p-8 space-y-5 animate-in fade-in duration-300 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
            DETAILED SPEECH ANALYSIS
          </span>
          <h3 className="text-lg font-black text-white">5-Point Feedback Breakdown</h3>
        </div>

        <button
          onClick={onTryAgain}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 text-xs font-black shadow-neon-green transition-all transform hover:scale-105 active:scale-95"
        >
          <Mic className="w-4 h-4" />
          <span>Try Again 🎤</span>
        </button>
      </div>

      {/* Comparison: Your Answer vs Better Version */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-dark-900/90 border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Your Answer:</span>
          <p className="text-sm font-medium text-slate-100">"{analysis.userSentence}"</p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
          <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Better Version:</span>
          <p className="text-sm font-bold text-emerald-200">"{analysis.betterSentence}"</p>
        </div>
      </div>

      {/* 5 Points Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* 1. Grammar */}
        <div className="p-4 rounded-2xl bg-dark-900/80 border border-cyan-500/20 space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">1. Grammar</span>
          <p className="text-slate-300 leading-relaxed">{analysis.grammarFeedback}</p>
        </div>

        {/* 2. Pronunciation */}
        <div className="p-4 rounded-2xl bg-dark-900/80 border border-amber-500/20 space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">2. Pronunciation</span>
          <p className="text-slate-300 leading-relaxed">{analysis.pronunciationFeedback}</p>
        </div>

        {/* 3. Sentence Structure */}
        <div className="p-4 rounded-2xl bg-dark-900/80 border border-purple-500/20 space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block">3. Sentence Structure</span>
          <p className="text-slate-300 leading-relaxed">{analysis.sentenceStructure}</p>
        </div>

        {/* 4. Fluency */}
        <div className="p-4 rounded-2xl bg-dark-900/80 border border-emerald-500/20 space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">4. Fluency</span>
          <p className="text-slate-300 leading-relaxed">{analysis.fluency}</p>
        </div>
      </div>
    </div>
  );
}
