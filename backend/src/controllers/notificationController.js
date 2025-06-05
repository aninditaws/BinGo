const notificationService = require("../services/notificationService");

class NotificationController {
    async getNotifications(req, res) {
        try {
            const { binId } = req.params;
            const notifications = await notificationService.getNotification(binId);
            res.status(200).json(notifications);
        } catch (error) {
            console.error("Get notifications controller error:", error);
            res.status(500).json({ error: "Failed to get notifications" });
        }
    }

    async readNotification(req, res) {
        try {
            const { notificationId } = req.params;
            await notificationService.readNotification(notificationId);
            res.status(200).json({ message: "Notification marked as read" });
        } catch (error) {
            console.error("Read notification controller error:", error);
            res.status(500).json({ error: "Failed to read notification" });
        }
    }
}

module.exports = new NotificationController();
