import { useNavStore } from "@/store/NavStore";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {  Menu, Moon, Sun, User, X } from "lucide-react";
import { useTheme } from "next-themes";
import Logout from "./logout";

const NavBa = () => {
  const { theme, setTheme } = useTheme();
  const { sidebarOpen, setSidebarOpen } = useNavStore();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <header className="fixed top-0 left-0 right-0 border-b flex h-14 items-center px-4 lg:px-6 bg-white dark:bg-gray-950 z-20">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="mr-2"
      >
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
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 bg-gray-100 dark:bg-gray-800"
            >
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
          
            <DropdownMenuSeparator />
           
              <DropdownMenuItem>
                <Logout />
              </DropdownMenuItem>
         
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default NavBa;
