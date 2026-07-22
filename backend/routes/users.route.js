import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getUserData, saveProperty, unsaveProperty, getSavedProperties, uploadProfilePhoto } from "../controllers/users.controller.js";
import upload from "../config/multer.js";

const usersRouter = Router();

// Get Saved Properties
usersRouter.get("/me/saved-properties", protectRoute, getSavedProperties);

// Save A Specific Property
usersRouter.post("/me/saved-properties/:id", protectRoute, saveProperty);

// Unsave A Specific Property
usersRouter.delete("/me/saved-properties/:id", protectRoute, unsaveProperty);

// Get An User Data
usersRouter.get("/:clerkId", protectRoute, getUserData);

// Upload A Profile Photo
usersRouter.patch("/me/profile-photo", protectRoute, upload.single("profilePic"), uploadProfilePhoto);

export default usersRouter;