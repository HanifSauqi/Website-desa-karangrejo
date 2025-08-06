// file: frontend/src/app/admin/tentang-desa/page.js
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

const TentangDesaAdminPage = () => {
    const [formData, setFormData] = useState({
        deskripsi: {},
        demografi: {},
        apbdes: {},
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const pageKey = 'tentang-desa';

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/konten/${pageKey}`);
                if (res.data) {
                    setFormData(res.data);
                    if (res.data.deskripsi?.imageUrl) {
                        setImagePreview(res.data.deskripsi.imageUrl);
                    }
                }
            } catch (error) { console.error("Gagal mengambil data", error); } 
            finally { setLoading(false); }
        };
        fetchData();
    }, []);

    const handleChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        const dataToSubmit = new FormData();
        
        // Memasukkan semua data dari state ke FormData
        dataToSubmit.append('sejarah', formData.deskripsi?.sejarah || '');
        dataToSubmit.append('visi', formData.deskripsi?.visi || '');
        dataToSubmit.append('misi', formData.deskripsi?.misi || '');
        
        dataToSubmit.append('totalPenduduk', formData.demografi?.totalPenduduk || 0);
        dataToSubmit.append('lakiLaki', formData.demografi?.lakiLaki || 0);
        dataToSubmit.append('perempuan', formData.demografi?.perempuan || 0);
        dataToSubmit.append('totalKK', formData.demografi?.totalKK || 0);
        
        dataToSubmit.append('pendapatanAsliDesa', formData.apbdes?.pendapatanAsliDesa || 0);
        dataToSubmit.append('pendapatanTransfer', formData.apbdes?.pendapatanTransfer || 0);
        dataToSubmit.append('belanjaPemerintahan', formData.apbdes?.belanjaPemerintahan || 0);
        dataToSubmit.append('belanjaPembangunan', formData.apbdes?.belanjaPembangunan || 0);
        dataToSubmit.append('belanjaPemberdayaan', formData.apbdes?.belanjaPemberdayaan || 0);

        if (imageFile) {
            dataToSubmit.append('image', imageFile);
        } else {
            dataToSubmit.append('existingImageUrl', formData.deskripsi?.imageUrl || '');
        }

        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/konten/${pageKey}`, dataToSubmit, {
                headers: { 'x-auth-token': token, 'Content-Type': 'multipart/form-data' }
            });
            setMessage('Data berhasil disimpan!');
            if (res.data?.deskripsi?.imageUrl) {
                setImagePreview(res.data.deskripsi.imageUrl);
                setFormData(prev => ({...prev, deskripsi: {...prev.deskripsi, imageUrl: res.data.deskripsi.imageUrl}}));
            }
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error(error);
            setMessage('Gagal menyimpan data. Pastikan token login valid.');
            setTimeout(() => setMessage(''), 3000);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p>Loading data konten...</p>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-gray-100 py-4 z-10">
                <h1 className="text-3xl font-bold">Edit Halaman Tentang Desa</h1>
                <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-300">
                    {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
            </div>
            {message && <p className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</p>}

            {/* Form Deskripsi, Visi, Misi & Gambar */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Konten Deskripsi</h2>
                <div className="mb-6">
                    <label className="block mb-2 font-medium">Gambar Utama Halaman</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                    {imagePreview && (
                        <div className="mt-4 relative w-full h-64 border rounded-lg overflow-hidden">
                            <Image src={imagePreview} alt="Preview" layout="fill" objectFit="cover" />
                        </div>
                    )}
                </div>
                <label className="block mb-2 font-medium">Sejarah</label>
                <textarea value={formData.deskripsi?.sejarah || ''} onChange={e => handleChange('deskripsi', 'sejarah', e.target.value)} className="w-full p-2 border rounded h-24"></textarea>
                <label className="block mt-4 mb-2 font-medium">Visi</label>
                <textarea value={formData.deskripsi?.visi || ''} onChange={e => handleChange('deskripsi', 'visi', e.target.value)} className="w-full p-2 border rounded"></textarea>
                <label className="block mt-4 mb-2 font-medium">Misi (pisahkan tiap poin dengan baris baru)</label>
                <textarea value={formData.deskripsi?.misi || ''} onChange={e => handleChange('deskripsi', 'misi', e.target.value)} className="w-full p-2 border rounded h-24"></textarea>
            </div>

            {/* Form Demografi */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Data Demografi</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 text-sm">Total Penduduk</label>
                        <input type="number" value={formData.demografi?.totalPenduduk || ''} onChange={e => handleChange('demografi', 'totalPenduduk', e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm">Jumlah Laki-laki</label>
                        <input type="number" value={formData.demografi?.lakiLaki || ''} onChange={e => handleChange('demografi', 'lakiLaki', e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm">Jumlah Perempuan</label>
                        <input type="number" value={formData.demografi?.perempuan || ''} onChange={e => handleChange('demografi', 'perempuan', e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm">Total KK</label>
                        <input type="number" value={formData.demografi?.totalKK || ''} onChange={e => handleChange('demografi', 'totalKK', e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                </div>
            </div>

            {/* Form APBDes */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Data APBDes (Anggaran)</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 text-sm">Pendapatan Asli Desa</label>
                        <input type="number" value={formData.apbdes?.pendapatanAsliDesa || ''} onChange={e => handleChange('apbdes', 'pendapatanAsliDesa', e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm">Pendapatan Transfer</label>
                        <input type="number" value={formData.apbdes?.pendapatanTransfer || ''} onChange={e => handleChange('apbdes', 'pendapatanTransfer', e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm">Belanja Pemerintahan</label>
                        <input type="number" value={formData.apbdes?.belanjaPemerintahan || ''} onChange={e => handleChange('apbdes', 'belanjaPemerintahan', e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm">Belanja Pembangunan</label>
                        <input type="number" value={formData.apbdes?.belanjaPembangunan || ''} onChange={e => handleChange('apbdes', 'belanjaPembangunan', e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm">Belanja Pemberdayaan</label>
                        <input type="number" value={formData.apbdes?.belanjaPemberdayaan || ''} onChange={e => handleChange('apbdes', 'belanjaPemberdayaan', e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TentangDesaAdminPage;