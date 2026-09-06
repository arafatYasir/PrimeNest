import { Skeleton } from "@/components/ui/skeleton"

const DashboardPropertyEditModalSkeleton = () => {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="space-y-4">
                <Skeleton className="h-6 w-48 rounded" />
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-28 w-full rounded-lg" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
            </div>
        </div>
    )
}

export default DashboardPropertyEditModalSkeleton