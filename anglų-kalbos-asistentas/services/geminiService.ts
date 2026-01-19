import { GoogleGenAI, Type } from "@google/genai";
import { ProficiencyLevel, LessonType, LessonContent } from "../types";

export const generateLesson = async (level: ProficiencyLevel, type: LessonType, topic: string): Promise<LessonContent> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Sukurk anglų kalbos pamoką ${level} lygiui tema: "${topic}". Pamokos tipas: ${type}. 
  Paaiškinimai turi būti lietuvių kalba. 
  Pateik:
  1. Pavadinimą.
  2. Išsamų gramatikos ar temos paaiškinimą lietuviškai.
  3. 5 sakinių pavyzdžius (anglų - lietuvių k.).
  4. 10 svarbių žodžių su vertimais.
  5. Trumpą testą (3 klausimai) su pasirinkimais ir paaiškinimais.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          explanation: { type: Type.STRING },
          examples: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                english: { type: Type.STRING },
                lithuanian: { type: Type.STRING }
              },
              required: ["english", "lithuanian"]
            }
          },
          vocabulary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                word: { type: Type.STRING },
                translation: { type: Type.STRING },
                pronunciation: { type: Type.STRING }
              },
              required: ["word", "translation"]
            }
          },
          quiz: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                answer: { type: Type.STRING },
                explanation: { type: Type.STRING }
              },
              required: ["question", "options", "answer", "explanation"]
            }
          }
        },
        required: ["title", "explanation", "examples", "vocabulary", "quiz"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const getAiTutorResponse = async (message: string, history: any[] = []) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: 'Tu esi LinguoMaster - draugiškas ir kantrus anglų kalbos mokytojas. Vartotojas kalba lietuviškai. Tavo tikslas - padėti jam mokytis anglų kalbos, aiškinti gramatiką, taisyti klaidas ir skatinti kalbėti angliškai. Atsakinėk lietuviškai, bet pateik daug pavyzdžių angliškai. Jei vartotojas daro klaidų, švelniai pataisyk. Būk drąsus ir motyvuojantis.',
    },
    history: history
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};