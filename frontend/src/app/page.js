// file: frontend/src/app/page.js

import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import BeritaPreview from "@/components/home/BeritaPreview";
import PotensiPreview from "@/components/home/PotensiPreview";
import ProfilPreview from "@/components/home/ProfilPreview";
import GaleriPreview from "@/components/home/GaleriPreview";


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