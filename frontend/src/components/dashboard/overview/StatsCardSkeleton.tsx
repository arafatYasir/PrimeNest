import { Skeleton } from "@/components/ui/skeleton"

const StatsCardSkeleton = () => {
    return (
        <div className="rounded-xl border border-border bg-card p-4 xs:p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-3">
                <Skeleton className="size-9 shrink-0 rounded-lg" />
                <Skeleton className="w-30 h-6 rounded" />
            </div>

            <Skeleton className="mt-3 h-9 w-12 rounded" />

            <Skeleton className="mt-1 w-30 h-5 rounded" />
        </div>
    )
}

export default StatsCardSkeleton