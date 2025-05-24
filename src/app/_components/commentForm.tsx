"use client";

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Editor from "./editor";
import axios from "axios";
import { CommentType } from "../(main)/posts/page";

interface CommentFormProps {
  postId: string,
  action: Dispatch<SetStateAction<CommentType[]>>
}

export default function CommentForm({ postId, action }: CommentFormProps) {
  const [text, setText] = useState("");

  const handleComment = async (e: FormEvent) => {
    e.preventDefault();
    const response = await axios.post("/api/comment", { body: text, postId: postId });

    if (response.status == 201) {
      action(prev => [response.data, ...prev]);
      setText("");
      (e.target as HTMLFormElement).editor.value = ""
    }
  }

  return <form onSubmit={handleComment}>
    <div className="border border-zinc-700 flex rounded-full overflow-hidden">
      <Editor rows={1} action={setText} className="px-4 py-2" />
      <button type="submit" className="w-20 bg-violet-800 hover:bg-violet-700 active:bg-violet-600 cursor-pointer text-white">send</button>
    </div>
  </form>
}
