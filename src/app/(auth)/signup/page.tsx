import Input from "@/app/_components/input";
import Link from "next/link";

export default function Signin() {
  return <div>
    <h2 className="text-2xl font-medium text-center mb-2">Sign up</h2>
    <form className="w-full">
      <Input type="text" name="name" title="Name" />
      <Input type="email" name="email" title="Email" />
      <Input type="text" name="username" title="Username" />
      <Input type="text" name="password" title="Password" />
      <button type="submit" className="h-10 bg-violet-800 w-full rounded hover:cursor-pointer">Sign up</button>
    </form>
    <p className="text-sm mt-2 text-center">Already have account? <Link href="/signin" className="text-blue-400">Sign in</Link></p>
  </div>
}
