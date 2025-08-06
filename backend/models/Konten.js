// file: backend/models/Konten.js
const mongoose = require('mongoose');

const KontenSchema = new mongoose.Schema({
  // Kunci unik untuk setiap halaman, misal: "tentang-desa"
  pageKey: {
    type: String,
    required: true,
    unique: true,
  },
  // Objek yang berisi semua data untuk halaman tersebut
  content: {
    deskripsi: {
      sejarah: String,
      visi: String,
      misi: String,
      imageUrl: String,
    },
    demografi: {
      totalPenduduk: Number,
      lakiLaki: Number,
      perempuan: Number,
      totalKK: Number,
    },
    apbdes: {
      pendapatanAsliDesa: Number,
      pendapatanTransfer: Number,
      belanjaPemerintahan: Number,
      belanjaPembangunan: Number,
      belanjaPemberdayaan: Number,
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Konten', KontenSchema);