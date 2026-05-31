
import React from 'react';

const GlobalIntel: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="glass-card p-10 rounded-[3rem] border-indigo-500/20 bg-gradient-to-br from-indigo-900/20 to-transparent">
        <h2 className="text-3xl font-bold gold-text uppercase tracking-tighter mb-2">Global Intelligence Node</h2>
        <p className="text-[10px] text-indigo-400 font-mono font-bold uppercase tracking-[0.4em] mb-8">@avarroyalfamily Sovereign Feed</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-6 bg-slate-950/50 rounded-3xl border border-slate-900">
              <div className="text-[9px] text-slate-500 font-mono uppercase mb-1">Global Viral Reach</div>
              <div className="text-4xl font-bold text-white font-mono">12.4M</div>
              <div className="mt-4 flex items-center space-x-2 text-[9px] text-emerald-500 font-bold">
                 <i className="fa-solid fa-arrow-trend-up"></i>
                 <span>+24% SYNC RATE</span>
              </div>
           </div>
           <div className="p-6 bg-slate-950/50 rounded-3xl border border-slate-900">
              <div className="text-[9px] text-slate-500 font-mono uppercase mb-1">Total Sovereign Impressions</div>
              <div className="text-4xl font-bold text-white font-mono">4.9B</div>
              <div className="mt-4 flex items-center space-x-2 text-[9px] text-indigo-400 font-bold">
                 <i className="fa-solid fa-earth-africa"></i>
                 <span>GLOBAL_NODE ACTIVE</span>
              </div>
           </div>
           <div className="p-6 bg-slate-950/50 rounded-3xl border border-slate-900">
              <div className="text-[9px] text-slate-500 font-mono uppercase mb-1">Intelligence Feed Status</div>
              <div className="text-4xl font-bold text-white font-mono uppercase">LIVE</div>
              <div className="mt-4 flex items-center space-x-2 text-[9px] text-yellow-500 font-bold animate-pulse">
                 <i className="fa-solid fa-circle"></i>
                 <span>REAL-TIME STREAMING</span>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="glass-card p-0 rounded-[2.5rem] border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
               <h3 className="text-xs font-bold uppercase gold-text tracking-widest">Neural Intel Stream</h3>
               <span className="text-[10px] text-slate-500 font-mono">Encrypted AES-2048</span>
            </div>
            <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto font-mono text-[10px]">
               {[
                 { time: '02:44:11', source: 'KANO_NODE', msg: 'Sovereign presence detected in major digital hubs.' },
                 { time: '02:45:05', source: 'LAGOS_LINK', msg: 'Neural handshake complete. Dynasty assets secured.' },
                 { time: '02:46:22', source: 'GLOBAL_AXIS', msg: 'Zarra-Shield feedback loop returning optimal parameters.' },
                 { time: '02:47:33', source: 'LONDON_NODE', msg: 'Royal legacy signals propagating through alternate dimensions.' },
                 { time: '02:48:01', source: 'DUBAI_CENTRAL', msg: 'Gold liquidity status synchronized with local wealth nodes.' },
               ].map((feed, i) => (
                 <div key={i} className="flex space-x-4 p-3 bg-slate-950/50 rounded-xl border border-slate-900 hover:border-indigo-500/30 transition-colors">
                    <span className="text-indigo-500 whitespace-nowrap">[{feed.time}]</span>
                    <span className="text-yellow-500 font-bold whitespace-nowrap">[{feed.source}]</span>
                    <span className="text-slate-400">{feed.msg}</span>
                 </div>
               ))}
            </div>
         </div>

         <div className="glass-card p-8 rounded-[2.5rem] border-slate-800">
            <h3 className="text-xs font-bold uppercase gold-text tracking-widest mb-8">Social Expansion Forecast</h3>
            <div className="space-y-8">
               {[
                 { platform: 'Twitter (X)', reach: '1.2B', growth: 85 },
                 { platform: 'TikTok Sovereign', reach: '2.4B', growth: 92 },
                 { platform: 'Neural Network', reach: '800M', growth: 77 },
                 { platform: 'Meta Dynasty', reach: '500M', growth: 95 },
               ].map((p, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                       <span className="text-xs font-bold text-white uppercase">{p.platform}</span>
                       <span className="text-[10px] text-indigo-400 font-mono">{p.reach} Reach</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                       <div className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400" style={{width: `${p.growth}%`}}></div>
                    </div>
                 </div>
               ))}
            </div>
            <button className="w-full mt-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold uppercase tracking-widest shadow-xl shadow-indigo-600/20 transition-all">
               Analyze Global Pulse
            </button>
         </div>
      </div>
    </div>
  );
};

export default GlobalIntel;
