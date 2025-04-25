import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GoogleGenAI_API_Key, // API Key ko safely store karne ke liye environment variable ka use karo
});

export async function POST(req: Request) {
  try {
    const { content } = await req.json(); // Request se content ko fetch karo

    // Gemini model ko call karte hue content summarize karo
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Summarize this:\n\n${content}`,
    });

    return NextResponse.json({ summary: response.text }); // Response ko return karo
  } catch (error) {
    console.error("Error generating summary:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}
