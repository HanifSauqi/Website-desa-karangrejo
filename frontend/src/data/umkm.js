// file: frontend/src/data/umkm.js

export const umkmData = [
  {
    id: 1,
    name: 'Warung Sate Kelinci Pak Tono',
    slug: 'sate-kelinci-pak-tono',
    category: 'Kuliner',
    owner: 'Bapak Tono',
    description: 'Sate kelinci legendaris Pak Tono telah berdiri sejak tahun 1998. Menggunakan resep bumbu kacang turun-temurun, sate ini menjadi kuliner wajib bagi siapa saja yang mengunjungi Desa Karangrejo. Dagingnya yang empuk dan bebas kolesterol menjadi daya tarik utama.',
    position: [-8.087, 111.137], // Koordinat di Karangrejo
    imageUrl: '/images/umkm/sate-kelinci.jpg',
    galleryImages: [
      '/images/umkm/sate-gallery-1.jpg',
      '/images/umkm/sate-gallery-2.jpg',
      '/images/umkm/sate-gallery-3.jpg',
    ],
    products: [
      { name: 'Sate Kelinci (10 tusuk)', price: 'Rp 25.000' },
      { name: 'Gulai Kelinci', price: 'Rp 20.000' },
    ],
    contact: '0812-3456-7890',
  },
  {
    id: 2,
    name: 'Keripik Apel Bu Wati',
    slug: 'keripik-apel-bu-wati',
    category: 'Oleh-oleh',
    owner: 'Ibu Wati',
    description: 'Diproduksi dari apel manalagi pilihan yang dipanen langsung dari kebun lokal. Keripik Apel Bu Wati diolah secara higienis tanpa bahan pengawet, menghasilkan camilan yang renyah, manis, dan sehat untuk keluarga.',
    position: [-8.085, 111.134], // Koordinat di Karangrejo
    imageUrl: '/images/umkm/keripik-apel.jpg',
    galleryImages: [
      '/images/umkm/keripik-gallery-1.jpg',
      '/images/umkm/keripik-gallery-2.jpg',
    ],
    products: [
      { name: 'Keripik Apel Original 250gr', price: 'Rp 30.000' },
      { name: 'Keripik Apel Rasa Coklat 250gr', price: 'Rp 35.000' },
    ],
    contact: '0856-7890-1234',
  },
  {
    id: 3,
    name: 'Batik Tulis "Sekar Jagad"',
    slug: 'batik-tulis-sekar-jagad',
    category: 'Kerajinan',
    owner: 'Sanggar Sekar Jagad',
    description: 'Sebuah sanggar yang melestarikan seni batik tulis tradisional dengan motif khas Desa Karangrejo. Setiap kain adalah sebuah mahakarya yang dibuat dengan penuh ketelitian dan cinta, menceritakan filosofi dan keindahan alam sekitar.',
    position: [-8.090, 111.136], // Koordinat di Karangrejo
    imageUrl: '/images/umkm/batik.jpg',
    galleryImages: [
        '/images/umkm/batik-gallery-1.jpg',
        '/images/umkm/batik-gallery-2.jpg',
    ],
    products: [
      { name: 'Kain Batik Tulis Katun (2m)', price: 'Mulai dari Rp 350.000' },
      { name: 'Kain Batik Tulis Sutra (2m)', price: 'Mulai dari Rp 700.000' },
    ],
    contact: '0890-1234-5678',
  },
];