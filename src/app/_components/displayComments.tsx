"use client";

import { useEffect, useState } from "react";
import { CommentType } from "../(main)/posts/page";
import Comment from "./comment";
import CommentForm from "./commentForm";

export default function DisplayComments({ comments, postId }: { comments?: CommentType[], postId: string }) {
  const [postComments, setPostComments] = useState<CommentType[]>([])

  useEffect(() => {
    if (comments) setPostComments(comments);
  }, [comments])

  return <>
    <div className="border-b border-zinc-700 p-2">
      <CommentForm postId={postId} action={setPostComments} />
    </div>
    <div className="p-4 flex flex-col gap-2">
      {
        postComments.map(comment => <Comment key={comment.id} comment={comment} />)
      }
    </div>
  </>
}
