import http from "node:http";
import express from "express";
import { Server } from "socket.io";
import { clerkClient } from "@clerk/express";
import { CLERK_SECRET_KEY, SITE_URL } from "../config/env.js";
import User from "../models/user.model.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: SITE_URL,
        credentials: true
    }
});

// Socket.io user authentication middleware
io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth?.token;

        if (!token) {
            return next(new Error("Unauthorized: missing token"));
        }

        const decoded = await clerkClient.verifyToken(token, {
            secretKey: CLERK_SECRET_KEY
        });

        if (!decoded?.sub) {
            return next(new Error("Unauthorized: invalid token"));
        }

        const user = await User.findOne({ clerkId: decoded.sub }).select("_id");

        if (!user) {
            return next(new Error("Unauthorized: user not found"));
        }

        // Attatch the `userId` to socket object for later identification
        socket.userId = user._id.toString();

        next();
    } catch (e) {
        next(new Error("Unauthorized"));
    }
});

const userSocketMap = {};

io.on("connection", (socket) => {
    const userId = socket.userId;

    if (userId) {
        if (!userSocketMap[userId]) userSocketMap[userId] = new Set();
        userSocketMap[userId].add(socket.id);
        socket.join(userId);
    }

    // Send currently online users id after this user connects
    io.emit("users:online", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        if (userId) {
            userSocketMap[userId].delete(socket.id);
            if (userSocketMap[userId].size === 0) {
                delete userSocketMap[userId];
            }
        }

        // Send currently online users id after this user disconnects
        io.emit("users:online", Object.keys(userSocketMap));
    });
});

export { app, server, io };
