// file: frontend/src/components/layout/Navbar.js

'use client'; 

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  // State untuk dropdowns dan menu mobile
  const [openDropdown, setOpenDropdown] = useState(null); // null, 'profil', atau 'potensi'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  
  // State untuk efek transparan
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const pathname = usePathname();
  // Ref untuk setiap dropdown
  const profilDropdownRef = useRef(null);
  const potensiDropdownRef = useRef(null);

  // Efek untuk mendengarkan event scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Efek untuk menutup dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profilDropdownRef.current && !profilDropdownRef.current.contains(event.target) &&
        potensiDropdownRef.current && !potensiDropdownRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    }
    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  const closeAllMenus = () => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleDropdownClick = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // Logika untuk menentukan style Navbar
  const isTransparent = pathname === '/' && !isScrolled && !isHovering;
  
  const navClassName = `fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
    isTransparent 
      ? 'border-b border-white/20 bg-transparent backdrop-blur-sm'
      : 'border-b border-transparent bg-blue-800 shadow-lg'
  }`;

  return (
    <nav 
      className={navClassName}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="container mx-auto px-8 lg:px-6 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" onClick={closeAllMenus} className="flex items-center space-x-2 md:space-x-3 rtl:space-x-reverse">
          <Image
            src="/logo-pacitan.webp"
            alt="Logo Kabupaten Pacitan"
            width={80}
            height={80}
            className="w-12 h-12 md:w-20 md:h-20"
          />
          <div>
            <span className="block text-lg md:text-2xl font-medium text-gray-300 leading-tight">Desa</span>
            <span className="block text-xl md:text-3xl font-bold text-white leading-tight">Karangrejo</span>
          </div>
        </Link>

        {/* Menu Navigasi Desktop */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link href="/" className="text-xl font-medium text-gray-300 hover:text-white transition-colors">
            Beranda
          </Link>

          {/* --- DROPDOWN PROFIL DESA (DIPERBARUI) --- */}
          <div className="relative" ref={profilDropdownRef}>
            <button 
              onClick={() => handleDropdownClick('profil')}
              className="flex items-center text-xl font-medium text-gray-300 hover:text-white transition-colors"
            >
              Profil Desa
              <svg className={`w-5 h-5 ml-1 transition-transform duration-200 ${openDropdown === 'profil' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {openDropdown === 'profil' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white/90 backdrop-blur-lg rounded-lg shadow-xl overflow-hidden">
                <Link href="/profil-desa/tentang-desa" className="block px-4 py-3 text-base text-gray-800 hover:bg-gray-200 transition-colors" onClick={closeAllMenus}>Tentang Desa</Link>
                <Link href="/profil-desa/struktur-desa" className="block px-4 py-3 text-base text-gray-800 hover:bg-gray-200 transition-colors" onClick={closeAllMenus}>Struktur Desa</Link>
                <Link href="/profil-desa/batas-desa" className="block px-4 py-3 text-base text-gray-800 hover:bg-gray-200 transition-colors" onClick={closeAllMenus}>Batas Desa</Link>
                <Link href="/profil-desa/geografis-desa" className="block px-4 py-3 text-base text-gray-800 hover:bg-gray-200 transition-colors" onClick={closeAllMenus}>Geografis Desa</Link>
              </div>
            )}
          </div>

          {/* Dropdown Potensi Desa */}
          <div className="relative" ref={potensiDropdownRef}>
            <button
              onClick={() => handleDropdownClick('potensi')} 
              className="flex items-center text-xl font-medium text-gray-300 hover:text-white transition-colors"
            >
              Potensi Desa
              <svg className={`w-5 h-5 ml-1 transition-transform duration-200 ${openDropdown === 'potensi' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {openDropdown === 'potensi' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white/90 backdrop-blur-lg rounded-lg shadow-xl overflow-hidden">
                <Link href="/potensi-desa/umkm" className="block px-4 py-3 text-base text-gray-800 hover:bg-gray-200 transition-colors" onClick={closeAllMenus}>UMKM</Link>
                <Link href="/potensi-desa/pariwisata/pemandian-banyu-anget" className="block px-4 py-3 text-base text-gray-800 hover:bg-gray-200 transition-colors" onClick={closeAllMenus}>Pariwisata</Link>
                <Link href="/potensi-desa/peternakan" className="block px-4 py-3 text-base text-gray-800 hover:bg-gray-200 transition-colors" onClick={closeAllMenus}>Peternakan</Link>
              </div>
            )}
          </div>

          <Link href="/berita" className="text-xl font-medium text-gray-300 hover:text-white transition-colors">
            Berita
          </Link>

          <Link href="/galeri" className="text-xl font-medium text-gray-300 hover:text-white transition-colors">
            Galeri
          </Link>
        </div>

        {/* ... (Tombol Hamburger tidak berubah) ... */}
        <div className="lg:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-lg">
          <div className="flex flex-col items-center space-y-2 px-4 py-6">
            <Link href="/" onClick={closeAllMenus} className="text-lg text-gray-300 hover:text-white py-2">Beranda</Link>
            
            {/* MENU MOBILE DIPERBARUI */}
            <p className="text-lg font-bold text-white pt-2">Profil Desa</p>
            <Link href="/profil-desa/tentang-desa" onClick={closeAllMenus} className="text-lg text-gray-400 hover:text-white">- Tentang Desa</Link>
            <Link href="/profil-desa/struktur-desa" onClick={closeAllMenus} className="text-lg text-gray-400 hover:text-white">- Struktur Desa</Link>
            <Link href="/profil-desa/batas-desa" onClick={closeAllMenus} className="text-lg text-gray-400 hover:text-white">- Batas Desa</Link>
            <Link href="/profil-desa/geografis-desa" onClick={closeAllMenus} className="text-lg text-gray-400 hover:text-white">- Geografis Desa</Link>


            <p className="text-lg font-bold text-white pt-2">Potensi Desa</p>
            <Link href="/potensi-desa/umkm" onClick={closeAllMenus} className="text-lg text-gray-400 hover:text-white">- UMKM</Link>
            <Link href="/potensi-desa/pariwisata/pemandian-banyu-anget" onClick={closeAllMenus} className="text-lg text-gray-400 hover:text-white">- Pariwisata</Link>
            <Link href="/potensi-desa/peternakan" onClick={closeAllMenus} className="text-lg text-gray-400 hover:text-white">- Peternakan</Link>

            <Link href="/berita" onClick={closeAllMenus} className="text-lg text-gray-300 hover:text-white py-2">Berita</Link>
            <Link href="/galeri" onClick={closeAllMenus} className="text-lg text-gray-300 hover:text-white py-2">Galeri</Link>
            
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;