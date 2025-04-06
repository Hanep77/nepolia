import Link from "next/link";

export default function Home() {
  return <div className="w-full min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-3xl font-semibold mb-5">Welcome to <span className="text-violet-600">Nepolia</span></h1>
      <Link href={"/signin"} className="bg-zinc-800 border border-zinc-700 p-2 rounded hover:bg-zinc-700">Sign in now</Link>
    </div>
  </div>
}
