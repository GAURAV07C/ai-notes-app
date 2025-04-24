"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner";
import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Icons } from "@/components/icons"

export default function SignupPage() {
  const router = useRouter()
  
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
const supabase = createClient();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast("Signup successful!")
    

    // Simulate signup delay
    setTimeout(() => {
      router.push("/login")
    }, 1000)
  }

   const handleGoogleSignIn = async () => {
     setIsLoading(true);
     setError(null);

     try {
       const { error } = await supabase.auth.signInWithOAuth({
         provider: "google",
         options: {
           redirectTo: `${window.location.origin}/auth/callback`,
         },
       });

       if (error) {
         setError(error.message);
       }
       // eslint-disable-next-line @typescript-eslint/no-unused-vars
     } catch (err) {
       setError("An unexpected error occurred");
     } finally {
       setIsLoading(false);
     }
   };


  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2 font-semibold">
        <span className="text-lg">NoteAI</span>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
            <CardDescription className="text-center">Create an account to get started</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
             <Button
                          variant="outline"
                          type="button"
                          className="w-full"
                          onClick={handleGoogleSignIn}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Icons.google className="mr-2 h-4 w-4" />
                          )}{" "}
                          Google
                        </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-2">
              
                <div className="grid gap-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    required
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="new-password"
                    required
                  />
                </div>
                <Button className="mt-2" type="submit">
                  Create Account
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-center text-gray-500 mt-2">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
