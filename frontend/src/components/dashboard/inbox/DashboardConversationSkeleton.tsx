import { Skeleton } from "@/components/ui/skeleton"

const DashboardConversationSkeleton = () => {
    return (
        <div
            className="flex w-full items-center gap-3 px-3 py-3 bg-primary/5 rounded-xl"
        >
            {/* ---- Avatar ---- */}
            <Skeleton className="flex size-12 shrink-0 rounded-full" />

            {/* ---- Content ---- */}
            <div className="flex min-w-0 flex-1 flex-col gap-1">
                {/* ---- Top Row ---- */}
                <div className="flex items-center justify-between gap-2">
                    <Skeleton className="w-[40%] h-3 rounded" />
                    <Skeleton className="w-8 h-3 rounded" />
                </div>

                {/* ---- Bottom Row ---- */}
                <div className="flex items-center justify-between gap-2">
                    <Skeleton className="w-[60%] h-3 rounded" />
                </div>
            </div>
        </div>
    )
}

export default DashboardConversationSkeleton