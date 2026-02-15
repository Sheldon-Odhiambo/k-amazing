
import { GoogleGenAI } from "@google/genai";

export const askKijanaStylist = async (query: string) => {
  // Fix: Initializing GoogleGenAI using the process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: "You are 'Kijana Stylist', an elite fashion consultant for the streetwear brand Kijana Amazing. Your tone is cool, visionary, and slightly poetic. You focus on 'Aesthetic Endurance' and 'Rooted in Grit'. Recommend outfits based on user needs from the Kijana Amazing collection (Hoodies, Tees, Caps)."
      }
    });
    return response.text || "I'm contemplating the next vision. Ask me again shortly.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The visionary connection is currently hazy. Please reach out again.";
  }
};
