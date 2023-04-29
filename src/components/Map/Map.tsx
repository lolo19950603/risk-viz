'use client';

// build map that shows more marker when zoom in

import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import { useState, useEffect, useRef } from 'react';
import DecadeFilter from '../../components/DecadeFilter/DecadeFilter'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

export default function Map({data}:{data:any[]}) {
  const [assets, setAssets] = useState<any[]>([]);
  const [activeDecade, setActiveDecade] = useState(0);

  const decadeFiltersRef = useRef<number[]>([]);

  useEffect(function() {
    async function getAssets() {
      decadeFiltersRef.current = [...new Set(data.map(asset => asset.year))].sort();
      setActiveDecade(decadeFiltersRef.current[0]);
      setAssets(data)
    }
    getAssets();
  }, []);

  function riskRatingToColour(rating : number) {
    
  }
  
  return (
    <main>
      <DecadeFilter
        filters={decadeFiltersRef.current}
        activeDecade={activeDecade}
        setActiveDecade={setActiveDecade}
      />
      <MapContainer center={[50.1304,-98.3468]} zoom={3} scrollWheelZoom={false} style={{width: '100%', height: '80vh'}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {assets.map((asset) => {
          if (asset.year === activeDecade) {
            return (
              <Marker key={asset.id} position={[asset.lat, asset.long]}>
                {/* <Popup>{asset.id+","+asset.lat +","+ asset.long}</Popup> */}
              </Marker>
            )
          }
        })}
      </MapContainer>
    </main>
  )
}