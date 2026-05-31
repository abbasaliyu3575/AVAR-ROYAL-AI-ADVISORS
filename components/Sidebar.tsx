
import React from 'react';
import { AppTab } from '../types';

interface SidebarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: AppTab.DASHBOARD, icon: 'fa-tower-broadcast', label: 'Sovereign Palace' },
    { id: AppTab.HASHTAGS, icon: 'fa-microchip', label: 'Royal Decree' },
    { id: AppTab.IMAGES, icon: 'fa-wand-magic-sparkles', label: 'Legacy Studio' },
    { id: AppTab.CHAT, icon: 'fa-users-line', label: 'Family Council' },
    { id: AppTab.BANK, icon: 'fa-bank', label: 'Royal Bank' },
    { id: AppTab.FORCE, icon: 'fa-gamepad', label: 'Force Tycoon' },
    { id: AppTab.LIVE, icon: 'fa-waveform', label: 'Legacy Presence' },
  ];

  return (
    <aside className="w-20 md:w-64 flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300">
      <div className="p-6 flex items-center justify-center md:justify-start space-x-3">
        <div className="w-10 h-10 royal-gradient rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <i className="fa-solid fa-crown gold-text text-xl"></i>
        </div>
        <div className="hidden md:block">
          <h1 className="text-xl font-bold gold-text tracking-tighter uppercase">AVAR Sovereign</h1>
          <p className="text-[10px] text-indigo-400 font-mono font-bold tracking-widest">SOVEREIGN V3.0</p>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1 mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center p-3 rounded-xl transition-all group ${
              activeTab === item.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-6 text-lg flex justify-center`}></i>
            <span className="hidden md:block ml-3 font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-950 border border-slate-800 md:flex hidden">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-mono text-emerald-500">FAMILY BOND SECURE</span>
          </div>
        <button className="w-full mt-4 flex items-center justify-center md:justify-start p-3 text-red-400 hover:text-red-300 transition-colors">
          <i className="fa-solid fa-power-off w-6 flex justify-center"></i>
          <span className="hidden md:block ml-3 font-medium">Lock System</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
