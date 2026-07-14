import { Skeleton } from "@/components/ui/skeleton";

function DashboardPropertySkeleton() {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 rounded-xl border border-border/60 bg-card p-4 animate-pulse">
            {/* Thumbnail */}
            <Skeleton className="aspect-video w-full md:w-36 md:h-24 shrink-0 rounded-lg" />
            {/* Main Info */}
            <div className="flex-1 w-full space-y-2">
                <div className="flex gap-2">
                    <Skeleton className="h-4 w-12 rounded" />
                    <Skeleton className="h-4 w-16 rounded" />
                </div>
                <Skeleton className="h-5 w-3/4 rounded" />
                <Skeleton className="h-4 w-1/2 rounded" />
            </div>
            {/* Price & Stats */}
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 pt-3 md:pt-0 shrink-0">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-5 w-24 rounded" />
            </div>
        </div>
    );
}

export default DashboardPropertySkeleton;