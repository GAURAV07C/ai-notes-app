"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Menu, X, FileText, Plus, Search, Moon, Sun, Home, ChevronDown, Settings, User } from "lucide-react"
import { useState, useEffect } from "react"
import { useNotes } from "@/lib/api"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Suspense } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  const { data: notes } = useNotes()
  const { theme, setTheme } = useTheme()

  // Handle responsive sidebar
  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    checkSize()
    window.addEventListener("resize", checkSize)
    return () => window.removeEventListener("resize", checkSize)
  }, [])

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [pathname, isMobile])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950">
      {/* Top navbar */}
      <header className="border-b flex h-14 items-center px-4 lg:px-6 bg-white dark:bg-gray-950 z-10">
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2">
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        <Link href="/notes" className="flex items-center gap-2 font-semibold">
          <span className="text-xl">NoteAI</span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-gray-100 dark:bg-gray-800">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href="/">
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={cn(
            "w-64 border-r bg-white dark:bg-gray-950 transition-all duration-300 ease-in-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
            isMobile && sidebarOpen ? "absolute z-10 h-[calc(100%-3.5rem)] mt-14" : "relative",
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
                    pathname === "/notes" && "bg-gray-100 dark:bg-gray-800 font-medium",
                  )}
                >
                  <Home className="h-4 w-4 mr-2" />
                  All Notes
                </Button>
              </Link>
            </div>

            <div className="px-3 py-2">
              <div className="flex items-center justify-between px-2 mb-2">
                <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">RECENT NOTES</h3>
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
                          pathname === `/notes/${note.id}/view` && "bg-gray-100 dark:bg-gray-800 font-medium",
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

        {/* Main content */}
        <main className="flex-1 overflow-hidden bg-white dark:bg-gray-950">
          {/* Overlay for mobile when sidebar is open */}
          {isMobile && sidebarOpen && (
            <div className="fixed inset-0 z-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          )}
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </div>
  )
}
