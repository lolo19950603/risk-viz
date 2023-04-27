import Link from "next/link";

export default async function Page() {
  return (
    <div className="h-screen bg-white flex justify-center items-center">
      <Link className="bg-black text-white font-medium py-2 px-4 rounded-md border hover:border-orange-300 hover:text-orange-300 hover:bg-white" href={"/map"}>
        Go to map
      </Link>
    </div>

  )
}
