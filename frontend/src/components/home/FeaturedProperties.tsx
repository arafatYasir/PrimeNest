import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "../Container";
import { Link } from "react-router";
import PropertyCard from "../PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedProperties } from "@/lib/apiCalls";
import type { Property } from "@/types/global";
import PropertyCardSkeleton from "../PropertyCardSkeleton";
import PropertyCardsError from "../PropertyCardsError";

export default function FeaturedProperties() {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["properties"],
        queryFn: fetchFeaturedProperties,
        staleTime: 5 * 60 * 1000
    });

    if (isError) {
        return (
            <PropertyCardsError
                title="Couldn't get featured properties"
                message={error.message}
                onRetry={() => refetch()}
            />
        )
    }

    return (
        <section>
            <Container>
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <div>
                        <h2 className="font-heading text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text text-center sm:text-left">
                            Featured Properties
                        </h2>
                        <p className="mt-2 text-xs xs:text-sm sm:text-base text-center sm:text-left text-text-secondary">
                            Explore our latest handpicked listings near you.
                        </p>
                    </div>

                    <Link to="/properties">
                        <Button
                            variant="outline"
                            size="lg"
                        >
                            View All Properties
                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>

                {/* ---- Featured Property Cards ---- */}
                <div className="grid gap-6 mt-12" style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
                }}>
                    {
                        isLoading ? (
                            Array.from({ length: 8 }).map((_, i) => (
                                <PropertyCardSkeleton key={i} />
                            ))
                        ) : (
                            data.properties.map((property: Property) => (
                                <PropertyCard key={property._id} property={property} />
                            ))
                        )
                    }
                </div>
            </Container>
        </section>
    );
}