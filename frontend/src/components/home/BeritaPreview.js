// file: frontend/src/components/home/BeritaPreview.js
'use client';

import Link from "next/link";
import BeritaCard from "../berita/BeritaCard"; // Pastikan path ini benar
import { useInView } from "react-intersection-observer";

const BeritaPreview = ({ data }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const previewBerita = data || [];

  return (
    <section ref={ref} className="py-20 bg-slate-50">
      <div className={`container mx-auto px-6 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Berita Terkini</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Ikuti informasi dan kegiatan terbaru yang berlangsung di Desa Karangrejo.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewBerita.length > 0 ? (
            previewBerita.map(post => <BeritaCard key={post._id} post={post} />)
          ) : (
            <p className="col-span-3 text-center text-gray-500">Belum ada berita untuk ditampilkan.</p>
          )}
        </div>
        <div className="text-center mt-12">
          <Link href="/berita" className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-transform duration-300 hover:scale-105 shadow-md">
            Lihat Semua Berita
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BeritaPreview;