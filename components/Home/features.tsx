
import { FileText, Search, Sparkles } from "lucide-react";
const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-2">
            Features
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Everything you need for better notes
          </h2>
          <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
            Powerful features to help you capture, organize, and understand your
            ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Organization</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Keep your notes organized with a clean, intuitive interface
              inspired by the best document editors.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI Summaries</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Get instant AI-powered summaries of your notes to quickly grasp
              the key points of any document.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Powerful Search</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Find exactly what you&apos;re looking for with our powerful search
              functionality across all your notes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection
