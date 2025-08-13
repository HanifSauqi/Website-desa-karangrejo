// file: backend/models/Galeri.js
const mongoose = require('mongoose');

const GaleriSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  alt: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Galeri', GaleriSchema);