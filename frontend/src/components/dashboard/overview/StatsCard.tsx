import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StatVariant = "primary" | "success" | "warning" | "muted";

interface StatsCardProps {
    icon: LucideIcon;
    label: string;
    value: number | string;
    variant?: StatVariant;
    trend?: string;
}

const variantStyles: Record<StatVariant, { iconBg: string; iconColor: string }> = {
    primary: {
        iconBg: "bg-primary/10",
        iconColor: "text-primary",
    },
    success: {
        iconBg: "bg-success/10",
        iconColor: "text-success",
    },
    warning: {
        iconBg: "bg-warning/10",
        iconColor: "text-warning",
    },
    muted: {
        iconBg: "bg-secondary/10",
        iconColor: "text-secondary",
    },
};

export default function StatsCard({
    icon: Icon,
    label,
    value,
    variant = "primary",
    trend,
}: StatsCardProps) {
    const styles = variantStyles[variant];

    return (
        <div
            className={cn(
                "rounded-xl border border-border bg-card p-4 xs:p-5 sm:p-6 shadow-lg shadow-primary/5"
            )}
        >
            <div className="flex items-center gap-3">
                <div
                    className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-lg",
                        styles.iconBg
                    )}
                >
                    <Icon className={cn("size-4.5", styles.iconColor)} />
                </div>
                <p className="text-xs xs:text-sm sm:text-base font-semibold text-text">
                    {label}
                </p>
            </div>

            <p className="font-heading text-xl xs:text-2xl sm:text-3xl font-bold tracking-tight text-text mt-3">
                {value}
            </p>

            {trend && (
                <p className="text-[11px] xs:text-xs sm:text-sm text-text-secondary font-medium mt-1">
                    {trend}
                </p>
            )}
        </div>
    );
}