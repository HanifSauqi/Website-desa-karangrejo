// file: backend/routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Impor model User
const router = express.Router();

// === ENDPOINT UNTUK MENDAFTARKAN ADMIN PERTAMA KALI ===
// Sebaiknya route ini dinonaktifkan atau dihapus setelah admin pertama dibuat
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Cek apakah sudah ada user di database
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Username sudah digunakan.' });
    }

    // Hash password sebelum disimpan
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Buat user baru
    const user = new User({
      username,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: 'Admin berhasil didaftarkan.' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server.', error: error.message });
  }
});


// === ENDPOINT UNTUK LOGIN ADMIN ===
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Cari user berdasarkan username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Username atau password salah.' });
    }

    // 2. Bandingkan password yang diinput dengan yang ada di database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Username atau password salah.' });
    }

    // 3. Jika cocok, buat token JWT
    const payload = {
      user: {
        id: user.id, // Simpan ID user di dalam token
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '8h' }, // Token berlaku selama 8 jam
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Kirim token ke klien
      }
    );

  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server.', error: error.message });
  }
});


module.exports = router;