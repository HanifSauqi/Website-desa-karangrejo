'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

// Komponen MapLoader dan UmkmList di-load secara dinamis
const MapLoader = dynamic(() => import('@/components/peta/MapLoader'), { 
    ssr: false,
    loading: () => <div className="h-[500px] bg-gray-200 flex justify-center items-center"><p>Memuat Peta...</p></div>
});
const UmkmList = dynamic(() => import('@/components/umkm/UmkmList'), {
    ssr: false,
    loading: () => <p className="text-center py-16">Memuat daftar UMKM...</p>
});

export default function UMKMClientPage() {
  const [umkmData, setUmkmData] = useState([]); // State untuk menyimpan data dari API
  const [loading, setLoading] = useState(true);

  // useEffect untuk mengambil data saat komponen dimuat
  useEffect(() => {
    const fetchUmkm = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/umkm`);
        setUmkmData(res.data);
      } catch (error) {
        console.error("Gagal mengambil data UMKM", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUmkm();
  }, []); // Array kosong berarti ini hanya berjalan sekali

  const mapCenter = [-8.0878, 111.1370]; 
  const mapZoom = 15;

  if (loading) {
      return <p className="text-center py-16">Memuat data UMKM...</p>;
  }

  return (
    <>
      <div className="container mx-auto px-6 h-[500px] rounded-lg overflow-hidden shadow-lg">
          {/* Berikan data dari state ke komponen */}
          <MapLoader locations={umkmData} center={mapCenter} zoom={mapZoom} />
      </div>
      {/* Berikan data dari state ke komponen */}
      <UmkmList locations={umkmData} />
    </>
  );
}