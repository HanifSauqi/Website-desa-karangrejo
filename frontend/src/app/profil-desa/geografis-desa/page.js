// file: frontend/src/app/profil-desa/geografi-desa/page.js
import Image from "next/image";
import { daftarPeta } from "@/data/petaGeografi";
import { FaDownload } from 'react-icons/fa';

export const metadata = {
  title: 'Geografis Desa - Desa Karangrejo',
  description: 'Peta-peta wilayah Desa Karangrejo.',
};

// Komponen untuk satu kartu peta dengan style baru
const PetaCard = ({ peta }) => {
  return (
    // Efek hover: bayangan membesar dan kartu sedikit terangkat
    <div className="bg-white rounded-xl shadow-md border border-gray-200 flex flex-col group transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2">
      <div className="relative w-full h-56 overflow-hidden rounded-t-xl">
        {/* Gambar pratinjau */}
        <div className="absolute w-full h-full bg-gray-100">
          {peta.previewImageUrl ? (
            <Image 
              src={peta.previewImageUrl}
              alt={peta.title}
              layout="fill"
              objectFit="cover"
              // Efek gambar: sedikit membesar saat kartu di-hover
              className="transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500">Pratinjau tidak tersedia</p>
            </div>
          )}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-800 text-lg flex-grow mb-4">{peta.title}</h3>
        <a 
          href={peta.pdfUrl} 
          download 
          className="mt-auto bg-blue-600 text-white font-semibold py-2.5 px-5 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 w-full shadow-md hover:shadow-lg transform hover:scale-105"
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
    <main className="pt-24 md:pt-32 pb-16 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
            {/* Judul dengan efek gradien */}
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text bg-gradient-to-r text-gray-800">
              Geografis Desa  
            </h1>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Galeri peta wilayah administratif dan tematik Desa Karangrejo. Klik untuk mengunduh versi resolusi tinggi.
            </p>
        </div>

        {/* Galeri Peta dengan grid yang lebih responsif */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {daftarPeta.map((peta, index) => (
            <PetaCard key={index} peta={peta} />
          ))}
        </div>
      </div>
    </main>
  );
}