import { useState, useRef, useEffect } from "react";
import { Bell, AlertCircle, RefreshCw, X } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";
import { fetchNotifications } from "@/lib/apiCalls";
import type { NotificationItem } from "@/types/global";
import Notification from "./Notification";

interface NotificationResponse {
    success: boolean;
    data: NotificationItem[];
    pagination: { hasNextPage: boolean };
}

const NavbarNotifications = () => {
    // States
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Get user's token
    const { getToken } = useAuth();

    const { data, isLoading, isError, error, refetch, isFetching } = useQuery<NotificationResponse>({
        queryKey: ["notifications"],
        queryFn: async ({ signal }) => {
            const token = await getToken();
            return fetchNotifications(token ?? "", 1, 10, signal);
        },
    });

    const notifications: NotificationItem[] = data?.data ?? [];
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    // Handle outside click to close the modal
    useEffect(() => {
        const handleCloseModal = (e: MouseEvent | TouchEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleCloseModal);
        document.addEventListener("touchstart", handleCloseModal);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleCloseModal);
            document.removeEventListener("touchstart", handleCloseModal);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    return (
        <div ref={containerRef} className="relative">
            {/* ---- Bell Trigger Button ---- */}
            <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                title="Notifications"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`relative size-9 rounded-full text-text-secondary transition-all duration-200 hover:text-primary active:text-primary cursor-pointer ${isOpen ? "bg-primary/10 text-primary" : ""
                    }`}
            >
                <Bell className="size-4 xs:size-5" strokeWidth={2.25} />

                {/* Unread indicator badge */}
                {unreadCount > 0 && (
                    <span className="absolute right-2.5 top-2 xs:right-1.5 xs:top-1.5 flex size-1 xs:size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-error opacity-75" />
                        <span className="relative inline-flex size-1 xs:size-2 rounded-full bg-error ring-2 ring-background" />
                    </span>
                )}
            </Button>

            {/* ---- Notifications Modal ---- */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2.5 w-[calc(100vw-2rem)] xs:w-95 sm:w-105 max-w-105 rounded-2xl border bg-card shadow-2xl shadow-primary/10 overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-250">
                    {/* ---- Header ---- */}
                    <div className="flex items-center justify-between border-b px-4 py-2 sm:px-5 sm:py-3 bg-card">
                        <div className="flex items-center gap-2.5">
                            <h3 className="font-heading text-base font-bold tracking-tight text-text">
                                Notifications
                            </h3>
                            {unreadCount > 0 && (
                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
                                    {unreadCount} new
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-1">
                            {/* ---- Refresh Button ---- */}
                            <Button
                                variant="ghost"
                                size="icon-lg"
                                aria-label="Refresh notifications"
                                title="Refresh"
                                onClick={() => refetch()}
                                disabled={isFetching}
                                className="rounded-lg text-text-secondary hover:text-primary cursor-pointer"
                            >
                                <RefreshCw
                                    className={`size-4 ${isFetching && "animate-spin"}`}
                                />
                            </Button>

                            {/* ---- Close Button ---- */}
                            <Button
                                variant="ghost"
                                size="icon-lg"
                                aria-label="Close"
                                title="Close"
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg text-text-secondary hover:text-text cursor-pointer"
                            >
                                <X className="size-4" />
                            </Button>
                        </div>
                    </div>

                    {/* ---- Content Body ---- */}
                    <div className="max-h-100 overflow-y-auto overscroll-contain">
                        {/* ---- Loading State ---- */}
                        {isLoading && (
                            <div className="flex flex-col divide-y divide-border/50 p-1">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 p-3.5 sm:p-4"
                                    >
                                        <Skeleton className="size-7 rounded-lg shrink-0" />
                                        <div className="flex flex-1 flex-col gap-2 min-w-0">
                                            <Skeleton className="h-3.5 w-full rounded" />
                                            <Skeleton className="h-3 w-1/3 rounded" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* ---- Error State ---- */}
                        {isError && !isLoading && (
                            <div className="p-5 sm:p-6 text-center">
                                <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-error/10 text-error mb-3">
                                    <AlertCircle className="size-5.5" strokeWidth={2} />
                                </div>
                                <h4 className="font-heading text-sm font-semibold text-text">
                                    Failed to load notifications
                                </h4>
                                <p className="text-xs text-text-secondary mt-1 max-w-xs mx-auto leading-relaxed">
                                    {error ? error.message : "An unexpected error occurred while loading your notifications."}
                                </p>
                                <div className="mt-4 flex justify-center">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => refetch()}
                                        disabled={isFetching}
                                        className="gap-1.5"
                                    >
                                        <RefreshCw
                                            className={`size-3.5 ${isFetching ? "animate-spin" : ""}`}
                                        />
                                        <span>Retry</span>
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* ---- Empty State ---- */}
                        {!isLoading && !isError && notifications.length === 0 && (
                            <div className="flex flex-col items-center justify-center p-8 text-center">
                                <div className="flex size-12 items-center justify-center rounded-full bg-section text-text-secondary mb-3">
                                    <Bell className="size-5" />
                                </div>
                                <p className="font-heading text-sm font-semibold text-text">
                                    No notifications yet
                                </p>
                                <p className="text-xs text-text-secondary mt-1 max-w-60 leading-relaxed">
                                    When you receive updates, proposals, or messages, they will appear here.
                                </p>
                            </div>
                        )}

                        {/* ---- Notifications List ---- */}
                        {!isLoading && !isError && notifications.length > 0 && (
                            <div className="flex flex-col divide-y divide-border">
                                {notifications.map((notification) => (
                                    <Notification
                                        key={notification._id}
                                        notification={notification}
                                        onClick={() => setIsOpen(false)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ---- Footer ---- */}
                    <div className="border-t bg-card px-4 py-2.5 text-center"></div>
                </div>
            )}
        </div>
    );
};

export default NavbarNotifications;