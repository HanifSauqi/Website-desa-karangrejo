// file: frontend/src/app/admin/umkm/edit/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import UmkmForm from '@/components/admin/UmkmForm';
import Link from 'next/link';

export default function EditUmkmPage() {
  const [initialData, setInitialData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/umkm`);
          const umkmToEdit = res.data.find(item => item._id === id);
          setInitialData(umkmToEdit);
        } catch (error) {
          console.error("Gagal mengambil data UMKM:", error);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleSave = async (formData) => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/umkm/${id}`, formData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push('/admin/umkm');
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
        <Link href="/admin/umkm" className="text-blue-600 hover:underline">&larr; Kembali ke Daftar</Link>
        <h1 className="text-3xl font-bold mt-2">Edit Data UMKM</h1>
      </div>
      <UmkmForm onSave={handleSave} initialData={initialData} isSaving={isSaving} />
    </div>
  );
}