import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../../components/Map/Map"), {
  ssr: false
});

export default function Home() {
    return (
      <MapWithNoSSR />
    )
  }