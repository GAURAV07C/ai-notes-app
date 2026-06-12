import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

type NoteResponse = {
  id: string;
  userId: string;
  title: string;
  content: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
};

function serializeNote(note: {
  id: string;
  userId: string;
  title: string;
  content: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}): NoteResponse {
  return {
    id: note.id,
    userId: note.userId,
    title: note.title,
    content: note.content,
    summary: note.summary,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
  };
}

async function getCurrentUserId() {
  const session = await getServerSession(authOptions);

  return session?.user?.id ?? null;
}

export async function GET() {
  const userId = await getCurrentUserId();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const notes = await prisma.note.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(notes.map(serializeNote));
}

export async function POST(request: Request) {
  const userId = await getCurrentUserId();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const content = typeof body.content === "string" ? body.content : "";
  const summary = typeof body.summary === "string" ? body.summary : "";

  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content are required" },
      { status: 400 },
    );
  }

  const note = await prisma.note.create({
    data: {
      userId,
      title,
      content,
      summary,
    },
  });

  return NextResponse.json(serializeNote(note), { status: 201 });
}
