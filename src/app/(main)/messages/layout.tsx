"use client";

import { ConversationProvider } from "@/context/conversationContext";
import type React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ConversationProvider>
    {children}
  </ConversationProvider>
}
