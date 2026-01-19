
import React from 'react';
import { LessonType } from '../types';
import { Search, ChevronRight, BookOpen, Clock, AlertCircle } from 'lucide-react';

interface GrammarReferenceProps {
  onStartLesson: (type: LessonType, topic: string) => void;
}

const GrammarReference: React.FC<GrammarReferenceProps> = ({ onStartLesson }) => {
  const grammarCategories = [
    {
      title: "Laikai (Tenses)",
      items: [
        "Present Simple",
        "Present Continuous",
        "Past Simple",
        "Past Continuous",
        "Present Perfect",
        "Future Simple (will/going to)"
      ]
    },
    {
      title: "Kalbos dalys",
      items: [
        "Artikeliai (A, An, The)",
        "Daugiskaita (Plural)",
        "Prieveiksmiai (Adverbs)",
        "Būdvardžiai (Adjectives)",
        "Prielinksniai (Prepositions)"
      ]
    },
    {
      title: "Sakinio sandara",
      items: [
        "Klausiamieji sakiniai",
        "Neigiamieji sakiniai",
        "Santykiniai sakiniai",
        "Pasyvas (Passive Voice)"
      ]
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Gramatikos Žinynas</h1>
          <p className="text-slate-400 font-medium text-lg">Visos taisyklės vienoje vietoje. Pasirink temą ir pradėk mokytis.</p>
        </div>
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="Ieškoti temos..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-600 shadow-sm"
          />
          <Search className="absolute left-4 top-3.5 text-slate-500" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {grammarCategories.map((cat, i) => (
          <div key={i} className="space-y-6">
            <h3 className="text-lg font-black text-indigo-400 border-b border-slate-800 pb-3 flex items-center gap-2 uppercase tracking-widest text-[11px]">
              {cat.title}
            </h3>
            <div className="space-y-3">
              {cat.items.map((item, j) => (
                <button
                  key={j}
                  onClick={() => onStartLesson('grammar', item)}
                  className="w-full flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:bg-slate-800 hover:border-indigo-500/50 group transition-all shadow-sm"
                >
                  <span className="text-[15px] font-bold text-slate-300 group-hover:text-white">{item}</span>
                  <ChevronRight size={18} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-950/20 border border-indigo-900/40 p-8 rounded-[2rem] flex flex-col md:flex-row items-start gap-6 shadow-sm">
        <div className="p-4 bg-indigo-900/30 rounded-2xl text-indigo-400 shadow-inner">
          <AlertCircle size={32} />
        </div>
        <div>
          <h4 className="text-xl font-black text-white mb-2">Nori ko nors kito?</h4>
          <p className="text-slate-400 leading-relaxed mb-6">Jei neradai reikiamos temos, paprašyk AI asistento sugeneruoti tau specifinę pamoką pagal tavo individualius poreikius.</p>
          <button className="text-indigo-400 font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:text-indigo-300 transition-colors">
            Eiti į pokalbį
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GrammarReference;
