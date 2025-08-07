import UMKMClientPage from "@/components/umkm/UMKMClientPage";

// Metadata bisa digunakan kembali di Server Component
export const metadata = {
  title: 'UMKM - Desa Karangrejo',
  description: 'Dukung dan temukan produk unggulan dari UMKM di Desa Karangrejo.',
};

export default function UmkmPage() {
  return (
    <main className="pt-24 md:pt-32">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Peta Potensi UMKM Desa</h1>
            <p className="text-gray-600 mb-8">
            Temukan lokasi para pelaku UMKM di Desa Karangrejo.
            </p>
        </div>
        
        {/* Panggil komponen pembungkus */}
        <UMKMClientPage />
    </main>
  );
}