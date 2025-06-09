"use client";

import { FormEvent, useState } from "react";
import Editor from "./editor";
import axios from "axios";
import { Reply as PrismaReply } from "@prisma/client";
import Reply from "./Reply";

export default function Replies({ commentId, repliesData }: { commentId: string, repliesData: PrismaReply[] }) {
  const [text, setText] = useState("");
  const [replies, setReplies] = useState(repliesData);

  const handleComment = async (e: FormEvent) => {
    e.preventDefault();
    const response = await axios.post("/api/reply", { body: text, commentId: commentId });

    if (response.status == 201) {
      setReplies(prev => [...prev, response.data]);
      setText("");
      (e.target as HTMLFormElement).editor.value = ""
    }
  }

  return <div>
    <form onSubmit={handleComment}>
      <div className="border border-zinc-700 flex rounded-full overflow-hidden">
        <Editor rows={1} action={setText} className="px-4 py-2" />
        <button type="submit" className="w-20 bg-violet-800 hover:bg-violet-700 active:bg-violet-600 cursor-pointer text-white">send</button>
      </div>
    </form>
    <div>
      <div className="p-4 flex flex-col gap-2">
        {
          replies.map((reply, index) => <Reply key={index} reply={reply} />)
        }
      </div>
    </div>
  </div>
}
