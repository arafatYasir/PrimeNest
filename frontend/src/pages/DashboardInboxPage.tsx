import DashboardInboxChat from "@/components/dashboard/inbox/DashboardInboxChat";
import DashboardInboxSidebar from "@/components/dashboard/inbox/DashboardInboxSidebar"
import { useEffect } from "react"

const DashboardInboxPage = () => {
    // Scroll to the top of the page on first render
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <div className="flex border rounded-xl shadow-lg shadow-primary/15">
            <DashboardInboxSidebar />
            <DashboardInboxChat />
        </div>
    )
}

export default DashboardInboxPage