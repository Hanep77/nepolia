"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { RiMessageFill } from "react-icons/ri";

export default function Navbar() {
  return <header className="border-b bg-zinc-900 border-zinc-700 w-full top-0 sticky z-30">
    <nav className="max-w-screen-sm h-16 m-auto flex items-center justify-between px-4 sm:px-0">
      <Link href={'/'}
        className="flex items-center h-10 gap-2 font-semibold italic underline rounded text-2xl">
        nepolia
      </Link>
      <div className="flex gap-2">
        <div>
          <form className="hidden sm:flex border border-zinc-700 rounded-full">
            <input type="text" name="search" placeholder="search" className="h-10 w-40 px-4 outline-none" />
            <button type="submit" className="w-10 h-10 bg-zinc-700 flex justify-center items-center rounded-full">
              <BiSearch />
            </button>
          </form>
        </div>
        <Link href={'/users/'}
          className="flex items-center justify-center h-10 font-medium w-10 text-xl rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700">
          <GoHomeFill />
        </Link>
        <Link href={'/users/'}
          className="flex items-center justify-center h-10 font-medium w-10 text-xl rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700">
          <RiMessageFill />
        </Link>
        <button onClick={() => confirm("logout?") && signOut()}
          className="flex items-center justify-center h-10 font-medium w-10 text-xl rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 cursor-pointer">
          <FaUser />
        </button>
      </div>
    </nav>
  </header>
}
