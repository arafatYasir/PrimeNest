import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { findOrCreateConversation, getAllConversations } from "../controllers/conversations.controller.js";

const conversationRouter = Router();

// Get All Conversations
conversationRouter.get("/", protectRoute, getAllConversations);

// Find Or Create New Conversation
conversationRouter.post("/", protectRoute, findOrCreateConversation);

export default conversationRouter;