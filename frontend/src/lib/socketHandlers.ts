import { toast } from "sonner";
import type { QueryClient } from "@tanstack/react-query";
import type { NavigateFunction } from "react-router";
import type { Socket } from "socket.io-client";
import type { NotificationItem } from "@/types/global";
import { useAuthStore } from "@/stores/useAuthStore";

interface NotificationsQueryData {
    success: boolean;
    data: NotificationItem[];
    pagination: { hasNextPage: boolean };
}

export function handleNotification(
    payload: NotificationItem | NotificationItem[],
    queryClient: QueryClient,
    navigate: NavigateFunction
) {
    console.log(payload);

    const items = Array.isArray(payload) ? payload : [payload];
    if (items.length === 0) return;
    
    queryClient.setQueryData<NotificationsQueryData>(["notifications"], (old) => {
        if (!old) return old;

        const existingIds = new Set(old.data.map((n) => n._id));
        const fresh = items.filter((n) => !existingIds.has(n._id));

        if (fresh.length === 0) return old;
        return { ...old, data: [...fresh, ...old.data] };
    });

    queryClient.invalidateQueries({ queryKey: ["notifications"] });

    for (const item of items) {
        toast(item.message, {
            description: "You have a new notification",
            action: {
                label: "View",
                onClick: () => navigate(item.link),
            },
        });
    }
}

export function handleConnect() {
    useAuthStore.getState().setSocketStatus("connected");
}

export function handleDisconnect() {
    useAuthStore.getState().setSocketStatus("disconnected");
}

export function handleConnectError() {
    useAuthStore.getState().setSocketStatus("disconnected");
}

export async function handleReconnectAttempt(
    socket: Socket,
    getToken: () => Promise<string | null | undefined>
) {
    useAuthStore.getState().setSocketStatus("reconnecting");

    const token = await getToken();
    if (token) socket.auth = { token };
}

export async function connectSocket(
    socket: Socket,
    getToken: () => Promise<string | null | undefined>,
    isCancelled: () => boolean
) {
    if (isCancelled()) return;

    const token = await getToken();
    if (isCancelled() || !token) return;

    socket.auth = { token };
    useAuthStore.getState().setSocketStatus("connecting");

    if (!socket.connected) socket.connect();
}
