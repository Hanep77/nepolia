import type React from "react";
import SocialAuth from "../_components/socialAuthButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
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
