// file: frontend/src/app/potensi-desa/peternakan/page.js

import KambingStats from "@/components/peternakan/KambingStats";
import KambingPerDusun from "@/components/peternakan/KambingPerDusun";

// Fungsi untuk mengambil data peternakan dari backend API
async function getPeternakanData() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/peternakan`, { 
            next: { revalidate: 10 } // Ambil data baru setiap 10 detik
        });
        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        console.error("Gagal mengambil data peternakan:", error);
        return [];
    }
}

export const metadata = {
  title: 'Data Peternakan Kambing - Desa Karangrejo',
  description: 'Data dan statistik populasi kambing etawa di Desa Karangrejo, termasuk rincian per dusun.',
};

// Halaman menjadi 'async'
export default async function PeternakanPage() {
  const dataPerDusun = await getPeternakanData();

  // Hitung total jantan dan betina dari data yang di-fetch
  const totalJantan = dataPerDusun.reduce((sum, item) => sum + item.kambing.jantan, 0);
  const totalBetina = dataPerDusun.reduce((sum, item) => sum + item.kambing.betina, 0);
  
  // Siapkan data untuk komponen KambingStats
  const dataPopulasiKambing = {
    total: totalJantan + totalBetina,
    jantan: totalJantan,
    betina: totalBetina,
  };

  return (
    <main className="pt-24 md:pt-32 pb-16 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">
              Statistik Ternak Kambing Etawa
            </h1>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Rincian data populasi kambing jantan dan betina yang menjadi salah satu potensi unggulan di Desa Karangrejo.
            </p>
        </div>

        {/* Berikan data total yang sudah dihitung ke KambingStats */}
        <div className="max-w-4xl mx-auto">
          <KambingStats data={dataPopulasiKambing} />
        </div>
        
        {/* Berikan data per dusun ke KambingPerDusun */}
        <div className="max-w-4xl mx-auto">
            <KambingPerDusun data={dataPerDusun} />
        </div>
        
      </div>
    </main>
  );
}