"use client";

import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from "react";
import Editor from "./editor";
import axios from "axios";
import { BsFileImage, BsTrashFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PostForm() {
  const [text, setText] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const route = useRouter();
  const ref = useRef(null);

  const handlePost = async (e: FormEvent) => {
    e.preventDefault();

    if (!uploadFile && !text) {
      return alert("text or image required");
    }

    let imageurl = "";

    if (uploadFile) {
      const form = new FormData();
      form.set("file", uploadFile);

      const response = await axios.post("api/uploadfile", form, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.status == 200) {
        imageurl = response.data.imgUrl
      }
    }

    const response = await axios.post("/api/post", { body: text, image: imageurl });
    if (response.status == 201) {
      (e.target as HTMLFormElement).editor.value = ""
      setText("");
      route.refresh();
      setIsActive(!isActive);
      setUploadFile(null);
    }
  }

  const handleFileChange = (e: ChangeEvent) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file && file.type.startsWith("image/")) {
      setUploadFile(file);
    }
  }

  const toggleForm = (e: MouseEvent) => {
    e.preventDefault();
    setIsActive(!isActive);
  }

  const closeForm = (e: MouseEvent) => {
    e.preventDefault();
    if (ref.current == e.target) setIsActive(!isActive);
  }

  return <div>
    <div onClick={toggleForm}>
      <div className="w-full h-20 py-2 px-4 text-zinc-500" onClick={toggleForm}>type here...</div>
      <div className="border-t border-zinc-700 mx-4 py-2 flex justify-between">
        <label htmlFor="uploadImage" className="flex items-center gap-2 cursor-pointer hover:text-zinc-200 active:text-zinc-300">
          <BsFileImage />
          Select Picture
        </label>
        <button type="submit" className="bg-violet-800 px-4 cursor-pointer py-1 rounded-full">post</button>
      </div>
    </div>
    <form onSubmit={handlePost}>
      <div ref={ref} onClick={closeForm} className={`${isActive ? "fixed" : "hidden"} top-0 left-0 right-0 bottom-0 bg-white/5 backdrop-blur-sm flex items-center justify-center`}>
        <div className="w-96 border border-zinc-700 rounded bg-zinc-900" onClick={e => e.stopPropagation()}>
          <Editor rows={3} action={setText} className="p-4" required={false} />
          {
            uploadFile?.type.startsWith("image/") &&
            <div className="p-4 border-t border-zinc-700 mx-4">
              <Image src={URL.createObjectURL(uploadFile)} width={500} height={500} alt="Profile Picture" className="h-full w-full object-cover rounded" />
            </div>
          }
          <div className="border-t border-zinc-700 mx-4 py-2 flex justify-between">
            <div className="flex gap-4">
              <label htmlFor="uploadImage" className="flex items-center gap-2 cursor-pointer hover:text-zinc-200 active:text-zinc-300">
                <BsFileImage />
                Select Image
              </label>
              {
                uploadFile?.type.startsWith("image/") &&
                <button className="cursor-pointer bg-red-700 hover:bg-red-700/90 active:bg-red-700/80 px-4 rounded-full" onClick={() => setUploadFile(null)}>
                  <BsTrashFill />
                </button>
              }
              <input type="file" id="uploadImage" onChange={handleFileChange} hidden />
            </div>
            <button type="submit" className="bg-violet-800 hover:bg-violet-800/90 active:bg-violet-800/80 px-4 cursor-pointer py-1 rounded-full">post</button>
          </div>
        </div>
      </div>
    </form>
  </div>
}
