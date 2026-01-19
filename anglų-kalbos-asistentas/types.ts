
export enum ProficiencyLevel {
  BEGINNER = 'A1-A2 (Pradedantysis)',
  INTERMEDIATE = 'B1-B2 (Vidutinis)',
  ADVANCED = 'C1-C2 (Pažengęs)'
}

export type LessonType = 'vocabulary' | 'grammar' | 'reading' | 'practice';

export interface LessonContent {
  title: string;
  explanation: string;
  examples: { english: string; lithuanian: string }[];
  vocabulary: { word: string; translation: string; pronunciation?: string }[];
  quiz: { question: string; options: string[]; answer: string; explanation: string }[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
