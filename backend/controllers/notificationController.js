const Notification = require('../models/Notification');

// Get active notifications untuk user
exports.getActiveNotifications = async (req, res) => {
  try {
    const now = new Date();
    
    const notifications = await Notification.find({
      isActive: true,
      expiresAt: { $gt: now }
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: notifications.length,
      notifications
    });
  } catch (error) {
    console.error('Get active notifications error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengambil notifikasi',
      error: error.message 
    });
  }
};

// Get all notifications untuk admin
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate('createdBy', 'fullName username')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: notifications.length,
      notifications
    });
  } catch (error) {
    console.error('Get all notifications error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengambil notifikasi',
      error: error.message 
    });
  }
};

// Create notification (admin only)
exports.createNotification = async (req, res) => {
  try {
    const { title, message, type, pages, duration } = req.body;

    // Validasi input
    if (!title || !message || !type) {
      return res.status(400).json({ message: 'Field wajib tidak lengkap' });
    }

    const notification = await Notification.create({
      title,
      message,
      type,
      pages: pages || ['all'],
      duration: duration || 24,
      createdBy: req.user.id
    });

    // Populate data user
    await notification.populate('createdBy', 'fullName username');

    // Kirim notifikasi real-time ke semua user yang online
    const io = req.app.get('io');
    if (io) {
      io.emit('new-notification', {
        notification
      });
    }

    res.status(201).json({
      success: true,
      message: 'Notifikasi berhasil dibuat',
      notification
    });
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat membuat notifikasi',
      error: error.message 
    });
  }
};

// Update notification (admin only)
exports.updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    
    if (!notification) {
      return res.status(404).json({ message: 'Notifikasi tidak ditemukan' });
    }

    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'fullName username');

    // Kirim update notifikasi real-time
    const io = req.app.get('io');
    if (io) {
      io.emit('notification-updated', {
        notification: updatedNotification
      });
    }

    res.json({
      success: true,
      message: 'Notifikasi berhasil diperbarui',
      notification: updatedNotification
    });
  } catch (error) {
    console.error('Update notification error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat memperbarui notifikasi',
      error: error.message 
    });
  }
};

// Delete notification (admin only)
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    
    if (!notification) {
      return res.status(404).json({ message: 'Notifikasi tidak ditemukan' });
    }

    await Notification.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Notifikasi berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat menghapus notifikasi',
      error: error.message 
    });
  }
};

// Toggle notification status (admin only)
exports.toggleNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    
    if (!notification) {
      return res.status(404).json({ message: 'Notifikasi tidak ditemukan' });
    }

    notification.isActive = !notification.isActive;
    await notification.save();

    const action = notification.isActive ? 'diaktifkan' : 'dinonaktifkan';

    // Kirim update status notifikasi real-time
    const io = req.app.get('io');
    if (io) {
      io.emit('notification-toggled', {
        notificationId: notification._id,
        isActive: notification.isActive
      });
    }

    res.json({
      success: true,
      message: `Notifikasi berhasil ${action}`,
      notification
    });
  } catch (error) {
    console.error('Toggle notification error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengubah status notifikasi',
      error: error.message 
    });
  }
};