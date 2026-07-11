import type { Property } from "@/types/global";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function PropertyFeatures({ property }: { property: Property }) {
    const features = property.features || [];

    if (features.length === 0) return null;

    return (
        <div className="space-y-4">
            <h2 className="font-heading text-lg font-bold text-text flex items-center gap-2 border-b border-border pb-2">
                <Sparkles className="h-5 w-5 text-secondary animate-pulse" />
                Premium Amenities & Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {features.map((feature, idx) => {
                    return (
                        <div 
                            key={idx} 
                            className="flex items-center gap-3 p-2 rounded-xl bg-section/50 border border-border/50 hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-250 group"
                        >
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-xs border border-border/50 group-hover:bg-secondary group-hover:text-white transition-colors duration-250">
                                <CheckCircle2 className="size-4.5 text-secondary group-hover:text-white transition-colors duration-250" strokeWidth={2} />
                            </div>
                            <span className="text-sm font-semibold text-text group-hover:text-primary transition-colors duration-250">
                                {feature}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
