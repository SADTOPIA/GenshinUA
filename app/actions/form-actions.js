"use server";

import { signIn } from "@/auth";

export async function doGoogleLogin(formData) {
  const action = formData.get("action");
  if (!action) throw new Error("Missing action parameter");

  await signIn(action, { redirectTo: "/team-builder" });
}

export async function doCredentialsLogin(credentials) {
  try {
    const response = await fetch("http://localhost:8000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Failed to authenticate user");
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function doCredentialsSignup(credentials) {
  try {
    const response = await fetch("http://localhost:8000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
}
