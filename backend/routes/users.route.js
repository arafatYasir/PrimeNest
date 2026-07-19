import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getUserData, saveProperty, unsaveProperty, getSavedProperties } from "../controllers/users.controller.js";

const usersRouter = Router();

// Get Saved Properties
usersRouter.get("/me/saved-properties", protectRoute, getSavedProperties);

// Save A Specific Property
usersRouter.post("/me/saved-properties/:id", protectRoute, saveProperty);

// Unsave A Specific Property
usersRouter.delete("/me/saved-properties/:id", protectRoute, unsaveProperty);

// Get An User Data
usersRouter.get("/:clerkId", protectRoute, getUserData);

export default usersRouter;