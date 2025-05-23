"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useCreateNote, useGenerateSummary } from "@/lib/api"
import { ArrowLeft, Loader2, Sparkles } from "lucide-react"
import { toast } from "sonner"

export default function NewNotePage() {
  const router = useRouter()

  const createNote = useCreateNote()
  const generateSummary = useGenerateSummary()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [summary, setSummary] = useState("")
  const [isSummarizing, setIsSummarizing] = useState(false)

  

  const handleSummarize = async () => {
    if (!content.trim()) {
      toast("")
      return
    }

    setIsSummarizing(true)

    generateSummary.mutate(content, {
      onSuccess: (generatedSummary) => {
        setSummary(generatedSummary)
        toast("Summary generated successfully")
      },
      onError: () => {
        toast("Failed to generate summary")
      },
      onSettled: () => {
        setIsSummarizing(false)
      },
    })
  }

const handleSave = () => {
  if (!title.trim()) {
    toast("Please enter a title.");
    return;
  }

  if (!content.trim()) {
    toast("Please enter some content.");
    return;
  }

  createNote.mutate(
    {
      title,
      content,
      summary: summary || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      onSuccess: () => {
        toast("Note created successfully!");
        router.push("/notes"); // Redirect to the notes page
      },
      onError: (error) => {
        console.error("Error creating note:", error); // Log the error
        toast("Failed to create note. Please try again.");
      },
    }
  );
};
  return (
    <div className="flex-1 overflow-auto py-10">
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-950 border-b">
        <Button variant="ghost" size="sm" onClick={() => router.push("/notes")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSummarize}
            disabled={isSummarizing || !content.trim()}
            className="gap-1"
          >
            {isSummarizing ? (
              <>
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                Summarizing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-1" />
                Summarize
              </>
            )}
          </Button>
          <Button size="sm" onClick={handleSave} disabled={createNote.isPending || !title.trim() || !content.trim()}>
            {createNote.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-6">
        <Input
          type="text"
          placeholder="Untitled"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-3xl font-bold border-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0 mb-6"
        />

        {summary && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">AI SUMMARY</h3>
              <p className="text-sm">{summary}</p>
            </CardContent>
          </Card>
        )}

        <Textarea
          placeholder="Start writing your note here..."
          className="min-h-[60vh] resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  )
}
