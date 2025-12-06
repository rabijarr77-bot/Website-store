const Server = require('../models/Server');
const Transaction = require('../models/Transaction');
const Product = require('../models/Product');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

// Get server milik user
exports.getUserServers = async (req, res) => {
  try {
    const servers = await Server.find({ user: req.user.id })
      .populate('product', 'name type provider runtime')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: servers.length,
      servers
    });
  } catch (error) {
    console.error('Get user servers error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengambil data server',
      error: error.message 
    });
  }
};

// Get server by ID
exports.getServerById = async (req, res) => {
  try {
    const server = await Server.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    }).populate('product');

    if (!server) {
      return res.status(404).json({ message: 'Server tidak ditemukan' });
    }

    res.json({
      success: true,
      server
    });
  } catch (error) {
    console.error('Get server error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengambil data server',
      error: error.message 
    });
  }
};

// Create VPS
exports.createVPS = async (req, res) => {
  try {
    const { transactionId, password, os, location } = req.body;

    // Validasi input
    if (!transactionId || !password || !os || !location) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    // Cek transaksi
    const transaction = await Transaction.findById(transactionId)
      .populate('product')
      .populate('user');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }

    if (transaction.status !== 'verified') {
      return res.status(400).json({ message: 'Transaksi belum diverifikasi' });
    }

    if (transaction.accountCreated) {
      return res.status(400).json({ message: 'Akun sudah pernah dibuat' });
    }

    // Cek apakah produk adalah VPS
    if (transaction.product.type !== 'vps') {
      return res.status(400).json({ message: 'Produk bukan VPS' });
    }

    // Buat server di provider VPS (contoh DigitalOcean)
    let serverData = {
      name: `dryhost-${transaction.user.username}-${Date.now()}`,
      region: location,
      size: 's-1vcpu-1gb', // Sesuaikan dengan spesifikasi produk
      image: os.toLowerCase().includes('ubuntu') ? 'ubuntu-22-04-x64' : os,
      ssh_keys: [],
      backups: false,
      ipv6: false,
      monitoring: true
    };

    // Untuk demo, kita akan simulasi pembuatan VPS
    // Di produksi, gunakan API DigitalOcean, Vultr, dll
    let vpsResponse = {
      id: `droplet-${uuidv4()}`,
      ip_address: `203.0.113.${Math.floor(Math.random() * 254) + 1}`,
      status: 'active'
    };

    // Buat record server di database
    const server = await Server.create({
      user: req.user.id,
      transaction: transactionId,
      product: transaction.product._id,
      type: 'vps',
      username: 'root',
      password: password,
      ipAddress: vpsResponse.ip_address,
      os: os,
      location: location,
      provider: transaction.product.provider,
      serverId: vpsResponse.id,
      specifications: {
        ram: transaction.product.ram,
        disk: transaction.product.disk,
        cpu: transaction.product.cpu
      }
    });

    // Update transaksi
    transaction.accountCreated = true;
    await transaction.save();

    // Kirim notifikasi
    const io = req.app.get('io');
    if (io) {
      io.to(req.user.id).emit('server-created', {
        message: 'VPS berhasil dibuat',
        serverId: server._id
      });
    }

    res.json({
      success: true,
      message: 'VPS berhasil dibuat',
      server
    });
  } catch (error) {
    console.error('Create VPS error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat membuat VPS',
      error: error.message 
    });
  }
};

// Create Pterodactyl server
exports.createPterodactyl = async (req, res) => {
  try {
    const { transactionId, username, password } = req.body;

    // Validasi input
    if (!transactionId || !username || !password) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    // Cek transaksi
    const transaction = await Transaction.findById(transactionId)
      .populate('product')
      .populate('user');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }

    if (transaction.status !== 'verified') {
      return res.status(400).json({ message: 'Transaksi belum diverifikasi' });
    }

    if (transaction.accountCreated) {
      return res.status(400).json({ message: 'Akun sudah pernah dibuat' });
    }

    // Cek apakah produk adalah Pterodactyl
    if (transaction.product.type !== 'pterodactyl') {
      return res.status(400).json({ message: 'Produk bukan Panel Pterodactyl' });
    }

    // Buat akun di Pterodactyl via API
    // Untuk demo, kita simulasikan
    const pterodactylData = {
      username: username,
      email: transaction.user.email,
      first_name: transaction.user.fullName,
      password: password,
      root_admin: false,
      language: 'id'
    };

    // Di produksi, gunakan API Pterodactyl
    // const response = await axios.post(`${process.env.PTERODACTYL_URL}/api/application/users`, pterodactylData, {
    //   headers: {
    //     'Authorization': `Bearer ${process.env.PTERODACTYL_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   }
    // });

    let pterodactylResponse = {
      id: Math.floor(Math.random() * 10000),
      username: username,
      email: transaction.user.email
    };

    // Buat record server di database
    const server = await Server.create({
      user: req.user.id,
      transaction: transactionId,
      product: transaction.product._id,
      type: 'pterodactyl',
      username: username,
      password: password,
      serverId: pterodactylResponse.id.toString(),
      subdomain: transaction.product.subdomain,
      runtime: transaction.product.runtime,
      specifications: {
        ram: transaction.product.ram,
        disk: transaction.product.disk,
        cpu: transaction.product.cpu
      }
    });

    // Update transaksi
    transaction.accountCreated = true;
    await transaction.save();

    // Kirim notifikasi
    const io = req.app.get('io');
    if (io) {
      io.to(req.user.id).emit('server-created', {
        message: 'Panel Pterodactyl berhasil dibuat',
        serverId: server._id
      });
    }

    res.json({
      success: true,
      message: 'Panel Pterodactyl berhasil dibuat',
      server
    });
  } catch (error) {
    console.error('Create Pterodactyl error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat membuat Panel Pterodactyl',
      error: error.message 
    });
  }
};

// Get semua server (admin only)
exports.getAllServers = async (req, res) => {
  try {
    const { type, status, page = 1, limit = 10 } = req.query;
    
    let filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;

    const servers = await Server.find(filter)
      .populate('user', 'fullName email')
      .populate('product', 'name type provider runtime')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Server.countDocuments(filter);

    res.json({
      success: true,
      count: servers.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      servers
    });
  } catch (error) {
    console.error('Get all servers error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengambil data server',
      error: error.message 
    });
  }
};

// Suspend server (admin only)
exports.suspendServer = async (req, res) => {
  try {
    const server = await Server.findById(req.params.id);
    
    if (!server) {
      return res.status(404).json({ message: 'Server tidak ditemukan' });
    }

    server.status = 'suspended';
    await server.save();

    res.json({
      success: true,
      message: 'Server berhasil disuspend'
    });
  } catch (error) {
    console.error('Suspend server error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mensuspend server',
      error: error.message 
    });
  }
};

// Activate server (admin only)
exports.activateServer = async (req, res) => {
  try {
    const server = await Server.findById(req.params.id);
    
    if (!server) {
      return res.status(404).json({ message: 'Server tidak ditemukan' });
    }

    server.status = 'active';
    await server.save();

    res.json({
      success: true,
      message: 'Server berhasil diaktifkan'
    });
  } catch (error) {
    console.error('Activate server error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengaktifkan server',
      error: error.message 
    });
  }
};