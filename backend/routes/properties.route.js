import { Router } from "express";
import { getFeaturedProperties, getProperty, getAllProperties } from "../controllers/properties.controller.js";

const propertiesRouter = Router();

propertiesRouter.get("/", getAllProperties);
propertiesRouter.get("/featured", getFeaturedProperties);
propertiesRouter.get("/:id", getProperty);

export default propertiesRouter;