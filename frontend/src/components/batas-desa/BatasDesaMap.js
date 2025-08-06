// file: frontend/src/components/batas-desa/BatasDesaMap.js
'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import LokasiPentingLayer from './LokasiPentingLayer'; 

// Fungsi untuk memilih warna berdasarkan nama Dusun
function getColor(dusunName) {
  switch (dusunName) {
    case 'Ringin Putih': return '#a2f2e8'; // Cyan
    case 'Wonosari': return '#ffc0cb'; // Pink
    case 'Trobakal': return '#add8e6'; // Biru Muda
    case 'Pringapus': return '#fafa96'; // Kuning
    case 'Krajan': return '#fdd700'; // Kuning tua
    case 'Brungkah': return '#ffcccb'; // Merah Muda
    default: return '#cccccc'; // Abu-abu jika tidak ada
  }
}

function BatasDesaMap() {
  const [polygonData, setPolygonData] = useState(null);

  useEffect(() => {
    fetch('/batas-desa.geojson')
      .then(response => response.json())
      .then(data => {
        // Filter untuk hanya mengambil fitur dengan tipe 'Polygon'
        const filteredPolygons = {
          ...data,
          features: data.features.filter(feature => feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon')
        };
        setPolygonData(filteredPolygons);
      })
      .catch(error => console.error("Gagal memuat GeoJSON poligon:", error));
  }, []);
      
  const styleFeature = (feature) => {
    return {
      fillColor: getColor(feature.properties.Dusun),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
    };
  };

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.Dusun) {
      layer.bindTooltip(feature.properties.Dusun, {
        permanent: true,
        direction: 'center',
        className: 'dusun-label'
      });
    }
  };

  return (
    <MapContainer
      center={[-8.079, 111.135]} // Titik tengah desa Karangrejo
      zoom={14}
      style={{ height: '100%', width: '100%' }}
        className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Layer untuk poligon batas dusun */}
      {polygonData && (
        <GeoJSON 
          data={polygonData} 
          style={styleFeature}
          onEachFeature={onEachFeature}
        />
      )}

      {/* Layer untuk marker lokasi penting */}
      <LokasiPentingLayer />

    </MapContainer>
  );
}

export default BatasDesaMap;