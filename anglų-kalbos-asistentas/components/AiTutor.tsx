import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Info } from 'lucide-react';
import { getAiTutorResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AiTutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Sveiki! Aš esu jūsų anglų kalbos asistentas. Kuo galiu padėti šiandien? Galiu paaiškinti gramatiką, išversti frazes ar tiesiog pasikalbėti angliškai.', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    const currentHistory = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getAiTutorResponse(input, currentHistory);
      setMessages(prev => [...prev, { role: 'model', text: response || 'Atsiprašau, įvyko klaida.', timestamp: Date.now() }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Nepavyko susisiekti su AI mokytoju. Patikrinkite API rakto nustatymus.', timestamp: Date.now() }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden shadow-2xl animate-in fade-in duration-500">
      <div className="bg-indigo-600 p-5 text-white flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-sm">
            <Bot size={24} />
          </div>
          <div>
            <p className="font-black text-lg leading-none">Asistentas AI</p>
            <p className="text-xs text-indigo-100 font-medium opacity-80 mt-1">LinguoMaster Mokytojas</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-indigo-700 px-4 py-1.5 rounded-full border border-indigo-500/30">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          Aktyvus
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-950/30">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
            <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`p-2.5 rounded-xl shrink-0 h-fit shadow-sm ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-indigo-400 border border-slate-700'}`}>
                {m.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`p-4 rounded-2xl shadow-md leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
              }`}>
                <p className="text-[15px] whitespace-pre-wrap">{m.text}</p>
                <p className={`text-[10px] mt-2 font-bold uppercase tracking-tighter opacity-40 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-3">
              <Loader2 size={18} className="animate-spin text-indigo-400" />
              <span className="text-sm font-bold text-slate-400">Mokytojas mąsto...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-5 border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex gap-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Rašykite klausimą lietuviškai..."
            className="flex-1 p-4 bg-slate-950 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-[15px] text-white placeholder-slate-600 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-indigo-600 text-white p-4 rounded-2xl hover:bg-indigo-500 transition-all disabled:opacity-30 shadow-lg shadow-indigo-950/20 active:scale-95"
          >
            <Send size={20} />
          </button>
        </div>
        <div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
          <Info size={14} className="text-indigo-500" />
          <span>Pavyzdys: "Paaiškink skirtumą tarp Present Simple ir Continuous"</span>
        </div>
      </div>
    </div>
  );
};

export default AiTutor;