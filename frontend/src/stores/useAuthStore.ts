import { create } from "zustand";
import { useUser, useAuth } from "@clerk/react";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { fetchUser } from "../lib/apiCalls";
import { getSocket, disconnectSocket } from "../lib/socket";
import {
    handleNotification,
    handleConnect,
    handleDisconnect,
    handleConnectError,
    handleReconnectAttempt,
    connectSocket,
} from "../lib/socketHandlers";
import type { User } from "@/types/global";

export type SocketStatus =
    | "connecting"
    | "connected"
    | "disconnected"
    | "reconnecting";

interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    socketStatus: SocketStatus;
    setUser: (user: User | null) => void;
    setIsLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    setSocketStatus: (status: SocketStatus) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoading: true,
    error: null,
    socketStatus: "disconnected",
    setUser: (user) => set({ user }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setSocketStatus: (status) => set({ socketStatus: status }),
}));

export const useInitAuth = () => {
    // Get user status & token from clerk
    const { user: clerkUser, isLoaded: isClerkLoaded, isSignedIn } = useUser();
    const { getToken } = useAuth();

    // Get auth functions
    const setUser = useAuthStore((state) => state.setUser);
    const setIsLoading = useAuthStore((state) => state.setIsLoading);
    const setError = useAuthStore((state) => state.setError);
    const setSocketStatus = useAuthStore((state) => state.setSocketStatus);
    
    // Extra hooks
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // ---- Load the app user profile from the backend ----
    useEffect(() => {
        const loadUser = async () => {
            if (!isClerkLoaded) return;

            if (!isSignedIn) {
                setUser(null);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const token = await getToken();
                if (token && clerkUser) {
                    const userData = await fetchUser(clerkUser.id, token);
                    setUser(userData);
                }
            } catch (e: any) {
                setError(e.message || "Failed to load user data");
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, [isClerkLoaded, isSignedIn, getToken, setUser, setIsLoading, setError]);

    // ---- Realtime socket connection ----
    useEffect(() => {
        if (!isClerkLoaded || !isSignedIn) return;

        let isCancelled = false;
        const socket = getSocket();

        socket.on("notification", (payload) => {
            return handleNotification(payload, queryClient, navigate);
        });
        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);
        socket.on("connect_error", handleConnectError);
        socket.io.on("reconnect_attempt", () => handleReconnectAttempt(socket, getToken));

        void connectSocket(socket, getToken, () => isCancelled);

        return () => {
            isCancelled = true;
            socket.off("notification");
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("connect_error", handleConnectError);
            socket.io.off("reconnect_attempt");
            disconnectSocket();
            setSocketStatus("disconnected");
        };
    }, [isClerkLoaded, isSignedIn, getToken, queryClient, navigate, setSocketStatus]);
};