const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama produk wajib diisi'],
    trim: true
  },
  type: {
    type: String,
    enum: ['vps', 'pterodactyl'],
    required: [true, 'Tipe produk wajib diisi (vps/pterodactyl)']
  },
  price: {
    type: Number,
    required: [true, 'Harga produk wajib diisi'],
    min: [0, 'Harga tidak boleh negatif']
  },
  ram: {
    type: String,
    required: [true, 'RAM wajib diisi'],
    default: '1 GB'
  },
  disk: {
    type: String,
    required: [true, 'Disk wajib diisi'],
    default: '20 GB'
  },
  cpu: {
    type: String,
    required: [true, 'CPU wajib diisi'],
    default: '1 Core'
  },
  egg: {
    type: String, // Hanya untuk Pterodactyl
    default: null
  },
  runtime: {
    type: String, // Runtime server untuk Pterodactyl (contoh: Node.js 20.x)
    default: null
  },
  provider: {
    type: String, // Provider VPS (contoh: DigitalOcean)
    default: null
  },
  subdomain: {
    type: String, // Subdomain untuk panel Pterodactyl
    default: null
  },
  description: {
    type: String,
    required: [true, 'Deskripsi produk wajib diisi']
  },
  image: {
    type: String, // URL gambar produk
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  features: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);