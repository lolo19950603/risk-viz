"use client"

import { useEffect, useState } from "react";
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import './AssetsTable.css';
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
  location: string,
  id: string,
  name: string,
  category: string,
  riskRating: Decimal,
  riskFactor: string
}

export default function AssetsTable({ assets, activeLocation }: { assets: AvgByDecades[]; activeLocation:number[] }) {
  const [first, setFirst] = useState(0);
  const [filters, setFilters] = useState({
    global: {value: '', matchMode: FilterMatchMode.CONTAINS},
    name: {operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.STARTS_WITH }]},
    location: {operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.CONTAINS }]},
    category: {operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.STARTS_WITH }]},
    riskRating: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.EQUALS }] },
    riskFactor: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.CONTAINS }] },
    year: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.EQUALS }] },
  })
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  function findDataByLocation(location:number[]) {
    if (location[0] === 0 && location[1] === 0) {
      const answer:AssetJsonStringify[] = []
      for (const data of assets) {
        // data.data.map(row => {
        //   return {year:row.year, location:row.location.toLocaleString(), id:row.id, name:row.name, category:row.category, riskRating:row.riskRating, riskFactor:JSON.stringify(row.riskFactor)}
        // })
        answer.push.apply(answer, data.data.map(row => {
          return {year:row.year, location:row.location.toLocaleString(), id:row.id, name:row.name, category:row.category, riskRating:row.riskRating, riskFactor:JSON.stringify(row.riskFactor)}
        }))
      }
      return answer
    }
    else if (location[0] === activeLocation[0] && location[1] === activeLocation[1]) {
      return assets.filter(asset => Number(asset.location[0]) === activeLocation[0] && Number(asset.location[1]) === activeLocation[1])[0].data
              .map(row => {
                return {year:row.year, location:row.location.toLocaleString(), id:row.id, name:row.name, category:row.category, riskRating:row.riskRating, riskFactor:JSON.stringify(row.riskFactor)}
              })
    }
  }

  useEffect(function() {setFirst(0)},[activeLocation])

  const initFilters = () => {
    setFilters({
      global: {value: '', matchMode: FilterMatchMode.CONTAINS},
      name: {operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.STARTS_WITH }]},
      location: {operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.CONTAINS }]},
      category: {operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.STARTS_WITH }]},
      riskRating: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.EQUALS }] },
      riskFactor: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.CONTAINS }] },
      year: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.EQUALS }] },
    });
  };

  const clearFilter = () => {
    initFilters();
    setGlobalFilterValue('')
  };

  const renderHeader = () => {
    return (
        <div className="flex justify-between">
            <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                    placeholder="Search All" 
                    value={globalFilterValue}
                    onInput={(e:React.FormEvent<HTMLInputElement>) => {
                      const value = e.currentTarget.value;
                      let _filters = { ...filters };
                      _filters['global'].value = value;
                      setFilters(_filters);
                      setGlobalFilterValue(value);
                      }
                    }
                  />
            </span>
        </div>
    );
};

  const header = renderHeader();

  return (
    <main className="mt-10">
      <DataTable
        filters={filters}
        header={header}
        value={findDataByLocation(activeLocation)}
        sortMode="multiple"
        stripedRows 
        tableStyle={{ minWidth: "50rem" }}
        showGridlines
        paginator
        rows={10}
        first={first}
        onPage={(e) => setFirst(e.first)}
      >
        <Column field="name" header="Name" filter filterPlaceholder="Search by name" sortable />
        <Column field="category" header="Category" filter filterPlaceholder="Search by category" sortable />
        <Column field="riskRating" header="Risk Rating" dataType="numeric" filter filterPlaceholder="Search by risk rating" sortable />
        <Column field="riskFactor" header="Risk Factor" filter filterPlaceholder="Search by risk factor"  sortable />
        <Column field="year" header="Year" dataType="numeric" filter filterPlaceholder="Search by year" sortable />
        <Column field="location" header="Location" filter filterPlaceholder="Search by location" sortable />
      </DataTable>
    </main>
  );
}
