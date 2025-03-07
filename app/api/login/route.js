export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    console.log("Login attempt:", { name, email, password });

    const res = await fetch("http://localhost:8000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Backend login error:", errorData);
      return Response.json({ error: errorData.detail || "Invalid credentials" }, { status: 401 });
    }

    const user = await res.json();
    console.log("Login successful:", user);

    return Response.json({ success: true, user });
  } catch (error) {
    console.error("Server error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
