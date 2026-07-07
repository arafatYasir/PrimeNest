import Container from "../Container"
import { aboutUsProblems } from "@/lib/data"
import type { AboutUsProblem } from "@/types/global"

const WhyBuiltPrimeNest = () => {
    return (
        <section>
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* ---- Left Column ---- */}
                    <div className="lg:col-span-6 space-y-5">
                        <div>
                            <span className="text-sm font-semibold tracking-wide text-accent uppercase">The Problem</span>
                            <h2 className="mt-2 font-heading text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-text">
                                Why We Built PrimeNest
                            </h2>
                        </div>

                        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                            Buying and selling property online is often filled with obstacles that can make the entire process feel stressful, risky, and time-consuming. We noticed several critical challenges faced by users:
                        </p>

                        {/* ---- Problem Cards ---- */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {aboutUsProblems.map(({ icon: Icon, title, description }: AboutUsProblem) => (
                                <div key={title} className="flex gap-3 p-4 rounded-xl bg-card border border-border hover:border-error/25 hover:shadow-xs transition-all duration-200">
                                    <Icon className="size-5 text-error shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm font-semibold text-text">{title}</h4>
                                        <p className="mt-1 text-xs text-text-secondary">{description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ---- Right Column ---- */}
                    <div className="lg:col-span-6">
                        <div className="relative overflow-hidden rounded-2xl bg-card text-white p-6 xs:p-8 sm:p-10 shadow-lg">                         
                            <span className="text-sm font-semibold tracking-wide text-accent uppercase">Our Response</span>
                            <h3 className="mt-2 font-heading text-xl sm:text-2xl font-bold text-text">
                                Where Trust Comes First
                            </h3>

                            <div className="mt-5 space-y-4 text-sm sm:text-base leading-relaxed text-text-secondary">
                                <p>
                                    We created PrimeNest to offer a marketplace built on verification and transparency.
                                </p>
                                <p>
                                    Every single listing is thoroughly reviewed before publication, buyers and sellers can communicate privately in one safe place, and the platform is designed to make the journey from discovery to transaction as simple and transparent as possible.
                                </p>
                                <div className="pt-6 border-t border-white/10 mt-6">
                                    <p className="text-sm font-semibold tracking-wide text-accent italic">
                                        PrimeNest exists to help people move forward with confidence.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default WhyBuiltPrimeNest