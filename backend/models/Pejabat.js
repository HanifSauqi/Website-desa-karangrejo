// file: backend/models/Pejabat.js
const mongoose = require('mongoose');

const PejabatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  jabatan: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  // Field untuk pengurutan/level hirarki
  urutan: { type: Number, default: 0 }, 
  // Field untuk relasi atasan (opsional, untuk struktur pohon)
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pejabat', default: null }
}, { timestamps: true });

module.exports = mongoose.model('Pejabat', PejabatSchema);