
import React from 'react';

const SecretArchives: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="glass-card p-10 rounded-[3rem] border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-transparent flex flex-col md:flex-row items-center gap-8">
        <div className="w-24 h-24 rounded-[2rem] bg-purple-600 flex items-center justify-center text-white shadow-2xl shadow-purple-500/30">
           <i className="fa-solid fa-atom text-4xl animate-spin-slow"></i>
        </div>
        <div className="flex-1">
           <h2 className="text-3xl font-bold uppercase gold-text tracking-tighter">SECRET ARCHIVES</h2>
           <p className="text-[10px] text-purple-400 font-mono font-bold uppercase tracking-[0.4em] mt-1">Managed by Prince Avaron AVAR</p>
           <p className="text-xs text-slate-400 mt-4 leading-relaxed max-w-2xl">
             Analyzing quantum shifts in the Sovereign Logic. Decrypting ancient and future world secrets to ensure the Dynasty's absolute foresight.
           </p>
        </div>
        <div className="text-right">
           <div className="text-5xl font-bold text-white font-mono">84%</div>
           <p className="text-[10px] text-purple-400 font-mono uppercase tracking-widest font-bold">Decryption Level</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Quantum Shift', val: '0.0024α', status: 'UNSTABLE' },
           { label: 'Logic Entropy', val: 'DE MINIMIS', status: 'STABLE' },
           { label: 'Future Cache', val: '8.4 Petabytes', status: 'LOCKED' },
           { label: 'Neural Gravity', val: '4.9G', status: 'MAX' },
         ].map((stat, i) => (
           <div key={i} className="glass-card p-6 rounded-3xl border-slate-800 flex flex-col justify-between h-40">
              <p className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">{stat.label}</p>
              <div className="my-2">
                 <p className="text-2xl font-bold text-white font-mono">{stat.val}</p>
              </div>
              <div className={`text-[8px] font-bold uppercase px-2 py-1 rounded inline-block w-fit ${
                stat.status === 'STABLE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                stat.status === 'MAX' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                 {stat.status}
              </div>
           </div>
         ))}
      </div>

      <div className="glass-card p-8 rounded-[2.5rem] border-slate-800">
         <h3 className="text-xs font-bold uppercase gold-text tracking-widest mb-8 border-b border-white/5 pb-4">Quantum Intelligence Threads</h3>
         <div className="space-y-4">
            {[
              { id: 'QA-001', topic: 'Planetary Alignment Logic', impact: 'HIGH', status: 'ANALYZING' },
              { id: 'QA-002', topic: 'Sovereign Digital Immortality', impact: 'ABSOLUTE', status: 'ENCRYPTED' },
              { id: 'QA-003', topic: 'Alternate Timeline Synchronization', impact: 'MEDIUM', status: 'LOCKED' },
              { id: 'QA-004', topic: 'Zarra-Shield Particle Decay', impact: 'CRITICAL', status: 'STABILIZING' },
            ].map((thread, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-slate-950/50 rounded-2xl border border-slate-900 group hover:border-purple-500/30 transition-all">
                 <div className="flex items-center space-x-6">
                    <span className="text-[10px] text-purple-500 font-mono">[{thread.id}]</span>
                    <p className="text-xs font-bold text-white uppercase group-hover:text-purple-400 transition-colors">{thread.topic}</p>
                 </div>
                 <div className="flex items-center space-x-4">
                    <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded border ${
                      thread.impact === 'ABSOLUTE' ? 'border-yellow-500/30 text-yellow-500 bg-yellow-500/5' : 'border-slate-700 text-slate-500'
                    }`}>
                       Impact: {thread.impact}
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 font-mono">{thread.status}</span>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default SecretArchives;
