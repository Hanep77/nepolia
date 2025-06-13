import { getConversations } from "@/actions/conversation"
import ConversationBox from "@/app/_components/conversationBox";
import { BiSearch } from "react-icons/bi"

export default async function Message() {
  const conversations = await getConversations()

  const filtered = conversations.filter(conversation => conversation.messages.length > 0);

  if (filtered.length < 1) {
    return <div>{"you don't have any conversastion yet"}</div>
  }

  return <div className="min-h-[calc(100vh-65px)]">
    <form action="">
      <div className="h-16 flex items-center border-b border-zinc-700 px-2">
        <div className="flex h-10 border border-zinc-700 w-full rounded-full">
          <input type="text" className="w-full outline-none px-4" placeholder="search conversation..." />
          <button className="w-20 flex items-center justify-center bg-violet-800 hover:bg-violet-800/90 active:bg-violet-800/80 cursor-pointer rounded-full">
            <BiSearch />
          </button>
        </div>
      </div>
    </form>
    <div className="px-4">
      <ConversationBox conversations={filtered} />
    </div>
  </div >
}
