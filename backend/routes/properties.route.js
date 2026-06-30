import { Router } from "express";
import { getFeaturedProperties, getAllProperties } from "../controllers/properties.controller.js";

const propertiesRouter = Router();

propertiesRouter.get("/", getAllProperties);
propertiesRouter.get("/featured", getFeaturedProperties);

export default propertiesRouter;