"use client";

import { Chart } from "primereact/chart";
import { useState, useEffect, useRef } from "react";
import type { Asset } from "@prisma/client";
import AssetsFilter from "./AssetsFilter/AssetsFilter";
import CategoriesFilter from "./CategoriesFilter/CategoriesFilter";

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

export default function AssetsGraph({
  assets,
  labels,
  activeLocation,
  avgByAssetsData,
  avgByCategoriesData,
}: {
  assets: AvgByDecades[];
  labels: number[];
  activeLocation: number[];
  avgByAssetsData: AvgByAssets[];
  avgByCategoriesData: AvgByCategories[];
}) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [activeCat, setActiveCat] = useState<string>(avgByAssetsData[0].name);
  const AssetsFiltersRef = useRef<string[]>([]);
  const CategoriesFiltersRef = useRef<string[]>([]);

  function setChartDataListHandler(input: string | number[]) {
    const documentStyle = getComputedStyle(document.documentElement);
    if (typeof input === "string") {
      setActiveCat(input);
      let dataList: number[] = [];
      if (AssetsFiltersRef.current.includes(input)) {
        dataList = avgByAssetsData
          .filter((asset) => asset.name === input)
          .map((asset) => Number(asset.avg));
      } else {
        dataList = avgByCategoriesData
          .filter((asset) => asset.category === input)
          .map((asset) => Number(asset.avg));
      }
      const data = {
        labels: labels,
        datasets: [
          {
            label: `${input}`,
            data: dataList,
            fill: true,
            borderColor: "rgb(245 158 11)",
            tension: 0.4,
            backgroundColor: "rgba(255,167,38,0.2)",
          },
        ],
      };
      setChartData(data);
    } else {
      const dataList: number[] = assets
        .filter(
          (asset) =>
            Number(asset.location[0]) === activeLocation[0] &&
            Number(asset.location[1]) === activeLocation[1]
        )
        .map((asset) => Number(asset.avg));
      const data = {
        labels: labels,
        datasets: [
          {
            label: `${activeLocation}`,
            data: dataList,
            fill: true,
            borderColor: "rgb(245 158 11)",
            tension: 0.4,
            backgroundColor: "rgba(255,167,38,0.2)",
          },
        ],
      };
      setChartData(data);
    }
  }

  useEffect(() => {
    AssetsFiltersRef.current = [
      ...new Set(avgByAssetsData.map((row) => row.name)),
    ];
    CategoriesFiltersRef.current = [
      ...new Set(avgByCategoriesData.map((row) => row.category)),
    ];
    setChartDataListHandler(activeCat);
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = "rgb(211, 211, 211)";

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Year",
          },
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          title: {
            display: true,
            text: "Risk Rating",
          },
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };
    setChartOptions(options);
  }, []);

  useEffect(() => {
    if (!(activeLocation[0] === 0 && activeLocation[1] === 0)) {
      setActiveCat("");
      setChartDataListHandler(activeLocation);
    }
  }, [activeLocation]);

  return (
    <main className="mt-10">
      <div className="pb-0.5 mt-10 w-full bg-white rounded-md drop-shadow-lg">
        <CategoriesFilter
          filters={CategoriesFiltersRef.current}
          activeCat={activeCat}
          setChartDataListHandler={setChartDataListHandler}
        />
        <AssetsFilter
          filters={AssetsFiltersRef.current}
          activeCat={activeCat}
          setChartDataListHandler={setChartDataListHandler}
        />
      </div>
      <Chart
        className="max-w-4xl m-auto pt-3"
        type="line"
        data={chartData}
        options={chartOptions}
      />
    </main>
  );
}
