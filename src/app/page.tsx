import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../components/Map/Map"), {
  ssr: false
});

async function getAssets() {
  const res = await fetch(`${process.env.BASE_URL}/api/assets`, {
    method: 'GET'
  })
  if (!res.ok) {
    console.log(res)
  }
  return res.json()
}

export default async function Page() {
  const assets = await getAssets();
  console.log(assets.length)
  return (
    <div className="h-screen bg-white p-24">
      <MapWithNoSSR />
    </div>
  )
}