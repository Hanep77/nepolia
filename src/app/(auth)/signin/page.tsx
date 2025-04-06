import Input from "@/app/_components/input";
import Link from "next/link";

export default function Signin() {
  return <div>
    <h2 className="text-2xl font-medium text-center mb-2">Sign in</h2>
    <form className="w-full">
      <Input type="text" name="username" title="Username" />
      <Input type="password" name="password" title="Password" />
      <button type="submit" className="h-10 bg-violet-800 w-full rounded hover:cursor-pointer">Sign in</button>
    </form>
    <p className="text-sm mt-2 text-center">doesn't have account yet? <Link href="/signup" className="text-blue-400">Sign up</Link></p>
  </div>
}
