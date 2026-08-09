import Activity from "../models/activity.model.js";

export async function getActivities(req, res, next) {
    try {
        const userId = req.user._id;

        const activities = await Activity.find({ userId }).sort({ createdAt: -1 }).limit(5);

        return res.status(200).json({
            success: true,
            data: activities
        });
    } catch (e) {
        next(e);
    }
}