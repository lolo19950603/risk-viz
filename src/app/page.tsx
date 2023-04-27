import Link from "next/link";

export default async function Home() {
  return (
    <div className="h-screen bg-white flex items-center">
      <Link className="bg-black text-white font-medium py-2 px-4 rounded-md" href={"/map"}>
        Go to map
      </Link>
    </div>

  )
}
