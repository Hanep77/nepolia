import { ConversationType } from "@/app/_components/conversationBox";
import { Conversation } from "@prisma/client";
import axios from "axios";
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

type ConversationContextType = {
  conversationsState?: Conversation[] | null,
  setConversationsState: Dispatch<SetStateAction<Conversation[] | undefined>>
}

const ConversationsContext = createContext<ConversationContextType>({
  conversationsState: null,
  setConversationsState: () => { }
});

export const ConversationProvider = ({ children }: { children: React.ReactNode }) => {
  const [conversationsState, setConversationsState] = useState<Conversation[]>();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/api/conversation");
      const conversations = response.data as ConversationType[];
      const sortedConversation = conversations.sort((a, b) => a.messages[0].createdAt < b.messages[0].createdAt ? 1 : -1);
      setConversationsState(sortedConversation);
    }
    fetchPosts();
  }, []);

  return <ConversationsContext.Provider value={{ conversationsState, setConversationsState }}>
    {children}
  </ConversationsContext.Provider>
}

export const useConversations = () => useContext(ConversationsContext);
