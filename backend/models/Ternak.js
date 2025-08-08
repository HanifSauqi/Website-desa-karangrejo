// file: backend/models/Peternakan.js
const mongoose = require('mongoose');

const PopulasiSchema = new mongoose.Schema({
  jantan: { type: Number, default: 0 },
  betina: { type: Number, default: 0 },
});

const PeternakanSchema = new mongoose.Schema({
  dusun: {
    type: String,
    required: true,
    unique: true, // Setiap dusun hanya punya satu entri data
  },
  kambing: PopulasiSchema,
  // Anda bisa menambahkan ternak lain di sini nanti, misal: sapi: PopulasiSchema
}, { timestamps: true });

module.exports = mongoose.model('Peternakan', PeternakanSchema);