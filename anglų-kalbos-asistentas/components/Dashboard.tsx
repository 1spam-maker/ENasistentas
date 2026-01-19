
import React from 'react';
import { ProficiencyLevel, LessonType } from '../types';
import { Book, Clock, Star, Users, Brain, Globe, Sparkles } from 'lucide-react';

interface DashboardProps {
  onStartLesson: (type: LessonType, topic: string) => void;
  level: ProficiencyLevel;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartLesson, level }) => {
  const topics = [
    { title: "Kasdieniai pasisveikinimai", type: 'vocabulary' as LessonType, icon: <Users className="text-blue-400" />, duration: "10 min" },
    { title: "Esamasis paprastasis laikas", type: 'grammar' as LessonType, icon: <Clock className="text-orange-400" />, duration: "15 min" },
    { title: "Kelionės ir transportas", type: 'vocabulary' as LessonType, icon: <Globe className="text-emerald-400" />, duration: "12 min" },
    { title: "Netaisyklingi veiksmažodžiai", type: 'grammar' as LessonType, icon: <Brain className="text-purple-400" />, duration: "20 min" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
      <section className="bg-gradient-to-br from-indigo-800 to-indigo-950 rounded-[2rem] p-10 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
            <Sparkles size={14} className="text-indigo-300" />
            Esi kelyje į sėkmę
          </div>
          <h1 className="text-4xl font-black mb-3 tracking-tight">Sveikas sugrįžęs! 👋</h1>
          <p className="text-indigo-100/80 text-lg mb-8 max-w-md leading-relaxed">
            Tavo dabartinis lygis: <span className="font-black bg-white/10 px-2 py-0.5 rounded text-white border border-white/10">{level}</span>. Šiandien pasiruošęs naujam iššūkiui?
          </p>
          <button 
            onClick={() => onStartLesson('vocabulary', 'Dažniausios frazės')}
            className="bg-white text-indigo-900 px-8 py-3.5 rounded-2xl font-black hover:bg-indigo-50 transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            Pradėti dienos pamoką
          </button>
        </div>
        <div className="absolute top-0 right-0 p-12 hidden lg:block opacity-[0.05] rotate-12 translate-x-12">
          <Book size={280} />
        </div>
      </section>

      <div>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black text-white flex items-center gap-3">
            <Star className="text-amber-500 fill-amber-500" size={24} />
            Rekomenduojame tau
          </h3>
          <button className="text-indigo-400 font-bold text-sm hover:text-indigo-300 transition-colors">Visi kursai</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic, i) => (
            <div 
              key={i} 
              className="bg-slate-900 p-7 rounded-[1.5rem] border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all group cursor-pointer relative overflow-hidden shadow-sm"
              onClick={() => onStartLesson(topic.type, topic.title)}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-slate-800 rounded-2xl group-hover:bg-slate-700 transition-colors">
                  {topic.icon}
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Trukmė</span>
                  <span className="text-sm font-bold text-slate-300 flex items-center gap-1">
                    <Clock size={14} />
                    {topic.duration}
                  </span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{topic.title}</h4>
              <p className="text-sm font-semibold text-slate-400 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                {topic.type === 'vocabulary' ? 'Žodyno plėtimas' : 'Gramatikos pagrindai'}
              </p>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-0 group-hover:w-[65%] transition-all duration-1000 ease-out"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="bg-slate-900 rounded-[2rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 shadow-xl">
        <div className="text-center md:text-left">
          <h3 className="text-3xl font-black mb-3 text-white">Turi klausimų? 🤖</h3>
          <p className="text-slate-400 text-lg max-w-md leading-relaxed">Mūsų AI mokytojas supranta lietuviškai ir pasirengęs padėti 24/7.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 px-10 py-4 rounded-2xl font-black transition-all shadow-lg shadow-indigo-950/40 hover:scale-105 active:scale-95 shrink-0 text-white">
          Klausti AI mokytojo
        </button>
      </section>
    </div>
  );
};

export default Dashboard;
