"use client"

import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import type { Asset } from '@prisma/client'

type AvgByDecades = {
  avg: string,
  year: number,
  location: number[],
  data: Asset[]
}

export default function AssetsTable({ assets, activeLocation }: { assets: AvgByDecades[]; activeLocation:number[] }) {

  const [filters, setFilter] = useState({
    global: {value: '', matchMode: FilterMatchMode.CONTAINS},
  })

  function findDataByLocation(location:number[]) {
    if (location[0] === 0 && location[1] === 0) {
      const answer:Asset[] = []
      for (const data of assets) {
        answer.push.apply(answer, data.data)
      }
      return answer
    }
    else if (location[0] === activeLocation[0] && location[1] === activeLocation[1]) {
      for (const data of assets) {
        if (Number(data.location[0]) === activeLocation[0] && Number(data.location[1]) === activeLocation[1]) {
          return data.data
        }
      }
    }
  }

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
        // rowsPerPageOptions={[5, 10, 25, 50]}
        totalRecords={11}
      >
        <Column field="name" header="Name" sortable />
        <Column field="location" header="Location" sortable />
        <Column field="category" header="Category" sortable />
        <Column field="riskRating" header="Risk Rating" sortable />
        {/* <Column field="riskFactor" header="Risk Factor" /> */}
      </DataTable>
    </main>
  );
}
