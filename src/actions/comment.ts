import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "./user";

export const createComment = async (body: string, postId: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return Response.json("Unauthorize", { status: 401 });
  }

  const commentData = {
    userId: currentUser.id,
    postId: postId,
    body: body
  }

  const comment = prisma.comment.create({
    data: commentData,
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
      },
      _count: {
        select: {
          Reply: true
        }
      }
    }
  })

  return comment;
}

export const getComment = async (id: string) => {
  const comment = await prisma.comment.findFirst({
    where: {
      id: id
    },
    include: {
      Reply: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true
            }
          }
        }
      },
      user: {
        select: {
          id: true,
          name: true,
          username: true
        }
      }
    }
  })

  return comment;
}
