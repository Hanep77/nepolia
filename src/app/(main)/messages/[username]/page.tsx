import { getConversation } from "@/actions/conversation"
import { getUserProfile } from "@/actions/user";
import Chats from "@/app/_components/chats";
import MessageInput from "@/app/_components/messageForm"

export default async function Conversation({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const userProfile = await getUserProfile(username);

  if (!userProfile) {
    return <div>404</div>
  }

  const conversation = await getConversation(userProfile.id);
  const messages = conversation.messages;

  return <div className="h-[calc(100vh-65px)] flex flex-col justify-between">
    <div className="py-2 border-b border-zinc-700 flex items-center gap-2 px-4">
      <div className="bg-zinc-700 w-10 h-10 rounded-full flex items-center justify-center text-xl">
        {username[0]}
      </div>
      <div>
        <h2 className="text-lg">{userProfile.username}</h2>
      </div>
    </div>
    <Chats messages={messages} userId={userProfile.id} conversationId={conversation.id} />
    <div className="px-4 pb-4">
      <MessageInput conversationId={conversation.id} />
    </div>
  </div>
}
