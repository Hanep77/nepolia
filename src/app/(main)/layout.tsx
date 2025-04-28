"use client";

import type React from "react";
import Navbar from "../_components/navbar";
import { LikeProvider } from "@/context/likeContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>
    <Navbar />
    <LikeProvider>
      <div className="flex justify-evenly max-w-screen-sm m-auto">
        <div className="flex-1 m-auto sm:border-x border-zinc-700">
          {children}
        </div>
      </div>
    </LikeProvider>
  </>
}
