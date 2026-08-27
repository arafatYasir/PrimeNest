import http from "node:http";
import express from "express";
import { Server } from 'socket.io';
import { SITE_URL } from "../config/env.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: SITE_URL
    }
});

const userSocketMap = {};

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

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
    })
})

export { app, server, io };