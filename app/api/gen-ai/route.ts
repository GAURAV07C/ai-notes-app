import { NextResponse } from "next/server";
import { ChatGroq } from "@langchain/groq";
import { HumanMessage } from "@langchain/core/messages";

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: process.env.GROQ_MODEL ?? "llama3-8b-8192",
  temperature: 0.2,
});

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    if (typeof content !== "string" || !content.trim()) {
      return NextResponse.json(
        { error: "Missing or empty content" },
        { status: 400 },
      );
    }

    const prompt = `Summarize this note in 5-8 concise bullet points:\n\n${content}`;

    const result = await llm.invoke([new HumanMessage({ content: prompt })]);

    const summary =
      typeof (result as { content?: unknown })?.content === "string"
        ? ((result as { content: string }).content as string)
        : String(result);

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error generating summary:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 },
    );
  }
}
