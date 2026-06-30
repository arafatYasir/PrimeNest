import { Skeleton } from "../ui/skeleton";
import PropertyCardSkeleton from "../PropertyCardSkeleton";
import PropertiesFilterSkeleton from "./PropertiesFilterSkeleton";

const PropertiesPageSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* ---- Filter Skeleton ---- */}
            <div className="lg:col-span-1">
                <PropertiesFilterSkeleton />
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
                {/* Heading */}
                <Skeleton className="h-7 w-50 rounded" />

                {/* Tabs */}
                <div className="mt-4">
                    <div className="inline-flex gap-1 rounded-xl bg-border/40 p-1">
                        <Skeleton className="h-6 w-23 rounded-xl" />
                        <Skeleton className="h-6 w-23 rounded-xl" />
                    </div>
                </div>

                {/* Property Cards */}
                <div className="grid grid-cols-3 gap-6 mt-10">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <PropertyCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PropertiesPageSkeleton;