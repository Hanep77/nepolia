import { createPost, getPosts } from "@/actions/post";

export async function POST(req: Request) {
  try {
    const { body } = await req.json();
    const post = await createPost(body);
    return Response.json(post, { status: 201 });
  } catch (error: unknown) {
    if (error) {
      return Response.json("internal server error", { status: 500 });
    }
  }
}

export async function GET() {
  try {
    const post = await getPosts();
    return Response.json(post, { status: 200 });
  } catch (error: unknown) {
    if (error) {
      return Response.json("internal server error", { status: 500 });
    }
  }
}
