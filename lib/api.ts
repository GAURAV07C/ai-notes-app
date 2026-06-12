"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { type Note } from "./data";

const NOTE_API = "/api/notes";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await response.text();

    throw new Error(message || "Request failed");
  }

  return response.json();
}

export const getNotes = async () => {
  const response = await fetch(NOTE_API, { cache: "no-store" });

  return handleResponse<Note[]>(response);
};

export function useNotes() {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    enabled: !!session?.user,
  });
}

export function useNote(id: string) {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["notes", id],
    queryFn: async () => {
      const response = await fetch(`${NOTE_API}/${encodeURIComponent(id)}`, {
        cache: "no-store",
      });
      const note = await handleResponse<Note>(response);
      const validCreatedAt = new Date(note.createdAt);
      const validUpdatedAt = new Date(note.updatedAt);

      if (
        isNaN(validCreatedAt.getTime()) ||
        isNaN(validUpdatedAt.getTime())
      ) {
        throw new Error("Invalid date format");
      }

      return note;
    },
    enabled: !!session?.user && !!id,
    retry: 2,
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      newNote: Omit<Note, "userId" | "id" | "createdAt" | "updatedAt">,
    ) => {
      const response = await fetch(NOTE_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });

      return handleResponse<Note>(response);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["notes"], (oldData: Note[] = []) => {
        return [data, ...oldData];
      });
    },
  });
}

export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedNote: Partial<Note> & { id: string }) => {
      const response = await fetch(`${NOTE_API}/${encodeURIComponent(updatedNote.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: updatedNote.title,
          content: updatedNote.content,
          summary: updatedNote.summary,
        }),
      });

      return handleResponse<Note>(response);
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.setQueryData(["notes", data.id], data);
    },
  });
}

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${NOTE_API}/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      await handleResponse<{ id: string }>(response);

      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.removeQueries({ queryKey: ["notes", id] });
    },
  });
}

export async function generateSummary(content: string) {
  const res = await fetch(
    "https://ai-notes-app-azure.vercel.app/api/gen-ai",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    },
  );

  const data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  }

  return data.summary;
}

export function useGenerateSummary() {
  return useMutation({
    mutationFn: async (content: string) => {
      const words = content.split(" ");

      if (words.length <= 10) {
        return content;
      } else {
        const summary = await generateSummary(content);

        if (!summary || summary.trim().length === 0) {
          const sentences = content
            .split(/[.!?]+/)
            .filter((s) => s.trim().length > 0);
          if (sentences.length > 0) {
            let fallbackSummary = sentences[0].trim();
            if (sentences.length > 2) {
              fallbackSummary +=
                ". " + sentences[Math.floor(sentences.length / 2)].trim() + ".";
            }
            return fallbackSummary;
          } else {
            return words.slice(0, 15).join(" ") + "...";
          }
        }

        return summary;
      }
    },
  });
}
