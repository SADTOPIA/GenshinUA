"use server";

import {auth} from "@/auth";

export async function verifyAuth() {
  const session = await auth();

  return {
    user: session?.user || null,
    session,
  };
}
