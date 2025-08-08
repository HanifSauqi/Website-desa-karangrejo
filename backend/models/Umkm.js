// file: backend/models/Umkm.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    price: String,
});

const UmkmSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    owner: { type: String, required: true },
    description: { type: String, required: true },
    position: { type: [Number], required: true }, // [longitude, latitude]
    imageUrl: { type: String, required: true },
    galleryImages: [String],
    products: [ProductSchema],
    contact: String,
}, { timestamps: true });

module.exports = mongoose.model('Umkm', UmkmSchema);