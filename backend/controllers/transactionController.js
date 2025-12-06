const Transaction = require('../models/Transaction');
const Product = require('../models/Product');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

// Get transaksi user
exports.getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .populate('product', 'name type price')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: transactions.length,
      transactions
    });
  } catch (error) {
    console.error('Get user transactions error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengambil data transaksi',
      error: error.message 
    });
  }
};

// Get transaksi by ID
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    }).populate('product');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }

    res.json({
      success: true,
      transaction
    });
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengambil data transaksi',
      error: error.message 
    });
  }
};

// Create transaksi baru
exports.createTransaction = async (req, res) => {
  try {
    const { productId, paymentMethod } = req.body;

    // Validasi input
    if (!productId || !paymentMethod) {
      return res.status(400).json({ message: 'Product ID dan payment method wajib diisi' });
    }

    // Cek produk
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    if (!product.isActive) {
      return res.status(400).json({ message: 'Produk tidak tersedia' });
    }

    // Generate order ID unik
    const orderId = `DRY-${Date.now()}-${uuidv4().slice(0, 8)}`;

    // Buat transaksi
    const transaction = await Transaction.create({
      user: req.user.id,
      product: productId,
      amount: product.price,
      paymentMethod,
      orderId,
      status: 'pending'
    });

    // Populate data produk
    await transaction.populate('product');

    res.status(201).json({
      success: true,
      message: 'Transaksi berhasil dibuat',
      transaction
    });
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat membuat transaksi',
      error: error.message 
    });
  }
};

// Process pembayaran
exports.processPayment = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { paymentMethod, senderName, proofImage, paymentDetails } = req.body;

    const transaction = await Transaction.findOne({ 
      _id: transactionId, 
      user: req.user.id 
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }

    if (paymentMethod === 'midtrans') {
      // Implementasi Midtrans akan ditambahkan di sini
      // Untuk demo, langsung set status menjadi verified
      transaction.status = 'verified';
      transaction.paymentMethod = 'midtrans';
    } else if (paymentMethod === 'manual') {
      // Pembayaran manual
      if (!senderName || !proofImage) {
        return res.status(400).json({ 
          message: 'Nama pengirim dan bukti pembayaran wajib diisi untuk pembayaran manual' 
        });
      }

      transaction.status = 'waiting_verification';
      transaction.paymentMethod = 'manual';
      transaction.manualPayment = {
        senderName,
        proofImage,
        ...paymentDetails
      };
    }

    await transaction.save();

    // Kirim notifikasi real-time jika menggunakan socket.io
    const io = req.app.get('io');
    if (io) {
      io.to(req.user.id).emit('payment-status-update', {
        transactionId: transaction._id,
        status: transaction.status
      });
    }

    res.json({
      success: true,
      message: 'Pembayaran berhasil diproses',
      transaction
    });
  } catch (error) {
    console.error('Process payment error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat memproses pembayaran',
      error: error.message 
    });
  }
};

// Get semua transaksi (admin only)
exports.getAllTransactions = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let filter = {};
    if (status) {
      filter.status = status;
    }

    const transactions = await Transaction.find(filter)
      .populate('user', 'fullName email')
      .populate('product', 'name type price')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Transaction.countDocuments(filter);

    res.json({
      success: true,
      count: transactions.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      transactions
    });
  } catch (error) {
    console.error('Get all transactions error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengambil data transaksi',
      error: error.message 
    });
  }
};

// Verifikasi transaksi (admin only)
exports.verifyTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('user')
      .populate('product');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }

    transaction.status = 'verified';
    await transaction.save();

    // Kirim notifikasi ke user
    const io = req.app.get('io');
    if (io) {
      io.to(transaction.user._id.toString()).emit('payment-verified', {
        transactionId: transaction._id,
        message: 'Pembayaran Anda telah diverifikasi admin'
      });
    }

    res.json({
      success: true,
      message: 'Transaksi berhasil diverifikasi',
      transaction
    });
  } catch (error) {
    console.error('Verify transaction error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat memverifikasi transaksi',
      error: error.message 
    });
  }
};

// Tolak transaksi (admin only)
exports.rejectTransaction = async (req, res) => {
  try {
    const { reason } = req.body;
    const transaction = await Transaction.findById(req.params.id)
      .populate('user');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }

    transaction.status = 'cancelled';
    transaction.manualPayment = {
      ...transaction.manualPayment,
      rejectedReason: reason
    };
    await transaction.save();

    // Kirim notifikasi ke user
    const io = req.app.get('io');
    if (io) {
      io.to(transaction.user._id.toString()).emit('payment-rejected', {
        transactionId: transaction._id,
        reason
      });
    }

    res.json({
      success: true,
      message: 'Transaksi berhasil ditolak',
      transaction
    });
  } catch (error) {
    console.error('Reject transaction error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat menolak transaksi',
      error: error.message 
    });
  }
};