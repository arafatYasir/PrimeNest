import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getUserData } from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/:clerkId", protectRoute, getUserData);

export default usersRouter;