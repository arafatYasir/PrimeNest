import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "../Container";
import { Link } from "react-router";

export default function FeaturedProperties() {
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

                {/* Property cards grid goes here later */}
            </Container>
        </section>
    );
}