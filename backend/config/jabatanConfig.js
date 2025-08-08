// file: backend/config/jabatanConfig.js

const JABATAN_LIST = [
  // Level 1
  { nama: 'Kepala Desa', urutan: 1, atasan: null },
  
  // Level 2
  { nama: 'Sekretaris Desa', urutan: 2, atasan: 'Kepala Desa' },
  { nama: 'Kepala Dusun', urutan: 3, atasan: 'Kepala Desa' },

  // Level 3 (di bawah Sekretaris Desa)
  { nama: 'Kaur Keuangan', urutan: 10, atasan: 'Sekretaris Desa' },
  { nama: 'Kaur Tata Usaha & Umum', urutan: 11, atasan: 'Sekretaris Desa' },
  { nama: 'Kaur Perencanaan', urutan: 12, atasan: 'Sekretaris Desa' },
  { nama: 'Kasi Pemerintahan', urutan: 20, atasan: 'Sekretaris Desa' },
  { nama: 'Kasi Pelayanan', urutan: 21, atasan: 'Sekretaris Desa' },
  { nama: 'Kasi Kesejahteraan', urutan: 22, atasan: 'Sekretaris Desa' },

  // Level 3 (di bawah Kepala Dusun)
  { nama: 'Kepala Dusun Krajan', urutan: 30, atasan: 'Kepala Dusun' },
  { nama: 'Kepala Dusun Brungkah', urutan: 31, atasan: 'Kepala Dusun' },
  { nama: 'Kepala Dusun Pringapus', urutan: 32, atasan: 'Kepala Dusun' },
  { nama: 'Kepala Dusun Ringin Putih', urutan: 33, atasan: 'Kepala Dusun' },
  { nama: 'Kepala Dusun Trobakal', urutan: 34, atasan: 'Kepala Dusun' },
  { nama: 'Kepala Dusun Wonosari', urutan: 35, atasan: 'Kepala Dusun' },
];

module.exports = JABATAN_LIST;