interface InputProps {
  type: string,
  name: string,
  title: string,
  error?: string,
}

export default function Input({ type, name, title, error }: InputProps) {
  return (
    <div className={`flex flex-col mb-3`}>
      <input type={type} id={name} name={name} placeholder={title} className={`h-10 border ${error ? "border-red-600" : "border-zinc-700"} focus:outline-none px-2 rounded`} />
      <p className="text-red-500 italic text-sm mt-1">{error && error}</p>
    </div>
  )
}

