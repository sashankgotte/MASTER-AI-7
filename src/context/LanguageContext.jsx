import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LANGUAGES = {
  EN: {
    id: 'en',
    label: 'English',
    nativeLabel: 'English',
    flag: '🌐',
    code: 'en-US'
  },
  TE: {
    id: 'te',
    label: 'Telugu',
    nativeLabel: 'తెలుగు',
    flag: '🇮🇳',
    code: 'te-IN'
  }
};

const STORAGE_LANG_KEY = 'master_ai_7_lang';

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_LANG_KEY);
      if (saved && (saved === 'en' || saved === 'te')) {
        return saved;
      }
    }
    return 'en';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_LANG_KEY, language);
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'te' : 'en'));
  };

  const isTelugu = language === 'te';

  // Common UI labels in English & Telugu
  const translations = {
    en: {
      appName: 'MASTER AI 7',
      tagline: 'LEARN • CREATE • INNOVATE',
      footerQuote: 'Your Interest, Your World',
      footerAction: 'DISCOVER • LEARN • GROW',
      chooseLevel: 'Choose Your Learning Level',
      home: 'HOME',
      profile: 'PROFILE',
      listenAI: 'Hear AI Explanation',
      askAI: 'Ask AI Guide',
      startLearning: 'Start Learning',
      videosTitle: '🎥 AI LEARNING VIDEOS',
      iqGameTitle: '🧠 AI IQ / BRAIN GAME',
      watchVideo: 'Watch Video',
      playQuiz: 'Start IQ Game',
      listening: 'LISTENING...',
      thinking: 'THINKING...',
      speaking: 'SPEAKING...',
      ready: 'READY • YOUR AI GUIDE',
      englishMode: 'English Mode',
      teluguSupportMode: 'Telugu Support Mode',
      yourSentence: 'Your Sentence',
      betterSentence: 'Better Sentence',
      whyBetter: 'Why It Is Better',
      teluguExplanation: 'Telugu Explanation',
      nextQuestion: 'Next Question',
      score: 'Score',
      correct: 'Correct',
      wrong: 'Wrong',
      retry: 'Try Again',
      submit: 'Submit'
    },
    te: {
      appName: 'మాస్టర్ AI 7',
      tagline: 'నేర్చుకోండి • సృష్టించండి • సరికొత్త ఆవిష్కరణలు చేయండి',
      footerQuote: 'మీ ఆసక్తి, మీ ప్రపంచం',
      footerAction: 'కనుగొనండి • నేర్చుకోండి • ఎదగండి',
      chooseLevel: 'మీ విద్యా స్థాయిని ఎంచుకోండి',
      home: 'హోమ్',
      profile: 'ప్రొఫైల్',
      listenAI: 'AI వివరణ వినండి',
      askAI: 'AI టీచర్‌ని అడగండి',
      startLearning: 'నేర్చుకోవడం ప్రారంభించండి',
      videosTitle: '🎥 AI అభ్యాస వీడియోలు (AI Learning Videos)',
      iqGameTitle: '🧠 AI ఐక్యు / బ్రెయిన్ గేమ్ (AI IQ Game)',
      watchVideo: 'వీడియో చూడండి',
      playQuiz: 'ఐక్యు గేమ్ ఆడండి',
      listening: 'వింటోంది... (LISTENING)',
      thinking: 'ఆలోచిస్తోంది... (THINKING)',
      speaking: 'మాట్లాడుతోంది... (SPEAKING)',
      ready: 'సిద్ధంగా ఉంది • మీ AI గైడ్',
      englishMode: 'ఇంగ్లీష్ మోడ్',
      teluguSupportMode: 'తెలుగు సపోర్ట్ మోడ్',
      yourSentence: 'మీరు చెప్పిన వాక్యం',
      betterSentence: 'మరింత చక్కటి వాక్యం',
      whyBetter: 'ఇది ఎందుకు మెరుగైనది',
      teluguExplanation: 'తెలుగు వివరణ',
      nextQuestion: 'తరువాతి ప్రశ్న',
      score: 'స్కోర్',
      correct: 'సరైనది',
      wrong: 'తప్పు',
      retry: 'మళ్ళీ ప్రయత్నించండి',
      submit: 'సమర్పించండి'
    }
  };

  const t = (key) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isTelugu,
        t,
        allLanguages: Object.values(LANGUAGES)
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
