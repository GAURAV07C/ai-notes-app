"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useNotes, useDeleteNote } from "@/lib/api"
import { NoteCard } from "@/components/notes/note-card"
import { Loader2, Plus, Grid2X2, List } from "lucide-react"
import { toast } from "sonner"


export default function NotesPage() {
  const router = useRouter()
  
  const { data: notes, isLoading, refetch } = useNotes()
  const deleteNote = useDeleteNote()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote.mutateAsync(id)
      toast("Note deleted successfully")
      refetch() // Refresh the notes list after deletion
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Failed to delete note")
    }
  }

  const filteredNotes =
    notes?.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || []

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">All Notes</h1>
          <p className="text-gray-500 mt-1">{notes?.length || 0} notes available</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-md overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 rounded-none ${viewMode === "grid" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 rounded-none ${viewMode === "list" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Link href="/notes/new">
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              New Note
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Filter notes..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-1">No notes found</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery ? "No notes match your search query" : "Get started by creating your first note"}
          </p>
          {!searchQuery && (
            <Link href="/notes/new">
              <Button>Create Note</Button>
            </Link>
          )}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={() => handleDeleteNote(note.id)}
              onEdit={() => router.push(`/notes/${note.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2 border rounded-lg overflow-hidden">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-900 border-b last:border-b-0"
            >
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => router.push(`/notes/${note.id}/view`)}>
                <h3 className="font-medium truncate">{note.title}</h3>
                <p className="text-sm text-gray-500 truncate">{note.content.substring(0, 100)}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button variant="ghost" size="sm" onClick={() => router.push(`/notes/${note.id}/view`)}>
                  View
                </Button>
                <Button variant="ghost" size="sm" onClick={() => router.push(`/notes/${note.id}`)}>
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
