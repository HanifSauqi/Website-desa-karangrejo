// file: frontend/src/app/admin/galeri/page.js
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';

export default function AdminGaleriPage() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [altText, setAltText] = useState('');
  const [message, setMessage] = useState('');

  const fetchPhotos = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/galeri`);
      setPhotos(res.data);
    } catch (error) { console.error("Gagal mengambil foto:", error); } 
    finally { setLoading(false); }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleFileChange = (e) => {
    setFilesToUpload(Array.from(e.target.files));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (filesToUpload.length === 0) {
      alert('Pilih file terlebih dahulu.');
      return;
    }
    setUploading(true);
    setMessage('');
    const formData = new FormData();
    filesToUpload.forEach(file => {
      formData.append('images', file);
    });
    formData.append('alt', altText);

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/galeri`, formData, {
        headers: { 'x-auth-token': token, 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Foto berhasil diunggah!');
      setFilesToUpload([]);
      setAltText('');
      fetchPhotos(); // Muat ulang galeri
    } catch (error) {
      setMessage('Gagal mengunggah foto.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Anda yakin ingin menghapus foto ini?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/galeri/${id}`, {
          headers: { 'x-auth-token': token }
        });
        fetchPhotos();
      } catch (error) { alert('Gagal menghapus foto.'); }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manajemen Galeri</h1>
      
      {/* Form Upload */}
      <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Unggah Foto Baru</h2>
        {message && <p className="text-green-600 mb-4">{message}</p>}
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Pilih Foto (bisa lebih dari satu)</label>
            <input type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-medium mb-1">Deskripsi Foto (Alt Text)</label>
            <input type="text" value={altText} onChange={e => setAltText(e.target.value)} placeholder="Contoh: Kegiatan gotong royong warga" className="w-full p-2 border rounded" required />
          </div>
          <button type="submit" disabled={uploading} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300">
            {uploading ? 'Mengunggah...' : 'Unggah'}
          </button>
        </div>
      </form>

      {/* Tampilan Galeri */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Galeri Tersimpan</h2>
        {loading ? <p>Loading...</p> : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {photos.map(photo => (
              <div key={photo._id} className="relative group">
                <Image src={photo.imageUrl} alt={photo.alt} width={200} height={200} className="w-full h-32 object-cover rounded-md" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center">
                  <button onClick={() => handleDelete(photo._id)} className="text-white text-2xl">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}