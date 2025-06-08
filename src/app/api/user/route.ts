import { editProfle } from "@/actions/user";

export async function PUT(req: Request) {
  try {
    const { body } = await req.json();
    const post = await editProfle(body);
    return Response.json(post, { status: 200 });
  } catch (error: unknown) {
    if (error) {
      return Response.json("internal server error", { status: 500 });
    }
  }
}
