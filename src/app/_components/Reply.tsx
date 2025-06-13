import Link from "next/link";
import { FaUser } from "react-icons/fa"
import formatDate from "@/utils/formatdate";
import { Reply as PrismaReply, User } from "@prisma/client";
import Image from "next/image";

interface ReplyType extends PrismaReply {
  user: User
}

export default function Reply({ reply }: { reply: PrismaReply }) {
  const image = (reply as ReplyType).user.image;
  const username = (reply as ReplyType).user.username;

  return <div key={reply.id} className="flex gap-3 border-s border-zinc-700 p-2">
    <div>
      <Link href={'/profile/' + username} className="flex justify-center items-center bg-zinc-800 rounded-full w-10 h-10 border border-zinc-700 overflow-hidden">
        {image ?
          <Image src={image} width={500} height={500} alt="Profile Picture" className="h-full w-full object-cover" /> :
          <FaUser className="text-2xl" />
        }
      </Link>
    </div>
    <div>
      <div>
        <div className="bg-zinc-800 py-2 px-3 rounded-xl mb-1">
          <div className="flex items-center gap-2">
            <Link href={'/profile/' + username}>
              <h5 className="font-medium">{username}</h5>
            </Link>
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
