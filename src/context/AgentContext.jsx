import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { speechService } from '../utils/speechUtils';
import { createLearningGuide, guideToSpeech } from '../utils/learningGuide';

const AgentContext = createContext();

export function AgentProvider({ children }) {
  const [agentStatus, setAgentStatus] = useState('idle'); // 'idle' | 'listening' | 'thinking' | 'speaking'
  const [isMuted, setIsMuted] = useState(false);
  const [currentText, setCurrentText] = useState("Hello! I am your MASTER AI 7 Learning Guide. Select a topic or speak with me!");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'agent',
      text: "👋 Welcome to MASTER AI 7! I am your personal AI Guide. Click on any of the 7 orbiting topics or ask me any question about Artificial Intelligence, Prompts, Projects, Resumes, or Spoken English!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Hook speech status into Agent status
  useEffect(() => {
    speechService.onSpeakingStateChange = (isSpeaking) => {
      if (isSpeaking) {
        setAgentStatus('speaking');
      } else {
        setAgentStatus(prev => (prev === 'speaking' ? 'idle' : prev));
      }
    };

    speechService.onListeningStateChange = (isListening) => {
      if (isListening) {
        setAgentStatus('listening');
      } else {
        setAgentStatus(prev => (prev === 'listening' ? 'idle' : prev));
      }
    };

    return () => {
      speechService.stopSpeaking();
      speechService.stopListening();
    };
  }, []);

  const speak = useCallback((text, options = {}) => {
    if (isMuted) return;
    setCurrentText(text);
    setAgentStatus('speaking');
    speechService.speak(text, {
      ...options,
      onEnd: () => {
        setAgentStatus('idle');
        if (options.onEnd) options.onEnd();
      },
      onError: () => {
        setAgentStatus('idle');
        if (options.onError) options.onError();
      }
    });
  }, [isMuted]);

  const stopSpeaking = useCallback(() => {
    speechService.stopSpeaking();
    setAgentStatus('idle');
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      if (!prev) {
        speechService.stopSpeaking();
      }
      return !prev;
    });
  }, []);

  const startVoiceInput = useCallback((onResult, onEnd) => {
    setAgentStatus('listening');
    return speechService.startListening({
      onResult: (transcript, isFinal) => {
        if (onResult) onResult(transcript, isFinal);
      },
      onEnd: (finalTranscript) => {
        setAgentStatus('idle');
        if (onEnd) onEnd(finalTranscript);
      },
      onError: (err) => {
        setAgentStatus('idle');
        console.warn('Voice input error:', err);
      }
    });
  }, []);

  const stopVoiceInput = useCallback(() => {
    speechService.stopListening();
    setAgentStatus('idle');
  }, []);

  const clearChat = useCallback(() => {
    setChatMessages([]);
    setAgentStatus('idle');
    setCurrentText('Ask a question about any Master AI 7 module.');
  }, []);

  const sendMessageToAgent = useCallback(async (text, contextLevel = 'advanced') => {
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setAgentStatus('thinking');

    await new Promise((resolve) => window.setTimeout(resolve, 450));
    const reply = createLearningGuide(text);

      const agentMsg = {
        sender: 'agent',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, agentMsg]);
      setAgentStatus('idle');

      if (!isMuted) {
        speak(guideToSpeech(reply));
      }
  }, [isMuted, speak]);

  return (
    <AgentContext.Provider
      value={{
        agentStatus,
        setAgentStatus,
        isMuted,
        toggleMute,
        currentText,
        speak,
        stopSpeaking,
        startVoiceInput,
        stopVoiceInput,
        isDrawerOpen,
        setIsDrawerOpen,
        chatMessages,
        sendMessageToAgent,
        clearChat
      }}
    >
      {children}
    </AgentContext.Provider>
  );
}

export const useAgent = () => useContext(AgentContext);

