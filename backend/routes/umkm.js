// file: backend/routes/umkm.js
const express = require('express');
const router = express.Router();
const Umkm = require('../models/Umkm');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const { put, del } = require('@vercel/blob');
const path = require('path');

const upload = multer();

// Helper function untuk membuat slug
const createSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

// === RUTE PUBLIK ===
router.get('/', async (req, res) => {
  try {
    const umkm = await Umkm.find().sort({ createdAt: -1 });
    res.json(umkm);
  } catch (err) { res.status(500).json({ message: 'Server Error' }); }
});

router.get('/:slug', async (req, res) => {
  try {
    const umkm = await Umkm.findOne({ slug: req.params.slug });
    if (!umkm) return res.status(404).json({ message: 'UMKM tidak ditemukan' });
    res.json(umkm);
  } catch (err) { res.status(500).json({ message: 'Server Error' }); }
});

// === RUTE ADMIN (DIPROTEKSI) ===
// POST: Menambah UMKM baru
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  const { name, category, owner, description, contact, products, position } = req.body;
  
  if (!req.file) return res.status(400).json({ message: 'Gambar utama wajib diunggah.' });

  try {
    const slug = createSlug(name);
    const filename = `umkm/${slug}-${Date.now()}${path.extname(req.file.originalname)}`;
    const blob = await put(filename, req.file.buffer, { access: 'public' });
    
    const newUmkm = new Umkm({
      name,
      slug,
      category,
      owner,
      description,
      contact,
      products: JSON.parse(products || '[]'),
      position: JSON.parse(position || '[]'),
      imageUrl: blob.url,
    });

    await newUmkm.save();
    res.status(201).json(newUmkm);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// PUT: Mengupdate data UMKM
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  const { name, category, owner, description, contact, products, position, existingImageUrl } = req.body;
  let imageUrl = existingImageUrl || '';

  try {
    if (req.file) {
      if (existingImageUrl) await del(existingImageUrl).catch(e => console.error("Gagal hapus gambar lama:", e));
      const slug = createSlug(name);
      const filename = `umkm/${slug}-${Date.now()}${path.extname(req.file.originalname)}`;
      const blob = await put(filename, req.file.buffer, { access: 'public' });
      imageUrl = blob.url;
    }

    const updatedData = {
        name, slug: createSlug(name), category, owner, description, contact,
        products: JSON.parse(products || '[]'),
        position: JSON.parse(position || '[]'),
        imageUrl
    };
    
    const umkm = await Umkm.findByIdAndUpdate(req.params.id, { $set: updatedData }, { new: true });
    res.json(umkm);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// DELETE: Menghapus data UMKM
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const umkm = await Umkm.findById(req.params.id);
    if (!umkm) return res.status(404).json({ message: 'Data tidak ditemukan' });

    if (umkm.imageUrl) {
      await del(umkm.imageUrl).catch(e => console.error("Gagal hapus gambar:", e));
    }
    
    await Umkm.findByIdAndDelete(req.params.id);
    res.json({ message: 'Data UMKM berhasil dihapus.' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;