// file: frontend/src/app/admin/struktur-desa/edit/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import PejabatForm from '@/components/admin/PejabatForm';
import Link from 'next/link';

export default function EditPejabatPage() {
  const [initialData, setInitialData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pejabat/${id}`);
          setInitialData(res.data);
        } catch (error) {
          console.error("Gagal mengambil data pejabat:", error);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleSave = async (formData) => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/pejabat/${id}`, formData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push('/admin/struktur-desa');
    } catch (error) {
      console.error('Gagal mengupdate data:', error);
      alert('Gagal mengupdate data. Cek console untuk detail.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!initialData) return <p>Loading data...</p>;

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/struktur-desa" className="text-blue-600 hover:underline">
            &larr; Kembali ke Daftar
        </Link>
        <h1 className="text-3xl font-bold mt-2">Edit Data Pejabat</h1>
      </div>
      <PejabatForm onSave={handleSave} initialData={initialData} isSaving={isSaving} />
    </div>
  );
}