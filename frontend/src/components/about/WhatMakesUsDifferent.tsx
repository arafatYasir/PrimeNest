import Container from "../Container"
import { aboutUsCorePillars } from "@/lib/data"
import type { AboutUsCorePillar } from "@/types/global"

const WhatMakesUsDifferent = () => {
    return (
        <section>
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <span className="text-sm font-semibold tracking-wide text-secondary uppercase">Core Pillars</span>
                    <h2 className="mt-2 font-heading text-2xl xs:text-3xl sm:text-4xl font-bold text-text">
                        What Makes PrimeNest Different
                    </h2>
                    <p className="mt-3 text-sm xs:text-base text-text-secondary">
                        Instead of listing basic features, we focus on the foundational principles behind everything we build.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {aboutUsCorePillars.map(({icon: Icon, title, description}: AboutUsCorePillar) => (
                        <div key={title} className="group relative flex flex-col p-6 sm:p-8 rounded-2xl border border-border bg-card hover:border-secondary/25 transition-all duration-300">
                            <div className="flex size-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary mb-6">
                                <Icon className="size-6" />
                            </div>
                            <h3 className="font-heading text-lg sm:text-xl font-bold text-text mb-3">
                                {title}
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

export default WhatMakesUsDifferent