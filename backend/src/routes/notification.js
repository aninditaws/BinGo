const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { authMiddleware } = require('../middleware/auth');

// Get notifications for a specific bin
router.get('/:binId', authMiddleware, notificationController.getNotifications);

// Mark a notification as read
router.put('/:notificationId/read', authMiddleware, notificationController.readNotification);

module.exports = router;
