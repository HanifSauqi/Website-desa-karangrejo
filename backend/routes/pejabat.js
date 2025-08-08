// file: backend/routes/pejabat.js
const express = require('express');
const router = express.Router();
const Pejabat = require('../models/Pejabat');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const { put, del } = require('@vercel/blob');
const path = require('path');

const upload = multer();

// === RUTE PUBLIK ===
// GET: Mengambil semua data pejabat, diurutkan
router.get('/', async (req, res) => {
  try {
    const pejabat = await Pejabat.find().sort({ urutan: 1, createdAt: 1 });
    res.json(pejabat);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET: Mengambil satu pejabat berdasarkan ID
router.get('/:id', async (req, res) => {
  try {
    const pejabat = await Pejabat.findById(req.params.id);
    if (!pejabat) return res.status(404).json({ message: 'Data tidak ditemukan' });
    res.json(pejabat);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});


// POST: Menambah pejabat baru (Disederhanakan)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  const { name, jabatan } = req.body;
  
  if (!req.file) return res.status(400).json({ message: 'Foto wajib diunggah.' });

  try {
    const jabatanConfig = JABATAN_LIST.find(j => j.nama === jabatan);
    if (!jabatanConfig) return res.status(400).json({ message: 'Jabatan tidak valid.' });

    // Cari atasan di database berdasarkan nama jabatan atasan dari config
    let parent = null;
    if (jabatanConfig.atasan) {
      parent = await Pejabat.findOne({ jabatan: jabatanConfig.atasan });
    }

    const filename = `pejabat-${Date.now()}${path.extname(req.file.originalname)}`;
    const blob = await put(filename, req.file.buffer, { access: 'public' });
    
    const pejabatBaru = new Pejabat({
      name,
      jabatan,
      imageUrl: blob.url,
      urutan: jabatanConfig.urutan, // Ambil urutan dari config
      parentId: parent ? parent._id : null, // Set parentId berdasarkan hasil pencarian
    });

    await pejabatBaru.save();
    res.status(201).json(pejabatBaru);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// PUT: Mengupdate data pejabat (Disederhanakan)
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  const { name, jabatan, existingImageUrl } = req.body;
  let imageUrl = existingImageUrl || '';

  try {
    const jabatanConfig = JABATAN_LIST.find(j => j.nama === jabatan);
    if (!jabatanConfig) return res.status(400).json({ message: 'Jabatan tidak valid.' });

    let parent = null;
    if (jabatanConfig.atasan) {
      parent = await Pejabat.findOne({ jabatan: jabatanConfig.atasan });
    }

    if (req.file) {
      if (existingImageUrl) await del(existingImageUrl).catch(e => console.error("Gagal hapus gambar lama:", e));
      const filename = `pejabat-${Date.now()}${path.extname(req.file.originalname)}`;
      const blob = await put(filename, req.file.buffer, { access: 'public' });
      imageUrl = blob.url;
    }

    const updatedData = { 
      name, 
      jabatan, 
      urutan: jabatanConfig.urutan, 
      parentId: parent ? parent._id : null, 
      imageUrl 
    };
    
    const pejabat = await Pejabat.findByIdAndUpdate(req.params.id, { $set: updatedData }, { new: true });
    res.json(pejabat);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// DELETE: Menghapus data pejabat
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const pejabat = await Pejabat.findById(req.params.id);
    if (!pejabat) return res.status(404).json({ message: 'Data tidak ditemukan' });

    if (pejabat.imageUrl) {
      await del(pejabat.imageUrl).catch(e => console.error("Gagal hapus gambar:", e));
    }
    
    await Pejabat.findByIdAndDelete(req.params.id);
    res.json({ message: 'Data pejabat berhasil dihapus.' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;