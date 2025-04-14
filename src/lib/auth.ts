import { AuthOptions, DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import Credentials from "next-auth/providers/credentials"
import bcryptjs from "bcryptjs"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      username: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error("Invalid credentials");
        }

        let user = await prisma.user.findFirst({
          where: {
            username: credentials.username
          }
        })

        if (!user || !user.password) {
          throw new Error('Invalid Credentials');
        }

        const isCorrectPassword = await bcryptjs.compare(credentials.password, user.password);

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials.")
        }

        return user
      },
    }),
  ],
  session: {
    strategy: "jwt"
  }
}
