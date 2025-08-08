// file: frontend/src/components/home/Hero.js

import SocialLinks from "./SocialLinks";

const Hero = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/fotbar-kkn.webp')" }}
    >
      {/* Overlay gradien gelap agar teks lebih terbaca */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

      {/* Konten Teks Utama */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight [text-shadow:_0_3px_5px_rgba(0,0,0,0.5)]">
          Selamat Datang di Desa Karangrejo
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto [text-shadow:_0_2px_3px_rgba(0,0,0,0.5)]">
          Menuju Desa Mandiri, Sejahtera, dan Berbudaya
        </p>
        <div className="mt-8">
          <a
            href="#tentang"
            className="bg-white text-gray-800 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-transform duration-300 hover:scale-105 shadow-lg"
          >
            Jelajahi Desa
          </a>
        </div>
      </div>

      {/* Widget Social Media */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
        <SocialLinks />
      </div>

      {/* Panah Scroll Animasi */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10">
        <a href="#tentang" aria-label="Scroll down">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center items-start p-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
