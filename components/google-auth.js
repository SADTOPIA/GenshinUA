"use client";

import { doGoogleLogin } from "@/app/actions/form-actions";
import styles from "../app/auth-form/auth-form.module.css";

export default function GoogleAuth() {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    await doGoogleLogin(formData);
  }

  return (
    <div className="background">
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <input type="hidden" name="action" value="google" />
        <button type="submit">Sign up with Google</button>
      </form>
    </div>
  );
}
