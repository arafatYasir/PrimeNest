import DashboardInboxSidebar from "@/components/dashboard/inbox/DashboardInboxSidebar"
import { useEffect } from "react"

const DashboardInboxPage = () => {
    // Scroll to the top of the page on first render
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <div className="shadow-xl">
            <DashboardInboxSidebar />
        </div>
    )
}

export default DashboardInboxPage