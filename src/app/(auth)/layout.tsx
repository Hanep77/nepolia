import type React from "react";
import SocialAuth from "../_components/socialAuthButton";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (session) {
    return redirect('/posts');
  }

  return <div className="min-h-screen flex flex-col items-center justify-center">
    <div className="w-80">
      {children}
      <SocialAuth />
    </div>
  </div>
}
