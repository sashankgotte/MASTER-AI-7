import React, { createContext, useContext } from 'react';

const LevelContext = createContext();

export const EDUCATION_LEVELS = {
  STANDARD: {
    id: 'standard',
    label: 'STANDARD',
    icon: '⚡',
    badge: 'Complete Learning Path',
    description: 'A complete learning path with practical explanations, projects, and guided practice.',
    color: 'from-cyan-400 to-blue-500',
    accentColor: '#00f0ff',
  }
};

export function LevelProvider({ children }) {
  const currentLevel = 'standard';
  const currentLevelInfo = EDUCATION_LEVELS.STANDARD;
  const setLevel = () => {};

  return (
    <LevelContext.Provider
      value={{
        currentLevel,
        setLevel,
        currentLevelInfo,
        allLevels: []
      }}
    >
      {children}
    </LevelContext.Provider>
  );
}

export const useLevel = () => useContext(LevelContext);

