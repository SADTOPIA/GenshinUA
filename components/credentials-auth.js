"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import styles from "../app/auth-form/auth-form.module.css";

export default function CredentialsAuth() {
  const searchParams = useSearchParams();
  const formMode = searchParams?.get("mode") || "signup";
  const router = useRouter();
  const [error, setError] = useState(null);

  async function handleFormSubmit(event) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const credentials = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      mode: formMode,
    };

    try {
      const result = await signIn("credentials", {
        ...credentials,
        redirect: false,
      });

      if (result.error) {
        setError(result.error);
      } else {
        router.push("/team-builder");
      }
    } catch (e) {
      setError("Something went wrong");
    }
  }

  return (
    <div className="background">
      <form className={styles.authForm} onSubmit={handleFormSubmit}>
        <h1>{formMode === "signup" ? "Signup" : "Login"}</h1>

        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Enter your name" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit">{formMode === "login" ? "Login" : "Create Account"}</button>

        <p>
          {formMode === "signup" ? (
            <Link href="/auth-form?mode=login">Login with existing account</Link>
          ) : (
            <Link href="/auth-form?mode=signup">Create an account</Link>
          )}
        </p>
      </form>
    </div>
  );
}
