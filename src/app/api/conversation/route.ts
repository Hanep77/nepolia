import { getConversations } from "@/actions/conversation";

export async function GET() {
  try {
    const conversations = await getConversations();

    const filtered = conversations.filter(conversation => conversation.messages.length > 0);

    return Response.json(filtered, { status: 200 });
  } catch (error: unknown) {
    if (error) {
      return Response.json("internal server error", { status: 500 });
    }
  }
}
