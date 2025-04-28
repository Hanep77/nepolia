import { getLikes, toggleLike } from "@/actions/like";

export async function POST(req: Request) {
  try {
    const { postId } = await req.json();
    const like = await toggleLike(postId);
    return Response.json(like, { status: 201 });
  } catch (error: unknown) {
    if (error) {
      return Response.json("internal server error", { status: 500 });
    }
  }
}

export async function GET() {
  try {
    const like = await getLikes();
    return Response.json(like, { status: 200 });
  } catch (error: unknown) {
    if (error) {
      return Response.json("internal server error", { status: 500 });
    }
  }
}
