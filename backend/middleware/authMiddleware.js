// file: backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Ambil token dari header
  const token = req.header('x-auth-token');

  // Cek jika tidak ada token
  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak. Tidak ada token.' });
  }

  // Verifikasi token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next(); // Lanjutkan ke proses selanjutnya
  } catch (error) {
    res.status(400).json({ message: 'Token tidak valid.' });
  }
};