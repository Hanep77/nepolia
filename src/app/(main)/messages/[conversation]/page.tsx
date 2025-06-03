import MessageInput from "@/app/_components/messageForm"

const messages = [
  {
    otherUser: true,
    body: "p"
  },
  {
    otherUser: true,
    body: "hai"
  },
  {
    otherUser: false,
    body: "euy"
  },
  {
    otherUser: true,
    body: "p"
  },
  {
    otherUser: true,
    body: "hai"
  },
  {
    otherUser: false,
    body: "euy"
  },
  {
    otherUser: true,
    body: "p"
  },
  {
    otherUser: true,
    body: "hai"
  },
  {
    otherUser: false,
    body: "euy"
  },
  {
    otherUser: true,
    body: "p"
  },
  {
    otherUser: true,
    body: "hai"
  },
  {
    otherUser: false,
    body: "euy"
  }
]

export default function Conversation() {
  return <div className="h-[calc(100vh-65px)] flex flex-col justify-between">
    <div className="py-2 border-b border-zinc-700 flex items-center gap-2 px-4">
      <div className="bg-zinc-700 w-10 h-10 rounded-full flex items-center justify-center text-xl">
        P
      </div>
      <div>
        <h2 className="text-lg">contact 1</h2>
      </div>
    </div>
    <div className="px-4 py-4 w-full overflow-y-auto flex-grow">
      {messages.map((message, index: number) => (
        <div key={index}
          className={`flex ${!message.otherUser && "justify-end"} ${messages[index - 1]?.otherUser == message.otherUser ? "mt-1" : "mt-2"}`}>
          <div className={`py-2 px-4 ${!message.otherUser ? "rounded-l-3xl rounded-tr-3xl bg-violet-800" : "rounded-r-3xl rounded-tl-3xl bg-zinc-800 "} min-w-20 max-w-96 text-wrap`}>
            <p>
              {message.body}
            </p>
            <p className="text-xs text-zinc-400 text-end">07.00</p>
          </div>
        </div>
      ))}
      {/* <div ref={bottomRef} /> */}
    </div>
    <div className="px-4 pb-4">
      <MessageInput conversationId={"jfdksl"} />
    </div>
  </div>
}
