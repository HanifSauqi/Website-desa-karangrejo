// file: frontend/src/components/admin/BeritaForm.js
'use client';

import { useState } from 'react';
import Image from 'next/image';

const BeritaForm = ({ onSave, initialData = {}, isSaving }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    author: initialData.author || 'Admin Desa',
    excerpt: initialData.excerpt || '',
    content: initialData.content || '', // <-- 'content' sekarang ada di formData
  });
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
    // Kirim semua data dari formData, termasuk 'content'
    Object.keys(formData).forEach(key => dataToSubmit.append(key, formData[key]));
    
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
      
      {/* --- BAGIAN REACT QUILL DIHAPUS DAN DIGANTI DENGAN TEXTAREA BIASA --- */}
      <div>
        <label className="block font-medium mb-1">Isi Berita Lengkap</label>
        <textarea 
          name="content" 
          value={formData.content} 
          onChange={handleChange} 
          rows="10" 
          className="w-full p-2 border rounded"
          placeholder="Tulis isi berita di sini..."
        ></textarea>
      </div>

      <div>
        <label className="block font-medium mb-1">Gambar Utama</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded text-sm" />
        {imagePreview && (
          <div className="mt-4 relative w-full h-64 border rounded-lg overflow-hidden">
            <Image src={imagePreview} alt="Preview" fill className="object-cover" />
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