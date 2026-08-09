import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js"
import { getActivities } from "../controllers/activities.controller.js";

const activitiesRouter = new Router();

activitiesRouter.get("/", protectRoute, getActivities);

export default activitiesRouter;