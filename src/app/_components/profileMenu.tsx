"use client";

import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function ProfileMenu({ username }: { username?: string | null }) {
  const [profileMenu, setProfileMenu] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const session = await getSession();
      console.log(session);
    }
    getUser();
  }, [])


  return <div className="relative">
    <button onClick={() => setProfileMenu(!profileMenu)}
      className="flex items-center justify-center h-10 font-medium w-10 text-xl rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 cursor-pointer">
      <FaUser />
    </button>
    <div className={`${!profileMenu && "hidden"} bg-zinc-900 border border-zinc-700 rounded p-4 w-60 absolute top-12 right-0`}>
      <div className="flex flex-col justify-center items-center gap-2 mb-2">
        <div
          className="flex items-center justify-center h-10 font-medium w-10 text-xl rounded-full bg-zinc-800 border border-zinc-700">
          <FaUser />
        </div>
        <p className="font-medium">hanep</p>
      </div>
      <Link href={`/profile/${username}`} className="bg-zinc-800 block py-1 rounded-full text-center mb-2">View Profile</Link>
      <button onClick={() => confirm("logout?") && signOut()} className="bg-red-800 w-full py-1 rounded-full text-center cursor-pointer">Logout</button>
    </div>
  </div>
}
