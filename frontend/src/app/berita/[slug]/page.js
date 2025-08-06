// file: frontend/src/app/berita/[slug]/page.js
import { dataBerita } from "@/data/berita";
import Image from "next/image";
import { notFound } from "next/navigation";

// Fungsi untuk mendapatkan data berita berdasarkan slug
function getBeritaBySlug(slug) {
  return dataBerita.find(post => post.slug === slug);
}

// Fungsi untuk generate metadata dinamis (judul tab browser)
export async function generateMetadata({ params }) {
  const post = getBeritaBySlug(params.slug);
  if (!post) {
    return {
      title: 'Berita Tidak Ditemukan'
    }
  }
  return {
    title: `${post.title} - Berita Desa`,
    description: post.excerpt,
  }
}

export default function DetailBeritaPage({ params }) {
  const { slug } = params;
  const post = getBeritaBySlug(slug);

  // Jika post tidak ditemukan, tampilkan halaman 404
  if (!post) {
    notFound();
  }
  
  return (
    <article className="pt-24 md:pt-32 pb-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Berita */}
        <header className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-gray-500">
            Ditulis oleh {post.author} pada {post.date}
          </p>
        </header>
        
        {/* Gambar Utama */}
        <div className="relative w-full h-64 md:h-96 max-w-5xl mx-auto rounded-lg overflow-hidden shadow-lg mb-8">
          <Image
            src={post.imageUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        
        {/* Konten Berita */}
        <div className="prose lg:prose-lg max-w-3xl mx-auto text-justify"
             dangerouslySetInnerHTML={{ __html: post.content }}
        >
        </div>
      </div>
    </article>
  )
}