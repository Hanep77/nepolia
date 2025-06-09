import { isFollowed } from "@/actions/follow";
import { getCurrentUser, getUserProfile } from "@/actions/user";
import DisplayPosts from "@/app/_components/displayPosts";
import UserProfileInfo from "@/app/_components/userProfileInfo";

export default async function Profile({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const user = await getUserProfile(username);
  const currentUser = await getCurrentUser();

  if (!user || !currentUser) {
    return <div className="min-h-[calc(100vh-65px)] flex justify-center items-center">not found</div>
  }

  const isFollowedVar = await isFollowed(user.id);

  const userInfo = {
    id: user.id,
    name: user.name,
    username: user.username,
    isFollowed: isFollowedVar ? true : false,
    bio: user.bio,
    image: user.image,
    _count: {
      Post: user._count.Post,
      Follower: user._count.Follower,
      Following: user._count.Following,
    }
  }

  return <div>
    <UserProfileInfo currentUser={currentUser} user={userInfo} />
    <div className="border-t border-zinc-700">
      <DisplayPosts posts={user.Post} />
    </div>
  </div>
}
