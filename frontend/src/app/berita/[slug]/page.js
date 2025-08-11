// file: frontend/src/app/berita/[slug]/page.js
import Image from "next/image";
import { notFound } from "next/navigation";

// Fungsi untuk mengambil satu berita berdasarkan slug
async function getBeritaBySlug(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/berita/${slug}`, { next: { revalidate: 10 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Gagal fetch detail berita:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const post = await getBeritaBySlug(params.slug);
  if (!post) return { title: 'Berita Tidak Ditemukan' };
  return {
    title: `${post.title} - Berita Desa`,
    description: post.excerpt,
  }
}

export default async function DetailBeritaPage({ params }) {
  const post = await getBeritaBySlug(params.slug);

  if (!post) {
    notFound();
  }
  
  return (
    <article className="pt-24 md:pt-32 pb-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <header className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">{post.title}</h1>
          <p className="mt-4 text-gray-500">
            Ditulis oleh {post.author} pada {new Date(post.createdAt).toLocaleDateString('id-ID')}
          </p>
        </header>
        
        <div className="relative w-full h-64 md:h-96 max-w-5xl mx-auto rounded-lg overflow-hidden shadow-lg mb-8">
          <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
        </div>
        
        <div className="prose lg:prose-lg max-w-3xl mx-auto text-justify"
             dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>
    </article>
  )
}