// file: frontend/src/components/layout/Footer.js
import Link from 'next/link';
import Image from 'next/image';
import SocialLinks from '../home/SocialLinks'; // Impor SocialLinks
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="container mx-auto px-6 pt-12 pb-8">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Kolom 1: Identitas Desa & Kontak */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo-pacitan.webp" alt="Logo Desa Karangrejo" width={48} height={48} />
              <div>
                <p className="font-semibold text-white">Pemerintah Desa Karangrejo</p>
                <p className="text-sm text-slate-400">Kec. Arjosari, Kab. Pacitan</p>
              </div>
            </Link>
            <div className="space-y-2 text-sm">
              <p className="flex items-start"><FaMapMarkerAlt className="w-4 h-4 mr-2 mt-1 shrink-0" /><span>Jl. Raya Arjosari No. 12, Karangrejo, Arjosari, Pacitan, Jawa Timur</span></p>
              <p className="flex items-center"><FaPhone className="w-4 h-4 mr-2" /><span>(0357) 123-456</span></p>
              <p className="flex items-center"><FaEnvelope className="w-4 h-4 mr-2" /><span>pemdes@karangrejo.id</span></p>
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <h3 className="font-bold text-white mb-4">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/profil-desa/tentang-desa" className="hover:text-white transition-colors">Tentang Desa</Link></li>
              <li><Link href="/profil-desa/struktur-desa" className="hover:text-white transition-colors">Struktur Desa</Link></li>
              <li><Link href="/berita" className="hover:text-white transition-colors">Berita</Link></li>
              <li><Link href="/galeri" className="hover:text-white transition-colors">Galeri</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Media Sosial */}
          <div>
            <h3 className="font-bold text-white mb-4">Ikuti Kami</h3>
            {/* Kita gunakan lagi SocialLinks, tapi dengan style berbeda */}
            <SocialLinks className="bg-slate-700 p-3 rounded-full text-white hover:bg-slate-600 hover:scale-110 transition-all duration-300" />
          </div>

        </div>

        {/* Garis Pemisah */}
        <hr className="my-8 border-slate-700" />

        {/* Bagian Copyright & Credit */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-center">
          <p className="text-slate-400">&copy; {currentYear} Pemdes Karangrejo. Semua Hak Cipta Dilindungi.</p>
          <p className="text-slate-500 mt-2 md:mt-0">
            Dibangun oleh <a href="#" className="hover:text-white font-semibold">KKN-PPM UGM 2025 Roman Pacitan</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;