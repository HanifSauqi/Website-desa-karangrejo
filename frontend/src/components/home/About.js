// file: frontend/src/components/home/About.js
'use client';

import Image from "next/image";
import { useInView } from "react-intersection-observer";

const About = () => {
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
                        src="/images/pejabat/kantor-desa.jpg" // Ganti dengan gambar yang relevan
                        alt="Tentang Desa Karangrejo"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>
                {/* Kolom Kanan: Teks */}
                <div className={`transition-all duration-700 ease-out delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Tentang Desa Kami
                    </h2>
                    <div className="w-24 h-1.5 bg-blue-600 mb-6"></div>
                    <p className="text-gray-600 leading-relaxed text-justify">
                        Desa Karangrejo adalah sebuah desa yang terletak di lembah hijau yang subur, dikelilingi oleh perbukitan yang indah. Dengan sejarah yang kaya dan masyarakat yang ramah, kami berkomitmen untuk melestarikan tradisi sambil merangkul inovasi untuk kemajuan bersama. Visi kami adalah menjadi desa percontohan yang mandiri secara ekonomi dan kuat secara sosial.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;