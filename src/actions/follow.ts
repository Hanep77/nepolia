import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "./user";

export const toggleFollow = async (userId: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return Response.json("Unauthorize", { status: 401 });
  }

  const followed = await prisma.follow.findFirst({
    where: {
      followerId: userId,
      AND: {
        followingId: currentUser.id
      }
    },
  })

  if (followed) {
    const deleted = prisma.follow.deleteMany({
      where: {
        followerId: userId,
        AND: {
          followingId: currentUser.id
        }
      },
    })
    return deleted;
  }

  const followData = {
    followerId: userId,
    followingId: currentUser.id
  }

  const follow = prisma.follow.create({
    data: followData,
  })

  return follow;
}

export const isFollowed = async (userId: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return Response.json("Unauthorize", { status: 401 });
  }

  const followed = await prisma.follow.findFirst({
    where: {
      followerId: userId,
      AND: {
        followingId: currentUser.id
      }
    },
  })

  return followed;
}

export const getFollowers = async (userId: string) => {
  const followers = await prisma.follow.findMany({
    where: {
      followerId: userId
    },
    omit: {
      followerId: true,
      followingId: true,
    },
    include: {
      following: {
        select: {
          name: true,
          username: true,
          image: true
        }
      }
    }
  })

  return followers;
}

export const getFollowing = async (userId: string) => {
  const following = await prisma.follow.findMany({
    where: {
      followingId: userId
    },
    omit: {
      followerId: true,
      followingId: true,
    },
    include: {
      follower: {
        select: {
          name: true,
          username: true,
          image: true
        }
      }
    }
  })

  return following;
}
