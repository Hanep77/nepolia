"use client"

import { User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useRef, useState } from "react";

interface UserInfoType {
  id: string,
  name: string | null,
  username: string | null,
  isFollowed: boolean,
  bio: string | null,
  image: string | null,
  _count: {
    Post: number,
    Follower: number,
    Following: number
  }
}

type FollowType = {
  username: string,
  name: string,
  image: string
}

export default function UserProfileInfo({ currentUser, user }: { currentUser: User, user: UserInfoType }) {
  const [isFollowed, setIsFollowed] = useState(user.isFollowed)
  const [followers, setFollowers] = useState(user._count.Follower)
  const [isListOpen, setIsListOpen] = useState(false)
  const [followList, setFollowList] = useState<FollowType[] | null>(null);
  const ref = useRef(null);

  const handleFollow = async () => {
    const response = await axios.post("/api/follow", { userId: user.id });

    if (response.status == 201) {
      setIsFollowed(!isFollowed)
      setFollowers(isFollowed ? followers - 1 : followers + 1)
    }
  }

  const openFollowerList = async () => {
    setIsListOpen(true);
    const response = await axios.get("/api/follow/followers/" + user.id)
    const data = response.data.map((item: Record<string, Record<string, string>>) => {
      return item.following
    })
    setFollowList(data);
  }

  const openFollowingList = async () => {
    setIsListOpen(true);
    const response = await axios.get("/api/follow/following/" + user.id)
    const data = response.data.map((item: Record<string, Record<string, string>>) => {
      return item.follower
    })
    setFollowList(data);
  }

  const closeForm = (e: MouseEvent) => {
    e.preventDefault();
    if (ref.current == e.target) setIsListOpen(!isListOpen);
  }

  return <div>
    <div className="bg-gradient-to-r from-violet-800 to-violet-700 flex flex-col items-center py-8 rounded-b-3xl">
      <div className="bg-zinc-300 w-20 h-20 rounded-full flex justify-center items-center text-3xl font-medium text-violet-800 mb-4 overflow-hidden">
        {user.image &&
          <Image priority src={user.image} width={500} height={500} alt="Profile Picture" className="h-full w-full object-cover" />
        }
      </div>
      <p className="text-violet-300">@{user.username}</p>
      <h5 className="text-lg font-medium">{user.name}</h5>
      {user.username !== currentUser?.username &&
        <div className="grid grid-cols-2 gap-2 px-4 mt-4 justify-end text-violet-800">
          <button
            onClick={handleFollow}
            className="bg-violet-200 hover:bg-violet-200/75 active:hover:bg-violet-200/50 h-8 w-28 rounded flex items-center justify-center cursor-pointer">
            {isFollowed ? "following" : "follow"}
          </button>
          <Link
            href={`/messages/${user.username}`}
            className="bg-violet-200 hover:bg-violet-200/75 active:hover:bg-zinc-200/50 h-8 w-28 rounded flex items-center justify-center">
            message
          </Link>
        </div>
      }
      {user.username == currentUser?.username &&
        <Link
          href={`/editprofile`}
          className="bg-violet-200 hover:bg-violet-200/75 active:hover:bg-zinc-200/50 h-8 w-28 mt-4 text-violet-800 rounded flex items-center justify-center">
          edit profile
        </Link>
      }
    </div>
    <div className="flex justify-between p-4">
      <div className="flex flex-col">
        <div className="flex gap-4 text-center">
          <div onClick={openFollowerList} className="cursor-pointer">
            <p>{followers}</p>
            <p className="text-zinc-400">Followers</p>
          </div>
          <div onClick={openFollowingList} className="cursor-pointer">
            <p>{user._count.Following}</p>
            <p className="text-zinc-400">Following</p>
          </div>
          <div>
            <p>{user._count.Post}</p>
            <p className="text-zinc-400">Posts</p>
          </div>
        </div>
        {
          user.bio && <div className="mt-4" dangerouslySetInnerHTML={{ __html: user.bio }}></div>
        }
      </div>
    </div>

    <div
      ref={ref}
      onClick={closeForm}
      className={`${isListOpen ? "fixed" : "hidden"} top-0 left-0 right-0 bottom-0 bg-white/5 backdrop-blur-sm flex items-center justify-center`}>
      <div className="w-96 border border-zinc-700 rounded bg-zinc-900 p-4" onClick={e => e.stopPropagation()}>
        <h3 className="border-b border-zinc-700 text-center pb-2 text-xl font-medium">Followers</h3>
        <div className="h-96 overflow-y-auto">
          {followList?.map((item, index) => (
            <Link href={"/profile/" + item.username} key={index}>
              <div className="border-b border-zinc-700 flex items-center justify-between py-2">
                <div className="flex items-center gap-4">
                  <div className="bg-zinc-700 w-10 h-10 rounded-full flex items-center justify-center text-xl">
                    P
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
}
