import React, { useState, useEffect } from 'react';
import { LevelProvider } from './context/LevelContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { AgentProvider, useAgent } from './context/AgentContext';

import NeuralBackground from './components/common/NeuralBackground';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AuthModal from './components/common/AuthModal';
import GlobalAIAssistant from './components/assistant/GlobalAIAssistant';

import OrbitalDashboard from './components/home/OrbitalDashboard';
import WhatIsAI from './components/modules/WhatIsAI';
import HowAIWorks from './components/modules/HowAIWorks';
import PromptEngineering from './components/modules/PromptEngineering';
import AITools from './components/modules/AITools';
import AIProjects from './components/modules/AIProjects';
import AIResume from './components/modules/AIResume';
import SpokenEnglish from './components/modules/SpokenEnglish';
import IQGamesSection from './components/home/IQGamesSection';

function MainApp() {
  const [activeSection, setActiveSection] = useState('home');
  const { speak } = useAgent();

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartTour = () => {
    handleNavigate('what-is-ai');
  };

  return (
    <div className="relative min-h-screen bg-dark-950 text-slate-100 flex flex-col selection:bg-cyan-400 selection:text-dark-950">
      {/* Interactive Neural Constellation Background */}
      <NeuralBackground />

      {/* Main Header / Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main View Area */}
      <main className="flex-1 relative z-10">
        {activeSection === 'home' && (
          <OrbitalDashboard onSelectTopic={handleNavigate} onStartTour={handleStartTour} />
        )}
        {activeSection === 'what-is-ai' && (
          <WhatIsAI onNavigate={handleNavigate} />
        )}
        {activeSection === 'how-ai-works' && (
          <HowAIWorks onNavigate={handleNavigate} />
        )}
        {activeSection === 'prompt-engineering' && (
          <PromptEngineering onNavigate={handleNavigate} />
        )}
        {activeSection === 'ai-tools' && (
          <AITools onNavigate={handleNavigate} />
        )}
        {activeSection === 'ai-projects' && (
          <AIProjects onNavigate={handleNavigate} />
        )}
        {activeSection === 'ai-resume' && (
          <AIResume onNavigate={handleNavigate} />
        )}
        {activeSection === 'spoken-english' && (
          <SpokenEnglish onNavigate={handleNavigate} />
        )}
        {activeSection === 'iq-games' && <IQGamesSection />}
      </main>

      {/* Global AI Assistant Floating Companion */}
      <GlobalAIAssistant />

      {/* Authentication & Profile Modal */}
      <AuthModal />

      {/* Platform Brand Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LevelProvider>
        <LanguageProvider>
          <AgentProvider>
            <MainApp />
          </AgentProvider>
        </LanguageProvider>
      </LevelProvider>
    </AuthProvider>
  );
}

