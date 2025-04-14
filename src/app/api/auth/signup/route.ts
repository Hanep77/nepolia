import { prisma } from "@/lib/prisma";
import bcryptjs from "bcryptjs"

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();
    const {
      email, name, username, password
    } = body;

    if (!email || !name || !password || !username) {
      return new Response("Missing info", { status: 400 })
    }

    const existedEmail = await prisma.user.findFirst({
      where: {
        email: email
      }
    });

    const existedUsername = await prisma.user.findFirst({
      where: {
        username: username
      }
    });

    const error: Record<string, string> = {}

    if (existedEmail) {
      error.email = "email has already been taken";
    }

    if (existedUsername) {
      error.username = "username has already been taken";
    }

    if (existedEmail || existedUsername) {
      return Response.json(error, { status: 400 })
    }

    const hashedPassword = await bcryptjs.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email, name, username, password: hashedPassword
      }
    });

    return Response.json(user);
  } catch (error: unknown) {
    // console.log(error, 'registration error');
    if (error) {
      return new Response("Internal Error", { status: 500 });
    }
  }
}
