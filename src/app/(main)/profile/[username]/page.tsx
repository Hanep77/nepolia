import { getUserProfile } from "@/actions/user";
import DisplayPosts from "@/app/_components/displayPosts";
import Link from "next/link";

export default async function Profile({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const user = await getUserProfile(username);

  if (!user) {
    return <div className="min-h-[calc(100vh-65px)] flex justify-center items-center">not found</div>
  }

  return <div>
    <div className="bg-gradient-to-r from-violet-800 to-violet-700 flex flex-col items-center py-8 rounded-b-3xl">
      <div className="bg-zinc-300 w-16 h-16 rounded-full flex justify-center items-center text-3xl font-medium text-violet-800 mb-4">H</div>
      <p className="text-violet-300">@{user.username}</p>
      <h5 className="text-lg font-medium">{user.name}</h5>
    </div>
    <div className="flex justify-between p-4">
      <div className="flex flex-col">
        <div className="flex gap-4 text-center">
          <div>
            <p>312</p>
            <p className="text-zinc-400">Followers</p>
          </div>
          <div>
            <p>30</p>
            <p className="text-zinc-400">Following</p>
          </div>
          <div>
            <p>{user._count.Post}</p>
            <p className="text-zinc-400">Posts</p>
          </div>
        </div>
        <div className="mt-4">
          <p>lorem ipsum dolor sit amet lorem ipsum lorem ipsum lorem ipsum</p>
        </div>
      </div>
      <div>
        <div className="grid gap-2 px-4 mt-4 justify-end">
          <button className="bg-zinc-800 hover:bg-zinc-800/75 active:hover:bg-zinc-800/50 border border-zinc-700 h-8 w-28 rounded flex items-center justify-center cursor-pointer">follow</button>
          <Link href={`/messages/${username}`} className="bg-zinc-800 border border-zinc-700 hover:bg-zinc-800/75 active:hover:bg-zinc-800/50 h-8 w-28 rounded flex items-center justify-center">message</Link>
        </div>
      </div>
    </div>
    <div className="border-t border-zinc-700">
      <DisplayPosts posts={user.Post} />
    </div>
  </div>
}
