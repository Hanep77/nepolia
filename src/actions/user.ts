import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

export const getCurrentUser = async () => {
  const session = await getServerSession();
  const email = session?.user.email;

  const user = await prisma.user.findUnique({
    where: {
      email: email as string
    }
  });

  if (!user) {
    return null;
  }

  return user;
}
