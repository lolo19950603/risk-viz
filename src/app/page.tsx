import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../components/Map/Map"), {
  ssr: false
});

async function getAssets() {
  const res = await fetch(`${process.env.BASE_URL}/api/assets`, {
    method: 'GET',
    next: { revalidate: 1 },
  })
  if (!res.ok) {
    console.log(res)
  }
  return res.json()
}

export default async function Page() {
  const data: any[] = await getAssets();
  return (
    <div className="m-8">
      <MapWithNoSSR data={data} />
    </div>
  )
}
