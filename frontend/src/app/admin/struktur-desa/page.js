// file: frontend/src/app/admin/struktur-desa/page.js
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminStrukturPage() {
  const [pejabat, setPejabat] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pejabat`);
      setPejabat(res.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Anda yakin ingin menghapus data pejabat ini?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/pejabat/${id}`, {
          headers: { 'x-auth-token': token }
        });
        fetchData(); // Muat ulang data
      } catch (error) {
        alert('Gagal menghapus data.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manajemen Struktur Desa</h1>
        <Link href="/admin/struktur-desa/tambah" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          + Tambah Pejabat
        </Link>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Foto</th>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Jabatan</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pejabat.map(p => (
              <tr key={p._id} className="border-b">
                <td className="p-2">
                  <Image src={p.imageUrl || '/images/pejabat/default.jpg'} alt={p.name} width={40} height={40} className="rounded-full object-cover w-10 h-10" />
                </td>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3 text-gray-600">{p.jabatan}</td>
                <td className="p-3 text-right space-x-2">
                  <Link href={`/admin/struktur-desa/edit/${p._id}`} className="text-yellow-500 hover:underline">Edit</Link>
                  <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}