// file: frontend/src/components/tentang-desa/DeskripsiDesa.js
import Image from 'next/image';

const DeskripsiDesa = ({ data }) => {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center bg-white p-8 rounded-lg shadow-md">
      {/* Kolom Kiri: Gambar */}
      <div className="w-full h-96 relative rounded-lg overflow-hidden">
        {data?.imageUrl ? (
          <Image
            src={data.imageUrl}
            alt="Foto Desa Karangrejo"
            layout="fill"
            objectFit="cover"
            priority
          />
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center">
            <p className="text-gray-500">Gambar belum diunggah</p>
          </div>
        )}
      </div>
      
      {/* Kolom Kanan: Teks Deskripsi dari data props */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Tentang Desa Karangrejo
        </h1>
        <div className="prose max-w-none text-justify text-gray-600">
          <p>{data?.sejarah || 'Sejarah belum diisi melalui CMS.'}</p>
          <h3 className="text-xl font-semibold mt-6">Visi</h3>
          <p>&quot;{data?.visi || 'Visi belum diisi melalui CMS.'}&quot;</p>
          <h3 className="text-xl font-semibold mt-6">Misi</h3>
          <ol>
            {data?.misi?.split('\n').map((item, index) => item.trim() && <li key={index}>{item}</li>) || <li>Misi belum diisi melalui CMS.</li>}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DeskripsiDesa;