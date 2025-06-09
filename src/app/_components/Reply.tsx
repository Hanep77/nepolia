import Link from "next/link";
import { FaUser } from "react-icons/fa"
import formatDate from "@/utils/formatdate";
import { Reply as PrismaReply, User } from "@prisma/client";

interface ReplyType extends PrismaReply {
  user: User
}

export default function Reply({ reply }: { reply: PrismaReply }) {
  return <div key={reply.id} className="flex gap-3 border-s border-zinc-700 p-2">
    <div>
      <Link href={'/users/'} className="flex justify-center items-center bg-zinc-800 rounded-full w-10 h-10 border border-zinc-700">
        <FaUser className="text-2xl" /></Link>
    </div>
    <div>
      <div>
        <div className="bg-zinc-800 py-2 px-3 rounded-xl mb-1">
          <div className="flex items-center gap-2">
            <h5 className="font-medium">{(reply as ReplyType).user.username}</h5>
          </div>
          <div dangerouslySetInnerHTML={{ __html: reply.body }}></div>
        </div>
        <div className="flex gap-2">
          <span className="text-sm text-zinc-500">{formatDate(reply.createdAt)}</span>
        </div>
      </div>
    </div>
  </div>
}
