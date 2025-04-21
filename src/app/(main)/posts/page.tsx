import { getPosts } from "@/actions/post";
import DisplayPosts from "@/app/_components/displayPosts";
import PostForm from "@/app/_components/postForm";

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
  comments?: CommentType[],
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

export default async function Home() {
  const posts = await getPosts();

  return <div>
    <div className="border-b border-zinc-700">
      <PostForm />
    </div>
    <div>
      <DisplayPosts posts={posts} />
    </div>
  </div>
}
