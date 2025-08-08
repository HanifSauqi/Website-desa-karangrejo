// file: backend/routes/umkm.js
const express = require('express');
const router = express.Router();
const Umkm = require('../models/Umkm');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const { put, del } = require('@vercel/blob');
const path = require('path');

// Konfigurasi Multer untuk menerima 1 gambar utama dan maks 3 gambar galeri
const upload = multer().fields([
  { name: 'imageUrl', maxCount: 1 },
  { name: 'galleryImages', maxCount: 3 }
]);

// Helper function untuk membuat slug yang ramah URL
const createSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

// ===================================
// RUTE PUBLIK (Bisa diakses siapa saja)
// ===================================

// GET: Mengambil semua data UMKM
router.get('/', async (req, res) => {
  try {
    const umkm = await Umkm.find().sort({ createdAt: -1 });
    res.json(umkm);
  } catch (err) { 
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' }); 
  }
});

// GET: Mengambil satu data UMKM berdasarkan slug
router.get('/:slug', async (req, res) => {
  try {
    const umkm = await Umkm.findOne({ slug: req.params.slug });
    if (!umkm) {
      return res.status(404).json({ message: 'UMKM tidak ditemukan' });
    }
    res.json(umkm);
  } catch (err) { 
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' }); 
  }
});


// ===================================
// RUTE ADMIN (Memerlukan login/token)
// ===================================

// POST: Menambah data UMKM baru
router.post('/', authMiddleware, upload, async (req, res) => {
  const { name, category, owner, description, contact, products, position } = req.body;
  
  if (!req.files || !req.files.imageUrl) {
    return res.status(400).json({ message: 'Gambar utama wajib diunggah.' });
  }

  try {
    const slug = createSlug(name);
    
    // Upload gambar utama
    const mainImageFile = req.files.imageUrl[0];
    const mainImageFilename = `umkm/${slug}-main-${Date.now()}${path.extname(mainImageFile.originalname)}`;
    const mainBlob = await put(mainImageFilename, mainImageFile.buffer, { access: 'public' });
    
    // Upload gambar galeri (jika ada)
    let galleryImageUrls = [];
    if (req.files.galleryImages) {
      for (const file of req.files.galleryImages) {
        const galleryFilename = `umkm/${slug}-gallery-${Date.now()}-${file.originalname}`;
        const galleryBlob = await put(galleryFilename, file.buffer, { access: 'public' });
        galleryImageUrls.push(galleryBlob.url);
      }
    }

    const newUmkm = new Umkm({
      name, slug, category, owner, description, contact,
      products: JSON.parse(products || '[]'),
      position: JSON.parse(position || '[]'),
      imageUrl: mainBlob.url,
      galleryImages: galleryImageUrls
    });

    await newUmkm.save();
    res.status(201).json(newUmkm);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// PUT: Mengupdate data UMKM berdasarkan ID
router.put('/:id', authMiddleware, upload, async (req, res) => {
  const { name, category, owner, description, contact, products, position, existingImageUrl, existingGalleryImages } = req.body;
  let imageUrl = existingImageUrl || '';
  let galleryImageUrls = JSON.parse(existingGalleryImages || '[]');

  try {
    // Jika ada gambar utama baru
    if (req.files && req.files.imageUrl) {
      if (existingImageUrl) await del(existingImageUrl).catch(e => console.error("Gagal hapus gambar lama:", e));
      const mainImageFile = req.files.imageUrl[0];
      const slug = createSlug(name);
      const filename = `umkm/${slug}-main-${Date.now()}${path.extname(mainImageFile.originalname)}`;
      const blob = await put(filename, mainImageFile.buffer, { access: 'public' });
      imageUrl = blob.url;
    }

    // Jika ada gambar galeri baru (logika ini bisa dikembangkan untuk menghapus gambar galeri individual)
    if (req.files && req.files.galleryImages) {
        // Untuk sederhana, kita tambahkan saja. Di aplikasi nyata, mungkin perlu logika hapus-tambah.
        for (const file of req.files.galleryImages) {
            const galleryFilename = `umkm/gallery-${Date.now()}-${file.originalname}`;
            const galleryBlob = await put(galleryFilename, file.buffer, { access: 'public' });
            galleryImageUrls.push(galleryBlob.url);
        }
    }

    const updatedData = {
        name, slug: createSlug(name), category, owner, description, contact,
        products: JSON.parse(products || '[]'),
        position: JSON.parse(position || '[]'),
        imageUrl,
        galleryImages: galleryImageUrls
    };
    
    const umkm = await Umkm.findByIdAndUpdate(req.params.id, { $set: updatedData }, { new: true });
    res.json(umkm);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// DELETE: Menghapus data UMKM berdasarkan ID
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const umkm = await Umkm.findById(req.params.id);
    if (!umkm) return res.status(404).json({ message: 'Data tidak ditemukan' });

    // Hapus gambar utama
    if (umkm.imageUrl) {
      await del(umkm.imageUrl).catch(e => console.error("Gagal hapus gambar utama:", e));
    }
    // Hapus semua gambar galeri
    if (umkm.galleryImages && umkm.galleryImages.length > 0) {
        for(const imgUrl of umkm.galleryImages) {
            await del(imgUrl).catch(e => console.error("Gagal hapus gambar galeri:", e));
        }
    }
    
    await Umkm.findByIdAndDelete(req.params.id);
    res.json({ message: 'Data UMKM berhasil dihapus.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;