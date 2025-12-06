const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['gopay', 'ovo', 'dana', 'bank', 'qris'],
    required: true
  },
  name: {
    type: String,
    required: [true, 'Nama metode pembayaran wajib diisi']
  },
  accountNumber: {
    type: String,
    required: [true, 'Nomor rekening/nomor HP wajib diisi']
  },
  accountName: {
    type: String,
    default: null
  },
  qrisImage: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  instructions: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);