"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Note } from "@/lib/data";
import { Edit, Trash2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

interface NoteCardProps {
  note: Note;
  onDelete: () => void;
  onEdit: () => void;
}

export function NoteCard({ note, onDelete, onEdit }: NoteCardProps) {
  const router = useRouter();

  // Format date safely for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Unknown date";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Truncate text for preview
  const truncate = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const handleView = () => {
    router.push(`/notes/${note.id}/view`);
  };

  return (
    <Card
      className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={handleView}
    >
      <CardHeader className="pb-2 border-b">
        <CardTitle className="line-clamp-1 text-lg">{note.title}</CardTitle>
        <CardDescription>{formatDate(note.updatedAt)}</CardDescription>
      </CardHeader>

      <CardContent className="flex-grow py-4">
        <div className="space-y-2">
          <p className="text-sm line-clamp-3">{truncate(note.content, 150)}</p>

          {note.summary && (
            <div className="mt-3 pt-3 border-t">
              <p className="text-xs text-gray-500 mb-1">AI SUMMARY</p>
              <p className="text-xs line-clamp-2 text-gray-600 dark:text-gray-400">
                {truncate(note.summary, 100)}
              </p>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter
        className="flex justify-between pt-2 border-t bg-gray-50 dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleView}>
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                note.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={onDelete}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
