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