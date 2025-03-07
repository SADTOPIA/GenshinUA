import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("Authorize called with:", credentials);

        try {
          const res = await fetch("http://localhost:8000/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: credentials.name,
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            throw new Error("Invalid credentials");
          }

          const user = await res.json();
          console.log("Login successful:", user);

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            image: user.avatar || null,
          };
        } catch (error) {
          console.error("Login error:", error.message);
          throw new Error("Login failed");
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    }
  },
  pages: {
    signIn: "/auth-form?mode=login"
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
