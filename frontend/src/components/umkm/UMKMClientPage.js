// file: frontend/src/components/umkm/UMKMClientPage.js
'use client'; // <-- Kunci utama, hanya file ini yang ditandai 'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import MapLoader from '@/components/peta/MapLoader';
import UmkmList from '@/components/umkm/UmkmList';

export default function UMKMClientPage() {
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
    return <p className="text-center py-16">Memuat data dan peta UMKM...</p>;
  }

  return (
    <>
      <div className="container mx-auto px-6 h-[500px] rounded-lg overflow-hidden shadow-lg">
          <MapLoader locations={umkmData} center={mapCenter} zoom={mapZoom} />
      </div>
      <UmkmList locations={umkmData} />
    </>
  );
}