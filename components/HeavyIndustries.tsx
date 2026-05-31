
import React from 'react';

const HeavyIndustries: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="glass-card p-8 rounded-[3rem] border-slate-700 bg-gradient-to-br from-slate-900 to-black overflow-hidden relative">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <i className="fa-solid fa-industry text-[12rem] text-slate-400"></i>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold uppercase gold-text tracking-tighter mb-2">AVAR HEAVY INDUSTRIES</h2>
            <div className="flex items-center space-x-3 mb-6">
               <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[8px] font-bold border border-emerald-500/20 rounded uppercase">Independent Sector</span>
               <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Global Supply Node: ACTIVE</span>
            </div>
          </div>
          <div className="text-right">
             <div className="text-sm font-bold text-emerald-500 font-mono uppercase tracking-widest">Production Status</div>
             <div className="text-5xl font-bold text-white font-mono">MAXIMUM</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-8 rounded-[2.5rem] border-slate-800">
           <h3 className="text-xs font-bold uppercase gold-text tracking-widest mb-8 border-b border-slate-800 pb-4 flex justify-between items-center">
             <span>Hardware Synthesis Line</span>
             <i className="fa-solid fa-microchip text-slate-600"></i>
           </h3>
           <div className="space-y-6">
              {[
                { label: 'Zarra-Shield Components', status: 'HYPER-SYNC', power: '98%' },
                { label: 'Neural Link Hardware', status: 'OPTIMAL', power: '100%' },
                { label: 'Sovereign Beacon Nodes', status: 'MAX-OPS', power: '96%' },
              ].map((line, i) => (
                <div key={i} className="flex justify-between items-center group">
                   <div>
                      <p className="text-xs font-bold text-white uppercase group-hover:text-emerald-400 transition-colors">{line.label}</p>
                      <p className="text-[8px] text-emerald-500/50 font-mono uppercase">{line.status}</p>
                   </div>
                   <div className="w-32 bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500/50" style={{width: line.power}}></div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="glass-card p-8 rounded-[2.5rem] border-slate-800 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
           <h3 className="text-xs font-bold uppercase gold-text tracking-widest mb-8 border-b border-slate-800 pb-4 flex justify-between items-center">
             <span>Dynasty Infrastructure</span>
             <i className="fa-solid fa-city text-slate-600"></i>
           </h3>
           <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Palace Expansion', val: 'V4.0', status: 'STABLE' },
                { label: 'Borders Integrity', val: '100%', status: 'SHIELDED' },
                { label: 'Energy Grid', val: 'Q-SOLAR', status: 'ONLINE' },
                { label: 'Transit Nodes', val: 'ACTIVE', status: 'SYNCED' },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-slate-950/50 rounded-2xl border border-slate-900 border-dashed">
                   <p className="text-[8px] text-slate-500 font-mono uppercase mb-1">{item.label}</p>
                   <p className="text-sm font-bold text-white">{item.val}</p>
                   <p className="text-[8px] text-emerald-500 font-bold uppercase mt-2">{item.status}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default HeavyIndustries;
