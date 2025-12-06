const PaymentMethod = require('../models/PaymentMethod');
const Transaction = require('../models/Transaction');
const midtransClient = require('midtrans-client');

// Get payment methods untuk user
exports.getPaymentMethods = async (req, res) => {
  try {
    const methods = await PaymentMethod.find({ isActive: true });
    
    res.json({
      success: true,
      count: methods.length,
      methods
    });
  } catch (error) {
    console.error('Get payment methods error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengambil metode pembayaran',
      error: error.message 
    });
  }
};

// Get payment methods untuk admin
exports.getAdminPaymentMethods = async (req, res) => {
  try {
    const methods = await PaymentMethod.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: methods.length,
      methods
    });
  } catch (error) {
    console.error('Get admin payment methods error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengambil metode pembayaran',
      error: error.message 
    });
  }
};

// Create payment method (admin only)
exports.createPaymentMethod = async (req, res) => {
  try {
    const { type, name, accountNumber, accountName, instructions } = req.body;

    // Validasi input
    if (!type || !name || !accountNumber) {
      return res.status(400).json({ message: 'Field wajib tidak lengkap' });
    }

    const paymentMethod = await PaymentMethod.create({
      type,
      name,
      accountNumber,
      accountName,
      qrisImage: req.file ? req.file.path : null,
      instructions
    });

    res.status(201).json({
      success: true,
      message: 'Metode pembayaran berhasil dibuat',
      paymentMethod
    });
  } catch (error) {
    console.error('Create payment method error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat membuat metode pembayaran',
      error: error.message 
    });
  }
};

// Update payment method (admin only)
exports.updatePaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethod.findById(req.params.id);
    
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Metode pembayaran tidak ditemukan' });
    }

    const updateData = { ...req.body };
    
    if (req.file) {
      updateData.qrisImage = req.file.path;
    }

    const updatedMethod = await PaymentMethod.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Metode pembayaran berhasil diperbarui',
      paymentMethod: updatedMethod
    });
  } catch (error) {
    console.error('Update payment method error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat memperbarui metode pembayaran',
      error: error.message 
    });
  }
};

// Delete payment method (admin only)
exports.deletePaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethod.findById(req.params.id);
    
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Metode pembayaran tidak ditemukan' });
    }

    await PaymentMethod.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Metode pembayaran berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete payment method error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat menghapus metode pembayaran',
      error: error.message 
    });
  }
};

// Create Midtrans transaction
exports.createMidtransTransaction = async (req, res) => {
  try {
    const { transactionId } = req.body;
    
    const transaction = await Transaction.findById(transactionId)
      .populate('user', 'fullName email')
      .populate('product', 'name price');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }

    // Konfigurasi Midtrans
    const snap = new midtransClient.Snap({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY
    });

    const parameter = {
      transaction_details: {
        order_id: transaction.orderId,
        gross_amount: transaction.amount
      },
      customer_details: {
        first_name: transaction.user.fullName,
        email: transaction.user.email
      },
      item_details: [{
        id: transaction.product._id.toString(),
        price: transaction.product.price,
        quantity: 1,
        name: transaction.product.name
      }]
    };

    const midtransResponse = await snap.createTransaction(parameter);

    // Simpan transaction token
    transaction.midtransTransactionId = midtransResponse.transaction_id;
    await transaction.save();

    res.json({
      success: true,
      message: 'Transaksi Midtrans berhasil dibuat',
      token: midtransResponse.token,
      redirect_url: midtransResponse.redirect_url
    });
  } catch (error) {
    console.error('Create Midtrans transaction error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat membuat transaksi Midtrans',
      error: error.message 
    });
  }
};

// Handle Midtrans notification
exports.handleMidtransNotification = async (req, res) => {
  try {
    const notification = req.body;
    
    // Verifikasi notifikasi dari Midtrans
    const crypto = require('crypto');
    const hash = crypto.createHash('sha512')
      .update(notification.order_id + notification.status_code + notification.gross_amount + process.env.MIDTRANS_SERVER_KEY)
      .digest('hex');

    if (hash !== notification.signature_key) {
      return res.status(400).json({ message: 'Signature tidak valid' });
    }

    // Update transaction status
    const transaction = await Transaction.findOne({ orderId: notification.order_id });
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }

    if (notification.transaction_status === 'capture' || notification.transaction_status === 'settlement') {
      transaction.status = 'verified';
      
      // Kirim notifikasi real-time ke user
      const io = req.app.get('io');
      if (io) {
        io.to(transaction.user.toString()).emit('payment-verified', {
          transactionId: transaction._id,
          message: 'Pembayaran Anda berhasil'
        });
      }
    } else if (notification.transaction_status === 'deny' || notification.transaction_status === 'cancel') {
      transaction.status = 'cancelled';
    }

    await transaction.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Handle Midtrans notification error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat menangani notifikasi Midtrans',
      error: error.message 
    });
  }
};