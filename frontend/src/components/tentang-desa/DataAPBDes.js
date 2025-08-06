// file: frontend/src/components/profil-desa/DataAPBDes.js
import { FaArrowDown, FaArrowUp, FaFileInvoiceDollar } from 'react-icons/fa';

// Komponen kecil untuk satu item, sekarang lebih aman jika value kosong
const AnggaranItem = ({ label, value = 0, isSubItem = false }) => (
  <div className={`flex justify-between items-center p-4 rounded-md ${isSubItem ? 'bg-white' : 'bg-gray-100'}`}>
    <p className={`text-gray-700 ${isSubItem ? 'pl-4' : 'font-bold'}`}>{label}</p>
    <p className="font-bold text-gray-800 text-lg">
      Rp {new Intl.NumberFormat('id-ID').format(value)}
    </p>
  </div>
);

// Komponen utama sekarang menerima 'data' sebagai props
const DataAPBDes = ({ data }) => {
  // Hitung total secara dinamis dari data props
  const totalPendapatan = (data?.pendapatanAsliDesa || 0) + (data?.pendapatanTransfer || 0);
  const totalBelanja = (data?.belanjaPemerintahan || 0) + (data?.belanjaPembangunan || 0) + (data?.belanjaPemberdayaan || 0);

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border mt-8">
      <div className="text-center mb-8">
        <FaFileInvoiceDollar className="text-4xl text-blue-600 mx-auto mb-3" />
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Ringkasan APBDes 2025
        </h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="flex items-center text-xl font-semibold text-green-700 mb-2">
            <FaArrowDown className="mr-2" /> PENDAPATAN
          </h3>
          <div className="space-y-2 border-l-4 border-green-200 pl-4">
            {/* Nilai 'value' sekarang diambil dari data props */}
            <AnggaranItem label="Pendapatan Asli Desa" value={data?.pendapatanAsliDesa} isSubItem />
            <AnggaranItem label="Pendapatan Transfer" value={data?.pendapatanTransfer} isSubItem />
            <AnggaranItem label="Total Pendapatan" value={totalPendapatan} />
          </div>
        </div>

        <div>
          <h3 className="flex items-center text-xl font-semibold text-red-700 mb-2">
            <FaArrowUp className="mr-2" /> BELANJA
          </h3>
          <div className="space-y-2 border-l-4 border-red-200 pl-4">
            {/* Nilai 'value' sekarang diambil dari data props */}
            <AnggaranItem label="Bidang Pemerintahan" value={data?.belanjaPemerintahan} isSubItem />
            <AnggaranItem label="Bidang Pembangunan" value={data?.belanjaPembangunan} isSubItem />
            <AnggaranItem label="Bidang Pemberdayaan" value={data?.belanjaPemberdayaan} isSubItem />
            <AnggaranItem label="Total Belanja" value={totalBelanja} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAPBDes;