const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware untuk autentikasi user
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ message: 'Token tidak valid' });
      }
      
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token tidak valid' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak, token tidak tersedia' });
  }
};

// Middleware untuk admin only
const adminOnly = async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Akses ditolak, hanya admin yang diizinkan' });
  }
};

// Middleware untuk user only
const userOnly = async (req, res, next) => {
  if (req.user && req.user.role === 'user') {
    next();
  } else {
    return res.status(403).json({ message: 'Akses ditolak, hanya user yang diizinkan' });
  }
};

module.exports = { protect, adminOnly, userOnly };