import http from "node:http";
import express from "express";
import { Server } from 'socket.io';
import { SITE_URL } from "../config/env.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: SITE_URL
});

io.on("connection", (socket) => {
    console.log("A user is connected to socket.");
    console.log("Socket id: ", socket.id);
})

export { app, server, io };