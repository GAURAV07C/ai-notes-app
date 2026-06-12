"use server";

import { encodedRedirect } from "@/utils/utils";
import { createUserWithPassword } from "@/lib/auth-options";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/signup",
      "Email and password are required",
    );
  }

  try {
    await createUserWithPassword(email, password);
  } catch (error) {
    return encodedRedirect(
      "error",
      "/signup",
      error instanceof Error ? error.message : "Failed to create account",
    );
  }

  return encodedRedirect(
    "success",
    "/login",
    "Account created. You can now log in.",
  );
};
