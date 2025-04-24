import { GoogleGenAI } from "@google/genai";

// Initialize the AI instance only on the server-side (this will never run on the client)
export const ai = new GoogleGenAI({
  apiKey: "AIzaSyAlizrnxgcO7WD-aIBJvB3GxfxQ8tWgCFE", // API key will be injected from environment variable
});

export async function generateSummary(content: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Summarize this:\n\n${content}`,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating summary:", error);
    throw new Error("Failed to generate summary");
  }
}
