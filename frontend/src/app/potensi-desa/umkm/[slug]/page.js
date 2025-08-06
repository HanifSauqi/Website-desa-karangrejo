// file: frontend/src/app/potensi-desa/umkm/[slug]/page.js

import { umkmData } from "@/data/umkm";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaPhone, FaShoppingBag } from "react-icons/fa";

function getUmkmBySlug(slug) {
  return umkmData.find(item => item.slug === slug);
}

export async function generateMetadata({ params }) {
  const umkm = getUmkmBySlug(params.slug);
  if (!umkm) return { title: 'UMKM Tidak Ditemukan' }
  return {
    title: `${umkm.name} - UMKM Desa Karangrejo`,
    description: umkm.description,
  }
}

export default function DetailUmkmPage({ params }) {
  const umkm = getUmkmBySlug(params.slug);

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
          <Image src={umkm.imageUrl} alt={umkm.name} layout="fill" objectFit="cover" />
        </div>
        
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-8">
                <div className="bg-white p-8 rounded-lg shadow-md border">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Tentang Usaha</h2>
                    <div className="prose max-w-none text-gray-600 text-justify">
                        <p>{umkm.description}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Galeri Foto</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {umkm.galleryImages.map((img, index) => (
                            <div key={index} className="relative h-28 rounded-md overflow-hidden">
                                <Image src={img} alt={`${umkm.name} gallery ${index + 1}`} layout="fill" objectFit="cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-md border">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><FaShoppingBag className="mr-2 text-blue-600"/> Produk Unggulan</h3>
                    <ul className="space-y-3">
                        {umkm.products.map(product => (
                            <li key={product.name} className="grid grid-cols-3 gap-2 items-center border-t border-dashed pt-2">
                                <span className="col-span-2 text-gray-700">{product.name}</span>
                                <span className="col-span-1 font-semibold text-gray-800 text-right">{product.price}</span>
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