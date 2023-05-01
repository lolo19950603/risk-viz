import { Popup } from "react-leaflet";
import { DataTable } from "primereact/datatable"
import {Column} from "primereact/column"

export default function PopupList({ assets }: { assets: any[] }) {
  return (
    <Popup>
      <DataTable className="h-48 overflow-auto" value={assets}>
        <Column field="name" header="Name" />
        <Column field="category" header="Category" />
      </DataTable>
    </Popup>
  );
}
