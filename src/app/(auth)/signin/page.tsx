"use client";

import Input from "@/app/_components/input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Signin() {
  const [error, setError] = useState<string>();
  const router = useRouter();

  const handleSignin = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const user = {
      username: formData.get("username"),
      password: formData.get("password"),
    } as Record<string, string>;

    signIn('credentials', {
      ...user,
      redirect: false
    })
      .then((callback) => {
        if (callback?.error) {
          setError("invalid credentials");
        }

        if (callback?.ok) {
          router.push('/posts');
        }
      })

    // if (data) {
    //   router.push("/posts");
    // }
  }
  return <div>
    <h2 className="text-2xl font-medium text-center mb-2">Sign in</h2>
    {error &&
      <div className="text-center py-1 bg-red-500/50 rounded border border-red-500 mb-2">
        <p className="text-red-100">{error}</p>
      </div>
    }
    <form className="w-full" onSubmit={handleSignin}>
      <Input type="text" name="username" title="Username" />
      <Input type="password" name="password" title="Password" />
      <button type="submit" className="h-10 bg-violet-800 w-full rounded hover:cursor-pointer">Sign in</button>
    </form>
    <p className="text-sm mt-2 text-center">{"doesn't have account yet?"} <Link href="/signup" className="text-blue-400">Sign up</Link></p>
  </div>
}
