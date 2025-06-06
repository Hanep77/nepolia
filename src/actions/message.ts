import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "./user"

export const createMessage = async (message: string, conversationId: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Unauthorize");
  }

  const createdMessage = await prisma.message.create({
    data: {
      senderId: currentUser.id,
      body: message,
      conversationId: conversationId
    }
  })

  return createdMessage;
}
