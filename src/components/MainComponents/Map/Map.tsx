'use client';

import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
import Leaflet from 'leaflet';
import ColorIndicator from './ColorIndicator/ColorIndicator';
import PopupList from './PopupList/PopupList';
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import type { Asset } from '@prisma/client'

type AvgByDecades = {
  avg: string,
  year: number,
  location: number[],
  data: Asset[]
}

export default function Map({assets, setActiveLocation, setActiveLocationHandler }:{assets:AvgByDecades[], setActiveLocation:Function; setActiveLocationHandler:Function }) {
  
  function LocationMarker() {
    const map = useMapEvents({
      click() {
        setActiveLocation([0,0])
      }
    });
    return null
  }

  const mapData:Function = function () {
    const data:JSX.Element[] = []
    assets.forEach(locationData => {
      var icon:any
      if (Number(locationData.avg) < 0.45) {
        icon = Leaflet.icon({
          iconUrl: 'images/green.png',
          iconSize: [32, 32]
        })
      }
      else if (0.45 <= Number(locationData.avg) && Number(locationData.avg) < 0.5) {
        icon = Leaflet.icon({
          iconUrl: 'images/yellow.png',
          iconSize: [32, 32]
        })
      }
      else if (0.50 <= Number(locationData.avg) && Number(locationData.avg) < 0.55) {
        icon = Leaflet.icon({
          iconUrl: 'images/orange.png',
          iconSize: [32, 32]
        })
      }
      else if (Number(locationData.avg) >= 0.55) {
        icon = Leaflet.icon({
          iconUrl: 'images/red.png',
          iconSize: [32, 32]
        })
      }
      const location:number[] = [Number(locationData.location[0]), Number(locationData.location[1])];
      data.push(
        <Marker eventHandlers={{click: (e) => setActiveLocationHandler(location)}} key={locationData.location.toString()} position={[Number(locationData.location[0]), Number(locationData.location[1])]} icon={icon}>
          <PopupList assets={locationData.data}/>
        </Marker>

      )
    })
    return data;
  }

  return (
    <main>
      <ColorIndicator/>
      <MapContainer center={[50.1304,-98.3468]} zoom={3} scrollWheelZoom={false} style={{width: '100%', height: '60vh'}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapData()}
        <LocationMarker/>
      </MapContainer>
    </main>
  )
}