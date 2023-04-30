import { Popup } from "react-leaflet";

export default function PopupList({ assets }: { assets: any[] }) {
  const list = assets.map((asset) => <li key={asset.id}>{asset.name} - {asset.category}</li>);
  return (
    <Popup>
      <ul className="h-48 overflow-auto">{list}</ul>
    </Popup>
  );
}
