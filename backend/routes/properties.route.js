import { Router } from "express";
import { getFeaturedProperties, getProperty, getAllProperties, getPropertiesStatuses, getMyProperties, deleteProperty } from "../controllers/properties.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const propertiesRouter = Router();

// Get All Properties
propertiesRouter.get("/", getAllProperties);

// Get Featured Properties
propertiesRouter.get("/featured", getFeaturedProperties);

// Get Properties Statuses
propertiesRouter.get("/statuses", protectRoute, getPropertiesStatuses);

// Get All Properties Of The Current User
propertiesRouter.get("/me", protectRoute, getMyProperties);

// Delete A Specific Property
propertiesRouter.delete("/:id", protectRoute, deleteProperty);

// Get A Specific Property
propertiesRouter.get("/:id", getProperty);

export default propertiesRouter;