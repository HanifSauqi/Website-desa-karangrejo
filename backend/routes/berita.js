// file: backend/routes/berita.js
const express = require('express');
const router = express.Router();
const Berita = require('../models/Berita');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const { put, del } = require('@vercel/blob');
const path = require('path');

const upload = multer();

// Helper function untuk membuat slug
const createSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

// === RUTE PUBLIK (Tidak Perlu Login) ===
// GET Semua Berita
router.get('/', async (req, res) => { /* ... (kode tidak berubah) ... */ });
// GET Satu Berita berdasarkan Slug
router.get('/:slug', async (req, res) => { /* ... (kode tidak berubah) ... */ });


// === RUTE ADMIN (Perlu Login/Token) ===
// POST Berita Baru
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  const { title, author, excerpt, content } = req.body;
  
  if (!req.file) {
    return res.status(400).json({ message: 'Gambar wajib diunggah.' });
  }

  try {
    const slug = createSlug(title);
    const filename = `berita/${slug}-${Date.now()}${path.extname(req.file.originalname)}`;
    const blob = await put(filename, req.file.buffer, { access: 'public' });
    
    const beritaBaru = new Berita({ title, slug, imageUrl: blob.url, author, excerpt, content });
    await beritaBaru.save();
    res.status(201).json(beritaBaru);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// PUT (Update) Berita
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  const { title, author, excerpt, content, existingImageUrl } = req.body;
  let imageUrl = existingImageUrl;

  try {
    if (req.file) {
      if (existingImageUrl) await del(existingImageUrl).catch(e => console.error("Gagal hapus gambar lama:", e));
      const slug = createSlug(title);
      const filename = `berita/${slug}-${Date.now()}${path.extname(req.file.originalname)}`;
      const blob = await put(filename, req.file.buffer, { access: 'public' });
      imageUrl = blob.url;
    }
    
    const updatedBerita = { title, slug: createSlug(title), imageUrl, author, excerpt, content };
    const berita = await Berita.findByIdAndUpdate(req.params.id, { $set: updatedBerita }, { new: true });
    res.json(berita);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// DELETE Berita
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const berita = await Berita.findById(req.params.id);
    if (berita.imageUrl) await del(berita.imageUrl).catch(e => console.error("Gagal hapus gambar:", e));
    await Berita.findByIdAndDelete(req.params.id);
    res.json({ message: 'Berita berhasil dihapus.' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;