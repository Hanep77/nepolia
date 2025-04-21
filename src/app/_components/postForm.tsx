"use client";

import { FormEvent, MouseEvent, useRef, useState } from "react";
import Editor from "./editor";
import axios from "axios";
import { BsFileImage } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function PostForm() {
  const [text, setText] = useState("");
  const [isActive, setIsActive] = useState(false);
  const route = useRouter();
  const ref = useRef(null);

  const handlePost = async (e: FormEvent) => {
    e.preventDefault();
    const response = await axios.post("/api/post", { body: text });
    if (response.status == 201) {
      route.refresh();
      setIsActive(!isActive);
    }
  }

  const toggleForm = (e: MouseEvent) => {
    e.preventDefault();
    setIsActive(!isActive);
  }

  const closeForm = (e: MouseEvent) => {
    e.preventDefault();
    ref.current == e.target && setIsActive(!isActive);
  }

  return <div>
    <div onClick={toggleForm}>
      <div className="w-full h-20 py-2 px-4 text-zinc-500" onClick={toggleForm}>type here...</div>
      <div className="border-t border-zinc-700 mx-4 py-2 flex justify-between">
        <label htmlFor="uploadImage" className="flex items-center gap-2 cursor-pointer hover:text-zinc-200 active:text-zinc-300">
          <BsFileImage />
          Select Picture
        </label>
        <button type="submit" className="bg-violet-800 hover:bg-violet-700 active:bg-violet-600 px-4 cursor-pointer py-1 rounded-full">post</button>
      </div>
    </div>
    <form onSubmit={handlePost}>
      <div ref={ref} onClick={closeForm} className={`${isActive ? "fixed" : "hidden"} top-0 left-0 right-0 bottom-0 bg-white/5 backdrop-blur-sm flex items-center justify-center`}>
        <div className="w-96 border border-zinc-700 rounded bg-zinc-900" onClick={e => e.stopPropagation()}>
          <Editor rows={3} action={setText} className="p-4" />
          <div className="border-t border-zinc-700 mx-4 py-2 flex justify-between">
            <label htmlFor="uploadImage" className="flex items-center gap-2 cursor-pointer hover:text-zinc-200 active:text-zinc-300">
              <BsFileImage />
              Select Picture
            </label>
            <input type="file" id="uploadImage" className="hidden" />
            <button type="submit" className="bg-violet-800 hover:bg-violet-700 active:bg-violet-600 px-4 cursor-pointer py-1 rounded-full">post</button>
          </div>
        </div>
      </div>
    </form>
  </div>
}
