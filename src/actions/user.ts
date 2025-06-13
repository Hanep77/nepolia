import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma"

export const getCurrentUser = async () => {
  const session = await auth();
  const email = session?.user?.email;

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

export const getUserProfile = async (username: string) => {
  const currentUser = await getCurrentUser();

  const user = await prisma.user.findFirst({
    where: {
      username: username
    },
    omit: {
      password: true
    },
    include: {
      Post: {
        omit: {
          userId: true
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true
            }
          },
          Like: {
            where: {
              user: {
                id: currentUser?.id
              }
            }
          },
          _count: {
            select: {
              Like: true,
              Comment: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      },
      _count: {
        select: {
          Post: true,
          Follower: true,
          Following: true
        }
      }
    }
  });

  if (!user) {
    return null;
  }

  return user;
}

export const editProfle = async (data: { name?: string, username?: string, bio?: string }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return Response.json("Unauthorize", { status: 401 });
  }

  const updatedUser = prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: data
  })

  return updatedUser;
}

export const searchUser = async (keyword: string) => {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: { contains: keyword, mode: "insensitive" }
        },
        {
          username: { contains: keyword, mode: "insensitive" }
        }
      ]
    }
  })

  return users;
}
