// file: frontend/src/components/peta/InteractiveMap.js
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const InteractiveMap = ({ locations, center, zoom }) => {
  return (
    <MapContainer 
        center={center || [-8.087, 111.137]} // Default center jika tidak disediakan
        zoom={zoom || 15}                   // Default zoom jika tidak disediakan
        style={{ height: '100%', width: '100%' }} 
        className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((loc) => (
        <Marker key={loc.id} position={loc.position}>
          <Popup>
            <h3 className="font-bold">{loc.name}</h3>
            <p>{loc.category || loc.description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default InteractiveMap;