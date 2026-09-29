import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const STORAGE_KEY = 'master_ai_7_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
    }
    return {
      isLoggedIn: true,
      name: 'Alex AI Explorer',
      email: 'student@masterai7.edu',
      avatar: '🤖',
      xp: 450,
      streak: 5,
      completedTopics: [1, 2],
      completedProjects: ['teachable-machine'],
      spokenScores: [92, 88, 95]
    };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup' | 'forgot' | 'profile'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  }, [user]);

  const login = (email, password) => {
    const updated = {
      ...user,
      isLoggedIn: true,
      email: email || 'student@masterai7.edu',
      name: email ? email.split('@')[0] : 'Master Student'
    };
    setUser(updated);
    setIsAuthModalOpen(false);
    return true;
  };

  const signup = (name, email, level) => {
    const updated = {
      ...user,
      isLoggedIn: true,
      name: name || 'New Explorer',
      email: email || 'user@masterai7.edu',
      xp: 100,
      streak: 1,
      completedTopics: []
    };
    setUser(updated);
    setIsAuthModalOpen(false);
    return true;
  };

  const logout = () => {
    setUser(prev => ({
      ...prev,
      isLoggedIn: false
    }));
  };

  const updateProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const markTopicComplete = (topicNumber) => {
    setUser(prev => {
      if (prev.completedTopics.includes(topicNumber)) return prev;
      return {
        ...prev,
        completedTopics: [...prev.completedTopics, topicNumber],
        xp: prev.xp + 100
      };
    });
  };

  const recordSpokenScore = (score) => {
    setUser(prev => ({
      ...prev,
      spokenScores: [...(prev.spokenScores || []), score],
      xp: prev.xp + 50
    }));
  };

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuth = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateProfile,
        markTopicComplete,
        recordSpokenScore,
        isAuthModalOpen,
        authMode,
        openAuth,
        closeAuth,
        setAuthMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

