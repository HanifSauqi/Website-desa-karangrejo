// file: frontend/src/components/home/GaleriPreview.js
'use client';

import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

const GaleriPreview = ({ data }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const previewGaleri = data || [];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className={`container mx-auto px-6 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Galeri Kegiatan</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Momen-momen berharga dari berbagai kegiatan di desa kami.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[300px] md:h-[500px]">
          {previewGaleri.length > 0 ? (
            previewGaleri.map((foto, index) => {
              let gridClass = '';
              if (index === 0) gridClass = 'col-span-2 row-span-2';
              return (
                <div key={foto._id} className={`relative rounded-lg overflow-hidden group shadow-lg ${gridClass}`}>
                  <Image
                    src={foto.imageUrl}
                    alt={foto.alt}
                    fill
                    className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300"></div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full row-span-full flex items-center justify-center bg-gray-100 rounded-lg">
                <p className="text-gray-500">Belum ada foto di galeri.</p>
            </div>
          )}
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