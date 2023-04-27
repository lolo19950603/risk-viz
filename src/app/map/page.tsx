import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../../components/Map/Map"), {
  ssr: false
});

export default function Home() {
    return (
      <div className="h-screen bg-white p-24">
        <MapWithNoSSR />
      </div>
    )
  }