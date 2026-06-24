import { Router } from "express";
import { getFeaturedProperties } from "../controllers/properties.controller.js";

const propertiesRouter = Router();

propertiesRouter.get("/featured", getFeaturedProperties);

export default propertiesRouter;