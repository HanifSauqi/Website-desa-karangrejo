// file: frontend/src/app/admin/struktur-desa/tambah/page.js
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import PejabatForm from '@/components/admin/PejabatForm';
import Link from 'next/link';

export default function TambahPejabatPage() {
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSave = async (formData) => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pejabat`, formData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push('/admin/struktur-desa');
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
        <Link href="/admin/struktur-desa" className="text-blue-600 hover:underline">
            &larr; Kembali ke Daftar
        </Link>
        <h1 className="text-3xl font-bold mt-2">Tambah Data Pejabat Baru</h1>
      </div>
      <PejabatForm onSave={handleSave} isSaving={isSaving} />
    </div>
  );
}