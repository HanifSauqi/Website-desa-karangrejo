// file: backend/index.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Inisialisasi aplikasi Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Mengizinkan Cross-Origin Resource Sharing
app.use(express.json()); // Mem-parsing body request sebagai JSON

// Koneksi ke Database MongoDB Atlas (tanpa opsi yang usang)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Berhasil terhubung ke MongoDB Atlas!'))
  .catch(err => console.error('❌ Gagal terhubung ke MongoDB Atlas:', err.message));

// === PENDAFTARAN ROUTES (RUTE API) ===
// Baris di bawah ini akan memuat file-file rute yang akan kita buat nanti.
// Jika file-nya belum ada, server akan error. Kita akan membuatnya setelah ini.
const authRoutes = require('./routes/auth');
const beritaRoutes = require('./routes/berita');
const kontenRoutes = require('./routes/konten'); 
const pejabatroutes = require('./routes/pejabat');

// Menggunakan rute tersebut dengan prefix /api
// Semua rute di auth.js akan diawali dengan /api/auth
app.use('/api/auth', authRoutes);
// Semua rute di berita.js akan diawali dengan /api/berita
app.use('/api/konten', kontenRoutes);

app.use('/api/berita', beritaRoutes);
// Semua rute di pejabat.js akan diawali dengan /api/pejabat
app.use('/api/pejabat', pejabatroutes);


// Route dasar untuk tes apakah server berjalan
app.get('/', (req, res) => {
  res.send('API Server Desa Karangrejo berjalan!');
});

// Menjalankan server pada port yang ditentukan
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});