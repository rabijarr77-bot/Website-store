const User = require('../models/User');
const Product = require('../models/Product');
const Transaction = require('../models/Transaction');
const Server = require('../models/Server');
const Notification = require('../models/Notification');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    // Hitungan dasar
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalServers = await Server.countDocuments();
    
    // Hitungan transaksi hari ini
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const ordersToday = await Transaction.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow }
    });

    // Pendapatan bulan ini
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    
    const monthlyRevenue = await Transaction.aggregate([
      {
        $match: {
          status: 'verified',
          createdAt: { $gte: startOfMonth, $lt: endOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);

    // Server per provider
    const serversByProvider = await Server.aggregate([
      {
        $group: {
          _id: '$provider',
          count: { $sum: 1 }
        }
      }
    ]);

    // Runtime panel yang aktif
    const activeRuntimes = await Server.aggregate([
      {
        $match: { type: 'pterodactyl', status: 'active' }
      },
      {
        $group: {
          _id: '$runtime',
          count: { $sum: 1 }
        }
      }
    ]);

    // Transaksi terbaru
    const recentTransactions = await Transaction.find()
      .populate('user', 'fullName email')
      .populate('product', 'name type')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalServers,
        ordersToday,
        monthlyRevenue: monthlyRevenue[0]?.total || 0,
        serversByProvider,
        activeRuntimes,
        recentTransactions
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengambil data dashboard',
      error: error.message 
    });
  }
};

// Get dashboard chart data
exports.getDashboardChart = async (req, res) => {
  try {
    const { days = 7 } = req.query;
    
    // Data untuk chart pesanan
    const orderTrends = await Transaction.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000)
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);

    // Data untuk chart server yang dibuat
    const serverTrends = await Server.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 hari
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);

    res.json({
      success: true,
      charts: {
        orderTrends,
        serverTrends
      }
    });
  } catch (error) {
    console.error('Get dashboard chart error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengambil data chart',
      error: error.message 
    });
  }
};

// Get admin settings
exports.getSettings = async (req, res) => {
  try {
    const settings = {
      midtrans: {
        isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
        clientKey: process.env.MIDTRANS_CLIENT_KEY
      },
      pterodactyl: {
        url: process.env.PTERODACTYL_URL,
        apiKey: process.env.PTERODACTYL_API_KEY ? '***' : null
      },
      vpsProviders: {
        digitalocean: {
          apiKey: process.env.DIGITALOCEAN_API_KEY ? '***' : null
        },
        vultr: {
          apiKey: process.env.VULTR_API_KEY ? '***' : null
        }
      }
    };

    res.json({
      success: true,
      settings
    });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengambil pengaturan',
      error: error.message 
    });
  }
};

// Update admin settings
exports.updateSettings = async (req, res) => {
  try {
    // Di sini bisa implementasi update environment variables
    // Untuk sekarang, hanya return success
    res.json({
      success: true,
      message: 'Pengaturan berhasil diperbarui'
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat memperbarui pengaturan',
      error: error.message 
    });
  }
};

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    
    let filter = { role: 'user' };
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(filter)
      .select('-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      count: users.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      users
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengambil data user',
      error: error.message 
    });
  }
};

// Toggle user status (admin only)
exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    user.isActive = !user.isActive;
    await user.save();

    const status = user.isActive ? 'diaktifkan' : 'dinonaktifkan';

    res.json({
      success: true,
      message: `User berhasil ${status}`,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error('Toggle user status error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengubah status user',
      error: error.message 
    });
  }
};