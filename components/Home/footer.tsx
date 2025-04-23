import Link from 'next/link';
import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t py-8 bg-white dark:bg-gray-950">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-lg">NoteAI</span>
        </div>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          © 2024 NoteAI. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link
            href="#"
            className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer
