// file: frontend/src/components/galeri/FotoGaleri.js
'use client';

import { useState } from 'react';
// HAPUS -> import { dataGaleri } from '@/data/galeri';
import Image from 'next/image';
import { FaSearchPlus, FaTimes } from 'react-icons/fa';

// Komponen sekarang menerima 'photos' sebagai props
const FotoGaleri = ({ photos }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Jika tidak ada foto, tampilkan pesan
  if (!photos || photos.length === 0) {
    return <p className="text-center text-gray-500">Tidak ada foto di galeri saat ini.</p>;
  }

  return (
    <>
      {/* Grid untuk menampilkan semua foto */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Gunakan data 'photos' dari props */}
        {photos.map((foto) => (
          <div 
            key={foto._id || foto.id} // Gunakan _id dari database atau id dari data statis
            className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
            onClick={() => setSelectedImage(foto.imageUrl || foto.src)}
          >
            <Image
              src={foto.imageUrl || foto.src}
              alt={foto.alt}
              fill
              className="object-cover transform transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
          className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)} // Klik di luar gambar untuk menutup
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <Image
              src={selectedImage}
              alt="Tampilan Penuh"
              width={1920}
              height={1080}
              className="object-contain w-auto h-auto max-h-[90vh] rounded-lg"
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