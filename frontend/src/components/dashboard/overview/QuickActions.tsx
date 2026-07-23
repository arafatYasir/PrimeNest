import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { dashboardQuickActions } from "@/lib/data";
import type { QuickAction } from "@/types/global";

export default function QuickActions() {
    return (
        <div className="bg-section rounded-xl p-6">
            <h2 className="font-heading text-lg sm:text-2xl font-bold tracking-tight text-text">
                Quick Actions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xs:gap-4 mt-4">
                {dashboardQuickActions.map(({title, to, description, icon: Icon}: QuickAction) => (
                    <Link
                        key={title}
                        to={to}
                        className={cn(
                            "group relative flex items-start gap-3 xs:gap-4 overflow-hidden rounded-xl border border-border bg-card p-4 xs:p-5 text-left",
                            "shadow-lg shadow-primary/5 transition-all duration-200",
                            "hover:shadow-xl hover:-translate-y-0.5"
                        )}
                    >
                        <div
                            className={cn(
                                "flex size-9 xs:size-10 sm:size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10",
                                "transition-colors duration-200 group-hover:bg-primary"
                            )}
                        >
                            <Icon className="size-4 xs:size-5 text-primary group-hover:text-white" />
                        </div>

                        <div className="flex flex-1 flex-col gap-0.5 xs:gap-1 min-w-0">
                            <h3 className="font-heading text-sm xs:text-base font-semibold text-text">
                                {title}
                            </h3>
                            <p className="text-[11px] xs:text-xs sm:text-sm leading-relaxed text-text-secondary">
                                {description}
                            </p>
                        </div>

                        <ArrowRight
                            className={cn(
                                "size-4 shrink-0 text-text-secondary transition-all duration-200",
                                "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                            )}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}