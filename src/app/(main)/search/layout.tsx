import SearchForm from "@/app/_components/searchForm";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[calc(100vh-65px)]">
    <SearchForm />
    <div className="px-4">
      {children}
    </div>
  </div>
}
