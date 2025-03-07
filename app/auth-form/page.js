"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {handleSubmit} from "@/lib/auth";
import Link from "next/link";
import styles from "./auth-form.module.css";

export default function AuthForm() {
  const searchParams = useSearchParams();
  const formMode = searchParams?.get("mode") || "signup";
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session) {
      router.push("/team-builder");
    }
  }, [session, router]);

  return (
    <div className="background">
      <form className={styles.authForm} onSubmit={(event) => handleSubmit(event, formMode, setError, router)}>
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
