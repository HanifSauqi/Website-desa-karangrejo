// file: frontend/src/app/potensi-desa/umkm/page.js

import { umkmData } from '@/data/umkm';
import UmkmList from '@/components/umkm/UmkmList';
import MapLoader from '@/components/peta/MapLoader';

export const metadata = {
  title: 'UMKM - Desa Karangrejo',
  description: 'Dukung dan temukan produk unggulan dari UMKM di Desa Karangrejo.',
};

export default function UmkmPage() {
  const mapCenter = [-8.0878, 111.1370]; 
  const mapZoom = 15;

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