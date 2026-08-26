import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getNotifications, markNotificationAsRead } from "../controllers/notifications.controller.js";

const notificationRouter = Router();

// Get All Notifications
notificationRouter.get("/", protectRoute, getNotifications);

// Mark As Read
notificationRouter.patch("/:id", protectRoute, markNotificationAsRead);

export default notificationRouter;