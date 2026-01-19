
import React, { useState } from 'react';
import { LessonContent } from '../types';
import { 
  ArrowLeft, 
  Lightbulb, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  BookOpen, 
  Trophy,
  Loader2
} from 'lucide-react';

interface LessonViewProps {
  lesson: LessonContent | null;
  isLoading: boolean;
  onBack: () => void;
}

const LessonView: React.FC<LessonViewProps> = ({ lesson, isLoading, onBack }) => {
  const [currentStep, setCurrentStep] = useState<'content' | 'quiz' | 'result'>('content');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-indigo-500" size={48} />
        <div className="text-center">
          <h3 className="text-xl font-bold text-white">Ruošiame tavo pamoką...</h3>
          <p className="text-slate-500">Generuojamas turinys ir pratimai...</p>
        </div>
      </div>
    );
  }

  if (!lesson) return null;

  const score = lesson.quiz.reduce((acc, q, idx) => {
    return acc + (quizAnswers[idx] === q.answer ? 1 : 0);
  }, 0);

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-400 mb-6 transition-colors font-bold"
      >
        <ArrowLeft size={20} />
        Grįžti atgal
      </button>

      {currentStep === 'content' && (
        <div className="space-y-8">
          <header>
            <h1 className="text-3xl font-black text-white mb-4 tracking-tight">{lesson.title}</h1>
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
              <h4 className="flex items-center gap-2 text-indigo-400 font-bold mb-4">
                <Lightbulb size={20} />
                Paaiškinimas
              </h4>
              <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{lesson.explanation}</p>
            </div>
          </header>

          <section>
            <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-indigo-500" />
              Svarbūs žodžiai
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lesson.vocabulary.map((v, i) => (
                <div key={i} className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex justify-between items-center group hover:border-indigo-500/50 transition-colors shadow-sm">
                  <div>
                    <p className="font-bold text-lg text-white">{v.word}</p>
                    <p className="text-slate-400 text-sm">{v.translation}</p>
                  </div>
                  <button className="text-slate-600 group-hover:text-indigo-500 transition-colors p-2 hover:bg-slate-800 rounded-lg">
                    <Volume2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-black text-white mb-4">Pavyzdžiai</h3>
            <div className="space-y-3">
              {lesson.examples.map((ex, i) => (
                <div key={i} className="bg-slate-900 p-5 rounded-xl border-l-4 border-indigo-600 border border-slate-800">
                  <p className="font-bold text-white text-lg">"{ex.english}"</p>
                  <p className="text-slate-400 italic mt-1">{ex.lithuanian}</p>
                </div>
              ))}
            </div>
          </section>

          <button 
            onClick={() => setCurrentStep('quiz')}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-950/20"
          >
            Pradėti žinių patikrinimą
          </button>
        </div>
      )}

      {currentStep === 'quiz' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-black text-white">Pasitikrink save</h2>
            <div className="text-sm font-bold text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              {Object.keys(quizAnswers).length} iš {lesson.quiz.length} atsakyta
            </div>
          </div>

          {lesson.quiz.map((q, qIdx) => (
            <div key={qIdx} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">
              <p className="text-xl font-bold text-white mb-6 leading-snug">{qIdx + 1}. {q.question}</p>
              <div className="grid grid-cols-1 gap-3">
                {q.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => setQuizAnswers(prev => ({ ...prev, [qIdx]: opt }))}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                      quizAnswers[qIdx] === opt 
                        ? 'border-indigo-600 bg-indigo-900/20 text-indigo-400 font-bold' 
                        : 'border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 bg-slate-950'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="flex gap-4">
            <button 
              onClick={() => setCurrentStep('content')}
              className="flex-1 bg-slate-800 text-slate-300 py-4 rounded-2xl font-black hover:bg-slate-700 transition-all"
            >
              Grįžti prie teorijos
            </button>
            <button 
              onClick={() => setCurrentStep('result')}
              disabled={Object.keys(quizAnswers).length < lesson.quiz.length}
              className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black hover:bg-indigo-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Baigti testą
            </button>
          </div>
        </div>
      )}

      {currentStep === 'result' && (
        <div className="bg-slate-900 p-12 rounded-[2.5rem] border border-slate-800 text-center shadow-2xl space-y-8">
          <div className="inline-flex p-8 rounded-full bg-indigo-900/30 text-indigo-400 ring-8 ring-indigo-900/10">
            <Trophy size={64} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white mb-2">Pamoka baigta!</h2>
            <p className="text-slate-400 text-lg">Tavo rezultatas: <span className="font-black text-indigo-400">{score} iš {lesson.quiz.length}</span></p>
          </div>

          <div className="max-w-md mx-auto space-y-4">
            {lesson.quiz.map((q, idx) => (
              <div key={idx} className={`p-5 rounded-2xl border text-left ${quizAnswers[idx] === q.answer ? 'bg-emerald-950/20 border-emerald-900/30' : 'bg-red-950/20 border-red-900/30'}`}>
                <div className="flex gap-3 mb-2">
                  {quizAnswers[idx] === q.answer ? <CheckCircle2 className="text-emerald-500 shrink-0" /> : <XCircle className="text-red-500 shrink-0" />}
                  <p className="font-bold text-slate-200 text-sm leading-tight">{q.question}</p>
                </div>
                <p className="text-xs text-slate-500 ml-9 leading-relaxed">{q.explanation}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 flex gap-4">
            <button 
              onClick={() => {
                setQuizAnswers({});
                setCurrentStep('content');
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-800 text-slate-300 py-4 rounded-2xl font-black hover:bg-slate-700 transition-all"
            >
              Mokytis dar kartą
            </button>
            <button 
              onClick={onBack}
              className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black hover:bg-indigo-500 transition-all"
            >
              Grįžti į pradžią
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonView;
