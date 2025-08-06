// file: frontend/src/components/profil-desa/DataPenduduk.js
'use client'; 

import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { BsPeopleFill, BsGenderMale, BsGenderFemale, BsHouseFill } from 'react-icons/bs';

const StatCard = ({ icon, label, value = 0, unit, duration = 2 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="bg-white p-6 rounded-lg text-center shadow-lg border border-gray-200 transform hover:-translate-y-2 transition-transform duration-300">
      <div className="text-4xl text-blue-600 mx-auto w-fit mb-3">{icon}</div>
      <p className="text-gray-600 font-semibold">{label}</p>
      <div className="text-4xl font-bold text-gray-800 mt-2">
        {inView ? <CountUp end={value} duration={duration} separator="." /> : '0'}
        <span className="text-xl font-medium text-gray-500 ml-2">{unit}</span>
      </div>
    </div>
  );
};

// Komponen sekarang menerima 'data' sebagai prop
const DataPenduduk = ({ data }) => {
  return (
    <div className="py-12 md:py-16 mt-8">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
        Demografi Desa
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {/* Nilai 'value' sekarang diambil dari data props */}
        <StatCard icon={<BsPeopleFill />} label="Total Penduduk" value={data?.totalPenduduk} unit="Jiwa" />
        <StatCard icon={<BsGenderMale />} label="Laki-laki" value={data?.lakiLaki} unit="Jiwa" />
        <StatCard icon={<BsGenderFemale />} label="Perempuan" value={data?.perempuan} unit="Jiwa" />
        <StatCard icon={<BsHouseFill />} label="Total KK" value={data?.totalKK} unit="Keluarga" />
      </div>
      <p className="text-center text-sm text-gray-500 mt-6">Data per Agustus 2025</p>
    </div>
  );
};

export default DataPenduduk;