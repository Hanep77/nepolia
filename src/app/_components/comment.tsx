import Link from "next/link";
import { FaUser } from "react-icons/fa"
import { CommentType } from "../(main)/posts/page";
import formatDate from "@/utils/formatdate";
import Image from "next/image";

export default function Comment({ comment }: { comment: CommentType }) {
  return <div key={comment.id} className="flex gap-3 border-b border-zinc-700 py-2">
    <div>
      <Link href={'/profile/' + comment.user.username} className="flex justify-center items-center bg-zinc-800 rounded-full w-10 h-10 border border-zinc-700 overflow-hidden">
        {comment.user.image ?
          <Image src={comment.user.image} width={500} height={500} alt="Profile Picture" className="h-full w-full object-cover" /> : <FaUser className="text-2xl" />
        }
      </Link>
    </div>
    <div>
      <div>
        <div className="bg-zinc-800 py-2 px-3 rounded-xl mb-1">
          <div className="flex items-center gap-2">
            <Link href={'/profile/' + comment.user.username}>
              <h5 className="font-medium">{comment.user.username}</h5>
            </Link>
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
