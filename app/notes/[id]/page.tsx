"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useNote, useUpdateNote, useGenerateSummary } from "@/lib/api"
import { ArrowLeft, Loader2, Sparkles } from "lucide-react"
import { toast } from "sonner"

export default function EditNotePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  
  const { data: note, isLoading } = useNote(params.id)
  const updateNote = useUpdateNote()
  const generateSummary = useGenerateSummary()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [summary, setSummary] = useState("")
  const [isSummarizing, setIsSummarizing] = useState(false)

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
      setSummary(note.summary)
    }
  }, [note])

  const handleSummarize = async () => {
    if (!content.trim()) {
      toast("Please add some content to summarize.")
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
      toast("Title required")
      return
    }

    if (!content.trim()) {
      toast("Content required")
      return
    }

    updateNote.mutate(
      {
        id: params.id,
        title,
        content,
        summary,
      },
      {
        onSuccess: () => {
          toast("Note updated successfully")
          router.push("/notes")
        },
        onError: () => {
          toast("Failed to update note")
        },
      },
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto">
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
          <Button size="sm" onClick={handleSave} disabled={updateNote.isPending || !title.trim() || !content.trim()}>
            {updateNote.isPending ? (
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
