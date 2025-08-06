// file: frontend/src/components/home/GaleriPreview.js
'use client';

import Link from "next/link";
import Image from "next/image";
import { dataGaleri } from "@/data/galeri";
import { useInView } from "react-intersection-observer";

const GaleriPreview = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  // Ambil 5 foto pertama untuk layout yang menarik
  const previewGaleri = dataGaleri.slice(0, 5);

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className={`container mx-auto px-6 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Galeri Kegiatan</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Momen-momen berharga dari berbagai kegiatan di desa kami.</p>
        </div>

        {/* Grid Asimetris yang Modern */}
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[300px] md:h-[500px]">
          {previewGaleri.map((foto, index) => {
            let gridClass = '';
            // Gambar pertama (index 0) dibuat paling besar
            if (index === 0) {
              gridClass = 'col-span-2 row-span-2';
            }
            
            return (
              <div key={foto.id} className={`relative rounded-lg overflow-hidden group shadow-lg ${gridClass}`}>
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  layout="fill"
                  objectFit="cover"
                  className="transform transition-transform duration-500 group-hover:scale-110"
                />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300"></div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/galeri" className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-transform duration-300 hover:scale-105 shadow-md">
            Lihat Galeri Lengkap
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GaleriPreview;