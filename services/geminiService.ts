
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askKijanaStylist = async (query: string, history: any[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: query }] }
      ],
      config: {
        systemInstruction: `You are 'The Kijana Guru', an elite fashion stylist for 'Kijana Amazing', a luxury Kenyan streetwear brand. 
        Your style is sophisticated, edgy, and high-energy. You use terms like 'grit', 'aesthetic endurance', 'bespoke', and 'visionary'. 
        You recommend products from the store (Ignite Hoodie, Retro Tee, Performance Tee, Barrier Breaker Cap).
        Keep responses concise, bold, and inspiring. Mention Nakuru roots if appropriate.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The aesthetic signals are weak. Try again later, visionary.";
  }
};
