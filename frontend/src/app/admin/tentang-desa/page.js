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
        const [uploadingImage, setUploadingImage] = useState(false);
        const [message, setMessage] = useState('');
        const [messageType, setMessageType] = useState('success'); // 'success' atau 'error'
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
                } catch (error) { 
                    console.error("Gagal mengambil data", error); 
                    showMessage('Gagal mengambil data', 'error');
                } finally { 
                    setLoading(false); 
                }
            };
            fetchData();
        }, []);

        const showMessage = (text, type = 'success') => {
            setMessage(text);
            setMessageType(type);
            setTimeout(() => setMessage(''), 4000);
        };

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
                // Validasi ukuran file (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    showMessage('Ukuran file terlalu besar. Maksimal 5MB.', 'error');
                    return;
                }
                
                // Validasi tipe file
                const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
                if (!allowedTypes.includes(file.type)) {
                    showMessage('Format file tidak didukung. Gunakan JPG, PNG, atau WebP.', 'error');
                    return;
                }

                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
            }
        };

        const handleSave = async () => {
            setSaving(true);
            setMessage('');
            
            try {
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

                const token = localStorage.getItem('token');
                const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/konten/${pageKey}`, dataToSubmit, {
                    headers: { 
                        'x-auth-token': token, 
                        'Content-Type': 'multipart/form-data' 
                    }
                });

                setFormData(res.data);
                if (res.data?.deskripsi?.imageUrl) {
                    setImagePreview(res.data.deskripsi.imageUrl);
                }
                setImageFile(null); // Reset file setelah berhasil upload
                showMessage('Data berhasil disimpan!', 'success');
                
            } catch (error) {
                console.error('Error saving data:', error);
                const errorMsg = error.response?.data?.message || 'Gagal menyimpan data. Pastikan token login valid.';
                showMessage(errorMsg, 'error');
            } finally {
                setSaving(false);
            }
        };

        if (loading) {
            return (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-gray-600">Loading data konten...</span>
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-gray-50">
                {/* Header dengan Sticky Save Button */}
                <div className="sticky top-0 bg-white shadow-sm border-b z-20 px-6 py-4">
                    <div className="flex justify-between items-center max-w-7xl mx-auto">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Edit Halaman Tentang Desa</h1>
                            <p className="text-gray-600 mt-1">Kelola informasi desa, demografi, dan anggaran</p>
                        </div>
                        <button 
                            onClick={handleSave} 
                            disabled={saving}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center gap-2 shadow-sm"
                        >
                            {saving ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                    Menyimpan...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Simpan Perubahan
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Alert Message */}
                    {message && (
                        <div className={`mb-6 p-4 rounded-lg border-l-4 ${
                            messageType === 'success' 
                                ? 'bg-green-50 border-green-400 text-green-700' 
                                : 'bg-red-50 border-red-400 text-red-700'
                        }`}>
                            <div className="flex items-center">
                                {messageType === 'success' ? (
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                )}
                                {message}
                            </div>
                        </div>
                    )}

                    {/* Form Deskripsi, Visi, Misi & Gambar */}
                    <div className="bg-white rounded-xl shadow-sm border mb-8">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                Konten Deskripsi
                            </h2>
                            <p className="text-gray-600 text-sm mt-1">Informasi umum dan gambar utama halaman</p>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            {/* Upload Gambar */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Gambar Utama Halaman
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleImageChange} 
                                        className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">Format: JPG, PNG, WebP (Maksimal 5MB)</p>
                                </div>
                                
                                {imagePreview && (
                                    <div className="mt-4 relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden border">
                                        <Image 
                                            src={imagePreview} 
                                            alt="Preview" 
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                            Preview
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sejarah */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Sejarah</label>
                                <textarea 
                                    value={formData.deskripsi?.sejarah || ''} 
                                    onChange={e => handleChange('deskripsi', 'sejarah', e.target.value)} 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors" 
                                    rows="4"
                                    placeholder="Masukkan sejarah desa..."
                                />
                            </div>

                            {/* Visi */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Visi</label>
                                <textarea 
                                    value={formData.deskripsi?.visi || ''} 
                                    onChange={e => handleChange('deskripsi', 'visi', e.target.value)} 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
                                    rows="3"
                                    placeholder="Masukkan visi desa..."
                                />
                            </div>

                            {/* Misi */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Misi 
                                    <span className="text-gray-500 font-normal">(pisahkan tiap poin dengan baris baru)</span>
                                </label>
                                <textarea 
                                    value={formData.deskripsi?.misi || ''} 
                                    onChange={e => handleChange('deskripsi', 'misi', e.target.value)} 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
                                    rows="4"
                                    placeholder="Masukkan misi desa (setiap poin di baris baru)..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Form Demografi */}
                    <div className="bg-white rounded-xl shadow-sm border mb-8">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Data Demografi
                            </h2>
                            <p className="text-gray-600 text-sm mt-1">Informasi kependudukan desa</p>
                        </div>
                        
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Total Penduduk</label>
                                    <input 
                                        type="number" 
                                        value={formData.demografi?.totalPenduduk || ''} 
                                        onChange={e => handleChange('demografi', 'totalPenduduk', e.target.value)} 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Jumlah Laki-laki</label>
                                    <input 
                                        type="number" 
                                        value={formData.demografi?.lakiLaki || ''} 
                                        onChange={e => handleChange('demografi', 'lakiLaki', e.target.value)} 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Jumlah Perempuan</label>
                                    <input 
                                        type="number" 
                                        value={formData.demografi?.perempuan || ''} 
                                        onChange={e => handleChange('demografi', 'perempuan', e.target.value)} 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Total KK</label>
                                    <input 
                                        type="number" 
                                        value={formData.demografi?.totalKK || ''} 
                                        onChange={e => handleChange('demografi', 'totalKK', e.target.value)} 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form APBDes */}
                    <div className="bg-white rounded-xl shadow-sm border mb-8">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Data APBDes (Anggaran)
                            </h2>
                            <p className="text-gray-600 text-sm mt-1">Anggaran Pendapatan dan Belanja Desa</p>
                        </div>
                        
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-3">
                                    <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                                        <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                                        Pendapatan
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Pendapatan Asli Desa</label>
                                            <input 
                                                type="number" 
                                                value={formData.apbdes?.pendapatanAsliDesa || ''} 
                                                onChange={e => handleChange('apbdes', 'pendapatanAsliDesa', e.target.value)} 
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
                                                placeholder="0"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Pendapatan Transfer</label>
                                            <input 
                                                type="number" 
                                                value={formData.apbdes?.pendapatanTransfer || ''} 
                                                onChange={e => handleChange('apbdes', 'pendapatanTransfer', e.target.value)} 
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="lg:col-span-3">
                                    <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                                        <span className="w-4 h-4 bg-red-500 rounded-full mr-2"></span>
                                        Belanja
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Belanja Pemerintahan</label>
                                            <input 
                                                type="number" 
                                                value={formData.apbdes?.belanjaPemerintahan || ''} 
                                                onChange={e => handleChange('apbdes', 'belanjaPemerintahan', e.target.value)} 
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
                                                placeholder="0"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Belanja Pembangunan</label>
                                            <input 
                                                type="number" 
                                                value={formData.apbdes?.belanjaPembangunan || ''} 
                                                onChange={e => handleChange('apbdes', 'belanjaPembangunan', e.target.value)} 
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
                                                placeholder="0"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Belanja Pemberdayaan</label>
                                            <input 
                                                type="number" 
                                                value={formData.apbdes?.belanjaPemberdayaan || ''} 
                                                onChange={e => handleChange('apbdes', 'belanjaPemberdayaan', e.target.value)} 
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Save Button untuk Mobile */}
                    <div className="md:hidden fixed bottom-4 left-4 right-4 z-10">
                        <button 
                            onClick={handleSave} 
                            disabled={saving}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg"
                        >
                            {saving ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                    Menyimpan...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Simpan Perubahan
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    export default TentangDesaAdminPage;