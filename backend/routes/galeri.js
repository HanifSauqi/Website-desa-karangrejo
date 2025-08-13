// file: backend/routes/galeri.js
const express = require('express');
const router = express.Router();
const Galeri = require('../models/Galeri');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const { put, del } = require('@vercel/blob');
const path = require('path');

const upload = multer();

// === RUTE PUBLIK ===
// GET: Mengambil semua foto galeri
router.get('/', async (req, res) => {
  try {
    const photos = await Galeri.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// === RUTE ADMIN (DIPROTEKSI) ===

// POST: Menambah foto baru (bisa menangani beberapa file sekaligus)
router.post('/', authMiddleware, upload.array('images', 10), async (req, res) => {
  const { alt } = req.body;
  
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'Tidak ada file yang diunggah.' });
  }

  try {
    const uploadedPhotos = [];
    for (const file of req.files) {
      const filename = `galeri/kegiatan-${Date.now()}${path.extname(file.originalname)}`;
      const blob = await put(filename, file.buffer, { access: 'public' });
      
      const newPhoto = new Galeri({
        imageUrl: blob.url,
        alt: alt || 'Foto Kegiatan Desa Karangrejo',
      });
      await newPhoto.save();
      uploadedPhotos.push(newPhoto);
    }
    res.status(201).json(uploadedPhotos);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// DELETE: Menghapus foto
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const photo = await Galeri.findById(req.params.id);
    if (!photo) return res.status(404).json({ message: 'Foto tidak ditemukan' });

    if (photo.imageUrl) {
      await del(photo.imageUrl).catch(e => console.error("Gagal hapus gambar dari Blob:", e));
    }
    
    await Galeri.findByIdAndDelete(req.params.id);
    res.json({ message: 'Foto berhasil dihapus.' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;