"use client";

import Input from "@/app/_components/input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Signin() {
  const [error, setError] = useState<Record<string, string>>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const user = {
      name: formData.get("name"),
      email: formData.get("email"),
      username: formData.get("username")?.toString().toLowerCase(),
      password: formData.get("password"),
    } as Record<string, string>;

    try {
      setLoading(true);
      const data = await axios.post('/api/auth/signup', user)
        .then(response => response.data)
        .catch(error => {
          if (error.response.status == 400) {
            setError(error.response.data);
          }
        });

      if (data) {
        router.push("/signin");
      }
    } catch (error: unknown) {
      if (error) {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  }

  return <div>
    <h2 className="text-2xl font-medium text-center mb-2">Sign up</h2>
    <form className="w-full" onSubmit={handleSignup}>
      <Input type="text" name="name" title="Name" />
      <Input type="email" name="email" title="Email" error={error?.email} />
      <Input type="text" name="username" title="Username" error={error?.username} />
      <Input type="text" name="password" title="Password" />
      <button type="submit" className="h-10 bg-violet-800 w-full rounded hover:cursor-pointer flex items-center justify-center gap-2">
        Sign up
        {loading &&
          <div className="w-6 h-6 rounded-full border-2 border-x-transparent animate-spin" />
        }
      </button>
    </form>
    <p className="text-sm mt-2 text-center">Already have account? <Link href="/signin" className="text-blue-400">Sign in</Link></p>
  </div>
}
