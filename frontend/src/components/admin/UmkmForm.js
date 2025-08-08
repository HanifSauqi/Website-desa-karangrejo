// file: frontend/src/components/admin/UmkmForm.js
'use client';

import { useState } from 'react';
import Image from 'next/image';

const UmkmForm = ({ onSave, initialData = {}, isSaving }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    category: initialData.category || 'Kuliner',
    owner: initialData.owner || '',
    contact: initialData.contact || '',
    description: initialData.description || '',
    position: initialData.position ? JSON.stringify(initialData.position) : '[]', 
  });
  // State khusus untuk mengelola daftar produk sebagai array of objects
  const [products, setProducts] = useState(initialData.products || [{ name: '', price: '' }]);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [mainImagePreview, setMainImagePreview] = useState(initialData.imageUrl || '');
  const [galleryPreviews, setGalleryPreviews] = useState(initialData.galleryImages || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Fungsi untuk mengubah data di dalam daftar produk
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };
  
  // Fungsi untuk menambah baris produk baru
  const handleAddProduct = () => {
    setProducts([...products, { name: '', price: '' }]);
  };

  // Fungsi untuk menghapus baris produk
  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3); // Batasi maks 3 file
    setGalleryFiles(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setGalleryPreviews(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = new FormData();
    Object.keys(formData).forEach(key => dataToSubmit.append(key, formData[key]));
    
    // Konversi array products menjadi string JSON sebelum dikirim
    dataToSubmit.append('products', JSON.stringify(products));

    if (mainImageFile) {
      dataToSubmit.append('imageUrl', mainImageFile);
    } else {
      dataToSubmit.append('existingImageUrl', initialData.imageUrl || '');
    }

    galleryFiles.forEach(file => {
      dataToSubmit.append('galleryImages', file);
    });
    
    onSave(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium mb-1">Nama Usaha</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block font-medium mb-1">Kategori</label>
          <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded bg-white">
            <option>Kuliner</option>
            <option>Oleh-oleh</option>
            <option>Kerajinan</option>
            <option>Jasa</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Nama Pemilik</label>
          <input type="text" name="owner" value={formData.owner} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block font-medium mb-1">Kontak (No. HP)</label>
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="md:col-span-2">
            <label className="block font-medium mb-1">Koordinat Peta (Longitude, Latitude)</label>
            <input type="text" name="position" value={formData.position} onChange={handleChange} className="w-full p-2 border rounded" placeholder='Contoh: [111.137, -8.087]' required />
            <p className="text-xs text-gray-500 mt-1">Gunakan format `[longitude, latitude]`. Contoh `[111.123, -8.123]`.</p>
        </div>
      </div>
      <div>
        <label className="block font-medium mb-1">Deskripsi Usaha</label>
        <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full p-2 border rounded"></textarea>
      </div>
      
      {/* Bagian Daftar Produk yang Dinamis */}
      <div>
        <label className="block font-medium mb-2">Daftar Produk Unggulan</label>
        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border rounded-lg bg-slate-50">
              <input 
                type="text" 
                placeholder="Nama Produk" 
                value={product.name}
                onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input 
                type="text" 
                placeholder="Harga (Contoh: Rp 25.000)" 
                value={product.price}
                onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button 
                type="button" 
                onClick={() => handleRemoveProduct(index)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                aria-label="Hapus produk"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
          <button 
            type="button" 
            onClick={handleAddProduct}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            + Tambah Produk
          </button>
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Foto Utama (Wajib)</label>
        <input type="file" accept="image/*" onChange={handleMainImageChange} className="w-full p-2 border rounded text-sm" />
        {mainImagePreview && <div className="mt-4 relative w-40 h-40 border rounded-lg overflow-hidden"><Image src={mainImagePreview} alt="Preview Utama" fill className="object-cover" /></div>}
      </div>
      <div>
        <label className="block font-medium mb-1">Foto Galeri (Maksimal 3)</label>
        <input type="file" accept="image/*" multiple onChange={handleGalleryChange} className="w-full p-2 border rounded text-sm" />
        <div className="mt-4 flex gap-4">
          {galleryPreviews.map((src, index) => <div key={index} className="relative w-24 h-24 border rounded-lg overflow-hidden"><Image src={src} alt={`Preview Galeri ${index + 1}`} fill className="object-cover" /></div>)}
        </div>
      </div>
      <button type="submit" disabled={isSaving} className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-300">
        {isSaving ? 'Menyimpan...' : 'Simpan'}
      </button>
    </form>
  );
};

export default UmkmForm;