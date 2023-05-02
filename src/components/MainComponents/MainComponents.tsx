"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from 'react';
import DecadeFilter from './DecadeFilter/DecadeFilter';
import LocationFilter from './LocationFilter/LocationFilter'
import AssetsTable from "./AssetsTable/AssetsTable";
import AssetsGraph from "./AssetsGraph/AssetsGraph";
import type { Asset } from '@prisma/client'

type AvgByDecades = {
  avg: string,
  year: number,
  location: number[],
  data: Asset[]
}

type AvgByAssets = {
  avg: string,
  year: number,
  name: string
}

type AvgByCategories = {
  avg: string,
  year: number,
  category: string
}

const MapWithNoSSR = dynamic(() => import("./Map/Map"), {
  ssr: false,
});

export default function MainComponents({decadesList, locationsList, avgByDecadesData, avgByAssetsData, avgByCategoriesData }:{decadesList:number[], locationsList:number[][], avgByDecadesData:AvgByDecades[], avgByAssetsData:AvgByAssets[], avgByCategoriesData:AvgByCategories[] } ) {
  const [assets, setAssets] = useState<AvgByDecades[]>([]);
  const [activeDecade, setActiveDecade] = useState(decadesList[0]);
  const [activeLocation, setActiveLocation] = useState<number[]>([0,0]);
  const decadeFiltersRef = useRef<number[]>(decadesList);
  const locationFiltersRef = useRef<number[][]>(locationsList);

  function setActiveLocationHandler(location:number[]) {
    if (location[0] === activeLocation[0] && location[0] === activeLocation[0]) {
      setActiveLocation([0,0])
    }
    else {
      setActiveLocation(location)
    }
  }

  function setAssetsHandler(year : number) {
    setAssets(avgByDecadesData.filter(asset => asset.year === year))
    
  }
  useEffect(function() {
    setAssetsHandler(decadesList[0]);
  }, []);
  return (
    <main className="">
      <div className="fixed z-50 w-full bg-white bg-opacity-70 rounded-md drop-shadow-lg">
        <DecadeFilter
          filters={decadeFiltersRef.current}
          activeDecade={activeDecade}
          setActiveDecade={setActiveDecade}
          setAssetsHandler={setAssetsHandler}
        />
        <LocationFilter
          filters={locationFiltersRef.current}
          activeLocation={activeLocation}
          setActiveLocationHandler={setActiveLocationHandler}
        />
      </div>
      <div className="pt-60">
        <MapWithNoSSR assets={assets} setActiveLocation={setActiveLocation} setActiveLocationHandler={setActiveLocationHandler}/>
        <AssetsTable assets={assets} activeLocation={activeLocation}/>
        <AssetsGraph assets={avgByDecadesData} labels={decadeFiltersRef.current} activeLocation={activeLocation} avgByAssetsData={avgByAssetsData} avgByCategoriesData={avgByCategoriesData} />
      </div>
    </main>
  );
}
