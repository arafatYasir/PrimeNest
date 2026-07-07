import Container from "../Container"
import { aboutUsCorePillars } from "@/lib/data"
import { cn } from "@/lib/utils"
import type { AboutUsCorePillar } from "@/types/global"

const WhatMakesUsDifferent = () => {
    return (
        <section>
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <span className="text-sm font-semibold tracking-wide text-secondary uppercase">Core Pillars</span>
                    <h2 className="mt-2 font-heading text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-text">
                        What Makes PrimeNest Different
                    </h2>
                    <p className="mt-3 text-sm xs:text-base text-text-secondary">
                        Instead of listing basic features, we focus on the foundational principles behind everything we build.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {aboutUsCorePillars.map(({icon: Icon, title, description}: AboutUsCorePillar, i: number) => (
                        <div key={title} className={cn(
                            "group relative flex flex-col p-4 xs:p-6 rounded-2xl border border-border bg-card hover:border-secondary/30 transition-all duration-250 space-y-3",
                            i === 2 && "sm:col-span-2 lg:col-span-1"
                        )}>
                            <div className="flex size-10 sm:size-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                                <Icon className="size-5 sm:size-6" />
                            </div>
                            <h3 className="font-heading text-base xs:text-lg sm:text-xl font-bold text-text">
                                {title}
                            </h3>
                            <p className="text-xs xs:text-sm text-text-secondary leading-relaxed">
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