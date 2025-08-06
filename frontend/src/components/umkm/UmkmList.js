// file: frontend/src/components/umkm/UmkmList.js
'use client';

import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const UmkmCard = ({ location, delay }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    return (
        <div 
            ref={ref} 
            className={`bg-white rounded-lg shadow-md overflow-hidden group flex flex-col transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="relative h-56 w-full overflow-hidden">
                <Link href={`/potensi-desa/umkm/${location.slug}`}>
                    <Image 
                        src={location.imageUrl} 
                        alt={location.name} 
                        layout="fill" 
                        objectFit="cover"
                        className="cursor-pointer transition-transform duration-300 group-hover:scale-110"
                    />
                </Link>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm font-semibold text-blue-500 mb-1">{location.category}</p>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{location.name}</h3>
                <p className="text-sm text-gray-500 mb-4 flex-grow">Pemilik: {location.owner}</p>
                
                <Link href={`/potensi-desa/umkm/${location.slug}`} className="mt-auto bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center">
                    Baca Selengkapnya
                </Link>
            </div>
        </div>
    )
};

const UmkmList = ({ locations }) => {
    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {locations.map((loc, index) => (
                        <UmkmCard key={loc.id} location={loc} delay={index * 100} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default UmkmList;