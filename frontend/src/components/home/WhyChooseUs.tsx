import { FEATURES } from "@/lib/data";
import FeatureCard from "./FeatureCard";
import Container from "../Container";

function WhyChooseUs() {
    return (
        <section>
            <Container>
                {/* ---- Header ---- */}
                <div className="text-center">
                    <span className="text-sm font-semibold tracking-wide text-accent uppercase">
                        Why PrimeNest
                    </span>
                    <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl">
                        Everything you need to buy & sell with confidence
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-base text-text-secondary">
                        PrimeNest brings together smart search, direct communication, and
                        secure payments so every step of your real estate journey feels effortless.
                    </p>
                </div>

                {/* ---- Cards ---- */}
                <div className="mt-12 grid gap-6 justify-items-center" style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
                }}>
                    {FEATURES.map((feature) => (
                        <FeatureCard key={feature.title} {...feature} />
                    ))}
                </div>
            </Container>
        </section>
    );
}

export default WhyChooseUs;