import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function isAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return false;
  }

  return session.user.email === process.env.ADMIN_EMAIL;
}
