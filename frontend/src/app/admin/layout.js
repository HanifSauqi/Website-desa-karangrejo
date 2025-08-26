'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaTachometerAlt, FaLandmark, FaSitemap, FaStore, FaPaw, FaNewspaper, FaImages } from 'react-icons/fa';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default tertutup di mobile

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/login');
  };

  if (loading && pathname !== '/admin/login') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading...</span>
      </div>
    );
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { href: '/admin/tentang-desa', label: 'Tentang Desa', icon: <FaLandmark /> },
    { href: '/admin/struktur-desa', label: 'Struktur Desa', icon: <FaSitemap /> },
    { href: '/admin/umkm', label: 'UMKM', icon: <FaStore /> },
    { href: '/admin/peternakan', label: 'Peternakan', icon: <FaPaw /> },
    { href: '/admin/berita', label: 'Berita', icon: <FaNewspaper /> },
    { href: '/admin/galeri', label: 'Galeri', icon: <FaImages /> },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-700">
            <h2 className="font-bold text-xl text-white">Admin Panel</h2>
            <p className="text-gray-400 text-sm">Desa Karangrejo</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} className={`flex items-center p-3 rounded-lg transition-colors group ${pathname === item.href ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-gray-700 text-gray-300 hover:text-white'}`}>
                <span className="flex-shrink-0 text-lg">{item.icon}</span>
                <span className="ml-3 font-medium">{item.label}</span>
              </Link>
            ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
            <button onClick={handleLogout} className="flex items-center w-full p-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors group">
                {/* SVG Logout Icon */}
                <span className="ml-3 font-medium">Logout</span>
            </button>
        </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar untuk Desktop */}
      <aside className="hidden lg:block w-64 bg-gray-800 text-white flex-col shrink-0 shadow-xl">
        <SidebarContent />
      </aside>

      {/* Konten Utama */}
      <div className="flex-1 flex flex-col">
        {/* Header untuk Mobile dengan Tombol Hamburger */}
        <header className="lg:hidden bg-gray-800 text-white shadow-md sticky top-0 z-30">
          <div className="flex items-center justify-between p-4">
            <h2 className="font-bold text-xl">Admin Panel</h2>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-700">
              {/* SVG Hamburger Icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
          </div>
        </header>

        {/* Sidebar overlay untuk Mobile */}
        {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-40">
                <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
                <aside className="absolute top-0 left-0 w-64 bg-gray-800 text-white h-full">
                    <SidebarContent />
                </aside>
            </div>
        )}
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}