import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import LoginWithGoogle from "@/components/Home/login-google";
import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Link
          href="/"
          className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2 font-semibold"
        >
          <span className="text-lg">NoteAI</span>
        </Link>

        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
              <CardDescription className="text-center">
                Create an account to get started
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
              <LoginWithGoogle />
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <form className="">
                <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    required
                  />
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    autoCapitalize="none"
                    autoComplete="new-password"
                    required
                  />
                  <SubmitButton
                    formAction={signUpAction}
                    pendingText="Signing up..."
                  >
                    Sign up
                  </SubmitButton>
                  <FormMessage message={searchParams} />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
