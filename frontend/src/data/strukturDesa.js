// file: frontend/src/data/strukturDesa.js

// Pastikan Anda menyiapkan gambar di folder /public/images/pejabat/
// Saya menggunakan 'default.jpg' sebagai placeholder, silakan ganti dengan nama file foto yang sesuai.
export const dataStruktur = {
  name: "SARDI, SE",
  jabatan: "Kepala Desa",
  imageUrl: '/images/pejabat/kepala-desa2.webp',
  children: [
    {
      name: 'Mohamad Darussalam',
      jabatan: 'Sekretaris Desa',
      imageUrl: '/images/pejabat/default.jpg',
      children: [
        {
          name: 'Mohammad Toha',
          jabatan: 'Kaur Keuangan',
          imageUrl: '/images/pejabat/default.jpg',
        },
        {
          name: 'Bonangim',
          jabatan: 'Kaur Tata Usaha & Umum',
          imageUrl: '/images/pejabat/default.jpg',
        },
        {
          name: 'Sudarno',
          jabatan: 'Kaur Perencanaan',
          imageUrl: '/images/pejabat/default.jpg',
        },
        {
          name: 'Hery Susanto',
          jabatan: 'Kasi Pemerintahan',
          imageUrl: '/images/pejabat/default.jpg',
        },
        {
          name: 'M. Mujib',
          jabatan: 'Kasi Pelayanan',
          imageUrl: '/images/pejabat/default.jpg',
        },
        {
          name: 'Hasim',
          jabatan: 'Kasi Kesejahteraan',
          imageUrl: '/images/pejabat/default.jpg',
        },
      ],
    },
    {
      name: 'Perangkat Kewilayahan',
      jabatan: 'Kepala Dusun',
      imageUrl: '/images/pejabat/default.jpg', // Placeholder untuk grup
      children: [
        {
          name: "Imam Safi'i",
          jabatan: "Kepala Dusun Krajan",
          imageUrl: '/images/pejabat/default.jpg',
        },
        {
          name: 'Sidiq',
          jabatan: 'Kepala Dusun Brungkah',
          imageUrl: '/images/pejabat/default.jpg',
        },
        {
          name: 'Tungasir',
          jabatan: 'Kepala Dusun Pringapus',
          imageUrl: '/images/pejabat/default.jpg',
        },
        {
          name: 'Bambang Sutikno',
          jabatan: 'Kepala Dusun Ringin Putih',
          imageUrl: '/images/pejabat/default.jpg',
        },
        {
          name: "Ehsan Syafi'i",
          jabatan: 'Kepala Dusun Trobakal',
          imageUrl: '/images/pejabat/default.jpg',
        },
        {
          name: 'M. Tobib',
          jabatan: 'Kepala Dusun Wonosari',
          imageUrl: '/images/pejabat/default.jpg',
        },
      ],
    },
  ],
};