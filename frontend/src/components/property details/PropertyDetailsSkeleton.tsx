import Container from "@/components/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyDetailsSkeleton() {
    return (
        <main>
            <Container className="py-8 sm:py-12">
                {/* ---- Header Section ---- */}
                <div className="mb-8 sm:mb-10">
                    {/* Navigation/Breadcrumbs */}
                    <div className="flex items-center gap-1.5">
                        <Skeleton className="h-4 w-12 rounded" />
                        <span className="text-text leading-none">/</span>
                        <Skeleton className="h-4 w-16 rounded" />
                        <span className="text-text leading-none">/</span>
                        <Skeleton className="h-4 w-32 rounded" />
                    </div>
                </div>

                {/* ---- Two Column Layout ---- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    {/* ---- Left Side ---- */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* ---- Property Image Slider / Single Image ---- */}
                        <div className="overflow-hidden rounded-2xl border border-border/80">
                            <Skeleton className="w-full aspect-video rounded-none" />
                        </div>

                        <div className="space-y-6 xs:space-y-8 bg-card rounded-2xl border border-border p-4 sm:p-6 md:p-8 relative">
                            {/* ---- Save / Unsave Button ---- */}
                            <Skeleton className="size-8 rounded-lg absolute top-4 right-4 sm:top-6 sm:right-6 md:right-8" />

                            {/* ---- Property Summary ---- */}
                            <div className="space-y-6 xs:space-y-8">
                                {/* ---- Top Header Section: Title, Price, Status ---- */}
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border">
                                    <div className="space-y-3 w-full md:w-2/3">
                                        <div className="flex flex-wrap items-center gap-2.5">
                                            <Skeleton className="h-[22px] w-20 rounded-md" />
                                            <Skeleton className="h-[22px] w-20 rounded-md" />
                                        </div>
                                        <Skeleton className="h-6 xs:h-9 w-3/4 rounded-lg" />
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <Skeleton className="h-5 w-4 rounded-full shrink-0" />
                                            <Skeleton className="h-5 w-1/2 rounded" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-9 xs:h-10 w-32 md:w-40 rounded-lg shrink-0" />
                                </div>

                                {/* ---- Quick Key Stats ---- */}
                                <div className="grid grid-cols-3 divide-x divide-border bg-section/50 rounded-xl py-4 xs:px-4 border border-border/50 text-center">
                                    <div className="flex flex-col items-center justify-center xs:p-2 gap-2">
                                        <Skeleton className="h-7 w-12 rounded" />
                                        <Skeleton className="h-4 w-16 rounded" />
                                    </div>
                                    <div className="flex flex-col items-center justify-center xs:p-2 gap-2">
                                        <Skeleton className="h-7 w-12 rounded" />
                                        <Skeleton className="h-4 w-16 rounded" />
                                    </div>
                                    <div className="flex flex-col items-center justify-center xs:p-2 gap-2">
                                        <Skeleton className="h-7 w-12 rounded" />
                                        <Skeleton className="h-4.5 w-16 rounded" />
                                    </div>
                                </div>

                                {/* ---- Detailed Property Summary Grid ---- */}
                                <div>
                                    <Skeleton className="h-7 w-44 rounded mb-4" />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <div key={i} className="flex items-center justify-between py-2 border-b border-border/50">
                                                <Skeleton className="h-5 w-20 rounded" />
                                                <Skeleton className="h-5 w-24 rounded" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* ---- Property Description ---- */}
                                <div className="space-y-3">
                                    <Skeleton className="h-7 w-28 rounded mb-4" />
                                    <Skeleton className="h-4 w-full rounded" />
                                    <Skeleton className="h-4 w-[95%] rounded" />
                                    <Skeleton className="h-4 w-[90%] rounded" />
                                </div>
                            </div>

                            {/* ---- Property Features ---- */}
                            <div className="space-y-4 pt-4 border-t border-border/50">
                                <Skeleton className="h-7 w-56 rounded" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <div key={i} className="flex items-center gap-2 xs:gap-3 p-2 rounded-xl bg-section/50 border border-border/50">
                                            <Skeleton className="size-7 xs:size-8 rounded-lg shrink-0" />
                                            <Skeleton className="h-4 w-20 rounded" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ---- Property Marker On Map ---- */}
                        <div className="w-full h-[250px] xs:h-[300px] mt-8 rounded-xl overflow-hidden border border-border">
                            <Skeleton className="w-full h-full rounded-none" />
                        </div>
                    </div>

                    {/* ---- Right Side ---- */}
                    <div className="lg:col-span-4">
                        {/* SellerInformations skeleton */}
                        <div className="bg-card rounded-2xl border border-border p-4 xs:p-6 space-y-4 lg:sticky lg:top-[65px]">
                            {/* Profile Header */}
                            <div className="flex items-center gap-4">
                                <Skeleton className="size-13 xs:size-14 sm:size-15 rounded-full shrink-0" />
                                <div className="space-y-2 w-full">
                                    <Skeleton className="h-5 w-32 rounded" />
                                    <Skeleton className="h-4 w-1/2 rounded" />
                                </div>
                            </div>

                            {/* Bio Section */}
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full rounded" />
                                <Skeleton className="h-4 w-5/6 rounded" />
                            </div>

                            {/* Contact Details */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 xs:gap-3">
                                    <Skeleton className="size-7 xs:size-8 rounded-lg shrink-0" />
                                    <Skeleton className="h-4.5 w-40 rounded" />
                                </div>
                                <div className="flex items-center gap-2 xs:gap-3">
                                    <Skeleton className="size-7 xs:size-8 rounded-lg shrink-0" />
                                    <Skeleton className="h-4.5 w-32 rounded" />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-2">
                                <Skeleton className="w-full h-9 xs:h-10 rounded-md" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}