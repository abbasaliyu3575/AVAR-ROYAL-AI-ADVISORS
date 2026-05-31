
import React, { useState, useEffect } from 'react';
import { AppTab } from './types';
import { Persona } from './services/geminiService';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import HashtagGenerator from './components/HashtagGenerator';
import ImageGenerator from './components/ImageGenerator';
import Chatbot from './components/Chatbot';
import LiveSession from './components/LiveSession';
import BiometricSecurity from './components/BiometricSecurity';
import SovereignBank from './components/SovereignBank';
import RoyalTycoon from './components/RoyalTycoon';
import RoyalAcademy from './components/RoyalAcademy';
import HeavyIndustries from './components/HeavyIndustries';
import NuclearGuard from './components/NuclearGuard';
import GlobalIntel from './components/GlobalIntel';
import SecretArchives from './components/SecretArchives';
import AIFlowStudio from './components/AIFlowStudio';

import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(() => {
    const saved = localStorage.getItem('avar_active_tab');
    return (saved as AppTab) || AppTab.DASHBOARD;
  });
  const [isAuthorized, setIsAuthorized] = useState(() => {
    return localStorage.getItem('avar_sovereign_authorized') === 'true';
  });
  const [isInitializing, setIsInitializing] = useState(true);
  const [targetPersona, setTargetPersona] = useState<Persona | undefined>(() => {
    const saved = localStorage.getItem('avar_target_persona');
    return (saved as Persona) || undefined;
  });

  const handleNavigateToChat = (personaId: Persona) => {
    setTargetPersona(personaId);
    setActiveTab(AppTab.CHAT);
  };

  useEffect(() => {
    localStorage.setItem('avar_active_tab', activeTab);
    if (activeTab !== AppTab.CHAT) {
      setTargetPersona(undefined);
    }
  }, [activeTab]);

  useEffect(() => {
    if (targetPersona) {
      localStorage.setItem('avar_target_persona', targetPersona);
    } else {
      localStorage.removeItem('avar_target_persona');
    }
  }, [targetPersona]);

  useEffect(() => {
    const handleBack = () => setActiveTab(AppTab.DASHBOARD);
    window.addEventListener('nav-dashboard', handleBack);
    // Simulate initial system check
    const timer = setTimeout(() => setIsInitializing(false), 2000);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('nav-dashboard', handleBack);
    };
  }, []);

  if (isInitializing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 mb-8 relative"
        >
           <div className="absolute inset-0 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
           <div className="absolute inset-4 border-4 border-indigo-500 border-b-transparent rounded-full animate-spin-slow"></div>
        </motion.div>
        <h1 className="text-3xl font-bold gold-text tracking-widest uppercase animate-pulse text-center px-4">
          AVAR SOVEREIGN V3.0
        </h1>
        <p className="mt-4 text-slate-400 font-mono">Initializing Neural Dynasty V3.0...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <BiometricSecurity 
        onVerify={() => {
          localStorage.setItem('avar_sovereign_authorized', 'true');
          setIsAuthorized(true);
        }} 
      />
    );
  }

  const renderContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={activeTab === AppTab.CHAT ? "h-full w-full" : ""}
        >
          {(() => {
            switch (activeTab) {
              case AppTab.DASHBOARD:
                return <Dashboard onNavigateToChat={handleNavigateToChat} onNavigateToTab={setActiveTab} />;
              case AppTab.HASHTAGS:
                return <HashtagGenerator />;
              case AppTab.IMAGES:
                return <ImageGenerator />;
              case AppTab.CHAT:
                return <Chatbot initialPersona={targetPersona} />;
              case AppTab.LIVE:
                return <LiveSession />;
              case AppTab.BANK:
                return <SovereignBank />;
              case AppTab.FORCE:
                return <RoyalTycoon />;
              case AppTab.ACADEMY:
                return <RoyalAcademy />;
              case AppTab.INDUSTRIES:
                return <HeavyIndustries />;
              case AppTab.GUARD:
                return <NuclearGuard />;
              case AppTab.INTEL:
                return <GlobalIntel />;
              case AppTab.ARCHIVES:
                return <SecretArchives />;
              case AppTab.STUDIO:
                return <AIFlowStudio />;
              default:
                return <Dashboard onNavigateToChat={handleNavigateToChat} onNavigateToTab={setActiveTab} />;
            }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden text-slate-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className={`flex-1 relative flex flex-col ${activeTab === AppTab.CHAT ? 'overflow-hidden' : 'overflow-y-auto p-4 md:p-8'}`}>
        {/* Ambient background effect */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-600/10 blur-[100px] rounded-full"></div>
        </div>

        {activeTab === AppTab.CHAT ? (
           <div className="flex-1 overflow-hidden">
              {renderContent()}
           </div>
        ) : (
      <div className="max-w-7xl mx-auto w-full space-y-8 relative z-10">
            <header className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="min-w-0">
                <h2 className="text-2xl font-bold tracking-tight truncate uppercase font-mono">
                  {activeTab} <span className="text-indigo-400 opacity-50">NODE</span>
                </h2>
                <p className="text-slate-400 text-[10px] font-mono uppercase tracking-widest truncate">AVAR SOVEREIGN DYNASTY V3.0 • <span className="text-emerald-400">ABSOLUTE STATUS: ON</span></p>
              </div>
              <div className="flex items-center space-x-3 ml-4 shrink-0">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-bold leading-none gold-text uppercase tracking-tighter">Abbas Aliyu Al-Zahra</p>
                  <p className="text-[9px] text-indigo-400 mt-1 uppercase font-mono tracking-widest">Sovereign King Aba</p>
                </div>
                <button 
                  onClick={() => {
                    localStorage.removeItem('avar_sovereign_authorized');
                    setIsAuthorized(false);
                  }}
                  title="Lock Sovereign Nodes"
                  className="w-12 h-12 rounded-2xl bg-red-950/40 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-all flex items-center justify-center cursor-pointer active:scale-95"
                >
                  <i className="fa-solid fa-fingerprint text-lg"></i>
                </button>
                <div className="w-12 h-12 rounded-2xl border-2 border-yellow-500/50 overflow-hidden shadow-lg shadow-yellow-500/10 hover:scale-105 transition-transform cursor-pointer flex items-center justify-center bg-slate-900">
                  <img 
                    src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=200&h=200" 
                    className="w-full h-full object-cover" 
                    alt="Sovereign King Aba" 
                  />
                </div>
              </div>
            </header>
            {renderContent()}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
