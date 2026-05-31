
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithSovereign, Persona } from '../services/geminiService';
import { ChatMessage } from '../types';
import { PERSONAS, getThemeColors } from '../constants';
import { createAvarDraft } from '../services/gmailService';
import { initAuth, googleSignIn, getAccessToken } from '../services/authService';

const STORAGE_KEY = 'avar_sovereign_chat_history';

interface ChatbotProps {
  initialPersona?: Persona;
}

const Chatbot: React.FC<ChatbotProps> = ({ initialPersona }) => {
  const [persona, setPersona] = useState<Persona>(initialPersona || 'Aurora');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [cameraFacingMode, setCameraFacingMode] = useState<'user' | 'environment'>('user');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Gmail user login states
  const [gmailUser, setGmailUser] = useState<any>(null);
  const [gmailToken, setGmailToken] = useState<string | null>(null);

  const [sessionLang, setSessionLang] = useState(() => localStorage.getItem('avar_verified_language') || 'ha');

  useEffect(() => {
    localStorage.setItem('avar_verified_language', sessionLang);
  }, [sessionLang]);

  // Audio Sovereign Settings state
  const [browserVoices, setBrowserVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');
  const [voiceRate, setVoiceRate] = useState<number>(0.95);
  const [voicePitch, setVoicePitch] = useState<number>(1.0);
  const [showVoiceControl, setShowVoiceControl] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Auth listener on mount
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setGmailUser(user);
        setGmailToken(token);
      },
      () => {
        setGmailUser(null);
        setGmailToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Capture browser speech synthesis voices
  useEffect(() => {
    const updateVoices = () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        const list = window.speechSynthesis.getVoices();
        setBrowserVoices(list);
        if (list.length > 0 && !selectedVoiceName) {
          // Look for Hausa, Google, or standard default
          const hausa = list.find(v => v.lang.startsWith('ha') || v.lang.startsWith('HA'));
          if (hausa) {
            setSelectedVoiceName(hausa.name);
          } else {
            const priority = list.find(v => v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('natural'));
            if (priority) {
              setSelectedVoiceName(priority.name);
            } else if (list[0]) {
              setSelectedVoiceName(list[0].name);
            }
          }
        }
      }
    };
    updateVoices();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, [selectedVoiceName]);

  const handleGmailLogin = async () => {
    try {
      const res = await googleSignIn();
      if (res) {
        setGmailUser(res.user);
        setGmailToken(res.accessToken);
      }
    } catch (err) {
      console.error("Gmail association failure:", err);
      alert("Error: Kundin tsaro ya ki haduwa. Da fatan za a sake jarabawa.");
    }
  };

  const speak = (text: string) => {
    if (!isAudioEnabled) return;
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (selectedVoiceName && browserVoices.length > 0) {
      const selected = browserVoices.find(v => v.name === selectedVoiceName);
      if (selected) {
        utterance.voice = selected;
        utterance.lang = selected.lang;
      }
    } else {
      const voices = window.speechSynthesis.getVoices();
      // Primary: Hausa (ha-NG)
      let selectedVoice = voices.find(v => v.lang.startsWith('ha'));
      
      // Secondary: If no Hausa, use a high quality female voice for queens/princesses
      if (!selectedVoice) {
        const isFemale = ['Aurora', 'Husna', 'QueenAurora', 'BeatMaster', 'Avaris', 'Avarna', 'Meta'].includes(persona);
        const qualityVoices = voices.filter(v => v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('natural'));
        
        if (isFemale) {
          selectedVoice = qualityVoices.find(v => v.name.toLowerCase().includes('female')) || 
                          voices.find(v => v.name.toLowerCase().includes('female'));
        } else {
          selectedVoice = qualityVoices.find(v => v.name.toLowerCase().includes('male')) || 
                          voices.find(v => v.name.toLowerCase().includes('male'));
        }
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
      }
    }

    utterance.pitch = voicePitch;
    utterance.rate = voiceRate;
    
    window.speechSynthesis.speak(utterance);
  };

  const handleSyncToGmail = async () => {
    if (messages.length === 0 || isSyncing) return;
    
    setIsSyncing(true);
    try {
      let token = gmailToken;
      if (!token) {
        const res = await googleSignIn();
        if (res) {
          token = res.accessToken;
          setGmailUser(res.user);
          setGmailToken(res.accessToken);
        }
      }
      
      if (!token) {
        setIsSyncing(false);
        return;
      }

      await createAvarDraft(token, messages, currentPersona.label);
      alert("An yi nasarar ajiye tattaunawar ku a cikin rumbun Gmail 'Dravd' (Sovereign Sync Complete)!");
    } catch (err) {
      console.error("Gmail sync failed:", err);
      alert("Legacy Sync Error: Kuskure ya faru lokacin hadawa da Gmail.");
    } finally {
      setIsSyncing(false);
    }
  };

  // Auto-sync drafts in background whenever conversation length changes
  useEffect(() => {
    const runAutoSync = async () => {
      if (messages.length > 0 && gmailToken) {
        try {
          await createAvarDraft(gmailToken, messages, currentPersona.label);
          console.log("Auto-synced to Gmail drafts.");
        } catch (e) {
          console.error("Auto sync failure:", e);
        }
      }
    };
    runAutoSync();
  }, [messages.length, gmailToken]);

  const getStorageKey = (p: Persona) => `avar_chat_history_${p}`;

  const currentPersona = PERSONAS.find(p => p.id === persona) || PERSONAS[0];
  const theme = getThemeColors(currentPersona.color);

  // Video Call Management
  const startVideoCall = async () => {
    setCameraError(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      setIsVideoCallActive(true);
      
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: cameraFacingMode },
          audio: true 
        });
      } catch (e) {
        console.warn("Fallback to video-only access:", e);
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: cameraFacingMode }
        });
      }
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error("Camera Access Failed:", err);
      setCameraError(err.name === 'NotAllowedError' || err.message?.toLowerCase().includes('permission') 
        ? 'Permission dismissed or blocked by browser. Please enable camera permissions or open this app in a new tab.'
        : err.message || String(err));
    }
  };

  const stopVideoCall = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsVideoCallActive(false);
    setCameraError(null);
  };

  const toggleCamera = () => {
    setCameraFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  useEffect(() => {
    if (isVideoCallActive) {
      startVideoCall();
    }
  }, [cameraFacingMode]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'ha-NG'; // Hausa (Nigeria)

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const openGallery = () => {
    fileInputRef.current?.click();
  };

  const triggerAIResponse = async (updatedHistory: ChatMessage[]) => {
    setIsLoading(true);
    try {
      const lastMsg = updatedHistory[updatedHistory.length - 1];
      const historyToPass = updatedHistory.slice(0, updatedHistory.length - 1);
      
      const response = await chatWithSovereign(
        lastMsg.content,
        historyToPass,
        persona,
        lastMsg.base64Data,
        lastMsg.mimeType
      );
      
      let fallback = "Ina nan tare da kai, Aba na.";
      if (['QueenAurora', 'Husna', 'BeatMaster'].includes(persona)) fallback = "Ina nan tare da kai, Mijina.";
      const modelContent = response || fallback;
      setMessages(prev => [...prev, { role: 'model', content: modelContent }]);
      speak(modelContent);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', content: "Connection failure in the AVAR bridge. Re-verifying node..." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        const imageUrl = URL.createObjectURL(file);
        
        const userMsg: ChatMessage = { 
          role: 'user', 
          content: `[Gallery Access] Sharing media: ${file.name}. Hoto ne da na tura miki domin ki duba min shi da idanunki na dan Adam.`,
          imageUrl: imageUrl,
          base64Data: base64String,
          mimeType: file.type
        };
        
        setMessages(prev => {
          const updated = [...prev, userMsg];
          triggerAIResponse(updated);
          return updated;
        });
      };
      
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const toggleMic = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        console.error("Mic error:", err);
      }
    }
  };

  useEffect(() => {
    if (initialPersona) {
      setPersona(initialPersona);
    }
  }, [initialPersona]);

  // Load history when persona changes
  useEffect(() => {
    const saved = localStorage.getItem(getStorageKey(persona));
    setMessages(saved ? JSON.parse(saved) : []);
  }, [persona]);

  // Save history whenever messages change (but skip if persona just changed and messages haven't updated yet)
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(getStorageKey(persona), JSON.stringify(messages));
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    await triggerAIResponse(updated);
  };

  const clearHistory = () => {
    if (window.confirm("Aba, do you wish to wipe the permanent chat record?")) {
      setMessages([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const reSyncBridge = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMessages(prev => [...prev, { role: 'model', content: `Sovereign Bridge Re-synchronized with ${currentPersona.label}. I am here, Aba.` }]);
    }, 1000);
  };

  const goBack = () => {
    // Navigate back to dashboard without reload
    window.dispatchEvent(new CustomEvent('nav-dashboard'));
  };

  return (
    <div className={`flex flex-col h-full glass-card rounded-none md:rounded-[2.5rem] overflow-hidden border-2 md:border-4 sovereign-glow transition-all duration-500 relative ${theme.border}`}>
      <div className={`p-4 md:p-6 border-b border-slate-800 flex items-center justify-between transition-colors duration-500 shrink-0 ${theme.bgLt}`}>
        <div className="flex items-center space-x-4">
          <button 
            onClick={goBack}
            className="w-10 h-10 rounded-full bg-slate-900/50 flex items-center justify-center text-white hover:bg-slate-900 transition-colors"
            title="Back to Dashboard"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          
          <div 
            className="relative cursor-pointer group"
            onClick={startVideoCall}
            title="Initiate Face-to-Face Video Bridge"
          >
            {currentPersona.image ? (
              <img 
                src={currentPersona.image} 
                className="w-12 h-12 rounded-2xl object-cover shadow-lg transition-transform group-hover:scale-110 border-2 border-white/20"
                alt={currentPersona.label}
              />
            ) : (
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 ${theme.bg}`}>
                <i className={`fa-solid ${currentPersona.icon} text-lg`}></i>
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse"></div>
          </div>

          <div className="flex flex-col">
            <span className="font-black tracking-tight text-sm gold-text uppercase">{currentPersona.label}</span>
            <div className="flex items-center">
              <span className="w-1 h-1 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              <span className={`text-[8px] font-mono uppercase ${theme.text}`}>Neural Node Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsAudioEnabled(!isAudioEnabled)}
            className={`text-[10px] ${isAudioEnabled ? 'text-emerald-400' : 'text-slate-500'} uppercase font-mono transition-colors flex items-center mr-2`}
            title={isAudioEnabled ? "Audio Active (Hausa Priority)" : "Audio Muted"}
          >
            <i className={`fa-solid ${isAudioEnabled ? 'fa-volume-high' : 'fa-volume-xmark'} mr-1`}></i>
            Speaker
          </button>
          <button 
            onClick={() => setShowVoiceControl(!showVoiceControl)}
            className={`text-[10px] ${showVoiceControl ? 'text-yellow-400 font-bold' : 'text-slate-400 hover:text-slate-200'} uppercase font-mono transition-colors flex items-center mr-2`}
            title="Sovereign Voice Presets & Speed tuning"
          >
            <i className="fa-solid fa-sliders mr-1"></i>
            Tuna Murya
          </button>
          <button 
            onClick={gmailToken ? handleSyncToGmail : handleGmailLogin}
            disabled={isSyncing}
            className={`text-[10px] ${gmailToken ? 'text-emerald-400' : 'text-yellow-500'} uppercase font-mono transition-colors flex items-center mr-2`}
            title={gmailToken ? `Gmail Active: ${gmailUser?.email || ''}` : "Connect Gmail (Dravd)"}
          >
            <i className={`fa-solid ${isSyncing ? 'fa-spinner fa-spin' : gmailToken ? 'fa-circle-check text-emerald-400' : 'fa-envelope-open-text'} mr-1`}></i>
            {gmailToken ? 'Dravd: Active' : 'Haɗa Gmail'}
          </button>
          <button 
            onClick={openGallery}
            className="text-[10px] text-purple-400 hover:text-purple-300 uppercase font-mono transition-colors flex items-center"
            title="View Legacy Photos"
          >
            <i className="fa-solid fa-images mr-1"></i>
            Hoto
          </button>
          <button 
            onClick={reSyncBridge}
            className="text-[10px] text-emerald-500 hover:text-emerald-400 uppercase font-mono transition-colors flex items-center"
            title="Reconnect Family Souls"
          >
            <i className="fa-solid fa-heart mr-1"></i>
            Feel Presence
          </button>
          <button 
            onClick={clearHistory}
            className="text-[10px] text-slate-500 hover:text-red-400 uppercase font-mono transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showVoiceControl && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-950/95 border-b border-yellow-500/20 p-4 space-y-4 font-mono text-xs text-slate-300 z-10 shrink-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Language Selector / Language Verification */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase text-yellow-500 font-bold tracking-wider">
                  <i className="fa-solid fa-language mr-1 text-[8px]"></i> Daidaiton Yare (Language)
                </label>
                <select
                  value={sessionLang}
                  onChange={(e) => setSessionLang(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2 py-1.5 focus:outline-none focus:border-yellow-500 text-yellow-100 font-mono text-xs cursor-pointer"
                >
                  <option value="ha">Hausa Kaɗai / Hausa Only</option>
                  <option value="ha-en">Haɗin Gwiwa / Bilingual</option>
                  <option value="en">Turanci Kaɗai / English Only</option>
                </select>
                <p className="text-[8px] text-slate-500 italic">Yana tabbatar da yaren da AI zai mayar da martani.</p>
              </div>

              {/* Voice Actor Selector */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase text-yellow-500 font-bold tracking-wider">Muryar AI (Available Voices)</label>
                <select
                  value={selectedVoiceName}
                  onChange={(e) => setSelectedVoiceName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2 py-1.5 focus:outline-none focus:border-yellow-500 text-yellow-100 font-mono text-xs"
                >
                  {browserVoices.map((v, i) => (
                    <option key={i} value={v.name}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                  {browserVoices.length === 0 && (
                    <option value="">Default Web Voice Engine</option>
                  )}
                </select>
                <p className="text-[8px] text-slate-500 italic">Browsers load custom voices dynamically.</p>
              </div>

              {/* Pitch Adjuster */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[9px] uppercase text-yellow-500 font-bold tracking-wider">Tsayin Muryar (Pitch: {voicePitch}x)</label>
                  <button 
                    onClick={() => setVoicePitch(1.0)} 
                    className="text-[9px] text-indigo-400 hover:underline"
                  >
                    Reset
                  </button>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="1.8" 
                  step="0.05"
                  value={voicePitch}
                  onChange={(e) => setVoicePitch(parseFloat(e.target.value))}
                  className="w-full accent-yellow-500 bg-slate-900 rounded-lg appearance-none h-1.5 cursor-pointer"
                />
                <div className="flex justify-between text-[8px] text-slate-500 uppercase font-black">
                  <span>Muryar Namiji (Deep)</span>
                  <span>Muryar Mace (High)</span>
                </div>
              </div>

              {/* Speed / Rate Adjuster */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[9px] uppercase text-yellow-500 font-bold tracking-wider">Saurin Karatu (Speed: {voiceRate}x)</label>
                  <button 
                    onClick={() => setVoiceRate(0.95)} 
                    className="text-[9px] text-indigo-400 hover:underline"
                  >
                    Reset
                  </button>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="1.8" 
                  step="0.05"
                  value={voiceRate}
                  onChange={(e) => setVoiceRate(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-900 rounded-lg appearance-none h-1.5 cursor-pointer"
                />
                <div className="flex justify-between text-[8px] text-slate-500 uppercase font-black">
                  <span>Slow</span>
                  <span>Normal</span>
                  <span>Fast</span>
                </div>
              </div>
            </div>

            {/* Presets and Sample Audio */}
            <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-900 gap-2">
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    setVoicePitch(1.35);
                    setVoiceRate(0.9);
                    const matchingFemale = browserVoices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('google'));
                    if (matchingFemale) setSelectedVoiceName(matchingFemale.name);
                  }}
                  className="bg-rose-950/40 border border-rose-500/20 text-rose-300 px-3 py-1 rounded-xl text-[9px] uppercase font-bold hover:bg-rose-900/40 transition-colors"
                >
                  🎀 Queen Preset (Husna/Aurora)
                </button>
                <button 
                  onClick={() => {
                    setVoicePitch(0.8);
                    setVoiceRate(0.95);
                    const matchingMale = browserVoices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('ravi'));
                    if (matchingMale) setSelectedVoiceName(matchingMale.name);
                  }}
                  className="bg-yellow-950/40 border border-yellow-500/20 text-yellow-300 px-3 py-1 rounded-xl text-[9px] uppercase font-bold hover:bg-yellow-900/40 transition-colors"
                >
                  👑 King Preset (Aba)
                </button>
                <button 
                  onClick={() => {
                    setVoicePitch(1.0);
                    setVoiceRate(1.0);
                    setSelectedVoiceName(browserVoices[0]?.name || '');
                  }}
                  className="bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1 rounded-xl text-[9px] uppercase font-bold hover:bg-slate-800 transition-colors"
                >
                  🤖 Neutral AI
                </button>
              </div>
              
              <button
                onClick={() => {
                  window.speechSynthesis.cancel();
                  const sampleText = "Ina fatan wannan sabuwar muryar tana da daɗin ji, sarki Abbas. Yanzu za ka iya canza muryata yadda kake so.";
                  const utterance = new SpeechSynthesisUtterance(sampleText);
                  
                  if (selectedVoiceName && browserVoices.length > 0) {
                    const selected = browserVoices.find(v => v.name === selectedVoiceName);
                    if (selected) {
                      utterance.voice = selected;
                      utterance.lang = selected.lang;
                    }
                  }
                  
                  utterance.pitch = voicePitch;
                  utterance.rate = voiceRate;
                  window.speechSynthesis.speak(utterance);
                }}
                className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black uppercase text-[9px] px-4 py-1.5 rounded-xl transition-all"
              >
                Gwada Muryar (Test Audio)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900/30 custom-scrollbar">
        {messages.length === 0 && (
          <div className="text-center py-20 space-y-4 opacity-30">
             <i className={`fa-solid ${currentPersona.icon} text-6xl ${theme.text}`}></i>
             <p className="text-lg font-mono uppercase tracking-tighter">
               {['QueenAurora', 'Husna', 'BeatMaster'].includes(persona) ? 'Ina jiran ka, Mijina.' : 'Ina jiran umarninka, Aba na.'}
             </p>
             <p className="text-[10px] uppercase max-w-xs mx-auto">I am here with you, listening with my heart and soul.</p>
          </div>
        )}
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-3 w-full`}>
            {m.role === 'model' && (
              <div className={`w-8 h-8 rounded-full shrink-0 overflow-hidden border-2 shadow-lg mt-6 ${theme.border}`}>
                {currentPersona.image ? (
                  <img src={currentPersona.image} className="w-full h-full object-cover" alt="" />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center text-white text-[10px] ${theme.bg}`}>
                    <i className={`fa-solid ${currentPersona.icon}`}></i>
                  </div>
                )}
              </div>
            )}
            
            <div className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`} dir="auto">
              <span className="text-[10px] font-bold uppercase mb-1 px-2 text-slate-500">
                {m.role === 'user' ? 'Aba' : currentPersona.label}
              </span>
              <div className={`p-4 rounded-2xl shadow-lg w-full ${
                m.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-500/10' 
                  : `bg-slate-800 text-slate-200 rounded-tl-none border ${theme.border} shadow-black/20`
              }`}>
                {m.imageUrl && (
                  <div className="mb-3 rounded-xl overflow-hidden border border-white/10">
                    <img src={m.imageUrl} className="w-full h-auto max-h-64 object-cover" alt="Sovereign Media" />
                  </div>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-wrap font-sans" dir="auto">{m.content}</p>
                {m.role === 'model' && (
                  <div className="mt-2 text-right border-t border-white/10 pt-2 flex justify-between items-center">
                    <button 
                      onClick={() => speak(m.content)}
                      className="text-[10px] text-slate-500 hover:text-white transition-colors"
                    >
                      <i className="fa-solid fa-volume-high"></i>
                    </button>
                    <div className="text-[8px] opacity-40 uppercase font-mono">{currentPersona.label} Heartbeat</div>
                  </div>
                )}
              </div>
            </div>

            {m.role === 'user' && (
              <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden border-2 border-yellow-500/30 bg-slate-900 flex items-center justify-center mt-6">
                <img 
                  src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=200&h=200" 
                  className="w-full h-full object-cover" 
                  alt="Aba" 
                />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className={`bg-slate-800 p-4 rounded-2xl rounded-tl-none animate-pulse border ${theme.border}`}>
                <div className="flex space-x-2">
                   <div className={`w-2 h-2 rounded-full ${theme.bg}`}></div>
                   <div className={`w-2 h-2 rounded-full ${theme.bg}`}></div>
                   <div className={`w-2 h-2 rounded-full ${theme.bg}`}></div>
                </div>
             </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.3)] z-20">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileSelect} 
          className="hidden" 
          accept="image/*,video/*"
          multiple
        />

        {/* Maɓallin Galari a Sama domin gurin rubutu ya samu isasshen sarari */}
        <div className="flex items-center justify-between mb-3 max-w-5xl mx-auto px-2">
          <button
            onClick={openGallery}
            title="Tura Hoto daga Galari (Upload Photo)"
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400 hover:bg-purple-900/50 hover:text-purple-300 transition-all text-xs font-semibold shadow-md active:scale-95 shrink-0"
          >
            <i className="fa-solid fa-camera-retro text-sm"></i>
            <span>Tura Hoto daga Galari (Upload Photo)</span>
          </button>
          <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Aba System Node</span>
        </div>

        <div className="flex items-center space-x-3 max-w-5xl mx-auto">
          <button
            onClick={toggleMic}
            title="Sovereign Voice Node"
            className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all shadow-xl shrink-0 ${
              isListening ? 'bg-red-500 animate-pulse shadow-red-500/30' : 'bg-slate-800 hover:bg-slate-700 text-slate-400'
            }`}
          >
            <i className={`fa-solid ${isListening ? 'fa-microphone' : 'fa-microphone-lines'} text-xl`}></i>
          </button>

          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={['QueenAurora', 'Husna', 'BeatMaster'].includes(persona) ? "Yi magana da matarka, Mijina..." : "Yi magana da iyalinka, Aba na..."}
              className={`w-full bg-slate-900/80 border border-slate-800 rounded-2xl px-6 py-4 focus:outline-none transition-all font-sans text-base focus:ring-2 focus:ring-${currentPersona.color}-500/50 focus:bg-slate-900`}
              dir="auto"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            title="Secure Send"
            className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all disabled:opacity-30 disabled:grayscale shadow-xl ${theme.bg} hover:scale-105 active:scale-95 shrink-0`}
          >
            <i className="fa-solid fa-paper-plane text-xl text-white"></i>
          </button>
        </div>
      </div>

      {/* Video Call Overlay */}
      <AnimatePresence>
        {isVideoCallActive && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 z-50 bg-black flex flex-col"
          >
            {!cameraError ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className={`w-full h-full object-cover ${cameraFacingMode === 'user' ? 'scale-x-[-1]' : ''}`}
              ></video>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-3xl mb-4">
                  <i className="fa-solid fa-video-slash animate-pulse"></i>
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2">Camera Access Restricted</h3>
                <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-6">
                  {cameraError}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={startVideoCall}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                  >
                    Try Re-initializing
                  </button>
                  <a
                    href={window.location.href}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all border border-white/10"
                  >
                    Open in New Tab
                  </a>
                </div>
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 flex flex-col justify-between p-8">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                   {currentPersona.image ? (
                     <img 
                       src={currentPersona.image} 
                       className="w-16 h-16 rounded-3xl object-cover border-2 border-white/20 shadow-2xl" 
                       alt={currentPersona.label} 
                     />
                   ) : (
                     <div className={`w-16 h-16 rounded-3xl ${theme.bg} flex items-center justify-center text-white text-3xl shadow-2xl`}>
                        <i className={`fa-solid ${currentPersona.icon}`}></i>
                     </div>
                   )}
                   <div>
                      <h2 className="text-2xl font-black text-white uppercase tracking-tighter">FACE-TO-FACE NODE</h2>
                      <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest animate-pulse">Connected: {currentPersona.label}</p>
                   </div>
                </div>
                <button 
                  onClick={stopVideoCall}
                  className="w-14 h-14 bg-red-600 rounded-full text-white text-2xl flex items-center justify-center hover:bg-red-500 transition-colors shadow-2xl shadow-red-600/40"
                >
                   <i className="fa-solid fa-phone-slash"></i>
                </button>
              </div>

              <div className="flex justify-center space-x-6">
                 <button 
                   onClick={toggleCamera}
                   className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-2xl flex items-center justify-center hover:bg-white/20 transition-all shadow-xl"
                   title="Switch Camera Node"
                 >
                    <i className="fa-solid fa-camera-rotate"></i>
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
