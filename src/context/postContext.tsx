// import { PostType } from "@/app/(main)/posts/page";
// import axios from "axios";
// import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
//
// type PostContextType = {
//   posts: PostType[] | null,
//   setPosts: Dispatch<SetStateAction<PostType[]>>
// }
//
// const PostContext = createContext<PostContextType>({
//   posts: null,
//   setPosts: () => { }
// });
//
// export const PostProvider = ({ children }: { children: React.ReactNode }) => {
//   const [posts, setPosts] = useState<PostType[]>([]);
//
//   useEffect(() => {
//     const fetchPosts = async () => {
//       const posts = await axios.get("/api/post");
//       setPosts(posts.data);
//     }
//     fetchPosts();
//   }, []);
//
//   return <PostContext.Provider value={{ posts, setPosts }}>
//     {children}
//   </PostContext.Provider>
// }
//
// export const usePost = () => useContext(PostContext);
