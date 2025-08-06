// file: frontend/src/components/struktur-desa/PejabatCard.js
import Image from 'next/image';

const PejabatCard = ({ pejabat }) => {
  return (
    <div className="relative w-56 pt-20 bg-white rounded-xl shadow-lg border border-gray-200 text-center">
      
      <div className="absolute top-0 left-0 right-0 h-24 bg-blue-600 rounded-t-xl"></div>

      <div className="relative w-40 h-40 mx-auto -mt-16">
        <Image
          src={pejabat.imageUrl || '/images/pejabat/default.jpg'}
          alt={`Foto ${pejabat.name}`}
          layout="fill"
          objectFit="contain"
          objectPosition="bottom"
        />
      </div>

      <div className="p-4 mt-2">
        <h3 className="text-lg font-bold text-gray-900">{pejabat.name}</h3>
        <p className="mt-1 text-sm text-blue-700 font-semibold">{pejabat.jabatan}</p>
      </div>
    </div>
  );
};

export default PejabatCard;