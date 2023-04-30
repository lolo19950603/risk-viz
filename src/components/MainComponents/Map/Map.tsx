'use client';

import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import Leaflet from 'leaflet';
import ColorIndicator from './ColorIndicator/ColorIndicator';
import PopupList from './PopupList/PopupList';
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

type Asset = {
  id: string;
  name: string;
  location: number[];
  category: string;
  riskRating: string;
  riskFactor: { [key: string]: number };
  year: number;
};

export default function Map({assets, activeDecade}:{assets:Asset[], activeDecade:number}) {

  function riskRatingToColour(year : number) {
    var result:{[key: string]: { assets: any[]; rating: number }} = {}
    assets.forEach(asset => {
      if (asset.year === year) {
        const location:string = asset.location.toString()
        if (location in result) {
          result[location]['rating'] += Number(asset.riskRating)
          result[location]['assets'].push(asset)
        }
        else {
          result[location] = {assets:[asset], rating:Number(asset.riskRating)}
        }
      }
    })

    console.log(result)

    var answer:JSX.Element[] = []
    var icon:any

    Object.keys(result).map(key => {
      const calculation = (result[key]['rating'])/(result[key]['assets'].length);
      if (calculation < 0.45) {
        icon = Leaflet.icon({
          iconUrl: 'images/green.png',
          iconSize: [32, 32]
        })
      }
      if (0.45 <= calculation && calculation < 0.50) {
        icon = Leaflet.icon({
          iconUrl: 'images/yellow.png',
          iconSize: [32, 32]
        })
      }
      if (0.50 <= calculation && calculation < 0.55) {
        icon = Leaflet.icon({
          iconUrl: 'images/orange.png',
          iconSize: [32, 32]
        })
      }
      if (calculation >= 0.55) {
        console.log(calculation)
        icon = Leaflet.icon({
          iconUrl: 'images/red.png',
          iconSize: [32, 32]
        })
      }
      answer.push(
        <Marker key={key} position={[Number(key.split(",")[0]), Number(key.split(",")[1])]} icon={icon}>
          <PopupList assets={result[key]['assets']}/>
        </Marker>
      )
    })
    return answer
  }

  return (
    <main>
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