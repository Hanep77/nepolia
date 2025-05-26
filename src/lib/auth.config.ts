import type { NextAuthConfig } from "next-auth"
import Discord from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcryptjs from "bcryptjs"

interface UserType {
  name: string;
  username: string;
  email: string;
  image: string | null;
}

export default {
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<UserType> => {
        if (!credentials.username || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findFirst({
          where: {
            username: credentials.username
          }
        })

        if (!user || !user.password) {
          throw new Error('Invalid Credentials');
        }

        const password = credentials.password as string;
        const isCorrectPassword = await bcryptjs.compare(password, user.password);

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials.")
        }
        return {
          name: user.name as string,
          username: user.username as string,
          email: user.email,
          image: user.image,
        };
      }
    }),
    Discord
  ]
} satisfies NextAuthConfig
