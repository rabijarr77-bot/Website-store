const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Register user baru
exports.register = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    // Validasi input
    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    // Cek apakah user sudah ada
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'Email atau username sudah terdaftar' 
      });
    }

    // Buat user baru
    const user = await User.create({
      fullName,
      username,
      email,
      password
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat registrasi',
      error: error.message 
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi' });
    }

    // Cari user berdasarkan email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    // Cek password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    // Cek apakah user aktif
    if (!user.isActive) {
      return res.status(401).json({ message: 'Akun Anda telah dinonaktifkan' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login berhasil',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat login',
      error: error.message 
    });
  }
};

// Login admin
exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi kredensial admin dari environment
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      // Buat atau cari user admin
      let admin = await User.findOne({ role: 'admin' });
      
      if (!admin) {
        admin = await User.create({
          fullName: 'Administrator',
          username: process.env.ADMIN_USERNAME,
          email: 'admin@dryhost.id',
          password: process.env.ADMIN_PASSWORD,
          role: 'admin'
        });
      }

      const token = generateToken(admin._id);

      res.json({
        success: true,
        message: 'Login admin berhasil',
        token,
        user: {
          id: admin._id,
          fullName: admin.fullName,
          username: admin.username,
          email: admin.email,
          role: admin.role
        }
      });
    } else {
      res.status(401).json({ message: 'Kredensial admin tidak valid' });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat login admin',
      error: error.message 
    });
  }
};

// Logout
exports.logout = async (req, res) => {
  // Di sini bisa tambahkan blacklist token jika diperlukan
  res.json({ 
    success: true, 
    message: 'Logout berhasil' 
  });
};

// Lupa password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email tidak ditemukan' });
    }

    // Di sini bisa implementasi pengiriman email reset password
    // Untuk sekarang, hanya return message
    res.json({ 
      success: true, 
      message: 'Link reset password telah dikirim ke email Anda' 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Terjadi kesalahan',
      error: error.message 
    });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    // Di sini implementasi reset password dengan token
    res.json({ 
      success: true, 
      message: 'Password berhasil direset' 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Terjadi kesalahan',
      error: error.message 
    });
  }
};

// Get profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Terjadi kesalahan',
      error: error.message 
    });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { fullName, username } = req.body;
    
    // Cek apakah username sudah digunakan oleh user lain
    if (username) {
      const existingUser = await User.findOne({ 
        username, 
        _id: { $ne: req.user.id } 
      });
      
      if (existingUser) {
        return res.status(400).json({ message: 'Username sudah digunakan' });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { fullName, username },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profil berhasil diperbarui',
      user
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Terjadi kesalahan',
      error: error.message 
    });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user.id);
    
    // Cek password lama
    const isPasswordMatch = await user.comparePassword(currentPassword);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Password lama salah' });
    }

    // Update password baru
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password berhasil diubah'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Terjadi kesalahan',
      error: error.message 
    });
  }
};