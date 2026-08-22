import { Router } from "express";
import { getFeaturedProperties, getProperty, getAllProperties, getPropertiesStatuses, getMyProperties, deleteProperty, createProperty, approveProperty, getAllPendingProperties, rejectProperty } from "../controllers/properties.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/requireAdmin.middleware.js";
import { validate } from "../middlewares/validate.middleware.js"
import { propertySchema } from "../validations/property.validation.js";
import upload from "../config/multer.js";

const propertiesRouter = Router();

// Get All Properties
propertiesRouter.get("/", getAllProperties);

// Get Featured Properties
propertiesRouter.get("/featured", getFeaturedProperties);

// Get Properties Statuses
propertiesRouter.get("/statuses", protectRoute, getPropertiesStatuses);

// Get All Properties Of The Current User
propertiesRouter.get("/me", protectRoute, getMyProperties);

// Get All Pending Properties
propertiesRouter.get("/pending", protectRoute, requireAdmin, getAllPendingProperties);

// Get A Specific Property
propertiesRouter.get("/:id", getProperty);

// Create A New Property
propertiesRouter.post("/", protectRoute, upload.array("images", 10), validate(propertySchema), createProperty);

// Delete A Specific Property
propertiesRouter.delete("/:id", protectRoute, deleteProperty);

// Approve A Property (Admin Only)
propertiesRouter.patch("/:id/approve", protectRoute, requireAdmin, approveProperty);

// Reject A Property (Admin Only)
propertiesRouter.patch("/:id/reject", protectRoute, requireAdmin, rejectProperty);

export default propertiesRouter;