// file: frontend/src/app/admin/berita/tambah/page.js
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import BeritaForm from '@/components/admin/BeritaForm';
import Link from 'next/link';

export default function TambahBeritaPage() {
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSave = async (formData) => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/berita`, formData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push('/admin/berita');
    } catch (error) {
      console.error('Gagal menambah berita:', error);
      alert('Gagal menambah berita. Cek console untuk detail.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/berita" className="text-blue-600 hover:underline">
            &larr; Kembali ke Daftar Berita
        </Link>
        <h1 className="text-3xl font-bold mt-2">Tulis Berita Baru</h1>
      </div>
      <BeritaForm onSave={handleSave} isSaving={isSaving} />
    </div>
  );
}