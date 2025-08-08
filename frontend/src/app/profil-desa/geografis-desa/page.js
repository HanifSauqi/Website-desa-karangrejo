// file: frontend/src/app/profil-desa/geografi-desa/page.js
import Image from "next/image";
import { daftarPeta } from "@/data/petaGeografi";
import { FaDownload } from 'react-icons/fa';

export const metadata = {
  title: 'Geografi Desa - Desa Karangrejo',
  description: 'Peta-peta wilayah Desa Karangrejo.',
};

// Komponen untuk satu kartu peta
const PetaCard = ({ peta }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col">
      {/* --- BAGIAN YANG DIPERBAIKI --- */}
      {/* Tambahkan 'relative' dan latar belakang untuk placeholder */}
      <div className="relative w-full h-56 bg-gray-100">
        {peta.previewImageUrl ? (
          <Image 
            src={peta.previewImageUrl}
            alt={peta.title}
            fill // Gunakan 'fill' sebagai pengganti 'layout="fill"'
            className="object-cover" // Gunakan className untuk object-fit
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500">Pratinjau tidak tersedia</p>
          </div>
        )}
      </div>
      {/* --- AKHIR BAGIAN YANG DIPERBAIKI --- */}
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-800 text-lg flex-grow">{peta.title}</h3>
        <a 
          href={peta.pdfUrl} 
          download 
          className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 w-full"
        >
          <FaDownload />
          <span>Unduh PDF</span>
        </a>
      </div>
    </div>
  );
};


export default function GeografiDesaPage() {
  return (
    <main className="pt-24 md:pt-32 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Geografi Desa</h1>
            <p className="text-gray-600 mt-2">Galeri peta wilayah administratif dan tematik Desa Karangrejo.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {daftarPeta.map((peta, index) => (
            <PetaCard key={index} peta={peta} />
          ))}
        </div>
      </div>
    </main>
  );
}