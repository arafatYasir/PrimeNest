import { Phone } from "lucide-react"
import Container from "../Container"

const ContactHero = () => {
    return (
        <section className="relative overflow-hidden bg-linear-to-t from-secondary/5 to-secondary/30 border-b border-border">
            <Container className="flex flex-col items-center text-center py-12 xs:py-16 sm:py-20 lg:py-24">
                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-2 xs:px-4 py-1 text-[10px] xs:text-xs sm:text-sm font-medium text-text-secondary shadow-sm">
                    <Phone className="size-3 xs:size-3.5 sm:size-4 text-accent" />
                    Contact Our Team
                </div>

                <h1 className="font-heading text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text">
                    We're Here to Help You Find{" "}
                    <span className="text-secondary">Home</span>
                </h1>

                <p className="mt-3 sm:mt-6 max-w-2xl text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed text-text-secondary text-center">
                    Have questions about listing a property, purchasing a home, or anything else?
                    Reach out to our experts. We usually respond within 24 hours.
                </p>
            </Container>
        </section>
    )
}

export default ContactHero