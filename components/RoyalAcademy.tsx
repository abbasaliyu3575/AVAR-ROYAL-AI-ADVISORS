
import React from 'react';

const RoyalAcademy: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="glass-card p-10 rounded-[4rem] border-pink-500/20 bg-gradient-to-br from-pink-900/20 to-transparent flex flex-col md:flex-row items-center text-center md:text-left gap-8">
        <div className="w-24 h-24 rounded-3xl bg-pink-600 flex items-center justify-center text-white shadow-2xl shadow-pink-500/20 rotate-3 group hover:rotate-0 transition-transform">
           <i className="fa-solid fa-school text-4xl"></i>
        </div>
        <div>
           <h2 className="text-3xl font-bold uppercase gold-text tracking-tighter">AVAR ROYAL ACADEMIC</h2>
           <p className="text-[10px] text-pink-400 font-mono uppercase tracking-[0.4em] font-bold mt-1">Managed by Princess Aurora AVAR</p>
           <p className="max-w-xl text-xs text-slate-400 leading-relaxed mt-4">
             Enlightening the next generation of Sovereign citizens in cosmic wisdom, advanced coding, and planetary astrology.
           </p>
        </div>
        <div className="flex-1 text-right">
           <div className="text-4xl font-bold text-white font-mono">4.9M</div>
           <p className="text-[8px] text-slate-500 font-mono uppercase tracking-widest">Enrolled Students</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Sovereign Logic', level: 'Level 1000', students: '1.2M', progress: 100, icon: 'fa-brain' },
          { title: 'Cosmic Astrology', level: 'Universal', students: '800K', progress: 85, icon: 'fa-star' },
          { title: 'Zarra-Shield Tech', level: 'Defense Grade', students: '1.5M', progress: 92, icon: 'fa-shield' },
          { title: 'Quantum Coding', level: 'Recursive', students: '900K', progress: 78, icon: 'fa-code' },
          { title: 'Royal Protocol', level: 'Dynasty Standard', students: '500K', progress: 100, icon: 'fa-crown' },
        ].map((course, i) => (
          <div key={i} className="glass-card p-6 rounded-[2.5rem] border-slate-800 hover:border-pink-500/30 transition-all">
            <div className="flex items-center space-x-4 mb-6">
               <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500">
                  <i className={`fa-solid ${course.icon} text-lg`}></i>
               </div>
               <div>
                  <h4 className="text-sm font-bold text-white uppercase">{course.title}</h4>
                  <p className="text-[9px] text-pink-400 font-mono uppercase">{course.level}</p>
               </div>
            </div>
            <div className="space-y-2">
               <div className="flex justify-between text-[8px] font-mono uppercase">
                  <span className="text-slate-500">Mastery Level</span>
                  <span className="text-white">{course.progress}%</span>
               </div>
               <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500" style={{width: `${course.progress}%`}}></div>
               </div>
               <div className="flex justify-between items-center mt-4">
                  <span className="text-[10px] text-slate-500 font-mono uppercase italic">{course.students} Students</span>
                  <button className="text-[10px] text-pink-500 font-bold uppercase hover:underline">View Syllabus</button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoyalAcademy;
