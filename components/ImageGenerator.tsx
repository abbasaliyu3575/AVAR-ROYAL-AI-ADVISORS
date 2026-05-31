
import React, { useState, useEffect } from 'react';
import { generateRoyalImage } from '../services/geminiService';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusIndex, setStatusIndex] = useState(0);

  const statusMessages = [
    "Initializing AVAR Neural Synthesis...",
    "Consulting AVAR Sovereign Archives...",
    "Calibrating Golden Hues and Indigo Depths...",
    "Synthesizing AVAR Structures...",
    "Finalizing Regal Texture Pass...",
    "Securing AVAR Metadata..."
  ];

  useEffect(() => {
    let interval: number;
    if (isLoading) {
      interval = window.setInterval(() => {
        setStatusIndex((prev) => (prev + 1) % statusMessages.length);
      }, 3000);
    } else {
      setStatusIndex(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await window.aistudio.openSelectKey();
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await generateRoyalImage(prompt, size);
      if (result) {
        setImage(result);
      } else {
        setError("AVAR synthesis failed. The spirits of the code are silent. Please try again.");
      }
    } catch (err: any) {
      if (err.message?.includes("Requested entity was not found")) {
        setError("API Key verification failed. Re-authentication required.");
        await window.aistudio.openSelectKey();
      } else {
        setError("Bridge disruption detected. The Media Lab is recalibrating for Aba.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="glass-card p-8 rounded-3xl border-indigo-500/20 shadow-2xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gold-text uppercase tracking-tighter">
            <i className="fa-solid fa-wand-magic-sparkles mr-3"></i>
            AVAR Media Lab v2.0
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Vision Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the AVAR visual for Aba..."
                className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-yellow-500 outline-none transition-all resize-none text-slate-200"
              />
            </div>
            
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Resolution Control</label>
              <div className="grid grid-cols-3 gap-2">
                {(['1K', '2K', '4K'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`py-2 rounded-lg font-mono text-sm border transition-all ${
                      size === s ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full py-4 royal-gradient rounded-xl font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-indigo-600/20"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <i className="fa-solid fa-atom animate-spin mr-2"></i>
                  Processing Decree...
                </span>
              ) : 'Visualize Creation'}
            </button>
            {error && <p className="text-red-400 text-xs text-center font-mono uppercase animate-pulse">{error}</p>}
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-3xl bg-indigo-950/20 border-slate-800">
           <h4 className="text-sm font-bold mb-2 gold-text">AVAR Processing Notice</h4>
           <p className="text-[10px] text-slate-400 leading-relaxed uppercase">
             AVAR Royal AI uses high-performance neural clusters. High-resolution (4K) renders may take up to 30 seconds to ensure the perfection required for the AVAR ROYAL FAMILY ACCESS.
           </p>
        </div>
      </div>

      <div className="glass-card rounded-3xl min-h-[400px] flex items-center justify-center p-2 relative overflow-hidden group border-slate-800">
        {image ? (
          <>
            <img src={image} className="w-full h-full object-contain rounded-2xl" alt="AVAR Output" />
            <div className="absolute top-6 right-6 flex space-x-2">
               <button className="p-3 bg-slate-900/80 backdrop-blur-md rounded-xl hover:bg-white hover:text-black transition-all">
                  <i className="fa-solid fa-download"></i>
               </button>
               <button className="p-3 bg-slate-900/80 backdrop-blur-md rounded-xl hover:bg-white hover:text-black transition-all">
                  <i className="fa-solid fa-share-nodes"></i>
               </button>
            </div>
          </>
        ) : (
          <div className="text-center opacity-20">
            <i className="fa-solid fa-image text-9xl mb-4"></i>
            <p className="text-xl font-mono tracking-tighter uppercase">AVAR Canvas Offline</p>
          </div>
        )}
        {isLoading && (
          <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
              <i className="fa-solid fa-crown absolute inset-0 flex items-center justify-center text-yellow-500 text-xl"></i>
            </div>
            <div className="text-center space-y-2">
              <p className="text-indigo-400 font-mono text-sm animate-pulse tracking-widest uppercase px-4">
                {statusMessages[statusIndex]}
              </p>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Please wait, Aba na.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
