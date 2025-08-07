'use client';

import dynamic from 'next/dynamic';
import { umkmData } from '@/data/umkm';

// Dynamic import untuk komponen peta
const MapLoader = dynamic(() => import('@/components/peta/MapLoader'), { 
    ssr: false,
    loading: () => <div className="h-[500px] bg-gray-200 flex justify-center items-center"><p>Memuat Peta...</p></div>
});

// Dynamic import untuk daftar UMKM
const UmkmList = dynamic(() => import('@/components/umkm/UmkmList'), {
    ssr: false,
    loading: () => <p className="text-center py-16">Memuat daftar UMKM...</p>
});

export default function UMKMClientPage() {
  const mapCenter = [-8.0878, 111.1370]; 
  const mapZoom = 15;

  return (
    <>
      <div className="container mx-auto px-6 h-[500px] rounded-lg overflow-hidden shadow-lg">
          <MapLoader locations={umkmData} center={mapCenter} zoom={mapZoom} />
      </div>
      <UmkmList locations={umkmData} />
    </>
  );
}