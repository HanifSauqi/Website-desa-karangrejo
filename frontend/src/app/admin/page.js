// file: frontend/src/app/admin/page.js (Admin Dashboard)
import Link from "next/link";

export const metadata = {
  title: "Dashboard Admin - Desa Karangrejo",
  description: "Panel administrasi untuk mengelola website Desa Karangrejo.",
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
        <p className="text-gray-600">Selamat datang di panel administrasi Desa Karangrejo</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg">
          <Link href="/admin/tentang-desa">
            <h3 className="text-xl font-semibold mb-2">Konten Desa</h3>
            <p>Kelola informasi tentang desa</p>
          </Link>
        </div>
        
        <div className="bg-green-500 text-white p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Berita</h3>
          <p>Kelola berita dan pengumuman</p>
        </div>
        
        <div className="bg-purple-500 text-white p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Galeri</h3>
          <p>Kelola foto dan dokumentasi</p>
        </div>
      </div>
    </div>
  );
}
