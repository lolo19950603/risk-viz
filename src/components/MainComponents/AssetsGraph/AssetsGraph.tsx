"use client"

import { Chart } from 'primereact/chart';
import { useState, useEffect } from "react"
import type { Asset } from '@prisma/client'

type AvgByDecades = {
    avg: string,
    year: number,
    location: number[],
    data: Asset[]
  }

export default function AssetsGraph({ assets, labels, activeDecade, activeLocation }: { assets: AvgByDecades[], labels:number[], activeDecade:number, activeLocation:number[] }) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const dataList:number[] = assets.filter(asset => Number(asset.location[0]) === activeLocation[0] && Number(asset.location[1]) === activeLocation[1]).map(asset => Number(asset.avg))
    const data = {
      labels: labels,
      datasets: [
          {
              label: `LOCATION : [${activeLocation[0]}, ${activeLocation[1]}]`,
              data: dataList,
              fill: false,
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              tension: 0.4
          }
      ]
  };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder
              }
          },
          y: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder
              }
          }
      }
  };
  setChartOptions(options);
  setChartData(data)
  }, [activeLocation]);

  return (
    <Chart type="line" data={chartData} options={chartOptions} />
  )
}