import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getUserData, saveProperty } from "../controllers/users.controller.js";

const usersRouter = Router();

// Get An User Data
usersRouter.get("/:clerkId", protectRoute, getUserData);

// Save A Specific Property
usersRouter.post("/me/saved-properties/:id", protectRoute, saveProperty)

export default usersRouter;