// file: frontend/src/app/admin/peternakan/page.js
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPeternakanPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Daftar dusun yang sudah ditentukan
  const DUSUN_LIST = ['Krajan', 'Wonosari', 'Trobakal', 'Brungkah', 'Pringapus', 'Ringin Putih'];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/peternakan`);
        
        // Gabungkan data dari server dengan daftar dusun default
        const initialData = DUSUN_LIST.map(dusunName => {
            const existingData = res.data.find(d => d.dusun === dusunName);
            return existingData || {
                dusun: dusunName,
                kambing: { jantan: 0, betina: 0 }
            };
        });
        setData(initialData);

      } catch (error) { 
        console.error("Gagal mengambil data", error); 
        // Jika gagal fetch, tetap tampilkan form kosong
        setData(DUSUN_LIST.map(d => ({ dusun: d, kambing: { jantan: 0, betina: 0 } })));
      } 
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const handleChange = (index, gender, value) => {
    const updatedData = [...data];
    updatedData[index].kambing[gender] = parseInt(value) || 0;
    setData(updatedData);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/peternakan`, { data }, {
        headers: { 'x-auth-token': token }
      });
      setMessage('Data berhasil disimpan!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Gagal menyimpan data.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manajemen Data Ternak Kambing</h1>
        <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-300">
          {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>
      {message && <p className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</p>}
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-600 mb-4">Masukkan jumlah populasi kambing jantan dan betina untuk setiap dusun.</p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left font-semibold">Dusun</th>
                <th className="p-3 text-center font-semibold">Jantan (Ekor)</th>
                <th className="p-3 text-center font-semibold">Betina (Ekor)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.dusun} className="border-b">
                  <td className="p-3 font-medium text-gray-800">{item.dusun}</td>
                  <td className="p-2"><input type="number" value={item.kambing.jantan} onChange={e => handleChange(index, 'jantan', e.target.value)} className="w-full md:w-32 mx-auto p-2 border rounded text-center" /></td>
                  <td className="p-2"><input type="number" value={item.kambing.betina} onChange={e => handleChange(index, 'betina', e.target.value)} className="w-full md:w-32 mx-auto p-2 border rounded text-center" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPeternakanPage;