import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getNotifications } from "../controllers/notifications.controller.js";

const notificationRouter = Router();

// Get all notifications
notificationRouter.get("/", protectRoute, getNotifications);

export default notificationRouter;