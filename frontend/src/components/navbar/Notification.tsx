import { Clock } from "lucide-react";
import { Link } from "react-router";
import { cn, formatRelativeTime, getNotificationConfig } from "@/lib/utils";
import type { NotificationItem } from "@/types/global";

interface NotificationProps {
    notification: NotificationItem;
    onClick?: () => void;
}

const Notification = ({
    notification,
    onClick,
}: NotificationProps) => {
    const config = getNotificationConfig(notification.type);
    const IconComponent = config.icon;
    const hasLink = Boolean(notification.link);

    const content = (
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
                            "text-xs xs:text-sm font-medium leading-snug text-text line-clamp-2",
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
    );

    if (hasLink && notification.link) {
        return (
            <Link
                to={notification.link}
                onClick={onClick}
                className={cn(
                    "group flex items-center p-3.5 sm:p-4 transition-all duration-150 hover:bg-card cursor-pointer",
                    !notification.isRead && "bg-primary/8"
                )}
            >
                {content}
            </Link>
        );
    }

    return (
        <div
            onClick={onClick}
            className={cn(
                "group flex items-center p-3.5 sm:p-4 transition-all duration-150 hover:bg-card cursor-pointer",
                !notification.isRead && "bg-primary/8"
            )}
        >
            {content}
        </div>
    );
};

export default Notification;
