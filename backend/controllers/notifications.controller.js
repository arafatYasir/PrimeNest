import Notification from "../models/notification.model.js";

export async function getNotifications(req, res, next) {
    try {
        const userId = req.user._id;
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        // If page/limit is negative convert it to absolute value
        page = Math.abs(page);
        limit = Math.abs(limit);

        const skip = (page - 1) * limit;

        const [notifications, totalNotifications] = await Promise.all([
            Notification.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Notification.countDocuments({ userId })
        ]);

        const totalPages = Math.ceil(totalNotifications / limit);
        const hasNextPage = totalPages > page;

        return res.status(200).json({
            success: true,
            data: notifications,
            pagination: {
                hasNextPage
            }
        });
    } catch (e) {
        next(e);
    }
}

export async function markNotificationAsRead(req, res, next) {
    try {
        const userId = req.user._id;
        const { id } = req.params;

        const notification = await Notification.findOne({
            userId, _id: id
        });

        // If the notification wasn't found
        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found!"
            });
        }

        // Mark the notification as read if it wasn't
        if (!notification.isRead) {
            notification.isRead = true;
            await notification.save();

            return res.status(200).json({
                success: true,
                message: "Notification is marked as read"
            });
        }

        return res.status(400).json({
            success: true,
            message: "Notification is already marked as read"
        });
    }
    catch (e) {
        next(e);
    }
}