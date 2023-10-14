import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    // NOTICE: We are using the session user as our user and not fetching every time from the DB
    if (!session?.user?.email) {
      return null;
    }

    return session.user;
  } catch (error: any) {
    return null;
  }
}
