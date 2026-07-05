import { Sparkles } from "lucide-react"
import Container from "../Container"

const AboutHero = () => {
    return (
        <section className="relative overflow-hidden bg-linear-to-t from-secondary/5 to-secondary/30">
            <Container className="flex flex-col items-center text-center py-16 xs:py-20 sm:py-26 lg:py-32">
                {/* ---- Badge ---- */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-2 xs:px-4 py-1 text-[10px] xs:text-xs sm:text-sm font-medium text-text-secondary shadow-sm">
                    <Sparkles className="size-3 xs:size-3.5 sm:size-4 text-accent" />
                    Our Vision & Mission
                </div>

                <h1 className="font-heading text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text">
                    About <span className="text-secondary">PrimeNest</span>
                </h1>

                <p className="mt-3 sm:mt-6 max-w-3xl text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed text-text-secondary text-center">
                    PrimeNest is more than a property listing platform—it's a trusted marketplace designed to simplify buying and selling real estate through verified listings, transparent communication, and a seamless user experience.
                </p>
            </Container>
        </section>
    )
}

export default AboutHero