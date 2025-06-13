import { searchUser } from "@/actions/user";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export default async function Search({ params }: { params: Promise<{ query: string }> }) {
  const { query } = await params;
  const users = await searchUser(query);

  if (users.length < 1) {
    return <div className="text-center mt-5">not found</div>
  }

  return <div>
    {users?.map((item, index) => {
      return (
        <Link href={"/messages/" + item.username} key={index}>
          <div className="border-b border-zinc-700 flex items-center justify-between py-2">
            <div className="flex items-center gap-4">
              <div className="bg-zinc-700 w-10 h-10 rounded-full flex items-center justify-center text-xl overflow-hidden">
                {item.image ? <Image src={item.image} width={500} height={500} alt="Profile Picture" className="h-full w-full object-cover" /> :
                  <FaUser className="text-2xl" />}
              </div>
              <div>
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="font-light">{item.username}</p>
              </div>
            </div>
            {/* <div className="text-sm text-zinc-500"> */}
            {/*   {date && formatDate(date)} */}
            {/* </div> */}
          </div>
        </Link>
      )
    })}
  </div>
}
