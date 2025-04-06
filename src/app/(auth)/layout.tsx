import type React from "react";
import SocialAuth from "../_components/socialAuthButton";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen flex flex-col items-center justify-center">
    <div className="w-80">
      {children}
      <SocialAuth />
    </div>
  </div>
}
