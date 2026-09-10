import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { findOrCreateConversation } from "../controllers/conversations.controller.js";

const conversationRouter = Router();

// Find Or Create New Conversation
conversationRouter.post("/", protectRoute, findOrCreateConversation);

export default conversationRouter;