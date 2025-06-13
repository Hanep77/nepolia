import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "./user"


// it takes conversation by userId or create it if it's not existed yet
export const getConversation = async (userId: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Unauthorize");
  }

  const existingConversation = await prisma.conversation.findFirst({
    where: {
      AND: [
        {
          users: { some: { userId: currentUser.id } }
        },
        {
          users: { some: { userId: userId } }
        }
      ]
    },
    include: {
      messages: true
    }
  })

  if (existingConversation) {
    return existingConversation;
  }

  const newConversation = await prisma.conversation.create({
    data: {
      isGroup: false,
      users: {
        create: [
          { User: { connect: { id: currentUser.id } } },
          { User: { connect: { id: userId } } }
        ]
      }
    },
    include: {
      messages: true
    }
  });

  return newConversation;
}

// it takes all existedConversation
export const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.username) {
    throw new Error("Unauthorize");
  }

  const conversations = prisma.conversation.findMany({
    where: {
      AND: [
        {
          users: {
            some: {
              userId: currentUser.id,
            }
          },
        },
        {
          users: {
            some: {
              User: { username: { contains: currentUser.username, mode: "insensitive" } }
            }
          }
        }
      ]
    },
    include: {
      users: {
        where: {
          NOT: {
            userId: currentUser.id
          }
        },
        select: {
          userId: true,
          User: {
            select: {
              name: true,
              username: true,
              image: true
            }
          }
        }
      },
      messages: {
        orderBy: {
          createdAt: "desc"
        },
        take: 1
      }
    },
    orderBy: {
      lastMessageAt: "desc"
    }
  });

  return conversations;
}
