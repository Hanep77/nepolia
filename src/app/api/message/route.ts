import { createMessage } from "@/actions/message";
import { pusherServer } from "@/lib/pusher";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const message = await createMessage(body.message, body.conversationId);

    await pusherServer.trigger('chat-channel', 'new-message', {
      message
    });

    return Response.json(message);
  } catch (err: unknown) {
    console.log(err);
    return new Response('Internal error', { status: 500 });
  }
}
