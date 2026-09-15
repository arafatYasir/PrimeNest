import DashboardInboxChat from "@/components/dashboard/inbox/DashboardInboxChat";
import DashboardInboxChatEmptyState from "@/components/dashboard/inbox/DashboardInboxChatEmptyState";
import DashboardInboxSidebar from "@/components/dashboard/inbox/DashboardInboxSidebar"
import { useEffect, useState } from "react"

const DashboardInboxPage = () => {
    const [conversationId, setConversationId] = useState("");

    // Scroll to the top of the page on first render
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <div className="flex border rounded-xl shadow-lg shadow-primary/15">
            <DashboardInboxSidebar conversationId={conversationId} setConversationId={setConversationId} />

            {/* If conversation id exists show chat page otherwise empty state */}
            {
                conversationId ? <DashboardInboxChat /> : <DashboardInboxChatEmptyState />
            }
        </div>
    )
}

export default DashboardInboxPage