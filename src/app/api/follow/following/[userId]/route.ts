import { getFollowing } from "@/actions/follow";

export async function GET(req: Request) {
  const url = req.url.split('/');
  const userId = url[url.length - 1];

  try {
    const following = await getFollowing(userId);
    return Response.json(following);
  } catch (error: unknown) {
    if (error) {
      console.log(error);
      return Response.json("internal server error", { status: 500 });
    }
  }
}
