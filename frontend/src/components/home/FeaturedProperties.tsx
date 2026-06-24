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
        <section className="bg-background">
            <Container>
                <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl">
                            Featured Properties
                        </h2>
                        <p className="mt-2 text-base text-text-secondary">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
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