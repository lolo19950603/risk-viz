import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";

type Asset = {
  id: string;
  name: string;
  location: number[];
  category: string;
  riskRating: string;
  riskFactor: { [key: string]: number };
  year: number;
};

export default function AssetsTable({ assets }: { assets: Asset[] }) {
  const list = assets.map((asset) => (
    <li key={asset.id}>
      {asset.name} - {asset.category}
    </li>
  ));
  return (
    <DataTable
      value={assets}
      sortMode="multiple"
      stripedRows 
      tableStyle={{ minWidth: "50rem" }}
      paginator
      rows={20}
      rowsPerPageOptions={[5, 10, 25, 50]}
    >
      <Column field="name" header="Name" sortable />
      <Column field="location" header="Location" sortable />
      <Column field="category" header="Category" sortable />
      <Column field="riskRating" header="Risk Rating" sortable />
      {/* <Column field="riskFactor" header="Risk Factor" /> */}
    </DataTable>
  );
}
