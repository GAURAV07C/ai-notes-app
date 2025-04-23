import Link from 'next/link';

import { Button } from "@/components/ui/button";
const CtaSection = () => {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Ready to supercharge your notes?
          </h2>
          <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
            Join thousands of users who are already using NoteAI to improve
            their productivity.
          </p>
          <Link href="/signup">
            <Button size="lg" className="mt-2">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CtaSection
