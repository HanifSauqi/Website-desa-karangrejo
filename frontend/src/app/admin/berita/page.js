// file: frontend/src/app/admin/berita/page.js
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminBeritaPage() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBerita = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/berita`);
      setBerita(res.data);
    } catch (error) {
      console.error("Gagal mengambil data berita:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/berita/${id}`, {
          headers: { 'x-auth-token': token }
        });
        fetchBerita(); // Muat ulang data setelah hapus
      } catch (error) {
        console.error('Gagal menghapus berita:', error);
        alert('Gagal menghapus berita.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manajemen Berita</h1>
        <Link href="/admin/berita/tambah" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          + Tambah Berita Baru
        </Link>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Judul</th>
              <th className="p-3 text-left">Tanggal</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {berita.map(post => (
              <tr key={post._id} className="border-b">
                <td className="p-3">{post.title}</td>
                <td className="p-3">{new Date(post.createdAt).toLocaleDateString('id-ID')}</td>
                <td className="p-3 text-right space-x-2">
                  <Link href={`/admin/berita/edit/${post._id}`} className="text-yellow-500 hover:underline">Edit</Link>
                  <button onClick={() => handleDelete(post._id)} className="text-red-500 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}