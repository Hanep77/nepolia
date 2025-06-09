import Link from "next/link";
import { FaUser } from "react-icons/fa"
import { CommentType } from "../(main)/posts/page";
import formatDate from "@/utils/formatdate";

export default function Comment({ comment }: { comment: CommentType }) {
  return <div key={comment.id} className="flex gap-3 border-b border-zinc-700 py-2">
    <div>
      <Link href={'/users/'} className="flex justify-center items-center bg-zinc-800 rounded-full w-10 h-10 border border-zinc-700">
        <FaUser className="text-2xl" /></Link>
    </div>
    <div>
      <div>
        <div className="bg-zinc-800 py-2 px-3 rounded-xl mb-1">
          <div className="flex items-center gap-2">
            <h5 className="font-medium">{comment.user.username}</h5>
          </div>
          <div dangerouslySetInnerHTML={{ __html: comment.body }}></div>
        </div>
        <div className="flex gap-2">
          <span className="text-sm text-zinc-500">{formatDate(comment.createdAt)}</span>
          <Link href={"/comment/" + comment.id} className="text-sm text-violet-400 hover:text-violet-400/90 active:text-violet-400/80">
            reply {comment._count.Reply > 0 && <span>({comment._count.Reply})</span>}
          </Link>
        </div>
      </div>
    </div>
  </div>

}
