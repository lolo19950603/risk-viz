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

const MapWithNoSSR = dynamic(() => import("./Map/Map"), {
  ssr: false,
});

export default function MainComponents({decadesList, locationsList, assetsData, avgByDecadesData }:{decadesList:number[], locationsList:number[][], assetsData:Asset[], avgByDecadesData:AvgByDecades[]} ) {
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
    <div className="m-8">
      <div className="flex">
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
      <MapWithNoSSR assets={assets} setActiveLocation={setActiveLocation} setActiveLocationHandler={setActiveLocationHandler}/>
      <AssetsTable assets={assets} activeLocation={activeLocation}/>
      {/* <AssetsGraph assets={assets} labels={decadeFiltersRef.current} activeDecade={activeDecade} /> */}
    </div>
  );
}
