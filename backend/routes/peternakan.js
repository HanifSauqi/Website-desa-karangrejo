// file: backend/routes/peternakan.js
const express = require('express');
const router = express.Router();
const Peternakan = require('../models/Ternak');
const authMiddleware = require('../middleware/authMiddleware');

// === RUTE PUBLIK ===
// GET: Mengambil semua data peternakan
router.get('/', async (req, res) => {
  try {
    const data = await Peternakan.find().sort({ dusun: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// === RUTE ADMIN (DIPROTEKSI) ===
// PUT: Mengupdate data untuk semua dusun sekaligus
router.put('/', authMiddleware, async (req, res) => {
  const dataPerDusun = req.body.data; // Menerima array data dari frontend

  if (!Array.isArray(dataPerDusun)) {
    return res.status(400).json({ message: 'Format data tidak valid.' });
  }

  try {
    const operations = dataPerDusun.map(item => ({
      updateOne: {
        filter: { dusun: item.dusun },
        update: { $set: { kambing: item.kambing } },
        upsert: true, // Buat baru jika dusun belum ada di database
      },
    }));

    await Peternakan.bulkWrite(operations); // Menjalankan semua update sekaligus

    res.status(200).json({ message: 'Data peternakan berhasil diperbarui.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;