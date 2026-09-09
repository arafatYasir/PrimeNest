import { useState } from "react";
import { Search, SquarePen, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Conversation {
    _id: string;
    participants: string[];
    lastMessage: {
        text: string;
        senderId: string;
        createdAt: string;
    } | null;
    unreadCount: number;
    propertyId?: string;
    createdAt: string;
    updatedAt: string;
}

type FilterTab = "all" | "unread" | "favourites";


const filterTabs: { label: string; value: FilterTab }[] = [
    { label: "All", value: "all" },
    { label: "Unread", value: "unread" },
    { label: "Favourites", value: "favourites" },
];

const DashboardInboxSidebar = () => {
    // States
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<FilterTab>("all");

    return (
        <aside
            className={cn(
                "flex min-h-screen flex-col border-r border-border rounded-l-xl bg-card flex-1"
            )}
        >
            {/* ---- Heading ---- */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <h2 className="font-heading text-xl font-bold tracking-tight text-text">
                    Inbox
                </h2>

                <Button
                    aria-label="Start new chat"
                >
                    <SquarePen className="size-3.5" />
                    New Chat
                </Button>
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
                {/* ---- Conversation empty state ---- */}
                <div className="flex h-full flex-col items-center px-8 py-20 text-center">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-section">
                        <MessageSquare className="size-6 text-text-secondary" />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-text">
                        No conversations yet
                    </h3>

                    <p className="mt-1.5 max-w-55 text-xs leading-relaxed text-text-secondary">
                        Start a chat by visiting a property listing.
                    </p>
                </div>
            </ScrollArea>
        </aside>
    );
};

export default DashboardInboxSidebar;
