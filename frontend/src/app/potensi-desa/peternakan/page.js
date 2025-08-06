// file: frontend/src/app/potensi-desa/peternakan/page.js

import KambingStats from "@/components/peternakan/KambingStats";
import KambingPerDusun from "@/components/peternakan/KambingPerDusun";
import { dataPopulasiKambing } from "@/data/kambing";

export const metadata = {
  title: 'Data Peternakan Kambing - Desa Karangrejo',
  description: 'Data dan statistik populasi kambing etawa di Desa Karangrejo, termasuk rincian per dusun.',
};

export default function PeternakanPage() {
  return (
    <main className="pt-24 md:pt-32 pb-16 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">
              Statistik Ternak Kambing 
            </h1>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Rincian data populasi kambing jantan dan betina yang menjadi salah satu potensi unggulan di Desa Karangrejo.
            </p>
        </div>

        {/* Bagian Statistik Total Kambing */}
        <div className="max-w-4xl mx-auto">
          {/* Pastikan komponen KambingStats Anda sudah bisa menerima props seperti ini */}
          <KambingStats data={dataPopulasiKambing} />
        </div>
        
        {/* Bagian Rincian per Dusun */}
        <div className="max-w-4xl mx-auto">
            <KambingPerDusun />
        </div>
        
      </div>
    </main>
  );
}