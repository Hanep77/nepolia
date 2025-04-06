import Post from "@/app/_components/post"
import type { PostType } from "../page"
import Link from "next/link"
import { FaUser } from "react-icons/fa"

const data: PostType = {
  id: 1,
  user: {
    id: 1,
    name: "rahasia",
    username: "rahasia"
  },
  total_likes: 200,
  total_comments: 30,
  content: "<p>dummy post</p><p>dummy post 1</p>",
  comments: [
    {
      id: 1,
      user: {
        id: 2,
        name: "test",
        username: "test"
      },
      content: "<p>this is comment</p>"
    },
    {
      id: 2,
      user: {
        id: 2,
        name: "test",
        username: "test"
      },
      content: "<p>this is comment</p>"
    },
    {
      id: 3,
      user: {
        id: 2,
        name: "test",
        username: "test"
      },
      content: "<p>this is comment</p>"
    }
  ]
}

export default function PostDetail() {
  return <div className="min-h-screen">
    <Post post={data} />
    <div className="border-b border-zinc-700 p-2">
      <form action="">
        <div className="border border-zinc-700 flex rounded-full overflow-hidden">
          <input type="text" id="comment" name="body" placeholder="write comment..."
            className="h-10 outline-none w-full px-4" required autoComplete="off" />
          <button type="submit" className="w-20 bg-zinc-800 hover:bg-blue-600 active:bg-blue-700 text-white">send</button>
        </div>
      </form>
    </div>
    <div className="p-4 flex flex-col gap-2">
      {
        data.comments?.map(comment => {
          return <div key={comment.id} className="flex gap-3">
            <div>
              <Link href={'/users/'} className="flex justify-center items-center bg-zinc-800 rounded-full w-10 h-10 border border-zinc-700">
                <FaUser className="text-2xl" /></Link>
            </div>
            <div>
              <div className="bg-zinc-800 py-2 px-6 rounded-full border border-zinc-700">
                <h5 className="font-medium">{comment.user.username}</h5>
                <p>{comment.content}</p>
              </div>
              <span className="text-sm text-zinc-500">2 days ago</span>
            </div>
          </div>
        })
      }
    </div>
  </div>
}
