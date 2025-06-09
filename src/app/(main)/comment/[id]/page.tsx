import { getComment } from "@/actions/comment";
import Replies from "@/app/_components/replies";
import formatDate from "@/utils/formatdate";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export default async function Comment({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const comment = await getComment(id);

  if (!comment) {
    return <div>404</div>
  }

  return <div className="p-4 border-b border-zinc-700">
    <div className="flex gap-3 mb-4">
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
          <span className="text-sm text-zinc-500">{formatDate(comment.createdAt)}</span>
        </div>
      </div>
    </div>
    <Replies commentId={comment.id} repliesData={comment.Reply} />
  </div>
}
