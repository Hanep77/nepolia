import Link from "next/link";
import { FaUser } from "react-icons/fa"
import { CommentType } from "../(main)/posts/page";

export default function Comment({ comment }: { comment: CommentType }) {
  return <div key={comment.id} className="flex gap-3 border-b border-zinc-700 py-2">
    <div>
      <Link href={'/users/'} className="flex justify-center items-center bg-zinc-800 rounded-full w-10 h-10 border border-zinc-700">
        <FaUser className="text-2xl" /></Link>
    </div>
    <div>
      <div>
        <div className="flex items-center gap-2">
          <h5 className="font-medium">{comment.user.username}</h5>
          <span className="text-sm text-zinc-500">- 2 days ago</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: comment.body }}></div>
      </div>
    </div>
  </div>

}
