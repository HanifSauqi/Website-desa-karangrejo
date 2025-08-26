// file: frontend/src/app/admin/berita/edit/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import BeritaForm from '@/components/admin/BeritaForm';
import Link from 'next/link';

export default function EditBeritaPage() {
  const [initialData, setInitialData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          // Kita perlu endpoint GET by ID di backend, untuk sementara filter dari semua
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/berita`);
          const beritaToEdit = res.data.find(item => item._id === id);
          setInitialData(beritaToEdit);
        } catch (error) {
          console.error("Gagal mengambil data berita:", error);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleSave = async (formData) => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/berita/${id}`, formData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push('/admin/berita');
    } catch (error) {
      console.error('Gagal mengupdate berita:', error);
      alert('Gagal mengupdate berita. Cek console untuk detail.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!initialData) return <p>Loading data berita...</p>;

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/berita" className="text-blue-600 hover:underline">
            &larr; Kembali ke Daftar Berita
        </Link>
        <h1 className="text-3xl font-bold mt-2">Edit Berita</h1>
      </div>
      <BeritaForm onSave={handleSave} initialData={initialData} isSaving={isSaving} />
    </div>
  );
}