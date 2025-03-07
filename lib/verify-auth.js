"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function verifyAuth() {
  const session = await getServerSession(authOptions);

  return {
    user: session?.user || null,
    session,
  };
}
