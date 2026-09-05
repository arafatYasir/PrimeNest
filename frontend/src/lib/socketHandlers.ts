import { toast } from "sonner";
import type { QueryClient } from "@tanstack/react-query";
import type { Socket } from "socket.io-client";
import type { NotificationItem } from "@/types/global";
import { useAuthStore } from "@/stores/useAuthStore";

// Object Interfaces
interface NotificationsPageData {
    success: boolean;
    data: NotificationItem[];
    pagination: { hasNextPage: boolean };
}

interface InfiniteNotificationsData {
    pages: NotificationsPageData[];
    pageParams: number[];
}

// ---- Handler Functions ----
export function handleNotification(
    payload: NotificationItem | NotificationItem[],
    queryClient: QueryClient
) {
    const items = Array.isArray(payload) ? payload : [payload];
    if (items.length === 0) return;
    
    // Optimistically add the new notification into the first page of the infinite query
    queryClient.setQueryData<InfiniteNotificationsData>(["notifications"], (old) => {
        if (!old || !old.pages || old.pages.length === 0) return old;

        const existingIds = new Set(
            old.pages.flatMap((page) => page.data.map((n) => n._id))
        );
        const fresh = items.filter((n) => !existingIds.has(n._id));

        if (fresh.length === 0) return old;

        // Prepend new notifications to the first page
        const updatedFirstPage: NotificationsPageData = {
            ...old.pages[0],
            data: [...fresh, ...old.pages[0].data],
        };

        return {
            ...old,
            pages: [updatedFirstPage, ...old.pages.slice(1)],
        };
    });

    // Invalidate the query to refetch the api
    queryClient.invalidateQueries({ queryKey: ["notifications"] });

    for (let i = 0; i < items.length; i++) {
        toast.message("You have a new notification!");
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
