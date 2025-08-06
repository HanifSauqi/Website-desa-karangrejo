// file: frontend/src/components/home/PotensiPreview.js
'use client';

import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const PotensiCard = ({ title, description, imageUrl, linkUrl, delay }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
    return (
        <Link href={linkUrl}>
            <div ref={ref} className={`relative rounded-xl overflow-hidden h-96 group shadow-lg transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: `${delay}ms`}}>
                <Image
                    src={imageUrl}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white">{title}</h3>
                    <p className="text-gray-200 mt-1">{description}</p>
                </div>
            </div>
        </Link>
    );
};


const PotensiPreview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Potensi Desa</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Jelajahi keunggulan UMKM, pesona pariwisata, dan potensi peternakan Desa Karangrejo.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PotensiCard 
                title="UMKM Unggulan"
                description="Produk lokal berkualitas dari warga."
                imageUrl="/images/berita/umkm-pelatihan.jpg"
                linkUrl="/potensi-desa/umkm"
                delay={100}
            />
            <PotensiCard 
                title="Pariwisata Alam"
                description="Nikmati keindahan alam yang asri."
                imageUrl="/images/pariwisata/coban-rondo.jpg"
                linkUrl="/potensi-desa/pariwisata/pemandian-banyu-anget"
                delay={200}
            />
            <PotensiCard 
                title="Peternakan"
                description="Salah satu pilar ekonomi desa."
                imageUrl="/images/galeri/kegiatan-1.jpg" // Ganti dengan foto ternak
                linkUrl="/potensi-desa/peternakan"
                delay={300}
            />
        </div>
      </div>
    </section>
  );
};

export default PotensiPreview;