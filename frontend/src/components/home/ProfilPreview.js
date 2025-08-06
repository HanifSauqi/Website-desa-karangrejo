// file: frontend/src/components/home/ProfilPreview.js
'use client';

import Link from "next/link";
import { FaBookOpen, FaSitemap, FaMapMarkedAlt } from 'react-icons/fa';
import { useInView } from "react-intersection-observer";

const ProfilCard = ({ icon, title, description, linkUrl, delay }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
    return (
        <div ref={ref} className={`bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: `${delay}ms`}}>
            <div className="text-4xl text-blue-600 mx-auto w-fit mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4 h-20">{description}</p>
            <Link href={linkUrl} className="font-semibold text-blue-600 hover:underline">
                Lebih Detail →
            </Link>
        </div>
    )
}

const ProfilPreview = () => {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Profil Desa</h2>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Kenali lebih dekat Desa Karangrejo melalui informasi detail di bawah ini.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ProfilCard 
                        icon={<FaBookOpen />}
                        title="Tentang Desa"
                        description="Visi, misi, dan sejarah singkat terbentuknya Desa Karangrejo."
                        linkUrl="/profil-desa/tentang-desa"
                        delay={100}
                    />
                    <ProfilCard 
                        icon={<FaSitemap />}
                        title="Struktur Desa"
                        description="Bagan struktur organisasi dan tata kerja Pemerintah Desa Karangrejo."
                        linkUrl="/profil-desa/struktur-desa"
                        delay={200}
                    />
                    <ProfilCard 
                        icon={<FaMapMarkedAlt />}
                        title="Geografis Desa"
                        description="Galeri peta wilayah administratif dan tematik Desa Karangrejo."
                        linkUrl="/profil-desa/geografis-desa"
                        delay={300}
                    />
                </div>
            </div>
        </section>
    );
};

export default ProfilPreview;