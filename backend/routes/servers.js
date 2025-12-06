const express = require('express');
const router = express.Router();
const serverController = require('../controllers/serverController');
const { protect, adminOnly } = require('../middleware/auth');

// Routes untuk user
router.get('/', protect, serverController.getUserServers);
router.get('/:id', protect, serverController.getServerById);
router.post('/vps/create', protect, serverController.createVPS);
router.post('/pterodactyl/create', protect, serverController.createPterodactyl);

// Routes untuk admin
router.get('/admin/all', protect, adminOnly, serverController.getAllServers);
router.put('/admin/:id/suspend', protect, adminOnly, serverController.suspendServer);
router.put('/admin/:id/activate', protect, adminOnly, serverController.activateServer);

module.exports = router;