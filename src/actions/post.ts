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
    data: postData,
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
    },
  })

  return post;
}

export const getPosts = () => {
  const posts = prisma.post.findMany({
    take: 10,
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
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return posts;
}

export const getPost = (id: string) => {
  const post = prisma.post.findUnique({
    where: {
      id: id
    },
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
      Comment: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true
            }
          }
        }
      }
    },
  });

  return post;
}
