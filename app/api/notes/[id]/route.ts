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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = await getCurrentUserId();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const note = await prisma.note.findUnique({
    where: { id, userId },
  });

  if (!note) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  return NextResponse.json(serializeNote(note));
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = await getCurrentUserId();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const data: {
    title?: string;
    content?: string;
    summary?: string;
  } = {};

  if (typeof body.title === "string") {
    data.title = body.title.trim();
  }

  if (typeof body.content === "string") {
    data.content = body.content;
  }

  if (typeof body.summary === "string") {
    data.summary = body.summary;
  }

  if (!data.title && !data.content && !data.summary) {
    return NextResponse.json(
      { error: "No valid fields to update" },
      { status: 400 },
    );
  }

  const note = await prisma.note.update({
    where: { id, userId },
    data,
  });

  return NextResponse.json(serializeNote(note));
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = await getCurrentUserId();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await prisma.note.deleteMany({
    where: { id, userId },
  });

  if (deleted.count === 0) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  return NextResponse.json({ id });
}
