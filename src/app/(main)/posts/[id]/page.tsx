import { getPost } from "@/actions/post";
import Comment from "@/app/_components/comment";
import CommentForm from "@/app/_components/commentForm";
import Post from "@/app/_components/post"

export default async function PostDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getPost(id);
  console.log(data);

  if (!data) {
    return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
      <p>404</p>
    </div>
  }

  return <div className="min-h-[calc(100vh-64px)]">
    <Post post={data} />
    <div className="border-b border-zinc-700 p-2">
      <CommentForm postId={data.id} />
    </div>
    <div className="p-4 flex flex-col gap-2">
      {
        data.Comment.map(comment => <Comment key={comment.id} comment={comment} />)
      }
    </div>
  </div>
}
