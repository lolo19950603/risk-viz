"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from 'react';
import DecadeFilter from './DecadeFilter/DecadeFilter';
import AssetsTable from "./AssetsTable/AssetsTable";

type Asset = {
  id: string;
  name: string;
  location: number[];
  category: string;
  riskRating: string;
  riskFactor: { [key: string]: number };
  year: number;
};

const MapWithNoSSR = dynamic(() => import("./Map/Map"), {
  ssr: false,
});

export default function MainComponents({decadesList, assetsData }:{decadesList:number[], assetsData:Asset[]} ) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [activeDecade, setActiveDecade] = useState(decadesList[0]);
  const decadeFiltersRef = useRef<number[]>(decadesList);
  
  function setAssetsHandler(year : number) {
    setAssets(assetsData.filter(asset => asset.year === year))
  }
  useEffect(function() {
    setAssetsHandler(decadesList[0])
  }, []);
  
  return (
    <div className="m-8">
      <DecadeFilter
        filters={decadeFiltersRef.current}
        activeDecade={activeDecade}
        setActiveDecade={setActiveDecade}
        setAssetsHandler={setAssetsHandler}
      />
      <MapWithNoSSR assets={assets} />
      <AssetsTable assets={assets} />
    </div>
  );
}
