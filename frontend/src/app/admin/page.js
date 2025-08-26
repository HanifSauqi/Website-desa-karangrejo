// file: frontend/src/app/admin/page.js
import Link from "next/link";
import { FaLandmark, FaNewspaper, FaSitemap, FaStore, FaPaw, FaImages } from 'react-icons/fa';

const DashboardCard = ({ title, description, href, icon, bgColor }) => (
  <Link href={href}>
    <div className={`p-6 rounded-lg text-white transform hover:-translate-y-2 transition-transform duration-300 shadow-lg ${bgColor}`}>
      <div className="flex items-center space-x-4">
        <div className="text-3xl opacity-80">{icon}</div>
        <div>
          <h3 className="text-xl font-semibold mb-1">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
      </div>
    </div>
  </Link>
);

export default function AdminDashboard() {
  const menuItems = [
    { href: '/admin/tentang-desa', title: 'Tentang Desa', description: 'Kelola informasi umum', icon: <FaLandmark />, bgColor: 'bg-blue-500 hover:bg-blue-600' },
    { href: '/admin/struktur-desa', title: 'Struktur Desa', description: 'Kelola bagan organisasi', icon: <FaSitemap />, bgColor: 'bg-red-500 hover:bg-red-600' },
    { href: '/admin/berita', title: 'Berita', description: 'Kelola berita & pengumuman', icon: <FaNewspaper />, bgColor: 'bg-green-500 hover:bg-green-600' },
    { href: '/admin/umkm', title: 'UMKM', description: 'Kelola informasi UMKM', icon: <FaStore />, bgColor: 'bg-gray-500 hover:bg-gray-600' },
    { href: '/admin/peternakan', title: 'Peternakan', description: 'Kelola data peternakan', icon: <FaPaw />, bgColor: 'bg-purple-500 hover:bg-purple-600' },
    { href: '/admin/galeri', title: 'Galeri', description: 'Kelola foto & dokumentasi', icon: <FaImages />, bgColor: 'bg-yellow-500 hover:bg-yellow-600' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-600 mt-1">Selamat datang! Kelola konten website Anda dari sini.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map(item => (
          <DashboardCard key={item.href} {...item} />
        ))}
      </div>
    </div>
  );
}