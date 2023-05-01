import MainComponents from "../components/MainComponents/MainComponents";
import type { Asset } from '@prisma/client'

type AvgByDecades = {
  avg: string,
  year: number,
  location: number[],
  data: Asset[]
}

async function getDecades() {
  const res = await fetch("http://localhost:3000/api/decades", {
    method: "GET",
    cache: "force-cache",
  });
  if (!res.ok) {
    console.log(res);
  }

  return res.json()
}

async function getLocations() {
  const res = await fetch("http://localhost:3000/api/locations", {
    method: "GET",
    cache: "force-cache",
  });
  if (!res.ok) {
    console.log(res);
  }

  return res.json()
}

async function getAvgByDecades() {
  const res = await fetch("http://localhost:3000/api/avgByDecades", {
    method: "GET",
    cache: "force-cache",
  });
  if (!res.ok) {
    console.log(res);
  }

  return res.json()
}

async function getAssets() {
  const res = await fetch("http://localhost:3000/api/assets/", {
    method: "GET",
    cache: "force-cache",
  });
  if (!res.ok) {
    console.log(res);
  }
  return res.json()
}

export default async function Page() {
  const decades:{year:number}[] = await getDecades();
  const locations:{location:number[]}[] = await getLocations();
  const assetsData:Asset[] = await getAssets();
  const avgByDecadesData:AvgByDecades[] = await getAvgByDecades();
  const decadesList:number[] = [...new Set(decades.map(decade => decade.year))].sort();
  const locationsList:number[][] = [...new Set(locations.map(decade => decade.location))].sort();
  return (
    <div className="m-8">
      <MainComponents decadesList={decadesList} locationsList={locationsList} assetsData={assetsData} avgByDecadesData={avgByDecadesData}/>
    </div>
  );
}
