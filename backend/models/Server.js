const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  type: {
    type: String,
    enum: ['vps', 'pterodactyl'],
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  ipAddress: {
    type: String,
    default: null
  },
  os: {
    type: String,
    default: null
  },
  location: {
    type: String,
    default: null
  },
  provider: {
    type: String,
    default: null
  },
  serverId: {
    type: String,
    default: null // ID dari provider VPS atau Pterodactyl
  },
  subdomain: {
    type: String,
    default: null
  },
  runtime: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['active', 'suspended', 'terminated'],
    default: 'active'
  },
  specifications: {
    ram: String,
    disk: String,
    cpu: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Server', serverSchema);