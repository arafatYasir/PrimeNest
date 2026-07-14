import ActiveProposals from "@/components/dashboard/overview/ActiveProposals";
import QuickActions from "@/components/dashboard/overview/QuickActions";
import RecentActivities from "@/components/dashboard/overview/RecentActivities";
import StatsCards from "@/components/dashboard/overview/StatsCards"
import { useUserContext } from "@/context/UserContext"

const DashboardOverviewPage = () => {
    const { user, isLoading } = useUserContext();

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
    };

    const greeting = getGreeting();

    return (
        <div className="space-y-6">
            {/* ---- Greetings ---- */}
            <div>
                <h1 className="font-heading text-3xl font-bold tracking-tight text-text">
                    {greeting}, {isLoading ? "..." : user?.fullName || "Valued User"}
                </h1>
                <p className="text-text-secondary mt-1">Here's an overview of your activity.</p>
            </div>

            {/* ---- Status Cards ---- */}
            <StatsCards />

            {/* ---- Recent Activites & Active Proposals ---- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <ActiveProposals />
                </div>
                <div>
                    <RecentActivities />
                </div>
            </div>

            {/* ---- Quick Actions ---- */}
            <QuickActions />
        </div>
    )
}

export default DashboardOverviewPage