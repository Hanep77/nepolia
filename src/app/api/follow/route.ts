import { toggleFollow } from "@/actions/follow";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    const like = await toggleFollow(userId);
    return Response.json(like, { status: 201 });
  } catch (error: unknown) {
    if (error) {
      return Response.json("internal server error", { status: 500 });
    }
  }
}
