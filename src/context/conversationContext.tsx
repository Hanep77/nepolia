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
    const fetchConversations = async () => {
      const response = await axios.get("/api/conversation");
      const conversations = response.data as ConversationType[];
      const sortedConversation = conversations.sort((a, b) => {
        if (a.messages.length > 0 && b.messages.length > 0) {
          return a.messages[0].createdAt < b.messages[0].createdAt ? 1 : -1
        }
        return 1
      });
      setConversationsState(sortedConversation);
    }
    fetchConversations();
  }, []);

  return <ConversationsContext.Provider value={{ conversationsState, setConversationsState }}>
    {children}
  </ConversationsContext.Provider>
}

export const useConversations = () => useContext(ConversationsContext);
