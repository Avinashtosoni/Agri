import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateProjectDescription = async (title: string, category: string): Promise<string> => {
  if (!apiKey) {
    console.warn("No API Key found for Gemini.");
    return "API Key missing. Please provide a description manually.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are a professional research grant writer for a top-tier technology institute.
      Write a concise, compelling, and academic abstract (approx 50-80 words) for a research project titled "${title}" in the field of "${category}".
      Focus on the innovation, methodology, and potential impact. Do not use markdown formatting.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "No description generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate description due to an error. Please try again.";
  }
};

export const suggestProjectTitle = async (draftTitle: string): Promise<string> => {
  if (!apiKey) return draftTitle;

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Refine the following research project title to sound more academic and impactful: "${draftTitle}".
      Return ONLY the refined title, nothing else.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text ? response.text.trim() : draftTitle;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return draftTitle;
  }
};