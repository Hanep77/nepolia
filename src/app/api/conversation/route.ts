import { getConversations } from "@/actions/conversation";

export async function GET() {
  try {
    const like = await getConversations();
    return Response.json(like, { status: 200 });
  } catch (error: unknown) {
    if (error) {
      return Response.json("internal server error", { status: 500 });
    }
  }
}
