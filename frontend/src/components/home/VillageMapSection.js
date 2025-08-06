// file: frontend/src/components/home/VillageMapSection.js
'use client';

import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';

const Map = dynamic(
  () => import('@/components/batas-desa/BatasDesaMap'),
  {
    ssr: false,
    loading: () => <div className="h-[500px] w-full bg-gray-200 flex justify-center items-center"><p>Memuat Peta...</p></div>
  }
);

const VillageMapSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className="bg-white py-20 md:py-28">
      <div className={`container mx-auto px-6 transition-all duration-700 ease-out ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Peta Wilayah Desa</h2>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Jelajahi batas wilayah administratif Desa Karangrejo secara interaktif melalui peta di bawah ini.
            </p>
        </div>
        <div className="h-[500px] rounded-xl overflow-hidden shadow-2xl border-4 border-white">
          <Map />
        </div>
      </div>
    </section>
  );
};

export default VillageMapSection;