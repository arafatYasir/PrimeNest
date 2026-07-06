import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";

const AboutCTA = () => {
    return (
        <section>
            <Container>
                <div className="relative overflow-hidden rounded-2xl bg-card p-6 xs:p-8 sm:p-10 md:p-12 lg:p-20 text-center border-2 border-border">
                    <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                        <span className="text-sm font-semibold tracking-wide text-accent uppercase">Looking Ahead</span>
                        <h2 className="mt-1 font-heading text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text">
                            Building the Future of Real Estate
                        </h2>

                        <p className="text-sm xs:text-base sm:text-lg text-text-secondary leading-relaxed">
                            We are building more than just another real estate marketplace. PrimeNest aims to create a trusted ecosystem where technology makes property transactions simpler, safer, and more transparent for everyone.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                            <Link to="/properties" className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="w-full sm:w-auto"
                                >
                                    Browse Properties
                                    <ArrowRight className="size-4" />
                                </Button>
                            </Link>

                            <Link to="/contact" className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full sm:w-auto"
                                >
                                    Get in Touch
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default AboutCTA