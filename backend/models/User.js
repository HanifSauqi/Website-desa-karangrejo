// file: backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username tidak boleh kosong'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password tidak boleh kosong'],
  },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);