
import React from 'react';
import { ProficiencyLevel, LessonType } from '../types.ts';
import { 
  Book, 
  Clock, 
  Star, 
  Users, 
  Brain, 
  Globe, 
  Sparkles, 
  PlayCircle, 
  Headphones, 
  PenTool,
  CheckCircle2
} from 'lucide-react';

interface DashboardProps {
  onStartLesson: (type: LessonType, topic: string) => void;
  level: ProficiencyLevel;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartLesson, level }) => {
  const categories = [
    { 
      title: "Žodynas", 
      type: 'vocabulary' as LessonType, 
      icon: <Brain className="text-blue-400" />, 
      desc: "Plėskite savo žodžių atsargas su AI",
      color: "border-blue-500/20 bg-blue-500/5"
    },
    { 
      title: "Gramatika", 
      type: 'grammar' as LessonType, 
      icon: <PenTool className="text-purple-400" />, 
      desc: "Išmokite taisyklingai sudaryti sakinius",
      color: "border-purple-500/20 bg-purple-500/5"
    },
    { 
      title: "Klausymas", 
      type: 'practice' as LessonType, 
      icon: <Headphones className="text-emerald-400" />, 
      desc: "Supraskite anglų kalbą iš klausos",
      color: "border-emerald-500/20 bg-emerald-500/5"
    },
    { 
      title: "Skaitymas", 
      type: 'reading' as LessonType, 
      icon: <Book className="text-amber-400" />, 
      desc: "Analizuokite tekstus ir jų prasmę",
      color: "border-amber-500/20 bg-amber-500/5"
    }
  ];

  const quickLessons = [
    { title: "Darbas ir Karjera", type: 'vocabulary' as LessonType, time: "8 min" },
    { title: "Keliavimas užsienyje", type: 'vocabulary' as LessonType, time: "12 min" },
    { title: "Būtasis laikas (Past Simple)", type: 'grammar' as LessonType, time: "15 min" },
    { title: "Restorano etiketas", type: 'practice' as LessonType, time: "10 min" }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-800 to-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-white/10">
            <Sparkles size={14} className="text-amber-400" />
            Dienos Tikslas: 25 XP
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Mokykis anglų kalbos protingiau.</h1>
          <p className="text-indigo-100/70 text-lg mb-8 leading-relaxed">
            Tavo pasirinktas lygis yra <span className="text-white font-bold underline decoration-amber-400">{level}</span>. 
            Šiandien paruošėme tau specialią programą!
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => onStartLesson('vocabulary', 'Dažniausios frazės')}
              className="bg-white text-indigo-900 px-8 py-4 rounded-2xl font-black hover:bg-indigo-50 transition-all shadow-xl active:scale-95"
            >
              Pradėti pamoką
            </button>
            <div className="flex items-center gap-3 px-4 py-2 bg-indigo-900/40 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center font-black text-white shadow-lg">5</div>
              <span className="text-sm font-bold">Dienų serija!</span>
            </div>
          </div>
        </div>
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 to-transparent opacity-50 pointer-events-none"></div>
      </section>

      {/* Categories Grid */}
      <section>
        <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
          <Globe className="text-indigo-500" />
          Pagrindinės sritys
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div 
              key={i} 
              onClick={() => onStartLesson(cat.type, `Bendras ${cat.title}`)}
              className={`group p-6 rounded-[2rem] border transition-all cursor-pointer hover:shadow-2xl hover:-translate-y-1 ${cat.color}`}
            >
              <div className="p-4 bg-slate-900 rounded-2xl w-fit mb-5 shadow-inner border border-white/5 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h4 className="text-lg font-black text-white mb-1">{cat.title}</h4>
              <p className="text-slate-500 text-sm font-medium">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Lessons & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-black text-white flex items-center gap-3">
            <PlayCircle className="text-orange-500" />
            Greitos pamokos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickLessons.map((lesson, i) => (
              <button
                key={i}
                onClick={() => onStartLesson(lesson.type, lesson.title)}
                className="flex items-center justify-between p-5 bg-slate-900 border border-slate-800 rounded-2xl hover:border-indigo-500 transition-all text-left group"
              >
                <div>
                  <p className="font-bold text-slate-200 group-hover:text-white transition-colors">{lesson.title}</p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">{lesson.time} • {lesson.type}</p>
                </div>
                <div className="text-slate-700 group-hover:text-indigo-500 transition-colors">
                  <Star size={18} fill="currentColor" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-black text-white flex items-center gap-3">
            <CheckCircle2 className="text-emerald-500" />
            Tavo progresas
          </h3>
          <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 shadow-xl">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400 font-bold uppercase tracking-tighter">Žodynas</span>
                  <span className="text-white font-black">65%</span>
                </div>
                <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400 font-bold uppercase tracking-tighter">Gramatika</span>
                  <span className="text-white font-black">42%</span>
                </div>
                <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400 font-bold uppercase tracking-tighter">Klausymas</span>
                  <span className="text-white font-black">18%</span>
                </div>
                <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '18%' }}></div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-800 text-center">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Liko iki kito lygio</p>
              <p className="text-white font-black text-2xl">1,240 XP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
