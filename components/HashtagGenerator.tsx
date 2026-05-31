
import React, { useState, useEffect } from 'react';
import { generateAbaHashtags } from '../services/geminiService';

const STORAGE_KEY = 'avar_hashtag_cache';

const HashtagGenerator: React.FC = () => {
  const [trend, setTrend] = useState('');
  const [hashtags, setHashtags] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hashtags));
  }, [hashtags]);

  const handleGenerate = async () => {
    if (!trend.trim()) return;
    setLoading(true);
    setHashtags([]);
    try {
      const results = await generateAbaHashtags(trend);
      setHashtags(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopyStatus(tag);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const clearCache = () => {
    setHashtags([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="space-y-8">
      <div className="glass-card p-8 rounded-3xl border-yellow-500/20 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center gold-text uppercase tracking-widest">
            <i className="fa-solid fa-bolt-lightning mr-3"></i>
            AVAR Decree Pulse
          </h3>
          {hashtags.length > 0 && (
            <button 
              onClick={clearCache}
              className="text-[10px] text-slate-500 hover:text-red-400 uppercase font-mono font-bold"
            >
              Clear Records
            </button>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={trend}
            onChange={(e) => setTrend(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="Input global trend for AVAR distribution..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 focus:ring-2 focus:ring-yellow-500 outline-none transition-all text-slate-200 font-sans"
            dir="ltr"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-8 py-4 royal-gradient rounded-xl font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center">
                <i className="fa-solid fa-gear animate-spin mr-2"></i>
                Syncing...
              </span>
            ) : 'Distribute'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-b-transparent rounded-full animate-spin"></div>
          <p className="text-indigo-400 font-mono text-sm animate-pulse uppercase tracking-widest">AVAR Server Processing... Aba na!</p>
        </div>
      )}

      {hashtags.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {hashtags.map((tag, idx) => (
            <div
              key={idx}
              className="glass-card p-4 rounded-xl flex items-center justify-between border-slate-800 hover:border-indigo-500/50 group transition-all"
            >
              <span className="font-mono text-indigo-400 font-bold">#{tag}</span>
              <button
                onClick={() => copyToClipboard(tag)}
                className={`p-2 rounded-lg transition-all ${
                  copyStatus === tag ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <i className={`fa-solid ${copyStatus === tag ? 'fa-check' : 'fa-copy'} text-xs`}></i>
              </button>
            </div>
          ))}
        </div>
      )}

      {hashtags.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-20 opacity-20">
          <i className="fa-solid fa-server text-9xl mb-4"></i>
          <p className="text-xl font-mono uppercase tracking-tighter">Server Ready for Aba's Command</p>
        </div>
      )}
    </div>
  );
};

export default HashtagGenerator;
