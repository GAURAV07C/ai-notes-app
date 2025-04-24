"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

import { type Note} from "./data";
import { generateSummary } from "./gen_ai"; 

// Simulate API delay

export const getNotes = async () => {
  // Get the authenticated user
  const { data: user, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User not authenticated");
  }

  // Fetch notes for the authenticated user
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.user.id) // Use user ID from authentication
    .order("created_at", { ascending: false }); // Use created_at instead of createdAt

  if (error) {
    console.error("Error fetching notes:", error.message);
    throw error;
  }

  return data;
};

// Get all notes for the authenticated user
export function useNotes() {
  return useQuery({
    queryKey: ["notes"],
    queryFn: getNotes, // No need to pass userId now
  });
}

// Get a single note by ID
export function useNote(id: string) {
  return useQuery({
    queryKey: ["notes", id],
    queryFn: async () => {
      // Get the authenticated user
      const { data: user, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("User not authenticated");
      }

      const userId = user?.user.id; // Extract user ID from the user object

      if (!userId) {
        throw new Error("User ID is missing");
      }

      // Fetch the note for the authenticated user
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("id", id)
        .eq("user_id", userId)
        .single(); // Fetch a single note

      if (error || !data) {
        throw new Error(`Note with ID ${id} not found`);
      }

      // Ensure that date fields are valid
      const validCreatedAt = new Date(data.created_at);
      const validUpdatedAt = new Date(data.updated_at);

      if (isNaN(validCreatedAt.getTime()) || isNaN(validUpdatedAt.getTime())) {
        throw new Error("Invalid date format");
      }

      // Add validated dates to the note data
      data.created_at = validCreatedAt;
      data.updated_at = validUpdatedAt;

      return data; // Return the fetched note data
    },
    retry: 2, // Retry 2 times before failing
  });
}
// Create a new note

export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      newNote: Omit<Note, "user_id" | "id" | "created_at" | "updated_at">
    ) => {
      // Get the authenticated user
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        throw new Error("User not authenticated");
      }

      // Ensure that user is valid
      const userId = data.user.id;
      if (!userId) {
        throw new Error("User ID not found");
      }

      // Insert the new note with the user ID
      const { data: insertData, error: insertError } = await supabase
        .from("notes")
        .insert([
          {
            title: newNote.title,
            content: newNote.content,
            summary: newNote.summary,
            user_id: userId, // Ensure user ID is valid
            created_at: newNote.createdAt,
            updated_at: newNote.updatedAt,
          },
        ])
        .single(); // Insert and get the response for a single note

      if (insertError) {
        throw new Error(insertError.message); // Handle any errors from Supabase
      }

      return insertData; // Return the created note
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["notes"], (oldData: Note[] = []) => {
        return [data, ...oldData]; // Update the cache with the new note
      });
    },
  });
}

// Update an existing note
export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedNote: Partial<Note> & { id: string }) => {
      const { error, data } = await supabase
        .from("notes")
        .update({
          title: updatedNote.title,
          content: updatedNote.content,
          summary: updatedNote.summary,
          updated_at: new Date().toISOString(),
        })
        .eq("id", updatedNote.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.setQueryData(["notes", data.id], data);
    },
  });
}
// Delete a note
export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data: user, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase
        .from("notes")
        .delete()
        .eq("id", id)
        .eq("user_id", user.user.id);

      if (error) {
        throw new Error(error.message);
      }

      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.removeQueries({ queryKey: ["notes", id] });
    },
  });
}



// Ye function Gemini API ko call karega
// Generate AI summary (real implementation)
export function useGenerateSummary() {
  return useMutation({
    mutationFn: async (content: string) => {
      const words = content.split(" ");

      // Agar content me 10 words ya usse kam hain to wahi return
      if (words.length <= 10) {
        return content;
      } else {
        const summary = await generateSummary(content); // await yahan

        // Safety: agar response empty aaye to fallback logic
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
