// file: frontend/src/app/admin/umkm/tambah/page.js
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import UmkmForm from '@/components/admin/UmkmForm';
import Link from 'next/link';

export default function TambahUmkmPage() {
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSave = async (formData) => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/umkm`, formData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push('/admin/umkm');
    } catch (error) {
      console.error('Gagal menambah data:', error);
      alert('Gagal menambah data. Cek console untuk detail.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/umkm" className="text-blue-600 hover:underline">&larr; Kembali ke Daftar</Link>
        <h1 className="text-3xl font-bold mt-2">Tambah Data UMKM Baru</h1>
      </div>
      <UmkmForm onSave={handleSave} isSaving={isSaving} />
    </div>
  );
}