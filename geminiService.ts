
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const suggestTasks = async (goal: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `あなたは熟練のプロジェクトマネージャーです。以下の目標達成のために必要な具体的なタスクを5つ提案してください。
    目標: ${goal}
    日本語で回答してください。`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            priority: { type: Type.STRING, enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] },
          },
          required: ['title', 'description', 'priority'],
        },
      },
    },
  });

  return JSON.parse(response.text || '[]');
};
