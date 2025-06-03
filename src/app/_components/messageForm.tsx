"use client"

import axios from "axios";
import { BiSend } from "react-icons/bi";

export default function MessageInput({ conversationId }: { conversationId: string }) {
  const handleSendMessage = (formData: FormData) => {
    const message = formData.get("message")
    const data = {
      message: message,
    }
    axios.post("/api/messages/create/" + conversationId, data, { headers: { Accept: "application/json" } })
  }

  return (
    <form className="h-12 w-full flex justify-center rounded-full" action={handleSendMessage}>
      <input type="text"
        name="message"
        placeholder="type your message here..."
        className="h-full rounded-s-full min-w-32 border border-zinc-700 flex-grow px-4 outline-none focus:ring-1 ring-zinc-300"
        autoComplete="off"
      />
      <button type="submit"
        className="bg-violet-800 hover:bg-violet-800/90 active:bg-violet-800/80 cursor-pointer px-4 w-20 text-2xl flex justify-center items-center rounded-e-full"><BiSend /></button>
    </form>
  )
}
