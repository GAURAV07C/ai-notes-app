import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Search,  } from "lucide-react";
const HeroSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="inline-block rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-sm text-gray-800 dark:text-gray-200 mb-2">
            Introducing NoteAI
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-3xl">
            Your notes, <span className="text-primary">supercharged</span> with
            AI
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
            Create, organize, and summarize your notes with the power of
            artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link href="/login">
              <Button size="lg" className="gap-1.5">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline">
                Learn more
              </Button>
            </Link>
          </div>
        </div>

        {/* App Preview */}
        <div className="relative mx-auto max-w-5xl rounded-xl border bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
          <div className="flex h-12 items-center border-b px-4">
            <div className="flex space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <div className="mx-auto flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4" />
              <span>NoteAI - Smart Note Taking</span>
            </div>
          </div>
          <div className="flex">
            <div className="hidden md:block w-64 border-r p-4 h-[400px]">
              <div className="flex items-center gap-2 mb-4">
                <Search className="h-4 w-4 text-gray-500" />
                <div className="h-8 w-full rounded-md bg-gray-100 dark:bg-gray-800"></div>
              </div>
              <div className="space-y-2">
                <div className="h-8 w-full rounded-md bg-gray-100 dark:bg-gray-800"></div>
                <div className="h-8 w-full rounded-md bg-gray-100 dark:bg-gray-800"></div>
                <div className="h-8 w-full rounded-md bg-primary/10"></div>
                <div className="h-8 w-full rounded-md bg-gray-100 dark:bg-gray-800"></div>
                <div className="h-8 w-full rounded-md bg-gray-100 dark:bg-gray-800"></div>
              </div>
            </div>
            <div className="flex-1 p-6 h-[400px] overflow-hidden">
              <div className="mb-6">
                <div className="h-8 w-3/4 rounded-md bg-gray-100 dark:bg-gray-800 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-gray-100 dark:bg-gray-800"></div>
                  <div className="h-4 w-full rounded bg-gray-100 dark:bg-gray-800"></div>
                  <div className="h-4 w-5/6 rounded bg-gray-100 dark:bg-gray-800"></div>
                </div>
              </div>
              <div className="mb-6">
                <div className="h-6 w-1/4 rounded-md bg-gray-100 dark:bg-gray-800 mb-2"></div>
                <div className="p-3 rounded-md bg-primary/10 border border-primary/20">
                  <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700 mb-1"></div>
                  <div className="h-4 w-4/5 rounded bg-gray-200 dark:bg-gray-700"></div>
                </div>
              </div>
              <div>
                <div className="h-6 w-1/4 rounded-md bg-gray-100 dark:bg-gray-800 mb-2"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-gray-100 dark:bg-gray-800"></div>
                  <div className="h-4 w-full rounded bg-gray-100 dark:bg-gray-800"></div>
                  <div className="h-4 w-4/5 rounded bg-gray-100 dark:bg-gray-800"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
