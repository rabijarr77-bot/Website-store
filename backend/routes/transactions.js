const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { protect, adminOnly } = require('../middleware/auth');

// Routes untuk user
router.get('/', protect, transactionController.getUserTransactions);
router.get('/:id', protect, transactionController.getTransactionById);
router.post('/create', protect, transactionController.createTransaction);
router.post('/:id/pay', protect, transactionController.processPayment);

// Routes untuk admin
router.get('/admin/all', protect, adminOnly, transactionController.getAllTransactions);
router.put('/admin/:id/verify', protect, adminOnly, transactionController.verifyTransaction);
router.put('/admin/:id/reject', protect, adminOnly, transactionController.rejectTransaction);

module.exports = router;