import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "./user";

export const toggleLike = async (postId: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return Response.json("Unauthorize", { status: 401 });
  }

  const liked = await prisma.like.findFirst({
    where: {
      postId: postId,
      AND: {
        userId: currentUser.id
      }
    },
  })

  if (liked) {
    const deleted = prisma.like.deleteMany({
      where: {
        postId: postId,
        AND: {
          userId: currentUser.id
        }
      },
    })
    console.log(deleted);
    return deleted;
  }

  const likeData = {
    userId: currentUser.id,
    postId: postId
  }

  const like = prisma.like.create({
    data: likeData,
  })

  return like;
}

export const getLikes = async () => {
  const currentUser = await getCurrentUser();

  return await prisma.like.findMany({
    omit: {
      userId: true
    },
    where: {
      userId: currentUser?.id
    }
  })
}
