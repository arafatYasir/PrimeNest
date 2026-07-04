import { Skeleton } from "../ui/skeleton"

const PropertiesFilterSkeleton = () => {
    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <div className="flex items-center gap-2 border-b border-border pb-4 mb-5">
                <Skeleton className="size-4.5 rounded" />
                <Skeleton className="h-6 w-12" />
            </div>

            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="mb-5">
                    <Skeleton className="h-4 w-24 mb-2 rounded" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                </div>
            ))}

            <div className="mb-5">
                <Skeleton className="h-4 w-24 mb-2 rounded" />
                <div className="flex items-center gap-2">
                    <Skeleton className="h-10 flex-1 rounded-lg" />
                    <span className="text-text-secondary font-medium">-</span>
                    <Skeleton className="h-10 flex-1 rounded-lg" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
                {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i}>
                        <Skeleton className="h-4 w-16 mb-2 rounded" />
                        <Skeleton className="h-10 w-full rounded-lg" />
                    </div>
                ))}
            </div>

            <div className="space-y-2">
                <Skeleton className="h-8 w-full rounded-lg" />
                <Skeleton className="h-8 w-full rounded-lg" />
            </div>
        </div>
    )
}

export default PropertiesFilterSkeleton