"use client";

import { FormEvent, useState } from "react";
import Editor from "./editor";
import axios from "axios";

export default function CommentForm({ postId }: { postId: string }) {
  const [text, setText] = useState("");
  const handleComment = async (e: FormEvent) => {
    e.preventDefault();
    const response = await axios.post("/api/comment", { body: text, postId: postId });

    console.log(response);

    if (response.status == 201) {
      setText("");
      (e.target as HTMLFormElement).editor.value = ""
    }
  }

  return <form onSubmit={handleComment}>
    <div className="border border-zinc-700 flex rounded-full overflow-hidden">
      {/* <input type="text" id="comment" name="body" placeholder="write comment..." */}
      {/* className="h-10 outline-none w-full px-4" required autoComplete="off" /> */}
      <Editor rows={1} action={setText} className="px-4 py-2" />
      <button type="submit" className="w-20 bg-violet-800 hover:bg-violet-700 active:bg-violet-600 cursor-pointer text-white">send</button>
    </div>
  </form>
}
