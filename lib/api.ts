"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type Note, dummyNotes } from "./data";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Get all notes
export function useNotes() {
  return useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      await delay(800); // Simulate network delay
      return [...dummyNotes];
    },
  });
}

// Get a single note by ID
export function useNote(id: string) {
  return useQuery({
    queryKey: ["notes", id],
    queryFn: async () => {
      await delay(500); // Simulate network delay
      const note = dummyNotes.find((note) => note.id === id);
      if (!note) throw new Error("Note not found");
      return note;
    },
  });
}

// Create a new note
export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      newNote: Omit<Note, "id" | "createdAt" | "updatedAt">
    ) => {
      await delay(1000); // Simulate network delay

      const note: Note = {
        id: Date.now().toString(),
        ...newNote,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return note;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["notes"], (oldData: Note[] = []) => {
        return [data, ...oldData];
      });
    },
  });
}

// Update an existing note
export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedNote: Partial<Note> & { id: string }) => {
      await delay(1000); // Simulate network delay

      const existingNotes = queryClient.getQueryData<Note[]>(["notes"]) || [];
      const noteIndex = existingNotes.findIndex(
        (note) => note.id === updatedNote.id
      );

      if (noteIndex === -1) throw new Error("Note not found");

      const updatedNoteData: Note = {
        ...existingNotes[noteIndex],
        ...updatedNote,
        updatedAt: new Date().toISOString(),
      };

      return updatedNoteData;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["notes"], (oldData: Note[] = []) => {
        return oldData.map((note) => (note.id === data.id ? data : note));
      });
      queryClient.setQueryData(["notes", data.id], data);
    },
  });
}

// Delete a note
export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await delay(800); // Simulate network delay

      // Get current notes
      const currentNotes = queryClient.getQueryData<Note[]>(["notes"]) || [];

      // Check if note exists
      const noteExists = currentNotes.some((note) => note.id === id);
      if (!noteExists) {
        throw new Error("Note not found");
      }

      return id;
    },
    onSuccess: (id) => {
      // Update notes cache by filtering out the deleted note
      queryClient.setQueryData(["notes"], (oldData: Note[] = []) => {
        return oldData.filter((note) => note.id !== id);
      });

      // Remove the specific note query
      queryClient.removeQueries({ queryKey: ["notes", id] });
    },
  });
}

// Generate AI summary (dummy function)
export function useGenerateSummary() {
  return useMutation({
    mutationFn: async (content: string) => {
      await delay(1500); // Simulate AI processing time

      // Dummy summary generation - in a real app, this would call an AI service
      const words = content.split(" ");
      let summary = "";

      if (words.length <= 10) {
        summary = content;
      } else {
        // Extract some sentences for the dummy summary
        const sentences = content
          .split(/[.!?]+/)
          .filter((s) => s.trim().length > 0);
        if (sentences.length > 0) {
          // Take first sentence and maybe one from the middle if available
          summary = sentences[0].trim();
          if (sentences.length > 2) {
            summary +=
              ". " + sentences[Math.floor(sentences.length / 2)].trim() + ".";
          }
        } else {
          // Fallback to first 15 words if no sentences
          summary = words.slice(0, 15).join(" ") + "...";
        }
      }

      return summary;
    },
  });
}
