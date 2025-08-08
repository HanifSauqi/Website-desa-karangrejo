// file: frontend/src/app/admin/umkm/page.js
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminUmkmPage() {
  const [umkm, setUmkm] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/umkm`);
      setUmkm(res.data);
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
    if (confirm('Anda yakin ingin menghapus data UMKM ini?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/umkm/${id}`, {
          headers: { 'x-auth-token': token }
        });
        fetchData();
      } catch (error) {
        alert('Gagal menghapus data.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manajemen UMKM</h1>
        <Link href="/admin/umkm/tambah" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          + Tambah UMKM
        </Link>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Nama Usaha</th>
              <th className="p-3 text-left">Kategori</th>
              <th className="p-3 text-left">Pemilik</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {umkm.map(item => (
              <tr key={item._id} className="border-b">
                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3 text-gray-600">{item.category}</td>
                <td className="p-3 text-gray-600">{item.owner}</td>
                <td className="p-3 text-right space-x-2">
                  <Link href={`/admin/umkm/edit/${item._id}`} className="text-yellow-500 hover:underline">Edit</Link>
                  <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}