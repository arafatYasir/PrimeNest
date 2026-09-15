import { useState, useRef, useEffect } from "react";
import { Search, AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";
import { fetchConversations } from "@/lib/apiCalls";
import type { Conversation } from "@/types/global";
import DashboardInboxEmptyState from "./DashboardInboxEmptyState";
import DashboardConversation from "./DashboardConversation";

type FilterTab = "all" | "unread" | "favourites";

interface ConversationResponse {
    success: boolean;
    data: Conversation[];
    pagination: { hasNextPage: boolean };
}

const filterTabs: { label: string; value: FilterTab }[] = [
    { label: "All", value: "all" },
    { label: "Unread", value: "unread" },
    { label: "Favourites", value: "favourites" },
];

const DashboardInboxSidebar = () => {
    // States
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    // Get user's token
    const { getToken } = useAuth();

    // Query
    const {
        data,
        isLoading,
        isError,
        error,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery({
        queryKey: ["conversations", activeFilter],
        queryFn: async ({ pageParam }) => {
            const token = await getToken();
            return fetchConversations(token ?? "", pageParam as number, 20);
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage: ConversationResponse, allPages) => {
            return lastPage.pagination.hasNextPage ? allPages.length + 1 : undefined;
        }
    });

    const conversations = data?.pages.flatMap((page) => page.data) ?? [];

    // Infinite Scroll
    useEffect(() => {
        if (!hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fetchNextPage();
            }
        }, { threshold: 0.1 });

        const sentinel = sentinelRef.current;
        if (sentinel) observer.observe(sentinel);

        return () => { if (sentinel) observer.unobserve(sentinel); };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <aside
            className={cn(
                "flex min-h-screen flex-col border-r border-border rounded-l-xl bg-card flex-1"
            )}
        >
            {/* ---- Heading ---- */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <h2 className="font-heading text-xl font-bold tracking-tight text-text">
                    Lead Inbox
                </h2>
            </div>

            {/* ---- Search Bar ---- */}
            <div className="px-4 pt-4 pb-2">
                <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary" />
                    <Input
                        type="text"
                        placeholder="Search conversations…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                        aria-label="Search conversations"
                    />
                </div>
            </div>

            {/* ---- Tabs ---- */}
            <div className="flex items-center gap-1 px-4 py-2">
                {filterTabs.map((tab) => (
                    <Button
                        key={tab.value}
                        type="button"
                        onClick={() => setActiveFilter(tab.value)}
                        variant={activeFilter === tab.value ? "default" : "outline"}
                    >
                        {tab.label}
                    </Button>
                ))}
            </div>

            <ScrollArea className="flex-1">
                {/* ---- Loading State ---- */}
                {isLoading && (
                    <div className="flex flex-col gap-2 p-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-16 w-full rounded-xl" />
                        ))}
                    </div>
                )}

                {/* ---- Error State ---- */}
                {isError && (
                    <div className="p-8 text-center text-error">
                        <AlertCircle className="mx-auto size-8 mb-2" />
                        <p className="text-sm font-medium">Failed to load conversations</p>
                        <p className="text-xs">{error.message}</p>
                    </div>
                )}

                {/* ---- Content ---- */}
                {(!isLoading && !isError && conversations.length > 0) && (
                    <div className="flex flex-col p-2 gap-y-1">
                        {conversations.map((conversation: Conversation) => (
                            <DashboardConversation key={conversation._id} conversation={conversation} />
                        ))}

                        {/* ---- Infinite Scrolling Observer Div ---- */}
                        <div ref={sentinelRef} className="h-4" />

                        {isFetchingNextPage && (
                            <div className="flex mx-auto items-center gap-2 text-sm text-text">
                                <RefreshCw className="size-4 animate-spin" />
                                <span className="font-medium">Loading more...</span>
                            </div>
                        )}
                    </div>
                )}

                {/* ---- Empty State ---- */}
                {(!isLoading && !isError && conversations.length === 0) && (
                    <DashboardInboxEmptyState />
                )}
            </ScrollArea>
        </aside>
    );
};

export default DashboardInboxSidebar;