// file: frontend/src/app/berita/page.js
import { dataBerita } from "@/data/berita";
import BeritaCard from "@/components/berita/BeritaCard";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: 'Berita Desa - Desa Karangrejo',
  description: 'Kumpulan berita dan kegiatan terbaru dari Desa Karangrejo.',
};

export default function BeritaPage() {
  const [featuredPost, ...otherPosts] = dataBerita; // Ambil berita pertama sebagai berita utama

  return (
    <main className="pt-24 md:pt-32 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Berita Desa</h1>
            <p className="text-gray-600 mt-2">Informasi dan kegiatan terkini dari Desa Karangrejo.</p>
        </div>

        {/* Berita Utama (Featured Post) */}
        <div className="mb-12">
          <Link href={`/berita/${featuredPost.slug}`}>
            <div className="block md:grid md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg overflow-hidden group">
              <div className="relative w-full h-64 md:h-full min-h-[300px]">
                <Image
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <p className="text-sm text-gray-500 mb-2">{featuredPost.date}</p>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <span className="font-semibold text-blue-600 group-hover:underline self-start">
                  Baca Selengkapnya →
                </span>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Daftar Berita Lainnya */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map(post => (
            <BeritaCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}