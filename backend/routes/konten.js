// file: backend/routes/konten.js
const express = require('express');
const router = express.Router();
const Konten = require('../models/Konten');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const { put, del } = require('@vercel/blob');

// Konfigurasi Multer untuk menyimpan file di memori
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Hanya izinkan file gambar
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Format file tidak didukung. Gunakan JPG, PNG, atau WebP.'), false);
    }
  }
});

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
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// PUT: Mengupdate data konten DENGAN UPLOAD GAMBAR ke Vercel Blob
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
        try {
          // Hapus gambar lama dari Vercel Blob jika ada
          if (data.existingImageUrl && data.existingImageUrl.includes('blob.vercel-storage.com')) {
            try {
              await del(data.existingImageUrl);
              console.log('Gambar lama berhasil dihapus dari Vercel Blob');
            } catch (deleteError) {
              console.error('Error menghapus gambar lama:', deleteError);
              // Tidak throw error, lanjutkan dengan upload gambar baru
            }
          }

          // Generate nama file unik
          const timestamp = Date.now();
          const originalName = req.file.originalname;
          const extension = originalName.substring(originalName.lastIndexOf('.'));
          const filename = `${pageKey}-${timestamp}${extension}`;

          const blob = await put(filename, req.file.buffer, {
            access: 'public',
            contentType: req.file.mimetype,
          });

          imageUrl = blob.url;
          console.log('Gambar berhasil diupload ke Vercel Blob:', blob.url);

        } catch (uploadError) {
          console.error('Error upload ke Vercel Blob:', uploadError);
          return res.status(500).json({ 
            message: 'Gagal mengupload gambar', 
            error: uploadError.message 
          });
        }
      }
      
      // Siapkan semua data dari form untuk disimpan ke database
      const contentToUpdate = {
        deskripsi: {
          sejarah: data.sejarah || '',
          visi: data.visi || '',
          misi: data.misi || '',
          imageUrl: imageUrl,
        },
        demografi: {
          totalPenduduk: parseInt(data.totalPenduduk) || 0,
          lakiLaki: parseInt(data.lakiLaki) || 0,
          perempuan: parseInt(data.perempuan) || 0,
          totalKK: parseInt(data.totalKK) || 0,
        },
        apbdes: {
          pendapatanAsliDesa: parseInt(data.pendapatanAsliDesa) || 0,
          pendapatanTransfer: parseInt(data.pendapatanTransfer) || 0,
          belanjaPemerintahan: parseInt(data.belanjaPemerintahan) || 0,
          belanjaPembangunan: parseInt(data.belanjaPembangunan) || 0,
          belanjaPemberdayaan: parseInt(data.belanjaPemberdayaan) || 0,
        }
      };

      // Validasi data demografi
      const totalCalculated = contentToUpdate.demografi.lakiLaki + contentToUpdate.demografi.perempuan;
      if (contentToUpdate.demografi.totalPenduduk > 0 && totalCalculated > 0) {
        if (Math.abs(contentToUpdate.demografi.totalPenduduk - totalCalculated) > 0) {
          console.warn('Warning: Total penduduk tidak sesuai dengan jumlah laki-laki + perempuan');
        }
      }

      // Cari dan update. Jika belum ada, buat baru (upsert: true).
      const updatedKonten = await Konten.findOneAndUpdate(
        { pageKey },
        { content: contentToUpdate },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      res.json(updatedKonten.content);
    } catch (err) {
      console.error("Server Error saat update:", err);
      
      // Handle specific multer errors
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: 'Ukuran file terlalu besar. Maksimal 5MB.' });
        }
      }

      // Handle file filter errors
      if (err.message.includes('Format file tidak didukung')) {
        return res.status(400).json({ message: err.message });
      }

      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  }
);

// DELETE: Menghapus gambar dari Vercel Blob (optional endpoint)
router.delete('/:pageKey/image', authMiddleware, async (req, res) => {
  try {
    const { pageKey } = req.params;
    const { imageUrl } = req.body;

    if (!imageUrl || !imageUrl.includes('blob.vercel-storage.com')) {
      return res.status(400).json({ message: 'URL gambar tidak valid' });
    }

    // Hapus dari Vercel Blob
    await del(imageUrl);

    // Update database - hapus imageUrl
    const updatedKonten = await Konten.findOneAndUpdate(
      { pageKey },
      { 
        $set: { 
          'content.deskripsi.imageUrl': '' 
        }
      },
      { new: true }
    );

    if (!updatedKonten) {
      return res.status(404).json({ message: 'Konten tidak ditemukan' });
    }

    res.json({ 
      message: 'Gambar berhasil dihapus',
      content: updatedKonten.content 
    });
  } catch (err) {
    console.error("Error menghapus gambar:", err);
    res.status(500).json({ message: 'Gagal menghapus gambar', error: err.message });
  }
});

module.exports = router;