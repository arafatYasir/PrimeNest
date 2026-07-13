import QuickActions from "@/components/dashboard/overview/QuickActions";
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
                <p className="text-text-secondary">Here's an overview of your activity.</p>
            </div>
            
            {/* ---- Status Cards ---- */}
            <StatsCards />

            {/* ---- Quick Actions ---- */}
            <QuickActions />
        </div>
    )
}

export default DashboardOverviewPage