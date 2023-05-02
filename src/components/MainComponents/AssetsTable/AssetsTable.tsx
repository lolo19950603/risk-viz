"use client"

import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from 'primereact/button';
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import type { Asset } from '@prisma/client'
import { Decimal } from "@prisma/client/runtime";

type AvgByDecades = {
  avg: string,
  year: number,
  location: number[],
  data: Asset[]
}


type AssetJsonStringify = {
  year: number,
  location: Decimal[],
  id: string,
  name: string,
  category: string,
  riskRating: Decimal,
  riskFactor: string
}

export default function AssetsTable({ assets, activeLocation }: { assets: AvgByDecades[]; activeLocation:number[] }) {
  const [first, setFirst] = useState(0);
  const [filters, setFilter] = useState({
    global: {value: '', matchMode: FilterMatchMode.CONTAINS},
  })

  function findDataByLocation(location:number[]) {
    if (location[0] === 0 && location[1] === 0) {
      const answer:AssetJsonStringify[] = []
      for (const data of assets) {
        data.data.map(row => {
          return {year:row.year, location:row.location, id:row.id, name:row.name, category:row.category, riskRating:row.riskRating, riskFactor:JSON.stringify(row.riskFactor)}
        })
        answer.push.apply(answer, data.data.map(row => {
          return {year:row.year, location:row.location, id:row.id, name:row.name, category:row.category, riskRating:row.riskRating, riskFactor:JSON.stringify(row.riskFactor)}
        }))
      }
      return answer
    }
    else if (location[0] === activeLocation[0] && location[1] === activeLocation[1]) {
      return assets.filter(asset => Number(asset.location[0]) === activeLocation[0] && Number(asset.location[1]) === activeLocation[1])[0].data
              .map(row => {
                return {year:row.year, location:row.location, id:row.id, name:row.name, category:row.category, riskRating:row.riskRating, riskFactor:JSON.stringify(row.riskFactor)}
              })
    }
  }

  useEffect(function() {setFirst(0)},[activeLocation])

  return (
    <main>
      <InputText
        onInput={(e:React.FormEvent<HTMLInputElement>) => 
          setFilter({
            global: { value: e.currentTarget.value, matchMode: FilterMatchMode.CONTAINS}
          })
        }
      />
      <DataTable
        filters={filters}
        value={findDataByLocation(activeLocation)}
        sortMode="multiple"
        stripedRows 
        tableStyle={{ minWidth: "50rem" }}
        paginator
        rows={20}
        first={first}
        onPage={(e) => setFirst(e.first)}
        // rowsPerPageOptions={[5, 10, 25, 50]}
        // totalRecords={11}
      >
        <Column field="name" header="Name" sortable />
        <Column field="location" header="Location" sortable />
        <Column field="category" header="Category" sortable />
        <Column field="riskRating" header="Risk Rating" sortable />
        <Column field="riskFactor" header="Risk Factor" sortable />
        <Column field="year" header="Year" sortable />
      </DataTable>
    </main>
  );
}
