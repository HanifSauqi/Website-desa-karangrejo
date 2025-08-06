// file: frontend/src/app/potensi-desa/pariwisata/[slug]/page.js

import { dataPariwisata } from "@/data/pariwisata";
import Image from "next/image";
import { notFound } from "next/navigation";

// Fungsi untuk mendapatkan data berdasarkan slug dari URL
function getWisataBySlug(slug) {
  return dataPariwisata.find(item => item.slug === slug);
}

export async function generateMetadata({ params }) {
  const wisata = getWisataBySlug(params.slug);
  if (!wisata) return { title: 'Wisata Tidak Ditemukan' }
  return {
    title: `${wisata.name} - Wisata Desa Karangrejo`,
    description: wisata.description,
  }
}

export default function DetailPariwisataPage({ params }) {
  // Ambil data wisata yang cocok dengan slug
  const wisata = getWisataBySlug(params.slug);

  // Jika tidak ditemukan, tampilkan halaman 404
  if (!wisata) {
    notFound();
  }

  return (
    <main className="pt-24 md:pt-32 pb-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
          {/* Gambar Utama */}
          <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl mb-8">
              <Image src={wisata.imageUrl} alt={wisata.name} layout="fill" objectFit="cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                      {wisata.name}
                  </h1>
              </div>
          </div>

          {/* Deskripsi & Peta */}
          <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-slate-50 p-8 rounded-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Deskripsi</h2>
                  <div className="prose max-w-none text-gray-600 text-justify">
                      <p>{wisata.description}</p>
                  </div>
              </div>
              <div className="lg:col-span-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Lokasi</h2>
                  <div className="rounded-lg overflow-hidden shadow-md h-80">
                      {/* Peta Google Maps yang disematkan */}
                      <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.0163351918376!2d111.1287118748937!3d-8.090886592037922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79607878787879%3A0x7878787878787878!2sPemandian%20Air%20Panas%20Tirto%20Husodo!5e0!3m2!1sen!2sid!4v1628332023023!5m2!1sen!2sid" 
                          width="100%" 
                          height="100%" 
                          style={{ border:0 }} 
                          allowFullScreen="" 
                          loading="lazy"
                          title={`Peta Lokasi ${wisata.name}`}
                      ></iframe>
                  </div>
              </div>
          </div>
      </div>
    </main>
  );
}