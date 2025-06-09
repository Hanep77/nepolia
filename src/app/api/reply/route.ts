import { createReply } from "@/actions/reply";

export async function POST(req: Request) {
  try {
    const { body, commentId } = await req.json();
    const reply = await createReply(body, commentId);
    return Response.json(reply, { status: 201 });
  } catch (error: unknown) {
    if (error) {
      return Response.json("internal server error", { status: 500 });
    }
  }
}
