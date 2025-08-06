// file: frontend/src/app/galeri/page.js
import FotoGaleri from "@/components/galeri/FotoGaleri";

export const metadata = {
  title: 'Galeri Desa - Desa Karangrejo',
  description: 'Dokumentasi foto kegiatan-kegiatan di Desa Karangrejo.',
};

export default function GaleriPage() {
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

        <FotoGaleri />
      </div>
    </main>
  );
}