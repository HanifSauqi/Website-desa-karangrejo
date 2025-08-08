// file: frontend/src/components/struktur-desa/BaganStrukturDesa.js
import PejabatCard from "./PejabatCard";

// Komponen kecil untuk membuat garis penghubung yang konsisten
const Connector = ({ className = '' }) => <div className={`bg-gray-300 ${className}`}></div>;

// Komponen utama yang mengambil dan memproses data dari API
const BaganStrukturDesa = async () => {
  let kades, sekdes, kaurDanKasi, kadusGroup, paraKadus;

  try {
    // Mengambil data daftar pejabat dari backend API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pejabat`, { 
      next: { revalidate: 10 } // Ambil data baru setiap 10 detik untuk menjaga kesegaran
    });

    if (res.ok) {
      const dataFlat = await res.json();
      if (dataFlat && dataFlat.length > 0) {
        // 1. Temukan data Kades dan Sekdes sebagai pilar utama
        kades = dataFlat.find(p => p.jabatan === 'Kepala Desa');
        sekdes = dataFlat.find(p => p.jabatan === 'Sekretaris Desa');

        // 2. Filter Kaur & Kasi yang merupakan bawahan langsung dari Sekdes
        kaurDanKasi = sekdes ? dataFlat.filter(p => p.parentId === sekdes._id) : [];

        // 3. Buat "Grup" virtual untuk para Kadus agar memiliki judul
        kadusGroup = { name: "Perangkat Kewilayahan", jabatan: "Kepala Dusun", imageUrl: '/images/pejabat/default.jpg' };
        // Filter semua pejabat yang jabatannya mengandung kata "Kepala Dusun"
        paraKadus = dataFlat.filter(p => p.jabatan.includes('Kepala Dusun') && p.jabatan !== 'Kepala Dusun');
      }
    }
  } catch (error) {
    console.error("Gagal mengambil atau memproses struktur desa:", error);
  }

  // Tampilkan pesan jika data Kepala Desa tidak ditemukan di CMS
  if (!kades) {
    return <p className="text-center py-10">Struktur organisasi belum tersedia atau gagal dimuat.</p>;
  }

  return (
    <div className="flex flex-col items-center w-full text-center space-y-8">
      
      {/* Level 1: Kepala Desa */}
      <div className="fade-in-up" style={{ animationDelay: '100ms' }}>
        <PejabatCard pejabat={kades} />
      </div>

      {/* Level 2: Sekretaris Desa */}
      {sekdes && (
        <>
          <Connector className="w-0.5 h-16" />
          <div className="relative fade-in-up" style={{ animationDelay: '200ms' }}>
            <PejabatCard pejabat={sekdes} />
          </div>
        </>
      )}

      {/* Level 3: Kaur & Kasi */}
      {kaurDanKasi && kaurDanKasi.length > 0 && (
        <>
          <Connector className="w-0.5 h-16" />
          <div className="relative w-full">
            <Connector className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] h-0.5" />
            <div className="flex justify-center flex-wrap gap-x-4 gap-y-16 pt-16">
              {kaurDanKasi.map((pejabat, index) => (
                <div key={pejabat._id} className="relative fade-in-up" style={{ animationDelay: `${400 + index * 50}ms` }}>
                  <Connector className="absolute bottom-full left-1/2 -translate-x-1/2 w-0.5 h-16" />
                  <PejabatCard pejabat={pejabat} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Level 5: Para Kepala Dusun */}
      {paraKadus && paraKadus.length > 0 && (
        <>
          <Connector className="w-0.5 h-16" />
          <div className="relative w-full">
            <Connector className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] h-0.5" />
            <div className="flex justify-center flex-wrap gap-x-4 gap-y-16 pt-16">
              {paraKadus.map((pejabat, index) => (
                <div key={pejabat._id} className="relative fade-in-up" style={{ animationDelay: `${1.2 + index * 0.05}s` }}>
                  <Connector className="absolute bottom-full left-1/2 -translate-x-1/2 w-0.5 h-16" />
                  <PejabatCard pejabat={pejabat} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BaganStrukturDesa;