// file: backend/models/Berita.js
const mongoose = require('mongoose');

const BeritaSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  imageUrl: { type: String, required: true },
  author: { type: String, default: 'Admin Desa' },
  excerpt: { type: String, required: true }, // Ringkasan singkat
  content: { type: String, required: true }, // Isi berita lengkap (bisa berisi HTML)
}, { timestamps: true });

module.exports = mongoose.model('Berita', BeritaSchema);