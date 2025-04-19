import { getCurrentUser } from "@/actions/user";
import { prisma } from "@/lib/prisma";

export const createPost = async (body: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return Response.json("Unauthorize", { status: 401 });
  }

  const postData = {
    userId: currentUser.id,
    body: body
  }

  const post = prisma.post.create({
    data: postData
  })

  return post;
}
