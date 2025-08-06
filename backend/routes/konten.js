// file: backend/routes/konten.js
const express = require('express');
const router = express.Router();
const Konten = require('../models/Konten');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

// Konfigurasi Multer untuk menyimpan file di memori sementara
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET: Mengambil data konten berdasarkan kuncinya (pageKey)
router.get('/:pageKey', async (req, res) => {
  try {
    const konten = await Konten.findOne({ pageKey: req.params.pageKey });
    if (!konten) {
      // Kirim null jika belum ada data sama sekali
      return res.json(null);
    }
    res.json(konten.content);
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).send('Server Error');
  }
});

// PUT: Mengupdate data konten DENGAN UPLOAD GAMBAR
router.put(
  '/:pageKey', 
  authMiddleware, 
  upload.single('image'), // Middleware multer untuk 1 file dengan nama field 'image'
  async (req, res) => {
    try {
      const { pageKey } = req.params;
      const data = req.body;
      
      let imageUrl = data.existingImageUrl || '';

      // Jika ada file baru yang di-upload oleh admin
      if (req.file) {
        const filename = `${pageKey}-${Date.now()}.webp`;
        // Path ini mengarah ke folder public/uploads di proyek frontend Anda
        const outputPath = path.join(__dirname, `../../frontend/public/uploads/${filename}`);

        await sharp(req.file.buffer)
          .webp({ quality: 80 }) // Konversi ke WebP
          .toFile(outputPath);

        imageUrl = `/uploads/${filename}`; // Simpan path publik ini ke database
      }
      
      // Siapkan semua data dari form untuk disimpan ke database
      const contentToUpdate = {
        deskripsi: {
          sejarah: data.sejarah,
          visi: data.visi,
          misi: data.misi,
          imageUrl: imageUrl,
        },
        demografi: {
          totalPenduduk: data.totalPenduduk,
          lakiLaki: data.lakiLaki,
          perempuan: data.perempuan,
          totalKK: data.totalKK,
        },
        apbdes: {
          pendapatanAsliDesa: data.pendapatanAsliDesa,
          pendapatanTransfer: data.pendapatanTransfer,
          belanjaPemerintahan: data.belanjaPemerintahan,
          belanjaPembangunan: data.belanjaPembangunan,
          belanjaPemberdayaan: data.belanjaPemberdayaan,
        }
      };

      // Cari dan update. Jika belum ada, buat baru (upsert: true).
      const updatedKonten = await Konten.findOneAndUpdate(
        { pageKey },
        { content: contentToUpdate },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      res.json(updatedKonten.content);
    } catch (err) {
      console.error("Server Error saat update:", err);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;