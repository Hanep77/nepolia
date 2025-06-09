import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "./user";

export const createReply = async (body: string, commentId: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return Response.json("Unauthorize", { status: 401 });
  }

  const replyData = {
    userId: currentUser.id,
    commentId: commentId,
    body: body
  }

  const reply = prisma.reply.create({
    data: replyData,
    omit: {
      userId: true
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true
        }
      }
    }
  })

  return reply;
}
