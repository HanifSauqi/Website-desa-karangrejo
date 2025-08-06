'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

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
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  // Jangan tampilkan layout jika di halaman login
  if (pathname === '/admin/login') {
      return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white p-5 flex flex-col shrink-0">
        <h2 className="font-bold text-2xl mb-10">Admin Desa</h2>
        <nav className="flex flex-col space-y-2">
          <Link href="/admin/tentang-desa" className={`p-3 rounded-lg hover:bg-gray-700 ${pathname === '/admin/tentang-desa' ? 'bg-blue-600' : ''}`}>Tentang Desa</Link>
          <Link href="/admin/berita" className={`p-3 rounded-lg hover:bg-gray-700 ${pathname === '/admin/berita' ? 'bg-blue-600' : ''}`}>Berita</Link>
        </nav>
        <button onClick={handleLogout} className="mt-auto p-3 rounded-lg bg-red-600 hover:bg-red-700 text-left">Logout</button>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}