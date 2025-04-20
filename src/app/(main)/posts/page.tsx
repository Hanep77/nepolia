"use client";

import Editor from "@/app/_components/editor";
import Post from "@/app/_components/post"
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { BsFileImage } from "react-icons/bs";

export type PostType = {
  id: string,
  user: {
    id: string,
    name: string | null,
    username: string | null
  },
  totalLikes?: number,
  totalComments?: number,
  body: string,
  comments?: CommentType[]
  createdAt: Date,
  updatedAt?: Date,
}

export type CommentType = {
  id: string,
  user: {
    id: string,
    name: string | null,
    username: string | null
  },
  body: string,
  createdAt: Date,
  updatedAt?: Date,
}

export default function Home() {
  const [text, setText] = useState("");
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await axios.get("/api/post");
      setPosts(posts.data);
    }
    fetchPosts();
  }, []);

  const handlePost = async (e: FormEvent) => {
    e.preventDefault();
    const response = await axios.post("/api/post", { body: text });
    setPosts(prev => [response.data, ...prev]);

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
    {posts.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </div>
}
