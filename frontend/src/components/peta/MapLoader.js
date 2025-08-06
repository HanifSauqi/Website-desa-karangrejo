// file: frontend/src/components/peta/MapLoader.js
'use client';

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css'; // <-- 1. CSS Leaflet diimpor langsung di sini
import L from 'leaflet';

// --- 2. Perbaikan Ikon Diletakkan Langsung di Sini ---
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Kode ini memberitahu Leaflet di mana menemukan file ikonnya
L.Icon.Default.mergeOptions({
  iconUrl: iconUrl.src,
  iconRetinaUrl: iconRetinaUrl.src,
  shadowUrl: shadowUrl.src,
});
// --- Akhir Perbaikan Ikon ---

// Dynamic import untuk komponen peta utama tetap sama
const MapWithNoSSR = dynamic(
    () => import('@/components/peta/InteractiveMap'), 
    {
        ssr: false,
        loading: () => (
            <div style={{ height: '500px' }} className="flex justify-center items-center bg-gray-100 rounded-lg">
                <p className="text-gray-500">Memuat Peta...</p>
            </div>
        )
    }
);

// Komponen ini menerima props dan meneruskannya ke peta
export default function MapLoader({ locations, center, zoom }) {
    return <MapWithNoSSR locations={locations} center={center} zoom={zoom} />;
}