import { Activity } from "lucide-react"

const RecentActivities = () => {
    return (
        <div className="flex flex-col gap-3 xs:gap-4 rounded-xl border border-border bg-card p-4 xs:p-5 sm:p-6 shadow-lg shadow-primary/5">
            <h2 className="flex items-center gap-3 font-heading text-lg xs:text-xl font-bold tracking-tight text-text">
                <Activity className="size-5.5 text-error" />
                <span>
                    Recent Activities
                </span>
            </h2>
        </div>
    )
}

export default RecentActivities