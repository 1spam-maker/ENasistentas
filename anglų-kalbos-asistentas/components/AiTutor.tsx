
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { getAiTutorResponse } from '../services/geminiService.ts';
import { ChatMessage } from '../types.ts';

const AiTutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Sveiki! Aš esu jūsų AI mokytojas. Kaip galiu padėti?', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    try {
      const response = await getAiTutorResponse(input, messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })));
      setMessages(prev => [...prev, { role: 'model', text: response || 'Klaida.', timestamp: Date.now() }]);
    } catch {
      setMessages(prev => [...prev, { role: 'model', text: 'Nepavyko prisijungti.', timestamp: Date.now() }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[70vh] flex flex-col bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden shadow-2xl">
      <div className="bg-indigo-600 p-5 text-white font-bold flex items-center gap-3">
        <Bot size={24} /> AI Mokytojas
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-4 rounded-2xl max-w-[80%] ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && <Loader2 className="animate-spin text-indigo-500" />}
      </div>
      <div className="p-4 border-t border-slate-800 flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} className="flex-1 bg-slate-950 p-3 rounded-xl outline-none" placeholder="Rašykite čia..." />
        <button onClick={handleSend} className="bg-indigo-600 p-3 rounded-xl"><Send size={20} /></button>
      </div>
    </div>
  );
};

export default AiTutor;
