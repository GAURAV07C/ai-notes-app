"use client";

import {  useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";

export default function NewNotePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleSummarize = async () => {
    if (!content.trim()) {
      return;
    }

    setIsSummarizing(true);

    // Simulate generating summary
    setTimeout(() => {
      setSummary("Generated summary goes here.");
      setIsSummarizing(false);
    }, 1000);
  };

  const handleSave = () => {
    if (!title.trim()) {
      return;
    }

    if (!content.trim()) {
      return;
    }

    // Simulate saving note
    setTimeout(() => {
      toast.success("Note created successfully");
      setTitle("");
      setContent("");
      setSummary("");
      setIsSummarizing(false);
      router.push("/notes");
    }, 1000);
  };

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
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!title.trim() || !content.trim()}
          >
            {isSummarizing ? (
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
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                AI SUMMARY
              </h3>
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
  );
}
