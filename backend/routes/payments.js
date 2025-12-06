const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect, adminOnly } = require('../middleware/auth');

// Routes untuk user
router.get('/methods', paymentController.getPaymentMethods);

// Routes untuk admin
router.get('/admin/methods', protect, adminOnly, paymentController.getAdminPaymentMethods);
router.post('/admin/methods', protect, adminOnly, paymentController.createPaymentMethod);
router.put('/admin/methods/:id', protect, adminOnly, paymentController.updatePaymentMethod);
router.delete('/admin/methods/:id', protect, adminOnly, paymentController.deletePaymentMethod);

// Midtrans routes
router.post('/midtrans/create', protect, paymentController.createMidtransTransaction);
router.post('/midtrans/notification', paymentController.handleMidtransNotification);

module.exports = router;