const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Judul notifikasi wajib diisi']
  },
  message: {
    type: String,
    required: [true, 'Isi notifikasi wajib diisi']
  },
  type: {
    type: String,
    enum: ['maintenance', 'trouble', 'info'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  pages: {
    type: [String],
    enum: ['all', 'products', 'orders', 'dashboard'],
    default: ['all']
  },
  duration: {
    type: Number, // dalam jam
    default: 24
  },
  expiresAt: {
    type: Date,
    default: function() {
      return new Date(Date.now() + (this.duration * 60 * 60 * 1000));
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Middleware untuk mengatur expiresAt
notificationSchema.pre('save', function(next) {
  if (this.isModified('duration') || this.isNew) {
    this.expiresAt = new Date(Date.now() + (this.duration * 60 * 60 * 1000));
  }
  next();
});

module.exports = mongoose.model('Notification', notificationSchema);