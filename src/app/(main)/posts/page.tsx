import Post from "@/app/_components/post"

export type PostType = {
  id: number,
  user: {
    id: number,
    name: string,
    username: string
  },
  total_likes: number,
  total_comments: number,
  content: string,
  comments?: CommentType[]
}

export type CommentType = {
  id: number,
  user: {
    id: number,
    name: string,
    username: string
  },
  content: string,
}

const data: PostType[] = [
  {
    id: 1,
    user: {
      id: 1,
      name: "rahasia",
      username: "rahasia"
    },
    total_likes: 200,
    total_comments: 30,
    content: "<p>dummy post</p><p>dummy post 1</p>"
  },
  {
    id: 2,
    user: {
      id: 1,
      name: "rahasia",
      username: "rahasia"
    },
    total_likes: 200,
    total_comments: 30,
    content: "<p>dummy post</p><p>dummy post 1</p>"
  },
  {
    id: 3,
    user: {
      id: 1,
      name: "rahasia",
      username: "rahasia"
    },
    total_likes: 200,
    total_comments: 30,
    content: "<p>dummy post</p><p>dummy post 1</p>"
  },
  {
    id: 4,
    user: {
      id: 1,
      name: "rahasia",
      username: "rahasia"
    },
    total_likes: 200,
    total_comments: 30,
    content: "<p>dummy post</p><p>dummy post 1</p>"
  },
  {
    id: 5,
    user: {
      id: 1,
      name: "rahasia",
      username: "rahasia"
    },
    total_likes: 200,
    total_comments: 30,
    content: "<p>dummy post</p><p>dummy post 1</p>"
  }
]

export default function Home() {
  return <div>
    {data.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </div>
}
