"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Search, Home, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavStore } from "@/store/NavStore";
import { useNotes } from "@/lib/api";

const Sidebar = () => {
  const { data: notes } = useNotes();
  const { sidebarOpen, isMobile } = useNavStore();
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "w-64 border-r bg-white dark:bg-gray-950 transition-all duration-300 ease-in-out overflow-y-auto",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        isMobile
          ? sidebarOpen
            ? "fixed top-14 left-0 z-30 h-[calc(100vh-3.5rem)]" // Sidebar shown, overlay on content
            : "hidden" // Sidebar hidden when closed
          : "relative h-[calc(100vh-3.5rem)]" // Desktop view where the sidebar is pushed
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4">
          <Link href="/notes/new">
            <Button className="w-full justify-start">
              <Plus className="h-4 w-4 mr-2" />
              New Note
            </Button>
          </Link>
        </div>

        <div className="px-4 py-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search notes..."
              className="w-full rounded-md border border-input pl-8 pr-2 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        <div className="px-2 py-2">
          <Link href="/notes">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start mb-1 text-gray-700 dark:text-gray-300",
                pathname === "/notes" &&
                  "bg-gray-100 dark:bg-gray-800 font-medium"
              )}
            >
              <Home className="h-4 w-4 mr-2" />
              All Notes
            </Button>
          </Link>
        </div>

        <div className="px-3 py-2">
          <div className="flex items-center justify-between px-2 mb-2">
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">
              RECENT NOTES
            </h3>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
          <ScrollArea className="h-[calc(100vh-220px)]">
            <div className="space-y-1">
              {notes?.slice(0, 20).map((note) => (
                <Link key={note.id} href={`/notes/${note.id}/view`}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-left font-normal text-gray-700 dark:text-gray-300 h-auto py-1.5",
                      pathname === `/notes/${note.id}/view` &&
                        "bg-gray-100 dark:bg-gray-800 font-medium"
                    )}
                  >
                    <FileText className="h-4 w-4 mr-2 shrink-0 text-gray-500" />
                    <span className="truncate">{note.title}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
