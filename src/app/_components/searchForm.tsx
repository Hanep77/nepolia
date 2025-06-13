"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { BiSearch } from "react-icons/bi";

export default function SearchForm() {
  const route = useRouter();
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const keyword = formData.get("search");
    route.push("/search/" + keyword);
  }

  return <form onSubmit={handleSearch}>
    <div className="h-16 flex items-center border-b border-zinc-700 px-2">
      <div className="flex h-10 border border-zinc-700 w-full rounded-full">
        <input type="text" name="search" className="w-full outline-none px-4" placeholder="search user..." autoComplete="off" />
        <button className="w-20 flex items-center justify-center bg-violet-800 hover:bg-violet-800/90 active:bg-violet-800/80 cursor-pointer rounded-full">
          <BiSearch />
        </button>
      </div>
    </div>
  </form>
}
