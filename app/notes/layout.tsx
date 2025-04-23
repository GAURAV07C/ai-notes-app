"use client";

import type React from "react";

import { usePathname } from "next/navigation";

import { useEffect } from "react";

import { Suspense } from "react";

import { useNavStore } from "@/store/NavStore";
import NavBa from "@/components/notes/nav-bar";
import Sidebar from "@/components/notes/side-bar";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { sidebarOpen, isMobile, setSidebarOpen, setIsMobile } = useNavStore();

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, [setIsMobile, setSidebarOpen]);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [pathname, isMobile, setSidebarOpen]);

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950">
      {/* Top navbar */}
      <NavBa />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}

        <Sidebar />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-950 h-[calc(100vh-3.5rem)] py-10">
          {/* Overlay for mobile when sidebar is open */}
          {isMobile && sidebarOpen && (
            <div
              className="fixed inset-0 z-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}
