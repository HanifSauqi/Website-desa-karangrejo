// file: frontend/src/app/struktur-desa/page.js
import BaganStrukturDesa from "@/components/struktur-desa/BaganStrukturDesa";

export const metadata = {
  title: 'Struktur Desa - Desa Karangrejo',
  description: 'Struktur organisasi Pemerintah Desa Karangrejo.',
};

export default function StrukturDesaPage() {
  return (
    <main className="pt-32 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Struktur Organisasi Desa</h1>
        <p className="text-gray-600 mb-12">
          Struktur Organisasi dan Tata Kerja Pemerintah Desa Karangrejo.
        </p>
      </div>

      <div className="container mx-auto px-6 pb-16 overflow-x-auto">
        <BaganStrukturDesa />
      </div>
    </main>
  );
}