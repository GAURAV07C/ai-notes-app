"use client";

import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useNote } from "@/lib/api";
import { ArrowLeft, Edit, Loader2 } from "lucide-react";

export default function ViewNotePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>(); // ✅ get id from useParams
  const { data: note, isLoading } = useNote(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-bold mb-2">Note not found</h2>
        <p className="text-gray-500 mb-4">
          The note you&apos;re looking for doesn&apos;t exist or has been
          deleted.
        </p>
        <Button onClick={() => router.push("/notes")}>Back to Notes</Button>
      </div>
    );
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Invalid date"; // Handle missing or invalid date

    const date = new Date(dateString);

    // Check if it's a valid date
    if (isNaN(date.getTime())) {
      return "Invalid date"; // If invalid date
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };
console.log(note);
  return (
    <div className="flex-1 overflow-auto max-w-4xl mx-auto py-10">
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-950 border-b">
        <Button variant="ghost" size="sm" onClick={() => router.push("/notes")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="text-sm text-gray-500">
          Last edited on {formatDate(note.updatedAt) || "Unknown date"}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/notes/${id}`)}
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
      </div>

      <div className="px-8 py-6">
        <h1 className="text-3xl font-bold mb-6">{note.title}</h1>

        {note.summary && (
          <div className="mb-8 p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              AI SUMMARY
            </h3>
            <p className="text-sm">{note.summary}</p>
          </div>
        )}

        <div className="prose dark:prose-invert max-w-none">
            {note.content.split("\n").map((paragraph: string, i: number) =>
            paragraph.trim() ? (
              <p key={i} className="mb-4">
              {paragraph}
              </p>
            ) : (
              <br key={i} />
            )
            )}
        </div>
      </div>
    </div>
  );
}
