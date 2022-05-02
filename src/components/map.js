import React, { Component } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import kiteData from "../data/kite-locations.json"
import { added } from "../scripts/favoriteScripts";
import { removed } from "../scripts/favoriteScripts";

const bounds = [[85,0],[-85,0],[0,180],[0,-180]]
class Harta extends Component {
  render() {
    return (
      <MapContainer center={[0, 0]} zoom={5} minZoom={3} maxBounds={bounds}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {kiteData.map((kite) => (
          <Marker key={kite.id} position={[kite.lat, kite.long]}>
            <Popup>
              <h3 className="name">{kite.name}</h3>
              <h3 className="subs">{kite.country}</h3>
              <br></br>
              <h3 className="subs">WIND PROBABILITY</h3>
              <h3>{kite.probability}%</h3>
              <br></br>
              <h3 className="subs">LATITUDE</h3>
              <h3>{kite.lat}° N</h3>
              <br></br>
              <h3 className="subs">LONGITUDE</h3>
              <h3>{kite.long}° W</h3>
              <br></br>
              <h3 className="subs">WHEN TO GO</h3>
              <h3>{kite.month}</h3>
              <button id="addFav" className="addFavBtn" onClick={added}>+ Add to favorites</button>
              <button id="removeFav" className="remFav" onClick={removed}>- Remove from favorites</button>
            </Popup>
            
          </Marker>
        ))}
      </MapContainer>
    );
  }
}

export default Harta;
