"use client";

import { BsFileImage } from "react-icons/bs";
import Editor from "./editor";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUser } from "react-icons/fa";

type UserProfileInfoType = {
  name: string | null,
  username: string | null,
  bio: string | null,
  image: string | null
}


export default function EditProfileForm({ userProfileInfo }: { userProfileInfo: UserProfileInfoType }) {
  const [text, setText] = useState<string>("");
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
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

    setLoading(true);

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

    const formData = new FormData(e.target as HTMLFormElement);

    const data: Record<string, string | null> = {
      name: formData.get("name") as string,
      // username: formData.get("username"),
      bio: text ? text : userProfileInfo.bio,
    }

    if (uploadFile) {
      data.image = imageurl
    }

    const response = await axios.put("/api/user", { body: data });
    if (response) {
      if (response.status == 200) {
        route.push("/profile/" + userProfileInfo.username);
      }
      setLoading(false);
    }
  }

  const handleFileChange = (e: ChangeEvent) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    console.log(file);
    if (file && file.type.startsWith("image/")) {
      setUploadFile(file);
    }
  }

  return <form onSubmit={handlePost}>
    <div className="mt-4 flex flex-col gap-4 items-center px-4 md:w-96 md:mx-auto">
      <div className="flex flex-col items-center">
        <div className="bg-zinc-800 border border-zinc-700 w-32 h-32 rounded-full flex justify-center items-center text-7xl font-medium mb-4 overflow-hidden">
          {uploadFile?.type.startsWith("image/") ?
            <Image src={URL.createObjectURL(uploadFile)} width={500} height={500} alt="Profile Picture" className="h-full w-full object-cover" /> :
            userProfileInfo.image ? <Image src={userProfileInfo.image} width={500} height={500} alt="Profile Picture" className="h-full w-full object-cover" /> :
              <FaUser />}
        </div>
        <label htmlFor="uploadImage" className="flex items-center gap-2 cursor-pointer hover:text-zinc-200 active:text-zinc-300">
          <BsFileImage />
          change picture
        </label>
        <input type="file" id="uploadImage" onChange={handleFileChange} hidden />
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
      <button type="submit" className="h-10 bg-violet-800 w-full rounded hover:cursor-pointer flex items-center justify-center gap-2">
        Save
        {loading &&
          <div className="w-6 h-6 rounded-full border-2 border-x-transparent animate-spin" />
        }
      </button>
    </div>
  </form>
}
