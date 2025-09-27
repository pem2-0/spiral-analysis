
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available as an environment variable
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const runQuery = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: "You are an expert in cosmology and theoretical physics, explaining complex topics in a clear, concise, and engaging way for a curious audience. Your tone is knowledgeable but accessible.",
                temperature: 0.7,
            },
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API call failed:", error);
        return "An error occurred while trying to connect to the Gemini interpreter. Please check the console for details.";
    }
};
