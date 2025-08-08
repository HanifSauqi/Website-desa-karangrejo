// file: frontend/src/components/admin/PejabatForm.js
'use client';

import { useState } from 'react';
import Image from 'next/image';

// Daftar jabatan kita definisikan di sini agar bisa diakses form
const JABATAN_OPTIONS = [
  'Kepala Desa', 'Sekretaris Desa', 'Perangkat Kewilayahan',
  'Kaur Keuangan', 'Kaur Tata Usaha & Umum', 'Kaur Perencanaan',
  'Kasi Pemerintahan', 'Kasi Pelayanan', 'Kasi Kesejahteraan',
  'Kepala Dusun Krajan', 'Kepala Dusun Brungkah', 'Kepala Dusun Pringapus',
  'Kepala Dusun Ringin Putih', 'Kepala Dusun Trobakal', 'Kepala Dusun Wonosari'
];

const PejabatForm = ({ onSave, initialData = {}, isSaving }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    jabatan: initialData.jabatan || JABATAN_OPTIONS[0],
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
    dataToSubmit.append('name', formData.name);
    dataToSubmit.append('jabatan', formData.jabatan);
    
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
        <label className="block font-medium mb-1">Nama Lengkap</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>
      
      <div>
        <label className="block font-medium mb-1">Jabatan</label>
        <select name="jabatan" value={formData.jabatan} onChange={handleChange} className="w-full p-2 border rounded bg-white">
          {JABATAN_OPTIONS.map(jabatan => (
            <option key={jabatan} value={jabatan}>{jabatan}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Foto Pejabat</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded text-sm" />
        {imagePreview && (
          <div className="mt-4 relative w-40 h-40 border rounded-lg overflow-hidden">
            <Image src={imagePreview} alt="Preview" layout="fill" objectFit="cover" />
          </div>
        )}
      </div>
      <button type="submit" disabled={isSaving} className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-300">
        {isSaving ? 'Menyimpan...' : 'Simpan'}
      </button>
    </form>
  );
};

export default PejabatForm;