// file: frontend/src/app/potensi-desa/umkm/page.js
'use client'; 

import UmkmList from '@/components/umkm/UmkmList';
import MapLoader from '@/components/peta/MapLoader';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UmkmPage() {
  const [umkmData, setUmkmData] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  const mapCenter = [-8.0878, 111.1370]; 
  const mapZoom = 15;

  if (loading) {
    return <p className="pt-32 text-center">Memuat data UMKM...</p>;
  }

  return (
    <main className="pt-24 md:pt-32">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Peta Potensi UMKM Desa</h1>
            <p className="text-gray-600 mb-8">
            Temukan lokasi para pelaku UMKM di Desa Karangrejo.
            </p>
        </div>
        <div className="container mx-auto px-6 h-[500px] rounded-lg overflow-hidden shadow-lg">
            <MapLoader locations={umkmData} center={mapCenter} zoom={mapZoom} />
        </div>
        <UmkmList locations={umkmData} />
    </main>
  );
}