"use client";

import { BsFileImage } from "react-icons/bs";
import Editor from "./editor";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type UserProfileInfoType = {
  name: string | null,
  username: string | null,
  bio: string | null
}


export default function EditProfileForm({ userProfileInfo }: { userProfileInfo: UserProfileInfoType }) {
  const [text, setText] = useState<string>("");
  const route = useRouter();

  const convertHtmlToText = (htmlString: string | null) => {
    if (!htmlString) return;
    const regex = /<p>(.*?)<\/p>/g;
    const matches = [];
    let match;
    while ((match = regex.exec(htmlString)) !== null) {
      matches.push(match[1]);
    }
    return matches.join('\n');
  }

  const bio = convertHtmlToText(userProfileInfo.bio)

  const handlePost = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const data = {
      name: formData.get("name"),
      // username: formData.get("username"),
      bio: text ? text : userProfileInfo.bio,
    }

    const response = await axios.put("/api/user", { body: data });
    if (response.status == 200) {
      route.push("/profile/" + userProfileInfo.username);
    }
  }

  return <form onSubmit={handlePost}>
    <div className="mt-4 flex flex-col gap-4 items-center px-4 md:w-96 md:mx-auto">
      <div className="flex flex-col items-center">
        <div className="bg-zinc-300 w-16 h-16 rounded-full flex justify-center items-center text-3xl font-medium text-violet-800 mb-4">H</div>
        <label htmlFor="uploadImage" className="flex items-center gap-2 cursor-pointer hover:text-zinc-200 active:text-zinc-300">
          <BsFileImage />
          change picture
        </label>
        <input type="file" id="uploadImage" className="hidden" />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="name" className="block">name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="border border-zinc-700 h-8 rounded outline-none mt-1 px-2"
          defaultValue={userProfileInfo.name ? userProfileInfo.name : ""}
          required />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="username" className="block">username</label>
        <input
          type="text"
          id="username"
          name="username"
          className="border border-zinc-700 h-8 rounded outline-none mt-1 px-2 disabled:bg-zinc-800"
          defaultValue={userProfileInfo.username ? userProfileInfo.username : ""}
          required
          disabled
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="username" className="block">bio</label>
        <Editor rows={5} action={setText} className="p-2 border border-zinc-700" defaultValue={userProfileInfo.bio ? bio : ""} />
      </div>
      <button type="submit" className="h-8 bg-violet-800 w-full rounded hover:bg-violet-800/90 active:bg-violet-800/80 cursor-pointer">Save</button>
    </div>
  </form>
}
