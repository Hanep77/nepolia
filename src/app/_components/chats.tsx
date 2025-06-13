"use client";

import { useConversations } from "@/context/conversationContext";
import { pusherClient } from "@/lib/pusher";
import formatDate from "@/utils/formatdate";
import { Message } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { ConversationType } from "./conversationBox";

export default function Chats({ messages, userId, conversationId }: { messages: Message[], userId: string, conversationId: string }) {
  const [chats, setChats] = useState(messages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { setConversationsState } = useConversations();

  useEffect(() => {
    const channel = pusherClient.subscribe("chat-channel");

    const handleNewMessage = (data: { message: Message }) => {
      if (data.message.conversationId == conversationId) {
        setChats((prev) => [...prev, data.message]);

        setConversationsState(prev => {

          if (prev) {
            const currentConversation = prev.find(conversation => conversation.id == conversationId)
            if (!currentConversation) {
              return prev
            }

            const conversation = prev.find(item => item.id == data.message.conversationId) as ConversationType;
            conversation.messages[0] = data.message;
            const sortedConversation = prev.sort((a, b) => {
              if ((a as ConversationType).messages.length > 0 && (b as ConversationType).messages.length > 0) {
                return (a as ConversationType).messages[0].createdAt < (b as ConversationType).messages[0].createdAt ? 1 : -1
              }
              return 1
            });
            return [...sortedConversation];
          }
        })
      }

      if (bottomRef.current) {
        bottomRef.current.scrollIntoView();
      }
    }

    channel.bind('new-message', handleNewMessage);
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView();
    }

    return () => {
      channel.unbind('new-message', handleNewMessage);
      pusherClient.unsubscribe("chat-channel");
    }
  }, [messages, conversationId, setConversationsState]);

  return <div className="px-4 pt-4 pb-18 w-full overflow-y-auto flex-grow">
    {chats.map((message, index) => (
      <div key={index}
        className={`flex mt-1 ${message.senderId !== userId && "justify-end"}`}>
        <div className={`py-2 px-4 ${message.senderId !== userId ? "rounded-l-3xl rounded-tr-3xl bg-violet-800" : "rounded-r-3xl rounded-tl-3xl bg-zinc-800 "} min-w-20 max-w-96 text-wrap`}>
          <p>
            {message.body}
          </p>
          <p className="text-xs text-zinc-400 text-end">{formatDate(message.createdAt, true)}</p>
        </div>
      </div>
    ))}
    <div ref={bottomRef} />
  </div>
}
