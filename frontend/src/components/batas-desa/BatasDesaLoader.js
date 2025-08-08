// file: frontend/src/components/batas-desa/BatasDesaLoader.js

'use client'; // <-- WAJIB! Ini menandakan file ini adalah Client Component

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css'; // <-- 1. TAMBAHKAN ATAU PASTIKAN BARIS INI ADA

// Pindahkan logika dynamic import ke sini
const BatasDesaMap = dynamic(() => import('@/components/batas-desa/BatasDesaMap'), {
    ssr: false,
    // Kita bisa pindahkan juga styling untuk loading ke sini
    loading: () => <div className="h-full w-full bg-gray-200 flex justify-center items-center"><p>Memuat Peta...</p></div>
});

export default function BatasDesaLoader() {
    // Komponen ini hanya merender peta yang sudah di-load
    return <BatasDesaMap />;
}