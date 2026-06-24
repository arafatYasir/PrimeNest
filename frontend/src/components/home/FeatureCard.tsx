import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
    return (
        <div
            className="flex flex-col items-start rounded-2xl border border-border/60 bg-card p-6
                 transition-all duration-300 ease-out
                 hover:shadow-lg hover:shadow-black/6 hover:border-border"
        >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-5 w-5 text-primary" strokeWidth={2} />
            </div>

            <h3 className="mt-4 text-[15px] font-semibold text-text leading-snug">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {description}
            </p>
        </div>
    );
}

export default FeatureCard;