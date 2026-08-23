import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";

const notificationRouter = Router();

// Get all notifications
notificationRouter.get("/notifications", protectRoute, getNotifications);

export default notificationRouter;