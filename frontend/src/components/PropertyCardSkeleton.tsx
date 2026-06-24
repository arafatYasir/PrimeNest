import { Skeleton } from "@/components/ui/skeleton";

function PropertyCardSkeleton() {
    return (
        <div
            className="flex flex-col overflow-hidden rounded-2xl bg-card border border-border/60"
        >
            {/* ---- Image ---- */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-section">
                <Skeleton className="h-full w-full rounded-none" />
            </div>

            {/* ---- Body ---- */}
            <div className="flex flex-1 flex-col p-5">
                {/* Price */}
                <Skeleton className="h-[28px] w-32 rounded" />

                {/* Title */}
                <Skeleton className="mt-2 h-[20px] w-3/4 rounded" />

                {/* Location */}
                <div className="mt-1 flex items-center gap-1.5">
                    <Skeleton className="h-3.5 w-3.5 shrink-0 rounded" />
                    <Skeleton className="h-[18px] w-40 rounded" />
                </div>

                {/* Divider + Stats */}
                <div className="mt-auto pt-4">
                    <div className="border-t border-border/60 pt-4 flex items-center justify-between">
                        {/* Beds */}
                        <div className="flex items-center gap-1.5">
                            <Skeleton className="h-[18px] w-[18px] rounded" />
                            <Skeleton className="h-[18px] w-6 rounded" />
                            <Skeleton className="h-[14px] w-7 rounded" />
                        </div>

                        {/* Baths */}
                        <div className="flex items-center gap-1.5">
                            <Skeleton className="h-[18px] w-[18px] rounded" />
                            <Skeleton className="h-[18px] w-6 rounded" />
                            <Skeleton className="h-[14px] w-9 rounded" />
                        </div>

                        {/* Area */}
                        <div className="flex items-center gap-1.5">
                            <Skeleton className="h-[18px] w-[18px] rounded" />
                            <Skeleton className="h-[18px] w-10 rounded" />
                            <Skeleton className="h-[14px] w-7 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyCardSkeleton;