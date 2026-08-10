import { Skeleton } from "@/components/ui/skeleton";
import { fetchActivities } from "@/lib/apiCalls";
import { formatRelativeTime, getActivityConfig } from "@/lib/utils";
import type { ActivityItem } from "@/types/global";
import { useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import {
    Activity,
    AlertCircle,
    ChevronRight,
    Clock,
    RefreshCw
} from "lucide-react";
import { Link } from "react-router";

const RecentActivities = () => {
    const { getToken } = useAuth();

    const { data: activities, isLoading, isError, error, refetch } = useQuery<ActivityItem[]>({
        queryKey: ["activities"],
        queryFn: async () => {
            const token = await getToken();
            return fetchActivities(token ?? "");
        },
    });

    return (
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 xs:p-5 sm:p-6 shadow-lg shadow-primary/5">
            {/* ---- Header ---- */}
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h2 className="flex items-center gap-3 font-heading text-lg xs:text-xl font-bold tracking-tight text-text">
                    <Activity className="size-5.5 text-error" />
                    <span>Recent Activities</span>
                </h2>
            </div>

            {/* ---- Loading Skeleton State ---- */}
            {isLoading && (
                <div className="flex flex-col gap-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3.5 rounded-xl border p-3.5"
                        >
                            {/* Serial Number Skeleton */}
                            <Skeleton className="size-5 rounded-full shrink-0" />

                            {/* Icon Skeleton */}
                            <Skeleton className="size-10 rounded-lg shrink-0" />

                            {/* Content Skeleton */}
                            <div className="flex flex-1 flex-col gap-2 min-w-0">
                                <Skeleton className="h-4 w-3/4 rounded" />
                                <Skeleton className="h-3 w-1/4 rounded" />
                            </div>

                            {/* Chevron / Badge Skeleton */}
                            <Skeleton className="h-4 w-12 rounded shrink-0 hidden xs:block" />
                        </div>
                    ))}
                </div>
            )}

            {/* ---- Error State ---- */}
            {isError && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-error/20 bg-error/5 p-4 text-error">
                    <div className="flex items-center gap-3 min-w-0">
                        <AlertCircle className="size-5 shrink-0" />
                        <p className="text-xs sm:text-sm font-medium leading-relaxed truncate">
                            {error?.message || "Failed to load recent activities."}
                        </p>
                    </div>
                    <button
                        onClick={() => refetch()}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-error/10 px-3 py-1.5 text-xs font-semibold text-error hover:bg-error/20 transition-colors shrink-0 cursor-pointer"
                    >
                        <RefreshCw className="size-3.5" />
                        <span>Retry</span>
                    </button>
                </div>
            )}

            {/* ---- Empty State ---- */}
            {!isLoading && !isError && (!activities || activities.length === 0) && (
                <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                    <div className="flex size-12 items-center justify-center rounded-full bg-section text-text-secondary mb-3">
                        <Activity className="size-6" />
                    </div>
                    <p className="font-heading text-sm font-semibold text-text">No recent activity</p>
                    <p className="text-xs text-text-secondary mt-1">
                        Your account activities and property updates will show up here.
                    </p>
                </div>
            )}

            {/* ---- Activities List ---- */}
            {(!isLoading && !isError && activities && activities.length > 0) && (
                <div className="flex flex-col gap-2.5">
                    {activities.map((activity) => {
                        const config = getActivityConfig(activity.type);
                        const IconComponent = config.icon;
                        const hasLink = Boolean(activity.link);

                        const content = (
                            <>
                                {/* ---- Activity Icon ---- */}
                                <div
                                    className={`flex size-9 xs:size-10 shrink-0 items-center justify-center rounded-lg border ${config.bgClass}`}
                                >
                                    <IconComponent className="size-4 xs:size-4.5" />
                                </div>

                                {/* ---- Activity Content ---- */}
                                <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                                    <p className={`text-xs xs:text-sm font-medium leading-snug text-text ${hasLink ? "group-hover:text-primary transition-colors" : ""}`}>
                                        {activity.message}
                                    </p>
                                    <span className="flex items-center gap-1 text-xs text-text-secondary">
                                        <Clock className="size-3 shrink-0" />
                                        <span className="mt-0.5">{formatRelativeTime(activity.createdAt)}</span>
                                    </span>
                                </div>

                                {/* ---- Link Indicator or Non-link Badge ---- */}
                                {hasLink && (
                                    <div className="flex items-center gap-1 shrink-0 text-primary font-medium text-xs opacity-80 group-hover:opacity-100 transition-all">
                                        <span className="hidden xs:inline">View</span>
                                        <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                                    </div>
                                )}
                            </>
                        );

                        if (hasLink && activity.link) {
                            return (
                                <Link
                                    key={activity._id}
                                    to={activity.link}
                                    className="group flex items-center gap-3 xs:gap-3.5 rounded-xl border bg-card p-3 xs:p-3.5 shadow-xs transition-all duration-200 hover:border-primary cursor-pointer"
                                >
                                    {content}
                                </Link>
                            );
                        }

                        return (
                            <div
                                key={activity._id}
                                className="flex items-center gap-3 xs:gap-3.5 rounded-xl border bg-card p-3 xs:p-3.5"
                            >
                                {content}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default RecentActivities;
