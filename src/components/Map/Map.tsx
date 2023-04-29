'use client';

// build map that shows more marker when zoom in

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import { useState, useEffect, useRef } from 'react';
import DecadeFilter from '../DecadeFilter/DecadeFilter';
import ColorIndicator from '../ColorIndicator/ColorIndicator'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

export default function Map({data}:{data:any[]}) {
  type activeDecadeLocationType = {[key: string]: number}
  const [assets, setAssets] = useState<any[]>([]);
  const [activeDecade, setActiveDecade] = useState(0);
  // const [activeDecadeLocation, setActiveDecadeLocation] = useState<activeDecadeLocationType>({});
  const decadeFiltersRef = useRef<number[]>([]);

  function riskRatingToColour(year : number) {
    var count:{[key: string]: number} = {}
    data.forEach(asset => {
      if (asset.year === year) {
        const location:string = [asset.lat, asset.long].toString()
        if (location in count) {
          count[location] += Number(asset.riskRating)
        }
        else {
          count[location] = Number(asset.riskRating)
        }
      }
    })
    
    var answer:JSX.Element[] = []
    var icon:any

    Object.keys(count).map(key => {
      if (count[key] < 40) {
        icon = Leaflet.icon({
          iconUrl: 'images/30-40green.png',
          iconSize: [32, 32]
        })
      }
      if (40 <= count[key] && count[key] < 50) {
        icon = Leaflet.icon({
          iconUrl: 'images/40-50yellow.png',
          iconSize: [32, 32]
        })
      }
      if (count[key] >= 50) {
        icon = Leaflet.icon({
          iconUrl: 'images/50-60red.png',
          iconSize: [32, 32]
        })
      }
      answer.push(
        <Marker key={key} position={[Number(key.split(",")[0]), Number(key.split(",")[1])]} icon={icon}>
          <Popup>Total Rating: {count[key]}</Popup>
        </Marker>
      )
    })
    return answer
  }

  useEffect(function() {
    async function getAssets() {
      decadeFiltersRef.current = [...new Set(data.map(asset => asset.year))].sort();
      setActiveDecade(decadeFiltersRef.current[0]);
      setAssets(data)
    }
    getAssets();
  }, []);

  return (
    <main>
      <DecadeFilter
        filters={decadeFiltersRef.current}
        activeDecade={activeDecade}
        setActiveDecade={setActiveDecade}
      />
      <ColorIndicator/>
      <MapContainer center={[50.1304,-98.3468]} zoom={3} scrollWheelZoom={false} style={{width: '100%', height: '80vh'}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {riskRatingToColour(activeDecade)}
      </MapContainer>
    </main>
  )
}