import MainComponents from "../components/MainComponents/MainComponents";
import type { Asset } from "@prisma/client";

type AvgByDecades = {
  avg: string;
  year: number;
  location: number[];
  data: Asset[];
};

type AvgByAssets = {
  avg: string;
  year: number;
  name: string;
};

type AvgByCategories = {
  avg: string;
  year: number;
  category: string;
};

async function getDecades() {
  const res = await fetch("/api/decades", {
    method: "GET",
    cache: "force-cache",
  });
  if (!res.ok) {
    console.log(res);
  }

  return res.json();
}

async function getLocations() {
  const res = await fetch("/api/locations", {
    method: "GET",
    cache: "force-cache",
  });
  if (!res.ok) {
    console.log(res);
  }

  return res.json();
}

async function getAvgByDecades() {
  const res = await fetch("/api/avgByDecades", {
    method: "GET",
    cache: "force-cache",
  });
  if (!res.ok) {
    console.log(res);
  }

  return res.json();
}

async function getAvgByAssets() {
  const res = await fetch("/api/avgByAssets/", {
    method: "GET",
    cache: "force-cache",
  });
  if (!res.ok) {
    console.log(res);
  }
  return res.json();
}

async function getAvgByCategories() {
  const res = await fetch("/api/avgByCategories/", {
    method: "GET",
    cache: "force-cache",
  });
  if (!res.ok) {
    console.log(res);
  }
  return res.json();
}

export default async function Page() {
  const decades: { year: number }[] = await getDecades();
  const locations: { location: number[] }[] = await getLocations();
  const avgByDecadesData: AvgByDecades[] = await getAvgByDecades();
  const avgByAssetsData: AvgByAssets[] = await getAvgByAssets();
  const avgByCategoriesData: AvgByCategories[] = await getAvgByCategories();
  const decadesList: number[] = [
    ...new Set(decades.map((decade) => decade.year)),
  ].sort();
  const locationsList: number[][] = [
    ...new Set(
      locations.map((location) => [
        Number(location.location[0]),
        Number(location.location[1]),
      ])
    ),
  ].sort();
  return (
    <div className="">
      <MainComponents
        decadesList={decadesList}
        locationsList={locationsList}
        avgByDecadesData={avgByDecadesData}
        avgByAssetsData={avgByAssetsData}
        avgByCategoriesData={avgByCategoriesData}
      />
    </div>
  );
}
