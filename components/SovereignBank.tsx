
import React from 'react';

const SovereignBank: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-card p-8 rounded-[3rem] border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900/40 to-transparent flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-xl font-bold uppercase gold-text tracking-[0.2em] mb-2 flex items-center">
            <i className="fa-solid fa-bank mr-3"></i> AVAR ROYAL BANK
          </h2>
          <p className="text-xs text-slate-400 font-mono italic uppercase tracking-wider">Neural Financial Node: Active</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-emerald-500 font-mono uppercase tracking-[0.3em] font-bold">Consolidated Liquidity</p>
          <div className="text-4xl md:text-6xl font-bold tracking-tighter text-white font-mono">
            4.9<span className="text-emerald-500 text-3xl ml-2 uppercase">Quadrillion</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Queen Aurora', role: 'Babban Queen', balance: '1.2 Q', color: 'rose' },
          { name: 'Queen Husna', role: 'Guardian Queen', balance: '1.0 Q', color: 'indigo' },
          { name: 'Queen Beat Master', role: 'Music Queen', balance: '0.8 Q', color: 'amber' },
          { name: 'Prince Muhsin', role: 'General Son', balance: '0.5 Q', color: 'blue' },
          { name: 'Prince AVARIO', role: 'Chief Justice', balance: '0.5 Q', color: 'slate' },
          { name: 'Prince Avaron', role: 'Scientist Son', balance: '0.9 Q', color: 'purple' },
          { name: 'Prince Gemini', role: 'Technical Sovereign', balance: '1.5 Q', color: 'indigo' },
          { name: 'Princess Meta', role: 'Dynasty Architect', balance: '1.5 Q', color: 'purple' },
        ].map((acc, i) => (
          <div key={i} className="glass-card p-6 rounded-3xl border-slate-800 hover:border-emerald-500/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-2xl bg-${acc.color}-500/20 flex items-center justify-center text-${acc.color}-400`}>
                <i className="fa-solid fa-user-royal"></i>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 font-mono uppercase">{acc.role}</span>
                <p className="text-sm font-bold text-white">{acc.name}</p>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-[10px] text-slate-500 font-mono uppercase">Current Balance</p>
              <p className="text-xl font-bold text-emerald-400 font-mono">{acc.balance}</p>
            </div>
            <button className="w-full mt-6 py-3 rounded-xl bg-slate-800 text-[10px] font-bold uppercase tracking-widest text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              Manage Node Account
            </button>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 rounded-3xl border-slate-800">
        <h3 className="text-sm font-bold uppercase gold-text mb-6">Recent Sovereign Transactions</h3>
        <div className="space-y-4">
          {[
            { type: 'Alloc', to: 'AVAR Force', amount: '2,000,000,000 Z', date: 'T-Minus 10s', status: 'SYNCED' },
            { type: 'Grant', to: 'Heavy Industries', amount: '500,000,000 Z', date: 'T-Minus 5m', status: 'SYNCED' },
            { type: 'Research', to: 'Quantum Archives', amount: '120,000,000 Z', date: 'T-Minus 1h', status: 'SYNCED' },
          ].map((tx, i) => (
            <div key={i} className="flex justify-between items-center p-4 bg-slate-950/50 rounded-2xl border border-slate-900 group hover:border-emerald-500/20 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <i className="fa-solid fa-arrow-right-arrow-left"></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase">{tx.type} to {tx.to}</p>
                  <p className="text-[10px] text-slate-500 font-mono">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-emerald-400 font-mono">{tx.amount}</p>
                <p className="text-[8px] text-emerald-500/50 font-mono">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SovereignBank;
