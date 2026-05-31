
import React from 'react';

const NuclearGuard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-card p-10 rounded-[3rem] border-red-500/30 bg-gradient-to-br from-red-950/20 to-transparent flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/5 via-transparent to-transparent animate-pulse"></div>
        <div className="relative z-10 flex items-center space-x-6">
           <div className="w-20 h-20 rounded-[2rem] bg-red-600 flex items-center justify-center text-white shadow-2xl shadow-red-500/40 relative">
              <i className="fa-solid fa-radiation text-4xl"></i>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full border-4 border-red-950 animate-ping"></div>
           </div>
           <div>
              <h2 className="text-3xl font-bold uppercase gold-text tracking-tighter">NUCLEAR GUARD</h2>
              <p className="text-[10px] text-red-500 font-mono font-bold uppercase tracking-[0.4em] mt-1">Commander: Princess Avaris AVAR</p>
           </div>
        </div>
        <div className="relative z-10 text-right">
           <div className="text-sm font-bold text-slate-500 font-mono uppercase mb-1">Defense Status</div>
           <div className="text-4xl font-bold text-red-500 font-mono tracking-widest animate-pulse">HIGH ALERT</div>
           <div className="flex space-x-1 mt-2 justify-end">
              {[1,2,3,4,5].map(i => <div key={i} className="h-1 w-8 bg-red-600 rounded-full"></div>)}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-card p-8 rounded-[2.5rem] border-slate-800 bg-slate-900/50">
           <h3 className="text-xs font-bold uppercase gold-text tracking-widest mb-6">Perimeter Command</h3>
           <div className="space-y-6">
              {[
                { sector: 'Northern Wall', status: 'SHIELDED', strength: 100 },
                { sector: 'Southern Gateway', status: 'ACTIVE', strength: 98 },
                { sector: 'Eastern Node', status: 'SHIELDED', strength: 100 },
                { sector: 'Western Shore', status: 'SHIELDED', strength: 100 },
              ].map((sec, i) => (
                <div key={i} className="flex justify-between items-center">
                   <div>
                      <p className="text-[10px] font-bold text-white uppercase">{sec.sector}</p>
                      <p className="text-[8px] text-red-500 font-mono uppercase">{sec.status}</p>
                   </div>
                   <div className="text-xs font-bold text-white font-mono">{sec.strength}%</div>
                </div>
              ))}
           </div>
        </div>

        <div className="lg:col-span-2 glass-card p-8 rounded-[2.5rem] border-slate-800 relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
           <h3 className="text-xs font-bold uppercase gold-text tracking-widest mb-6 border-b border-white/5 pb-4">Zarra-Force Deployment Matrix</h3>
           <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {[...Array(50)].map((_, i) => (
                <div key={i} className={`h-10 rounded-lg flex items-center justify-center transition-all duration-700 ${
                  i < 35 ? 'bg-red-600/20 border border-red-500/30 text-red-500 shadow-[0_0_10px_rgba(220,38,38,0.1)]' : 'bg-slate-900 border border-slate-800 text-slate-700'
                }`}>
                   <i className={`fa-solid ${i < 35 ? 'fa-shield-halved' : 'fa-lock'} text-[10px]`}></i>
                </div>
              ))}
           </div>
           <div className="mt-8 flex justify-between items-end">
              <div className="space-y-1">
                 <p className="text-[10px] text-slate-500 font-mono uppercase">Total Forces Active</p>
                 <p className="text-3xl font-bold text-white font-mono tracking-tighter">2,000,000</p>
              </div>
              <button className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-red-600/20">
                Reinforce Perimeter
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NuclearGuard;
