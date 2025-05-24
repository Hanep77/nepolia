import { getPost } from "@/actions/post";
import Post from "@/app/_components/post"
import { PostType } from "../page";
import DisplayComments from "@/app/_components/displayComments";

export default async function PostDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getPost(id) as PostType;

  if (!data) {
    return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
      <p>404</p>
    </div>
  }

  return <div className="min-h-[calc(100vh-64px)]">
    <Post post={data} />
    <DisplayComments comments={data.Comment} postId={data.id} />
  </div>
}
