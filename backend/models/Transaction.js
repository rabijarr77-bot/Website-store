const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['midtrans', 'manual'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'waiting_verification', 'verified', 'cancelled', 'completed'],
    default: 'pending'
  },
  midtransTransactionId: {
    type: String,
    default: null
  },
  manualPayment: {
    senderName: String,
    proofImage: String,
    paymentMethod: String,
    accountNumber: String,
    rejectedReason: String
  },
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  accountCreated: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);