import axios from "axios"
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

type LikedPostContextType = {
  likedPosts?: Record<string, boolean> | null,
  setPosts: Dispatch<SetStateAction<Record<string, boolean> | undefined>>
}

const LikeContext = createContext<LikedPostContextType>({
  likedPosts: null,
  setPosts: () => { }
});

export const LikeProvider = ({ children }: { children: React.ReactNode }) => {
  const [likedPosts, setPosts] = useState<Record<string, boolean>>();

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await axios.get("/api/like");
      setPosts(posts.data);

      const result: Record<string, boolean> = {};
      posts.data.forEach((post: { id: string, postId: string, userId: string }) => {
        result[post.postId] = true
      });

      setPosts(result);
    }
    fetchPosts();
  }, []);

  return <LikeContext.Provider value={{ likedPosts, setPosts }}>
    {children}
  </LikeContext.Provider>
}

export const useLike = () => useContext(LikeContext);
