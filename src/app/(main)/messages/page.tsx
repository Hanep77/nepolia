import { BiSearch } from "react-icons/bi"

const data = [
  {
    name: "contact 1",
    lastMessage: "no",
    createdAt: "12.05"
  },
  {
    name: "contact 2",
    lastMessage: "test",
    createdAt: "12.05"
  },
  {
    name: "contact 3",
    lastMessage: "okay",
    createdAt: "12.05"
  },
  {
    name: "contact 4",
    lastMessage: "p",
    createdAt: "12.05"
  },
  {
    name: "contact 5",
    lastMessage: "test",
    createdAt: "12.05"
  },
]

export default function Message() {
  return <div className="min-h-[calc(100vh-65px)]">
    <form action="">
      <div className="h-16 flex items-center border-b border-zinc-700 px-2">
        <div className="flex h-10 border border-zinc-700 w-full rounded-full">
          <input type="text" className="w-full outline-none px-4" placeholder="search conversation..." />
          <button className="w-20 flex items-center justify-center bg-violet-800 hover:bg-violet-800/90 active:bg-violet-800/80 cursor-pointer rounded-full">
            <BiSearch />
          </button>
        </div>
      </div>
    </form>
    <div className="px-4">
      {
        data.map((item, index) => (
          <div key={index} className="border-b border-zinc-700 flex items-center justify-between py-2">
            <div className="flex items-center gap-4">
              <div className="bg-zinc-700 w-10 h-10 rounded-full flex items-center justify-center text-xl">
                P
              </div>
              <div>
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="font-light">{item.lastMessage}</p>
              </div>
            </div>
            <div className="text-sm text-zinc-500">
              {item.createdAt}
            </div>
          </div>
        ))
      }
    </div>
  </div >
}
