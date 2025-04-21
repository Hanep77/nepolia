"use client";

import { PostType } from "../(main)/posts/page";
import Post from "./post";

export default function DisplayPosts({ posts }: { posts: PostType[] }) {
  return <>
    {posts.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </>
}
