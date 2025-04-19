"use client";

import Editor from "@/app/_components/editor";
import Post from "@/app/_components/post"
import axios from "axios";
import { FormEvent, useState } from "react";
import { BsFileImage } from "react-icons/bs";

export type PostType = {
  id: number,
  user: {
    id: number,
    name: string,
    username: string
  },
  total_likes: number,
  total_comments: number,
  content: string,
  comments?: CommentType[]
}

export type CommentType = {
  id: number,
  user: {
    id: number,
    name: string,
    username: string
  },
  content: string,
}

const data: PostType[] = [
  {
    id: 1,
    user: {
      id: 1,
      name: "rahasia",
      username: "rahasia"
    },
    total_likes: 200,
    total_comments: 30,
    content: "<p>dummy post</p><p>dummy post 1</p>"
  },
  {
    id: 2,
    user: {
      id: 1,
      name: "rahasia",
      username: "rahasia"
    },
    total_likes: 200,
    total_comments: 30,
    content: "<p>dummy post</p><p>dummy post 1</p>"
  },
  {
    id: 3,
    user: {
      id: 1,
      name: "rahasia",
      username: "rahasia"
    },
    total_likes: 200,
    total_comments: 30,
    content: "<p>dummy post</p><p>dummy post 1</p>"
  },
  {
    id: 4,
    user: {
      id: 1,
      name: "rahasia",
      username: "rahasia"
    },
    total_likes: 200,
    total_comments: 30,
    content: "<p>dummy post</p><p>dummy post 1</p>"
  },
  {
    id: 5,
    user: {
      id: 1,
      name: "rahasia",
      username: "rahasia"
    },
    total_likes: 200,
    total_comments: 30,
    content: "<p>dummy post</p><p>dummy post 1</p>"
  }
]

export default function Home() {
  const [text, setText] = useState("");

  const handlePost = async (e: FormEvent) => {
    e.preventDefault();
    const response = await axios.post("/api/post/create", { body: text });

    if (response.status == 201) {
      setText("");
      (e.target as HTMLFormElement).editor.value = ""
    }
  }

  return <div>
    <div className="min-h-20 border-b border-zinc-700 outline-none">
      <form onSubmit={handlePost}>
        <Editor rows={3} action={setText} className="p-4" />
        <div className="border-t border-zinc-700 mx-4 py-2 flex justify-between">
          <label htmlFor="uploadImage" className="flex items-center gap-2 cursor-pointer hover:text-zinc-200 active:text-zinc-300">
            <BsFileImage />
            Select Picture
          </label>
          <input type="file" id="uploadImage" className="hidden" />
          <button type="submit" className="bg-violet-800 hover:bg-violet-700 active:bg-violet-600 px-4 cursor-pointer py-1 rounded-full">post</button>
        </div>
      </form>
    </div>
    {data.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </div>
}
