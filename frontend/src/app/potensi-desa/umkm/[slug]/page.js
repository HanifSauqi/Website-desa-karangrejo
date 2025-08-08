// file: frontend/src/app/potensi-desa/umkm/[slug]/page.js

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaPhone, FaShoppingBag } from "react-icons/fa";

// Fungsi untuk mengambil satu data UMKM dari API berdasarkan slug
async function getUmkmBySlug(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/umkm/${slug}`, {
      next: { revalidate: 10 } // Cache data selama 10 detik
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Gagal fetch detail UMKM:", error);
    return null;
  }
}

// Fungsi untuk generate metadata dinamis
export async function generateMetadata({ params }) {
  const umkm = await getUmkmBySlug(params.slug);
  if (!umkm) return { title: 'UMKM Tidak Ditemukan' }
  return {
    title: `${umkm.name} - UMKM Desa Karangrejo`,
    description: umkm.description,
  }
}

// Halaman sekarang menjadi async
export default async function DetailUmkmPage({ params }) {
  const umkm = await getUmkmBySlug(params.slug);

  if (!umkm) {
    notFound();
  }
  
  return (
    <main className="pt-24 md:pt-32 pb-16 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center mb-8">
          <p className="font-semibold text-blue-600">{umkm.category}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {umkm.name}
          </h1>
          <p className="mt-2 text-gray-500">Oleh: {umkm.owner}</p>
        </div>

        <div className="relative w-full h-64 md:h-96 max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl mb-12">
          <Image src={umkm.imageUrl} alt={umkm.name} fill className="object-cover" />
        </div>
        
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
            {/* ... (sisa kode tampilan tidak berubah, hanya sumber datanya yang berbeda) ... */}
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