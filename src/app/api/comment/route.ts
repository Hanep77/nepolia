import { createComment } from "@/actions/comment";

export async function POST(req: Request) {
  try {
    const { body, postId } = await req.json();
    const comment = await createComment(body, postId);
    return Response.json(comment, { status: 201 });
  } catch (error: unknown) {
    if (error) {
      return Response.json("internal server error", { status: 500 });
    }
  }
}
