// file: frontend/src/components/batas-desa/FasilitasLoader.js

'use client'; // <-- WAJIB! Ini menandakan file ini adalah Client Component

import dynamic from 'next/dynamic';

// Pindahkan logika dynamic import ke sini
const FasilitasUmum = dynamic(
    () => import('@/components/batas-desa/FasilitasUmum'),
    { 
        ssr: false,
        loading: () => <p className="text-center">Memuat fasilitas...</p> 
    }
);

export default function FasilitasLoader() {
    // Komponen ini hanya merender FasilitasUmum yang sudah di-load
    return <FasilitasUmum />;
}