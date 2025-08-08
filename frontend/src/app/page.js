// file: frontend/src/app/page.js (Homepage)
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import BeritaPreview from "@/components/home/BeritaPreview";
import PotensiPreview from "@/components/home/PotensiPreview";
import ProfilPreview from "@/components/home/ProfilPreview";
import GaleriPreview from "@/components/home/GaleriPreview";

// Metadata untuk homepage
export const metadata = {
  title: "Beranda - Profil Desa Karangrejo",
  description: "Website resmi profil Desa Karangrejo, menampilkan informasi, pariwisata, dan UMKM desa.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <BeritaPreview />
      <PotensiPreview />
      <ProfilPreview />
      <GaleriPreview />
    </>
  );
}