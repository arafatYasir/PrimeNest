import { Skeleton } from "@/components/ui/skeleton";

function DashboardPendingPropertySkeleton() {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 rounded-xl border border-border/60 bg-card p-4 animate-pulse">
            {/* Thumbnail */}
            <Skeleton className="aspect-video w-full md:w-36 md:h-24 shrink-0 rounded-lg" />

            {/* Main Info */}
            <div className="flex-1 w-full space-y-2">
                {/* Badges */}
                <div className="flex gap-2">
                    <Skeleton className="h-4 w-14 rounded" />
                    <Skeleton className="h-4 w-16 rounded" />
                    <Skeleton className="hidden md:block h-4 w-24 rounded" />
                </div>

                {/* Title */}
                <Skeleton className="h-5 w-3/4 rounded" />

                {/* Location */}
                <Skeleton className="h-4 w-1/2 rounded" />

                {/* Seller Info */}
                <div className="flex items-center gap-3 pt-0.5">
                    <Skeleton className="h-3.5 w-24 rounded" />
                    <Skeleton className="hidden sm:block h-3.5 w-32 rounded" />
                    <Skeleton className="hidden lg:block h-3.5 w-28 rounded" />
                </div>
            </div>

            {/* Price & Stats */}
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 pt-3 md:pt-0 shrink-0">
                <Skeleton className="h-4 w-32 rounded" />
                <div className="flex flex-col items-end gap-1.5">
                    <Skeleton className="h-5 w-24 rounded" />
                    <Skeleton className="h-3 w-16 rounded" />
                </div>
            </div>
        </div>
    );
}

export default DashboardPendingPropertySkeleton;
