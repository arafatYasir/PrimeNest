import { Search, MapPin, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-linear-to-t from-secondary/5 to-secondary/30">
            <div className="mx-auto flex max-w-4xl flex-col items-center px-4 sm:px-6 py-14 xs:py-22 sm:py-28 lg:py-36 text-center ">
                {/* ---- Badge ---- */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-2 xs:px-4 py-1.5 text-[10px] xs:text-xs sm:text-sm font-medium text-text-secondary shadow-sm">
                    <Home className="size-3 xs:size-3.5 sm:size-4 text-accent" />
                    Thousands of verified properties
                </div>

                <h1 className="font-heading text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text">
                    Find your{" "}
                    <span className="text-secondary">
                        Prime Nest
                    </span>
                </h1>

                <p className="mt-3 sm:mt-6 max-w-2xl text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed text-text-secondary">
                    Discover, explore, and secure your next home. Browse properties on the
                    map, search by location, and connect with sellers, all in one place.
                </p>

                {/* ---- Search Bar ---- */}
                <div className="mt-5 sm:mt-10 w-full max-w-xl">
                    <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-1 xs:p-2 shadow-lg shadow-primary/5 transition-shadow focus-within:shadow-xl focus-within:shadow-primary/10">
                        <div className="flex flex-1 items-center gap-2 pl-1 xs:pl-3">
                            <MapPin className="size-3.5 xs:size-4 sm:size-5 shrink-0 text-text-secondary" />
                            <input
                                type="text"
                                placeholder="Search by city, neighborhood, or address"
                                className="w-full bg-transparent p-0 xs:py-1 text-[11px] xs:text-xs sm:text-sm md:text-base text-text placeholder:text-text-secondary focus:outline-none"
                            />
                        </div>
                        <Button
                            size="lg"
                        >
                            <Search className="size-3 xs:size-3.5 sm:size-4" />
                            <span className="hidden xs:inline">Search</span>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}