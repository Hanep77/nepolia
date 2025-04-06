"use client";

// import { signIn } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";

export default function SocialAuth() {
  const socialAuth = (action: string) => {
    // signIn(action, { redirect: false })
    //   .then(callback => {
    //     if (callback?.error) {
    //       alert('Invalid Credentials');
    //     }
    //
    //     if (callback?.ok) {
    //       console.log(callback);
    //     }
    //   })
  }

  return <div className="w-full">
    <div className="relative my-2 flex justify-evenly items-center gap-2">
      <div className="border-t border-zinc-700 flex-grow" />
      <span className="text-sm text-zinc-600">Or sign in with</span>
      <div className="border-t border-zinc-700 flex-grow" />
    </div>
    <button type="button" onClick={() => socialAuth('discord')}
      className="w-full h-10 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center gap-1 rounded hover:cursor-pointer">
      <FaDiscord /> Discord
    </button>
  </div>
}
