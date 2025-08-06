// file: frontend/src/components/galeri/FotoGaleri.js
'use client';

import { useState } from 'react';
import { dataGaleri } from '@/data/galeri';
import Image from 'next/image';
import { FaSearchPlus, FaTimes } from 'react-icons/fa';

const FotoGaleri = () => {
  // State untuk menyimpan gambar yang sedang dipilih untuk ditampilkan di Lightbox
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      {/* Grid untuk menampilkan semua foto */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dataGaleri.map((foto) => (
          <div 
            key={foto.id}
            className="relative rounded-lg overflow-hidden group cursor-pointer"
            onClick={() => setSelectedImage(foto.src)}
          >
            <Image
              src={foto.src}
              alt={foto.alt}
              width={500}
              height={500}
              className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110"
            />
            {/* Overlay yang muncul saat hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex justify-center items-center">
              <FaSearchPlus className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Modal untuk menampilkan gambar yang diperbesar */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center p-4"
          onClick={() => setSelectedImage(null)} // Klik di luar gambar untuk menutup
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <Image
              src={selectedImage}
              alt="Tampilan Penuh"
              width={1920}
              height={1080}
              className="object-contain w-auto h-auto max-h-[90vh]"
            />
          </div>
          <button 
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            <FaTimes />
          </button>
        </div>
      )}
    </>
  );
};

export default FotoGaleri;