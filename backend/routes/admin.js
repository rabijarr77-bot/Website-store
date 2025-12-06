const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

// Dashboard routes
router.get('/dashboard', protect, adminOnly, adminController.getDashboardStats);
router.get('/dashboard/chart', protect, adminOnly, adminController.getDashboardChart);

// Settings routes
router.get('/settings', protect, adminOnly, adminController.getSettings);
router.put('/settings', protect, adminOnly, adminController.updateSettings);

// User management routes
router.get('/users', protect, adminOnly, adminController.getAllUsers);
router.put('/users/:id/toggle', protect, adminOnly, adminController.toggleUserStatus);

module.exports = router;