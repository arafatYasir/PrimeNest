import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL!;

export const getSocket = (): Socket => {
    if (!socket) {
        socket = io(SOCKET_URL, {
            autoConnect: false,
            auth: {},
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            timeout: 20000,
        });
    }

    return socket;
};

export const disconnectSocket = () => {
    if (!socket) return;

    socket.io.removeAllListeners();
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
};