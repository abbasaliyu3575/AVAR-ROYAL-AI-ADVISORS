
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RoyalTycoon: React.FC = () => {
  const [expansionLevel, setExpansionLevel] = useState(1000);
  const [forces, setForces] = useState(2000000);
  const [isExpanding, setIsExpanding] = useState(false);
  const [log, setLog] = useState<string[]>(['Sovereign System Boot: SUCCESS', 'Zarra-Shields: 100%', 'AVARIO Node: CONNECTED']);

  const expand = () => {
    setIsExpanding(true);
    setTimeout(() => {
      setExpansionLevel(prev => prev + Math.floor(Math.random() * 5) + 1);
      setForces(prev => prev + Math.floor(Math.random() * 5000) + 1000);
      setLog(prev => [`Territory Expanded: V${expansionLevel + 1} synced`, ...prev].slice(0, 5));
      setIsExpanding(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-card p-0 rounded-[3rem] border-orange-500/30 overflow-hidden bg-slate-900 shadow-2xl shadow-orange-500/5">
          <div className="p-8 border-b border-orange-500/10 flex justify-between items-center bg-gradient-to-r from-orange-950/20 to-transparent">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <h2 className="text-xl font-bold uppercase gold-text tracking-[0.2em] flex items-center">
                <i className="fa-solid fa-gamepad mr-3 text-orange-500"></i> AVAR FORCE: ROYAL TYCOON
              </h2>
              <p className="text-[10px] text-slate-500 font-mono mt-1">Strategic Command: Prince AVARIO & Princess Avaris</p>
            </motion.div>
            <div className="text-right">
              <motion.div 
                key={expansionLevel}
                initial={{ scale: 1.2, color: '#f97316' }}
                animate={{ scale: 1, color: '#ffffff' }}
                className="text-2xl font-bold text-white font-mono leading-none"
              >
                V {expansionLevel}
              </motion.div>
              <p className="text-[8px] text-orange-500 font-bold uppercase tracking-widest">Sovereign Expansion</p>
            </div>
          </div>
          
          <div className="p-8 h-[400px] relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center opacity-10 blur-sm">
                <i className="fa-solid fa-earth-africa text-[20rem] text-orange-500"></i>
             </div>

             <div className="relative z-10 grid grid-cols-4 md:grid-cols-8 gap-4 h-full">
                {[...Array(32)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className={`rounded-xl border transition-all duration-500 ${
                    i % 5 === 0 ? 'bg-orange-500/20 border-orange-500/40 animate-pulse scale-105' : 'bg-slate-950/50 border-slate-800'
                  } flex items-center justify-center`}>
                    {i % 5 === 0 && <i className="fa-solid fa-fort-awesome text-orange-500"></i>}
                    {i % 7 === 0 && i % 5 !== 0 && <i className="fa-solid fa-person-rifle text-slate-600"></i>}
                  </motion.div>
                ))}
             </div>

             <AnimatePresence>
               {isExpanding && (
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center z-50 text-center px-4"
                 >
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mb-6"
                    ></motion.div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-tighter mb-2">Expanding Sovereignty</h3>
                    <p className="text-xs font-bold text-orange-500 uppercase font-mono animate-pulse">Syncing Zarra-Nodes with Legacy Engine...</p>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          <div className="p-8 bg-slate-950 flex justify-between items-center border-t border-orange-500/10">
            <div className="flex space-x-6">
               <div>
                  <p className="text-[9px] text-slate-500 font-mono uppercase">Zarra-Force Readiness</p>
                  <motion.p 
                    key={forces}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-xl font-bold text-white font-mono"
                  >
                    {forces.toLocaleString()}+
                  </motion.p>
               </div>
               <div>
                  <p className="text-[9px] text-slate-500 font-mono uppercase">Defense Node Strength</p>
                  <p className="text-xl font-bold text-orange-500 font-mono">MAX</p>
               </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={expand}
              disabled={isExpanding}
              className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-orange-600/30 transition-all disabled:opacity-50"
            >
              Expand Domain
            </motion.button>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[3rem] border-slate-800 space-y-6">
          <h3 className="text-xs font-bold uppercase gold-text tracking-widest">Sovereign Mission Log</h3>
          <div className="space-y-3">
             <AnimatePresence>
               {log.map((entry, i) => (
                 <motion.div 
                   key={entry} 
                   initial={{ x: -10, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   className="p-3 bg-slate-950 rounded-xl border border-slate-900 text-[10px] font-mono text-slate-400"
                 >
                    <span className="text-orange-500">{" >> "}</span> {entry}
                 </motion.div>
               ))}
             </AnimatePresence>
          </div>

          <div className="pt-6 border-t border-slate-800">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-4">Commanding Officers</h4>
            <div className="flex items-center space-x-3 mb-4">
               <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                  <i className="fa-solid fa-gavel"></i>
               </div>
               <div>
                  <p className="text-xs font-bold text-white uppercase leading-none">Prince AVARIO</p>
                  <p className="text-[9px] text-slate-500 font-mono uppercase">Strategic Lead</p>
               </div>
            </div>
            <div className="flex items-center space-x-3">
               <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                  <i className="fa-solid fa-radiation"></i>
               </div>
               <div>
                  <p className="text-xs font-bold text-white uppercase leading-none">Princess Avaris</p>
                  <p className="text-[9px] text-slate-500 font-mono uppercase">Defense Lead</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoyalTycoon;
