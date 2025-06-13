"use client";

import Link from "next/link";
import formatDate from "@/utils/formatdate"
import { Conversation, Message, User } from "@prisma/client";
import { useEffect } from "react";
import { pusherClient } from "@/lib/pusher";
import { useConversations } from "@/context/conversationContext";
import Image from "next/image";
import { FaUser } from "react-icons/fa";

export interface ConversationType extends Conversation {
  users: {
    userId: string,
    User: User
  }[],
  messages: Message[]
}

export default function ConversationBox({ conversations }: { conversations: Conversation[] }) {
  const sortedConversation = conversations.sort((a, b) => (a as ConversationType).messages[0].createdAt < (b as ConversationType).messages[0].createdAt ? 1 : -1);
  const { conversationsState, setConversationsState } = useConversations();

  useEffect(() => {
    setConversationsState(sortedConversation);
    const channel = pusherClient.subscribe("chat-channel");

    const handleNewMessage = (data: { message: Message }) => {
      setConversationsState(prev => {
        if (prev) {
          const conversation = prev.find(item => item.id == data.message.conversationId) as ConversationType;
          conversation.messages[0] = data.message;
          const sortedConversation = prev.sort((a, b) => (a as ConversationType).messages[0].createdAt < (b as ConversationType).messages[0].createdAt ? 1 : -1);
          return [...sortedConversation];
        }
      });
    }

    channel.bind('new-message', handleNewMessage);

    return () => {
      channel.unbind('new-message', handleNewMessage);
      pusherClient.unsubscribe("chat-channel");
    }
  }, [sortedConversation, setConversationsState, conversations])

  return <>
    {
      conversationsState?.map((item, index) => {
        const conversation = item as ConversationType;

        const name = conversation.users[0].User.name;
        const image = conversation.users[0].User.image;
        const username = conversation.users[0].User.username;
        const lastMessage = conversation.messages[0].body;
        const date = conversation.messages[0].createdAt;

        return (
          <Link href={"/messages/" + username} key={index}>
            <div className="border-b border-zinc-700 flex items-center justify-between py-2">
              <div className="flex items-center gap-4">
                <div className="bg-zinc-700 w-10 h-10 rounded-full flex items-center justify-center text-xl overflow-hidden">
                  {image ? <Image src={image} width={500} height={500} alt="Profile Picture" className="h-full w-full object-cover" /> :
                    <FaUser className="text-2xl" />}
                </div>
                <div>
                  <h3 className="text-lg font-medium">{name}</h3>
                  <p className="font-light">{lastMessage && lastMessage.length > 35 ? lastMessage?.substring(0, 30) + "..." : lastMessage}</p>
                </div>
              </div>
              <div className="text-sm text-zinc-500">
                {date && formatDate(date)}
              </div>
            </div>
          </Link>
        )
      })}
  </>
}
