// file: frontend/src/components/batas-desa/LokasiPentingLayer.js
'use client';

import { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { getCustomIcon } from '@/utils/getIcon'; // <-- 1. Impor fungsi dari utils

// 2. HAPUS SELURUH FUNGSI getCustomIcon DARI SINI

function LokasiPentingLayer() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    fetch("/batas-desa.geojson")
      .then((response) => response.json())
      .then((data) => {
        const pointFeatures = data.features.filter(
          (feature) => feature.geometry.type === "Point"
        );
        setPoints(pointFeatures);
      })
      .catch((error) =>
        console.error("Gagal memuat GeoJSON untuk titik:", error)
      );
  }, []);

  return (
    <>
      {points.map((point, index) => (
        <Marker 
          key={`point-${index}`} 
          position={[
            point.geometry.coordinates[1],
            point.geometry.coordinates[0],
          ]}
          // 3. Fungsi ini sekarang diimpor dari luar, tidak ada perubahan lain di sini
          icon={getCustomIcon(point.properties.Field1)}
        >
          <Popup>
            <b>{point.properties.Field1}</b>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export default LokasiPentingLayer;