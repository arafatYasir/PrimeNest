import { Clock } from "lucide-react";
import { Link } from "react-router";
import { cn, formatRelativeTime, getNotificationConfig } from "@/lib/utils";
import type { NotificationItem } from "@/types/global";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";
import { markNotificationAsRead } from "@/lib/apiCalls";

interface NotificationProps {
    notification: NotificationItem;
    onClick: () => void;
}

const Notification = ({ notification, onClick }: NotificationProps) => {
    const config = getNotificationConfig(notification.type);
    const IconComponent = config.icon;
    const hasLink = Boolean(notification.link);

    // Get the user's token
    const { getToken } = useAuth();
    const queryClient = useQueryClient();

    // Notification: Mark as read api
    const { mutate } = useMutation({
        mutationFn: async () => {
            const token = await getToken();

            return markNotificationAsRead(token ?? "", notification._id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        }
    });

    const handleClick = () => {
        onClick();

        mutate();
    }

    return (
        <Link
            to={notification.link}
            onClick={handleClick}
            className={cn(
                "group flex items-center p-3.5 sm:p-4 transition-all duration-150 hover:bg-card cursor-pointer",
                !notification.isRead && "bg-primary/8"
            )}
        >
            <div className="flex items-start gap-3 w-full">
                {/* ---- Notification Icon ---- */}
                <div
                    className={`flex size-7 shrink-0 items-center justify-center rounded-lg border ${config.bgClass} shadow-xs mt-0.5`}
                >
                    <IconComponent className="size-3.5" strokeWidth={2} />
                </div>

                {/* ---- Notification Details ---- */}
                <div className="flex flex-1 flex-col gap-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <p
                            className={cn(
                                "text-xs xs:text-sm font-medium leading-snug text-text",
                                hasLink && "group-hover:underline"
                            )}
                        >
                            {notification.message}
                        </p>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-semibold text-text-secondary">
                        <Clock className="size-3 shrink-0" />
                        <span>{formatRelativeTime(notification.createdAt)}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
};

export default Notification;
