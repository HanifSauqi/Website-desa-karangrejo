// file: frontend/src/app/page.js
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import BeritaPreview from "@/components/home/BeritaPreview";
import PotensiPreview from "@/components/home/PotensiPreview";
import ProfilPreview from "@/components/home/ProfilPreview";
import GaleriPreview from "@/components/home/GaleriPreview";

// Fungsi untuk mengambil semua data yang dibutuhkan oleh homepage
async function getHomePageData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    // Ambil 3 berita terbaru (tambahkan ?limit=3 jika backend Anda mendukungnya)
    const beritaRes = await fetch(`${apiUrl}/berita`, { next: { revalidate: 60 } });
    // Ambil 5 foto galeri terbaru
    const galeriRes = await fetch(`${apiUrl}/galeri`, { next: { revalidate: 60 } });
    // Ambil data "Tentang Desa" dari konten statis
    const kontenRes = await fetch(`${apiUrl}/konten/tentang-desa`, { next: { revalidate: 60 } });

    const berita = beritaRes.ok ? await beritaRes.json() : [];
    const galeri = galeriRes.ok ? await galeriRes.json() : [];
    const konten = kontenRes.ok ? await kontenRes.json() : null;

    // Ambil hanya 3 berita dan 5 foto untuk pratinjau
    const previewBerita = berita.slice(0, 3);
    const previewGaleri = galeri.slice(0, 5);

    return { berita: previewBerita, galeri: previewGaleri, konten };
  } catch (error) {
    console.error("Gagal mengambil data homepage:", error);
    return { berita: [], galeri: [], konten: null };
  }
}

export const metadata = {
  title: "Beranda - Profil Desa Karangrejo",
  description: "Website resmi profil Desa Karangrejo, menampilkan informasi, pariwisata, dan UMKM desa.",
};

export default async function HomePage() {
  const { berita, galeri, konten } = await getHomePageData();

  return (
    <>
      <Hero />
      {/* Berikan data yang sudah di-fetch ke komponen sebagai props */}
      <About data={konten?.deskripsi} />
      <BeritaPreview data={berita} />
      <PotensiPreview />
      <ProfilPreview />
      <GaleriPreview data={galeri} />
    </>
  );
}