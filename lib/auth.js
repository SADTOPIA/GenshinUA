import { signIn } from "next-auth/react";

export async function handleSubmit(event, formMode, setError, router) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (formMode === "signup") {
    const res = await fetch("http://localhost:8000/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      return;
    }

    await signIn("credentials", { redirect: false, name, email, password });
    router.push("/team-builder");
  } else {
    const result = await signIn("credentials", {
      redirect: false,
      name,
      email,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/team-builder");
    }
  }
}
