"use client";

import Link from "next/link";
import { BiComment, BiLike, BiShare, BiSolidLike } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import type { PostType } from "../(main)/posts/page";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLike } from "@/context/likeContext";

export default function Post({ post }: { post: PostType }) {
  const [isLiked, setIsLiked] = useState<boolean>(post.Like.length > 0);
  const [countLikes, setCountLikes] = useState(post._count.Like);
  const { likedPosts, setPosts } = useLike();

  useEffect(() => {
    if (likedPosts) {
      setIsLiked(likedPosts[post.id]);
    }
  }, []);

  const handleLike = async () => {
    const response = await axios.post("/api/like", {
      postId: post.id
    });

    if (response.status == 201) {
      isLiked ? setCountLikes(countLikes - 1) : setCountLikes(countLikes + 1);
      setIsLiked(!isLiked);
      setPosts(prev => {
        if (prev) {
          prev[post.id] = !prev[post.id]
        }
        return prev;
      })
    }
  }

  return <div className="w-full p-4 bg-zinc-900 border-b border-zinc-700">
    <div className="flex justify-between">
      <div className="flex items-center gap-3 mb-3">
        <Link href={'/users/'} className="flex justify-center items-center bg-zinc-800 border border-zinc-700 rounded-full w-10 h-10">
          <FaUser className="text-2xl" /></Link>
        <div>
          <Link href={'/users/'} className="font-medium">{post.user.username}</Link>
          <p className="text-sm text-zinc-500">2 days ago</p>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-2 mb-3" dangerouslySetInnerHTML={{ __html: post.body }}>
    </div>
    <Link href={"/posts/1/likes"} className={`flex gap-2 text-sm text-zinc-400 mb-1`}>
      {countLikes > 0 && <p className={``}>{countLikes} {countLikes > 1 ? "likes" : "like"}</p>}
      {post._count.Comment && <p className={``}>{post._count.Comment} comments</p>}
    </Link>
    <div className="flex justify-around gap-2">
      <button
        onClick={handleLike}
        type="button"
        className="text-xl bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 border border-zinc-700 rounded-full w-1/2 h-8 flex justify-center items-center cursor-pointer">
        {isLiked ? <BiSolidLike /> : <BiLike />}
      </button>
      <Link href={'/posts/' + post.id} className="text-xl bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 border border-zinc-700 rounded-full w-1/2 flex h-8 justify-center items-center"><BiComment /></Link>
      <button type="button" className="text-xl bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 border border-zinc-700 rounded-full w-1/2 h-8 flex justify-center items-center cursor-pointer"><BiShare /></button>
    </div>
  </div >
}
