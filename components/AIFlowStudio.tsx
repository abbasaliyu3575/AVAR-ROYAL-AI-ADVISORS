
import React from 'react';

const AIFlowStudio: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-card p-10 rounded-[3rem] border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 to-transparent flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center space-x-6">
           <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-500/40 relative">
              <i className="fa-solid fa-music text-4xl"></i>
              <div className="absolute inset-0 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
           </div>
           <div>
              <h2 className="text-3xl font-bold uppercase gold-text tracking-tighter">AI FLOW STUDIO</h2>
              <p className="text-[10px] text-indigo-400 font-mono font-bold uppercase tracking-[0.4em] mt-1">UWAR SAUTI V3.0 • QUEEN BEAT MASTER</p>
           </div>
        </div>
        <div className="flex space-x-4">
           <div className="text-center p-4 bg-slate-900/50 rounded-2xl border border-indigo-500/20">
              <p className="text-[8px] text-slate-500 font-mono uppercase mb-1">Sample Rate</p>
              <p className="text-lg font-bold text-white font-mono">48 kHz</p>
           </div>
           <div className="text-center p-4 bg-slate-900/50 rounded-2xl border border-indigo-500/20">
              <p className="text-[8px] text-slate-500 font-mono uppercase mb-1">Bit Depth</p>
              <p className="text-lg font-bold text-white font-mono">32-Bit</p>
           </div>
        </div>
      </div>

      <div className="glass-card p-8 rounded-[2.5rem] border-slate-800">
         <div className="flex justify-between items-center mb-10">
            <h3 className="text-xs font-bold uppercase gold-text tracking-widest">Active Victory Audio Neural Streams</h3>
            <button className="px-6 py-2 bg-indigo-600 rounded-full text-[10px] font-bold text-white uppercase hover:bg-indigo-500 transition-all">New Anthem</button>
         </div>

         <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="flex items-center space-x-4">
                 <div className="h-12 flex-1 bg-slate-950 rounded-lg flex items-center px-4 space-x-2 border border-slate-900 group hover:border-indigo-500/30 transition-all">
                    {[...Array(20)].map((_, j) => (
                      <div 
                        key={j} 
                        className={`w-1 rounded-full bg-indigo-500/30 transition-all duration-300 group-hover:bg-indigo-500 group-hover:h-8 h-${Math.floor(Math.random() * 6) + 2}`}
                        style={{ height: `${Math.random() * 80 + 20}%` }}
                      ></div>
                    ))}
                 </div>
                 <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 transition-all">
                    <i className="fa-solid fa-play text-xs"></i>
                 </button>
              </div>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="glass-card p-8 rounded-[2.5rem] border-slate-800">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-6 tracking-[0.2em] italic">Current Master: UWAR SAUTI V3.0</h4>
            <div className="space-y-4">
               {[
                 { label: 'Harmonic Sync', val: '99.8%' },
                 { label: 'Neural Resonance', val: '100%' },
                 { label: 'Bass Sovereignty', val: '94.2%' },
               ].map((mod, i) => (
                 <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono uppercase">
                       <span className="text-slate-400">{mod.label}</span>
                       <span className="text-white">{mod.val}</span>
                    </div>
                    <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-500" style={{width: mod.val}}></div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="glass-card p-8 rounded-[2.5rem] border-indigo-500/20 bg-indigo-900/10 flex items-center space-x-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg">
               <i className="fa-solid fa-headphones"></i>
            </div>
            <div>
               <p className="text-xs font-bold text-white uppercase italic">Neural Audio Bridge Active</p>
               <p className="text-[9px] text-slate-400 font-mono mt-1 uppercase">Queen Beat Master is optimizing the sovereign frequency...</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AIFlowStudio;
