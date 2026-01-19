
import React, { useState, useEffect } from 'react';
import { ProficiencyLevel, LessonType, LessonContent, ChatMessage } from './types';
import { generateLesson, getAiTutorResponse } from './services/geminiService';
import { 
  BookOpen, 
  MessageCircle, 
  Settings, 
  GraduationCap, 
  ChevronRight, 
  Lightbulb, 
  CheckCircle2, 
  Play, 
  RotateCcw,
  LayoutDashboard,
  Zap,
  Menu,
  ChevronDown
} from 'lucide-react';

// Components
import Dashboard from './components/Dashboard';
import LessonView from './components/LessonView';
import AiTutor from './components/AiTutor';
import GrammarReference from './components/GrammarReference';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'lesson' | 'tutor' | 'reference'>('dashboard');
  const [level, setLevel] = useState<ProficiencyLevel>(ProficiencyLevel.BEGINNER);
  const [currentLesson, setCurrentLesson] = useState<LessonContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartLesson = async (type: LessonType, topic: string) => {
    setIsLoading(true);
    setActiveTab('lesson');
    try {
      const lesson = await generateLesson(level, type, topic);
      setCurrentLesson(lesson);
    } catch (error) {
      console.error("Failed to generate lesson:", error);
      alert("Nepavyko sugeneruoti pamokos. Bandykite dar kartą.");
      setActiveTab('dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden text-slate-200">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col hidden md:flex shrink-0 shadow-xl">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-indigo-600 p-2.5 rounded-xl text-white shadow-indigo-900/40 shadow-lg">
              <GraduationCap size={26} />
            </div>
            <h1 className="text-xl font-black text-white tracking-tight leading-tight">
              Anglų kalbos<br/>asistentas
            </h1>
          </div>
          
          <nav className="space-y-2">
            <NavItem 
              icon={<LayoutDashboard size={20} />} 
              label="Pagrindinis" 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')} 
            />
            <NavItem 
              icon={<MessageCircle size={20} />} 
              label="AI Mokytojas" 
              active={activeTab === 'tutor'} 
              onClick={() => setActiveTab('tutor')} 
            />
            <NavItem 
              icon={<BookOpen size={20} />} 
              label="Gramatikos Gidas" 
              active={activeTab === 'reference'} 
              onClick={() => setActiveTab('reference')} 
            />
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800 bg-slate-900/50">
          <div className="mb-4 flex items-center justify-between">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em]">
              Tavo lygis
            </label>
            <Settings size={14} className="text-slate-500" />
          </div>
          <div className="relative">
            <select 
              className="w-full appearance-none p-3 bg-slate-800 border border-slate-700 rounded-xl text-sm font-bold text-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer transition-all hover:border-slate-600 pr-10"
              value={level}
              onChange={(e) => setLevel(e.target.value as ProficiencyLevel)}
            >
              {Object.values(ProficiencyLevel).map(l => (
                <option key={l} value={l} className="bg-slate-800 text-white">{l}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative flex flex-col bg-slate-950">
        <header className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3 md:gap-0">
             <div className="md:hidden bg-indigo-600 p-1.5 rounded-lg text-white">
                <GraduationCap size={20} />
             </div>
             <h2 className="text-lg font-bold text-white">
              {activeTab === 'dashboard' && 'Mokymosi Planas'}
              {activeTab === 'lesson' && 'Pamoka'}
              {activeTab === 'tutor' && 'Pokalbis su AI'}
              {activeTab === 'reference' && 'Gramatikos Žinynas'}
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
             {/* Mobile Level Selector Indicator */}
             <div className="md:hidden">
               <select 
                className="bg-slate-800 text-xs font-bold py-1.5 px-3 rounded-full border-none focus:ring-2 focus:ring-indigo-500 text-slate-200"
                value={level}
                onChange={(e) => setLevel(e.target.value as ProficiencyLevel)}
               >
                 {Object.values(ProficiencyLevel).map(l => (
                   <option key={l} value={l}>{l.split(' ')[0]}</option>
                 ))}
               </select>
             </div>
             
             <div className="hidden sm:flex items-center gap-1 bg-amber-900/20 text-amber-400 px-4 py-1.5 rounded-full text-sm font-bold border border-amber-900/30">
               <Zap size={14} fill="currentColor" />
               <span>5 Dienų Serija</span>
             </div>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full">
          {activeTab === 'dashboard' && <Dashboard onStartLesson={handleStartLesson} level={level} />}
          {activeTab === 'lesson' && (
            <LessonView 
              lesson={currentLesson} 
              isLoading={isLoading} 
              onBack={() => setActiveTab('dashboard')} 
            />
          )}
          {activeTab === 'tutor' && <AiTutor />}
          {activeTab === 'reference' && <GrammarReference onStartLesson={handleStartLesson} />}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 flex justify-around p-3 z-50 shadow-2xl">
        <MobileNavItem icon={<LayoutDashboard size={20} />} active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
        <MobileNavItem icon={<MessageCircle size={20} />} active={activeTab === 'tutor'} onClick={() => setActiveTab('tutor')} />
        <MobileNavItem icon={<BookOpen size={20} />} active={activeTab === 'reference'} onClick={() => setActiveTab('reference')} />
      </nav>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-900/20' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 font-medium'
    }`}
  >
    <span className={active ? 'text-white' : 'text-slate-500'}>{icon}</span>
    <span>{label}</span>
  </button>
);

const MobileNavItem: React.FC<{ icon: React.ReactNode, active: boolean, onClick: () => void }> = ({ icon, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`p-3 rounded-2xl transition-all ${active ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
  >
    {icon}
  </button>
);

export default App;
