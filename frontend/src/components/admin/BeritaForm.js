// file: frontend/src/components/admin/BeritaForm.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Impor CSS untuk editor

// Impor ReactQuill secara dinamis agar tidak error di server
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const BeritaForm = ({ onSave, initialData = {}, isSaving }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    author: initialData.author || 'Admin Desa',
    excerpt: initialData.excerpt || '',
  });
  const [content, setContent] = useState(initialData.content || '');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData.imageUrl || '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = new FormData();
    Object.keys(formData).forEach(key => dataToSubmit.append(key, formData[key]));
    dataToSubmit.append('content', content);
    
    if (imageFile) {
      dataToSubmit.append('image', imageFile);
    } else {
      dataToSubmit.append('existingImageUrl', initialData.imageUrl || '');
    }
    onSave(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div>
        <label className="block font-medium mb-1">Judul Berita</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>

      <div>
        <label className="block font-medium mb-1">Ringkasan (Excerpt)</label>
        <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} rows="3" className="w-full p-2 border rounded"></textarea>
      </div>
      
      <div>
        <label className="block font-medium mb-1">Isi Berita Lengkap</label>
        <div className="bg-white">
          <ReactQuill theme="snow" value={content} onChange={setContent} style={{ height: '250px', marginBottom: '40px' }} />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Gambar Utama</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded text-sm" />
        {imagePreview && (
          <div className="mt-4 relative w-full h-64 border rounded-lg overflow-hidden">
            <Image src={imagePreview} alt="Preview" layout="fill" objectFit="cover" />
          </div>
        )}
      </div>

       <div>
        <label className="block font-medium mb-1">Penulis</label>
        <input type="text" name="author" value={formData.author} onChange={handleChange} className="w-full p-2 border rounded bg-gray-100" />
      </div>

      <button type="submit" disabled={isSaving} className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-300">
        {isSaving ? 'Menyimpan...' : 'Simpan Berita'}
      </button>
    </form>
  );
};

export default BeritaForm;