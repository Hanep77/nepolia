"use client";

import Link from "next/link";
import { BiComment, BiLike, BiShare, BiSolidComment, BiSolidLike } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import type { PostType } from "../(main)/posts/page";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLike } from "@/context/likeContext";
import formatDate from "@/utils/formatdate";
import Image from "next/image";

export default function Post({ post }: { post: PostType }) {
  const [isLiked, setIsLiked] = useState<boolean>(post.Like.length > 0);
  const [commentCount, setCommentCount] = useState<number>(0);
  const { likedPosts, setPosts } = useLike();
  const LIKED = post.Like.length > 0;

  useEffect(() => {
    if (likedPosts) {
      setIsLiked(likedPosts[post.id]);
      setCommentCount(Number(post._count.Comment));
    }
  }, [likedPosts, post.id, post._count.Comment]);


  const handleLike = async () => {
    const response = await axios.post("/api/like", {
      postId: post.id
    });

    if (response.status == 201) {
      setIsLiked(!isLiked);
      setPosts(prev => {
        if (prev) {
          prev[post.id] = !isLiked;
        }
        return prev;
      })
    }
  }

  const likesMessages = () => {
    const countLikes = LIKED ? post._count.Like - 1 : post._count.Like;
    if (isLiked && countLikes >= 2) return `you and ${countLikes} others`;
    if (isLiked && countLikes == 1) return `you and ${countLikes} other`;
    if (isLiked) return "you"
    return countLikes;
  }

  return <div className="w-full p-4 bg-zinc-900 border-b border-zinc-700">
    <div className="flex justify-between">
      <div className="flex items-center gap-3 mb-3">
        <Link href={'/profile/' + post.user.username} className="flex justify-center items-center bg-zinc-800 border border-zinc-700 rounded-full w-10 h-10 overflow-hidden">
          {post.user.image ? <Image src={post.user.image} width={500} height={500} alt="Profile Picture" className="h-full w-full object-cover" /> : <FaUser className="text-2xl" />
          }
        </Link>
        <div>
          <Link href={'/profile/' + post.user.username} className="font-medium">{post.user.username}</Link>
          <p className="text-sm text-zinc-500">{formatDate(post.createdAt)}</p>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-2 mb-3" dangerouslySetInnerHTML={{ __html: post.body! }}></div>
    {post.image &&
      <div className="rounded w-full max-h-[500px] overflow-hidden mb-2">
        <Image src={post.image} width={2000} height={2000} alt="Profile Picture" className="h-full w-full object-cover" />
      </div>
    }
    <div className={`flex justify-between gap-2 text-sm text-zinc-400 mb-1`}>
      <div>
        {
          (likesMessages() !== 0 && (isLiked || post._count.Like > 0)) &&
          <div className={`flex items-center gap-1`}>
            <BiSolidLike />{likesMessages()}
          </div>
        }
      </div>
      {
        commentCount > 0 &&
        <div className={`flex items-center gap-1`}>
          <BiSolidComment />{commentCount}
        </div>
      }
    </div>
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
