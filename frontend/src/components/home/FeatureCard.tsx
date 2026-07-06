import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
    return (
        <div
            className="flex flex-col items-start rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 ease-out hover:border-secondary/25"
        >
            <div className="flex size-10 items-center justify-center rounded-xl bg-secondary/10">
                <Icon className="size-5 text-secondary" strokeWidth={2} />
            </div>

            <h3 className="mt-4 text-sm xs:text-[15px] font-semibold text-text leading-snug">
                {title}
            </h3>

            <p className="mt-2 text-[13px] xs:text-sm leading-relaxed text-text-secondary">
                {description}
            </p>
        </div>
    );
}

export default FeatureCard;