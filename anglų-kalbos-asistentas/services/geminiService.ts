
import { GoogleGenAI, Type } from "@google/genai";
import { ProficiencyLevel, LessonType, LessonContent } from "../types.ts";

export const generateLesson = async (level: ProficiencyLevel, type: LessonType, topic: string): Promise<LessonContent> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Sukurk aukštos kokybės anglų kalbos pamoką ${level} lygiui tema: "${topic}". Pamokos tipas: ${type}. 
  Visi paaiškinimai, instrukcijos ir testo klausimai turi būti lietuvių kalba.
  Pateik griežtą JSON formatą su šiais laukais:
  1. title: Pamokos pavadinimas.
  2. explanation: Išsamus teorinis paaiškinimas lietuviškai (naudok pastraipas).
  3. examples: Masyvas su {english: string, lithuanian: string} (pateik 5 pavyzdžius).
  4. vocabulary: Masyvas su {word: string, translation: string} (pateik 10 žodžių).
  5. quiz: Masyvas su {question: string, options: string[], answer: string, explanation: string} (pateik 3-5 klausimus).`;

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
              }
            }
          },
          vocabulary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                word: { type: Type.STRING },
                translation: { type: Type.STRING }
              }
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
              }
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
      systemInstruction: 'Tu esi LinguoMaster - profesionalus anglų kalbos mokytojas. Kalbėk lietuviškai, bet visada pateik angliškus pavyzdžius su vertimais. Taisyk vartotojo klaidas. Būk motyvuojantis ir draugiškas.',
    },
    history: history
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};
