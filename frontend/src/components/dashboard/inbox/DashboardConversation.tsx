import { MessageSquare } from "lucide-react";
import { cn, formatRelativeTime, getOptimizedImageUrl } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import type { Conversation } from "@/types/global";

interface Props {
    conversation: Conversation;
    isActive?: boolean;
    onClick?: (conversation: Conversation) => void;
}

const DashboardConversation = ({ conversation, isActive = false, onClick }: Props) => {
    // Store states
    const currentUser = useAuthStore((state) => state.user);

    // Variables
    const hasUnread = conversation.unreadCount > 0;

    // Determine the "other" participant
    const { fullName, profilePic } = conversation.participants.find((p) => p._id !== currentUser._id);
    const optimizedProfilePic = profilePic ? getOptimizedImageUrl(profilePic, { width: 100, height: 100 }) : "";

    const displayTime = conversation.lastMessage ? formatRelativeTime(conversation.lastMessage.createdAt) : formatRelativeTime(conversation.updatedAt);

    return (
        <div
            onClick={() => onClick?.(conversation)}
            className={cn(
                "group flex cursor-pointer w-full items-center gap-3 rounded-xl px-3 py-3 transition-colors duration-150 hover:bg-primary/10 active:bg-primary/10",
                hasUnread && "bg-section/50",
                isActive && "bg-primary/10"
            )}
        >
            {/* ---- Avatar ---- */}
            <div
                className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full"
            >
                {
                    optimizedProfilePic ? (
                        <img
                            src={optimizedProfilePic}
                            width={100}
                            height={100}
                            loading="lazy"
                            alt={`${fullName}'s Profile Picture`}
                            className="size-full object-cover"
                        />
                    ) : (
                        <div className="flex size-full items-center justify-center rounded-full bg-section border border-border text-text-secondary font-bold text-2xl">
                            {fullName.charAt(0)}
                        </div>
                    )
                }
            </div>

            {/* ---- Content ---- */}
            <div className="flex min-w-0 flex-1 flex-col gap-1">
                {/* ---- Top Row ---- */}
                <div className="flex items-center justify-between gap-2">
                    <span
                        className={cn(
                            "truncate text-sm font-semibold"
                        )}
                    >
                        {fullName}
                    </span>

                    <span
                        className={cn(
                            "shrink-0 text-xs tabular-nums",
                            hasUnread
                                ? "font-semibold text-primary"
                                : "font-medium text-text-secondary"
                        )}
                    >
                        {displayTime}
                    </span>
                </div>

                {/* ---- Bottom Row ---- */}
                <div className="flex items-center justify-between gap-2">
                    {conversation.lastMessage ? (
                        <p
                            className={cn(
                                "truncate text-[13px] leading-relaxed",
                                hasUnread
                                    ? "font-semibold text-text italic"
                                    : "font-medium text-text-secondary"
                            )}
                        >
                            {conversation.lastMessage.senderId === currentUser?._id && (
                                <span className="text-text-secondary">You: </span>
                            )}
                            {conversation.lastMessage.text}
                        </p>
                    ) : (
                        <p className="flex items-center gap-1 truncate text-[13px] text-text-secondary">
                            <MessageSquare className="size-3.5 shrink-0" />
                            <span>No messages yet</span>
                        </p>
                    )}

                    {hasUnread && (
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                            {conversation.unreadCount > 9 ? "9+" : conversation.unreadCount}
                        </span>
                    )}
                </div>
            </div>
        </div >
    );
};

export default DashboardConversation;