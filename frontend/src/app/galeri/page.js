// file: frontend/src/app/galeri/page.js
import FotoGaleri from "@/components/galeri/FotoGaleri";

// Fungsi untuk mengambil data dari backend
async function getGaleriData() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/galeri`, { next: { revalidate: 10 } });
        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        console.error("Gagal fetch galeri:", error);
        return [];
    }
}

export const metadata = {
  title: 'Galeri Desa - Desa Karangrejo',
  description: 'Dokumentasi foto kegiatan-kegiatan di Desa Karangrejo.',
};

export default async function GaleriPage() {
  const photos = await getGaleriData();

  return (
    <main className="pt-24 md:pt-32 pb-16 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
              Galeri Kegiatan Desa
            </h1>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Momen-momen yang terekam dari berbagai acara dan kegiatan yang diselenggarakan di Desa Karangrejo.
            </p>
        </div>
        {/* Berikan data dari API ke komponen FotoGaleri */}
        <FotoGaleri photos={photos} />
      </div>
    </main>
  );
}