// file: frontend/src/app/potensi-desa/umkm/[slug]/page.js
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaPhone, FaShoppingBag } from "react-icons/fa";

// Fungsi ini sekarang mengambil data dari API
async function getUmkmBySlug(slug) {
  try {
    // Pastikan NEXT_PUBLIC_API_URL sudah benar di .env.local dan Vercel
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/umkm/${slug}`, { next: { revalidate: 10 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Gagal fetch detail UMKM:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const umkm = await getUmkmBySlug(params.slug);
  if (!umkm) return { title: 'UMKM Tidak Ditemukan' };
  return {
    title: `${umkm.name} - UMKM Desa Karangrejo`,
    description: umkm.description,
  };
}

export default async function DetailUmkmPage({ params }) {
  const umkm = await getUmkmBySlug(params.slug);

  if (!umkm) {
    notFound();
  }
  
  return (
    <main className="pt-24 md:pt-32 pb-16 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-4">
          <p className="font-semibold text-blue-600">{umkm.category}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {umkm.name}
          </h1>
          <p className="mt-2 text-gray-500">Oleh: {umkm.owner}</p>
        </div>

        {/* Foto Utama */}
        <div className="relative w-full h-64 md:h-[500px] max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl my-8">
          <Image src={umkm.imageUrl} alt={umkm.name} fill className="object-cover" />
        </div>
        
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Kolom Kiri: Deskripsi & Galeri */}
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-lg shadow-md border">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Tentang Usaha</h2>
                    <div className="prose max-w-none text-gray-600 text-justify">
                        <p>{umkm.description}</p>
                    </div>
                </div>
                {/* Galeri Foto Tambahan */}
                {umkm.galleryImages && umkm.galleryImages.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-md border">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Galeri Foto</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {umkm.galleryImages.map((img, index) => (
                                <div key={index} className="relative h-32 rounded-md overflow-hidden">
                                    <Image src={img} alt={`${umkm.name} gallery ${index + 1}`} fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Kolom Kanan: Produk & Kontak */}
            <div className="lg:col-span-1 space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-md border">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><FaShoppingBag className="mr-2 text-blue-600"/> Produk Unggulan</h3>
                    <ul className="space-y-3">
                        {umkm.products && umkm.products.map(product => (
                            <li key={product.name} className="flex justify-between items-start border-t border-dashed pt-2">
                                <span className="text-gray-700 pr-2">{product.name}</span>
                                <span className="font-semibold text-gray-800 text-right shrink-0">{product.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Hubungi Kami</h3>
                    <a href={`tel:${umkm.contact}`} className="inline-flex items-center space-x-2 text-blue-600 hover:underline font-semibold">
                        <FaPhone />
                        <span>{umkm.contact}</span>
                    </a>
                </div>
            </div>
        </div>
        
        <div className="text-center mt-16">
            <Link href="/potensi-desa/umkm" className="font-semibold text-blue-600 hover:underline">
                ← Kembali ke Daftar UMKM
            </Link>
        </div>
      </div>
    </main>
  );
}