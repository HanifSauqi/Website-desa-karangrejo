// file: frontend/src/components/home/About.js
'use client';

import Image from "next/image";
import { useInView } from "react-intersection-observer";

const About = ({ data }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <section id="tentang" className="bg-slate-50 py-20 md:py-28">
            <div ref={ref} className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                {/* Kolom Kiri: Gambar */}
                <div className={`relative w-full h-96 rounded-lg shadow-2xl transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                    <Image
                        src={data?.imageUrl}
                        alt="Tentang Desa Karangrejo"
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
                {/* Kolom Kanan: Teks */}
                <div className={`transition-all duration-700 ease-out delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Tentang Desa Kami
                    </h2>
                    <div className="w-24 h-1.5 bg-blue-600 mb-6"></div>
                    <p className="text-gray-600 leading-relaxed text-justify">
                        {data?.sejarah || "Deskripsi singkat tentang desa belum diisi. Silakan perbarui melalui CMS."}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;