"use client"

import { Chart } from 'primereact/chart';
import { useState, useEffect } from "react"
import type { Asset } from '@prisma/client'

// type Asset = {
//     id: string;
//     name: string;
//     location: number[];
//     category: string;
//     riskRating: string;
//     riskFactor: { [key: string]: number };
//     year: number;
//   };

export default function AssetsGraph({ assets, labels, activeDecade }: { assets: Asset[], labels:number[], activeDecade:number }) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const data = {
      labels: labels,
      datasets: [
          {
              label: {activeDecade},
              data: [65, 59, 80, 81, 56, 55, 40],
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
  }, []);

  return (
    <Chart type="line" data={chartData} options={chartOptions} />
  )
}