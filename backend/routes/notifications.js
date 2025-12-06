const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect, adminOnly } = require('../middleware/auth');

// Routes untuk user
router.get('/', notificationController.getActiveNotifications);

// Routes untuk admin
router.get('/admin/all', protect, adminOnly, notificationController.getAllNotifications);
router.post('/admin/create', protect, adminOnly, notificationController.createNotification);
router.put('/admin/:id', protect, adminOnly, notificationController.updateNotification);
router.delete('/admin/:id', protect, adminOnly, notificationController.deleteNotification);
router.put('/admin/:id/toggle', protect, adminOnly, notificationController.toggleNotification);

module.exports = router;