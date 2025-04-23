import Link from "next/link";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  return (
   
      <header className="border-b bg-white dark:bg-gray-950 sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-xl">NoteAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
   
  );
};

export default NavBar;
