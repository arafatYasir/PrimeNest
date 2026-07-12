import { Router } from "express";
import { getFeaturedProperties, getProperty, getAllProperties, getPropertiesStatuses } from "../controllers/properties.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const propertiesRouter = Router();

propertiesRouter.get("/", getAllProperties);
propertiesRouter.get("/featured", getFeaturedProperties);
propertiesRouter.get("/statuses", protectRoute, getPropertiesStatuses);
propertiesRouter.get("/:id", getProperty);

export default propertiesRouter;