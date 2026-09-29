import React, { useState, useRef, useEffect } from 'react';
import { useAgent } from '../../context/AgentContext';
import {
  Sparkles,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Bot,
  User,
  RotateCcw,
  Zap,
  Trash2
} from 'lucide-react';

function GuideAnswer({ answer }) {
  if (!answer || typeof answer === 'string') return <div className="whitespace-pre-wrap">{answer}</div>;
  return (
    <div className="space-y-3 text-xs leading-relaxed">
      <h3 className="text-sm font-bold text-cyan-200">{answer.title}</h3>
      <p>{answer.definition}</p>
      {answer.sections.map((section, index) => (
        <section key={`${section.title}-${index}`} className="space-y-1.5">
          <h4 className="font-bold text-white">{section.title}</h4>
          {section.type === 'steps' && (
            <ol className="list-decimal space-y-1.5 pl-5">
              {section.items.map((item, itemIndex) => <li key={`${item}-${itemIndex}`}>{item}</li>)}
            </ol>
          )}
          {section.type === 'list' && (
            <ul className="space-y-1.5">
              {section.items.map((item, itemIndex) => <li className="flex gap-2" key={`${item}-${itemIndex}`}><span className="text-cyan-300">•</span><span>{item}</span></li>)}
            </ul>
          )}
          {section.type === 'table' && (
            <div className="overflow-x-auto rounded-lg border border-cyan-500/20">
              <table className="min-w-full text-left text-[11px]">
                <thead className="bg-cyan-950/60 text-cyan-200"><tr>{section.headers.map((header) => <th className="px-2 py-1.5 font-bold" key={header}>{header}</th>)}</tr></thead>
                <tbody>{section.rows.map((row, rowIndex) => <tr className="border-t border-cyan-500/10" key={rowIndex}>{row.map((cell, cellIndex) => <td className="px-2 py-1.5 align-top" key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
          )}
        </section>
      ))}
      <p className="border-t border-cyan-500/20 pt-2 text-cyan-100"><strong>In short:</strong> {answer.inShort}</p>
    </div>
  );
}

export default function GlobalAIAssistant() {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    chatMessages,
    sendMessageToAgent,
    clearChat,
    agentStatus,
    isMuted,
    toggleMute,
    startVoiceInput,
    stopVoiceInput
  } = useAgent();

  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isDrawerOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isDrawerOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessageToAgent(inputText);
    setInputText('');
  };

  const handleMicClick = () => {
    if (agentStatus === 'listening') {
      stopVoiceInput();
    } else {
      startVoiceInput(
        (transcript, isFinal) => {
          setInputText(transcript);
          if (isFinal) {
            sendMessageToAgent(transcript);
            setInputText('');
          }
        }
      );
    }
  };

  const quickPrompts = [
    { label: '🧠 Explain AI simply', text: 'Explain what AI is in simple words with examples.' },
    { label: '⚙️ How does AI train?', text: 'How does an AI model learn from training data?' },
    { label: '✍️ Best Prompt Formula', text: 'What is the 5-part formula for a high quality prompt?' },
    { label: '🗣️ Practice Spoken English', text: 'Let’s practice an English conversation for a technical interview.' }
  ];

  return (
    <>
      {/* Floating Summon Bubble */}
      {!isDrawerOpen && (
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-dark-950 font-bold shadow-neon-cyan hover:scale-105 active:scale-95 transition-all group"
          title="Open MASTER AI 7 Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-dark-950" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-300 animate-ping" />
          </div>
          <span className="text-xs font-mono tracking-wider font-extrabold">
            ASK AI GUIDE
          </span>
        </button>
      )}

      {/* Slide-in Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 glass-panel-glow border-l border-cyan-500/40 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 border-b border-cyan-500/30 flex items-center justify-between bg-dark-900/90">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-neon-cyan">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-display">
                  MASTER AI 7 GUIDE
                </h4>
                <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                  <span className={`w-1.5 h-1.5 rounded-full ${agentStatus === 'speaking' ? 'bg-cyan-400 animate-ping' : agentStatus === 'listening' ? 'bg-emerald-400 animate-ping' : 'bg-emerald-500'}`} />
                  <span>{agentStatus === 'speaking' ? 'Speaking...' : agentStatus === 'listening' ? 'Listening...' : agentStatus === 'thinking' ? 'Thinking...' : 'Online • Ready to help'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={toggleMute}
                className={`p-1.5 rounded-lg border ${
                  isMuted ? 'bg-rose-950/40 text-rose-400 border-rose-500/30' : 'bg-dark-850 text-cyan-300 border-cyan-500/20'
                }`}
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={clearChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-dark-800 transition-colors"
                title="Clear conversation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick suggestions pills */}
          <div className="px-3 py-2 bg-dark-950/70 border-b border-cyan-900/30 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => sendMessageToAgent(q.text)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-dark-850 hover:bg-cyan-950 border border-cyan-500/20 hover:border-cyan-400 text-[11px] text-slate-300 hover:text-cyan-300 transition-all font-mono"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Chat Messages List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg, idx) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-400/60 flex items-center justify-center text-cyan-300 flex-shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
                      isUser
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none shadow-md'
                        : 'bg-dark-850 border border-cyan-500/20 text-slate-200 rounded-bl-none shadow-inner'
                    }`}
                  >
                    {isUser ? <div className="whitespace-pre-wrap">{msg.text}</div> : <GuideAnswer answer={msg.text} />}
                    <div
                      className={`text-[9px] mt-1 text-right font-mono ${
                        isUser ? 'text-cyan-200/80' : 'text-slate-500'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                  {isUser && (
                    <div className="w-7 h-7 rounded-lg bg-purple-950 border border-purple-400/60 flex items-center justify-center text-purple-300 flex-shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {agentStatus === 'thinking' && (
              <div className="flex items-center gap-2 text-xs font-mono text-purple-400 p-2 rounded-lg bg-dark-850/80 border border-purple-500/30 w-fit">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>AI Guide is reasoning...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-cyan-500/30 bg-dark-900/90 flex items-center gap-2"
          >
            <button
              type="button"
              onClick={handleMicClick}
              className={`p-2.5 rounded-xl border transition-all ${
                agentStatus === 'listening'
                  ? 'bg-emerald-500 text-dark-950 border-emerald-400 shadow-neon-green animate-pulse'
                  : 'bg-dark-850 hover:bg-dark-800 text-cyan-300 border-cyan-500/30'
              }`}
              title="Voice Input (STT)"
            >
              {agentStatus === 'listening' ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              placeholder={agentStatus === 'listening' ? 'Listening to your voice...' : 'Ask your AI Guide anything...'}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3 py-2.5 rounded-xl bg-dark-950 border border-cyan-500/30 text-slate-100 text-xs focus:outline-none focus:border-cyan-400"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-dark-950 font-bold shadow-neon-cyan transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

