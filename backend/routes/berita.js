// file: backend/routes/berita.js
const express = require('express');
const router = express.Router();
const Berita = require('../models/Berita');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const { put, del } = require('@vercel/blob');
const path = require('path');

const upload = multer();

// Helper function untuk membuat slug yang ramah URL
const createSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

// ===================================
// RUTE PUBLIK (Bisa diakses siapa saja)
// ===================================

// GET: Mengambil semua data berita, diurutkan dari yang terbaru
router.get('/', async (req, res) => {
  try {
    const berita = await Berita.find().sort({ createdAt: -1 });
    res.json(berita);
  } catch (err) { 
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' }); 
  }
});

// GET: Mengambil satu data berita berdasarkan slug-nya
router.get('/:slug', async (req, res) => {
  try {
    const berita = await Berita.findOne({ slug: req.params.slug });
    if (!berita) {
      return res.status(404).json({ message: 'Berita tidak ditemukan' });
    }
    res.json(berita);
  } catch (err) { 
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' }); 
  }
});


// ===================================
// RUTE ADMIN (Memerlukan login/token)
// ===================================

// POST: Menambah data berita baru
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  const { title, author, excerpt, content } = req.body;
  
  if (!req.file) {
    return res.status(400).json({ message: 'Gambar wajib diunggah.' });
  }

  try {
    const slug = createSlug(title);
    // Tambahkan prefix folder 'berita/' untuk Vercel Blob agar lebih rapi
    const filename = `berita/${slug}-${Date.now()}${path.extname(req.file.originalname)}`;
    
    const blob = await put(filename, req.file.buffer, { access: 'public' });
    
    const beritaBaru = new Berita({ 
        title, 
        slug, 
        imageUrl: blob.url, 
        author, 
        excerpt, 
        content 
    });
    
    await beritaBaru.save();
    res.status(201).json(beritaBaru);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// PUT: Mengupdate data berita berdasarkan ID
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  const { title, author, excerpt, content, existingImageUrl } = req.body;
  let imageUrl = existingImageUrl;

  try {
    // Jika ada file gambar baru yang di-upload
    if (req.file) {
      // Hapus gambar lama dari Vercel Blob jika ada
      if (existingImageUrl) {
        await del(existingImageUrl).catch(e => console.error("Gagal hapus gambar lama:", e));
      }
      const slug = createSlug(title);
      const filename = `berita/${slug}-${Date.now()}${path.extname(req.file.originalname)}`;
      const blob = await put(filename, req.file.buffer, { access: 'public' });
      imageUrl = blob.url;
    }
    
    const updatedBerita = { 
        title, 
        slug: createSlug(title), 
        imageUrl, 
        author, 
        excerpt, 
        content 
    };
    
    const berita = await Berita.findByIdAndUpdate(req.params.id, { $set: updatedBerita }, { new: true });
    res.json(berita);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// DELETE: Menghapus data berita berdasarkan ID
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const berita = await Berita.findById(req.params.id);
    if (!berita) {
      return res.status(404).json({ message: 'Berita tidak ditemukan' });
    }

    // Hapus gambar dari Vercel Blob sebelum menghapus data dari database
    if (berita.imageUrl) {
      await del(berita.imageUrl).catch(e => console.error("Gagal hapus gambar dari Blob:", e));
    }
    
    await Berita.findByIdAndDelete(req.params.id);
    res.json({ message: 'Berita berhasil dihapus.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;