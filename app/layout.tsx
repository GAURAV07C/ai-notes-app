import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { QueryClientProvider } from "@/components/query-client-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NoteAI - AI-Powered Notes App",
  description:
    "Create, organize, and summarize your notes with the power of AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider>
            <main>{children}</main>
            <Toaster />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
